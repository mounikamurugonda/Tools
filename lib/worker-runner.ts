/**
 * Tiny Web Worker harness for offloading CPU work.
 *
 * Why: motto principle #1 — every tool must handle large datasets. For
 * pure-JS hot loops (text dedupe at 100MB, hashing large files, big
 * regex scans) we want the work off the main thread so the UI never
 * janks.
 *
 * Pattern: each consumer ships its own worker module (a `.worker.ts`
 * file or a Blob URL built from a function). This file just gives the
 * common request/response plumbing.
 *
 * Usage with an inline function (no separate file needed):
 *
 *   const run = createInlineWorker<{ text: string }, string>((data) => {
 *     return data.text.split('\n').filter((v, i, a) => a.indexOf(v) === i).join('\n');
 *   });
 *   const result = await run({ text: huge });
 *   run.terminate();
 *
 * For larger workers, prefer a real `*.worker.ts` file + next.js worker
 * config so types, source maps, and bundling all work properly.
 */

interface RunHandle<I, O> {
  (input: I, transfer?: Transferable[]): Promise<O>;
  terminate: () => void;
}

const isSupported = () =>
  typeof Worker !== 'undefined' && typeof Blob !== 'undefined' && typeof URL !== 'undefined';

/**
 * Build a one-shot worker from a serializable function body. The function
 * MUST be self-contained — it cannot close over outer-scope variables.
 */
export function createInlineWorker<I, O>(fn: (input: I) => O | Promise<O>): RunHandle<I, O> {
  if (!isSupported()) {
    // Fallback: run on main thread (still async-shaped for API parity)
    const run = ((input: I) => Promise.resolve().then(() => fn(input))) as RunHandle<I, O>;
    run.terminate = () => {};
    return run;
  }

  const source = `
    self.onmessage = async (e) => {
      try {
        const fn = (${fn.toString()});
        const out = await fn(e.data);
        self.postMessage({ ok: true, value: out });
      } catch (err) {
        self.postMessage({ ok: false, error: err && err.message ? err.message : String(err) });
      }
    };
  `;
  const blob = new Blob([source], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);

  let nextId = 0;
  const pending = new Map<number, { resolve: (v: O) => void; reject: (e: Error) => void }>();

  worker.onmessage = (e: MessageEvent) => {
    const id = (e.data && e.data.__id) as number | undefined;
    const slot = id != null ? pending.get(id) : undefined;
    if (!slot && pending.size === 1) {
      // single-shot mode: resolve the only pending entry
      const [k, only] = pending.entries().next().value!;
      pending.delete(k);
      if (e.data?.ok) only.resolve(e.data.value as O);
      else only.reject(new Error(e.data?.error ?? 'Worker error'));
      return;
    }
    if (slot && id != null) {
      pending.delete(id);
      if (e.data?.ok) slot.resolve(e.data.value as O);
      else slot.reject(new Error(e.data?.error ?? 'Worker error'));
    }
  };

  worker.onerror = e => {
    for (const slot of pending.values()) slot.reject(new Error(e.message || 'Worker error'));
    pending.clear();
  };

  const run = ((input: I, transfer?: Transferable[]) => {
    return new Promise<O>((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve, reject });
      worker.postMessage(input, transfer ?? []);
    });
  }) as RunHandle<I, O>;

  run.terminate = () => {
    worker.terminate();
    URL.revokeObjectURL(url);
    pending.clear();
  };

  return run;
}

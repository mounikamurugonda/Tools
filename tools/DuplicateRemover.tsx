'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { createInlineWorker } from '@/lib/worker-runner';
import { Copy, Download, Eraser } from 'lucide-react';

type Sort = 'none' | 'asc' | 'desc';

interface DedupeOpts {
  caseSensitive: boolean;
  trim: boolean;
  ignoreBlank: boolean;
  keep: 'first' | 'last';
  sort: Sort;
}

const DEFAULTS: DedupeOpts = {
  caseSensitive: false,
  trim: true,
  ignoreBlank: true,
  keep: 'first',
  sort: 'none',
};

interface Result {
  output: string;
  total: number;
  unique: number;
  removed: number;
}

// Self-contained for the Worker.
function dedupe(input: { text: string; opts: DedupeOpts }): Result {
  const { text, opts } = input;
  const lines = text.split(/\r?\n/);
  const seen = new Map<string, string>(); // key → original
  const order: string[] = [];
  let processed = 0;
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const cleaned = opts.trim ? raw.trim() : raw;
    if (opts.ignoreBlank && cleaned === '') continue;
    processed++;
    const key = opts.caseSensitive ? cleaned : cleaned.toLowerCase();
    if (!seen.has(key)) {
      seen.set(key, cleaned);
      order.push(key);
    } else if (opts.keep === 'last') {
      seen.set(key, cleaned);
    }
  }
  let unique = order.map(k => seen.get(k)!);
  if (opts.sort !== 'none') {
    const cmp = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare;
    unique.sort((a, b) => (opts.sort === 'asc' ? cmp(a, b) : cmp(b, a)));
  }
  return {
    output: unique.join('\n'),
    total: processed,
    unique: unique.length,
    removed: processed - unique.length,
  };
}

const WORKER_THRESHOLD = 500_000;

const DuplicateRemover: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('Apple\nBanana\nApple\nCherry\nBanana\nDate');
  const [opts, setOpts] = useState<DedupeOpts>({ ...DEFAULTS });
  const [result, setResult] = useState<Result>({
    output: '',
    total: 0,
    unique: 0,
    removed: 0,
  });
  const toast = useToast();

  const debounced = useDebounce(input, 250);

  // Run dedupe whenever input or options change. Use Worker for large input.
  React.useEffect(() => {
    let cancelled = false;
    async function run() {
      if (debounced.length > WORKER_THRESHOLD && typeof Worker !== 'undefined') {
        const worker = createInlineWorker<{ text: string; opts: DedupeOpts }, Result>(dedupe);
        try {
          const r = await worker({ text: debounced, opts });
          if (!cancelled) setResult(r);
        } finally {
          worker.terminate();
        }
      } else {
        if (!cancelled) setResult(dedupe({ text: debounced, opts }));
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [debounced, opts]);

  const handleFile = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        setInput(text);
        toast.success(`Loaded ${file.name}`);
      } catch {
        toast.error('Could not read file');
      }
    },
    [toast]
  );

  const handleCopy = useCallback(async () => {
    if (!result.output) return;
    try {
      await navigator.clipboard.writeText(result.output);
      toast.success('Copied');
    } catch {
      toast.error('Copy failed');
    }
  }, [result.output, toast]);

  const handleDownload = useCallback(() => {
    if (!result.output) return;
    const blob = new Blob([result.output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'unique.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [result.output]);

  return (
    <ToolContainer title="Duplicate Line Remover" details={details} toolId={toolId}>
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFile}
          accept=".txt,.csv,text/plain"
          maxSizeMB={50}
          title="Drop a list file"
          description="or paste below (one item per line). Large files run in a Web Worker."
        />

        <Card title="Options" className="p-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={opts.caseSensitive}
                onChange={e => setOpts(o => ({ ...o, caseSensitive: e.target.checked }))}
              />
              Case-sensitive
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={opts.trim}
                onChange={e => setOpts(o => ({ ...o, trim: e.target.checked }))}
              />
              Trim whitespace
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={opts.ignoreBlank}
                onChange={e => setOpts(o => ({ ...o, ignoreBlank: e.target.checked }))}
              />
              Drop blank lines
            </label>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-700 dark:text-gray-300">Keep:</span>
              <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900">
                {(['first', 'last'] as const).map(k => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={opts.keep === k}
                    onClick={() => setOpts(o => ({ ...o, keep: k }))}
                    className={`px-2.5 py-1 text-xs rounded ${
                      opts.keep === k
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm sm:col-span-2">
              <span className="text-gray-700 dark:text-gray-300">Sort:</span>
              <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900">
                {(['none', 'asc', 'desc'] as Sort[]).map(s => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={opts.sort === s}
                    onClick={() => setOpts(o => ({ ...o, sort: s }))}
                    className={`px-2.5 py-1 text-xs rounded ${
                      opts.sort === s
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {s === 'none' ? 'none' : s === 'asc' ? 'A → Z' : 'Z → A'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="dedupe-input">Input list</Label>
              <button
                type="button"
                onClick={() => setInput('')}
                disabled={!input}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                aria-label="Clear"
                title="Clear"
              >
                <Eraser size={16} />
              </button>
            </div>
            <TextArea
              id="dedupe-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="h-[420px]"
              placeholder="Paste a list here..."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {result.total.toLocaleString()} non-blank items
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="dedupe-output">Unique list</Label>
              <div className="flex items-center gap-2">
                {result.removed > 0 && (
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
                    −{result.removed.toLocaleString()} duplicate
                    {result.removed === 1 ? '' : 's'}
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!result.output}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                  aria-label="Copy"
                  title="Copy"
                >
                  <Copy size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!result.output}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                  aria-label="Download"
                  title="Download"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
            <TextArea
              id="dedupe-output"
              readOnly
              value={result.output}
              className="h-[420px] bg-gray-50 dark:bg-gray-900/40"
              placeholder="Result will appear here..."
              aria-live="polite"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {result.unique.toLocaleString()} unique items
            </p>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default DuplicateRemover;

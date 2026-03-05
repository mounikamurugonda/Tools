// tts.worker.ts — runs entirely off the main thread
// Handles model loading + synthesis for any @huggingface/transformers pipeline.
// DO NOT add 'use client' — this file runs in a Worker scope.

import { pipeline, env } from '@huggingface/transformers';

const SPEAKER_EMB_URL =
    'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';

// eslint-disable-next-line
type PipelineFn = (text: string, opts?: Record<string, unknown>) => Promise<{ audio: Float32Array; sampling_rate: number }>;

let synth: PipelineFn | null = null;
let speakerEmbeddings: Float32Array | null = null;
let loadedModelId = '';

self.addEventListener('message', async (e: MessageEvent) => {
    const { type, payload } = e.data as {
        type: 'load' | 'synthesize';
        payload: Record<string, unknown>;
    };

    try {
        // ── LOAD ────────────────────────────────────────────────────────────
        if (type === 'load') {
            const modelId = payload.modelId as string;
            const fetchEmbeddings = !!payload.fetchEmbeddings;

            // Skip if already loaded with same model
            if (loadedModelId === modelId && synth) {
                self.postMessage({ type: 'ready' });
                return;
            }

            env.allowLocalModels = false;
            env.useBrowserCache = true;

            // @ts-ignore – progress_callback is accepted by transformers.js at runtime
            synth = await pipeline('text-to-speech', modelId, {
                device: 'wasm',
                progress_callback: (info: Record<string, unknown>) => {
                    self.postMessage({ type: 'progress', payload: info });
                },
            }) as unknown as PipelineFn;

            loadedModelId = modelId;

            // SpeechT5 needs speaker embeddings – fetch them inside the worker
            if (fetchEmbeddings) {
                self.postMessage({ type: 'step', payload: { step: 'embed', status: 'active' } });
                const res = await fetch(SPEAKER_EMB_URL);
                if (!res.ok) throw new Error(`Embeddings fetch failed: ${res.status}`);
                speakerEmbeddings = new Float32Array(await res.arrayBuffer());
                self.postMessage({ type: 'step', payload: { step: 'embed', status: 'done' } });
            }

            self.postMessage({ type: 'ready' });
        }

        // ── SYNTHESIZE ──────────────────────────────────────────────────────
        if (type === 'synthesize') {
            if (!synth) {
                self.postMessage({ type: 'error', payload: 'Model not loaded' });
                return;
            }

            const text = payload.text as string;
            const speed = (payload.speed as number) ?? 1.0;
            const opts: Record<string, unknown> = {};

            if (speakerEmbeddings && payload.useSpeakerEmbeddings) {
                opts.speaker_embeddings = speakerEmbeddings;
            }

            // Multi-speaker VITS (e.g. Xenova/vits-vctk has 109 speakers)
            if (payload.speakerId !== undefined) {
                opts.speaker_id = payload.speakerId;
            }

            const result = await synth(text, opts);
            let audio = result.audio;
            const sr = result.sampling_rate;

            // Speed resampling (done here so main thread never blocks)
            if (speed !== 1.0) {
                const len = Math.round(audio.length / speed);
                const resampled = new Float32Array(len);
                for (let i = 0; i < len; i++) resampled[i] = audio[Math.round(i * speed)] ?? 0;
                audio = resampled;
            }

            // Transferable: zero-copy hand-off back to main thread
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (self as any).postMessage(
                { type: 'result', payload: { audio, sampling_rate: sr } },
                [audio.buffer],
            );
        }
    } catch (err) {
        self.postMessage({
            type: 'error',
            payload: err instanceof Error ? err.message : String(err),
        });
    }
});

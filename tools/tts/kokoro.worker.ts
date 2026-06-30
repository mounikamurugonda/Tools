// kokoro.worker.ts — Web Worker for Kokoro-JS
// Runs entirely off the main thread. Downloads the UNGATED ONNX model directly to browser Cache.

import { KokoroTTS } from 'kokoro-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let synth: any = null;
let loadedModelId = '';

self.addEventListener('message', async (e: MessageEvent) => {
    const { type, payload } = e.data as {
        type: 'load' | 'synthesize';
        payload: Record<string, unknown>;
    };

    try {
        if (type === 'load') {
            const modelId = payload.modelId as string;
            if (loadedModelId === modelId && synth) {
                self.postMessage({ type: 'ready' });
                return;
            }

            // We explicitly pass the UNGATED ONNX model repository
            synth = await KokoroTTS.from_pretrained(modelId, {
                dtype: 'q8', // 8-bit quantization for fast browser download
                device: 'wasm', // WebAssembly (safe across all browsers)
            });
            loadedModelId = modelId;
            self.postMessage({ type: 'ready' });
        }

        if (type === 'synthesize') {
            if (!synth) {
                self.postMessage({ type: 'error', payload: 'Model not loaded' });
                return;
            }

            const text = payload.text as string;
            const voice = payload.voice as string;
            const speed = (payload.speed as number) ?? 1.0;

            const result = await synth.generate(text, { voice, speed });
            const audio = result.audio; // Float32Array
            const sr = result.sampling_rate; // number

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (self as any).postMessage(
                { type: 'result', payload: { audio, sampling_rate: sr } },
                [audio.buffer],
            );
        }
    } catch (err) {
        let msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('401') || msg.includes('Unauthorized') || msg.includes('Failed to fetch')) {
            msg = "HF Rate Limit Exceeded: You downloaded models too many times recently. Please wait a few minutes and try again.";
        }
        self.postMessage({ type: 'error', payload: msg });
    }
});

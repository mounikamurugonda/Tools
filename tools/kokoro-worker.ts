
import { KokoroTTS, TextSplitterStream } from 'kokoro-js';

// Define context for worker
const ctx: Worker = self as any;
let tts: any = null;

ctx.onmessage = async (event: MessageEvent) => {
    const { type, payload } = event.data;

    try {
        if (type === 'init') {
            const model_id = "onnx-community/Kokoro-82M-ONNX";
            const device = payload?.device || 'wasm';
            const dtype = payload?.dtype || (device === 'webgpu' ? 'fp32' : 'q8');

            console.log(`Worker: Initializing with ${device} (${dtype})...`);

            try {
                // Initialize model
                tts = await KokoroTTS.from_pretrained(model_id, {
                    dtype,
                    device,
                });
                console.log(`Worker: Initialized ${device} successfully.`);

                // Try to get voices
                let voices: any[] = [];
                try {
                    // @ts-ignore
                    if (tts && typeof tts.list_voices === 'function') {
                        // @ts-ignore
                        voices = await tts.list_voices();
                    }
                } catch (e) {
                    // ignore
                }

                ctx.postMessage({ type: 'ready', voices });

            } catch (err: any) {
                console.error(`Worker: Failed to initialize ${device}.`, err);
                ctx.postMessage({ type: 'error', message: err.message || `Failed to initialize ${device}` });
            }
        }

        else if (type === 'speak') {
            if (!tts) throw new Error("Model not initialized");

            const { text, voice } = payload;

            try {
                // Use streaming for faster response
                const splitter = new TextSplitterStream();
                const stream = tts.stream(splitter, { voice });

                (async () => {
                    for await (const result of stream) {
                        if (result.audio) {
                            const wav = result.audio.toWav();

                            // Send chunk immediately for playback
                            if (wav instanceof ArrayBuffer) {
                                ctx.postMessage({ type: 'audio-chunk', buffer: wav }, [wav]);
                            } else {
                                ctx.postMessage({ type: 'audio-chunk', buffer: wav });
                            }
                        }
                    }
                    // Signal stream end (client handles concatenation for download)
                    ctx.postMessage({ type: 'stream-end' });
                })();

                // Push text to splitter to start generation
                splitter.push(text);
                splitter.close();

            } catch (err: any) {
                console.error("Streaming error:", err);
                ctx.postMessage({ type: 'error', message: err.message });
            }
        }
    } catch (error: any) {
        ctx.postMessage({ type: 'error', message: error.message || String(error) });
    }
};

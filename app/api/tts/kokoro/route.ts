import { NextRequest, NextResponse } from 'next/server';

// Server-side Kokoro TTS using kokoro-js
// Model is downloaded once (on first call) and stays in Node.js process memory.
// The HF_TOKEN env var handles gated model authentication transparently.

// Singleton — survives across hot-reloads in dev, lives for process lifetime in prod
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ttsInstance: any = null;
let loading = false;
let loadError: string | null = null;

async function getEngine() {
    if (ttsInstance) return ttsInstance;
    if (loadError) throw new Error(loadError);
    if (loading) throw new Error('Model is still loading — please retry in a moment');

    loading = true;
    try {
        // Set HF token from env before importing so the library picks it up
        if (process.env.HF_TOKEN) {
            process.env.HUGGING_FACE_HUB_TOKEN = process.env.HF_TOKEN;
        }

        const { KokoroTTS } = await import('kokoro-js');

        ttsInstance = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0', {
            dtype: 'q8',      // 8-bit quantized — fast + small
            device: 'cpu',    // server-side CPU inference (swap to 'cuda' if GPU available)
        });

        return ttsInstance;
    } catch (err) {
        loadError = err instanceof Error ? err.message : String(err);
        ttsInstance = null;
        throw err;
    } finally {
        loading = false;
    }
}

// WAV encoder (PCM 32-bit float)
function float32ToWav(samples: Float32Array, sampleRate: number): Buffer {
    const nc = 1, bps = 4, dl = samples.length * bps;
    const buf = Buffer.alloc(44 + dl);
    const write = (offset: number, str: string) => buf.write(str, offset, 'ascii');
    write(0, 'RIFF'); buf.writeUInt32LE(36 + dl, 4); write(8, 'WAVE');
    write(12, 'fmt '); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(3, 20); // PCM float
    buf.writeUInt16LE(nc, 22); buf.writeUInt32LE(sampleRate, 24);
    buf.writeUInt32LE(sampleRate * nc * bps, 28); buf.writeUInt16LE(nc * bps, 32);
    buf.writeUInt16LE(bps * 8, 34); write(36, 'data'); buf.writeUInt32LE(dl, 40);
    for (let i = 0; i < samples.length; i++) buf.writeFloatLE(samples[i], 44 + i * 4);
    return buf;
}

export async function POST(req: NextRequest) {
    try {
        const { text, voice = 'af_heart', speed = 1.0 } = await req.json() as {
            text: string;
            voice?: string;
            speed?: number;
        };

        if (!text?.trim()) {
            return NextResponse.json({ error: 'text is required' }, { status: 400 });
        }
        if (text.length > 2000) {
            return NextResponse.json({ error: 'text exceeds 2000 character limit' }, { status: 400 });
        }

        const engine = await getEngine();

        // generate() returns { audio: Float32Array, sampling_rate: number }
        const result = await engine.generate(text.trim(), {
            voice,
            speed: Math.max(0.5, Math.min(2.0, speed)),
        });

        const wav = float32ToWav(result.audio, result.sampling_rate);

        return new Response(new Uint8Array(wav), {
            status: 200,
            headers: {
                'Content-Type': 'audio/wav',
                'Content-Disposition': `attachment; filename="kokoro-${voice}.wav"`,
                'Content-Length': String(wav.byteLength),
                'Cache-Control': 'no-store',
            },
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[TTS/Kokoro]', message);

        // Surface auth errors clearly
        if (message.includes('401') || message.includes('Unauthorized') || message.includes('403')) {
            return NextResponse.json(
                {
                    error: 'HuggingFace auth required',
                    detail:
                        'Add HF_TOKEN=<your_token> to .env.local and accept the model terms at ' +
                        'https://huggingface.co/onnx-community/Kokoro-82M-v1.0',
                },
                { status: 401 },
            );
        }

        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// GET — health check / model status
export async function GET() {
    return NextResponse.json({
        status: ttsInstance ? 'ready' : loading ? 'loading' : loadError ? 'error' : 'idle',
        error: loadError,
        hint: !process.env.HF_TOKEN
            ? 'Set HF_TOKEN in .env.local and restart the dev server'
            : undefined,
    });
}

'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Square, Loader2, CheckCircle2, AlertCircle, Zap, Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import Slider from '@/components/ui/Slider';

// Kokoro-JS Native TTS (Transformers.js)
// Using ONNX ungated model directly in browser WASM.

type EngineStatus = 'idle' | 'loading' | 'ready' | 'error' | 'speaking';
export type { EngineStatus };

// 10 voices from Kokoro v1.0
const VOICES = [
    { id: 'af_heart', label: '❤️ af_heart — US Female' },
    { id: 'af_bella', label: '🔥 af_bella — US Female' },
    { id: 'af_nicole', label: '🎧 af_nicole — US Female' },
    { id: 'af_sarah', label: '🌸 af_sarah — US Female' },
    { id: 'af_sky', label: '☁️ af_sky — US Female' },
    { id: 'am_michael', label: '🎙️ am_michael — US Male' },
    { id: 'am_puck', label: '⚾ am_puck — US Male' },
    { id: 'am_adam', label: '👔 am_adam — US Male' },
    { id: 'bf_emma', label: '🇬🇧 bf_emma — UK Female' },
    { id: 'bm_george', label: '🇬🇧 bm_george — UK Male' },
];

export interface LoadStep {
    id: string; label: string;
    status: 'pending' | 'active' | 'done' | 'error';
    detail?: string;
}

const STEPS: LoadStep[] = [
    { id: 'worker', label: 'Starting Web Worker', status: 'pending' },
    { id: 'model', label: 'Downloading Kokoro-82M ONNX model', status: 'pending' },
    { id: 'init', label: 'Initialising pipeline', status: 'pending' },
];

interface KokoroTTSProps { text: string }

const KokoroTTS: React.FC<KokoroTTSProps> = ({ text }) => {
    const [status, setStatus] = useState<EngineStatus>('idle');
    const [steps, setSteps] = useState<LoadStep[]>(STEPS);
    const [dlPct, setDlPct] = useState(0);
    const [dlLabel, setDlLabel] = useState('');
    const [error, setError] = useState('');
    const [voiceId, setVoiceId] = useState('af_heart');
    const [speed, setSpeed] = useState(1.0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isSynth, setIsSynth] = useState(false);

    const workerRef = useRef<Worker | null>(null);
    const isLoaded = useRef(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const synthResolve = useRef<((v: { audio: Float32Array; sampling_rate: number }) => void) | null>(null);
    const synthReject = useRef<((r: unknown) => void) | null>(null);

    const upd = (id: string, patch: Partial<LoadStep>) =>
        setSteps(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));

    // ── Spawn worker ──────────────────────────────────────────────────────
    const getWorker = useCallback((): Worker => {
        if (workerRef.current) return workerRef.current;

        const w = new Worker(new URL('./kokoro.worker.ts', import.meta.url), { type: 'module' });

        w.onmessage = (e: MessageEvent) => {
            const { type, payload } = e.data as { type: string; payload: unknown };

            if (type === 'progress') {
                const info = payload as { status?: string; name?: string; loaded?: number; total?: number };
                if (info.status === 'progress' || info.status === 'downloading') {
                    const pct = info.total ? Math.round(((info.loaded ?? 0) / info.total) * 100) : 0;
                    setDlPct(pct);
                    const mb = ((info.loaded ?? 0) / 1024 / 1024).toFixed(1);
                    const tot = ((info.total ?? 0) / 1024 / 1024).toFixed(1);
                    setDlLabel(`${info.name ?? ''} — ${mb}/${tot} MB`);
                    upd('model', { status: 'active' });
                }
            }

            if (type === 'ready') {
                upd('model', { status: 'done', detail: 'Kokoro model cached in browser' });
                upd('init', { status: 'done', detail: 'Pipeline ready (Web Worker)' });
                isLoaded.current = true;
                setStatus('ready');
            }

            if (type === 'result') {
                const { audio, sampling_rate } = payload as { audio: Float32Array; sampling_rate: number };
                synthResolve.current?.({ audio, sampling_rate });
                synthResolve.current = null; synthReject.current = null;
            }

            if (type === 'error') {
                const msg = payload as string;
                setError(msg);
                synthReject.current?.(msg);
                synthResolve.current = null; synthReject.current = null;
                setStatus('error');
                setSteps(prev => prev.map(s => s.status === 'active' ? { ...s, status: 'error' } : s));
            }
        };

        workerRef.current = w;
        return w;
    }, []);

    // ── Load engine ───────────────────────────────────────────────────────
    const loadEngine = useCallback(() => {
        if (isLoaded.current) return;
        setStatus('loading');
        setSteps(STEPS.map(s => ({ ...s, status: 'pending' as const })));
        setError(''); setDlPct(0); setDlLabel('');

        upd('worker', { status: 'active' });
        const w = getWorker();
        upd('worker', { status: 'done', detail: 'Engine ready' });
        upd('model', { status: 'active' });
        upd('init', { status: 'active' });

        // Kokoro-82M ungated repository explicitly specified here
        w.postMessage({ type: 'load', payload: { modelId: 'onnx-community/Kokoro-82M-ONNX' } });
    }, [getWorker]);

    // Auto-load on tab mount
    useEffect(() => { loadEngine(); }, [loadEngine]);

    // ── Speak ─────────────────────────────────────────────────────────────
    const speak = async () => {
        if (status === 'speaking' && !isSynth) {
            audioRef.current?.pause();
            setStatus('ready');
            return;
        }
        if (!text.trim() || status !== 'ready') return;

        setStatus('speaking'); setIsSynth(true);
        if (audioUrl) { URL.revokeObjectURL(audioUrl); setAudioUrl(null); }

        try {
            const result = await new Promise<{ audio: Float32Array; sampling_rate: number }>((res, rej) => {
                synthResolve.current = res;
                synthReject.current = rej;
                workerRef.current!.postMessage({
                    type: 'synthesize',
                    payload: { text, speed, voice: voiceId },
                });
            });

            const wav = float32ToWav(result.audio, result.sampling_rate);
            const blob = new Blob([wav], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);

            const el = new Audio(url);
            audioRef.current = el;
            el.onended = () => setStatus('ready');
            el.onerror = () => setStatus('ready');
            el.play().catch((e: Error) => { if (e.name !== 'AbortError') setStatus('ready'); });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Synthesis failed');
            setStatus('ready');
        } finally {
            setIsSynth(false);
        }
    };

    const isReady = status === 'ready' || status === 'speaking';

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300">
                    <Zap className="w-3.5 h-3.5" /> High Quality · Offline Capable · Privacy First
                </span>
                <StatusBadge status={isSynth ? 'speaking' : status} color="purple" />
            </div>

            {/* Voice selection — always visible */}
            <Card title="Voice (Kokoro Built-In)">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Downloads the AI voice model (~80MB) once to your device. It runs entirely offline for maximum privacy.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {VOICES.map(v => (
                        <button key={v.id} onClick={() => setVoiceId(v.id)} disabled={isSynth}
                            className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${voiceId === v.id
                                ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                                : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600'
                                }`}>
                            {v.label}
                        </button>
                    ))}
                </div>
            </Card>

            <Slider label="Speed" min={0.5} max={2} step={0.1} value={speed}
                onChange={e => setSpeed(Number(e.target.value))} valueDisplay={`${speed.toFixed(1)}x`} />

            {status === 'idle' && (
                <EngineFeatures features={[
                    { icon: '🎤', label: '10 Voices', sub: 'High Fidelity' },
                    { icon: '🔒', label: '100% Private', sub: 'No cloud processing' },
                    { icon: '⚡', label: 'Fast & Free', sub: 'Runs on your device' },
                ]} />
            )}

            {status === 'loading' && (
                <Card title="Loading Voice Engine">
                    <div className="space-y-4">
                        {steps.map((s, i) => <StepRow key={s.id} step={s} index={i} color="purple" />)}
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span className="truncate max-w-[70%]">{dlLabel || 'Checking cache…'}</span>
                                <span className="font-mono font-bold text-purple-600">{dlPct}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-full transition-all duration-300"
                                    style={{ width: `${dlPct}%` }} />
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {status === 'error' && (
                <ErrorCard message={error} onRetry={() => {
                    setStatus('idle'); isLoaded.current = false;
                    workerRef.current?.terminate(); workerRef.current = null;
                    loadEngine();
                }} />
            )}

            {isSynth && (
                <Card>
                    <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 text-purple-500 animate-spin shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Generating Audio…</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Please wait ~10-20 seconds on the first run. Subsequent runs will be faster.</p>
                        </div>
                    </div>
                </Card>
            )}

            {audioUrl && isReady && !isSynth && (
                <Card>
                    <div className="flex items-center justify-between mb-2">
                        <Label>Generated Audio</Label>
                        <a href={audioUrl} download="kokoro-audio.wav"
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors border border-purple-200 dark:border-purple-700">
                            <Download className="w-3.5 h-3.5" /> Download WAV
                        </a>
                    </div>
                    <audio key={audioUrl} controls className="w-full rounded-xl" src={audioUrl} />
                </Card>
            )}

            <Button onClick={speak} size="lg" className="w-full border-0"
                variant={status === 'speaking' && !isSynth ? 'danger' : 'primary'}
                disabled={status === 'loading' || isSynth || !text.trim() || !isReady}
                style={!(status === 'speaking' && !isSynth) ? { background: 'linear-gradient(to right,#9333ea,#7c3aed)' } : {}}>
                {isSynth
                    ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Processing in Worker…</>
                    : status === 'speaking'
                        ? <><Square className="w-5 h-5 mr-2 fill-current" />Stop</>
                        : status === 'loading'
                            ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Loading model…</>
                            : <><Play className="w-5 h-5 mr-2 fill-current" />Generate Speech</>}
            </Button>
        </div>
    );
};

// ── Shared exports (used by PiperTTS and SherpaOnnxTTS) ──────────────────────

export const StatusBadge: React.FC<{ status: EngineStatus; color: string }> = ({ status, color }) => {
    const colorMap: Record<string, string> = {
        purple: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700',
        emerald: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700',
        orange: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700',
    };
    const labels: Record<EngineStatus, string> = {
        idle: 'Not loaded', loading: 'Loading…', ready: 'Ready ✓', error: 'Error', speaking: 'Speaking…',
    };
    return (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1 ${status === 'idle' ? 'text-gray-500 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            : status === 'loading' ? 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700'
                : status === 'error' ? 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                    : colorMap[color]
            }`}>
            {(status === 'loading' || status === 'speaking') && <Loader2 className="w-3 h-3 animate-spin" />}
            {labels[status]}
        </span>
    );
};

export const StepRow: React.FC<{ step: LoadStep; index: number; color: string }> = ({ step, index, color }) => {
    const colorMap: Record<string, string> = {
        purple: 'text-purple-600 dark:text-purple-400',
        emerald: 'text-emerald-600 dark:text-emerald-400',
        orange: 'text-orange-600 dark:text-orange-400',
    };
    const ac = colorMap[color] ?? 'text-blue-600';
    return (
        <div className={`flex items-start gap-3 transition-opacity ${step.status === 'pending' ? 'opacity-40' : ''}`}>
            <div className="mt-0.5 shrink-0">
                {step.status === 'pending' && <span className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 inline-block" />}
                {step.status === 'active' && <Loader2 className={`w-5 h-5 ${ac} animate-spin`} />}
                {step.status === 'done' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {step.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
            </div>
            <div>
                <p className={`text-sm font-medium ${step.status === 'active' ? ac : 'text-gray-900 dark:text-white'}`}>
                    <span className="text-gray-400 mr-1">{index + 1}.</span>{step.label}
                </p>
                {step.detail && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.detail}</p>}
            </div>
        </div>
    );
};

export const EngineFeatures: React.FC<{ features: { icon: string; label: string; sub: string }[] }> = ({ features }) => (
    <div className="grid grid-cols-3 gap-3 text-center text-xs">
        {features.map(f => (
            <div key={f.label} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="text-xl mb-1">{f.icon}</div>
                <div className="font-semibold text-gray-900 dark:text-white text-xs">{f.label}</div>
                <div className="text-gray-500 dark:text-gray-400 text-[10px]">{f.sub}</div>
            </div>
        ))}
    </div>
);

export const ErrorCard: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
    <Card>
        <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <div>
                <p className="font-semibold text-red-600 dark:text-red-400 text-sm">Engine failed to load</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-all">{message}</p>
                <Button onClick={onRetry} variant="secondary" size="sm" className="mt-3">Retry</Button>
            </div>
        </div>
    </Card>
);

export function float32ToWav(samples: Float32Array, sampleRate: number): ArrayBuffer {
    const nc = 1, bps = 4, dl = samples.length * bps;
    const buf = new ArrayBuffer(44 + dl);
    const v = new DataView(buf);
    const w = (o: number, s: string) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); v.setUint32(4, 36 + dl, true); w(8, 'WAVE');
    w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 3, true);
    v.setUint16(22, nc, true); v.setUint32(24, sampleRate, true);
    v.setUint32(28, sampleRate * nc * bps, true); v.setUint16(32, nc * bps, true);
    v.setUint16(34, bps * 8, true); w(36, 'data'); v.setUint32(40, dl, true);
    for (let i = 0; i < samples.length; i++) v.setFloat32(44 + i * 4, samples[i], true);
    return buf;
}

export default KokoroTTS;

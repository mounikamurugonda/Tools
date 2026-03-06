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

// Official voices from Kokoro v1.0
const VOICES = [
    { id: 'af_heart', label: '❤️ af_heart — US Female' },
    { id: 'af_bella', label: '🔥 af_bella — US Female' },
    { id: 'af_nicole', label: '🎧 af_nicole — US Female' },
    { id: 'af_sarah', label: '🌸 af_sarah — US Female' },
    { id: 'af_sky', label: '☁️ af_sky — US Female' },
    { id: 'af_jessica', label: '👱‍♀️ af_jessica — US Female' },
    { id: 'af_kore', label: '👑 af_kore — US Female' },
    { id: 'af_aoife', label: '☘️ af_aoife — US Female' },
    { id: 'af_nova', label: '🚀 af_nova — US Female' },
    { id: 'af_river', label: '🌊 af_river — US Female' },
    { id: 'am_michael', label: '🎙️ am_michael — US Male' },
    { id: 'am_puck', label: '⚾ am_puck — US Male' },
    { id: 'am_adam', label: '👔 am_adam — US Male' },
    { id: 'am_eric', label: '👨‍🏫 am_eric — US Male' },
    { id: 'am_liam', label: '🎸 am_liam — US Male' },
    { id: 'am_fenrir', label: '🐺 am_fenrir — US Male' },
    { id: 'am_onyx', label: '🌑 am_onyx — US Male' },
    { id: 'bf_emma', label: '🇬🇧 bf_emma — UK Female' },
    { id: 'bf_alice', label: '🇬🇧 bf_alice — UK Female' },
    { id: 'bf_aria', label: '🇬🇧 bf_aria — UK Female' },
    { id: 'bf_isabella', label: '🇬🇧 bf_isabella — UK Female' },
    { id: 'bf_lily', label: '🇬🇧 bf_lily — UK Female' },
    { id: 'bm_george', label: '🇬🇧 bm_george — UK Male' },
    { id: 'bm_lewis', label: '🇬🇧 bm_lewis — UK Male' },
    { id: 'bm_daniel', label: '🇬🇧 bm_daniel — UK Male' },
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

export interface EngineRef {
    synthesize: (globalSpeed: number) => Promise<void>;
    stop: () => void;
}

interface KokoroTTSProps {
    text: string;
    isActive: boolean;
    onSelect: () => void;
    onStateChange: (status: EngineStatus, isSynth: boolean) => void;
    onAudioReady: (url: string) => void;
}

const KokoroTTS = React.forwardRef<EngineRef, KokoroTTSProps>(({ text, isActive, onSelect, onStateChange, onAudioReady }, ref) => {
    const [status, setStatus] = useState<EngineStatus>('idle');
    const [steps, setSteps] = useState<LoadStep[]>(STEPS);
    const [dlPct, setDlPct] = useState(0);
    const [dlLabel, setDlLabel] = useState('');
    const [error, setError] = useState('');
    const [voiceId, setVoiceId] = useState<string | null>(null);
    const [isSynth, setIsSynth] = useState(false);

    const workerRef = useRef<Worker | null>(null);
    const isLoaded = useRef(false);
    const synthResolve = useRef<((v: { audio: Float32Array; sampling_rate: number }) => void) | null>(null);
    const synthReject = useRef<((r: unknown) => void) | null>(null);

    // Bubble state
    useEffect(() => { onStateChange(status, isSynth); }, [status, isSynth, onStateChange]);

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

    // ── Expose API to Parent ──────────────────────────────────────────────
    React.useImperativeHandle(ref, () => ({
        synthesize: async (globalSpeed: number) => {
            if (status !== 'ready' || !text.trim() || isSynth || !voiceId) return;

            setStatus('speaking'); setIsSynth(true);

            try {
                const result = await new Promise<{ audio: Float32Array; sampling_rate: number }>((res, rej) => {
                    synthResolve.current = res;
                    synthReject.current = rej;
                    workerRef.current!.postMessage({
                        type: 'synthesize',
                        payload: { text, speed: globalSpeed, voice: voiceId },
                    });
                });

                const wav = float32ToWav(result.audio, result.sampling_rate);
                const blob = new Blob([wav], { type: 'audio/wav' });
                const url = URL.createObjectURL(blob);
                onAudioReady(url);
                setStatus('ready');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Synthesis failed');
                setStatus('ready');
            } finally {
                setIsSynth(false);
            }
        },
        stop: () => {
            // Can't strictly interrupt JS worker processing easily without terminating,
            // but we can at least signal ready if it was speaking.
            setStatus('ready');
            setIsSynth(false);
        }
    }));

    const isReady = status === 'ready' || status === 'speaking';

    return (
        <div className="space-y-4">
            {/* Voice selection — always visible */}
            <div onClick={onSelect} className="cursor-pointer">
                <Card title="Kokoro Built-In (Highest Quality)"
                    className={`transition-all duration-300 ${isActive ? 'ring-2 ring-purple-500 shadow-xl dark:ring-purple-400 bg-purple-50/30 dark:bg-purple-900/10' : 'hover:border-purple-300 dark:hover:border-purple-700/50'}`}>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Downloads the AI voice model (~80MB) once to your device. It runs entirely offline for maximum privacy.
                    </p>
                    <div data-lenis-prevent className="grid grid-cols-2 lg:grid-cols-3 gap-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                        {VOICES.map(v => (
                            <button key={v.id} onClick={(e) => { e.stopPropagation(); setVoiceId(v.id); onSelect(); }} disabled={isSynth}
                                className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${isActive && voiceId === v.id
                                    ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                                    : 'bg-white dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600'
                                    }`}>
                                {v.label}
                            </button>
                        ))}
                    </div>

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
                </Card>
            </div>
        </div>
    );
});

KokoroTTS.displayName = 'KokoroTTS';

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

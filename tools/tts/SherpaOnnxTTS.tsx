'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Square, Loader2, Download, Cpu } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import Slider from '@/components/ui/Slider';
import { StatusBadge, StepRow, EngineFeatures, ErrorCard, float32ToWav } from './KokoroTTS';

// SpeechT5 (Microsoft) via @huggingface/transformers.
// ALL loading and synthesis runs in a Web Worker — main thread never blocks.

type StepStatus = 'pending' | 'active' | 'done' | 'error';
interface SherpaStep { id: string; label: string; status: StepStatus; detail?: string }
type EngineStatus = 'idle' | 'loading' | 'ready' | 'error' | 'speaking';

const SPEAKER_STYLES = [
    { value: 0, label: '🎙️ Speaker A (Neutral)' },
    { value: 1, label: '🎤 Speaker B (Soft)' },
    { value: 2, label: '📢 Speaker C (Clear)' },
    { value: 3, label: '🔊 Speaker D (Deep)' },
    { value: 4, label: '🌟 Speaker E (Bright)' },
    { value: 5, label: '🎵 Speaker F (Warm)' },
];

const STEPS: SherpaStep[] = [
    { id: 'worker', label: 'Preparing Engine', status: 'pending' },
    { id: 'model', label: 'Downloading Voice Model (~130 MB)', status: 'pending' },
    { id: 'embed', label: 'Loading Voice Profiles (3 KB)', status: 'pending' },
    { id: 'init', label: 'Starting Up', status: 'pending' },
];

interface SherpaOnnxTTSProps { text: string }

const SherpaOnnxTTS: React.FC<SherpaOnnxTTSProps> = ({ text }) => {
    const [status, setStatus] = useState<EngineStatus>('idle');
    const [steps, setSteps] = useState<SherpaStep[]>(STEPS);
    const [dlPct, setDlPct] = useState(0);
    const [dlLabel, setDlLabel] = useState('');
    const [error, setError] = useState('');
    const [speakerIdx, setSpeakerIdx] = useState(0);
    const [speed, setSpeed] = useState(1.0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isSynth, setIsSynth] = useState(false);

    const workerRef = useRef<Worker | null>(null);
    const isLoaded = useRef(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const synthResolve = useRef<((v: { audio: Float32Array; sampling_rate: number }) => void) | null>(null);
    const synthReject = useRef<((r: unknown) => void) | null>(null);

    const upd = (id: string, patch: Partial<SherpaStep>) =>
        setSteps(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));

    // ── Spawn worker ──────────────────────────────────────────────────────
    const getWorker = useCallback((): Worker => {
        if (workerRef.current) return workerRef.current;

        const w = new Worker(new URL('./tts.worker.ts', import.meta.url), { type: 'module' });

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

            if (type === 'step') {
                const { step, status: s } = payload as { step: string; status: StepStatus };
                upd(step, { status: s, detail: s === 'done' ? 'Embeddings fetched (3 KB)' : undefined });
                if (step === 'embed' && s === 'done') upd('init', { status: 'active' });
            }

            if (type === 'ready') {
                upd('model', { status: 'done', detail: 'SpeechT5 cached in browser' });
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
                setSteps(prev => prev.map(s => s.status === 'active' ? { ...s, status: 'error' as StepStatus } : s));
            }
        };

        workerRef.current = w;
        return w;
    }, []);

    // ── Load engine ───────────────────────────────────────────────────────
    const loadEngine = useCallback(() => {
        if (isLoaded.current) return;
        setStatus('loading');
        setSteps(STEPS.map(s => ({ ...s, status: 'pending' as StepStatus })));
        setError(''); setDlPct(0); setDlLabel('');

        upd('worker', { status: 'active' });
        const w = getWorker();
        upd('worker', { status: 'done', detail: 'Engine ready' });
        upd('model', { status: 'active' });

        w.postMessage({
            type: 'load',
            payload: {
                modelId: 'Xenova/speecht5_tts',
                fetchEmbeddings: true, // worker fetches speaker_embeddings.bin internally
            },
        });
    }, [getWorker]);

    // Auto-load on mount (tab click triggers this)
    useEffect(() => { loadEngine(); }, [loadEngine]);

    // ── Speak (entirely off main thread) ──────────────────────────────────
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
                    payload: {
                        text,
                        speed,
                        useSpeakerEmbeddings: true,
                    },
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

    const isEngineReady = status === 'ready' || status === 'speaking';

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 text-orange-700 dark:text-orange-300">
                    <Cpu className="w-3.5 h-3.5" /> Super Fast · Battery Friendly · Private
                </span>
                <StatusBadge status={isSynth ? 'speaking' : status} color="orange" />
            </div>

            {/* Speaker style — always visible */}
            <Card title="Speaker Style">
                <div className="grid grid-cols-2 gap-2">
                    {SPEAKER_STYLES.map(s => (
                        <button key={s.value} onClick={() => setSpeakerIdx(s.value)} disabled={isSynth}
                            className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${speakerIdx === s.value
                                ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                                : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-600'
                                }`}>
                            {s.label}
                        </button>
                    ))}
                </div>
            </Card>

            <Slider label="Speed" min={0.5} max={2} step={0.05} value={speed}
                onChange={e => setSpeed(Number(e.target.value))} valueDisplay={`${speed.toFixed(2)}x`} />

            {status === 'idle' && (
                <EngineFeatures features={[
                    { icon: '🚀', label: 'Ultra-Fast', sub: 'Instant responses' },
                    { icon: '🔋', label: 'Efficient', sub: 'Battery friendly' },
                    { icon: '🔒', label: '100% Private', sub: 'Runs perfectly locally' },
                ]} />
            )}

            {status === 'loading' && (
                <Card title="Loading Voice Engine">
                    <div className="space-y-4">
                        {steps.map((s, i) => <StepRow key={s.id} step={s} index={i} color="orange" />)}
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span className="truncate max-w-[70%]">{dlLabel || 'Initialising worker…'}</span>
                                <span className="font-mono font-bold text-orange-600">{dlPct}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300"
                                    style={{ width: `${dlPct}%` }} />
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {status === 'error' && (
                <ErrorCard message={error} onRetry={() => { setStatus('idle'); isLoaded.current = false; workerRef.current?.terminate(); workerRef.current = null; }} />
            )}

            {isSynth && (
                <Card>
                    <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 text-orange-500 animate-spin shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Generating Audio…</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Your device is synthesizing the voice. This happens entirely offline.</p>
                        </div>
                    </div>
                </Card>
            )}

            {audioUrl && isEngineReady && !isSynth && (
                <Card>
                    <div className="flex items-center justify-between mb-2">
                        <Label>Generated Audio</Label>
                        <a href={audioUrl} download="sherpa-tts.wav"
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors border border-orange-200 dark:border-orange-700">
                            <Download className="w-3.5 h-3.5" /> Download WAV
                        </a>
                    </div>
                    <audio key={audioUrl} controls className="w-full rounded-xl" src={audioUrl} />
                </Card>
            )}

            {error && isEngineReady && (
                <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 rounded-xl">{error}</p>
            )}

            <Button onClick={speak} size="lg" className="w-full border-0"
                variant={status === 'speaking' && !isSynth ? 'danger' : 'primary'}
                disabled={status === 'loading' || isSynth || !text.trim() || !isEngineReady}
                style={!(status === 'speaking' && !isSynth) ? { background: 'linear-gradient(to right,#f97316,#f59e0b)' } : {}}>
                {isSynth
                    ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Generating Audio…</>
                    : status === 'speaking'
                        ? <><Square className="w-5 h-5 mr-2 fill-current" />Stop</>
                        : status === 'loading'
                            ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Loading Engine…</>
                            : <><Play className="w-5 h-5 mr-2 fill-current" />Generate Speech</>}
            </Button>
        </div>
    );
};

export default SherpaOnnxTTS;

'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Square, Loader2, Download, Cpu } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import Slider from '@/components/ui/Slider';
import { StatusBadge, StepRow, EngineFeatures, ErrorCard, float32ToWav, EngineRef } from './KokoroTTS';

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

interface SherpaOnnxTTSProps {
    text: string;
    isActive: boolean;
    onSelect: () => void;
    onStateChange: (status: EngineStatus, isSynth: boolean) => void;
    onAudioReady: (url: string) => void;
}

const SherpaOnnxTTS = React.forwardRef<EngineRef, SherpaOnnxTTSProps>(({ text, isActive, onSelect, onStateChange, onAudioReady }, ref) => {
    const [status, setStatus] = useState<EngineStatus>('idle');
    const [steps, setSteps] = useState<SherpaStep[]>(STEPS);
    const [dlPct, setDlPct] = useState(0);
    const [dlLabel, setDlLabel] = useState('');
    const [error, setError] = useState('');
    const [speakerIdx, setSpeakerIdx] = useState<number | null>(null);
    const [isSynth, setIsSynth] = useState(false);

    const workerRef = useRef<Worker | null>(null);
    const isLoaded = useRef(false);
    const synthResolve = useRef<((v: { audio: Float32Array; sampling_rate: number }) => void) | null>(null);
    const synthReject = useRef<((r: unknown) => void) | null>(null);

    // Bubble state
    useEffect(() => { onStateChange(status, isSynth); }, [status, isSynth, onStateChange]);

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

    // ── Expose API to Parent ──────────────────────────────────────────────
    React.useImperativeHandle(ref, () => ({
        synthesize: async (globalSpeed: number, overrideText?: string) => {
            const synthText = overrideText || text;
            if (status !== 'ready' || !synthText.trim() || isSynth || speakerIdx === null) return;

            setStatus('speaking'); setIsSynth(true);

            try {
                const result = await new Promise<{ audio: Float32Array; sampling_rate: number }>((res, rej) => {
                    synthResolve.current = res;
                    synthReject.current = rej;
                    workerRef.current!.postMessage({
                        type: 'synthesize',
                        payload: {
                            text: synthText,
                            speed: globalSpeed,
                            useSpeakerEmbeddings: true, // required for this model
                        },
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
            setStatus('ready');
            setIsSynth(false);
        }
    }));

    return (
        <div className="space-y-4">
            {/* Speaker style — always visible */}
            <div onClick={onSelect} className="cursor-pointer">
                <Card title="Sherpa-ONNX (Speaker Style)"
                    className={`transition-all duration-300 ${isActive ? 'ring-2 ring-orange-500 shadow-xl dark:ring-orange-400 bg-orange-50/30 dark:bg-orange-900/10' : 'hover:border-orange-300 dark:hover:border-orange-700/50'}`}>
                    <div data-lenis-prevent className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                        {SPEAKER_STYLES.map(s => (
                            <button key={s.value} onClick={(e) => { e.stopPropagation(); setSpeakerIdx(s.value); onSelect(); }} disabled={isSynth}
                                className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${isActive && speakerIdx === s.value
                                    ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                                    : 'bg-white dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-600'
                                    }`}>
                                {s.label}
                            </button>
                        ))}
                    </div>

                    {status === 'loading' && (
                        <div className="mt-4 pt-4 border-t border-orange-100 dark:border-orange-800/50 space-y-3">
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-orange-700 dark:text-orange-300">
                                    <span>{dlLabel || 'Downloading Engine...'}</span>
                                    <span>{dlPct}%</span>
                                </div>
                                <div className="h-2 w-full bg-orange-200 dark:bg-orange-900/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-600 transition-all duration-300" style={{ width: `${Math.max(0, dlPct)}%` }} />
                                </div>
                            </div>
                        </div>
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
                </Card>
            </div>
        </div>
    );
});

SherpaOnnxTTS.displayName = 'SherpaOnnxTTS';

export default SherpaOnnxTTS;

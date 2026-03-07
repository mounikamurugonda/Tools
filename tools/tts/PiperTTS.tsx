'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Square, Loader2, Download, Mic } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import { StatusBadge, StepRow, EngineFeatures, ErrorCard, float32ToWav, EngineRef } from './KokoroTTS';

// MMS-TTS by Facebook/Meta — Piper's VITS architecture, 1100+ languages.
// ALL model loading + synthesis runs in a Web Worker → main thread never blocks.

const LANGUAGES = [
    { value: 'eng', label: '🇺🇸 English' },
    { value: 'fra', label: '🇫🇷 French' },
    { value: 'deu', label: '🇩🇪 German' },
    { value: 'spa', label: '🇪🇸 Spanish' },
    { value: 'por', label: '🇧🇷 Portuguese' },
    { value: 'ita', label: '🇮🇹 Italian' },
    { value: 'hin', label: '🇮🇳 Hindi' },
    { value: 'cmn', label: '🇨🇳 Mandarin' },
    { value: 'jpn', label: '🇯🇵 Japanese' },
    { value: 'kor', label: '🇰🇷 Korean' },
    { value: 'arb', label: '🇸🇦 Arabic' },
    { value: 'rus', label: '🇷🇺 Russian' },
];

type PiperStepStatus = 'pending' | 'active' | 'done' | 'error';
interface PiperStep { id: string; label: string; status: PiperStepStatus; detail?: string }
type EngineStatus = 'idle' | 'loading' | 'ready' | 'error' | 'speaking';

const STEPS: PiperStep[] = [
    { id: 'worker', label: 'Preparing Engine', status: 'pending' },
    { id: 'model', label: 'Downloading Language Model', status: 'pending' },
    { id: 'init', label: 'Starting Up', status: 'pending' },
];

interface PiperTTSProps {
    text: string;
    isActive: boolean;
    onSelect: () => void;
    onStateChange: (status: EngineStatus, isSynth: boolean) => void;
    onAudioReady: (url: string) => void;
}

const PiperTTS = React.forwardRef<EngineRef, PiperTTSProps>(({ text, isActive, onSelect, onStateChange, onAudioReady }, ref) => {
    const [status, setStatus] = useState<EngineStatus>('idle');
    const [steps, setSteps] = useState<PiperStep[]>(STEPS);
    const [dlPct, setDlPct] = useState(0);
    const [dlLabel, setDlLabel] = useState('');
    const [error, setError] = useState('');
    const [lang, setLang] = useState<string | null>(null);
    const [isSynth, setIsSynth] = useState(false);

    const workerRef = useRef<Worker | null>(null);
    const loadedLang = useRef<string | null>(null);
    const cachedLangs = useRef<Set<string>>(new Set());
    const synthResolve = useRef<((v: { audio: Float32Array; sampling_rate: number }) => void) | null>(null);
    const synthReject = useRef<((r: unknown) => void) | null>(null);

    // Bubble state
    useEffect(() => { onStateChange(status, isSynth); }, [status, isSynth, onStateChange]);

    const upd = (id: string, patch: Partial<PiperStep>) =>
        setSteps(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));

    // ── Spawn / reuse worker ──────────────────────────────────────────────
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

            if (type === 'ready') {
                upd('model', { status: 'done', detail: 'Model cached on your device' });
                upd('init', { status: 'done', detail: 'Ready to generate' });
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
                setSteps(prev => prev.map(s => s.status === 'active' ? { ...s, status: 'error' as PiperStepStatus } : s));
            }
        };

        workerRef.current = w;
        return w;
    }, []);

    // ── Load engine ───────────────────────────────────────────────────────
    const loadEngine = useCallback(async () => {
        if (!lang) return;
        if (loadedLang.current === lang && status !== 'idle' && status !== 'error') return;

        setStatus('loading');
        setSteps(STEPS.map(s => ({ ...s, status: 'pending' as PiperStepStatus })));
        setError(''); setDlPct(0); setDlLabel('');

        upd('worker', { status: 'active' });
        const w = getWorker();
        upd('worker', { status: 'done', detail: 'Engine ready' });
        upd('model', { status: 'active' });
        upd('init', { status: 'active' });

        loadedLang.current = lang;
        w.postMessage({ type: 'load', payload: { modelId: `Xenova/mms-tts-${lang}` } });
    }, [lang, status, getWorker]);

    // Auto-load as soon as this tab is first mounted (tab click → model download begins)
    useEffect(() => { loadEngine(); }, [loadEngine]);

    // ── Expose API to Parent ──────────────────────────────────────────────
    // ── Expose API to Parent ──────────────────────────────────────────────
    React.useImperativeHandle(ref, () => ({
        synthesize: async (globalSpeed: number, overrideText?: string) => {
            const synthText = overrideText || text;
            if (status !== 'ready' || !synthText.trim() || isSynth || !lang) return;

            setStatus('speaking'); setIsSynth(true);

            try {
                const result = await new Promise<{ audio: Float32Array; sampling_rate: number }>((res, rej) => {
                    synthResolve.current = res;
                    synthReject.current = rej;
                    // Pass lang so the worker knows which initialized model to use
                    workerRef.current?.postMessage({
                        type: 'synthesize',
                        payload: { text: synthText, speed: globalSpeed, lang }
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
            setStatus('ready'); setIsSynth(false);
        }
    }));

    return (
        <div className="space-y-4">
            <div onClick={onSelect} className="cursor-pointer">
                <Card title="Piper (Language / Voice)"
                    className={`transition-all duration-300 ${isActive ? 'ring-2 ring-emerald-500 shadow-xl dark:ring-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10' : 'hover:border-emerald-300 dark:hover:border-emerald-700/50'}`}>
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            Piper uses a distinct ~140MB AI model for <b>each</b> language. Switching languages unloads the current model and loads the new one into memory. If previously downloaded, it loads instantly from your device cache without the internet.
                        </p>
                        <div data-lenis-prevent className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                            {LANGUAGES.map(l => (
                                <button
                                    key={l.value}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLang(l.value);
                                        if (l.value !== loadedLang.current) {
                                            setStatus('idle'); // trigger reload
                                        }
                                        onSelect();
                                    }}
                                    disabled={isSynth}
                                    className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${isActive && lang === l.value
                                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                                        : 'bg-white dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600'
                                        }`}
                                >
                                    {l.label}
                                    {cachedLangs.current.has(l.value) && <span className="ml-1 opacity-60 text-[10px]">✓</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {status === 'loading' && (
                        <div className="mt-4 pt-4 border-t border-emerald-100 dark:border-emerald-800/50 space-y-3">
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                    <span>{dlLabel || 'Downloading Engine...'}</span>
                                    <span>{dlPct}%</span>
                                </div>
                                <div className="h-2 w-full bg-emerald-200 dark:bg-emerald-900/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: `${Math.max(0, dlPct)}%` }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <ErrorCard message={error} onRetry={() => { setStatus('idle'); loadedLang.current = ''; }} />
                    )}

                    {isSynth && (
                        <Card>
                            <div className="flex items-center gap-3">
                                <Loader2 className="w-5 h-5 text-emerald-500 animate-spin shrink-0" />
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

PiperTTS.displayName = 'PiperTTS';

export default PiperTTS;

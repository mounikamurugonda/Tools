'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Square, Loader2, Download, Mic } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import { StatusBadge, StepRow, EngineFeatures, ErrorCard, float32ToWav } from './KokoroTTS';

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

interface PiperTTSProps { text: string }

const PiperTTS: React.FC<PiperTTSProps> = ({ text }) => {
    const [status, setStatus] = useState<EngineStatus>('idle');
    const [steps, setSteps] = useState<PiperStep[]>(STEPS);
    const [dlPct, setDlPct] = useState(0);
    const [dlLabel, setDlLabel] = useState('');
    const [error, setError] = useState('');
    const [lang, setLang] = useState('eng');
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isSynth, setIsSynth] = useState(false);

    const workerRef = useRef<Worker | null>(null);
    const loadedLang = useRef('');
    const cachedLangs = useRef<Set<string>>(new Set());
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const synthResolve = useRef<((v: { audio: Float32Array; sampling_rate: number }) => void) | null>(null);
    const synthReject = useRef<((r: unknown) => void) | null>(null);

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

    // ── Speak (fully off main thread) ─────────────────────────────────────
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
                    payload: { text },
                });
            });

            const wav = float32ToWav(result.audio, result.sampling_rate);
            const blob = new Blob([wav], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
            cachedLangs.current.add(lang);

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
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300">
                    <Mic className="w-3.5 h-3.5" /> Over 1,100 Languages · Offline Capable · Private
                </span>
                <StatusBadge status={isSynth ? 'speaking' : status} color="emerald" />
            </div>

            {/* Language selection — always visible */}
            <Card title="Language / Voice">
                <div className="space-y-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Piper uses a distinct ~140MB AI model for <b>each</b> language. Switching languages unloads the current model and loads the new one into memory. If previously downloaded, it loads instantly from your device cache without the internet.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {LANGUAGES.map(l => (
                            <button
                                key={l.value}
                                onClick={() => {
                                    setLang(l.value);
                                    if (l.value !== loadedLang.current) {
                                        setStatus('idle'); // trigger reload
                                    }
                                }}
                                disabled={isSynth}
                                className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${lang === l.value
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                                    : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600'
                                    }`}
                            >
                                {l.label}
                                {cachedLangs.current.has(l.value) && <span className="ml-1 opacity-60 text-[10px]">✓</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {status === 'idle' && (
                <EngineFeatures features={[
                    { icon: '🌍', label: '1100+ Langs', sub: 'Global coverage' },
                    { icon: '🔒', label: '100% Private', sub: 'No cloud processing' },
                    { icon: '💾', label: 'Smart Cache', sub: 'Instant reloading' },
                ]} />
            )}

            {status === 'loading' && (
                <Card title="Loading Voice Engine">
                    <div className="space-y-4">
                        {steps.map((s, i) => <StepRow key={s.id} step={s} index={i} color="emerald" />)}
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span className="truncate max-w-[70%]">{dlLabel || 'Waiting for worker…'}</span>
                                <span className="font-mono font-bold text-emerald-600">{dlPct}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                                    style={{ width: `${dlPct}%` }} />
                            </div>
                        </div>
                    </div>
                </Card>
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

            {audioUrl && isEngineReady && !isSynth && (
                <Card>
                    <div className="flex items-center justify-between mb-2">
                        <Label>Generated Audio</Label>
                        <a href={audioUrl} download="piper-tts.wav"
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors border border-emerald-200 dark:border-emerald-700">
                            <Download className="w-3.5 h-3.5" /> Download WAV
                        </a>
                    </div>
                    <audio key={audioUrl} controls className="w-full rounded-xl" src={audioUrl} />
                </Card>
            )}

            {error && isEngineReady && (
                <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 rounded-xl">
                    {error}
                </p>
            )}

            <Button onClick={speak} size="lg" className="w-full border-0"
                variant={status === 'speaking' && !isSynth ? 'danger' : 'primary'}
                disabled={status === 'loading' || isSynth || !text.trim() || !isEngineReady}
                style={!(status === 'speaking' && !isSynth) ? { background: 'linear-gradient(to right,#059669,#0d9488)' } : {}}>
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

export default PiperTTS;

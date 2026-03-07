'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { DetectionResult, HistoryEntry, SentenceScore } from '../types';
import { MIN_TEXT_LENGTH, MAX_TEXT_LENGTH, SIGNAL_LABELS } from '../constants';

const HISTORY_KEY = 'truthscan_history';

// Build text segments with per-sentence AI probability for overlay highlighting
function buildHighlightSegments(
    text: string,
    sentenceScores: SentenceScore[]
): Array<{ text: string; aiProb: number | null }> {
    if (!sentenceScores.length) return [{ text, aiProb: null }];
    const segments: Array<{ text: string; aiProb: number | null }> = [];
    let lastIdx = 0;
    for (const s of sentenceScores) {
        const idx = text.indexOf(s.text, lastIdx);
        if (idx === -1) continue;
        if (idx > lastIdx) segments.push({ text: text.slice(lastIdx, idx), aiProb: null });
        segments.push({ text: s.text, aiProb: s.aiProbability });
        lastIdx = idx + s.text.length;
    }
    if (lastIdx < text.length) segments.push({ text: text.slice(lastIdx), aiProb: null });
    return segments;
}

function loadHistory(): HistoryEntry[] {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
    catch { return []; }
}

function saveHistory(entry: HistoryEntry, prev: HistoryEntry[]) {
    const updated = [entry, ...prev].slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
}

// ─── Guest Quota ──────────────────────────────────────────────────────────────

const QUOTA_KEY = 'ts_quota';
const GUEST_ANALYSIS_LIMIT = 1;
const GUEST_HUMANIZE_LIMIT = 1;
const REGISTERED_ANALYSIS_LIMIT = 10;
const REGISTERED_HUMANIZE_LIMIT = 10;

interface Quota { date: string; analyses: number; humanize: number; }
type QuotaStore = Record<string, Quota>;

function today() { return new Date().toISOString().split('T')[0]; }

function getQuota(userId: string): Quota {
    if (typeof window === 'undefined') return { date: today(), analyses: 0, humanize: 0 };
    try {
        const store: QuotaStore = JSON.parse(localStorage.getItem(QUOTA_KEY) || '{}');
        const q = store[userId];
        if (!q || q.date !== today()) return { date: today(), analyses: 0, humanize: 0 };
        return q;
    } catch { return { date: today(), analyses: 0, humanize: 0 }; }
}

function bumpQuota(userId: string, type: 'analyses' | 'humanize') {
    const q = getQuota(userId);
    const updated = { ...q, [type]: q[type] + 1 };

    let store: QuotaStore = {};
    try { store = JSON.parse(localStorage.getItem(QUOTA_KEY) || '{}'); } catch { }
    store[userId] = updated;

    localStorage.setItem(QUOTA_KEY, JSON.stringify(store));
    return updated;
}

function msTilMidnight() {
    const now = new Date();
    const midnight = new Date(now); midnight.setHours(24, 0, 0, 0);
    return midnight.getTime() - now.getTime();
}

function formatCountdown(ms: number) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// ─── Quota Banner ───────────────────────────────────────────────────────────────

function QuotaBanner({ type, isGuest }: { type: 'analyses' | 'humanize', isGuest: boolean }) {
    const [countdown, setCountdown] = useState(msTilMidnight());
    useEffect(() => {
        const t = setInterval(() => setCountdown(msTilMidnight()), 30000);
        return () => clearInterval(t);
    }, []);
    const msg = type === 'analyses'
        ? `You've used your daily analysis quota.`
        : `You've used your daily humanize quota.`;
    const sub = isGuest
        ? <span>Guest users get <strong>1 check per day</strong>.</span>
        : <span>Registered users get <strong>10 checks per day</strong>.</span>;

    return (
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-5">
            <div className="flex items-start gap-3">
                <span className="text-2xl">⏳</span>
                <div className="flex-1">
                    <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm">{msg}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        {sub} Your quota resets in{' '}
                        <strong className="text-amber-600 dark:text-amber-400">{formatCountdown(countdown)}</strong>.
                    </p>
                    <div className="mt-3 flex gap-2">
                        {isGuest ? (
                            <>
                                <a href="/api/auth/signin" className="brand-button-primary text-xs px-4 py-2 hover:no-underline">
                                    Sign in for 10x limit →
                                </a>
                                <span className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                                    or come back tomorrow 🌅
                                </span>
                            </>
                        ) : (
                            <span className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                                Quota will reset at midnight 🌅
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ScoreGauge({ aiScore, humanScore, verdict }: { aiScore: number; humanScore: number; verdict: string }) {
    const [animated, setAnimated] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => setAnimated(aiScore), 50);
        return () => clearTimeout(t);
    }, [aiScore]);

    const color = aiScore >= 60 ? '#ef4444' : aiScore <= 40 ? '#10b981' : '#f59e0b';
    const verdictLabel = verdict === 'AI' ? '🤖 Likely AI' : verdict === 'HUMAN' ? '✅ Likely Human' : '⚠️ Mixed / Uncertain';
    const verdictCls = verdict === 'AI'
        ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
        : verdict === 'HUMAN'
            ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
            : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800';

    return (
        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold mb-4 ${verdictCls}`}>
                {verdictLabel}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900">
                    <div className="text-4xl font-extrabold text-emerald-500 leading-none">{humanScore}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Human Score</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900">
                    <div className="text-4xl font-extrabold text-red-500 leading-none">{aiScore}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">AI Score</div>
                </div>
            </div>
            <div>
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mb-1">
                    <span>Human</span><span>Uncertain</span><span>AI</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
                    <div className="absolute inset-0 opacity-25" style={{ background: 'linear-gradient(90deg, #10b981 0%, #10b981 40%, #f59e0b 40%, #f59e0b 60%, #ef4444 60%, #ef4444 100%)' }} />
                    <div className="absolute top-0 h-full w-1 rounded-full" style={{ left: `${animated}%`, background: color, transform: 'translateX(-50%)', transition: 'left 1s cubic-bezier(0.34,1.56,0.64,1)', boxShadow: `0 0 8px ${color}` }} />
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-center">AI Score: {aiScore}% (lower = more human)</div>
            </div>
        </div>
    );
}

function SignalBreakdown({ signals }: { signals: DetectionResult['signals'] }) {
    return (
        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Signal Breakdown</h3>
            <div className="flex flex-col gap-3">
                {Object.entries(SIGNAL_LABELS).map(([key, meta]) => {
                    const raw = signals[key as keyof typeof signals] as number;
                    if (key === 'avgSentenceLength') return null;
                    const value = raw;
                    const isAI = meta.lowerIsAI ? value < 40 : value > 60;
                    const barColor = isAI ? '#ef4444' : value < 40 ? '#10b981' : value > 60 ? '#ef4444' : '#f59e0b';
                    const valueColor = isAI ? 'text-red-500' : value < 40 ? 'text-emerald-500' : value > 60 ? 'text-red-500' : 'text-amber-500';
                    return (
                        <div key={key} title={meta.tooltip}>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400">{meta.label}</span>
                                <span className={`text-sm font-bold ${valueColor}`}>{value}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${value}%`, background: barColor }} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                Avg sentence length: <strong className="text-gray-600 dark:text-gray-400">{signals.avgSentenceLength} words</strong>
            </div>
        </div>
    );
}

// ─── Humanize Panel ───────────────────────────────────────────────────────────

interface HumanizeChange { original: string; humanized: string; aiProbability: number; }
interface HumanizeResult { humanizedText: string; changes: HumanizeChange[]; totalChanged: number; }

function HumanizePanel({ result, onClose }: { result: HumanizeResult; onClose: () => void }) {
    const [copied, setCopied] = useState(false);
    const copyText = () => {
        navigator.clipboard.writeText(result.humanizedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">✍️ Humanized Version</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{result.totalChanged} sentence{result.totalChanged !== 1 ? 's' : ''} rewritten by Sarvam-M</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={copyText} className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${copied ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-emerald-400'}`}>
                        {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                    <button onClick={onClose} className="px-3 py-1 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">✕</button>
                </div>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap break-words">
                {result.humanizedText}
            </div>
            {result.changes.length > 0 && (
                <div className="mt-4">
                    <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">What changed</div>
                    <div className="flex flex-col gap-2">
                        {result.changes.map((c, i) => (
                            <div key={i} className="text-xs leading-relaxed rounded-lg overflow-hidden">
                                <div className="px-3 py-2 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-l-2 border-red-400">
                                    <span className="opacity-50 mr-1 text-[10px]">BEFORE</span>{c.original}
                                </div>
                                <div className="px-3 py-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-l-2 border-emerald-400">
                                    <span className="opacity-50 mr-1 text-[10px]">AFTER</span>{c.humanized}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── History Panel ────────────────────────────────────────────────────────────

function HistoryPanel({ history, onSelect }: { history: HistoryEntry[]; onSelect: (e: HistoryEntry) => void }) {
    if (!history.length) return null;
    return (
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Recent Analyses</h3>
            <div className="flex flex-col gap-2">
                {history.map(entry => {
                    const v = entry.result.verdict;
                    const chip = v === 'AI' ? { cls: 'text-red-500', label: '🤖 AI' } : v === 'HUMAN' ? { cls: 'text-emerald-500', label: '✅ Human' } : { cls: 'text-amber-500', label: '⚠️ Mixed' };
                    return (
                        <button key={entry.id} onClick={() => onSelect(entry)}
                            className="flex justify-between items-center px-3 py-2 rounded-lg text-left border border-gray-100 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-900/30 hover:border-accent dark:hover:border-accent transition-colors">
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[70%]">{entry.text}</span>
                            <span className={`text-xs font-bold flex-shrink-0 ${chip.cls}`}>{chip.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Main Tool ────────────────────────────────────────────────────────────────

export default function TruthScanTool() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DetectionResult | null>(null);
    const [error, setError] = useState('');
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);
    const highlightRef = useRef<HTMLDivElement>(null);
    const { data: session } = useSession();
    const isLoggedIn = !!session?.user;
    const userId = session?.user?.email || 'guest';

    // Quota state
    const [quotaAnalyses, setQuotaAnalyses] = useState(0);
    const [quotaHumanize, setQuotaHumanize] = useState(0);
    const analysisBlocked = isLoggedIn ? quotaAnalyses >= REGISTERED_ANALYSIS_LIMIT : quotaAnalyses >= GUEST_ANALYSIS_LIMIT;
    const humanizeBlocked = isLoggedIn ? quotaHumanize >= REGISTERED_HUMANIZE_LIMIT : quotaHumanize >= GUEST_HUMANIZE_LIMIT;

    useEffect(() => {
        setHistory(loadHistory());
        if (userId) { // Load correct quota after user hydration
            const q = getQuota(userId);
            setQuotaAnalyses(q.analyses);
            setQuotaHumanize(q.humanize);
        }
    }, [userId]);

    const [humanizeLoading, setHumanizeLoading] = useState(false);
    const [humanizeResult, setHumanizeResult] = useState<HumanizeResult | null>(null);
    const [humanizeError, setHumanizeError] = useState('');

    const analyze = useCallback(async () => {
        if (text.trim().length < MIN_TEXT_LENGTH) {
            setError(`Please enter at least ${MIN_TEXT_LENGTH} characters for accurate analysis.`);
            return;
        }
        if (analysisBlocked) return; // blocked — UI already shows banner
        setError('');
        setLoading(true);
        setResult(null);
        setHumanizeResult(null);
        setHumanizeError('');

        try {
            const res = await fetch('/api/ai-content-detector/detect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Analysis failed');
            setResult(data);
            const entry: HistoryEntry = { id: Date.now().toString(), text: text.slice(0, 120), result: data, analyzedAt: data.analyzedAt };
            setHistory(prev => saveHistory(entry, prev));
            // Increment quota
            const updated = bumpQuota(userId, 'analyses');
            setQuotaAnalyses(updated.analyses);

            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [text, isLoggedIn, quotaAnalyses, userId]);

    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const charCount = text.length;
    const tooShort = charCount > 0 && charCount < MIN_TEXT_LENGTH;

    // Memoized highlight segments (React Best Practice: rerender-memo)
    const highlightSegments = React.useMemo(() =>
        buildHighlightSegments(text, result?.sentenceScores || []),
        [text, result?.sentenceScores]);

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background">
            {/* Page title bar */}
            <div className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a href="/product/ai-content-detector" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors">
                            ← AI Content Detector
                        </a>
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        <span className="text-sm font-semibold text-light-text dark:text-dark-text">AI Detector</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {history.length > 0 && (
                            <button onClick={() => setShowHistory(!showHistory)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${showHistory ? 'bg-accent/10 text-accent border-accent/30' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-accent dark:hover:border-accent'}`}>
                                🕒 History ({history.length})
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* ── LEFT: Input ── */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-baseline">
                        <h1 className="text-base font-bold text-light-text dark:text-dark-text">Paste Text to Analyze</h1>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{wordCount} words · {charCount.toLocaleString()} / {MAX_TEXT_LENGTH.toLocaleString()} chars</span>
                    </div>

                    {/* Textarea + highlight overlay */}
                    <div className="relative flex-1 min-h-[420px]">
                        {/* Highlight layer */}
                        <div ref={highlightRef} aria-hidden
                            className="absolute inset-0 rounded-xl p-5 text-sm leading-relaxed font-sans whitespace-pre-wrap break-words overflow-y-auto overflow-x-hidden pointer-events-none select-none"
                            style={{ color: 'transparent', fontFamily: 'var(--font-inter, sans-serif)', zIndex: 0, background: 'transparent' }}>
                            {result?.sentenceScores.length
                                ? highlightSegments.map((seg, i) => {
                                    if (seg.aiProb === null) return <span key={i}>{seg.text}</span>;
                                    const p = seg.aiProb;
                                    const bg = p >= 60
                                        ? `rgba(239,68,68,${(p / 100) * 0.4})`
                                        : p >= 40
                                            ? `rgba(245,158,11,0.18)`
                                            : `rgba(16,185,129,${((100 - p) / 100) * 0.25})`;
                                    return <span key={i} style={{ background: bg, borderRadius: '2px' }}>{seg.text}</span>;
                                })
                                : text}
                        </div>

                        {/* Actual textarea */}
                        <textarea
                            id="truth-scan-input"
                            value={text}
                            onChange={e => setText(e.target.value.slice(0, MAX_TEXT_LENGTH))}
                            onScroll={e => { if (highlightRef.current) highlightRef.current.scrollTop = (e.target as HTMLTextAreaElement).scrollTop; }}
                            placeholder="Paste an essay, email, article, or any text here to check if it was written by AI or a human…"
                            className={`absolute inset-0 w-full h-full rounded-xl p-5 text-sm leading-relaxed resize-none outline-none border transition-all duration-200 bg-white dark:bg-gray-900/50 placeholder-gray-400 dark:placeholder-gray-500 ${tooShort ? 'border-amber-400 dark:border-amber-600' : 'border-gray-200 dark:border-gray-700 focus:border-accent dark:focus:border-accent'}`}
                            style={{
                                zIndex: 1,
                                background: result?.sentenceScores.length ? 'transparent' : undefined,
                                caretColor: 'currentColor',
                                fontFamily: 'var(--font-inter, sans-serif)',
                            }}
                        />
                    </div>

                    {/* Heatmap legend */}
                    {result?.sentenceScores.length ? (
                        <div className="flex gap-3 text-xs text-gray-400 dark:text-gray-500 items-center">
                            <span className="font-semibold text-gray-500 dark:text-gray-400">Heatmap:</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400/50 inline-block" />Human</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400/40 inline-block" />Uncertain</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-400/50 inline-block" />AI</span>
                        </div>
                    ) : null}

                    {tooShort && (
                        <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            ⚠️ Minimum {MIN_TEXT_LENGTH} characters needed. Add {MIN_TEXT_LENGTH - charCount} more.
                        </div>
                    )}

                    {error && (
                        <div className="px-4 py-3 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-sm text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Analyze button or quota-blocked message */}
                    {analysisBlocked ? (
                        <QuotaBanner type="analyses" isGuest={!isLoggedIn} />
                    ) : (
                        <div className="flex gap-3">
                            <button id="truth-scan-analyze-btn" onClick={analyze}
                                disabled={loading || charCount < MIN_TEXT_LENGTH}
                                className="flex-1 py-3 rounded-xl font-bold text-sm text-white bg-accent hover:bg-accent-hover disabled:bg-accent/40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                                {loading ? (
                                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analyzing…</>
                                ) : '🔍 Analyze Text'}
                            </button>
                            {text && (
                                <button onClick={() => { setText(''); setResult(null); setError(''); setHumanizeResult(null); }}
                                    className="px-5 py-3 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    Clear
                                </button>
                            )}
                        </div>
                    )}

                    {showHistory && (
                        <HistoryPanel history={history} onSelect={entry => { setText(entry.text); setResult(entry.result); setShowHistory(false); }} />
                    )}
                </div>

                {/* ── RIGHT: Results ── */}
                <div ref={resultRef} className="flex flex-col gap-4">
                    {!result && !loading && (
                        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400 dark:text-gray-500 p-12 text-center rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                            <div className="text-5xl">🔍</div>
                            <div className="font-semibold text-gray-500 dark:text-gray-400">Results will appear here</div>
                            <div className="text-sm text-gray-400 dark:text-gray-500 max-w-xs leading-relaxed">
                                Paste text on the left and click "Analyze Text" to see AI vs Human scores, signal breakdown, and sentence heatmap.
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-12 rounded-xl border border-accent/20 bg-accent/5 dark:bg-accent/5">
                            <div className="w-14 h-14 border-[3px] border-accent/20 border-t-accent rounded-full animate-spin" />
                            <div className="text-center">
                                <div className="font-semibold text-gray-600 dark:text-gray-300 mb-1">Running analysis…</div>
                                <div className="text-xs text-gray-400 dark:text-gray-500">Layer 1: Statistical signals · Layer 2: Sarvam-M AI</div>
                            </div>
                        </div>
                    )}

                    {result && !loading && (
                        <>
                            <div className="flex justify-between items-center">
                                <h2 className="text-base font-bold text-light-text dark:text-dark-text">Analysis Results</h2>
                                <div className="flex gap-2 text-xs text-gray-400 dark:text-gray-500">
                                    <span>{result.wordCount} words</span>
                                    <span>·</span>
                                    <span>{result.llmUsed ? '🤖 Sarvam-M + Statistics' : '📊 Statistics only'}</span>
                                </div>
                            </div>

                            <ScoreGauge aiScore={result.aiScore} humanScore={result.humanScore} verdict={result.verdict} />

                            {result.reasoning && (
                                <div className="px-4 py-3 rounded-xl border border-accent/20 bg-accent/5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    <span className="text-accent font-semibold">Analysis: </span>{result.reasoning}
                                </div>
                            )}

                            <SignalBreakdown signals={result.signals} />

                            {/* Humanize button */}
                            {result.sentenceScores.some(s => s.aiProbability >= 55) && !humanizeResult && (
                                <div className="flex flex-col gap-2">
                                    {humanizeError && (
                                        <div className="text-xs text-red-500 dark:text-red-400 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">{humanizeError}</div>
                                    )}
                                    {humanizeBlocked ? (
                                        <QuotaBanner type="humanize" isGuest={!isLoggedIn} />
                                    ) : (
                                        <>
                                            <button id="truth-scan-humanize-btn"
                                                disabled={humanizeLoading}
                                                onClick={async () => {
                                                    setHumanizeLoading(true);
                                                    setHumanizeError('');
                                                    try {
                                                        const res = await fetch('/api/ai-content-detector/humanize', {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ text, sentenceScores: result.sentenceScores }),
                                                        });
                                                        const data = await res.json();
                                                        if (!res.ok) throw new Error(data.error || 'Humanization failed');
                                                        setHumanizeResult(data);
                                                        const updated = bumpQuota(userId, 'humanize');
                                                        setQuotaHumanize(updated.humanize);
                                                    } catch (e: unknown) {
                                                        setHumanizeError(e instanceof Error ? e.message : 'Humanization failed. Please try again.');
                                                    } finally {
                                                        setHumanizeLoading(false);
                                                    }
                                                }}
                                                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 dark:disabled:bg-emerald-800 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                                                {humanizeLoading ? (
                                                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Rewriting AI sentences…</>
                                                ) : '✍️ Humanize AI Sentences'}
                                            </button>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">Sarvam-M will rewrite the red-highlighted sentences to sound naturally human</p>
                                        </>
                                    )}
                                </div>
                            )}

                            {humanizeResult && (
                                <HumanizePanel result={humanizeResult} onClose={() => setHumanizeResult(null)} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

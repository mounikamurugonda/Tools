'use client';

import React, { useState, useEffect } from 'react';
import { FEATURES, HOW_IT_WORKS, USE_CASES, FAQS } from './constants';

interface TruthScanLandingProps { onStart: () => void; }

const DEMO_PHRASES = [
    'Furthermore, it is important to note that the implementation of this approach...',
    'In conclusion, based on the aforementioned evidence, we can clearly see...',
    'The quick brown fox jumped over the lazy dog while dreaming of electric sheep.',
    'Moreover, the leveraging of synergistic methodologies ensures optimal outcomes.',
    'She laughed until her coffee came out her nose, which was honestly fair.',
];

export default function TruthScanLanding({ onStart }: TruthScanLandingProps) {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [demoPhrase, setDemoPhrase] = useState(0);
    const [visible, setVisible] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanDone, setScanDone] = useState(false);
    const [scanVerdict, setScanVerdict] = useState<'AI' | 'HUMAN'>('AI');

    useEffect(() => { setVisible(true); }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDemoPhrase(p => (p + 1) % DEMO_PHRASES.length);
            setScanProgress(0); setScanDone(false);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setScanProgress(0); setScanDone(false);
        const isAI = demoPhrase % 2 === 0 || demoPhrase === 3;
        setScanVerdict(isAI ? 'AI' : 'HUMAN');
        const timer = setTimeout(() => {
            let p = 0;
            const inc = setInterval(() => {
                p += 4; setScanProgress(p);
                if (p >= 100) { clearInterval(inc); setScanDone(true); }
            }, 40);
        }, 600);
        return () => clearTimeout(timer);
    }, [demoPhrase]);

    const verdictCls = scanVerdict === 'AI' ? 'text-red-500' : 'text-emerald-500';
    const verdictLabel = scanVerdict === 'AI' ? '🤖 Likely AI' : '✅ Likely Human';

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text overflow-x-hidden">

            {/* ─── HERO ─── */}
            <section className={`max-w-5xl mx-auto px-6 py-20 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-accent border border-accent/30 bg-accent/5 mb-6">
                    🔬 DUAL-LAYER AI DETECTION
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                    <span className="text-light-text dark:text-dark-text">Know What's Human.</span>
                    <br />
                    <span className="brand-gradient-text">Know What's Machine.</span>
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
                    Paste any text. Get a <strong className="text-emerald-500">Human Score</strong>, an <strong className="text-red-500">AI Score</strong>, and sentence-level highlights — backed by statistical linguistics + Gemini AI.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <button onClick={onStart} className="brand-button-primary text-base px-8 py-3 shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 transition-all">
                        🔍 Try AI Detector Free
                    </button>
                    <a href="#how" className="brand-button-secondary text-base px-8 py-3">
                        How It Works ↓
                    </a>
                </div>

                {/* Live demo widget */}
                <div className="mt-14 brand-card p-6 max-w-2xl mx-auto text-left rounded-2xl">
                    <div className="brand-text-muted uppercase tracking-widest text-[10px] mb-3">Live Demo</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed min-h-[3rem] italic">
                        &ldquo;{DEMO_PHRASES[demoPhrase]}&rdquo;
                    </p>
                    <div className="mt-4">
                        <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-75"
                                style={{ width: `${scanProgress}%`, background: scanVerdict === 'AI' ? 'linear-gradient(90deg,#f97316,#ef4444)' : 'linear-gradient(90deg,#10b981,#3b82f6)' }} />
                        </div>
                        <div className="flex justify-between mt-2 text-xs">
                            <span className="text-gray-400 dark:text-gray-500">{scanDone ? 'Analysis complete' : 'Analyzing…'}</span>
                            {scanDone && <span className={`font-bold ${verdictCls}`}>{verdictLabel}</span>}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section className="max-w-4xl mx-auto px-6 pb-16">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { value: '95%+', label: 'Detection Accuracy' },
                        { value: '2s', label: 'Avg Analysis Time' },
                        { value: '2', label: 'Analysis Layers' },
                        { value: '6', label: 'Linguistic Signals' },
                    ].map(stat => (
                        <div key={stat.label} className="brand-card p-5 text-center rounded-xl">
                            <div className="text-2xl font-extrabold brand-gradient-text mb-1">{stat.value}</div>
                            <div className="brand-text-muted text-xs">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section id="how" className="bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800 py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="brand-kicker">How it works</span>
                        <h2 className="brand-heading-2 mt-1">Two layers. Under 3 seconds.</h2>
                        <p className="brand-subheading mt-2">Statistical signals + LLM judgment working together</p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {HOW_IT_WORKS.map(step => (
                            <div key={step.step} className="brand-card p-6 rounded-xl">
                                <div className="text-4xl font-black text-accent/20 mb-4">{step.step}</div>
                                <h3 className="brand-heading-4 mb-2">{step.title}</h3>
                                <p className="brand-text-body text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Detection signals callout */}
                    <div className="mt-8 p-6 rounded-xl border border-accent/20 bg-accent/5">
                        <h3 className="font-bold text-accent mb-4">🔬 What gets analyzed?</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { icon: '📉', name: 'Perplexity', desc: 'How predictable word choices are' },
                                { icon: '📈', name: 'Burstiness', desc: 'Variation in sentence lengths' },
                                { icon: '🔀', name: 'Sentence Variance', desc: 'Structural consistency of sentences' },
                                { icon: '📖', name: 'Vocabulary Richness', desc: 'Ratio of unique to total words' },
                                { icon: '🤖', name: 'AI Filler Phrases', desc: '"furthermore", "leverage", "synergistic"' },
                                { icon: '🧠', name: 'AI Judgment', desc: 'Gemini linguistic classification' },
                            ].map(s => (
                                <div key={s.name} className="flex gap-2 items-start">
                                    <span className="text-lg">{s.icon}</span>
                                    <div>
                                        <div className="text-sm font-semibold text-light-text dark:text-dark-text">{s.name}</div>
                                        <div className="text-xs brand-text-muted">{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section id="features" className="max-w-5xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <span className="brand-kicker">Features</span>
                    <h2 className="brand-heading-2 mt-1">Built for Serious Detection</h2>
                    <p className="brand-subheading mt-2">Not a guess — a verdict with evidence</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FEATURES.map(f => (
                        <div key={f.title} className="brand-card p-6 rounded-xl hover:border-accent/40 hover:bg-accent/5 transition-all">
                            <div className="text-3xl mb-3">{f.icon}</div>
                            <h3 className="brand-heading-4 mb-2">{f.title}</h3>
                            <p className="brand-text-body text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── THREE-ZONE VERDICT ─── */}
            <section className="bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800 py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="brand-kicker">Scoring</span>
                    <h2 className="brand-heading-2 mt-1">Three-Zone Verdict</h2>
                    <p className="brand-subheading mt-2">Never just &ldquo;Human&rdquo; or &ldquo;AI&rdquo; — we show the full spectrum</p>
                    <div className="brand-card p-6 rounded-2xl mt-8">
                        <div className="h-5 rounded-full mb-2" style={{ background: 'linear-gradient(90deg, #10b981 0%, #10b981 38%, #f59e0b 40%, #f59e0b 60%, #ef4444 62%, #ef4444 100%)' }} />
                        <div className="flex justify-between text-xs brand-text-muted">
                            <span>0% — All Human</span><span>40–60% — Uncertain</span><span>100% — All AI</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                                <div className="text-2xl mb-1">✅</div>
                                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Likely Human</div>
                                <div className="text-xs brand-text-muted mt-1">AI score 0–40%</div>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                                <div className="text-2xl mb-1">⚠️</div>
                                <div className="font-bold text-amber-600 dark:text-amber-400 text-sm">Uncertain</div>
                                <div className="text-xs brand-text-muted mt-1">AI score 41–59%</div>
                            </div>
                            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                                <div className="text-2xl mb-1">🤖</div>
                                <div className="font-bold text-red-600 dark:text-red-400 text-sm">Likely AI</div>
                                <div className="text-xs brand-text-muted mt-1">AI score 60–100%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── USE CASES ─── */}
            <section className="max-w-4xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <span className="brand-kicker">Use Cases</span>
                    <h2 className="brand-heading-2 mt-1">Who Uses the AI Content Detector?</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {USE_CASES.map(uc => (
                        <div key={uc.title} className="brand-card p-5 text-center rounded-xl">
                            <div className="text-3xl mb-3">{uc.icon}</div>
                            <h3 className="brand-heading-4 mb-1 text-sm">{uc.title}</h3>
                            <p className="brand-text-body text-xs">{uc.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section id="faq" className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 py-20 px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="brand-kicker">FAQ</span>
                        <h2 className="brand-heading-2 mt-1">Frequently Asked Questions</h2>
                    </div>
                    <div className="flex flex-col gap-3">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="brand-card rounded-xl overflow-hidden">
                                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full px-5 py-4 flex justify-between items-center text-left font-semibold text-sm text-light-text dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                                    <span>{faq.q}</span>
                                    <span className={`text-xl text-gray-400 transition-transform duration-200 ${activeFaq === i ? 'rotate-45' : ''}`}>+</span>
                                </button>
                                {activeFaq === i && (
                                    <div className="px-5 pb-4 text-sm brand-text-body leading-relaxed">{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-24 px-6 text-center bg-gradient-to-b from-transparent to-accent/5 dark:to-accent/10">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-light-text dark:text-dark-text">Start Detecting for Free</h2>
                <p className="brand-subheading mb-8">No account. No upload. Instant results.</p>
                <button onClick={onStart} className="brand-button-primary text-base px-10 py-4 rounded-xl shadow-lg hover:shadow-accent/30 hover:-translate-y-1 transition-all">
                    🔍 Open AI Detector →
                </button>
            </section>
        </div>
    );
}

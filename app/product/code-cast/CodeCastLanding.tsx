'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import {
    Monitor,
    Wifi,
    Code2,
    Lock,
    CheckCircle,
    Share2,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CodeCastLandingProps {
    onStart: () => void;
}

export default function CodeCastLanding({ onStart }: CodeCastLandingProps) {
    return (
        <div className="flex flex-col min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text overflow-hidden animate-in fade-in duration-500">
            {/* 1️⃣ Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="container mx-auto px-4 text-center z-10 relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light/10 text-accent-DEFAULT text-sm font-medium mb-8 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-DEFAULT opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-DEFAULT"></span>
                        </span>
                        Live Broadcasting Available
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white animate-fade-in-up">
                        Record code. Show output. <br /> Teach better — without screen clutter.
                    </h1>

                    <div className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-gray-600 dark:text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        CodeCast lets you record <b>clean typing demos</b> for HTML, CSS, JS, and JSX with live preview — ideal for tutorials, short videos, and social media.
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <Button
                            onClick={onStart}
                            size="lg"
                            className="rounded-full px-8 h-12 text-base shadow-lg shadow-accent-DEFAULT/20 hover:shadow-accent-DEFAULT/40 transition-all duration-300"
                        >
                            Try CodeCast →
                        </Button>
                        <Link href="#features">
                            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base backdrop-blur-sm bg-white/50 dark:bg-slate-900/50">
                                ▶ Watch a 20s demo
                            </Button>
                        </Link>
                    </div>

                    <div className="relative mx-auto max-w-5xl rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden animate-scale-in" style={{ animationDelay: '0.3s' }}>
                        <Image
                            src="/code-cast-hero.png"
                            alt="Code Cast Interface"
                            width={1200}
                            height={800}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Background Gradients */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-accent-DEFAULT/10 blur-[120px] rounded-full pointer-events-none -z-10 dark:opacity-20"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10 dark:opacity-20"></div>
            </section>

            {/* 2️⃣ Who this is for */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for people who teach code</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 hover:cursor-default">
                        {[
                            { icon: '👩‍🏫', text: 'Educators & coding instructors' },
                            { icon: '🎥', text: 'Content creators making coding reels & shorts' },
                            { icon: '🧑‍💻', text: 'Developers explaining ideas visually' },
                            { icon: '✍️', text: 'Bloggers & course creators' },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center hover:scale-[1.02] transition-transform">
                                <span className="text-4xl mb-4">{item.icon}</span>
                                <p className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3️⃣ The Core Problem */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">Screen recording code is messy</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">Most coding videos today suffer from:</p>
                            <ul className="space-y-4">
                                {[
                                    'Small text and zooming',
                                    'Distracting IDE UI',
                                    'Hard-to-follow typing',
                                    'No clear output while typing',
                                ].map((problem, i) => (
                                    <li key={i} className="flex items-center gap-3 text-red-500 dark:text-red-400">
                                        <span className="bg-red-100 dark:bg-red-900/30 rounded-full p-1"><span className="block w-2 h-2 rounded-full bg-red-500"></span></span>
                                        {problem}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4 border-l-4 border-accent-DEFAULT pl-6">
                                <p className="text-xl font-semibold italic text-gray-800 dark:text-gray-200">
                                    Viewers lose focus.<br /> Creators lose engagement.
                                </p>
                                <p className="mt-2 text-accent-DEFAULT font-bold">CodeCast fixes this.</p>
                            </div>
                        </div>
                        <div className="flex-1 w-full max-w-sm">
                            {/* Abstract visual of chaos vs clarity */}
                            <div className="relative aspect-square rounded-3xl bg-slate-200 dark:bg-slate-800 p-8 flex items-center justify-center opacity-75">
                                <div className="absolute inset-0 bg-grid-4 opacity-10"></div>
                                <div className="text-center space-y-4">
                                    <div className="h-2 w-32 bg-slate-300 dark:bg-slate-700 rounded mx-auto"></div>
                                    <div className="h-2 w-48 bg-slate-300 dark:bg-slate-700 rounded mx-auto"></div>
                                    <div className="h-2 w-24 bg-slate-300 dark:bg-slate-700 rounded mx-auto"></div>
                                    <span className="text-6xl pt-4 block grayscale opacity-50">❌</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4️⃣ What CodeCast does */}
            <section id="features" className="py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">What you can do with CodeCast</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="col-span-1 md:col-span-3 lg:col-span-2 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <div className="inline-flex p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-6">
                                <Code2 size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Paste HTML / CSS / JS / JSX</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Watch the live output update while typing. Record typing animation + preview. Export as MP4 or GIF.</p>
                        </div>
                        <div className="md:col-span-1 lg:col-span-1 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <div className="inline-flex p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 mb-6">
                                <Monitor size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Customize</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Typing speed</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Editor theme</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Device frame</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Keyboard sound</li>
                            </ul>
                        </div>

                        <div className="col-span-1 md:col-span-3 text-center py-8">
                            <p className="text-2xl font-medium text-gray-400">
                                No installs. No heavy screen recorders.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5️⃣ How it works (3 Steps) */}
            <section className="py-24 bg-gray-50/50 dark:bg-slate-900/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How it works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {[
                            { step: '1', title: 'Paste your code', desc: 'HTML, CSS, JS, or JSX' },
                            { step: '2', title: 'Record typing', desc: 'CodeCast simulates clean, readable typing with sound' },
                            { step: '3', title: 'Export & share', desc: 'Post to YouTube Shorts, Instagram, LinkedIn, or X' },
                        ].map((item, idx) => (
                            <div key={idx} className="relative flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-center text-2xl font-bold mb-6 z-10">
                                    {item.step}
                                </div>
                                {idx !== 2 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-gray-200 to-transparent dark:from-slate-700"></div>
                                )}
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6️⃣ Example Use Cases */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Perfect for</h2>
                    <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                        {[
                            'CSS tricks & UI demos', 'HTML layout tutorials', 'JavaScript logic walkthroughs',
                            'React / JSX component demos', 'Coding reels & shorts', 'Blog & course visuals'
                        ].map((tag, i) => (
                            <span key={i} className="px-6 py-3 rounded-full text-lg font-medium bg-slate-100 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7️⃣ Social Proof & 8️⃣ Final CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 md:p-20 text-white shadow-2xl relative overflow-hidden">

                        {/* Decorative circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-accent-DEFAULT/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

                        <div className="mb-12">
                            <p className="text-accent-light px-3 py-1 rounded-full bg-accent-light/10 inline-block text-sm font-semibold mb-4">Made by a developer, for developers</p>
                            <p className="text-gray-300">CodeCast is built as part of UtilToolkits — a growing collection of practical tools for frontend developers.</p>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-8">Start creating better code demos</h2>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={onStart} size="lg" className="bg-white text-slate-900 hover:bg-gray-100 border-none h-14 px-8 text-lg font-semibold">
                                Try CodeCast now →
                            </Button>
                        </div>

                        <p className="mt-6 text-sm text-gray-400">
                            No sign-up required.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

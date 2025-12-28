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
  GraduationCap,
  Clapperboard,
  Terminal,
  Feather,
  Sparkles,
  Keyboard,
  Image as ImageIcon,
  Smartphone,
  Palette,
  Rocket,
  Settings,
  Download,
  MousePointerClick,
  BookOpen,
  Video,
  Megaphone,
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

          <div
            className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-gray-600 dark:text-gray-400 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            CodeCast lets you record <b>clean typing demos</b> for HTML, CSS, JS, and JSX with live
            preview — ideal for tutorials, short videos, and social media.
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <Button
              onClick={onStart}
              size="lg"
              className="rounded-full px-8 h-12 text-base shadow-lg shadow-accent-DEFAULT/20 hover:shadow-accent-DEFAULT/40 transition-all duration-300"
            >
              Try CodeCast →
            </Button>
            <Link href="#features">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-12 text-base backdrop-blur-sm bg-white/50 dark:bg-slate-900/50"
              >
                ▶ Watch a 20s demo
              </Button>
            </Link>
          </div>

          <div
            className="relative mx-auto max-w-5xl rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden animate-scale-in"
            style={{ animationDelay: '0.3s' }}
          >
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
      <section className="py-24 bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wide mb-4">
              Target Audience
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Built for people who{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                teach code
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Whether you have 10 followers or 1 million, CodeCast helps you produce professional
              content faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: GraduationCap,
                title: 'Educators',
                desc: 'Replace boring slides with dynamic code reveals that keep students awake.',
                color: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600',
              },
              {
                icon: Clapperboard,
                title: 'Content Creators',
                desc: 'Pump out high-quality Reels, Shorts, and TikToks in minutes, not hours.',
                color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600',
              },
              {
                icon: Terminal,
                title: 'Developers',
                desc: 'Show off your latest library or feature with crystal-clear visual documentation.',
                color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600',
              },
              {
                icon: Feather,
                title: 'Tech Writers',
                desc: 'Embed lightweight, high-res animations directly into your tech blog posts.',
                color: 'bg-green-100 dark:bg-green-900/20 text-green-600',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}
                >
                  <item.icon size={28} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ The Core Transformation */}
      <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 dark:bg-blue-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-400/10 dark:bg-purple-600/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-blue-200 dark:via-white dark:to-blue-200">
              Stop making messy screen recordings
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-300 mt-6">
              Transform your coding content from &quot;hard to follow&quot; to{' '}
              <span className="text-slate-900 dark:text-white font-bold">studio quality</span> in
              seconds.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* ❌ BEFORE CARD */}
            <div className="flex-1 max-w-md w-full group relative">
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-6 rounded-3xl bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 hover:border-red-500/30 transition-all duration-300 transform group-hover:-translate-y-1 shadow-xl dark:shadow-none">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-red-500 dark:text-red-400 flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-red-500/10">❌</div>
                    The Old Way
                  </h3>
                </div>

                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Image
                    src="/messy-example.png"
                    alt="Messy screen recording example"
                    fill
                    className="object-contain"
                  />
                  {/* Overlay Gradient for "bad" vibe */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                    Tiny text & blurry zooming
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                    Cluttered UI & distractions
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                    No live output preview
                  </li>
                </ul>
              </div>
            </div>

            {/* ARROW ICON */}
            <div className="flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
              <div className="w-px h-12 lg:h-0 lg:w-16 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
              <div className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
                <span className="block transform rotate-90 lg:rotate-0 text-slate-600 dark:text-white">
                  ➔
                </span>
              </div>
              <div className="w-px h-12 lg:h-0 lg:w-16 bg-gradient-to-t lg:bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
            </div>

            {/* ✅ AFTER CARD */}
            <div className="flex-1 max-w-md w-full group relative">
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>

              <div className="relative p-6 rounded-3xl bg-white dark:bg-slate-800/80 backdrop-blur-md border border-green-500/30 shadow-2xl shadow-green-900/10 dark:shadow-green-900/20 transform group-hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-green-500/10">✨</div>
                    With CodeCast
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold border border-green-500/20">
                    PRO LOOK
                  </span>
                </div>

                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-700 mb-4 shadow-lg group-hover:shadow-green-900/30 transition-shadow">
                  <Image
                    src="/after.png"
                    alt="Clean CodeCast result"
                    fill
                    className="object-contain"
                  />
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-slate-700 dark:text-white">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span>Studio-quality syntax highlighting</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-700 dark:text-white">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span>Smooth, cinematic typing</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-700 dark:text-white">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span>Live, side-by-side preview</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 🌟 Conclusion Text */}
          <div className="mt-16 text-center animate-fade-in-up">
            <p className="text-xl md:text-2xl font-medium text-slate-500 dark:text-slate-400">
              Viewers lose focus. <span className="mx-2 text-slate-300 dark:text-slate-700">|</span>{' '}
              Creators lose engagement.
            </p>
          </div>
        </div>
      </section>

      {/* 4️⃣ What CodeCast does */}
      <section id="features" className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">What you can do with CodeCast</h2>
            <h3 className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400 mb-4">
              Turn Code into Watchable Content
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              CodeCast lets you transform plain code into engaging visual demos that people can
              watch, understand, and remember — perfect for tutorials, short videos, and
              documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Auto Animation */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex p-3 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 mb-6">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Auto Code Animation</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 min-h-[48px]">
                Paste your HTML, CSS, or JavaScript and let CodeCast automatically animate the
                typing.
              </p>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> No manual typing needed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Smooth, realistic animation
                </li>
              </ul>
            </div>

            {/* Feature 2: Live Code */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-6">
                <Keyboard size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Live Code (real typing)</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 min-h-[48px]">
                Type code yourself and record it in real time. Capture your real typing flow.
              </p>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Optional keyboard sound
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Adjustable typing speed
                </li>
              </ul>
            </div>

            {/* Feature 3: Code to Image */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex p-3 rounded-2xl bg-pink-100 dark:bg-pink-900/30 text-pink-600 mb-6">
                <ImageIcon size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Code → Image</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 min-h-[48px]">
                Convert your code snippet into a clean, shareable image for social media.
              </p>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> High-res export
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Custom themes & fonts
                </li>
              </ul>
            </div>

            {/* Feature 4: Live Preview */}
            <div className="md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="inline-flex p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 mb-6">
                    <Smartphone size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Live Preview Alongside Code</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Show code and output together in a realistic preview layout. Write code on one
                    side, see results on the other — live.
                  </p>
                  <div className="flex gap-4">
                    <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-semibold">
                      HTML/CSS/JS
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-semibold">
                      Mobile Demo
                    </span>
                  </div>
                </div>
                {/* Visual cue for preview could go here if needed, or just keep text for now */}
              </div>
            </div>

            {/* Feature 5: Customizable */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex p-3 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 mb-6">
                <Palette size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Fully Customizable</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Make your content match your brand with custom themes, fonts, and backgrounds.
              </p>
            </div>

            {/* Feature 6: Social Media */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex p-3 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 mb-6">
                <Share2 size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Made for Socials</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Export perfectly sized videos for TikTok, Instagram Reels, YouTube Shorts, and X.
              </p>
            </div>

            {/* Feature 7: Developers */}
            <div className="md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="inline-flex p-3 rounded-2xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 mb-6">
                    <Rocket size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Built for Developers & Educators</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Whether you’re teaching HTML, explaining UI concepts, or showcasing snippets,
                    CodeCast helps your code speak visually.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-xl font-medium text-slate-500 dark:text-slate-400 italic">
              CodeCast is not a screen recorder — it’s a storytelling tool for code.
            </p>
          </div>
        </div>
      </section>

      {/* 5️⃣ How it works */}
      <section className="py-24 bg-gray-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How CodeCast Works</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400">Simple. Fast. No setup.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 relative max-w-7xl mx-auto">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[10%] w-[80%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 dark:from-blue-900 dark:via-purple-900 dark:to-green-900 -z-0"></div>

            {[
              {
                step: 1,
                icon: MousePointerClick,
                title: 'Choose your mode',
                items: ['Auto Code', 'Live Code', 'Code → Image'],
                color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
              },
              {
                step: 2,
                icon: Code2,
                title: 'Add your code',
                items: [
                  'Paste or write code',
                  'Live syntax highlighting',
                  'Distraction-free editor',
                ],
                color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
              },
              {
                step: 3,
                icon: Settings,
                title: 'Customize the look',
                items: ['Theme & background', 'Font size & spacing', 'Preview layout'],
                color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
              },
              {
                step: 4,
                icon: Download,
                title: 'Export & share',
                items: ['MP4 / GIF / Image', 'Optimized for socials', 'No watermarks'],
                color: 'bg-green-100 dark:bg-green-900/30 text-green-600',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 relative z-10 group">
                <div className="flex flex-col items-center bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/10 transition-all duration-300 h-full">
                  {/* Icon Circle */}
                  <div
                    className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    <item.icon size={28} />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm font-bold text-slate-400">
                    {item.step}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-center">{item.title}</h3>

                  <ul className="space-y-2 w-full">
                    {item.items.map((subItem, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 justify-center text-center"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0"></span>
                        {subItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-slate-500 dark:text-slate-400">
              No installs. No heavy screen recorders. <br className="hidden md:inline" />
              Just clean, focused code demos.
            </p>
          </div>
        </div>
      </section>

      {/* 6️⃣ Perfect For */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Perfect For</h2>
            <h3 className="text-xl text-blue-600 dark:text-blue-400 font-medium">
              Built for modern code creators
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
            {[
              {
                icon: BookOpen,
                title: 'Coding Tutorials',
                desc: 'Teach by showing code and output together.',
                tags: ['HTML/CSS/JS', 'React Basics', 'UI Layouts'],
                color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600',
              },
              {
                icon: Video,
                title: 'Short-Form Videos',
                desc: 'Auto-animate snippets in seconds.',
                tags: ['Shorts', 'Reels', 'TikTok'],
                color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600',
              },
              {
                icon: Palette,
                title: 'CSS & UI Demos',
                desc: 'Viewers understand faster when they see it happen.',
                tags: ['Animations', 'Hover Effects', 'Components'],
                color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600',
              },
              {
                icon: Terminal,
                title: 'Developer Explanations',
                desc: 'Explain logic without screen clutter.',
                tags: ['JS Concepts', 'Walkthroughs', 'Presentations'],
                color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
              },
              {
                icon: ImageIcon,
                title: 'Blog & Docs Visuals',
                desc: 'No screenshots. No extra tools.',
                tags: ['Blogs', 'Slides', 'Thumbnails'],
                color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600',
              },
              {
                icon: Megaphone,
                title: 'Personal Branding',
                desc: 'Consistent, professional-looking content.',
                tags: ['Tips & Tricks', 'Snippets', 'Growth'],
                color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shrink-0`}
                  >
                    <item.icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-slate-100 dark:border-slate-800">
            <h4 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
              Who Uses CodeCast?
            </h4>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8">
              {[
                'Frontend Developers',
                'Educators & Mentors',
                'Content Creators',
                'Indie Hackers',
              ].map((role, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium"
                >
                  <CheckCircle size={18} className="text-blue-500" />
                  {role}
                </div>
              ))}
            </div>
            <p className="text-lg md:text-xl font-medium text-slate-500 dark:text-slate-400 italic border-t border-slate-200 dark:border-slate-800 pt-8 inline-block px-8">
              &quot;If you teach, explain, or share code — CodeCast fits your workflow.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* 7️⃣ Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative rounded-[2rem] bg-slate-900 border border-slate-800 p-8 md:p-16 text-center overflow-hidden">
              {/* Background Grid Pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(#334155 1px, transparent 1px), linear-gradient(to right, #334155 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Ready to ship?
                </div>

                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                  Start creating{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    better code demos
                  </span>
                </h2>

                <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of developers turning static code into engaging video content.
                  <br className="hidden md:inline" /> Instant access. No setup.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
                  <Button
                    onClick={onStart}
                    size="lg"
                    className="h-16 px-10 text-xl bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 transition-all flex items-center gap-3"
                  >
                    <Rocket size={24} />
                    Launch CodeCast
                  </Button>
                  <Link
                    href="/product/code-cast/animate"
                    className="text-slate-400 hover:text-white font-medium px-6 py-4 flex items-center gap-2 transition-colors"
                  >
                    Use Animate Tool <span className="text-slate-600">→</span>
                  </Link>
                </div>

                <p className="mt-8 text-sm text-slate-500 font-medium">
                  Free for everyone. No sign-up required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

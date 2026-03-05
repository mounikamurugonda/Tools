'use client';

import React, { useState, lazy, Suspense } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import TextArea from '@/components/ui/TextArea';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import { Loader2, Zap, Mic, Cpu, Info } from 'lucide-react';

// ─── Lazy-load each engine (code-split, only loads when tab is selected) ──────
const KokoroTTS = lazy(() => import('./tts/KokoroTTS'));
const PiperTTS = lazy(() => import('./tts/PiperTTS'));
const SherpaOnnxTTS = lazy(() => import('./tts/SherpaOnnxTTS'));

// ─── Engine definitions ───────────────────────────────────────────────────────

type EngineId = 'kokoro' | 'piper' | 'sherpa';

interface Engine {
  id: EngineId;
  name: string;
  tagline: string;
  badge: string;
  color: {
    tab: string;
    activeBg: string;
    activeBorder: string;
    activeText: string;
    inactiveBg: string;
    inactiveText: string;
    icon: string;
    glow: string;
  };
  icon: React.ReactNode;
  strengths: { label: string; value: string }[];
}

const ENGINES: Engine[] = [
  {
    id: 'kokoro',
    name: 'Kokoro-JS',
    tagline: 'Best natural voice quality',
    badge: '⭐ Recommended',
    color: {
      tab: 'purple',
      activeBg: 'bg-gradient-to-r from-purple-600 to-violet-600',
      activeBorder: 'border-purple-500',
      activeText: 'text-white',
      inactiveBg: 'bg-gray-50 dark:bg-gray-800/60',
      inactiveText: 'text-gray-700 dark:text-gray-300',
      icon: 'text-purple-500',
      glow: 'shadow-purple-500/20',
    },
    icon: <Zap className="w-4 h-4" />,
    strengths: [
      { label: 'Voice Quality', value: '★★★★★ Best' },
      { label: 'Speed', value: 'Lightning Fast' },
      { label: 'Setup', value: 'Instant' },
      { label: 'Capability', value: 'Works Offline' },
    ],
  },
  {
    id: 'piper',
    name: 'Piper TTS',
    tagline: 'Most diverse voices (900+)',
    badge: '🌍 900+ Voices',
    color: {
      tab: 'emerald',
      activeBg: 'bg-gradient-to-r from-emerald-600 to-teal-600',
      activeBorder: 'border-emerald-500',
      activeText: 'text-white',
      inactiveBg: 'bg-gray-50 dark:bg-gray-800/60',
      inactiveText: 'text-gray-700 dark:text-gray-300',
      icon: 'text-emerald-500',
      glow: 'shadow-emerald-500/20',
    },
    icon: <Mic className="w-4 h-4" />,
    strengths: [
      { label: 'Voice Quality', value: '★★★★☆ Great' },
      { label: 'Speed', value: 'Fast' },
      { label: 'Setup', value: 'Downloads Once' },
      { label: 'Capability', value: 'Works Offline' },
    ],
  },
  {
    id: 'sherpa',
    name: 'Sherpa-ONNX',
    tagline: 'Optimised for speed & mobile',
    badge: '🚀 Extreme Speed',
    color: {
      tab: 'orange',
      activeBg: 'bg-gradient-to-r from-orange-500 to-amber-500',
      activeBorder: 'border-orange-500',
      activeText: 'text-white',
      inactiveBg: 'bg-gray-50 dark:bg-gray-800/60',
      inactiveText: 'text-gray-700 dark:text-gray-300',
      icon: 'text-orange-500',
      glow: 'shadow-orange-500/20',
    },
    icon: <Cpu className="w-4 h-4" />,
    strengths: [
      { label: 'Voice Quality', value: '★★★☆☆ Good' },
      { label: 'Speed', value: '⚡ Super Fast' },
      { label: 'Setup', value: 'Downloads Once' },
      { label: 'Capability', value: 'Works Offline' },
    ],
  },
];

// ─── Fallback loader ──────────────────────────────────────────────────────────

const EngineFallback = () => (
  <div className="flex items-center justify-center py-16 gap-3">
    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
    <span className="text-sm text-gray-500 dark:text-gray-400">Loading engine module…</span>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const TextToSpeech: React.FC<ToolProps> = ({ details, toolId }) => {
  const [activeEngine, setActiveEngine] = useState<EngineId>('kokoro');
  const [text, setText] = useState(
    'Hello! This is a demonstration of on-device text-to-speech running entirely in your browser.'
  );
  // Track which engines have been mounted (so they don't re-init on tab switch)
  const [mountedEngines, setMountedEngines] = useState<Set<EngineId>>(new Set(['kokoro']));

  const handleTabChange = (id: EngineId) => {
    setActiveEngine(id);
    setMountedEngines(prev => new Set([...prev, id]));
  };

  const currentEngine = ENGINES.find(e => e.id === activeEngine)!;

  return (
    <ToolContainer title="Text to Speech" details={details} toolId={toolId}>
      <div className="space-y-6">

        {/* ── Hero info banner ──────────────────────────────────────────── */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 dark:text-blue-300">
            All engines run <strong>100% in your browser</strong> — no audio leaves your device.
            Models are downloaded on demand and cached automatically.
            Nothing plays or processes in the background until you click a button.
          </p>
        </div>

        {/* ── Engine selector tabs ──────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {ENGINES.map(engine => {
            const isActive = activeEngine === engine.id;
            return (
              <button
                key={engine.id}
                onClick={() => handleTabChange(engine.id)}
                className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-300 group ${isActive
                  ? `${engine.color.activeBg} ${engine.color.activeBorder} ${engine.color.activeText} shadow-xl ${engine.color.glow}`
                  : `${engine.color.inactiveBg} border-gray-200 dark:border-gray-700 ${engine.color.inactiveText} hover:border-gray-300 dark:hover:border-gray-600`
                  }`}
              >
                {/* Badge */}
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                  {engine.badge}
                </span>

                <div className={`flex items-center gap-2 mb-1 ${isActive ? 'text-white' : engine.color.icon}`}>
                  {engine.icon}
                  <span className="font-bold text-sm sm:text-base">{engine.name}</span>
                </div>

                <p className={`text-xs leading-snug hidden sm:block ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  {engine.tagline}
                </p>

                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-white/40 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Comparison row (compact) ──────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currentEngine.strengths.map(s => (
            <div
              key={s.label}
              className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
            >
              <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">
                {s.label}
              </p>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Main content grid ─────────────────────────────────────────── */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Text input (left column) */}
          <div className="md:col-span-2">
            <Card title="Text Input" className="h-full min-h-[320px] flex flex-col">
              <div className="flex-1 flex flex-col">
                <TextArea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className="flex-1 w-full border-none focus:ring-0 rounded-none resize-none p-0 min-h-[220px]"
                  placeholder="Type or paste the text you want to synthesise…"
                />
                <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <Label className="text-xs">{text.length} chars · {text.trim().split(/\s+/).filter(Boolean).length} words</Label>
                  <button
                    onClick={() => setText('')}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Engine panel (right column) */}
          <div className="md:col-span-3">
            {/* Kokoro */}
            <div className={activeEngine === 'kokoro' ? 'block' : 'hidden'}>
              {mountedEngines.has('kokoro') && (
                <Suspense fallback={<EngineFallback />}>
                  <KokoroTTS text={text} />
                </Suspense>
              )}
            </div>

            {/* Piper */}
            <div className={activeEngine === 'piper' ? 'block' : 'hidden'}>
              {mountedEngines.has('piper') && (
                <Suspense fallback={<EngineFallback />}>
                  <PiperTTS text={text} />
                </Suspense>
              )}
            </div>

            {/* Sherpa-ONNX */}
            <div className={activeEngine === 'sherpa' ? 'block' : 'hidden'}>
              {mountedEngines.has('sherpa') && (
                <Suspense fallback={<EngineFallback />}>
                  <SherpaOnnxTTS text={text} />
                </Suspense>
              )}
            </div>
          </div>
        </div>

        {/* ── Comparison table ─────────────────────────────────────────── */}
        <details className="group">
          <summary className="cursor-pointer text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors list-none flex items-center gap-2 py-2">
            <span className="text-gray-400 group-open:rotate-90 transition-transform inline-block">▶</span>
            Compare all engines
          </summary>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">Feature</th>
                  {ENGINES.map(e => (
                    <th key={e.id} className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                      {e.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  { label: 'Voice Quality', vals: ['Best natural', 'Most diverse (900+)', 'Good, optimised'] },
                  { label: 'Speed', vals: ['Very Fast (WebGPU)', 'Moderate (WASM)', 'Extremely Fast'] },
                  { label: 'Ease of Use', vals: ['Very easy', 'Moderate', 'Technical'] },
                  { label: 'Model Size', vals: ['~82 MB (cached)', '~45 MB per voice', '~20-30 MB'] },
                  { label: 'Framework', vals: ['Transformers.js', 'ONNX Runtime Web', 'ONNX Runtime Web'] },
                  { label: 'Offline After Load', vals: ['✓ Yes', '✓ Yes', '✓ Yes'] },
                ].map(row => (
                  <tr key={row.label}>
                    <td className="py-2.5 pr-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      {row.label}
                    </td>
                    {row.vals.map((val, i) => (
                      <td key={i} className="py-2.5 px-3 text-gray-700 dark:text-gray-300 text-sm">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </ToolContainer>
  );
};

export default TextToSpeech;

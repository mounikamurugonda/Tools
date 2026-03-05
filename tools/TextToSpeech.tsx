'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import TextArea from '@/components/ui/TextArea';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import { Loader2, Zap, Mic, Cpu, Info, Square, Play } from 'lucide-react';

import KokoroTTS, { EngineRef } from './tts/KokoroTTS';
import PiperTTS from './tts/PiperTTS';
import SherpaOnnxTTS from './tts/SherpaOnnxTTS';

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
  const [text, setText] = useState(
    'Hello! This is a demonstration of on-device text-to-speech running entirely in your browser.'
  );

  const [activeEngine, setActiveEngine] = useState<EngineId | null>(null);
  const [globalSpeed, setGlobalSpeed] = useState(1.0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [globalStatus, setGlobalStatus] = useState<string>('idle');
  const [isSynth, setIsSynth] = useState(false);

  const kokoroRef = useRef<EngineRef>(null);
  const piperRef = useRef<EngineRef>(null);
  const sherpaRef = useRef<EngineRef>(null);

  const handleGenerate = () => {
    setAudioUrl(null);
    if (activeEngine === 'kokoro') kokoroRef.current?.synthesize(globalSpeed);
    else if (activeEngine === 'piper') piperRef.current?.synthesize(globalSpeed);
    else if (activeEngine === 'sherpa') sherpaRef.current?.synthesize(globalSpeed);
  };

  const handleStop = () => {
    if (activeEngine === 'kokoro') kokoroRef.current?.stop();
    else if (activeEngine === 'piper') piperRef.current?.stop();
    else if (activeEngine === 'sherpa') sherpaRef.current?.stop();
  };

  const handleStateChange = (newStatus: string, newIsSynth: boolean, engine: EngineId) => {
    // Only update global state if the event is coming from the active engine
    if (engine === activeEngine) {
      setGlobalStatus(newStatus);
      setIsSynth(newIsSynth);
    }
  };

  const isReady = globalStatus === 'ready' || globalStatus === 'speaking';

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

          {/* Engine panels (right column) */}
          <div className="md:col-span-3 space-y-4">
            <KokoroTTS
              ref={kokoroRef}
              text={text}
              isActive={activeEngine === 'kokoro'}
              onSelect={() => setActiveEngine('kokoro')}
              onStateChange={(s, synth) => handleStateChange(s, synth, 'kokoro')}
              onAudioReady={setAudioUrl}
            />
            <PiperTTS
              ref={piperRef}
              text={text}
              isActive={activeEngine === 'piper'}
              onSelect={() => setActiveEngine('piper')}
              onStateChange={(s, synth) => handleStateChange(s, synth, 'piper')}
              onAudioReady={setAudioUrl}
            />
            <SherpaOnnxTTS
              ref={sherpaRef}
              text={text}
              isActive={activeEngine === 'sherpa'}
              onSelect={() => setActiveEngine('sherpa')}
              onStateChange={(s, synth) => handleStateChange(s, synth, 'sherpa')}
              onAudioReady={setAudioUrl}
            />
          </div>
        </div>

        {/* ── Global Controls ─────────────────────────────────────────────────── */}
        <Card className="flex flex-col md:flex-row items-center gap-6 p-6 mt-8">
          <div className="w-full md:w-1/3 space-y-2">
            <div className="flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <Label className="mb-0">Speed</Label>
              <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">{globalSpeed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={0.5} max={2} step={0.05}
              value={globalSpeed}
              onChange={e => setGlobalSpeed(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none"
            />
          </div>

          <div className="w-full md:w-1/3 flex gap-2">
            <button
              onClick={globalStatus === 'speaking' && !isSynth ? handleStop : handleGenerate}
              disabled={globalStatus === 'loading' || isSynth || !text.trim() || !isReady || !activeEngine}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-semibold transition-all duration-300
                    ${isSynth || globalStatus === 'loading' || !text.trim() || !isReady || !activeEngine ? 'bg-gray-400 cursor-not-allowed opacity-70'
                  : globalStatus === 'speaking' && !isSynth ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20 shadow-lg'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 shadow-lg hover:-translate-y-0.5'}`}
            >
              {isSynth ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Audio…</>
                : globalStatus === 'speaking' ? <><Square className="w-5 h-5 fill-current" /> Stop Audio</>
                  : globalStatus === 'loading' ? <><Loader2 className="w-5 h-5 animate-spin" /> Engine Loading</>
                    : <><Play className="w-5 h-5 fill-current" /> Generate Speech</>}
            </button>

            {audioUrl && (
              <a href={audioUrl} download={`${activeEngine || 'tts'}-audio.wav`}
                className="flex items-center justify-center aspect-square shrink-0 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors border border-orange-200 dark:border-orange-700"
                title="Download Audio"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
              </a>
            )}
          </div>

          <div className="w-full md:w-1/3">
            {audioUrl ? (
              <audio key={audioUrl} controls autoPlay className="w-full h-12" src={audioUrl} />
            ) : (
              <div className="w-full h-12 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm italic">
                No audio generated yet
              </div>
            )}
          </div>
        </Card>


      </div>
    </ToolContainer>
  );
};

export default TextToSpeech;

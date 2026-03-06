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
import { useBatchTTS, JobItem } from './tts/useBatchTTS';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { UploadCloud, FileText, Trash2, Download } from 'lucide-react';

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
  const [mode, setMode] = useState<'single' | 'batch'>('single');
  const [text, setText] = useState(
    'Hello! This is a demonstration of on-device text-to-speech running entirely in your browser.'
  );

  const [activeEngine, setActiveEngine] = useState<EngineId | null>(null);
  const [globalSpeed, setGlobalSpeed] = useState(1.0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [globalStatus, setGlobalStatus] = useState<string>('idle');
  const [isSynth, setIsSynth] = useState(false);

  // Batch specific states
  const [batchText, setBatchText] = useState('');
  const [batchTitle, setBatchTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const kokoroRef = useRef<EngineRef>(null);
  const piperRef = useRef<EngineRef>(null);
  const sherpaRef = useRef<EngineRef>(null);

  // Engine audio hook state (this intercepts bubbling so useBatchTTS can capture the blob)
  const lastAudioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    lastAudioUrlRef.current = audioUrl;
  }, [audioUrl]);

  const handleSynthesizeBatchItem = async (fileText: string): Promise<Blob | null> => {
    if (!activeEngine) return null;

    // Reset last
    setAudioUrl(null);
    lastAudioUrlRef.current = null;

    // Trigger synthesis
    if (activeEngine === 'kokoro') kokoroRef.current?.synthesize(globalSpeed);
    else if (activeEngine === 'piper') piperRef.current?.synthesize(globalSpeed);
    else if (activeEngine === 'sherpa') sherpaRef.current?.synthesize(globalSpeed);

    // Wait for audioUrl to change or error to happen
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const poll = setInterval(async () => {
        attempts++;
        if (lastAudioUrlRef.current) {
          clearInterval(poll);
          try {
            const res = await fetch(lastAudioUrlRef.current);
            const blob = await res.blob();
            resolve(blob);
          } catch (e) {
            resolve(null);
          }
        }
        // Arbitrary timeout or error checking could go here (e.g. 60 seconds)
        if (attempts > 120) {
          clearInterval(poll);
          resolve(null);
        }
      }, 500);
    });
  };

  const { job, isProcessing, addFiles, addTextSnippet, toggleProcessing, removeItem, clearBatch } = useBatchTTS(handleSynthesizeBatchItem);

  const handleDownloadAll = async () => {
    if (!job || job.items.length === 0) return;
    const zip = new JSZip();

    job.items.filter(i => i.status === 'done' && i.audioBlob).forEach((item) => {
      let name = item.fileName;
      if (!name.endsWith('.wav')) name += '.wav';
      zip.file(name, item.audioBlob!);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'tts-batch-audio.zip');
  };

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
      <Tabs value={mode} onValueChange={(v: string) => setMode(v as 'single' | 'batch')} className="w-full">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 flex-1">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              All engines run <strong>100% in your browser</strong> — no audio leaves your device.
              Models are downloaded on demand and cached automatically.
              Nothing plays or processes in the background until you click a button.
            </p>
          </div>
          <TabsList className="shrink-0 self-start md:self-auto">
            <TabsTrigger value="single" className="px-6">Single Script</TabsTrigger>
            <TabsTrigger value="batch" className="px-6 relative">
              Batch Process
              {job && job.items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ── Main content grid ─────────────────────────────────────────── */}
        <div className="grid md:grid-cols-5 gap-6">

          {/* LEFT COLUMN: Input / Batch UI */}
          <div className="md:col-span-2 flex flex-col gap-4">

            <TabsContent value="single" className="m-0 h-full mt-0">
              <Card title="Text Input" className="h-[420px] flex flex-col">
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
            </TabsContent>

            <TabsContent value="batch" className="m-0 mt-0 flex flex-col gap-4">
              {/* Upload Area */}
              <Card>
                <div className="flex flex-col gap-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to upload text files (.txt, .md)</p>
                    <p className="text-xs text-gray-500 mt-1">Or drop them here</p>
                    <input
                      type="file"
                      multiple
                      accept=".txt,.md"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          addFiles(Array.from(e.target.files));
                        }
                      }}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200 dark:border-gray-700"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or Paste Script</span></div>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="File Name (e.g. intro.txt)"
                      className="w-full text-sm p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={batchTitle}
                      onChange={(e) => setBatchTitle(e.target.value)}
                    />
                    <TextArea
                      placeholder="Paste your script here..."
                      className="w-full min-h-[100px] text-sm p-2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      value={batchText}
                      onChange={(e) => setBatchText(e.target.value)}
                    />
                    <button
                      onClick={async () => {
                        if (batchText.trim()) {
                          await addTextSnippet(batchText, batchTitle);
                          setBatchText('');
                          setBatchTitle('');
                        }
                      }}
                      disabled={!batchText.trim()}
                      className="w-full py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      Add to Queue
                    </button>
                  </div>
                </div>
              </Card>

              {/* Queue Table */}
              {job && job.items.length > 0 && (
                <Card title={`Batch Queue (${job.items.length})`} className="flex-1 overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <button onClick={clearBatch} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1">
                      <Trash2 className="w-3 h-3" /> Clear All
                    </button>
                    {job.items.some((i: JobItem) => i.status === 'done' && i.audioBlob) && (
                      <button onClick={handleDownloadAll} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        <Download className="w-3 h-3" /> Download ZIP
                      </button>
                    )}
                  </div>
                  <div data-lenis-prevent className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[300px] custom-scrollbar">
                    {job.items.map((item: JobItem) => (
                      <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-sm">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                          <span className="truncate max-w-[120px]" title={item.fileName}>{item.fileName}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full
                                            ${item.status === 'done' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : item.status === 'generating' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse'
                                : item.status === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
                          >
                            {item.status}
                          </span>
                          {item.status === 'done' && item.audioBlob && (
                            <button
                              onClick={() => saveAs(item.audioBlob!, `${activeEngine || 'tts'}-${item.fileName}.wav`)}
                              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                          {item.status !== 'generating' && (
                            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </TabsContent>
          </div>

          {/* Engine panels (right column) */}
          <div className="md:col-span-3 space-y-4">
            <KokoroTTS
              ref={kokoroRef}
              text={mode === 'single' ? text : 'batch-mode'}
              isActive={activeEngine === 'kokoro'}
              onSelect={() => setActiveEngine('kokoro')}
              onStateChange={(s, synth) => handleStateChange(s, synth, 'kokoro')}
              onAudioReady={setAudioUrl}
            />
            <PiperTTS
              ref={piperRef}
              text={mode === 'single' ? text : 'batch-mode'}
              isActive={activeEngine === 'piper'}
              onSelect={() => setActiveEngine('piper')}
              onStateChange={(s, synth) => handleStateChange(s, synth, 'piper')}
              onAudioReady={setAudioUrl}
            />
            <SherpaOnnxTTS
              ref={sherpaRef}
              text={mode === 'single' ? text : 'batch-mode'}
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
            {mode === 'single' ? (
              <>
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
                    <Download className="w-5 h-5" />
                  </a>
                )}
              </>
            ) : (
              <button
                onClick={toggleProcessing}
                disabled={globalStatus === 'loading' || !isReady || !activeEngine || !job || job.items.length === 0 || job.items.every((i: any) => i.status === 'done')}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-semibold transition-all duration-300
                            ${!activeEngine || globalStatus === 'loading' || !job || job.items.length === 0 || job.items.every((i: any) => i.status === 'done') ? 'bg-gray-400 cursor-not-allowed opacity-70'
                    : isProcessing ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20 shadow-lg'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 shadow-lg hover:-translate-y-0.5'}`}
              >
                {isProcessing ? <><Square className="w-5 h-5 fill-current" /> Stop Batch</>
                  : globalStatus === 'loading' ? <><Loader2 className="w-5 h-5 animate-spin" /> Engine Loading</>
                    : job?.items.some((i: any) => i.status === 'done') && job?.items.some((i: any) => i.status === 'pending') ? <><Play className="w-5 h-5 fill-current" /> Resume Batch</>
                      : <><Play className="w-5 h-5 fill-current" /> Start Batch Generate</>}
              </button>
            )}
          </div>

          <div className="w-full md:w-1/3">
            {mode === 'single' ? (
              audioUrl ? (
                <audio key={audioUrl} controls autoPlay className="w-full h-12" src={audioUrl} />
              ) : (
                <div className="w-full h-12 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm italic">
                  No audio generated yet
                </div>
              )
            ) : (
              <div className="w-full h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                {job ? `${job.items.filter((i: any) => i.status === 'done').length} / ${job.items.length} Files Generated` : '0 / 0 Files Generated'}
              </div>
            )}
          </div>
        </Card>
      </Tabs>
    </ToolContainer>
  );
};

export default TextToSpeech;

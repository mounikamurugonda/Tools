'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, RotateCcw, Type, PanelLeft, Check, GripHorizontal
} from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import PreviewFrame from './components/PreviewFrame';
import Sidebar from './components/Sidebar';
import { useTypingEngine } from './hooks/useTypingEngine';
import { AppConfig, CodeSnippet } from './types';
import { DEFAULT_CODE, BACKGROUND_PRESETS, EDITOR_THEMES } from './constants';

const App: React.FC = () => {
  // --- State ---
  const [config, setConfig] = useState<AppConfig>({
    theme: 'dark',
    background: 'cosmic',
    deviceFrame: 'minimal',
    typingSpeed: 'normal',
    fontSize: 14,
    showCursor: true,
    soundEnabled: true,
    soundType: 'thock',
    lineNumbers: true,
  });

  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [sourceCode, setSourceCode] = useState<CodeSnippet>(DEFAULT_CODE);
  const [projectTitle, setProjectTitle] = useState("Pure CSS Carousel with Markers");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Layout State
  const [splitRatio, setSplitRatio] = useState(0.5);
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Recorder State
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Typing Engine Integration
  const [isPlaying, setIsPlaying] = useState(true);
  const [typedContent, setTypedContent] = useState('');

  const { displayedText, reset, jumpToEnd } = useTypingEngine({
    fullText: sourceCode[activeTab],
    speed: config.typingSpeed,
    isPlaying: isPlaying,
    soundEnabled: config.soundEnabled,
    soundType: config.soundType,
    onComplete: () => setIsPlaying(false)
  });

  useEffect(() => {
    setTypedContent(displayedText);
  }, [displayedText]);

  useEffect(() => {
    setIsPlaying(true);
  }, [activeTab, sourceCode]);

  // Handle Resize Drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !splitContainerRef.current) return;
      const containerRect = splitContainerRef.current.getBoundingClientRect();
      const relativeY = e.clientY - containerRect.top;
      const newRatio = Math.max(0.2, Math.min(0.8, relativeY / containerRect.height));
      setSplitRatio(newRatio);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    document.body.style.cursor = 'row-resize';
    e.preventDefault();
  };

  // Construct the Preview Content
  let previewHtml = '';
  let previewCss = '';
  let previewJs = '';

  switch (activeTab) {
    case 'html':
      previewHtml = typedContent;
      previewCss = ''; previewJs = '';
      break;
    case 'css':
      previewHtml = sourceCode.html;
      previewCss = typedContent; previewJs = '';
      break;
    case 'js':
      previewHtml = sourceCode.html;
      previewCss = sourceCode.css;
      previewJs = typedContent;
      break;
  }

  const startRecording = async () => {
    try {
      // Auto-close sidebar for cleaner recording
      setIsSidebarOpen(false);

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'browser',
          frameRate: 60
        },
        audio: false
      });

      const mimeType = MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
        ? 'video/webm; codecs=vp9'
        : 'video/webm';

      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8000000 });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `codecast-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      // If cancelled, ensure sidebar state is consistent if needed
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  // --- Helpers ---
  const activeBg = BACKGROUND_PRESETS.find(b => b.id === config.background) || BACKGROUND_PRESETS[0];
  const textColorClass = activeBg.isDark ? 'text-gray-100' : 'text-gray-900';
  const currentEditorTheme = EDITOR_THEMES.find(t => t.id === config.theme) || EDITOR_THEMES[0];
  const isLightEditor = currentEditorTheme.type === 'light';

  // --- Aspect Ratio Logic ---
  const getCanvasStyle = () => {
    const frame = config.deviceFrame;
    const base = {
      width: 'auto',
      height: '100%',
      maxHeight: '100%',
      maxWidth: '100%',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      transition: 'all 0.5s ease-in-out',
    };

    switch (frame) {
      case 'tiktok-shorts':
        return { ...base, aspectRatio: '9 / 16' };
      case 'instagram-square':
        return { ...base, aspectRatio: '1 / 1' };
      case 'linkedin-post':
        return { ...base, aspectRatio: '4 / 5' };
      case 'browser':
        return { ...base, aspectRatio: '16 / 9' };
      case 'minimal':
      default:
        return { ...base, width: '100%', height: '100%' };
    }
  };

  const isSideBySide = config.deviceFrame === 'browser';

  return (
    <div className="flex h-screen w-full bg-gray-950 overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        config={config}
        setConfig={setConfig}
        sourceCode={sourceCode}
        onSourceCodeChange={setSourceCode}
        projectTitle={projectTitle}
        onProjectTitleChange={setProjectTitle}
      />

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative bg-gray-950 text-gray-300">

        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 shrink-0 z-30 bg-gray-950 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md transition-colors text-gray-400 hover:bg-white/10 hover:text-white"
            >
              <PanelLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
                <Type size={20} className="text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight hidden sm:block text-white">CodeCast</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-lg shadow-red-500/20 active:scale-95"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                REC
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-red-500 text-red-500 text-xs font-bold animate-pulse"
              >
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                STOP
              </button>
            )}
          </div>
        </header>

        {/* --- Main Stage --- */}
        <main className="flex-1 overflow-hidden w-full flex items-center justify-center p-4 md:p-8 bg-gray-950 relative">

          {/* --- Canvas Frame --- */}
          {/* The background applies to THIS frame, maintaining consistency with aspect ratio */}
          <div
            id="canvas-stage"
            className={`flex flex-col relative overflow-hidden ${activeBg.value} ${textColorClass}`}
            style={getCanvasStyle()}
          >
            {/* 1. Title Area (Inside Canvas) */}
            <div className="w-full flex justify-center py-6 shrink-0 px-8 z-10">
              <input
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className={`text-2xl md:text-3xl font-bold text-center bg-transparent border-none outline-none w-full text-ellipsis placeholder-current opacity-90 ${activeBg.isDark ? 'text-white' : 'text-gray-900'}`}
                placeholder="Project Title"
              />
            </div>

            {/* 2. Content Area (Inside Canvas) */}
            <div className="flex-1 w-full h-full min-h-0 relative px-6 pb-6">

              {isSideBySide ? (
                /* --- LANDSCAPE LAYOUT --- */
                <div className="w-full h-full flex gap-6 items-start">
                  {/* Editor Left */}
                  <div className="flex-1 h-full rounded-xl shadow-2xl overflow-hidden border relative animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <EditorContainer
                      isLightEditor={isLightEditor}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      isPlaying={isPlaying}
                      setIsPlaying={setIsPlaying}
                      reset={reset}
                      typedContent={typedContent}
                      config={config}
                      sourceCode={sourceCode}
                    />
                  </div>
                  {/* Preview Right */}
                  <div className="flex-1 h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <PreviewFrame html={previewHtml} css={previewCss} js={previewJs} device={config.deviceFrame} scale={1} />
                  </div>
                </div>
              ) : (
                /* --- PORTRAIT/STACKED LAYOUT --- */
                <div
                  ref={splitContainerRef}
                  className="w-full h-full flex flex-col"
                >
                  {/* Top: Preview */}
                  <div
                    style={{ height: `${splitRatio * 100}%` }}
                    className="w-full min-h-[15%] max-h-[85%] relative"
                  >
                    <div className="w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <PreviewFrame html={previewHtml} css={previewCss} js={previewJs} device={config.deviceFrame} scale={1} />
                    </div>
                  </div>

                  {/* Resizer Handle */}
                  <div
                    onMouseDown={handleMouseDown}
                    className="h-6 -my-3 z-20 w-full flex items-center justify-center cursor-row-resize group shrink-0 select-none touch-none"
                  >
                    <div className={`
                      w-12 h-1 rounded-full transition-all duration-200 shadow-sm
                      ${activeBg.isDark ? 'bg-white/20 group-hover:bg-white/50' : 'bg-black/10 group-hover:bg-black/30'}
                    `}>
                      <GripHorizontal size={10} className={`mx-auto -mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${activeBg.isDark ? 'text-black' : 'text-white'}`} />
                    </div>
                  </div>

                  {/* Bottom: Editor */}
                  <div className="flex-1 min-h-[15%] w-full rounded-xl shadow-2xl overflow-hidden border relative animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <EditorContainer
                      isLightEditor={isLightEditor}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      isPlaying={isPlaying}
                      setIsPlaying={setIsPlaying}
                      reset={reset}
                      typedContent={typedContent}
                      config={config}
                      sourceCode={sourceCode}
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

// --- Subcomponents ---

const EditorContainer = ({
  isLightEditor, activeTab, setActiveTab, isPlaying, setIsPlaying, reset, typedContent, config, sourceCode
}: any) => (
  <div className={`w-full h-full flex flex-col ${isLightEditor ? 'bg-white border-gray-200' : 'bg-[#1e1e1e]/95 border-white/10'} backdrop-blur-xl`}>
    {/* Editor Header */}
    <div className={`h-10 flex items-center px-4 shrink-0 select-none ${isLightEditor ? 'bg-gray-100/80 border-b border-gray-200' : 'bg-[#252525]/80 border-b border-white/5'}`}>
      <div className="flex gap-2 w-14 group">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10"></div>
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10"></div>
        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10"></div>
      </div>
      <div className="flex-1 flex justify-center gap-1 px-4 overflow-x-auto no-scrollbar">
        {['html', 'css', 'js'].map((t: string) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`
              px-3 py-1 text-[10px] font-bold uppercase rounded transition-all duration-200
              ${activeTab === t
                ? (isLightEditor ? 'bg-gray-200 text-gray-800' : 'bg-white/10 text-white shadow-sm')
                : 'text-gray-500 hover:text-gray-400 hover:bg-white/5'
              }
            `}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="w-14 flex justify-end gap-1">
        <button onClick={() => setIsPlaying(!isPlaying)} className="text-gray-500 hover:text-gray-300 transition-colors p-1 hover:bg-white/5 rounded">
          {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
        </button>
        <button onClick={() => { reset(); setIsPlaying(true); }} className="text-gray-500 hover:text-gray-300 transition-colors p-1 hover:bg-white/5 rounded">
          <RotateCcw size={12} />
        </button>
      </div>
    </div>

    {/* Editor Body */}
    <div className="flex-1 relative overflow-hidden">
      <CodeEditor code={typedContent} language={activeTab} config={config} readOnly={true} />
      <CompletionBadge visible={!isPlaying && typedContent.length > 0 && typedContent.length === sourceCode[activeTab].length} />
    </div>
  </div>
);

const CompletionBadge = ({ visible }: { visible: boolean }) => (
  visible ? (
    <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 z-10 backdrop-blur-md">
      <Check size={12} />
      <span>Complete</span>
    </div>
  ) : null
);

export default App;

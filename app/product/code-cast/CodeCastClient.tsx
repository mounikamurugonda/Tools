'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, RotateCcw, Type, PanelLeft, Check, GripHorizontal,
  Mic, MicOff, Volume2, VolumeX
} from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import PreviewFrame from './components/PreviewFrame';
import Sidebar from './components/Sidebar';
import { useTypingEngine } from './hooks/useTypingEngine';
import { AppConfig, CodeSnippet } from './types';
import { DEFAULT_CODE, BACKGROUND_PRESETS, EDITOR_THEMES } from './constants';
import { preloadSounds } from './utils/sound';

const App: React.FC = () => {
  // --- Preload Sounds ---
  useEffect(() => {
    preloadSounds();
  }, []);
  // --- State ---
  const [config, setConfig] = useState<AppConfig>({
    theme: 'dark',
    background: 'codecast-gradient',
    deviceFrame: 'browser',
    typingSpeed: 'normal',
    fontSize: 14,
    showCursor: true,
    soundEnabled: true,
    soundType: 'deep',
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
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Typing Engine Integration
  const [isPlaying, setIsPlaying] = useState(true);
  const [typedContent, setTypedContent] = useState('');

  const handleTypingComplete = () => {
    const tabs: ('html' | 'css' | 'js')[] = ['html', 'css', 'js'];
    const currentIndex = tabs.indexOf(activeTab);

    let nextTab: 'html' | 'css' | 'js' | null = null;

    // Find next tab that has content
    for (let i = currentIndex + 1; i < tabs.length; i++) {
      const t = tabs[i];
      if (sourceCode[t] && sourceCode[t].trim().length > 0) {
        nextTab = t;
        break;
      }
    }

    if (nextTab) {
      setTimeout(() => {
        setActiveTab(nextTab!);
      }, 1500);
    } else {
      setIsPlaying(false);
    }
  };

  const { displayedText, reset, jumpToEnd } = useTypingEngine({
    fullText: sourceCode[activeTab],
    speed: config.typingSpeed,
    isPlaying: isPlaying,
    soundEnabled: config.soundEnabled,
    soundType: config.soundType,
    onComplete: handleTypingComplete
  });

  useEffect(() => {
    setTypedContent(displayedText);
  }, [displayedText]);

  useEffect(() => {
    setIsPlaying(true);
  }, [activeTab, sourceCode]);

  // Responsive: Handle screen size
  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    checkSize();

    // Optional: Add resize listener if we want auto-collapse on resize
    // window.addEventListener('resize', checkSize);
    // return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Handle Resize Drag (Window Split)
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

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'browser',
        },
        audio: true, // Attempt to capture system audio too
        preferCurrentTab: true
      } as any);

      // --- Mic Capture ---
      let micStream: MediaStream | null = null;
      if (isMicEnabled) {
        try {
          micStream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
            }
          });
        } catch (micErr) {
          console.warn("Details: Mic permission denied or failed", micErr);
          // Continue without mic
        }
      }

      // Combine tracks
      const tracks = [
        ...displayStream.getVideoTracks(),
        ...displayStream.getAudioTracks(),
        ...(micStream ? micStream.getAudioTracks() : [])
      ];
      const combinedStream = new MediaStream(tracks);

      // --- Region Capture (Targeted Recording) ---
      const [track] = displayStream.getVideoTracks();

      // Check if browser supports CropTarget (Chrome/Edge 104+)
      if ((window as any).CropTarget && (track as any).cropTo) {
        try {
          const element = document.getElementById('canvas-stage');
          if (element) {
            const cropTarget = await (window as any).CropTarget.fromElement(element);
            await (track as any).cropTo(cropTarget);
          }
        } catch (cropErr) {
          console.warn("Region capture failed, falling back to full tab/screen:", cropErr);
        }
      }

      // Priority: WebM (VP9) -> WebM (Default) -> MP4 (Fallback)
      const mimeType = MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
        ? 'video/webm; codecs=vp9'
        : MediaRecorder.isTypeSupported('video/webm')
          ? 'video/webm'
          : 'video/mp4';

      const recorder = new MediaRecorder(combinedStream, { mimeType, videoBitsPerSecond: 2500000 });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const type = mimeType.split(';')[0];
        const ext = type.split('/')[1] || 'webm';
        const blob = new Blob(chunksRef.current, { type });

        // Stop all tracks (including mic)
        combinedStream.getTracks().forEach(track => track.stop());
        if (micStream) micStream.getTracks().forEach(track => track.stop());
        // Also ensure original display stream tracks are stopped if different
        displayStream.getTracks().forEach(track => track.stop());

        if (blob.size === 0) {
          console.error("Recording failed: Resulting blob is empty.");
          setIsRecording(false);
          return;
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `codecast-${Date.now()}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsRecording(false);
      };

      recorder.start(1000);
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
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
    <div className="flex h-[calc(100vh-5rem)] w-full bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">

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

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="lg:hidden absolute inset-0 bg-black/50 z-10 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-300 transition-colors duration-300">

        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 shrink-0 z-30 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md transition-colors text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
            >
              <PanelLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight hidden sm:block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 leading-none">
                    CodeCast
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-sm leading-none tracking-wider">
                    Beta
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium hidden sm:block">A product by UtilToolkits</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Playback Controls */}
            <div className="flex items-center gap-1 mr-2 bg-gray-100 dark:bg-gray-900 rounded-lg p-1 border border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all hover:shadow-sm"
                title={isPlaying ? "Pause Typing" : "Resume Typing"}
              >
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
              </button>
              <button
                onClick={() => { setActiveTab('html'); reset(); setIsPlaying(true); }}
                className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all hover:shadow-sm"
                title="Reset Typing"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1"></div>

            {/* Audio Controls */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 rounded-lg p-1 border border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setIsMicEnabled(!isMicEnabled)}
                className={`p-1.5 rounded-md transition-all ${isMicEnabled
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}
                title={isMicEnabled ? "Mic On" : "Mic Off"}
              >
                {isMicEnabled ? <Mic size={14} /> : <MicOff size={14} />}
              </button>
              <button
                onClick={() => setConfig(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                className={`p-1.5 rounded-md transition-all ${config.soundEnabled
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-400 dark:text-gray-500 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}
                title={config.soundEnabled ? "Keyboard Sounds On" : "Keyboard Sounds Off"}
              >
                {config.soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>
            </div>

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
        <main className="flex-1 overflow-hidden w-full flex items-center justify-center p-4 md:p-8 bg-gray-50 dark:bg-gray-950 relative transition-colors duration-300">

          {/* --- Canvas Frame --- */}
          {/* The background applies to THIS frame, maintaining consistency with aspect ratio */}
          <div
            id="canvas-stage"
            className={`flex flex-col relative overflow-hidden ${activeBg.value} ${textColorClass}`}
            style={getCanvasStyle()}
          >
            {/* 1. Title Area (Inside Canvas) */}
            <div className="w-full flex justify-center py-4 shrink-0 px-8 z-10">
              <input
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className={`text-2xl md:text-3xl font-bold text-center bg-transparent border-none outline-none w-full text-ellipsis placeholder-current opacity-90 ${activeBg.isDark ? 'text-white' : 'text-gray-900'}`}
                placeholder="Project Title"
                spellCheck={true}
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

            {/* Watermark */}
            <div className="absolute bottom-0 right-7 z-50 pointer-events-none select-none opacity-40">
              <span className={`text-[10px] font-medium   tracking-widest ${activeBg.isDark ? 'text-white' : 'text-black'}`}>
                Code Cast by Utiltoolkits.com
              </span>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

// --- Subcomponents ---

const EditorContainer = ({
  isLightEditor, activeTab, setActiveTab, isPlaying, typedContent, config, sourceCode
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
      <div className="w-14"></div> {/* Spacer to balance the header since buttons are gone */}
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
    <div className="absolute bottom-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 animate-in fade-in zoom-in duration-300 z-10 backdrop-blur-md">
      <Check size={16} strokeWidth={3} />
    </div>
  ) : null
);

export default App;

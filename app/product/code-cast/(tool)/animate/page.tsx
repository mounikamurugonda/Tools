'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Code, FileCode, FileJson } from 'lucide-react';
import { useAnimateStore } from '../../store/useCodeCastStore';
import PreviewFrame from '../../components/PreviewFrame';
import { useRecording } from '../../context/RecordingContext';
import { getCanvasLayout } from '../../utils/layoutHelpers';
import { RecordingTimer } from '../../components/RecordingTimer';
import { RecordingDownloadModal } from '../../components/RecordingDownloadModal';
import { ProjectTitleDisplay } from '../../components/ProjectTitleDisplay';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Mic, MicOff, Square } from 'lucide-react';

// Convert typing speed to milliseconds
const getTypingSpeedMs = (speed: 'slow' | 'normal' | 'fast' | 'instant') => {
  const speedMap = {
    slow: 80,
    normal: 30,
    fast: 10,
    instant: 0,
  };
  return speedMap[speed];
};

export default function AnimatePage() {
  const {
    code,
    updateCode,
    config,
    setConfig,
    activeTab,
    setActiveTab,
    isPlaying,
    setIsPlaying,
    isRecording: storeIsRecording,
    projectTitle,
    shadowBlur,
    shadowSpread,
  } = useAnimateStore();

  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const {
    isRecording,
    recordingTime,
    recordedVideoBlob,
    startRecording,
    stopRecording,
    downloadRecording,
    clearRecording,
  } = useRecording();

  // Animation refs
  const animationTimerRef = useRef<number | null>(null);
  const fullBackupRef = useRef(code);
  const typingSpeedRef = useRef(config.typingSpeed);



  // Sync typing speed ref with config
  useEffect(() => {
    typingSpeedRef.current = config.typingSpeed;
  }, [config.typingSpeed]);

  // Show download modal when recording is complete
  useEffect(() => {
    if (!isRecording && recordedVideoBlob) {
      setShowDownloadModal(true);
    }
  }, [isRecording, recordedVideoBlob]);

  const stopAnimation = useCallback(() => {
    if (animationTimerRef.current) {
      window.clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    setIsPlaying(false);
  }, [setIsPlaying]);

  // Robust cleanup on unmount
  useEffect(() => {
    return () => {
      // Stop timer
      if (animationTimerRef.current) {
        window.clearTimeout(animationTimerRef.current);
      }

      // Stop audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // If playing on unmount, force stop and restore code to prevent data loss or stuck state
      if (isPlayingRef.current) {
        setIsPlaying(false);
        const backup = fullBackupRef.current;
        // Direct state updates to ensure they happen even if component is unmounting
        useAnimateStore.getState().updateCode('html', backup.html);
        useAnimateStore.getState().updateCode('css', backup.css);
        useAnimateStore.getState().updateCode('js', backup.js);
      }
    };
  }, [setIsPlaying]);

  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/keyboard-typing.mp3');
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Trigger animation when isPlaying changes (from header button)
  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    const wasPlaying = isPlayingRef.current;
    isPlayingRef.current = isPlaying;

    // If transitioning from not playing to playing, start animation
    if (!wasPlaying && isPlaying) {
      if (config.soundEnabled && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
      }

      // Capture the target state from current editor content
      const target = { ...code };
      fullBackupRef.current = target;

      // Clear all code fields first
      updateCode('html', '');
      updateCode('css', '');
      updateCode('js', '');

      const sequence: ('html' | 'css' | 'js')[] = ['html', 'css', 'js'];
      let sequenceIndex = 0;
      let charIndex = 0;

      const startNextTab = () => {
        // Find next non-empty tab in sequence
        while (sequenceIndex < sequence.length && (!target[sequence[sequenceIndex]] || !target[sequence[sequenceIndex]].trim())) {
          sequenceIndex++;
        }

        if (sequenceIndex >= sequence.length) {
          stopAnimation();
          return;
        }

        const currentTabId = sequence[sequenceIndex];
        setActiveTab(currentTabId);
        charIndex = 0;

        const typeChar = () => {
          const fullText = target[currentTabId];

          if (charIndex <= fullText.length) {
            updateCode(currentTabId, fullText.substring(0, charIndex));
            charIndex++;
            animationTimerRef.current = window.setTimeout(typeChar, getTypingSpeedMs(typingSpeedRef.current));
          } else {
            // Finished this tab, move to next after a small pause
            sequenceIndex++;
            animationTimerRef.current = window.setTimeout(startNextTab, 350);
          }
        };

        // Start typing after a small delay
        animationTimerRef.current = window.setTimeout(typeChar, 150);
      };

      // Initial delay
      animationTimerRef.current = window.setTimeout(startNextTab, 300);
    } else if (wasPlaying && !isPlaying) {
      // If transitioning from playing to not playing, stop and restore
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      stopAnimation();
      updateCode('html', fullBackupRef.current.html);
      updateCode('css', fullBackupRef.current.css);
      updateCode('js', fullBackupRef.current.js);
    }
  }, [isPlaying, code, stopAnimation, updateCode, setActiveTab, config.soundEnabled]);

  const handleAnimate = useCallback(() => {
    if (isPlaying) {
      stopAnimation();
      // Restore full code
      updateCode('html', fullBackupRef.current.html);
      updateCode('css', fullBackupRef.current.css);
      updateCode('js', fullBackupRef.current.js);
      return;
    }

    // Capture the target state from current editor content
    const target = { ...code };
    fullBackupRef.current = target;

    // Clear all code fields first
    updateCode('html', '');
    updateCode('css', '');
    updateCode('js', '');
    setIsPlaying(true);

    const sequence: ('html' | 'css' | 'js')[] = ['html', 'css', 'js'];
    let sequenceIndex = 0;
    let charIndex = 0;

    const startNextTab = () => {
      // Find next non-empty tab in sequence
      while (sequenceIndex < sequence.length && (!target[sequence[sequenceIndex]] || !target[sequence[sequenceIndex]].trim())) {
        sequenceIndex++;
      }

      if (sequenceIndex >= sequence.length) {
        stopAnimation();
        return;
      }

      const currentTabId = sequence[sequenceIndex];
      setActiveTab(currentTabId);
      charIndex = 0;

      const typeChar = () => {
        const fullText = target[currentTabId];

        if (charIndex <= fullText.length) {
          updateCode(currentTabId, fullText.substring(0, charIndex));
          charIndex++;
          animationTimerRef.current = window.setTimeout(typeChar, getTypingSpeedMs(typingSpeedRef.current));
        } else {
          // Finished this tab, move to next after a small pause
          sequenceIndex++;
          animationTimerRef.current = window.setTimeout(startNextTab, 350);
        }
      };

      // Start typing after a small delay
      animationTimerRef.current = window.setTimeout(typeChar, 150);
    };

    // Initial delay
    animationTimerRef.current = window.setTimeout(startNextTab, 300);
  }, [code, isPlaying, stopAnimation, updateCode, setActiveTab, setIsPlaying]);

  // Get responsive layout configuration based on device frame
  const layout = getCanvasLayout(config.deviceFrame);

  // Tab configuration
  const tabs = [
    { id: 'html' as const, label: 'HTML', icon: Code, color: 'text-orange-500' },
    { id: 'css' as const, label: 'CSS', icon: FileCode, color: 'text-blue-500' },
    { id: 'js' as const, label: 'JS', icon: FileJson, color: 'text-yellow-500' },
  ];

  const getLanguage = () => {
    if (activeTab === 'js') return 'javascript';
    return activeTab;
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Canvas Area - Responsive Layout */}
      <div
        id="canvas-stage"
        className={`flex-1 flex flex-col ${config.background === 'codecast-gradient' ? 'bg-gradient-to-br from-blue-600 to-purple-600' : config.background} relative overflow-hidden rounded-xl`}
        style={{
          aspectRatio: layout.canvasAspectRatio,
          maxWidth: layout.maxWidth || 'none',
          maxHeight: layout.maxHeight || 'none',
          margin: layout.canvasAspectRatio ? 'auto' : undefined,
          padding: `${config.canvasPadding}px`,
        }}
      >
        {/* Recording Timer */}
        {/* {isRecording && <RecordingTimer recordingTime={recordingTime} />} */}

        <ProjectTitleDisplay />

        {/* Content Wrapper */}
        <div className={`flex-1 flex ${layout.flexDirection} ${layout.gap} w-full min-h-0`}>
          {/* Editor */}
          <div
            className="flex-1 rounded-xl overflow-hidden transition-shadow duration-300"
            style={{
              order: layout.flexDirection === 'flex-col' ? 2 : 1,
              boxShadow: `0 20px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, 0.3)`
            }}
          >
            <div className="flex flex-col h-full">
              {/* Tabs */}
              <div className={`flex border-b shrink-0 ${config.theme === 'light' ? 'bg-gray-100 border-gray-300' : 'bg-slate-950 border-slate-800'}`}>
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      disabled={isPlaying}
                      className={`flex items-center gap-2 px-6 py-2 text-xs font-bold transition-all border-b-2 ${isActive
                        ? config.theme === 'light'
                          ? 'bg-white border-blue-500 text-blue-600'
                          : 'bg-slate-900 border-blue-500 text-blue-400'
                        : config.theme === 'light'
                          ? 'border-transparent text-gray-500 hover:text-gray-700 disabled:opacity-50'
                          : 'border-transparent text-slate-500 hover:text-slate-300 disabled:opacity-50'
                        }`}
                    >
                      <Icon size={14} />
                      {tab.label}
                      {code[tab.id].trim() && (
                        <div className={`w-1.5 h-1.5 rounded-full ${isPlaying && isActive ? 'bg-blue-400 animate-pulse' : 'bg-blue-500/30'}`}></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Monaco Editor */}
              <div className={`flex-1 relative ${config.theme === 'light' ? 'bg-white' : 'bg-slate-900'}`}>
                <Editor
                  height="100%"
                  width="100%"
                  language={getLanguage()}
                  value={code[activeTab]}
                  theme={config.theme === 'light' ? 'vs-light' : 'vs-dark'}
                  onChange={(value) => {
                    if (!isPlaying && value !== undefined) {
                      updateCode(activeTab, value);
                    }
                  }}
                  options={{
                    readOnly: isPlaying,
                    minimap: { enabled: false },
                    fontSize: config.fontSize,
                    wordWrap: config.wordWrap ? 'on' : 'off',
                    lineNumbers: config.lineNumbers ? 'on' : 'off',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 8, bottom: 8 },
                    fontFamily: '"Fira Code", "JetBrains Mono", "Menlo", "Consolas", monospace',
                    cursorWidth: 0, // Effectively hides the cursor
                    cursorStyle: 'line',
                    cursorBlinking: 'solid',
                    renderLineHighlight: 'none', // Hides active line
                    guides: { indentation: false }, // Hides nesting lines

                    // Hide selection and other decorations
                    selectionHighlight: false,
                    renderValidationDecorations: 'off',
                    matchBrackets: 'never',
                    hideCursorInOverviewRuler: true,
                    overviewRulerLanes: 0,
                    overviewRulerBorder: false,

                    fontLigatures: true,
                    scrollbar: {
                      vertical: 'hidden',
                      horizontal: 'hidden',
                      useShadows: false,
                    },
                  }}
                />
              </div>
            </div>
          </div>
          {/* Preview */}
          <div
            className="flex-1 rounded-xl overflow-hidden bg-white transition-shadow duration-300"
            style={{
              order: layout.flexDirection === 'flex-col' ? 1 : 2,
              boxShadow: `0 20px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, 0.3)`
            }}
          >
            <PreviewFrame html={code.html} css={code.css} js={code.js} device={config.deviceFrame} scale={1} />
          </div>
        </div>
      </div>

      {/* Download Modal */}
      <RecordingDownloadModal
        isOpen={showDownloadModal}
        onClose={() => {
          setShowDownloadModal(false);
          clearRecording();
        }}
        onDownload={downloadRecording}
        recordingTime={recordingTime}
      />
    </div>
  );
}

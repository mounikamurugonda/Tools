'use client';

import React, { useState, useEffect } from 'react';
import { useAnimateStore } from '../../store/useCodeCastStore';
import { TypeTabEditor } from '../../components/TypeTabEditor';
import PreviewFrame from '../../components/PreviewFrame';
import { useTypingEngine } from '../../hooks/useTypingEngine';
import { useRecording } from '../../context/RecordingContext';
import { getCanvasLayout } from '../../utils/layoutHelpers';
import { ProjectInfoOverlay } from '../../components/ProjectInfoOverlay';
import { RecordingTimer } from '../../components/RecordingTimer';
import { RecordingDownloadModal } from '../../components/RecordingDownloadModal';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';

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
  } = useAnimateStore();

  const [typedContent, setTypedContent] = useState('');
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

  // Show download modal when recording is complete
  useEffect(() => {
    if (!isRecording && recordedVideoBlob) {
      setShowDownloadModal(true);
    }
  }, [isRecording, recordedVideoBlob]);

  // --- Typing Logic ---
  const handleTypingComplete = () => {
    const tabs: ('html' | 'css' | 'js')[] = ['html', 'css', 'js'];
    const currentIndex = tabs.indexOf(activeTab);
    let nextTab: 'html' | 'css' | 'js' | null = null;
    for (let i = currentIndex + 1; i < tabs.length; i++) {
      const t = tabs[i];
      if (code[t] && code[t].trim().length > 0) {
        nextTab = t;
        break;
      }
    }
    if (nextTab) {
      setTimeout(() => setActiveTab(nextTab!), 500);
    } else {
      setIsPlaying(false);
    }
  };

  const { displayedText, reset } = useTypingEngine({
    fullText: code[activeTab],
    speed: config.typingSpeed,
    isPlaying: isPlaying,
    soundEnabled: config.soundEnabled,
    soundType: config.soundType,
    onComplete: handleTypingComplete,
  });

  useEffect(() => {
    setTypedContent(displayedText);
  }, [displayedText]);

  // Handle Play Click (Smart Start)
  const handlePlayClick = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    // Always start from the first non-empty tab (HTML -> CSS -> JS)
    const tabs: ('html' | 'css' | 'js')[] = ['html', 'css', 'js'];
    const firstNonEmpty = tabs.find(t => code[t] && code[t].trim().length > 0);
    if (firstNonEmpty) {
      setActiveTab(firstNonEmpty);
    }
    setIsPlaying(true);
  };

  // --- Render ---
  const previewHtml =
    activeTab === 'html'
      ? typedContent
      : activeTab === 'css' || activeTab === 'js'
        ? code.html
        : '';
  const previewCss =
    activeTab === 'css'
      ? typedContent
      : activeTab === 'js'
        ? code.css
        : activeTab === 'html'
          ? ''
          : code.css;

  let pHTML = '',
    pCSS = '',
    pJS = '';
  switch (activeTab) {
    case 'html':
      pHTML = typedContent;
      break;
    case 'css':
      pHTML = code.html;
      pCSS = typedContent;
      break;
    case 'js':
      pHTML = code.html;
      pCSS = code.css;
      pJS = typedContent;
      break;
  }

  // Idle State: Show full code if not playing and no typed content
  const showPlaceholder = !isPlaying && typedContent.length === 0;
  if (showPlaceholder) {
    pHTML = code.html;
    pCSS = code.css;
    pJS = code.js;
  }

  // Get responsive layout configuration based on device frame
  const layout = getCanvasLayout(config.deviceFrame);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Canvas Area - Responsive Layout */}
      <div
        id="canvas-stage"
        className={`flex-1 flex ${layout.flexDirection} ${layout.gap} ${config.background === 'codecast-gradient' ? 'bg-gradient-to-br from-blue-600 to-purple-600' : config.background} relative overflow-hidden rounded-xl`}
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

        {/* Project Info Overlay */}
        <ProjectInfoOverlay projectTitle={projectTitle} />

        {/* Editor */}
        <div
          className="flex-1 rounded-xl shadow-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md"
          style={{ order: layout.flexDirection === 'flex-col' ? 2 : 1 }}
        >
          <TypeTabEditor
            code={showPlaceholder ? code : { ...code, [activeTab]: typedContent }}
            config={config}
            onChange={newCode => {
              // Update the store with the new code for the active tab
              const changedTab = activeTab;
              updateCode(changedTab, newCode[changedTab]);
            }}
            readOnly={false}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Preview */}
        <div
          className="flex-1 rounded-xl shadow-2xl overflow-hidden border border-white/10 bg-white"
          style={{ order: layout.flexDirection === 'flex-col' ? 1 : 2 }}
        >
          <PreviewFrame html={pHTML} css={pCSS} js={pJS} device={config.deviceFrame} scale={1} />
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

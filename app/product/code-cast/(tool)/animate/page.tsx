'use client';

import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { useAnimateStore } from '../../store/useCodeCastStore';
import PreviewFrame from '../../components/PreviewFrame';
import { useRecording } from '../../context/RecordingContext';
import { getCanvasLayout } from '../../utils/layoutHelpers';
import { RecordingDownloadModal } from '../../components/RecordingDownloadModal';

// Hooks
import { useMultiTabAnimation } from '../../hooks/useMultiTabAnimation';
import { useMobileDefaultConfig } from '../../hooks/useMobileDefaultConfig';
import { useSearchParams } from 'next/navigation';

// Components
import { CodeCastEditor } from '../../components/CodeCastEditor';
import { AnimateCanvas } from '../../components/AnimateCanvas';
import { Loader2 } from 'lucide-react';

function AnimatePageContent() {
  const {
    code,
    updateCode,
    config,
    activeTab,
    setActiveTab,
    isPlaying,
    setIsPlaying,
    isPaused,
    setIsPaused,
    shadowBlur,
    shadowSpread,
    updateConfig,
    setCode,
    setConfig,
    setProjectTitle,
    audioFile,
  } = useAnimateStore();

  const searchParams = useSearchParams();
  const snippetId = searchParams.get('snippet');
  const [shortId, setShortId] = useState<string | null>(null);

  useEffect(() => {
    if (!snippetId) return;

    const fetchSnippet = async () => {
      try {
        const res = await fetch(`/api/code-cast/snippet/${snippetId}`);
        const data = await res.json();
        if (data.snippet) {
          if (data.snippet.code) {
            setCode({
              html: data.snippet.code.html || '',
              css: data.snippet.code.css || '',
              js: data.snippet.code.js || ''
            });
          }
          if (data.snippet.config) setConfig(data.snippet.config);
          if (data.snippet.title) setProjectTitle(data.snippet.title);
          if (data.snippet.short_id) setShortId(data.snippet.short_id);
        }
      } catch (e) {
        console.error("Failed to load snippet", e);
      }
    };
    fetchSnippet();
  }, [snippetId, setCode, setConfig, setProjectTitle]);

  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const {
    isRecording,
    recordingTime,
    recordedVideoBlob,
    downloadRecording,
    clearRecording,
  } = useRecording();

  // Handle Mobile Defaults
  useMobileDefaultConfig(useAnimateStore);

  // Animation & Refs
  const editorRef = useRef<any>(null);

  // Use Custom Hooks
  useMultiTabAnimation({
    code,
    updateCode,
    config,
    activeTab,
    setActiveTab,
    isPlaying,
    setIsPlaying,
    isPaused,
    setIsPaused,
    editorRef,
    audioFile,
    isRecording,
  });

  // Show download modal when recording is complete
  useEffect(() => {
    if (!isRecording && recordedVideoBlob) {
      setShowDownloadModal(true);
    }
  }, [isRecording, recordedVideoBlob]);

  // Layout calculations - memoized to update when device changes
  const layout = useMemo(() => getCanvasLayout(config.deviceFrame), [config.deviceFrame]);
  const isLight = config.theme === 'light' || config.theme === 'github' || config.theme === 'solarized-light';

  const shareUrl = shortId
    ? `https://utiltoolkits.com/s/${shortId}`
    : (snippetId ? `https://utiltoolkits.com/product/code-cast/animate?snippet=${snippetId}` : undefined);

  return (
    <div className="w-full h-full flex flex-col">
      <AnimateCanvas layout={layout} config={config}>
        {/* Editor */}
        <CodeCastEditor
          code={code}
          updateCode={updateCode}
          config={config}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isPlaying={isPlaying}
          isLight={isLight}
          shadowBlur={shadowBlur}
          shadowSpread={shadowSpread}
          layout={layout}
          editorRef={editorRef}
          updateConfig={updateConfig}
          isRecording={isRecording}
        />

        {/* Preview */}
        <div
          className={`flex-1 min-h-0 max-h-full rounded-xl overflow-hidden transition-all duration-300 ${config.isGlassStyle ? 'bg-transparent' : 'bg-white'}`}
          style={{
            order: layout.flexDirection === 'flex-col' ? 1 : 2,
            boxShadow: config.isGlassStyle ? undefined : `0 20px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, 0.3)`
          }}
        >
          <PreviewFrame
            html={code.html}
            css={code.css}
            js={code.js}
            device={config.deviceFrame}
            scale={1}
            libraries={config.libraries}
            isGlassStyle={config.isGlassStyle}
          />
        </div>
      </AnimateCanvas>

      {/* Download Modal */}
      <RecordingDownloadModal
        isOpen={showDownloadModal}
        onClose={() => {
          setShowDownloadModal(false);
          clearRecording();
        }}
        onDownload={downloadRecording}
        recordingTime={recordingTime}
        code={code}
        shareUrl={shareUrl}
      />
    </div>
  );
}

export default function AnimatePage() {
  return (
    <Suspense fallback={
      <div className="flex w-full h-full items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    }>
      <AnimatePageContent />
    </Suspense>
  );
}

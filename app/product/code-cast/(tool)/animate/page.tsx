'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAnimateStore } from '../../store/useCodeCastStore';
import PreviewFrame from '../../components/PreviewFrame';
import { useRecording } from '../../context/RecordingContext';
import { getCanvasLayout } from '../../utils/layoutHelpers';
import { RecordingDownloadModal } from '../../components/RecordingDownloadModal';

// Hooks
import { useMultiTabAnimation } from '../../hooks/useMultiTabAnimation';

// Components
import { CodeCastEditor } from '../../components/CodeCastEditor';
import { AnimateCanvas } from '../../components/AnimateCanvas';

export default function AnimatePage() {
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
  } = useAnimateStore();

  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const {
    isRecording,
    recordingTime,
    recordedVideoBlob,
    downloadRecording,
    clearRecording,
  } = useRecording();

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
  });

  // Show download modal when recording is complete
  useEffect(() => {
    if (!isRecording && recordedVideoBlob) {
      setShowDownloadModal(true);
    }
  }, [isRecording, recordedVideoBlob]);

  // Layout calculations
  const layout = getCanvasLayout(config.deviceFrame);
  const isLight = config.theme === 'light' || config.theme === 'github' || config.theme === 'solarized-light';

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
        />

        {/* Preview */}
        <div
          className="flex-1 rounded-xl overflow-hidden bg-white transition-shadow duration-300"
          style={{
            order: layout.flexDirection === 'flex-col' ? 1 : 2,
            boxShadow: `0 20px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, 0.3)`
          }}
        >
          <PreviewFrame
            html={code.html}
            css={code.css}
            js={code.js}
            device={config.deviceFrame}
            scale={1}
            libraries={config.libraries}
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
      />
    </div>
  );
}

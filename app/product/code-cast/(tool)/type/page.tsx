'use client';

import React, { useState, useEffect } from 'react';
import { useTypeStore } from '../../store/useCodeCastStore';
import { CodeCastEditor } from '../../components/CodeCastEditor';
import { CodeCastCanvas } from '../../components/CodeCastCanvas';
import PreviewFrame from '../../components/PreviewFrame';
import { useRecording } from '../../context/RecordingContext';
import { getCanvasLayout } from '../../utils/layoutHelpers';
import { RecordingTimer } from '../../components/RecordingTimer';
import { RecordingDownloadModal } from '../../components/RecordingDownloadModal';
import { Mic, MicOff } from 'lucide-react';

export default function TypePage() {
  const { code, updateCode, setCode, config, activeTab, setActiveTab, projectTitle, shadowBlur, shadowSpread, updateConfig } =
    useTypeStore();

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

  // Get responsive layout configuration based on device frame
  const layout = getCanvasLayout(config.deviceFrame);

  return (
    <div className="w-full h-full flex flex-col">
      <CodeCastCanvas layout={layout} config={config}>
        {/* Editor - Editable in Type Mode */}
        <CodeCastEditor
          code={code}
          updateCode={updateCode}
          config={config}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLight={config.theme === 'light' || config.theme === 'github' || config.theme === 'solarized-light'}
          shadowBlur={shadowBlur}
          shadowSpread={shadowSpread}
          layout={layout}
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
      </CodeCastCanvas>

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

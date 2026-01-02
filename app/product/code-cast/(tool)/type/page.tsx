'use client';

import React, { useState, useEffect } from 'react';
import { useTypeStore } from '../../store/useCodeCastStore';
import { TypeTabEditor } from '../../components/TypeTabEditor';
import PreviewFrame from '../../components/PreviewFrame';
import { useRecording } from '../../context/RecordingContext';
import { getCanvasLayout } from '../../utils/layoutHelpers';
import { RecordingTimer } from '../../components/RecordingTimer';
import { RecordingDownloadModal } from '../../components/RecordingDownloadModal';
import { ProjectTitleDisplay } from '../../components/ProjectTitleDisplay';
import { Mic, MicOff } from 'lucide-react';

export default function TypePage() {
  const { code, updateCode, setCode, config, activeTab, setActiveTab, projectTitle, shadowBlur, shadowSpread } =
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
          {/* Editor - Editable in Type Mode */}
          <div
            className="flex-1 rounded-xl overflow-hidden bg-black/40 backdrop-blur-md transition-shadow duration-300"
            style={{
              order: layout.flexDirection === 'flex-col' ? 2 : 1,
              boxShadow: `0 20px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, 0.3)`,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              textRendering: 'optimizeLegibility',
            } as React.CSSProperties}
          >
            <TypeTabEditor
              code={code}
              config={config}
              onChange={newCode => {
                if (newCode && typeof newCode === 'object') {
                  setCode({ ...code, ...newCode });
                }
              }}
              readOnly={false}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

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
            />
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 flex items-center px-2 py-1 pointer-events-none z-20 opacity-20">
          <span className="text-[10px] font-medium text-white tracking-wide mix-blend-plus-lighter">
            CodeCast by utiltoolkits.com
          </span>
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

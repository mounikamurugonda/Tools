'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useTypeStore } from '../../store/useCodeCastStore';
import { CodeCastEditor } from '../../components/CodeCastEditor';
import { CodeCastCanvas } from '../../components/CodeCastCanvas';
import PreviewFrame from '../../components/PreviewFrame';
import { useRecording } from '../../context/RecordingContext';
import { getCanvasLayout } from '../../utils/layoutHelpers';
import { RecordingTimer } from '../../components/RecordingTimer';
import { RecordingDownloadModal } from '../../components/RecordingDownloadModal';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useMobileDefaultConfig } from '../../hooks/useMobileDefaultConfig';
import { useSearchParams } from 'next/navigation';

function TypePageContent() {
  const { code, updateCode, setCode, config, setConfig, activeTab, setActiveTab, projectTitle, setProjectTitle, shadowBlur, shadowSpread, updateConfig } =
    useTypeStore();

  const searchParams = useSearchParams();
  const snippetId = searchParams.get('snippet');

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
        }
      } catch (e) {
        console.error("Failed to load snippet", e);
      }
    };
    fetchSnippet();
  }, [snippetId, setCode, setConfig, setProjectTitle]);

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

  // Handle Mobile Defaults
  useMobileDefaultConfig(useTypeStore);

  // Show download modal when recording is complete
  useEffect(() => {
    if (!isRecording && recordedVideoBlob) {
      setShowDownloadModal(true);
    }
  }, [isRecording, recordedVideoBlob]);

  // Get responsive layout configuration based on device frame - memoized to update when device changes
  const layout = useMemo(() => getCanvasLayout(config.deviceFrame), [config.deviceFrame]);

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
          className={`flex-1 min-h-0 max-h-full ${config.isClassicView ? '' : 'rounded-xl'} overflow-hidden bg-white transition-shadow duration-300`}
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

export default function TypePage() {
  return (
    <Suspense fallback={
      <div className="flex w-full h-full items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    }>
      <TypePageContent />
    </Suspense>
  );
}

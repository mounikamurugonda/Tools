'use client';

import React, { useState, useEffect } from 'react';
import { useTypeStore } from '../../store/useCodeCastStore';
import { TypeTabEditor } from '../../components/TypeTabEditor';
import PreviewFrame from '../../components/PreviewFrame';
import { useRecording } from '../../context/RecordingContext';
import { getCanvasLayout } from '../../utils/layout';
import { ProjectInfoOverlay } from '../../components/ProjectInfoOverlay';
import { RecordingTimer } from '../../components/RecordingTimer';
import { RecordingDownloadModal } from '../../components/RecordingDownloadModal';
import { Mic, MicOff } from 'lucide-react';

export default function TypePage() {
    const {
        code, updateCode, setCode,
        config,
        activeTab, setActiveTab,
        projectTitle
    } = useTypeStore();

    const [isMicEnabled, setIsMicEnabled] = useState(false);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const { isRecording, recordingTime, recordedVideoBlob, startRecording, stopRecording, downloadRecording, clearRecording } = useRecording();

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
                className={`flex-1 flex ${layout.flexDirection} ${layout.gap} ${layout.padding} ${config.background === 'codecast-gradient' ? 'bg-gradient-to-br from-blue-600 to-purple-600' : config.background} relative overflow-hidden rounded-xl`}
                style={{
                    aspectRatio: layout.canvasAspectRatio,
                    maxWidth: layout.maxWidth || 'none',
                    maxHeight: layout.maxHeight || 'none',
                    margin: layout.canvasAspectRatio ? 'auto' : undefined,
                }}
            >
                {/* Recording Timer */}
                {isRecording && <RecordingTimer recordingTime={recordingTime} />}

                {/* Project Info Overlay */}
                <ProjectInfoOverlay projectTitle={projectTitle} />

                {/* Editor - Editable in Type Mode */}
                <div
                    className="flex-1 rounded-xl shadow-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md"
                    style={{ order: layout.flexDirection === 'flex-col' ? 2 : 1 }}
                >
                    <TypeTabEditor
                        code={code}
                        config={config}
                        onChange={(newCode) => {
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
                    className="flex-1 rounded-xl shadow-2xl overflow-hidden border border-white/10 bg-white"
                    style={{ order: layout.flexDirection === 'flex-col' ? 1 : 2 }}
                >
                    <PreviewFrame html={code.html} css={code.css} js={code.js} device={config.deviceFrame} scale={1} />
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

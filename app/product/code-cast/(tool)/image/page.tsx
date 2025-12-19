'use client';

import React, { useState } from 'react';
import { useImageStore } from '../../store/useCodeCastStore';
import { TypeTabEditor } from '../../components/TypeTabEditor';
import PreviewFrame from '../../components/PreviewFrame';
import { getCanvasLayout } from '../../utils/layout';
import { ProjectInfoOverlay } from '../../components/ProjectInfoOverlay';
import { Film, Image as ImageIcon, Download } from 'lucide-react';
import { toPng, toJpeg, toSvg } from 'html-to-image';

export default function ImagePage() {
    const {
        code,
        config,
        activeTab, setActiveTab,
        projectTitle
    } = useImageStore();

    const [isExporting, setIsExporting] = useState(false);

    const handleDownload = async (format: 'png' | 'jpg' | 'svg') => {
        const element = document.getElementById('canvas-stage');
        if (!element) return;

        setIsExporting(true);
        try {
            const options = { quality: 0.95, pixelRatio: 2 };
            let dataUrl = '';

            switch (format) {
                case 'png': dataUrl = await toPng(element, options); break;
                case 'jpg': dataUrl = await toJpeg(element, options); break;
                case 'svg': dataUrl = await toSvg(element, options); break;
            }

            const link = document.createElement('a');
            link.download = `codecast-export-${Date.now()}.${format === 'jpg' ? 'jpeg' : format}`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Export failed', err);
        } finally {
            setIsExporting(false);
        }
    };

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
                {/* Project Info Overlay */}
                <ProjectInfoOverlay projectTitle={projectTitle} />

                {/* Editor - Read Only in Image Mode? Usually users tweak code in Type mode then go to Image.
                 But original allowed editing in all modes except Animate (during playback).
                 Let's allow editing here too, similar to Type mode, but focused on visual.
                 Or ReadOnly to force workflow? User said "move tabs to top bar", implies separate modes.
                 Let's keep it editable for convenience unless "Image Mode" specifically means "Preview Only".
                 I'll make it editable.
             */}
                <div
                    className="flex-1 rounded-xl shadow-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md"
                    style={{ order: layout.flexDirection === 'flex-col' ? 2 : 1 }}
                >
                    <TypeTabEditor
                        code={code}
                        config={config}
                        onChange={() => { }} // TODO: Connect to updateCode if editable
                        readOnly={true} // Making read-only for now to distinguish "Type" vs "Image" focus.
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
        </div>
    );
}

'use client';

import React, { useState } from 'react';
import { useImageStore } from '../../store/useCodeCastStore';
import { TypeTabEditor } from '../../components/TypeTabEditor';
import DirectPreview from '../../components/DirectPreview';
import { getCanvasLayout } from '../../utils/layoutHelpers';
import { ProjectTitleDisplay } from '../../components/ProjectTitleDisplay';

export default function ImagePage() {
  const { code, config, activeTab, setActiveTab, projectTitle, updateCode, shadowBlur, shadowSpread } = useImageStore();

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
        <ProjectTitleDisplay />

        {/* Content Wrapper */}
        <div className={`flex-1 flex ${layout.flexDirection} ${layout.gap} w-full min-h-0`}>
          {/* Editor - Read Only in Image Mode? Usually users tweak code in Type mode then go to Image.
                   But original allowed editing in all modes except Animate (during playback).
                   Let's allow editing here too, similar to Type mode, but focused on visual.
                   Or ReadOnly to force workflow? User said "move tabs to top bar", implies separate modes.
                   Let's keep it editable for convenience unless "Image Mode" specifically means "Preview Only".
                   I'll make it editable.
               */}
          <div
            className="flex-1 rounded-xl overflow-hidden bg-black/40 backdrop-blur-md transition-shadow duration-300"
            style={{
              order: layout.flexDirection === 'flex-col' ? 2 : 1,
              boxShadow: `0 20px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, 0.3)`
            }}
          >
            <TypeTabEditor
              code={code}
              config={config}
              onChange={newCode => {
                // Update each tab that changed
                if (newCode.html !== code.html) updateCode('html', newCode.html);
                if (newCode.css !== code.css) updateCode('css', newCode.css);
                if (newCode.js !== code.js) updateCode('js', newCode.js);
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
            <DirectPreview
              html={code.html}
              css={code.css}
              js={code.js}
              device={config.deviceFrame}
              scale={1}
            />
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-0 right-6 flex items-center px-2 py-1 pointer-events-none z-20 opacity-20">
          <span className="text-[10px] font-medium text-white tracking-wide mix-blend-plus-lighter">
            CodeCast by utiltoolkits.com
          </span>
        </div>
      </div>
    </div>
  );
}

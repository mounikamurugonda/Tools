'use client';

import React, { useState } from 'react';
import { useImageStore } from '../../store/useCodeCastStore';
import { CodeCastEditor } from '../../components/CodeCastEditor';
import { CodeCastCanvas } from '../../components/CodeCastCanvas';
import DirectPreview from '../../components/DirectPreview';
import { getCanvasLayout } from '../../utils/layoutHelpers';

export default function ImagePage() {
  const { code, config, activeTab, setActiveTab, projectTitle, updateCode, shadowBlur, shadowSpread } = useImageStore();

  // Get responsive layout configuration based on device frame
  const layout = getCanvasLayout(config.deviceFrame);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Canvas Area - Responsive Layout */}
      <CodeCastCanvas layout={layout} config={config}>
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
        />

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
      </CodeCastCanvas>
    </div>
  );
}

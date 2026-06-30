'use client';

import React, { useState, useMemo } from 'react';
import { useImageStore } from '../../store/useCodeCastStore';
import { CodeCastEditor } from '../../components/CodeCastEditor';
import { CodeCastCanvas } from '../../components/CodeCastCanvas';
import DirectPreview from '../../components/DirectPreview';
import { getCanvasLayout } from '../../utils/layoutHelpers';
import { useMobileDefaultConfig } from '../../hooks/useMobileDefaultConfig';

export default function ImagePage() {
  const {
    code,
    config,
    activeTab,
    setActiveTab,
    updateCode,
    updateConfig,
    shadowBlur,
    shadowSpread,
    showEditor,
    showPreview
  } = useImageStore();

  // Handle Mobile Defaults
  useMobileDefaultConfig(useImageStore);

  // Get responsive layout configuration based on device frame - memoized to update when device changes
  const layout = useMemo(() => getCanvasLayout(config.deviceFrame), [config.deviceFrame]);

  // Determine visibility - ensure at least one is always visible to avoid empty canvas
  const isEditorVisible = showEditor !== false; // Default to true if undefined
  const isPreviewVisible = showPreview !== false; // Default to true if undefined

  // if both are hidden, force editor visible (safeguard)
  const safeEditorVisible = (!isEditorVisible && !isPreviewVisible) ? true : isEditorVisible;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Canvas Area - Responsive Layout */}
      <CodeCastCanvas layout={layout} config={config}>
        {safeEditorVisible && (
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

        )}

        {/* Preview */}
        {isPreviewVisible && (
          <div
            className={`${safeEditorVisible ? 'flex-1' : 'w-full flex-grow'} min-h-0 max-h-full rounded-xl overflow-hidden bg-white transition-shadow duration-300 min-w-0`}
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
              libraries={config.libraries}
            />
          </div>
        )}
      </CodeCastCanvas>
    </div>
  );
}

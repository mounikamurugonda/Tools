'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DeviceFrame } from '../types';
import { transformViewportUnits, getViewportCssProperties } from '../utils/cssViewportTransform';

interface DirectPreviewProps {
  html: string;
  css: string;
  js: string;
  device: DeviceFrame;
  scale?: number;
}

/**
 * DirectPreview renders HTML/CSS/JS directly in a div element instead of an iframe.
 * This allows html-to-image to capture the content properly for image export.
 * Note: JS execution is limited since it runs in the page context.
 */
const DirectPreview: React.FC<DirectPreviewProps> = ({ html, css, js, device, scale = 1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Track container size with ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };

    // Initial size
    updateSize();

    // Observe size changes
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Inject CSS into the document head with a unique scope
  useEffect(() => {
    // Create a scoped style element
    if (!styleRef.current) {
      styleRef.current = document.createElement('style');
      styleRef.current.setAttribute('data-direct-preview', 'true');
      document.head.appendChild(styleRef.current);
    }

    // Transform viewport units to use container-relative custom properties
    const transformedCss = transformViewportUnits(css);

    // Scope the CSS to prevent it from affecting the rest of the page
    const scopedCss = transformedCss
      .split('}')
      .map(rule => {
        if (rule.trim()) {
          // Add the container selector to scope the CSS
          const parts = rule.split('{');
          if (parts.length === 2) {
            const selectors = parts[0]
              .split(',')
              .map(s => {
                const trimmed = s.trim();
                if (trimmed.startsWith('@') || trimmed === '') return trimmed;
                return `[data-preview-content] ${trimmed}`;
              })
              .join(', ');
            return `${selectors}{${parts[1]}`;
          }
        }
        return rule;
      })
      .join('}');

    styleRef.current.textContent = scopedCss;

    return () => {
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
    };
  }, [css]);

  // Execute JS (with caution - runs in page context)
  useEffect(() => {
    if (js && containerRef.current) {
      try {
        // Create a function and execute it with limited scope
        const fn = new Function(js);
        fn();
      } catch (e) {
        console.error('DirectPreview JS error:', e);
      }
    }
  }, [js, html]); // Re-run when html changes as elements may need rebinding

  const getFrameStyles = () => {
    const base =
      'bg-white shadow-xl relative overflow-hidden transition-all duration-500 w-full h-full';

    if (device === 'browser') {
      return `w-full h-full border border-gray-700 rounded-lg bg-white shadow-lg relative flex flex-col`;
    }

    return `${base} rounded-xl`;
  };

  return (
    <div
      className={`w-full h-full flex items-center justify-center transition-all duration-500`}
      style={{ transform: `scale(${scale})` }}
    >
      <div className={getFrameStyles()}>
        {/* Browser Chrome Header (Only for Browser mode) */}
        {device === 'browser' && (
          <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-2 rounded-t-lg shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <div className="ml-4 flex-1 h-5 bg-white rounded border border-gray-200 text-[10px] text-gray-400 flex items-center px-2">
              localhost:3000
            </div>
          </div>
        )}

        {/* Direct DOM render instead of iframe */}
        <div
          ref={containerRef}
          data-preview-content
          className={`w-full h-full bg-white overflow-hidden ${device === 'browser' ? 'rounded-b-lg' : 'rounded-xl'}`}
          style={
            {
              margin: 0,
              padding: 0,
              fontFamily: 'sans-serif',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease-in-out',
              // CSS custom properties for viewport unit transformation
              ...getViewportCssProperties(containerSize.width, containerSize.height),
            } as React.CSSProperties
          }
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Watermark */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-md border border-white/10 pointer-events-none z-50">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[9px] font-medium text-white/90 tracking-wide">
            CodeCast by utiltoolkits.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default DirectPreview;

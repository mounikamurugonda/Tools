'use client';

import React, { useMemo } from 'react';
import { DeviceFrame } from '../types';

interface DirectPreviewProps {
  html: string;
  css: string;
  js: string;
  device: DeviceFrame;
  scale?: number;
  libraries?: string[];
}

/**
 * DirectPreview now uses an iframe to isolate user code and external libraries
 * from the main application to prevent style pollution.
 */
const DirectPreview: React.FC<DirectPreviewProps> = ({ html, css, js, device, scale = 1, libraries = [] }) => {

  const srcDoc = useMemo(() => {
    // Construct the library tags
    const libTags = libraries.map(lib => {
      if (lib === 'bootstrap') {
        return `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" data-preview-lib="bootstrap">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>`;
      }
      if (lib === 'tailwind') {
        return `<script src="https://cdn.tailwindcss.com"></script>
                <script>
                  tailwind.config = {
                    corePlugins: {
                      preflight: true, // We want preflight inside the iframe
                    }
                  }
                </script>`;
      }
      return '';
    }).join('\n');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${libTags}
          <style>
            body { margin: 0; padding: 0; }
            /* User CSS */
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>
            try {
              ${js}
            } catch (err) {
              console.error('Preview JS Error:', err);
            }
          </script>
        </body>
      </html>
    `;
  }, [html, css, js, libraries]);

  const getFrameStyles = () => {
    const base = 'bg-white shadow-xl relative overflow-hidden transition-all duration-500 w-full h-full';

    if (device === 'browser') {
      return `w-full h-full rounded-lg bg-white shadow-lg relative flex flex-col`;
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

        {/* Iframe for Isolation */}
        <div className={`w-full h-full bg-white overflow-hidden ${device === 'browser' ? 'rounded-b-lg' : 'rounded-xl'}`}>
          <iframe
            srcDoc={srcDoc}
            title="Code Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-modals allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default DirectPreview;

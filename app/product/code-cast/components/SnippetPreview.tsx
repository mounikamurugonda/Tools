
import React, { useMemo } from 'react';

interface SnippetPreviewProps {
  html?: string;
  css?: string;
  js?: string;
  zoom?: number;
}

export const SnippetPreview: React.FC<SnippetPreviewProps> = ({ html = '', css = '', js = '', zoom = 0.5 }) => {

  const srcDoc = useMemo(() => `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              overflow: hidden; 
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background-color: transparent; 
            }
            #preview-root {
              width: 100%;
              transform: scale(${zoom});
              transform-origin: center center;
            }
            /* User CSS */
            ${css}
          </style>
        </head>
        <body>
          <div id="preview-root">
            ${html}
          </div>
          <script>
            // Basic error suppression
            window.onerror = function() { return true; };
            /* ${js} */
          </script>
        </body>
      </html>
  `, [html, css, js, zoom]);

  return (
    <iframe
      className="w-full h-full border-0 pointer-events-none select-none"
      sandbox="allow-scripts"
      srcDoc={srcDoc}
      title="Snippet Preview"
    />
  );
};

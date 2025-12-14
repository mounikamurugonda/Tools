
import React, { useMemo, useRef, useEffect } from 'react';
import { DeviceFrame } from '../types';

interface PreviewFrameProps {
  html: string;
  css: string;
  js: string;
  device: DeviceFrame;
  scale?: number;
}

const PreviewFrame: React.FC<PreviewFrameProps> = ({ html, css, js, device, scale = 1 }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Use a static srcDoc to initialize the iframe once.
  const srcDoc = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            /* Reset & Defaults */
            * { box-sizing: border-box; }
            body { margin: 0; padding: 0; font-family: sans-serif; overflow-x: hidden; }
          </style>
          <style id="preview-css"></style>
        </head>
        <body>
          <div id="preview-root"></div>
          <script>
            window.addEventListener('message', (event) => {
              const { html, css, js } = event.data;
              
              // Update CSS
              if (css !== undefined) {
                const style = document.getElementById('preview-css');
                if (style) style.textContent = css;
              }

              // Update HTML
              if (html !== undefined) {
                const root = document.getElementById('preview-root');
                if (root) root.innerHTML = html;
              }

              // Update JS
              if (js) {
                const oldScript = document.getElementById('dynamic-js');
                if (oldScript) oldScript.remove();

                const script = document.createElement('script');
                script.id = 'dynamic-js';
                script.text = 'try {' + js + '} catch (e) { console.error(e); }';
                document.body.appendChild(script);
              }
            });
          </script>
        </body>
      </html>
    `;
  }, []);

  // Send updates to the iframe whenever props change
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ html, css, js }, '*');
    }
  }, [html, css, js]);

  const handleLoad = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ html, css, js }, '*');
    }
  };

  // The PreviewFrame now just fills the parent container.
  // The Parent (Canvas) determines the overall aspect ratio.
  const getFrameStyles = () => {
    const base = 'bg-white shadow-xl relative overflow-hidden transition-all duration-500 w-full h-full';
    
    if (device === 'browser') {
      return `w-full h-full border border-gray-700 rounded-lg bg-white shadow-lg relative flex flex-col`;
    }

    // For mobile/minimal/social, we just return a clean rounded container that fills the split pane.
    return `${base} rounded-xl`;
  };

  return (
    <div className={`w-full h-full flex items-center justify-center transition-all duration-500`} style={{ transform: `scale(${scale})` }}>
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

        <iframe
          ref={iframeRef}
          title="preview"
          srcDoc={srcDoc}
          className={`w-full h-full bg-white ${device === 'browser' ? 'rounded-b-lg' : 'rounded-xl'}`}
          sandbox="allow-scripts"
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
};

export default PreviewFrame;

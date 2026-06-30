import React, { useMemo, useRef, useEffect } from 'react';
import { DeviceFrame } from '../types';
import { glassContainerStyles } from '../glassTheme';

interface PreviewFrameProps {
  html: string;
  css: string;
  js: string;
  device: DeviceFrame;
  scale?: number;
  libraries?: string[];
  isGlassStyle?: boolean;
}

const getLibraryTags = (libraries: string[]) => {
  return libraries.map(lib => {
    if (lib === 'bootstrap') {
      return `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" data-preview-lib="bootstrap">
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
              <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>`;
    }
    if (lib === 'tailwind') {
      return `<script src="https://cdn.tailwindcss.com"></script>
              <script>
                tailwind.config = {
                  corePlugins: {
                    preflight: true,
                  }
                }
              </script>`;
    }
    return '';
  }).join('\n');
};

const PreviewFrame: React.FC<PreviewFrameProps> = ({ html, css, js, device, scale = 1, libraries = [], isGlassStyle = false }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastUpdateRef = useRef(0); // For throttling updates

  // Use a static srcDoc to initialize the iframe once.
  const srcDoc = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          ${getLibraryTags(libraries)}
          <style>
            /* Reset & Defaults */
            // html { background: transparent !important; }
            body { 
              margin: 0; 
              padding: 0px; 
              font-family: sans-serif; 
              overflow-x: hidden; 
              transition: all 0.3s ease-in-out; 
              background-color: ${isGlassStyle ? 'transparent' : 'white'} !important; 
              color: ${isGlassStyle ? 'white' : 'inherit'} !important; 
              min-height: 100vh; 
            }
            
            /* Custom Scrollbar for Glass Mode */
            ${isGlassStyle ? `
              ::-webkit-scrollbar {
                width: 6px;
                height: 6px;
              }
              ::-webkit-scrollbar-track {
                background: transparent;
              }
              ::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.15);
                border-radius: 10px;
                transition: background 0.2s;
              }
              ::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.3);
              }
              ::-webkit-scrollbar-corner {
                background: transparent;
              }
            ` : ''}
          </style>
          <style id="preview-css"></style>
        </head>
        <body>
          <div id="preview-root"></div>
          <script>
            document.addEventListener('click', (e) => {
              const link = e.target.closest('a');
              if (link) {
                const href = link.getAttribute('href');
                
                if (!href || href === '#') {
                  e.preventDefault();
                } else if (href.startsWith('#')) {
                  // Manually handle hash navigation to ensure it works in iframe/srcDoc
                  const targetId = href.substring(1);
                  const target = document.getElementById(targetId);
                  if (target) {
                     e.preventDefault();
                     target.scrollIntoView({ behavior: 'smooth' });
                     // Optional: update hash without triggering reload/jump if needed
                     // history.replaceState(null, null, href); 
                  }
                }
              }
            });

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
  }, [libraries, isGlassStyle]);

  // Send updates to the iframe whenever props change (Throttled)
  useEffect(() => {
    const now = Date.now();
    const timeSinceLast = now - lastUpdateRef.current;

    const update = () => {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ html, css, js }, '*');
        lastUpdateRef.current = Date.now();
      }
    };

    if (timeSinceLast >= 300) {
      update();
    } else {
      const timeoutId = setTimeout(update, 300 - timeSinceLast);
      return () => clearTimeout(timeoutId);
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
    // Base container style
    const base = 'shadow-xl relative overflow-hidden transition-all duration-500 w-full h-full rounded-xl flex flex-col';

    // Add specific glass/shadow effects
    return `${base} ${isGlassStyle ? glassContainerStyles : 'bg-transparent shadow-lg'}`;
  };

  return (
    <div
      className={`w-full h-full flex items-center justify-center transition-all duration-500`}
      style={{ transform: `scale(${scale})` }}
    >
      <div className={getFrameStyles()}>


        <iframe
          ref={iframeRef}
          title="preview"
          srcDoc={srcDoc}
          className={`flex-1 w-full h-full border-0`}
          style={{ backgroundColor: 'transparent' }}
          sandbox="allow-scripts"
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
};

export default PreviewFrame;

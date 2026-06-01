'use client';

import React, { useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { Code, Image as ImageIcon, Copy } from 'lucide-react';

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`;

type Mode = 'optimized' | 'encoded' | 'base64';

const formatBytes = (n: number): string => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
};

// Minimal-encode for CSS use — only the chars that break in url() context.
const cssOptimized = (svg: string): string => {
  // Strip newlines/tabs first to shrink payload, collapse whitespace between tags.
  const collapsed = svg.replace(/[\n\r\t]+/g, ' ').replace(/>\s+</g, '><').trim();
  return collapsed
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E');
};

const SvgToDataUri: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [input, setInput] = useState(DEFAULT_SVG);
  const [mode, setMode] = useState<Mode>('optimized');
  const [error, setError] = useState('');

  const dataUri = useMemo(() => {
    setError('');
    if (!input.trim()) return '';
    try {
      if (mode === 'base64') {
        // Unicode-safe base64
        const bytes = new TextEncoder().encode(input);
        let bin = '';
        bytes.forEach(b => (bin += String.fromCharCode(b)));
        return `data:image/svg+xml;base64,${btoa(bin)}`;
      }
      if (mode === 'optimized') {
        return `data:image/svg+xml;charset=UTF-8,${cssOptimized(input)}`;
      }
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(input)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encoding failed');
      return '';
    }
  }, [input, mode]);

  const inputBytes = useMemo(() => new TextEncoder().encode(input).length, [input]);
  const outputBytes = dataUri.length;
  const delta = inputBytes ? ((outputBytes - inputBytes) / inputBytes) * 100 : 0;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  const handleFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('SVG too large (max 5 MB)');
      return;
    }
    const text = await file.text();
    setInput(text);
    toast.success(`Loaded ${file.name}`);
  };

  return (
    <ToolContainer title="SVG to Data URI" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card title="Input SVG">
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Code className="w-4 h-4" /> SVG Code
              </Label>
              <TextArea
                value={input}
                onChange={e => setInput(e.target.value)}
                className="min-h-[220px] font-mono text-xs leading-relaxed"
                placeholder="Paste SVG code here..."
                aria-label="SVG input"
              />
              <FileUpload
                accept=".svg,image/svg+xml"
                maxSizeMB={5}
                onFileSelect={handleFile}
                onError={msg => toast.error(msg)}
                label="Or upload an .svg file"
              />
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Input: {formatBytes(inputBytes)}</span>
                <button
                  onClick={() => setInput(DEFAULT_SVG)}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Reset sample
                </button>
              </div>
            </div>
          </Card>

          <Card title="Encoding">
            <div
              className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1"
              role="radiogroup"
              aria-label="Encoding mode"
            >
              {(
                [
                  { id: 'optimized', label: 'Optimized (CSS)' },
                  { id: 'encoded', label: 'URL-encoded' },
                  { id: 'base64', label: 'Base64' },
                ] as const
              ).map(o => (
                <button
                  key={o.id}
                  role="radio"
                  aria-checked={mode === o.id}
                  onClick={() => setMode(o.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                    mode === o.id
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {mode === 'optimized' &&
                'Smallest output for CSS url() — only escapes characters that would break.'}
              {mode === 'encoded' && 'Standard encodeURIComponent — safe everywhere.'}
              {mode === 'base64' && 'Base64-encoded — opaque but the largest of the three.'}
            </p>
          </Card>
        </div>

        <div className="space-y-6">
          {error && (
            <div
              role="alert"
              className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm"
            >
              {error}
            </div>
          )}

          {dataUri && (
            <>
              <Card title="Result">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      Output: {formatBytes(outputBytes)}{' '}
                      <span
                        className={
                          delta > 0
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-green-600 dark:text-green-400'
                        }
                      >
                        ({delta > 0 ? '+' : ''}
                        {delta.toFixed(1)}%)
                      </span>
                    </span>
                  </div>
                  <TextArea
                    readOnly
                    value={dataUri}
                    className="w-full h-32 bg-gray-50 dark:bg-gray-900/50 break-all font-mono text-xs"
                    aria-label="Data URI output"
                  />
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="primary" onClick={() => copy(dataUri, 'data URI')}>
                      <Copy className="w-4 h-4 mr-1.5" /> Copy URI
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => copy(`background-image: url("${dataUri}");`, 'CSS background')}
                    >
                      <Copy className="w-4 h-4 mr-1.5" /> Copy CSS
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => copy(`<img src="${dataUri}" alt="" />`, '<img> tag')}
                    >
                      <Copy className="w-4 h-4 mr-1.5" /> Copy &lt;img&gt;
                    </Button>
                  </div>
                </div>
              </Card>

              <Card title="Preview">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> CSS Background
                  </Label>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
                    <div
                      className="w-full h-32 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 shadow-sm"
                      style={{
                        backgroundImage: `url("${dataUri}")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      }}
                    ></div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {!dataUri && !error && (
            <Card className="h-full flex items-center justify-center text-center text-gray-400 dark:text-gray-500 min-h-[300px]">
              <div>
                <ImageIcon className="w-16 h-16 mb-4 opacity-50 mx-auto" />
                <p>Paste or upload SVG to see the data URI</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </ToolContainer>
  );
};

export default SvgToDataUri;

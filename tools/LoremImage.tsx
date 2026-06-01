'use client';

import React, { useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { useToast } from '@/components/ui/ToastProvider';
import { RefreshCw, Copy, Download } from 'lucide-react';

const SIZE_PRESETS = [
  { w: 800, h: 600, l: '4:3 (800×600)' },
  { w: 1280, h: 720, l: '16:9 (1280×720)' },
  { w: 1080, h: 1080, l: 'Square (1080)' },
  { w: 1080, h: 1350, l: 'Portrait (1080×1350)' },
  { w: 1080, h: 1920, l: 'Story (1080×1920)' },
  { w: 600, h: 400, l: 'Card (600×400)' },
];

const LoremImage: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [grayscale, setGrayscale] = useState(false);
  const [blur, setBlur] = useState(0);
  const [useSeed, setUseSeed] = useState(false);
  const [seedText, setSeedText] = useState('cat');
  const [randomKey, setRandomKey] = useState(() => Date.now());

  const url = useMemo(() => {
    const base = useSeed
      ? `https://picsum.photos/seed/${encodeURIComponent(seedText || 'seed')}/${width}/${height}`
      : `https://picsum.photos/${width}/${height}?random=${randomKey}`;
    const params: string[] = [];
    if (grayscale) params.push('grayscale');
    if (blur > 0) params.push(`blur=${blur}`);
    if (!params.length) return base;
    return base + (base.includes('?') ? '&' : '?') + params.join('&');
  }, [width, height, grayscale, blur, useSeed, seedText, randomKey]);

  const htmlSnippet = `<img src="${url}" alt="placeholder" width="${width}" height="${height}" />`;
  const mdSnippet = `![placeholder](${url})`;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  const download = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `placeholder-${width}x${height}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      toast.success('Downloaded');
    } catch {
      toast.error('Download failed');
    }
  };

  return (
    <ToolContainer title="Placeholder Image Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card title="Settings">
            <div className="space-y-5">
              <Slider
                label="Width"
                min={100}
                max={1920}
                step={10}
                value={width}
                onChange={e => setWidth(Number(e.target.value))}
                valueDisplay={`${width}px`}
              />
              <Slider
                label="Height"
                min={100}
                max={1920}
                step={10}
                value={height}
                onChange={e => setHeight(Number(e.target.value))}
                valueDisplay={`${height}px`}
              />
              <Slider
                label="Blur"
                min={0}
                max={10}
                value={blur}
                onChange={e => setBlur(Number(e.target.value))}
                valueDisplay={`${blur}`}
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={grayscale}
                  onChange={e => setGrayscale(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  id="grayscale-check"
                />
                <Label htmlFor="grayscale-check" className="mb-0">
                  Grayscale
                </Label>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={useSeed}
                    onChange={e => setUseSeed(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    id="seed-check"
                  />
                  <Label htmlFor="seed-check" className="mb-0">
                    Deterministic seed
                  </Label>
                </div>
                {useSeed && (
                  <Input
                    value={seedText}
                    onChange={e => setSeedText(e.target.value)}
                    placeholder="e.g. cat, beach, abstract"
                    className="font-mono"
                  />
                )}
              </div>

              <Button onClick={() => setRandomKey(Date.now())} variant="primary" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" /> New Random Image
              </Button>
            </div>
          </Card>

          <Card title="Size presets">
            <div className="flex flex-wrap gap-2">
              {SIZE_PRESETS.map(p => (
                <button
                  key={p.l}
                  onClick={() => {
                    setWidth(p.w);
                    setHeight(p.h);
                  }}
                  className="px-2.5 py-1 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-400"
                >
                  {p.l}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card
            title="Preview"
            className="h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <img
              key={url}
              src={url}
              alt="placeholder"
              className="max-w-full max-h-full object-contain shadow-sm"
            />
          </Card>

          <Card title="Snippets">
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">URL</Label>
                <div className="flex gap-2">
                  <Input readOnly value={url} className="font-mono text-xs" />
                  <Button variant="secondary" onClick={() => copy(url, 'URL')}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">HTML</Label>
                <div className="flex gap-2">
                  <Input readOnly value={htmlSnippet} className="font-mono text-xs" />
                  <Button variant="secondary" onClick={() => copy(htmlSnippet, 'HTML')}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Markdown</Label>
                <div className="flex gap-2">
                  <Input readOnly value={mdSnippet} className="font-mono text-xs" />
                  <Button variant="secondary" onClick={() => copy(mdSnippet, 'Markdown')}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="primary" onClick={download}>
                  <Download className="w-4 h-4 mr-1.5" /> Download Image
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default LoremImage;

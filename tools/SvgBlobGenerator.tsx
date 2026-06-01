'use client';

import React, { useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { useToast } from '@/components/ui/ToastProvider';
import { Dices, Copy, Download } from 'lucide-react';

// Seeded PRNG so the same seed produces the same blob.
const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const generateBlobPath = (
  size: number,
  complexity: number,
  contrast: number,
  seed: number
): string => {
  const rand = mulberry32(seed);
  const count = Math.max(3, Math.round(complexity));
  const center = size / 2;
  const r = size / 2 - 10;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const factor = 1 - rand() * contrast * 0.6;
    points.push({
      x: center + Math.cos(angle) * r * factor,
      y: center + Math.sin(angle) * r * factor,
    });
  }
  // Closed Catmull-Rom-like curve via midpoint quadratics
  const first = points[0];
  const last = points[count - 1];
  let d = `M ${((first.x + last.x) / 2).toFixed(2)} ${((first.y + last.y) / 2).toFixed(2)}`;
  for (let i = 0; i < count; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % count];
    d += ` Q ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} ${((p1.x + p2.x) / 2).toFixed(2)} ${(
      (p1.y + p2.y) /
      2
    ).toFixed(2)}`;
  }
  return d + ' Z';
};

const COLOR_PRESETS = [
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#f97316',
  '#10b981',
  '#facc15',
  '#06b6d4',
  '#111827',
];

const SvgBlobGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [complexity, setComplexity] = useState(7);
  const [contrast, setContrast] = useState(0.5);
  const [color, setColor] = useState('#3b82f6');
  const [gradient, setGradient] = useState(false);
  const [color2, setColor2] = useState('#8b5cf6');
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 1e9));

  const path = useMemo(
    () => generateBlobPath(400, complexity, contrast, seed),
    [complexity, contrast, seed]
  );

  const svgString = useMemo(() => {
    if (gradient) {
      return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
  </defs>
  <path fill="url(#g)" d="${path}" />
</svg>`;
    }
    return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <path fill="${color}" d="${path}" />
</svg>`;
  }, [path, color, color2, gradient]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  const copyDataUri = () => {
    const uri = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
    copy(uri, 'data URI');
  };

  const copyCssBg = () => {
    const uri = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
    copy(`background-image: url("${uri}");`, 'CSS background');
  };

  const downloadSvg = () => {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blob-${seed}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success('Saved blob.svg');
  };

  const randomize = () => setSeed(Math.floor(Math.random() * 1e9));

  return (
    <ToolContainer title="SVG Blob Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <Card title="Settings">
            <div className="space-y-5">
              <Slider
                label="Complexity"
                min={3}
                max={20}
                value={complexity}
                onChange={e => setComplexity(Number(e.target.value))}
                valueDisplay={`${complexity}`}
              />
              <Slider
                label="Uniqueness"
                min={0}
                max={1}
                step={0.1}
                value={contrast}
                onChange={e => setContrast(Number(e.target.value))}
                valueDisplay={contrast.toFixed(1)}
              />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Color</Label>
                  <label className="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={gradient}
                      onChange={e => setGradient(e.target.checked)}
                    />
                    Gradient
                  </label>
                </div>
                <div className="flex gap-3">
                  <Input
                    type="color"
                    value={color}
                    onChange={e => setColor(e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={color}
                    onChange={e => setColor(e.target.value)}
                    className="flex-1 font-mono"
                  />
                </div>
                <div className="flex gap-1.5 mt-2">
                  {COLOR_PRESETS.map(c => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      aria-label={`Use ${c}`}
                      className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-700"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                {gradient && (
                  <div className="mt-3">
                    <Label className="text-xs text-gray-500 mb-1 block">Gradient end</Label>
                    <div className="flex gap-3">
                      <Input
                        type="color"
                        value={color2}
                        onChange={e => setColor2(e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={color2}
                        onChange={e => setColor2(e.target.value)}
                        className="flex-1 font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Seed</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={seed}
                    onChange={e => setSeed(Number(e.target.value))}
                    className="flex-1 font-mono"
                  />
                  <Button onClick={randomize} variant="secondary">
                    <Dices className="w-4 h-4 mr-1.5" /> Randomize
                  </Button>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Same seed = same blob.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Preview">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center p-4 h-80 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#888 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              ></div>
              <div
                className="w-64 h-64 drop-shadow-xl"
                dangerouslySetInnerHTML={{ __html: svgString }}
              />
            </div>
          </Card>

          <Card title="SVG Code">
            <div className="space-y-3">
              <TextArea
                readOnly
                value={svgString}
                className="w-full h-32 font-mono text-xs resize-none"
                aria-label="SVG output"
              />
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" onClick={() => copy(svgString, 'SVG')}>
                  <Copy className="w-4 h-4 mr-1.5" /> Copy SVG
                </Button>
                <Button variant="secondary" onClick={copyDataUri}>
                  <Copy className="w-4 h-4 mr-1.5" /> Copy Data URI
                </Button>
                <Button variant="secondary" onClick={copyCssBg}>
                  <Copy className="w-4 h-4 mr-1.5" /> Copy CSS
                </Button>
                <Button variant="secondary" onClick={downloadSvg}>
                  <Download className="w-4 h-4 mr-1.5" /> Download
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default SvgBlobGenerator;

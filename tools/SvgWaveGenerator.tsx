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
import { Waves, Zap, Copy, Download } from 'lucide-react';

const WIDTH = 1440;
const HEIGHT = 320;

const generateWavePath = (
  layerIndex: number,
  complexity: number,
  amplitude: number,
  seed: number,
  flip: boolean
): string => {
  const step = WIDTH / complexity;
  const baseY = HEIGHT / 2 + layerIndex * 25;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= complexity; i++) {
    const x = i * step;
    const y = baseY + Math.sin((i + seed + layerIndex * 1.3) * 1.5) * amplitude;
    points.push({ x, y: flip ? HEIGHT - y : y });
  }
  let d = `M0,${flip ? 0 : HEIGHT}`;
  d += ` L${points[0].x},${points[0].y.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    d += ` Q${p1.x},${p1.y.toFixed(2)} ${midX},${midY.toFixed(2)} T${p2.x},${p2.y.toFixed(2)}`;
  }
  d += ` L${WIDTH},${flip ? 0 : HEIGHT} L0,${flip ? 0 : HEIGHT} Z`;
  return d;
};

const SvgWaveGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [layers, setLayers] = useState(3);
  const [complexity, setComplexity] = useState(5);
  const [amplitude, setAmplitude] = useState(50);
  const [color, setColor] = useState('#3b82f6');
  const [flip, setFlip] = useState(false);
  const [seed, setSeed] = useState(1);

  const paths = useMemo(() => {
    const arr: { d: string; opacity: number }[] = [];
    for (let i = 0; i < layers; i++) {
      arr.push({
        d: generateWavePath(i, complexity, amplitude, seed, flip),
        opacity: Math.max(0.2, 1 - i * 0.2),
      });
    }
    return arr;
  }, [layers, complexity, amplitude, seed, flip]);

  const svgString = useMemo(
    () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}">
${paths.map(p => `  <path fill="${color}" fill-opacity="${p.opacity}" d="${p.d}" />`).join('\n')}
</svg>`,
    [paths, color]
  );

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  const downloadSvg = () => {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wave-${seed}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success('Saved wave.svg');
  };

  return (
    <ToolContainer title="SVG Wave Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Preview" className="overflow-hidden p-0">
          <div className="h-64 bg-gray-100 dark:bg-gray-800 flex items-end relative w-full">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600 pointer-events-none">
              <Waves className="w-12 h-12 opacity-20" />
            </div>
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-full relative z-10">
              {paths.map((p, i) => (
                <path key={i} fill={color} fillOpacity={p.opacity} d={p.d} />
              ))}
            </svg>
          </div>
        </Card>

        <Card title="Controls">
          <div className="grid md:grid-cols-3 gap-6">
            <Slider
              label="Layers"
              min={1}
              max={5}
              value={layers}
              onChange={e => setLayers(Number(e.target.value))}
              valueDisplay={`${layers}`}
            />
            <Slider
              label="Complexity"
              min={2}
              max={20}
              value={complexity}
              onChange={e => setComplexity(Number(e.target.value))}
              valueDisplay={`${complexity}`}
            />
            <Slider
              label="Amplitude"
              min={10}
              max={140}
              value={amplitude}
              onChange={e => setAmplitude(Number(e.target.value))}
              valueDisplay={`${amplitude}px`}
            />
            <div>
              <Label className="mb-2 block">Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="w-10 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Orientation</Label>
              <div
                className="inline-flex rounded-md bg-gray-100 dark:bg-gray-800 p-0.5"
                role="radiogroup"
              >
                <button
                  role="radio"
                  aria-checked={!flip}
                  onClick={() => setFlip(false)}
                  className={`px-3 py-1.5 text-sm rounded ${
                    !flip ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Bottom
                </button>
                <button
                  role="radio"
                  aria-checked={flip}
                  onClick={() => setFlip(true)}
                  className={`px-3 py-1.5 text-sm rounded ${
                    flip ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Top
                </button>
              </div>
            </div>
            <div className="flex items-end">
              <Button
                onClick={() => setSeed(Math.random() * 100)}
                className="w-full"
                variant="secondary"
              >
                <Zap className="w-4 h-4 mr-2" /> Regenerate
              </Button>
            </div>
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
              <Button
                variant="secondary"
                onClick={() =>
                  copy(
                    `background-image: url("data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}");`,
                    'CSS background'
                  )
                }
              >
                <Copy className="w-4 h-4 mr-1.5" /> Copy CSS
              </Button>
              <Button variant="secondary" onClick={downloadSvg}>
                <Download className="w-4 h-4 mr-1.5" /> Download
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default SvgWaveGenerator;

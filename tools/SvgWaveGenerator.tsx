'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { Waves, Zap } from 'lucide-react';

const SvgWaveGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [layers, setLayers] = useState(3);
  const [complexity, setComplexity] = useState(5);
  const [color, setColor] = useState('#3b82f6');
  const [seed, setSeed] = useState(1);

  const generateWavePath = (offset: number) => {
    const width = 1440;
    const height = 320;
    let d = `M0,${height}`;

    const step = width / complexity;

    for (let i = 0; i <= complexity; i++) {
      const x = i * step;
      // Simple pseudo-random using sin for demo stability
      const y = Math.sin((i + seed + offset) * 1.5) * 50 + 150 + offset * 30;

      // Use quadratic curves for smooth wave
      if (i === 0) d += ` L${x},${y}`;
      else {
        const prevX = (i - 1) * step;
        const prevY =
          Math.sin((i - 1 + seed + offset) * 1.5) * 50 + 150 + offset * 30;
        const midX = (prevX + x) / 2;
        const midY = (prevY + y) / 2;
        d += ` Q${prevX},${prevY} ${midX},${midY} T${x},${y}`;
      }
    }

    d += ` L${width},${height} L0,${height} Z`;
    return d;
  };

  const svgs = useMemo(() => {
    const paths = [];
    for (let i = 0; i < layers; i++) {
      paths.push(
        <path
          key={i}
          fill={color}
          fillOpacity={1 - i * 0.2}
          d={generateWavePath(i)}
        />,
      );
    }
    return paths;
  }, [layers, complexity, color, seed]);

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  ${svgs.map((p) => `<path fill="${p.props.fill}" fill-opacity="${p.props.fillOpacity}" d="${p.props.d}" />`).join('\n  ')}
</svg>`;

  return (
    <ToolContainer title="SVG Wave Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Preview" className="overflow-hidden p-0">
          <div className="h-64 bg-gray-100 dark:bg-gray-800 flex items-end relative w-full">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600 pointer-events-none">
              <Waves className="w-12 h-12 opacity-20" />
            </div>
            <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d relative z-10">
              {svgs}
            </svg>
          </div>
        </Card>

        <Card title="Controls">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <Slider
                label="Layers"
                min={1}
                max={5}
                value={layers}
                onChange={(e) => setLayers(Number(e.target.value))}
                valueDisplay={`${layers}`}
              />
            </div>
            <div>
              <Slider
                label="Complexity"
                min={2}
                max={20}
                value={complexity}
                onChange={(e) => setComplexity(Number(e.target.value))}
                valueDisplay={`${complexity}`}
              />
            </div>
            <div>
              <Label className="mb-2 block">Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 font-mono"
                />
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
          <div className="relative">
            <TextArea
              readOnly
              value={svgString}
              className="w-full h-32 font-mono text-xs resize-none"
            />
            <div className="absolute top-2 right-2">
              <CopyButton textToCopy={svgString} />
            </div>
          </div>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default SvgWaveGenerator;

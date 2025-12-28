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
import { Dices, RefreshCw } from 'lucide-react';

// Simple blob generation logic
const generateBlobPath = (size: number, complexity: number, contrast: number) => {
  // This is a simplified approximation for the sake of the example without external libs.
  // Real "blobs" use spline interpolation.
  // Here we will generate a random path string for demonstration.
  // In a production app, a library like `blobs` or spline algorithm is recommended.
  // For this lightweight version, we'll create a rough polygon smoothed by CSS or simple curves.

  const count = Math.max(3, Math.round(complexity));
  const points = [];
  const center = size / 2;
  const r = size / 2;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const random = 1 - Math.random() * contrast * 0.5; // Random radius factor
    const x = center + Math.cos(angle) * r * random;
    const y = center + Math.sin(angle) * r * random;
    points.push({ x, y });
  }

  // Build path with quadratic bezier curves for smoothness
  let d = `M ${(points[0].x + points[points.length - 1].x) / 2} ${(points[0].y + points[points.length - 1].y) / 2}`;
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    d += ` Q ${p1.x} ${p1.y} ${(p1.x + p2.x) / 2} ${(p1.y + p2.y) / 2}`;
  }
  d += ' Z';

  return d;
};

const SvgBlobGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [complexity, setComplexity] = useState(7);
  const [contrast, setContrast] = useState(0.5);
  const [color, setColor] = useState('#3b82f6');
  const [seed, setSeed] = useState(Date.now());

  const path = useMemo(
    () => generateBlobPath(400, complexity, contrast),
    [complexity, contrast, seed]
  );

  const svgString = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <path fill="${color}" d="${path}" />
</svg>`;

  return (
    <ToolContainer title="SVG Blob Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <Card title="Settings">
            <div className="space-y-6">
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
                valueDisplay={`${contrast}`}
              />
              <div>
                <Label className="mb-2 block">Color</Label>
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
              </div>

              <Button onClick={() => setSeed(Date.now())} variant="secondary" className="w-full">
                <Dices className="w-4 h-4 mr-2" /> Randomize
              </Button>
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
              <svg
                viewBox="0 0 400 400"
                className="w-64 h-64 transition-all duration-300 drop-shadow-xl"
              >
                <path fill={color} d={path} />
              </svg>
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
      </div>
    </ToolContainer>
  );
};

export default SvgBlobGenerator;

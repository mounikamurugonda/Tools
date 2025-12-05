'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

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
      <div className="space-y-8">
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-end border border-gray-200 dark:border-gray-700">
          <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d">
            {svgs}
          </svg>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Layers</label>
            <input
              type="range"
              min="1"
              max="5"
              value={layers}
              onChange={(e) => setLayers(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Complexity</label>
            <input
              type="range"
              min="2"
              max="20"
              value={complexity}
              onChange={(e) => setComplexity(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Randomize</label>
            <button
              onClick={() => setSeed(Math.random() * 100)}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Regenerate
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            readOnly
            value={svgString}
            className="w-full h-32 brand-input font-mono text-xs"
          />
          <CopyButton
            textToCopy={svgString}
            className="absolute top-2 right-2"
          />
        </div>
      </div>
    </ToolContainer>
  );
};

export default SvgWaveGenerator;

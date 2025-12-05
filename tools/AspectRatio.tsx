'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const AspectRatio: React.FC<ToolProps> = ({ details, toolId }) => {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [ratio, setRatio] = useState('16:9');

  useEffect(() => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const common = gcd(width, height);
    setRatio(`${width / common}:${height / common}`);
  }, [width, height]);

  return (
    <ToolContainer
      title="Aspect Ratio Calculator"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-8 max-w-lg mx-auto text-center">
        <div className="flex items-center justify-center gap-4 text-4xl font-bold text-blue-600 dark:text-blue-400">
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-32 text-center bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none"
          />
          <span>:</span>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-32 text-center bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <p className="text-gray-500 uppercase tracking-wide text-sm font-semibold">
            Aspect Ratio
          </p>
          <p className="text-5xl font-bold mt-2">{ratio}</p>
        </div>

        <div className="flex justify-center gap-2">
          {[
            { w: 1920, h: 1080, l: 'HD' },
            { w: 1080, h: 1080, l: 'Square' },
            { w: 1080, h: 1350, l: 'Instagram' },
            { w: 1080, h: 1920, l: 'Story' },
          ].map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setWidth(p.w);
                setHeight(p.h);
              }}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-blue-100 text-sm"
            >
              {p.l}
            </button>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
};

export default AspectRatio;

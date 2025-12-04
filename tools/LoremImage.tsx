
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const LoremImage: React.FC<ToolProps> = ({ details, toolId }) => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [grayscale, setGrayscale] = useState(false);
  const [blur, setBlur] = useState(0);
  const [seed, setSeed] = useState(Date.now());

  let url = `https://picsum.photos/${width}/${height}?random=${seed}`;
  if (grayscale) url += '&grayscale';
  if (blur > 0) url += `&blur=${blur}`;

  return (
    <ToolContainer title="Placeholder Image Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-1">Width: {width}px</label>
                <input type="range" min="100" max="1920" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Height: {height}px</label>
                <input type="range" min="100" max="1080" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full" />
            </div>
            
            <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={grayscale} onChange={e => setGrayscale(e.target.checked)} className="rounded" />
                <span>Grayscale</span>
            </label>

            <div>
                <label className="block text-sm font-medium mb-1">Blur: {blur}</label>
                <input type="range" min="0" max="10" value={blur} onChange={e => setBlur(Number(e.target.value))} className="w-full" />
            </div>

            <button onClick={() => setSeed(Date.now())} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">New Random Image</button>
        </div>

        <div className="md:col-span-2 space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex items-center justify-center h-[400px]">
                <img src={url} alt="Lorem Picsum" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="relative">
                <input readOnly value={url} className="brand-input pr-12" />
                <CopyButton textToCopy={url} className="absolute top-1 right-1" />
            </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default LoremImage;

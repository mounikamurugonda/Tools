'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const ContrastChecker: React.FC<ToolProps> = ({ details, toolId }) => {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#FFFFFF');

  const getLuminance = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum1 = getLuminance(foreground);
  const lum2 = getLuminance(background);
  const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  const ratioFixed = ratio.toFixed(2);

  const getRating = (val: number) => (val >= 4.5 ? 'Pass' : 'Fail');
  const getLargeTextRating = (val: number) => (val >= 3 ? 'Pass' : 'Fail');

  return (
    <ToolContainer title="Contrast Checker" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Text Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="h-10 w-10 cursor-pointer"
              />
              <input
                type="text"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="brand-input"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="h-10 w-10 cursor-pointer"
              />
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="brand-input"
              />
            </div>
          </div>
        </div>

        <div
          className="p-8 rounded-lg text-center"
          style={{ backgroundColor: background, color: foreground }}
        >
          <h2 className="text-4xl font-bold mb-2">Contrast Ratio</h2>
          <p className="text-6xl font-bold">{ratioFixed}:1</p>
          <p className="mt-4 text-lg">
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div
            className={`p-4 rounded border ${ratio >= 4.5 ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}
          >
            <h3 className="font-bold">Normal Text (AA)</h3>
            <p className="text-xl">{getRating(ratio)}</p>
          </div>
          <div
            className={`p-4 rounded border ${ratio >= 3 ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}
          >
            <h3 className="font-bold">Large Text (AA)</h3>
            <p className="text-xl">{getLargeTextRating(ratio)}</p>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default ContrastChecker;

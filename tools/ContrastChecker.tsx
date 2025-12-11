'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';

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
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Label>Text Color</Label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  className="h-12 w-14 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer shadow-sm"
                />
                <Input
                  type="text"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  className="font-mono uppercase"
                  maxLength={7}
                />
              </div>
            </div>
            <div>
              <Label>Background Color</Label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="h-12 w-14 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer shadow-sm"
                />
                <Input
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="font-mono uppercase"
                  maxLength={7}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="min-h-[200px] flex flex-col items-center justify-center text-center transition-colors duration-300 border-2" style={{ backgroundColor: background, color: foreground, borderColor: ratio >= 4.5 ? 'rgba(74, 222, 128, 0.5)' : 'rgba(248, 113, 113, 0.5)' }}>
          <h2 className="text-5xl font-extrabold mb-2">Contrast Ratio</h2>
          <p className="text-7xl font-black tracking-tight">{ratioFixed}:1</p>
          <p className="mt-8 text-xl font-medium opacity-90 max-w-2xl">
            The quick brown fox jumps over the lazy dog.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className={`text-center border-l-4 ${ratio >= 4.5 ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/20' : 'border-l-red-500 bg-red-50/50 dark:bg-red-900/20'}`}
          >
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Normal Text (AA)</h3>
            <div className={`text-4xl font-bold ${ratio >= 4.5 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {getRating(ratio)}
            </div>
          </Card>
          <Card
            className={`text-center border-l-4 ${ratio >= 3 ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/20' : 'border-l-red-500 bg-red-50/50 dark:bg-red-900/20'}`}
          >
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Large Text (AA)</h3>
            <div className={`text-4xl font-bold ${ratio >= 3 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {getLargeTextRating(ratio)}
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default ContrastChecker;

'use client';

import React, { useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import { ArrowLeftRight } from 'lucide-react';

// Parse #rgb / #rrggbb (and tolerate missing #). Returns null on invalid input.
function parseHex(hex: string): { r: number; g: number; b: number } | null {
  let s = hex.trim().replace(/^#/, '');
  if (s.length === 3) {
    s = s
      .split('')
      .map(c => c + c)
      .join('');
  }
  if (s.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(s)) return null;
  return {
    r: parseInt(s.slice(0, 2), 16),
    g: parseInt(s.slice(2, 4), 16),
    b: parseInt(s.slice(4, 6), 16),
  };
}

function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }): number {
  const a = [r, g, b].map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

const Rating: React.FC<{ label: string; pass: boolean; threshold: string }> = ({
  label,
  pass,
  threshold,
}) => (
  <div
    className={`rounded-xl p-4 text-center border-l-4 ${
      pass
        ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/20'
        : 'border-l-red-500 bg-red-50/50 dark:bg-red-900/20'
    }`}
  >
    <h3 className="font-semibold text-sm mb-0.5 text-gray-900 dark:text-gray-100">{label}</h3>
    <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-2">needs {threshold}</p>
    <div
      className={`text-2xl font-bold ${
        pass ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      }`}
    >
      {pass ? 'Pass' : 'Fail'}
    </div>
  </div>
);

const ContrastChecker: React.FC<ToolProps> = ({ details, toolId }) => {
  const [foreground, setForeground] = useState('#FFFFFF');
  const [background, setBackground] = useState('#000000');

  const { ratio, valid } = useMemo(() => {
    const fg = parseHex(foreground);
    const bg = parseHex(background);
    if (!fg || !bg) return { ratio: null as number | null, valid: false };
    const l1 = relativeLuminance(fg);
    const l2 = relativeLuminance(bg);
    const r = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return { ratio: r, valid: true };
  }, [foreground, background]);

  const swap = () => {
    setForeground(background);
    setBackground(foreground);
  };

  const ratioFixed = ratio ? ratio.toFixed(2) : '—';
  const previewBg = valid ? background : '#000000';
  const previewFg = valid ? foreground : '#FFFFFF';

  return (
    <ToolContainer title="Contrast Checker" details={details} toolId={toolId}>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div>
              <Label>Text Color</Label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={parseHex(foreground) ? foreground : '#ffffff'}
                  onChange={e => setForeground(e.target.value)}
                  className="h-12 w-14 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer shadow-sm"
                  aria-label="Pick text color"
                />
                <Input
                  type="text"
                  value={foreground}
                  onChange={e => setForeground(e.target.value)}
                  className="font-mono uppercase"
                  maxLength={7}
                  aria-invalid={!parseHex(foreground)}
                />
              </div>
            </div>

            <div className="flex justify-center pb-1">
              <Button variant="outline" size="sm" onClick={swap} title="Swap colors" className="h-10 w-10 !p-0">
                <ArrowLeftRight className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <Label>Background Color</Label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={parseHex(background) ? background : '#000000'}
                  onChange={e => setBackground(e.target.value)}
                  className="h-12 w-14 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer shadow-sm"
                  aria-label="Pick background color"
                />
                <Input
                  type="text"
                  value={background}
                  onChange={e => setBackground(e.target.value)}
                  className="font-mono uppercase"
                  maxLength={7}
                  aria-invalid={!parseHex(background)}
                />
              </div>
            </div>
          </div>
          {!valid && (
            <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
              Enter valid hex colors (e.g. #1a2b3c or #abc).
            </p>
          )}
        </Card>

        <Card
          className="min-h-[200px] flex flex-col items-center justify-center text-center transition-colors duration-300 border-2"
          style={{
            backgroundColor: previewBg,
            color: previewFg,
            borderColor:
              valid && ratio! >= 4.5 ? 'rgba(74, 222, 128, 0.5)' : 'rgba(248, 113, 113, 0.5)',
          }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-2">Contrast Ratio</h2>
          <p className="text-6xl sm:text-7xl font-black tracking-tight">{ratioFixed}:1</p>
          <p className="mt-8 text-xl font-medium opacity-90 max-w-2xl">
            The quick brown fox jumps over the lazy dog.
          </p>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Rating label="Normal AA" threshold="4.5:1" pass={valid && ratio! >= 4.5} />
          <Rating label="Normal AAA" threshold="7:1" pass={valid && ratio! >= 7} />
          <Rating label="Large AA" threshold="3:1" pass={valid && ratio! >= 3} />
          <Rating label="Large AAA" threshold="4.5:1" pass={valid && ratio! >= 4.5} />
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Large text = 18.66px bold or 24px regular and up. Ratios follow WCAG 2.1 relative-luminance.
        </p>
      </div>
    </ToolContainer>
  );
};

export default ContrastChecker;

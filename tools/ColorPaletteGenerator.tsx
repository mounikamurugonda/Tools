'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import { Copy, RefreshCw } from 'lucide-react';

type PaletteType = 'monochromatic' | 'analogous' | 'complementary' | 'triadic';

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ]
    : [0, 0, 0];
};

const rgbToHsl = (
  r: number,
  g: number,
  b: number,
): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
};

const hslToRgb = (
  h: number,
  s: number,
  l: number,
): [number, number, number] => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => ('0' + Math.round(c).toString(16)).slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const PALETTE_OPTIONS = [
  { value: 'monochromatic', label: 'Monochromatic' },
  { value: 'analogous', label: 'Analogous' },
  { value: 'complementary', label: 'Complementary' },
  { value: 'triadic', label: 'Triadic' },
];

const ColorPaletteGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [paletteType, setPaletteType] = useState<PaletteType>('monochromatic');

  const palette = useMemo(() => {
    const [r, g, b] = hexToRgb(baseColor);
    const [h, s, l] = rgbToHsl(r, g, b);
    const newPalette: string[] = [baseColor];

    switch (paletteType) {
      case 'monochromatic':
        for (let i = 1; i < 5; i++) {
          const newL = Math.max(0, Math.min(100, l + i * 15 - 30));
          newPalette.push(rgbToHex(...hslToRgb(h, s, newL)));
        }
        break;
      case 'analogous':
        for (let i = 1; i < 5; i++) {
          const newH = (h + i * 30) % 360;
          newPalette.push(rgbToHex(...hslToRgb(newH, s, l)));
        }
        break;
      case 'complementary':
        const compH = (h + 180) % 360;
        newPalette.push(rgbToHex(...hslToRgb(compH, s, l)));
        newPalette.push(rgbToHex(...hslToRgb(h, s, Math.min(100, l + 20))));
        newPalette.push(rgbToHex(...hslToRgb(compH, s, Math.min(100, l + 20))));
        newPalette.push(rgbToHex(...hslToRgb(h, Math.max(0, s - 30), l)));
        break;
      case 'triadic':
        const triadicH1 = (h + 120) % 360;
        const triadicH2 = (h + 240) % 360;
        newPalette.push(rgbToHex(...hslToRgb(triadicH1, s, l)));
        newPalette.push(rgbToHex(...hslToRgb(triadicH2, s, l)));
        newPalette.push(
          rgbToHex(...hslToRgb(h, Math.max(0, s - 20), Math.min(100, l + 10))),
        );
        newPalette.push(
          rgbToHex(...hslToRgb(triadicH1, s, Math.min(100, l + 20))),
        );
        break;
    }
    return newPalette.slice(0, 5);
  }, [baseColor, paletteType]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolContainer
      title="Color Palette Generator"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-8">
        <Card>
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <div>
              <Label>Base Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="h-10 w-12 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <Input
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="font-mono flex-grow"
                  placeholder="#000000"
                />
              </div>
            </div>
            <div>
              <Label>Palette Type</Label>
              <Select
                value={paletteType}
                onChange={(e) => setPaletteType(e.target.value as PaletteType)}
                className="w-full"
              >
                {PALETTE_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {palette.map((color, index) => (
            <div key={index} className="group relative">
              <div
                className="h-32 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform group-hover:scale-105"
                style={{ backgroundColor: color }}
              ></div>
              <div className="mt-3 text-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2 border border-gray-200 dark:border-gray-700 flex items-center justify-between px-3">
                  <span className="font-mono text-sm uppercase text-gray-700 dark:text-gray-300">{color}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(color)}
                    className="!p-1.5 h-auto text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                    title="Copy Hex"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
};

export default ColorPaletteGenerator;

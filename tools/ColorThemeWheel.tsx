'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { Copy, Check, AlertTriangle, Upload, X } from 'lucide-react';

// Color utilities (HSL <-> RGB/HEX)
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function hslToRgb(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0, g1 = 0, b1 = 0;
  if (0 <= hp && hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (1 <= hp && hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (2 <= hp && hp < 3) [r1, g1, b1] = [0, c, x];
  else if (3 <= hp && hp < 4) [r1, g1, b1] = [0, x, c];
  else if (4 <= hp && hp < 5) [r1, g1, b1] = [x, 0, c];
  else[r1, g1, b1] = [c, 0, x];
  const m = l - c / 2;
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s, l };
}

function pad2(n: number) {
  return n.toString(16).padStart(2, '0');
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${pad2(r)}${pad2(g)}${pad2(b)}`;
}

function hslToHex(h: number, s: number, l: number) {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

// Contrast ratio calculation (WCAG)
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getWCAGRating(ratio: number): { level: string; color: string } {
  if (ratio >= 7) return { level: 'AAA', color: 'text-green-600 dark:text-green-400' };
  if (ratio >= 4.5) return { level: 'AA', color: 'text-yellow-600 dark:text-yellow-400' };
  if (ratio >= 3) return { level: 'AA Large', color: 'text-orange-600 dark:text-orange-400' };
  return { level: 'Fail', color: 'text-red-600 dark:text-red-400' };
}

// Scheme generation
type Scheme =
  | 'monochromatic'
  | 'analogous'
  | 'complementary'
  | 'split-complementary'
  | 'triad'
  | 'tetrad'
  | 'square'
  | 'compound'
  | 'shades';

function rotateHue(h: number, d: number) {
  return (((h + d) % 360) + 360) % 360;
}

function makePalette(h: number, s: number, l: number, scheme: Scheme) {
  switch (scheme) {
    case 'monochromatic':
      return [
        { h, s, l: clamp(l + 0.25, 0, 1) },
        { h, s, l: clamp(l + 0.12, 0, 1) },
        { h, s, l },
        { h, s, l: clamp(l - 0.12, 0, 1) },
        { h, s, l: clamp(l - 0.25, 0, 1) },
      ];
    case 'analogous':
      return [
        { h: rotateHue(h, -40), s, l },
        { h: rotateHue(h, -20), s, l },
        { h, s, l },
        { h: rotateHue(h, 20), s, l },
        { h: rotateHue(h, 40), s, l },
      ];
    case 'complementary':
      return [
        { h, s, l },
        { h: rotateHue(h, 180), s, l },
        { h, s, l: clamp(l + 0.15, 0, 1) },
        { h: rotateHue(h, 180), s, l: clamp(l + 0.15, 0, 1) },
        { h, s, l: clamp(l - 0.15, 0, 1) },
      ];
    case 'split-complementary':
      return [
        { h, s, l },
        { h: rotateHue(h, 150), s, l },
        { h: rotateHue(h, -150), s, l },
        { h, s, l: clamp(l + 0.12, 0, 1) },
        { h, s, l: clamp(l - 0.12, 0, 1) },
      ];
    case 'triad':
      return [
        { h, s, l },
        { h: rotateHue(h, 120), s, l },
        { h: rotateHue(h, -120), s, l },
        { h, s, l: clamp(l + 0.12, 0, 1) },
        { h, s, l: clamp(l - 0.12, 0, 1) },
      ];
    case 'tetrad':
      return [
        { h, s, l },
        { h: rotateHue(h, 60), s, l },
        { h: rotateHue(h, 180), s, l },
        { h: rotateHue(h, 240), s, l },
        { h, s, l: clamp(l + 0.12, 0, 1) },
      ];
    case 'square':
      return [
        { h, s, l },
        { h: rotateHue(h, 90), s, l },
        { h: rotateHue(h, 180), s, l },
        { h: rotateHue(h, 270), s, l },
        { h, s, l: clamp(l - 0.15, 0, 1) },
      ];
    case 'compound':
      return [
        { h, s, l },
        { h: rotateHue(h, 30), s, l },
        { h: rotateHue(h, 180), s, l },
        { h: rotateHue(h, 210), s, l },
        { h, s, l: clamp(l + 0.1, 0, 1) },
      ];
    case 'shades':
      return [
        { h, s: clamp(s + 0.1, 0, 1), l: 0.9 },
        { h, s, l: 0.7 },
        { h, s, l: 0.5 },
        { h, s, l: 0.35 },
        { h, s: clamp(s - 0.1, 0, 1), l: 0.2 },
      ];
  }
}

const SCHEME_OPTIONS = [
  { value: 'analogous', label: 'Analogous' },
  { value: 'monochromatic', label: 'Monochromatic' },
  { value: 'triad', label: 'Triad' },
  { value: 'complementary', label: 'Complementary' },
  { value: 'split-complementary', label: 'Split-Complementary' },
  { value: 'square', label: 'Square' },
  { value: 'compound', label: 'Compound' },
  { value: 'tetrad', label: 'Tetrad' },
  { value: 'shades', label: 'Shades' },
];

const ColorThemeWheel: React.FC<ToolProps> = ({ details, toolId }) => {
  // Base HSL
  const [h, setH] = useState(217);
  const [s, setS] = useState(0.9);
  const [l, setL] = useState(0.5);
  const [scheme, setScheme] = useState<Scheme>('analogous');
  const [hexInput, setHexInput] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');

  // URL state persistence
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if (hash) {
        try {
          const params = new URLSearchParams(hash);
          const hVal = params.get('h');
          const sVal = params.get('s');
          const lVal = params.get('l');
          const schemeVal = params.get('scheme');
          if (hVal) setH(parseInt(hVal));
          if (sVal) setS(parseFloat(sVal));
          if (lVal) setL(parseFloat(lVal));
          if (schemeVal) setScheme(schemeVal as Scheme);
        } catch { }
      }
    }
  }, []);

  // Update URL when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      params.set('h', h.toString());
      params.set('s', s.toFixed(2));
      params.set('l', l.toFixed(2));
      params.set('scheme', scheme);
      window.history.replaceState(null, '', `#${params.toString()}`);
    }
  }, [h, s, l, scheme]);

  // Wheel interaction
  const wheelRef = useRef<HTMLDivElement>(null);

  const onWheelPointer = useCallback((clientX: number, clientY: number) => {
    const el = wheelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const angle = Math.atan2(dy, dx);
    const deg = ((angle * 180) / Math.PI + 360) % 360;
    const radius = Math.sqrt(dx * dx + dy * dy);
    const maxR = rect.width / 2;
    const sat = clamp(radius / maxR, 0, 0.95);
    setH(Math.round(deg));
    setS(parseFloat(sat.toFixed(3)));
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    onWheelPointer(e.clientX, e.clientY);
    const move = (ev: MouseEvent) => onWheelPointer(ev.clientX, ev.clientY);
    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    onWheelPointer(t.clientX, t.clientY);
    const move = (ev: TouchEvent) => {
      const tt = ev.touches[0];
      if (tt) onWheelPointer(tt.clientX, tt.clientY);
    };
    const end = () => {
      document.removeEventListener('touchmove', move);
      document.removeEventListener('touchend', end);
      document.removeEventListener('touchcancel', end);
    };
    document.addEventListener('touchmove', move, { passive: true });
    document.addEventListener('touchend', end);
    document.addEventListener('touchcancel', end);
  };

  // Handle hex input
  const handleHexInput = (value: string) => {
    setHexInput(value);
    const hex = value.startsWith('#') ? value : `#${value}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      const rgb = hexToRgb(hex);
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        setH(Math.round(hsl.h));
        setS(parseFloat(hsl.s.toFixed(3)));
        setL(parseFloat(hsl.l.toFixed(3)));
      }
    }
  };

  // Image color extraction
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);

  const extractColorsFromImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const size = 100;
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, 0, 0, size, size);

        const imageData = ctx.getImageData(0, 0, size, size);
        const pixels = imageData.data;

        // Simple color extraction: sample colors and find dominant ones
        const colorMap: Record<string, number> = {};
        for (let i = 0; i < pixels.length; i += 16) {
          const r = Math.round(pixels[i] / 32) * 32;
          const g = Math.round(pixels[i + 1] / 32) * 32;
          const b = Math.round(pixels[i + 2] / 32) * 32;
          const key = `${r},${g},${b}`;
          colorMap[key] = (colorMap[key] || 0) + 1;
        }

        const sorted = Object.entries(colorMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([key]) => {
            const [r, g, b] = key.split(',').map(Number);
            return rgbToHex(r, g, b);
          });

        setExtractedColors(sorted);

        // Set first color as base
        if (sorted[0]) {
          const rgb = hexToRgb(sorted[0]);
          if (rgb) {
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            setH(Math.round(hsl.h));
            setS(parseFloat(hsl.s.toFixed(3)));
            setL(parseFloat(hsl.l.toFixed(3)));
          }
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const palette = useMemo(() => makePalette(h, s, l, scheme), [h, s, l, scheme]);

  const swatches = useMemo(
    () =>
      palette.map(({ h: hh, s: ss, l: ll }) => {
        const hex = hslToHex(hh, ss, ll);
        const { r, g, b } = hslToRgb(hh, ss, ll);
        return {
          hex,
          h: Math.round(hh),
          s: Math.round(ss * 100),
          l: Math.round(ll * 100),
          r, g, b,
        };
      }),
    [palette]
  );

  const baseHex = useMemo(() => hslToHex(h, s, l), [h, s, l]);

  const copy = async (text: string, id?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id || text);
      setTimeout(() => setCopied(null), 1500);
    } catch { }
  };

  // Gradient CSS
  const gradientCSS = useMemo(() => {
    const colors = swatches.map(sw => sw.hex).join(', ');
    return `linear-gradient(90deg, ${colors})`;
  }, [swatches]);

  // CSS Variables export
  const cssVars = useMemo(() => {
    const lines = swatches.map((sw, i) => `  --color-${i + 1}: ${sw.hex};`);
    return `:root {\n${lines.join('\n')}\n}`;
  }, [swatches]);

  // SCSS Variables export
  const scssVars = useMemo(() => {
    return swatches.map((sw, i) => `$color-${i + 1}: ${sw.hex};`).join('\n');
  }, [swatches]);

  // Tailwind config export
  const tailwindConfig = useMemo(() => {
    const colors: Record<string, string> = {};
    swatches.forEach((sw, i) => {
      colors[`${i + 1}00`] = sw.hex;
    });
    return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        'palette': ${JSON.stringify(colors, null, 8).replace(/"/g, "'")}\n      }\n    }\n  }\n}`;
  }, [swatches]);

  // JSON export
  const jsonExport = useMemo(
    () => JSON.stringify(swatches.map(sw => sw.hex), null, 2),
    [swatches]
  );

  // Share URL
  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  }, [h, s, l, scheme]);

  return (
    <ToolContainer title="Color Theme Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wheel */}
          <Card title="Color Wheel" className="flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4 px-2">
              <div>
                <Label className="mb-0">Base Color</Label>
                <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {baseHex.toUpperCase()}
                </div>
              </div>
              <div className="text-right text-xs text-gray-500 font-mono">
                H {h}° <br /> S {Math.round(s * 100)}% <br /> L {Math.round(l * 100)}%
              </div>
            </div>

            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 my-4">
              <div
                ref={wheelRef}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className="absolute inset-0 rounded-full cursor-crosshair select-none shadow-lg"
                style={{
                  background: 'conic-gradient(from 90deg, red, yellow, lime, cyan, blue, magenta, red)',
                  WebkitMaskImage: 'radial-gradient(circle, #000 60%, transparent 61%)',
                  maskImage: 'radial-gradient(circle, #000 60%, transparent 61%)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 65%)',
                    mixBlendMode: 'overlay',
                  }}
                />
              </div>
              {/* Scheme color handles */}
              {palette.map((color, idx) => (
                <Pointer
                  key={idx}
                  h={color.h}
                  s={color.s}
                  color={hslToHex(color.h, color.s, color.l)}
                  isMain={idx === (scheme === 'monochromatic' || scheme === 'shades' ? 2 : 0)}
                />
              ))}
            </div>
          </Card>

          <Card title="Settings">
            <div className="space-y-5">
              {/* Hex Input */}
              <div>
                <Label>Hex Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="#FF5500"
                    value={hexInput}
                    onChange={e => handleHexInput(e.target.value)}
                    className="font-mono"
                  />
                  <div
                    className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex-shrink-0"
                    style={{ backgroundColor: baseHex }}
                  />
                </div>
              </div>

              <Slider
                label="Lightness"
                min={0}
                max={1}
                step={0.01}
                value={l}
                onChange={e => setL(parseFloat(e.target.value))}
                valueDisplay={`${Math.round(l * 100)}%`}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Hue</Label>
                  <Input
                    type="number"
                    min={0}
                    max={360}
                    value={h}
                    onChange={e => setH(clamp(parseInt(e.target.value || '0'), 0, 360))}
                  />
                </div>
                <div>
                  <Label>Saturation (%)</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={Math.round(s * 100)}
                    onChange={e => setS(clamp(parseInt(e.target.value || '0') / 100, 0, 1))}
                  />
                </div>
              </div>

              <div>
                <Label>Color Harmony</Label>
                <Select value={scheme} onChange={e => setScheme(e.target.value as Scheme)}>
                  {SCHEME_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Image extraction */}
              <div>
                <Label>Extract from Image</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) extractColorsFromImage(file);
                  }}
                />
                <Button
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" /> Upload Image
                </Button>
                {extractedColors.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Extracted Colors</span>
                      <button
                        onClick={() => setExtractedColors([])}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {extractedColors.map((color, idx) => (
                        <button
                          key={idx}
                          className="w-8 h-8 rounded-lg border-2 border-white shadow-md hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            const rgb = hexToRgb(color);
                            if (rgb) {
                              const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                              setH(Math.round(hsl.h));
                              setS(parseFloat(hsl.s.toFixed(3)));
                              setL(parseFloat(hsl.l.toFixed(3)));
                            }
                          }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Gradient Preview */}
        <Card title="Gradient Preview">
          <div
            className="h-16 rounded-xl shadow-inner"
            style={{ background: gradientCSS }}
          />
          <div className="mt-3 flex items-center justify-between">
            <code className="text-xs text-gray-500 font-mono truncate max-w-[80%]">
              {gradientCSS}
            </code>
            <Button size="sm" variant="ghost" onClick={() => copy(gradientCSS, 'gradient')}>
              {copied === 'gradient' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </Card>

        {/* Generated Palette */}
        <Card title="Generated Palette">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {swatches.map((sw, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:scale-105"
              >
                <div className="h-24" style={{ backgroundColor: sw.hex }} />
                <div className="p-2 flex flex-col items-center gap-1 bg-gray-50 dark:bg-gray-800">
                  <code className="font-mono text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {sw.hex.toUpperCase()}
                  </code>
                  <code className="font-mono text-[10px] text-gray-500">
                    RGB({sw.r}, {sw.g}, {sw.b})
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copy(sw.hex, `swatch-${idx}`)}
                    className="!p-1 h-auto text-xs"
                  >
                    {copied === `swatch-${idx}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3 mr-1" />}
                    {copied === `swatch-${idx}` ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Contrast Checker */}
        <Card title="Accessibility Contrast Checker">
          <p className="text-sm text-gray-500 mb-4">
            WCAG contrast ratios between palette colors and white/black text
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {swatches.map((sw, idx) => {
              const whiteRatio = getContrastRatio(sw.hex, '#FFFFFF');
              const blackRatio = getContrastRatio(sw.hex, '#000000');
              const whiteRating = getWCAGRating(whiteRatio);
              const blackRating = getWCAGRating(blackRatio);

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700"
                  style={{ backgroundColor: sw.hex }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium text-sm drop-shadow-md">White Text</span>
                    <span className={`text-xs font-bold ${whiteRating.color} bg-white/90 px-2 py-0.5 rounded`}>
                      {whiteRatio.toFixed(1)}:1 {whiteRating.level}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black font-medium text-sm">Black Text</span>
                    <span className={`text-xs font-bold ${blackRating.color} bg-white/90 px-2 py-0.5 rounded`}>
                      {blackRatio.toFixed(1)}:1 {blackRating.level}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* UI Preview */}
        <Card title="UI Preview">
          <div className="flex gap-2 mb-4">
            <Button
              size="sm"
              variant={previewMode === 'light' ? 'primary' : 'secondary'}
              onClick={() => setPreviewMode('light')}
            >
              Light Mode
            </Button>
            <Button
              size="sm"
              variant={previewMode === 'dark' ? 'primary' : 'secondary'}
              onClick={() => setPreviewMode('dark')}
            >
              Dark Mode
            </Button>
          </div>
          <div
            className={`p-6 rounded-xl ${previewMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
          >
            <div className="flex flex-wrap gap-3 mb-4">
              {swatches.map((sw, idx) => (
                <button
                  key={idx}
                  className="px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105"
                  style={{
                    backgroundColor: sw.hex,
                    color: getContrastRatio(sw.hex, '#FFFFFF') > 4.5 ? '#fff' : '#000',
                  }}
                >
                  Button {idx + 1}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {swatches.map((sw, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 rounded-xl shadow-lg flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: sw.hex,
                    color: getContrastRatio(sw.hex, '#FFFFFF') > 4.5 ? '#fff' : '#000',
                  }}
                >
                  {sw.hex.slice(1, 4).toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Export Options */}
        <Card title="Export">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>CSS Variables</Label>
                <Button size="sm" variant="secondary" onClick={() => copy(cssVars, 'css')}>
                  {copied === 'css' ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                  Copy
                </Button>
              </div>
              <textarea
                className="w-full h-32 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                readOnly
                value={cssVars}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>SCSS Variables</Label>
                <Button size="sm" variant="secondary" onClick={() => copy(scssVars, 'scss')}>
                  {copied === 'scss' ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                  Copy
                </Button>
              </div>
              <textarea
                className="w-full h-32 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                readOnly
                value={scssVars}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Tailwind Config</Label>
                <Button size="sm" variant="secondary" onClick={() => copy(tailwindConfig, 'tailwind')}>
                  {copied === 'tailwind' ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                  Copy
                </Button>
              </div>
              <textarea
                className="w-full h-32 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                readOnly
                value={tailwindConfig}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>JSON Export</Label>
                <Button size="sm" variant="secondary" onClick={() => copy(jsonExport, 'json')}>
                  {copied === 'json' ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                  Copy
                </Button>
              </div>
              <textarea
                className="w-full h-32 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                readOnly
                value={jsonExport}
              />
            </div>
          </div>

          {/* Share URL */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Label className="mb-0">Share This Palette</Label>
              <Button size="sm" variant="primary" onClick={() => copy(shareUrl, 'share')}>
                {copied === 'share' ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied === 'share' ? 'Copied!' : 'Copy Link'}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Copy and share this URL to share your exact palette with others - no login required!
            </p>
          </div>
        </Card>
      </div>
    </ToolContainer>
  );
};

const Pointer: React.FC<{ h: number; s: number; color: string; isMain?: boolean }> = ({ h, s, color, isMain = false }) => {
  const angle = h * (Math.PI / 180);
  const rx = Math.cos(angle) * s;
  const ry = Math.sin(angle) * s;
  const left = 50 + rx * 50;
  const top = 50 + ry * 50;
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isMain ? 10 : 5,
      }}
    >
      <div
        className={`rounded-full border-2 border-white shadow-lg transition-transform ${isMain ? 'w-5 h-5' : 'w-4 h-4'}`}
        style={{
          background: color,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)',
        }}
      />
    </div>
  );
};

export default ColorThemeWheel;

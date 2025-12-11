'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import Slider from '@/components/ui/Slider';
import { Copy, RefreshCw } from 'lucide-react';

// Utility functions for color parsing and conversion
function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

function pad2(n: number) {
  return n.toString(16).padStart(2, '0');
}

function hexToRgba(
  hex: string,
): { r: number; g: number; b: number; a: number } | null {
  const s = hex.trim().replace(/^#/, '');
  if (![3, 4, 6, 8].includes(s.length)) return null;
  let r = 0,
    g = 0,
    b = 0,
    a = 255;
  if (s.length === 3 || s.length === 4) {
    const rS = s[0] + s[0];
    const gS = s[1] + s[1];
    const bS = s[2] + s[2];
    const aS = s.length === 4 ? s[3] + s[3] : 'ff';
    r = parseInt(rS, 16);
    g = parseInt(gS, 16);
    b = parseInt(bS, 16);
    a = parseInt(aS, 16);
  } else if (s.length === 6 || s.length === 8) {
    r = parseInt(s.slice(0, 2), 16);
    g = parseInt(s.slice(2, 4), 16);
    b = parseInt(s.slice(4, 6), 16);
    a = parseInt(s.slice(6, 8) || 'ff', 16);
  }
  if ([r, g, b, a].some((n) => Number.isNaN(n))) return null;
  return { r, g, b, a };
}

function rgbaToHex(
  { r, g, b, a }: { r: number; g: number; b: number; a?: number },
  withAlpha = false,
): string {
  const _a = typeof a === 'number' ? a : 255;
  return '#' + pad2(r) + pad2(g) + pad2(b) + (withAlpha ? pad2(_a) : '');
}

function parseRgb(
  str: string,
): { r: number; g: number; b: number; a: number } | null {
  const s = str.trim().replace(/\s+/g, '');
  // rgb(255,0,0) or rgba(255,0,0,0.5)
  const m = s.match(/^rgba?\(([^)]+)\)$/i);
  if (!m) return null;
  const parts = m[1].split(',');
  if (parts.length < 3 || parts.length > 4) return null;
  const r = parseInt(parts[0], 10);
  const g = parseInt(parts[1], 10);
  const b = parseInt(parts[2], 10);
  let a = 1;
  if (parts[3] !== undefined) {
    const av = parts[3];
    a = av.endsWith('%') ? parseFloat(av) / 100 : parseFloat(av);
  }
  if ([r, g, b].some((v) => Number.isNaN(v))) return null;
  return {
    r: clamp(Math.round(r), 0, 255),
    g: clamp(Math.round(g), 0, 255),
    b: clamp(Math.round(b), 0, 255),
    a: clamp(a, 0, 1),
  };
}

function parseHsl(
  str: string,
): { h: number; s: number; l: number; a: number } | null {
  const s = str.trim().replace(/\s+/g, '');
  const m = s.match(/^hsla?\(([^)]+)\)$/i);
  if (!m) return null;
  const parts = m[1].split(',');
  if (parts.length < 3 || parts.length > 4) return null;
  let h = parseFloat(parts[0]);
  let sVal = parts[1];
  let lVal = parts[2];
  let a = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
  if (!sVal.endsWith('%') || !lVal.endsWith('%')) return null;
  const sPct = parseFloat(sVal) / 100;
  const lPct = parseFloat(lVal) / 100;
  if ([h, sPct, lPct, a].some((v) => Number.isNaN(v))) return null;
  // Normalize h
  h = ((h % 360) + 360) % 360;
  return { h, s: clamp(sPct, 0, 1), l: clamp(lPct, 0, 1), a: clamp(a, 0, 1) };
}

function hslToRgb(h: number, s: number, l: number) {
  // h in [0,360), s,l in [0,1]
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r1 = 0,
    g1 = 0,
    b1 = 0;
  if (0 <= h && h < 60) [r1, g1, b1] = [c, x, 0];
  else if (60 <= h && h < 120) [r1, g1, b1] = [x, c, 0];
  else if (120 <= h && h < 180) [r1, g1, b1] = [0, c, x];
  else if (180 <= h && h < 240) [r1, g1, b1] = [0, x, c];
  else if (240 <= h && h < 300) [r1, g1, b1] = [x, 0, c];
  else[r1, g1, b1] = [c, 0, x];
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  if (max !== min) {
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
    h *= 60;
  }
  return { h: ((h % 360) + 360) % 360, s, l };
}

function formatRgb({
  r,
  g,
  b,
  a,
}: {
  r: number;
  g: number;
  b: number;
  a: number;
}) {
  return a < 1
    ? `rgba(${r}, ${g}, ${b}, ${a.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')})`
    : `rgb(${r}, ${g}, ${b})`;
}

function formatHsl({
  h,
  s,
  l,
  a,
}: {
  h: number;
  s: number;
  l: number;
  a: number;
}) {
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);
  return a < 1
    ? `hsla(${Math.round(h)}, ${sPct}%, ${lPct}%, ${a.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')})`
    : `hsl(${Math.round(h)}, ${sPct}%, ${lPct}%)`;
}

function resolveCssColorKeyword(
  keyword: string,
): { r: number; g: number; b: number; a: number } | null {
  if (typeof document === 'undefined') return null;
  const el = document.createElement('div');
  el.style.color = keyword.trim();
  document.body.appendChild(el);
  const cs = getComputedStyle(el).color; // returns rgb(a)
  document.body.removeChild(el);
  const parsed = parseRgb(cs);
  if (!parsed) return null;
  // getComputedStyle returns alpha=1 always for color, keep it
  return { ...parsed, a: parsed.a };
}

const CssColorCodeConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  // base state is RGBA
  const [rgba, setRgba] = useState<{
    r: number;
    g: number;
    b: number;
    a: number;
  }>({ r: 59, g: 130, b: 246, a: 1 });
  const [hexInput, setHexInput] = useState('#3b82f6');
  const [rgbInput, setRgbInput] = useState('rgb(59, 130, 246)');
  const [hslInput, setHslInput] = useState('hsl(217, 91%, 60%)');
  const [keywordInput, setKeywordInput] = useState('');
  const [error, setError] = useState<string>('');

  // derive formatted strings
  const derived = useMemo(() => {
    const hex = rgbaToHex(
      { r: rgba.r, g: rgba.g, b: rgba.b, a: Math.round(rgba.a * 255) },
      rgba.a < 1,
    );
    const rgb = formatRgb({ r: rgba.r, g: rgba.g, b: rgba.b, a: rgba.a });
    const { h, s, l } = rgbToHsl(rgba.r, rgba.g, rgba.b);
    const hsl = formatHsl({ h, s, l, a: rgba.a });
    return { hex, rgb, hsl };
  }, [rgba]);

  // sync input fields when rgba changes (but not while user is typing an input that originated change)
  useEffect(() => {
    setHexInput(derived.hex);
    setRgbInput(derived.rgb);
    setHslInput(derived.hsl);
    setError('');
  }, [derived.hex, derived.rgb, derived.hsl]);

  const handleHexChange = (val: string) => {
    setHexInput(val);
    const parsed = hexToRgba(val);
    if (!parsed) {
      setError('Invalid HEX/HEXA code');
      return;
    }
    setError('');
    setRgba({ r: parsed.r, g: parsed.g, b: parsed.b, a: parsed.a / 255 });
  };

  const handleRgbChange = (val: string) => {
    setRgbInput(val);
    const parsed = parseRgb(val);
    if (!parsed) {
      setError('Invalid RGB/RGBA value');
      return;
    }
    setError('');
    setRgba({ r: parsed.r, g: parsed.g, b: parsed.b, a: parsed.a });
  };

  const handleHslChange = (val: string) => {
    setHslInput(val);
    const parsed = parseHsl(val);
    if (!parsed) {
      setError('Invalid HSL/HSLA value');
      return;
    }
    setError('');
    const { r, g, b } = hslToRgb(parsed.h, parsed.s, parsed.l);
    setRgba({ r, g, b, a: parsed.a });
  };

  const handleKeywordResolve = () => {
    const result = resolveCssColorKeyword(keywordInput);
    if (!result) {
      setError('Unrecognized CSS color keyword');
      return;
    }
    setError('');
    setRgba(result);
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch { }
  };

  return (
    <ToolContainer
      title="CSS Color Code Converter"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/50">
            <div
              className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-700 shadow-xl transition-colors duration-300"
              style={{
                backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
              }}
            />
          </Card>

          <Card className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label>HEX / HEXA</Label>
                <div className="flex gap-2">
                  <Input
                    value={hexInput}
                    onChange={(e) => handleHexChange(e.target.value)}
                    placeholder="#3b82f6"
                    className="font-mono text-sm uppercase"
                  />
                  <Button variant="secondary" onClick={() => copy(hexInput)} className="px-3">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>RGB / RGBA</Label>
                <div className="flex gap-2">
                  <Input
                    value={rgbInput}
                    onChange={(e) => handleRgbChange(e.target.value)}
                    placeholder="rgb(59, 130, 246)"
                    className="font-mono text-sm"
                  />
                  <Button variant="secondary" onClick={() => copy(rgbInput)} className="px-3">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>HSL / HSLA</Label>
                <div className="flex gap-2">
                  <Input
                    value={hslInput}
                    onChange={(e) => handleHslChange(e.target.value)}
                    placeholder="hsl(217, 91%, 60%)"
                    className="font-mono text-sm"
                  />
                  <Button variant="secondary" onClick={() => copy(hslInput)} className="px-3">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Slider
                  label="Alpha (Transparency)"
                  min={0}
                  max={1}
                  step={0.01}
                  value={rgba.a}
                  onChange={(e) => setRgba(prev => ({ ...prev, a: parseFloat(e.target.value) }))}
                  valueDisplay={rgba.a.toFixed(2)}
                />
              </div>
            </div>
          </Card>
        </div>

        <Card title="Keyword Resolver">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-grow w-full">
              <Label>CSS Color Keyword</Label>
              <Input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="e.g., rebeccapurple, tomato, slateblue"
              />
              <p className="text-xs text-gray-500 mt-1">Enter a valid CSS color name to resolve its values.</p>
            </div>
            <Button onClick={handleKeywordResolve} className="w-full md:w-auto">
              <RefreshCw className="w-4 h-4 mr-2" />
              Resolve
            </Button>
          </div>
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['HEX', 'RGB', 'HSL'].map((type) => (
            <div key={type} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex justify-between items-center shadow-sm">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{type}</div>
                <code className="text-sm font-mono font-medium text-gray-900 dark:text-gray-100">
                  {type === 'HEX' ? derived.hex : type === 'RGB' ? derived.rgb : derived.hsl}
                </code>
              </div>
              <Button size="sm" variant="ghost" className="!p-2 text-gray-400 hover:text-blue-600" onClick={() => copy(type === 'HEX' ? derived.hex : type === 'RGB' ? derived.rgb : derived.hsl)}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
};

export default CssColorCodeConverter;

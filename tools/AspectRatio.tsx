'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, ArrowLeftRight } from 'lucide-react';

type Mode = 'ratio' | 'solve';

const RATIO_PRESETS: Array<{ label: string; rw: number; rh: number }> = [
  { label: '16:9', rw: 16, rh: 9 },
  { label: '4:3', rw: 4, rh: 3 },
  { label: '21:9', rw: 21, rh: 9 },
  { label: '1:1', rw: 1, rh: 1 },
  { label: '3:2', rw: 3, rh: 2 },
  { label: '4:5', rw: 4, rh: 5 },
  { label: '9:16', rw: 9, rh: 16 },
  { label: '2.39:1', rw: 239, rh: 100 },
];

const SIZE_PRESETS = [
  { w: 1920, h: 1080, l: 'HD 1080p' },
  { w: 3840, h: 2160, l: '4K UHD' },
  { w: 1080, h: 1080, l: 'IG Square' },
  { w: 1080, h: 1350, l: 'IG Portrait' },
  { w: 1080, h: 1920, l: 'Story 9:16' },
  { w: 1280, h: 720, l: 'HD 720p' },
];

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, Math.abs(a) % Math.abs(b)));

const AspectRatio: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [mode, setMode] = useState<Mode>('ratio');

  // Ratio mode: derive ratio from two dimensions
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);

  // Solve mode: derive missing dimension from ratio + known side
  const [rw, setRw] = useState<number>(16);
  const [rh, setRh] = useState<number>(9);
  const [knownSide, setKnownSide] = useState<'w' | 'h'>('w');
  const [knownValue, setKnownValue] = useState<number>(1920);

  const ratio = useMemo(() => {
    if (!width || !height || width <= 0 || height <= 0) return '—';
    const g = gcd(Math.round(width), Math.round(height));
    return `${Math.round(width) / g}:${Math.round(height) / g}`;
  }, [width, height]);

  const decimal = useMemo(() => {
    if (!width || !height || height <= 0) return '—';
    return (width / height).toFixed(4);
  }, [width, height]);

  const solved = useMemo(() => {
    if (!rw || !rh || !knownValue || rw <= 0 || rh <= 0 || knownValue <= 0) return null;
    if (knownSide === 'w') {
      return { w: knownValue, h: Math.round((knownValue * rh) / rw) };
    }
    return { w: Math.round((knownValue * rw) / rh), h: knownValue };
  }, [rw, rh, knownSide, knownValue]);

  useEffect(() => {
    // Sync ratio mode presets into solve mode when user clicks a ratio chip
  }, []);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  const swap = () => {
    if (mode === 'ratio') {
      setWidth(height);
      setHeight(width);
    } else {
      setRw(rh);
      setRh(rw);
    }
  };

  return (
    <ToolContainer title="Aspect Ratio Calculator" details={details} toolId={toolId}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Mode tabs */}
        <div
          className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 mx-auto"
          role="tablist"
          aria-label="Calculator mode"
        >
          {(
            [
              { id: 'ratio', label: 'Get ratio' },
              { id: 'solve', label: 'Solve dimension' },
            ] as const
          ).map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={mode === t.id}
              onClick={() => setMode(t.id)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                mode === t.id
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {mode === 'ratio' ? (
          <Card className="p-6 space-y-6">
            <div>
              <Label className="block mb-3 text-center">Enter dimensions</Label>
              <div className="flex items-center justify-center gap-3">
                <div className="flex-1 max-w-[160px]">
                  <Label className="block text-xs text-gray-500 mb-1">Width</Label>
                  <Input
                    type="number"
                    min={1}
                    value={width || ''}
                    onChange={e => setWidth(Number(e.target.value))}
                    className="text-center text-xl font-bold"
                  />
                </div>
                <button
                  type="button"
                  onClick={swap}
                  aria-label="Swap width and height"
                  className="mt-5 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
                <div className="flex-1 max-w-[160px]">
                  <Label className="block text-xs text-gray-500 mb-1">Height</Label>
                  <Input
                    type="number"
                    min={1}
                    value={height || ''}
                    onChange={e => setHeight(Number(e.target.value))}
                    className="text-center text-xl font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-gray-50 dark:bg-gray-800/60 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">
                  Aspect Ratio
                </p>
                <p className="text-3xl font-bold mt-1 text-blue-600 dark:text-blue-400">{ratio}</p>
                <button
                  type="button"
                  onClick={() => copy(ratio, 'ratio')}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
              <div className="rounded-lg bg-gray-50 dark:bg-gray-800/60 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">
                  Decimal
                </p>
                <p className="text-3xl font-bold mt-1 text-blue-600 dark:text-blue-400">
                  {decimal}
                </p>
                <button
                  type="button"
                  onClick={() => copy(decimal, 'decimal')}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
            </div>

            <div>
              <Label className="block mb-2 text-xs text-gray-500">Size presets</Label>
              <div className="flex justify-center gap-2 flex-wrap">
                {SIZE_PRESETS.map((p, i) => (
                  <Button
                    key={i}
                    variant="secondary"
                    onClick={() => {
                      setWidth(p.w);
                      setHeight(p.h);
                    }}
                    className="text-xs"
                  >
                    {p.l}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6 space-y-6">
            <div>
              <Label className="block mb-3 text-center">Target ratio</Label>
              <div className="flex items-center justify-center gap-3">
                <Input
                  type="number"
                  min={1}
                  value={rw || ''}
                  onChange={e => setRw(Number(e.target.value))}
                  className="w-24 text-center text-xl font-bold"
                />
                <span className="text-2xl font-bold text-gray-400">:</span>
                <Input
                  type="number"
                  min={1}
                  value={rh || ''}
                  onChange={e => setRh(Number(e.target.value))}
                  className="w-24 text-center text-xl font-bold"
                />
                <button
                  type="button"
                  onClick={swap}
                  aria-label="Swap ratio sides"
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-center gap-2 flex-wrap mt-3">
                {RATIO_PRESETS.map(p => (
                  <button
                    key={p.label}
                    onClick={() => {
                      setRw(p.rw);
                      setRh(p.rh);
                    }}
                    aria-pressed={rw === p.rw && rh === p.rh}
                    className={`px-2.5 py-1 text-xs rounded-md border transition ${
                      rw === p.rw && rh === p.rh
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="block mb-2">Known dimension</Label>
              <div className="flex items-center gap-3">
                <div
                  className="inline-flex rounded-md bg-gray-100 dark:bg-gray-800 p-0.5"
                  role="radiogroup"
                >
                  <button
                    role="radio"
                    aria-checked={knownSide === 'w'}
                    onClick={() => setKnownSide('w')}
                    className={`px-3 py-1.5 text-sm rounded ${
                      knownSide === 'w'
                        ? 'bg-white dark:bg-gray-700 shadow-sm'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    Width
                  </button>
                  <button
                    role="radio"
                    aria-checked={knownSide === 'h'}
                    onClick={() => setKnownSide('h')}
                    className={`px-3 py-1.5 text-sm rounded ${
                      knownSide === 'h'
                        ? 'bg-white dark:bg-gray-700 shadow-sm'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    Height
                  </button>
                </div>
                <Input
                  type="number"
                  min={1}
                  value={knownValue || ''}
                  onChange={e => setKnownValue(Number(e.target.value))}
                  className="flex-1 text-center text-lg font-semibold"
                />
                <span className="text-sm text-gray-500">px</span>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 dark:bg-gray-800/60 p-5 text-center">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">
                Result
              </p>
              {solved ? (
                <>
                  <p className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-400">
                    {solved.w} × {solved.h}
                  </p>
                  <button
                    type="button"
                    onClick={() => copy(`${solved.w}x${solved.h}`, 'dimensions')}
                    className="mt-3 inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Copy className="w-3 h-3" /> Copy {solved.w}×{solved.h}
                  </button>
                </>
              ) : (
                <p className="text-gray-400 text-sm mt-2">Enter a positive value to solve</p>
              )}
            </div>
          </Card>
        )}
      </div>
    </ToolContainer>
  );
};

export default AspectRatio;

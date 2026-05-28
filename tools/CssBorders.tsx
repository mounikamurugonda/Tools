'use client';

import React, { useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import Slider from '@/components/ui/Slider';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy } from 'lucide-react';

const BORDER_STYLES = [
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
  'none',
  'hidden',
] as const;

type BorderStyle = (typeof BORDER_STYLES)[number];

const CssBorders: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [style, setStyle] = useState<BorderStyle>('solid');
  const [width, setWidth] = useState(4);
  const [radius, setRadius] = useState(8);
  const [color, setColor] = useState('#3b82f6');

  const cssValue = useMemo(
    () => `${width}px ${style} ${color}`,
    [width, style, color]
  );
  const cssRule = useMemo(
    () => `border: ${cssValue};\nborder-radius: ${radius}px;`,
    [cssValue, radius]
  );
  const tailwindValue = useMemo(() => {
    const styleClass =
      style === 'solid' || style === 'dashed' || style === 'dotted' || style === 'double' || style === 'none'
        ? `border-${style}`
        : `[border-style:${style}]`;
    return `border-[${width}px] ${styleClass} border-[${color}] rounded-[${radius}px]`;
  }, [width, style, color, radius]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <ToolContainer title="CSS Border Generator" details={details} toolId={toolId}>
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div>
            <Label className="mb-2 block">Border Style</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BORDER_STYLES.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStyle(s)}
                  aria-pressed={style === s}
                  className={`flex items-center justify-center py-3 rounded-lg border text-center transition-all ${
                    style === s
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-1 ring-blue-500 text-blue-700 dark:text-blue-300'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <span className="font-mono text-xs font-medium">{s}</span>
                </button>
              ))}
            </div>
          </div>

          <Slider
            label="Width"
            valueDisplay={`${width}px`}
            value={width}
            min={0}
            max={20}
            onChange={e => setWidth(Number(e.target.value))}
          />
          <Slider
            label="Border Radius"
            valueDisplay={`${radius}px`}
            value={radius}
            min={0}
            max={100}
            onChange={e => setRadius(Number(e.target.value))}
          />

          <div>
            <Label className="mb-2 block">Color</Label>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 w-full">
              <div className="relative w-8 h-8 rounded overflow-hidden border border-gray-200 dark:border-gray-600 flex-shrink-0">
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 border-0 cursor-pointer"
                  aria-label="Border color"
                />
              </div>
              <input
                type="text"
                value={color}
                onChange={e => setColor(e.target.value)}
                className="flex-1 bg-transparent border-none text-sm font-mono focus:ring-0 p-0 text-gray-800 dark:text-gray-200"
                aria-label="Border color hex"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 md:sticky md:top-6">
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="min-h-[300px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden bg-gray-50 dark:bg-gray-900/50">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div
                className="w-40 h-40 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 text-sm relative z-10 transition-all"
                style={{ border: cssValue, borderRadius: `${radius}px` }}
              >
                {style}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center gap-2">
              <Label>CSS Output</Label>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" onClick={() => copy(cssRule, 'CSS')} className="h-7 text-xs px-2">
                  <Copy className="w-3 h-3 mr-1.5" /> CSS
                </Button>
                <Button size="sm" variant="ghost" onClick={() => copy(tailwindValue, 'Tailwind')} className="h-7 text-xs px-2">
                  <Copy className="w-3 h-3 mr-1.5" /> Tailwind
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <pre className="p-4 text-gray-800 dark:text-gray-200 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
                <code>{cssRule}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default CssBorders;

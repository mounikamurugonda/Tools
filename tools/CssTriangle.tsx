'use client';

import React, { useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import Slider from '@/components/ui/Slider';
import { useToast } from '@/components/ui/ToastProvider';
import {
  Copy,
  ChevronUp,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
} from 'lucide-react';

type Direction =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

const DIRECTIONS: { val: Direction; icon: React.ElementType; rotate?: string }[] = [
  { val: 'top', icon: ChevronUp },
  { val: 'right', icon: ChevronRight },
  { val: 'bottom', icon: ChevronDown },
  { val: 'left', icon: ChevronLeft },
  { val: 'top-left', icon: ChevronUp, rotate: '-rotate-45' },
  { val: 'top-right', icon: ChevronUp, rotate: 'rotate-45' },
  { val: 'bottom-left', icon: ChevronDown, rotate: 'rotate-45' },
  { val: 'bottom-right', icon: ChevronDown, rotate: '-rotate-45' },
];

function borderFor(
  direction: Direction,
  color: string,
  width: number,
  height: number
): { borderWidth: string; borderColor: string } {
  const w = width;
  const h = height;
  const t = 'transparent';
  switch (direction) {
    case 'top':
      return { borderWidth: `0 ${w / 2}px ${h}px ${w / 2}px`, borderColor: `${t} ${t} ${color} ${t}` };
    case 'bottom':
      return { borderWidth: `${h}px ${w / 2}px 0 ${w / 2}px`, borderColor: `${color} ${t} ${t} ${t}` };
    case 'left':
      return { borderWidth: `${h / 2}px ${w}px ${h / 2}px 0`, borderColor: `${t} ${color} ${t} ${t}` };
    case 'right':
      return { borderWidth: `${h / 2}px 0 ${h / 2}px ${w}px`, borderColor: `${t} ${t} ${t} ${color}` };
    case 'top-left':
      return { borderWidth: `${h}px ${w}px 0 0`, borderColor: `${color} ${t} ${t} ${t}` };
    case 'top-right':
      return { borderWidth: `0 ${w}px ${h}px 0`, borderColor: `${t} ${color} ${t} ${t}` };
    case 'bottom-right':
      return { borderWidth: `0 0 ${h}px ${w}px`, borderColor: `${t} ${t} ${color} ${t}` };
    case 'bottom-left':
      return { borderWidth: `${h}px 0 0 ${w}px`, borderColor: `${t} ${t} ${t} ${color}` };
  }
}

const CssTriangle: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [direction, setDirection] = useState<Direction>('top');
  const [color, setColor] = useState('#3b82f6');
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  const border = useMemo(
    () => borderFor(direction, color, width, height),
    [direction, color, width, height]
  );

  const styleObj: React.CSSProperties = {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: border.borderWidth,
    borderColor: border.borderColor,
  };

  const cssOutput = `width: 0;
height: 0;
border-style: solid;
border-width: ${border.borderWidth};
border-color: ${border.borderColor};`;

  const cssRule = `.triangle {
  ${cssOutput.replace(/\n/g, '\n  ')}
}`;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <ToolContainer title="CSS Triangle Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div>
            <Label className="mb-2 block">Direction</Label>
            <div className="grid grid-cols-4 gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
              {DIRECTIONS.map(({ val, icon: Icon, rotate }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setDirection(val)}
                  aria-pressed={direction === val}
                  className={`py-2 rounded-md transition-all flex items-center justify-center ${
                    direction === val
                      ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                  title={val}
                >
                  <Icon size={18} className={rotate} />
                </button>
              ))}
            </div>
          </div>

          <Slider
            label="Width"
            valueDisplay={`${width}px`}
            value={width}
            min={0}
            max={300}
            onChange={e => setWidth(Number(e.target.value))}
          />
          <Slider
            label="Height"
            valueDisplay={`${height}px`}
            value={height}
            min={0}
            max={300}
            onChange={e => setHeight(Number(e.target.value))}
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
                  aria-label="Triangle color"
                />
              </div>
              <input
                type="text"
                value={color}
                onChange={e => setColor(e.target.value)}
                className="flex-1 bg-transparent border-none text-sm font-mono focus:ring-0 p-0 text-gray-800 dark:text-gray-200"
                aria-label="Triangle color hex"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 md:sticky md:top-6">
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="min-h-[300px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden bg-gray-50 dark:bg-gray-900/50">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div style={styleObj} className="transition-all duration-200 relative z-10 drop-shadow-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center gap-2">
              <Label>CSS Output</Label>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copy(cssOutput, 'CSS')}
                  className="h-7 text-xs px-2"
                >
                  <Copy className="w-3 h-3 mr-1.5" /> Copy
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copy(cssRule, 'rule')}
                  className="h-7 text-xs px-2"
                >
                  <Copy className="w-3 h-3 mr-1.5" /> Copy rule
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <pre className="p-4 text-gray-800 dark:text-gray-200 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
                <code>{cssOutput}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default CssTriangle;

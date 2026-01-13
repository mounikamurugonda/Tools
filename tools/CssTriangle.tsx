'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import { Copy, ChevronUp, ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react';

const CssTriangle: React.FC<ToolProps> = ({ details, toolId }) => {
  const [direction, setDirection] = useState('top');
  const [color, setColor] = useState('#3b82f6');
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  const getBorderStyles = () => {
    const styles: any = {
      width: 0,
      height: 0,
      borderStyle: 'solid',
    };

    switch (direction) {
      case 'top':
        styles.borderWidth = `0 ${width / 2}px ${height}px ${width / 2}px`;
        styles.borderColor = `transparent transparent ${color} transparent`;
        break;
      case 'bottom':
        styles.borderWidth = `${height}px ${width / 2}px 0 ${width / 2}px`;
        styles.borderColor = `${color} transparent transparent transparent`;
        break;
      case 'left':
        styles.borderWidth = `${height / 2}px ${width}px ${height / 2}px 0`;
        styles.borderColor = `transparent ${color} transparent transparent`;
        break;
      case 'right':
        styles.borderWidth = `${height / 2}px 0 ${height / 2}px ${width}px`;
        styles.borderColor = `transparent transparent transparent ${color}`;
        break;
    }
    return styles;
  };

  const cssOutput = `width: 0;
height: 0;
border-style: solid;
border-width: ${getBorderStyles().borderWidth};
border-color: ${getBorderStyles().borderColor};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput);
  };

  return (
    <ToolContainer title="CSS Triangle Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-8 items-start">

        {/* Left Side: Controls */}
        <div className="space-y-6">

          {/* Direction Toggle */}
          <div>
            <Label className="mb-2 block">Direction</Label>
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 w-full mb-4">
              {[
                { val: 'top', icon: ChevronUp },
                { val: 'right', icon: ChevronRight },
                { val: 'bottom', icon: ChevronDown },
                { val: 'left', icon: ChevronLeft },
              ].map(({ val, icon: Icon }) => (
                <button
                  key={val}
                  onClick={() => setDirection(val)}
                  className={`flex-1 py-2 rounded-md transition-all flex items-center justify-center ${direction === val
                    ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                    }`}
                  title={val.charAt(0).toUpperCase() + val.slice(1)}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <ControlSlider label="Width" value={width} onChange={setWidth} min={0} max={300} unit="px" />
            <ControlSlider label="Height" value={height} onChange={setHeight} min={0} max={300} unit="px" />
          </div>

          <div>
            <Label className="mb-2 block">Color</Label>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 w-full">
              <div className="relative w-8 h-8 rounded overflow-hidden border border-gray-200 dark:border-gray-600 flex-shrink-0">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 border-0 cursor-pointer" />
              </div>
              <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 bg-transparent border-none text-sm font-mono focus:ring-0 p-0" />
            </div>
          </div>
        </div>

        {/* Right Side: Preview & Code */}
        <div className="space-y-6 sticky top-6">
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="min-h-[300px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden bg-gray-50 dark:bg-gray-900/50">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div style={getBorderStyles()} className="transition-all duration-200 relative z-10 drop-shadow-sm"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>CSS Output</Label>
              <Button size="sm" variant="ghost" onClick={copyToClipboard} className="h-6 text-xs text-blue-600 hover:bg-blue-50 px-2">
                <Copy className="w-3 h-3 mr-1.5" /> Copy Code
              </Button>
            </div>
            <div className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
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

const ControlSlider = ({ label, value, onChange, min = 0, max, step = 1, unit = '' }: any) => (
  <div>
    <div className="flex justify-between mb-2">
      <Label className="text-sm">{label}</Label>
      <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 focus:outline-none transition-all"
    />
  </div>
);

export default CssTriangle;

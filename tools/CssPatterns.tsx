'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Grid, Circle, Square } from 'lucide-react';

const PATTERNS = [
  {
    name: 'Stripes',
    icon: Square, // Placeholder icon logic
    css: 'linear-gradient(45deg, #000000 25%, transparent 25%, transparent 50%, #000000 50%, #000000 75%, transparent 75%, transparent)',
  },
  {
    name: 'Checks',
    icon: Grid,
    css: 'linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000), linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000)',
  },
  {
    name: 'Dots',
    icon: Circle,
    css: 'radial-gradient(#000000 1px, transparent 1px)'
  },
  {
    name: 'Grid',
    icon: Grid, // Reusing Grid for now
    css: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)',
  },
];

const CssPatterns: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [selected, setSelected] = useState(0);
  const [color, setColor] = useState('#3b82f6');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(0.1);
  const [size, setSize] = useState(20);

  const activePattern = PATTERNS[selected];

  // Helper to replace template color with actual RGBA
  const getPatternCss = () => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;

    return activePattern.css.replace(/#000000/g, rgba);
  };

  const finalStyle = {
    backgroundColor: bgColor,
    backgroundImage: getPatternCss(),
    backgroundSize: activePattern.name === 'Checks' ? `${size}px ${size}px` : `${size}px ${size}px`,
    backgroundPosition:
      activePattern.name === 'Checks' ? `0 0, ${size / 2}px ${size / 2}px` : undefined,
  };

  const cssCode = `background-color: ${bgColor};
background-image: ${getPatternCss()};
background-size: ${size}px ${size}px;${activePattern.name === 'Checks' ? `\nbackground-position: 0 0, ${size / 2}px ${size / 2}px;` : ''}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      toast.success('Copied CSS');
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <ToolContainer title="CSS Background Patterns" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-8 items-start">

        {/* Left Side: Controls */}
        <div className="space-y-6">

          {/* Pattern Selection */}
          <div>
            <Label className="mb-3 block">Pattern Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {PATTERNS.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setSelected(i)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${selected === i
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 text-gray-600 dark:text-gray-400'
                    }`}
                >
                  <span className="font-medium text-sm">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-6 space-y-6">
            <ControlSlider label="Pattern Scale" value={size} onChange={setSize} min={4} max={100} unit="px" />
            <ControlSlider label="Opacity" value={opacity} onChange={setOpacity} max={1} step={0.01} unit="%" displayMultiplier={100} />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-6 space-y-4">
            <Label>Colors</Label>
            <div className="grid gap-3">
              <ColorRow label="Pattern Color" value={color} onChange={setColor} />
              <ColorRow label="Background Color" value={bgColor} onChange={setBgColor} />
            </div>
          </div>

        </div>

        {/* Right Side: Preview & Code */}
        <div className="space-y-6 sticky top-6">
          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="h-[350px] w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden relative">
              <div className="w-full h-full transition-all duration-300" style={finalStyle as any} />
            </div>
          </div>

          {/* Code Output */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>CSS Output</Label>
              <Button size="sm" variant="ghost" onClick={copyToClipboard} className="h-6 text-xs text-blue-600 hover:bg-blue-50 px-2">
                <Copy className="w-3 h-3 mr-1.5" /> Copy Code
              </Button>
            </div>
            <div className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <pre className="p-4 text-gray-800 dark:text-gray-200 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
                <code>{cssCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

// Reusable Components
const ControlSlider = ({ label, value, onChange, min = 0, max, step = 1, unit = '', displayMultiplier = 1 }: any) => (
  <div>
    <div className="flex justify-between mb-2">
      <Label className="text-sm">{label}</Label>
      <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">{Math.round(value * displayMultiplier)}{unit}</span>
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

const ColorRow = ({ label, value, onChange }: any) => (
  <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
    <Label className="mb-0 text-xs font-medium text-gray-600 dark:text-gray-400">{label}</Label>
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm flex-shrink-0">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 border-0 cursor-pointer" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-20 text-xs font-mono bg-transparent border-none focus:ring-0 text-right text-gray-600 dark:text-gray-300"
      />
    </div>
  </div>
);

export default CssPatterns;

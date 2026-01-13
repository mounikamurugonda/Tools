'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { Copy } from 'lucide-react';

const TextShadowGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [hOffset, setHOffset] = useState(2);
  const [vOffset, setVOffset] = useState(2);
  const [blur, setBlur] = useState(4);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.5);
  const [textColor, setTextColor] = useState('#4B5563'); // gray-600
  const [backgroundColor, setBackgroundColor] = useState('#E5E7EB'); // gray-200

  const colorWithOpacity = useMemo(() => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }, [color, opacity]);

  const textShadowValue = `${hOffset}px ${vOffset}px ${blur}px ${colorWithOpacity}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`text-shadow: ${textShadowValue};`);
  };

  return (
    <ToolContainer title="Text Shadow Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-8 items-start">

        {/* Left Side: Controls */}
        <div className="space-y-8">

          <div className="space-y-6">
            <ControlSlider label="Horizontal Offset" value={hOffset} onChange={setHOffset} min={-20} max={20} unit="px" />
            <ControlSlider label="Vertical Offset" value={vOffset} onChange={setVOffset} min={-20} max={20} unit="px" />
            <ControlSlider label="Blur Radius" value={blur} onChange={setBlur} max={20} unit="px" />
            <ControlSlider label="Shadow Opacity" value={opacity} onChange={setOpacity} max={1} step={0.01} unit="%" displayMultiplier={100} />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-6 space-y-4">
            <Label>Colors</Label>
            <div className="grid grid-cols-1 gap-3">
              <ColorRow label="Shadow Color" value={color} onChange={setColor} />
              <ColorRow label="Text Color" value={textColor} onChange={setTextColor} />
              <ColorRow label="Background Color" value={backgroundColor} onChange={setBackgroundColor} />
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Text Shadow Tips
            </h4>
            <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <p>• <strong>Subtle depth:</strong> Small offsets (1-2px) with low blur</p>
              <p>• <strong>Glow effect:</strong> Zero offset, high blur</p>
              <p>• <strong>Letterpress:</strong> Light shadow on dark bg (inset style)</p>
            </div>
          </div>
        </div>

        {/* Right Side: Preview & Code */}
        <div className="space-y-6 sticky top-6">
          <div className="space-y-2">
            <Label>Preview</Label>
            <div
              className="min-h-[300px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden transition-colors duration-300"
              style={{ backgroundColor }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-5 mix-blend-overlay"></div>
              <h2
                className="text-5xl font-bold transition-all duration-300 p-8 text-center leading-tight break-words max-w-full"
                style={{
                  color: textColor,
                  textShadow: textShadowValue,
                }}
              >
                Text Shadow <br /> Generator
              </h2>
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
                <code>text-shadow: {textShadowValue};</code>
              </pre>
            </div>
          </div>

          {/* Full Example Code - Optional but good for this tool */}
          <div className="space-y-2 opacity-80">
            <Label className="text-xs text-gray-400 font-normal">Full CSS Context</Label>
            <div className="relative group overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
              <pre className="p-3 text-gray-500 dark:text-gray-400 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
                <code>{`.text-shadow-example {
  color: ${textColor};
  background-color: ${backgroundColor};
  text-shadow: ${textShadowValue};
}`}</code>
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
  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
    <Label className="mb-0 text-xs font-medium text-gray-600 dark:text-gray-400">{label}</Label>
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-gray-400">{value}</span>
      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 border-0 cursor-pointer" />
      </div>
    </div>
  </div>
);

export default TextShadowGenerator;

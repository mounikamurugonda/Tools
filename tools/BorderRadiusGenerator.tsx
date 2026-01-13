'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { Copy, Link2, Link2Off } from 'lucide-react';

const BorderRadiusGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [topLeft, setTopLeft] = useState(10);
  const [topRight, setTopRight] = useState(10);
  const [bottomLeft, setBottomLeft] = useState(10);
  const [bottomRight, setBottomRight] = useState(10);
  const [unit, setUnit] = useState<'px' | '%'>('px');
  const [linkCorners, setLinkCorners] = useState(false);

  const borderRadiusValue = useMemo(() => {
    if (linkCorners) {
      return `${topLeft}${unit}`;
    }
    return `${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit}`;
  }, [topLeft, topRight, bottomLeft, bottomRight, unit, linkCorners]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`border-radius: ${borderRadiusValue};`);
  };

  const handleLinkedChange = (val: number) => {
    setTopLeft(val);
    if (linkCorners) {
      setTopRight(val);
      setBottomLeft(val);
      setBottomRight(val);
    }
  };

  const updateCorner = (corner: 'tl' | 'tr' | 'bl' | 'br', val: number) => {
    if (linkCorners) {
      handleLinkedChange(val);
      return;
    }
    switch (corner) {
      case 'tl': setTopLeft(val); break;
      case 'tr': setTopRight(val); break;
      case 'bl': setBottomLeft(val); break;
      case 'br': setBottomRight(val); break;
    }
  };

  return (
    <ToolContainer title="Border Radius Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">

        {/* Left Side: Controls */}
        <div className="space-y-6">

          {/* Global Settings */}
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <Label className="mb-0">Unit</Label>
              <div className="flex bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-0.5">
                <button
                  onClick={() => setUnit('px')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-all ${unit === 'px' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                >
                  px
                </button>
                <button
                  onClick={() => setUnit('%')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-all ${unit === '%' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                >
                  %
                </button>
              </div>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setLinkCorners(!linkCorners)}
              className={`h-8 gap-2 ${linkCorners ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-500'}`}
            >
              {linkCorners ? <Link2 className="w-4 h-4" /> : <Link2Off className="w-4 h-4" />}
              <span className="text-xs">{linkCorners ? 'Linked' : 'Unlinked'}</span>
            </Button>
          </div>

          {/* Sliders */}
          <div className="space-y-6">
            <CornerSlider
              label="Top Left"
              value={topLeft}
              unit={unit}
              onChange={(v) => updateCorner('tl', v)}
              max={unit === 'px' ? 100 : 50}
            />
            <CornerSlider
              label="Top Right"
              value={topRight}
              unit={unit}
              onChange={(v) => updateCorner('tr', v)}
              max={unit === 'px' ? 100 : 50}
              disabled={linkCorners}
            />
            <CornerSlider
              label="Bottom Right"
              value={bottomRight}
              unit={unit}
              onChange={(v) => updateCorner('br', v)}
              max={unit === 'px' ? 100 : 50}
              disabled={linkCorners}
            />
            <CornerSlider
              label="Bottom Left"
              value={bottomLeft}
              unit={unit}
              onChange={(v) => updateCorner('bl', v)}
              max={unit === 'px' ? 100 : 50}
              disabled={linkCorners}
            />
          </div>

          {/* Shape Ideas (Styled as a tip card) */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">Shape Ideas</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-blue-700 dark:text-blue-300">
              <div>• <strong>Pill:</strong> 9999px</div>
              <div>• <strong>Circle:</strong> 50%</div>
              <div>• <strong>Leaf:</strong> 0px on one corner</div>
              <div>• <strong>Card:</strong> 12px sm / 24px lg</div>
            </div>
          </div>
        </div>

        {/* Right Side: Preview & Code */}
        <div className="space-y-6 sticky top-6">
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="min-h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 relative z-0 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-100"></div>

              <div
                className="w-48 h-48 bg-blue-500 shadow-xl transition-all duration-300 ease-in-out relative z-10 flex items-center justify-center"
                style={{ borderRadius: borderRadiusValue }}
              >
                <span className="text-white/80 font-medium text-sm">Content</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Generated Code</Label>
              <Button size="sm" variant="ghost" onClick={copyToClipboard} className="h-6 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2">
                <Copy className="w-3 h-3 mr-1.5" /> Copy Code
              </Button>
            </div>
            <div className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <pre className="p-4 text-gray-800 dark:text-gray-200 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
                <code>border-radius: {borderRadiusValue};</code>
              </pre>
            </div>
          </div>

          {/* Visual Values Summary */}
          <div className="grid grid-cols-2 gap-3">
            <ValueBox label="Top Left" value={topLeft} unit={unit} />
            <ValueBox label="Top Right" value={topRight} unit={unit} />
            <ValueBox label="Bottom Left" value={bottomLeft} unit={unit} />
            <ValueBox label="Bottom Right" value={bottomRight} unit={unit} />
          </div>
        </div>

      </div>
    </ToolContainer>
  );
};

const CornerSlider = ({ label, value, unit, onChange, max, disabled }: { label: string, value: number, unit: string, onChange: (v: number) => void, max: number, disabled?: boolean }) => (
  <div className={disabled ? 'opacity-50 pointer-events-none' : ''}>
    <div className="flex justify-between mb-2">
      <Label className="text-sm">{label}</Label>
      <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{value}{unit}</span>
    </div>
    <input
      type="range"
      min="0"
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 focus:outline-none transition-all"
    />
  </div>
);

const ValueBox = ({ label, value, unit }: { label: string, value: number, unit: string }) => (
  <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg border border-gray-100 dark:border-gray-800 text-center">
    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">{label}</div>
    <div className="font-mono text-sm text-gray-900 dark:text-gray-100">{value}{unit}</div>
  </div>
);

export default BorderRadiusGenerator;

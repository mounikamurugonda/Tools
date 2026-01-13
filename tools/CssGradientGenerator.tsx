'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { Plus, Trash2, Copy, RefreshCw, GripVertical } from 'lucide-react';

interface ColorStop {
  id: number;
  color: string;
  position: number;
}

const PRESETS = [
  { name: 'Sunset', colors: [{ color: '#ff7e5f', position: 0 }, { color: '#feb47b', position: 100 }] },
  { name: 'Ocean', colors: [{ color: '#2193b0', position: 0 }, { color: '#6dd5ed', position: 100 }] },
  { name: 'Lush', colors: [{ color: '#56ab2f', position: 0 }, { color: '#a8e063', position: 100 }] },
  { name: 'Royal', colors: [{ color: '#6a11cb', position: 0 }, { color: '#2575fc', position: 100 }] },
  { name: 'Mango', colors: [{ color: '#f2c94c', position: 0 }, { color: '#f2994a', position: 100 }] },
  { name: 'Mojito', colors: [{ color: '#1d976c', position: 0 }, { color: '#93f9b9', position: 100 }] },
  { name: 'Cherry', colors: [{ color: '#eb3349', position: 0 }, { color: '#f45c43', position: 100 }] },
  { name: 'Aurora', colors: [{ color: '#bbd2c5', position: 0 }, { color: '#536976', position: 50 }, { color: '#292e49', position: 100 }] },
];

const CssGradientGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [colors, setColors] = useState<ColorStop[]>([
    { id: 1, color: '#3b82f6', position: 0 },
    { id: 2, color: '#8b5cf6', position: 100 },
  ]);
  const [angle, setAngle] = useState(45);
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [radialShape, setRadialShape] = useState<'circle' | 'ellipse'>('circle');
  const [position, setPosition] = useState('center');

  const gradientValue = useMemo(() => {
    const sortedColors = [...colors].sort((a, b) => a.position - b.position);
    const colorStops = sortedColors.map(c => `${c.color} ${c.position}%`).join(', ');
    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${colorStops})`;
    } else {
      return `radial-gradient(${radialShape} at ${position}, ${colorStops})`;
    }
  }, [colors, angle, gradientType, radialShape, position]);

  const sortedColors = useMemo(() => [...colors].sort((a, b) => a.position - b.position), [colors]);

  const addColor = () => {
    const newId = Date.now();
    // smart add: find largest gap or append
    setColors([...colors, { id: newId, color: '#ffffff', position: 50 }]);
  };

  const removeColor = (id: number) => {
    if (colors.length > 2) {
      setColors(colors.filter(c => c.id !== id));
    }
  };

  const updateColor = (id: number, updates: Partial<ColorStop>) => {
    setColors(colors.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const applyPreset = (presetColors: Omit<ColorStop, 'id'>[]) => {
    setColors(presetColors.map((c, i) => ({ ...c, id: Date.now() + i })));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`background: ${gradientValue};`);
  };

  return (
    <ToolContainer title="CSS Gradient Generator" details={details} toolId={toolId}>
      <div className="grid lg:grid-cols-2 gap-8 items-start">

        {/* Left Side: Controls */}
        <div className="space-y-8">

          {/* Type Toggle */}
          <div>
            <Label className="mb-2 block">Gradient Type</Label>
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 w-full">
              <button
                onClick={() => setGradientType('linear')}
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${gradientType === 'linear' ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
              >
                Linear
              </button>
              <button
                onClick={() => setGradientType('radial')}
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${gradientType === 'radial' ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
              >
                Radial
              </button>
            </div>
          </div>

          {/* Configuration Grid */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
            {gradientType === 'linear' ? (
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-sm">Angle</Label>
                  <span className="text-xs text-gray-500 font-mono">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 focus:outline-none transition-all"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs mb-1.5 block">Shape</Label>
                  <select
                    value={radialShape}
                    onChange={(e) => setRadialShape(e.target.value as any)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="circle">Circle</option>
                    <option value="ellipse">Ellipse</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs mb-1.5 block">Position</Label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Color Stops */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Color Stops</Label>
              <Button size="sm" variant="ghost" onClick={addColor} className="h-7 text-xs text-blue-600 hover:bg-blue-50 px-2">
                <Plus className="w-3 h-3 mr-1" /> Add Color
              </Button>
            </div>

            <div className="space-y-3">
              {sortedColors.map((stop, index) => (
                <div key={stop.id} className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm group">
                  <div className="cursor-move text-gray-400">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600 flex-shrink-0">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateColor(stop.id, { color: e.target.value })}
                      className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 m-0 border-0 cursor-pointer"
                    />
                  </div>

                  <div className="flex-1 px-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={(e) => updateColor(stop.id, { position: Number(e.target.value) })}
                      className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-gray-400 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-blue-500 focus:outline-none transition-all"
                    />
                  </div>

                  <span className="text-xs font-mono text-gray-500 w-8 text-right">{stop.position}%</span>

                  {colors.length > 2 && (
                    <button
                      onClick={() => removeColor(stop.id)}
                      className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Presets Grid */}
          <div>
            <Label className="mb-3 block">Quick Presets</Label>
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p.colors)}
                  className="h-10 rounded-lg border border-gray-200 dark:border-gray-700 hover:scale-105 hover:shadow-md transition-all active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${p.colors[0].color}, ${p.colors[1].color})` }}
                  title={p.name}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Preview & Code */}
        <div className="space-y-6 sticky top-6">
          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="h-[300px] w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
              <div
                className="absolute inset-0 transition-all duration-300"
                style={{ background: gradientValue }}
              />
            </div>
          </div>

          {/* Code Output */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>CSS Output</Label>
              <Button size="sm" variant="ghost" onClick={copyToClipboard} className="h-6 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2">
                <Copy className="w-3 h-3 mr-1.5" /> Copy
              </Button>
            </div>
            <div className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <pre className="p-4 text-gray-800 dark:text-gray-200 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
                <code>background: {gradientValue};</code>
              </pre>
            </div>
          </div>

        </div>
      </div>
    </ToolContainer>
  );
};

export default CssGradientGenerator;

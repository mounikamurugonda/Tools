'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import { Plus, Trash2, Copy, RefreshCw } from 'lucide-react';

interface ColorStop {
  id: number;
  color: string;
  position: number;
}

const PRESETS = [
  {
    name: 'Sunset',
    colors: [
      { color: '#ff7e5f', position: 0 },
      { color: '#feb47b', position: 100 },
    ],
  },
  {
    name: 'Ocean',
    colors: [
      { color: '#2193b0', position: 0 },
      { color: '#6dd5ed', position: 100 },
    ],
  },
  {
    name: 'Lush',
    colors: [
      { color: '#56ab2f', position: 0 },
      { color: '#a8e063', position: 100 },
    ],
  },
  {
    name: 'Royal',
    colors: [
      { color: '#6a11cb', position: 0 },
      { color: '#2575fc', position: 100 },
    ],
  },
  {
    name: 'Mango',
    colors: [
      { color: '#f2c94c', position: 0 },
      { color: '#f2994a', position: 100 },
    ],
  },
  {
    name: 'Mojito',
    colors: [
      { color: '#1d976c', position: 0 },
      { color: '#93f9b9', position: 100 },
    ],
  },
  {
    name: 'Cherry',
    colors: [
      { color: '#eb3349', position: 0 },
      { color: '#f45c43', position: 100 },
    ],
  },
  {
    name: 'Aurora',
    colors: [
      { color: '#bbd2c5', position: 0 },
      { color: '#536976', position: 50 },
      { color: '#292e49', position: 100 },
    ],
  },
  {
    name: 'Emerald',
    colors: [
      { color: '#348f50', position: 0 },
      { color: '#56b4d3', position: 100 },
    ],
  },
  {
    name: 'Grapefruit',
    colors: [
      { color: '#e96443', position: 0 },
      { color: '#904e95', position: 100 },
    ],
  },
];

const CssGradientGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [colors, setColors] = useState<ColorStop[]>([
    { id: 1, color: '#3b82f6', position: 0 },
    { id: 2, color: '#8b5cf6', position: 100 },
  ]);
  const [angle, setAngle] = useState(45);
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>(
    'linear',
  );
  const [radialShape, setRadialShape] = useState<'circle' | 'ellipse'>(
    'circle',
  );
  const [position, setPosition] = useState('center');

  const gradientValue = useMemo(() => {
    const sortedColors = [...colors].sort((a, b) => a.position - b.position);
    const colorStops = sortedColors
      .map((c) => `${c.color} ${c.position}%`)
      .join(', ');
    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${colorStops})`;
    } else {
      return `radial-gradient(${radialShape} at ${position}, ${colorStops})`;
    }
  }, [colors, angle, gradientType, radialShape, position]);

  const sortedColors = useMemo(
    () => [...colors].sort((a, b) => a.position - b.position),
    [colors],
  );

  const addColor = (index: number) => {
    const prevColor = sortedColors[index];
    const nextColor = sortedColors[index + 1];

    const newPosition = (prevColor.position + nextColor.position) / 2;

    const newColorValue = interpolateColor(
      prevColor.color,
      nextColor.color,
      0.5,
    );

    const newColor: ColorStop = {
      id: Date.now(),
      color: newColorValue,
      position: newPosition,
    };
    setColors([...colors, newColor]);
  };

  const removeColor = (id: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((c) => c.id !== id));
    }
  };

  const updateColor = (id: number, newColor?: string, newPosition?: number) => {
    setColors(
      colors.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            color: newColor !== undefined ? newColor : c.color,
            position: newPosition !== undefined ? newPosition : c.position,
          };
        }
        return c;
      }),
    );
  };

  const applyPreset = (presetColors: Omit<ColorStop, 'id'>[]) => {
    setColors(presetColors.map((c, i) => ({ ...c, id: Date.now() + i })));
  };

  const getPresetStyle = (p: (typeof PRESETS)[0]) => {
    const colorStops = p.colors
      .map((c) => `${c.color} ${c.position}%`)
      .join(', ');
    if (gradientType === 'linear') {
      return { background: `linear-gradient(45deg, ${colorStops})` };
    }
    return { background: `radial-gradient(circle at center, ${colorStops})` };
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`background: ${gradientValue};`);
  };

  return (
    <ToolContainer
      title="CSS Gradient Generator"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card title="Settings">
            <div className="space-y-6">
              <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <button
                  onClick={() => setGradientType('linear')}
                  className={`flex-1 py-1.5 px-3 text-sm font-medium rounded-md transition-all ${gradientType === 'linear' ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Linear
                </button>
                <button
                  onClick={() => setGradientType('radial')}
                  className={`flex-1 py-1.5 px-3 text-sm font-medium rounded-md transition-all ${gradientType === 'radial' ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Radial
                </button>
              </div>

              {gradientType === 'linear' && (
                <Slider
                  label="Angle"
                  value={angle}
                  onChange={(e) => setAngle(parseFloat(e.target.value))}
                  min={0}
                  max={360}
                  valueDisplay={`${angle}°`}
                />
              )}

              {gradientType === 'radial' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Shape</Label>
                    <Select
                      value={radialShape}
                      onChange={(e) => setRadialShape(e.target.value as 'circle' | 'ellipse')}
                    >
                      <option value="circle">Circle</option>
                      <option value="ellipse">Ellipse</option>
                    </Select>
                  </div>
                  <div>
                    <Label>Position</Label>
                    <Select
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    >
                      {['center', 'top left', 'top right', 'bottom left', 'bottom right', 'top', 'bottom', 'left', 'right'].map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </Select>
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Label className="text-base">Color Stops</Label>
                <div className="space-y-3">
                  {sortedColors.map((color, index) => (
                    <React.Fragment key={color.id}>
                      <ColorStopRow
                        {...color}
                        onUpdate={updateColor}
                        onRemove={removeColor}
                        canRemove={colors.length > 2}
                      />
                      {index < sortedColors.length - 1 && (
                        <div className="flex justify-center relative h-4">
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 dark:bg-gray-700 -z-10"></div>
                          <button
                            onClick={() => addColor(index)}
                            className="p-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-400 hover:text-blue-500 transition-colors shadow-sm"
                            title="Add color stop"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Preview" className="h-[300px] bg-gray-50 dark:bg-gray-800/50 flex flex-col p-4">
            <div
              className="flex-grow w-full rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
              style={{ background: gradientValue }}
            ></div>
          </Card>

          <Card className="relative group">
            <pre className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg text-sm font-mono overflow-x-auto border border-gray-200 dark:border-gray-800">
              <code>{`background: ${gradientValue};`}</code>
            </pre>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary" onClick={copyToClipboard} className="shadow-sm">
                <Copy className="w-3 h-3 mr-1" /> Copy
              </Button>
            </div>
          </Card>

          <Card title="Presets">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p.colors)}
                  className="h-12 w-full rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={getPresetStyle(p)}
                  title={p.name}
                ></button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

interface ColorStopRowProps extends ColorStop {
  onUpdate: (id: number, color?: string, position?: number) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
}

const ColorStopRow: React.FC<ColorStopRowProps> = ({ id, color, position, onUpdate, onRemove, canRemove }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      <div className="flex-shrink-0">
        <input
          type="color"
          value={color}
          onChange={(e) => onUpdate(id, e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 p-0 overflow-hidden"
        />
      </div>
      <div className="flex-grow mx-2">
        <Slider
          value={position}
          onChange={(e) => onUpdate(id, undefined, parseFloat(e.target.value))}
          min={0}
          max={100}
          className="w-full"
          valueDisplay={`${position}%`}
        />
      </div>
      {canRemove && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-red-500 px-2"
        >
          <Trash2 size={16} />
        </Button>
      )}
    </div>
  );
};

function interpolateColor(color1: string, color2: string, factor: number) {
  const result = color1
    .slice(1)
    .match(/.{2}/g)!
    .map((hex, i) => {
      const c1 = parseInt(hex, 16);
      const c2 = parseInt(color2.slice(1).match(/.{2}/g)![i], 16);
      const c = Math.round(c1 + factor * (c2 - c1));
      return ('0' + c.toString(16)).slice(-2);
    })
    .join('');
  return `#${result}`;
}

export default CssGradientGenerator;

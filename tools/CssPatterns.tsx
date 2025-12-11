'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import { Copy } from 'lucide-react';

const PATTERNS = [
  {
    name: 'Stripes',
    css: 'linear-gradient(45deg, #000000 25%, transparent 25%, transparent 50%, #000000 50%, #000000 75%, transparent 75%, transparent)',
  },
  {
    name: 'Checks',
    css: 'linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000), linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000)',
  },
  { name: 'Dots', css: 'radial-gradient(#000000 1px, transparent 1px)' },
  {
    name: 'Grid',
    css: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)',
  },
];

const CssPatterns: React.FC<ToolProps> = ({ details, toolId }) => {
  const [selected, setSelected] = useState(0);
  const [color, setColor] = useState('#3b82f6');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(0.1);
  const [size, setSize] = useState(20);

  const activePattern = PATTERNS[selected];

  // Replace template color with actual RGBA
  const getPatternCss = () => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;

    return activePattern.css.replace(/#000000/g, rgba);
  };

  const finalStyle = {
    backgroundColor: bgColor,
    backgroundImage: getPatternCss(),
    backgroundSize:
      activePattern.name === 'Checks'
        ? `${size}px ${size}px`
        : `${size}px ${size}px`,
    backgroundPosition:
      activePattern.name === 'Checks'
        ? `0 0, ${size / 2}px ${size / 2}px`
        : undefined,
  };

  const cssCode = `background-color: ${bgColor};
background-image: ${getPatternCss()};
background-size: ${size}px ${size}px;${activePattern.name === 'Checks' ? `\nbackground-position: 0 0, ${size / 2}px ${size / 2}px;` : ''}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
  };

  return (
    <ToolContainer
      title="CSS Background Patterns"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card title="Settings">
            <div className="space-y-6">
              <div>
                <Label>Pattern Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {PATTERNS.map((p, i) => (
                    <Button
                      key={p.name}
                      onClick={() => setSelected(i)}
                      variant={selected === i ? 'primary' : 'outline'}
                      size="sm"
                      className="w-full"
                    >
                      {p.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Pattern Color</Label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 w-12 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                  />
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-grow font-mono"
                  />
                </div>
                <Slider
                  label="Opacity"
                  min={0}
                  max={1}
                  step={0.01}
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  valueDisplay={`${Math.round(opacity * 100)}%`}
                />
              </div>

              <div>
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-12 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                  />
                  <Input
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-grow font-mono"
                  />
                </div>
              </div>

              <Slider
                label="Scale"
                min={4}
                max={100}
                value={size}
                onChange={(e) => setSize(parseFloat(e.target.value))}
                valueDisplay={`${size}px`}
              />
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card title="Preview" className="h-[300px] bg-gray-50 dark:bg-gray-800/50 flex flex-col p-0 overflow-hidden">
            <div
              className="flex-grow w-full h-full"
              style={finalStyle as any}
            ></div>
          </Card>

          <Card className="relative group">
            <pre className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg text-sm font-mono overflow-x-auto border border-gray-200 dark:border-gray-800">
              <code>{cssCode}</code>
            </pre>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary" onClick={copyToClipboard} className="shadow-sm">
                <Copy className="w-3 h-3 mr-1" /> Copy CSS
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default CssPatterns;

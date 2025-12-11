'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Slider from '@/components/ui/Slider';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import { Copy } from 'lucide-react';

const BoxShadowGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [hOffset, setHOffset] = useState(10);
  const [vOffset, setVOffset] = useState(10);
  const [blur, setBlur] = useState(5);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.5);
  const [inset, setInset] = useState(false);

  const colorWithOpacity = useMemo(() => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }, [color, opacity]);

  const boxShadowValue = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${colorWithOpacity}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`box-shadow: ${boxShadowValue};`);
  };

  return (
    <ToolContainer
      title="Box Shadow Generator"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card title="Settings">
            <div className="space-y-6">
              <Slider
                label="Horizontal Offset"
                value={hOffset}
                onChange={(e) => setHOffset(parseFloat(e.target.value))}
                min={-50}
                max={50}
                valueDisplay={`${hOffset}px`}
              />
              <Slider
                label="Vertical Offset"
                value={vOffset}
                onChange={(e) => setVOffset(parseFloat(e.target.value))}
                min={-50}
                max={50}
                valueDisplay={`${vOffset}px`}
              />
              <Slider
                label="Blur Radius"
                value={blur}
                onChange={(e) => setBlur(parseFloat(e.target.value))}
                min={0}
                max={100}
                valueDisplay={`${blur}px`}
              />
              <Slider
                label="Spread Radius"
                value={spread}
                onChange={(e) => setSpread(parseFloat(e.target.value))}
                min={-50}
                max={50}
                valueDisplay={`${spread}px`}
              />
              <Slider
                label="Opacity"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                min={0}
                max={1}
                step={0.01}
                valueDisplay={`${opacity}`}
              />

              <div className="flex items-center gap-4">
                <div className="flex-grow">
                  <Label>Shadow Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="h-10 w-12 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <Input
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-grow font-mono"
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inset}
                  onChange={() => setInset((p) => !p)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Inset</span>
              </label>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Preview" className="h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800/50">
            <div
              className="w-40 h-40 bg-blue-500 rounded-xl transition-all duration-300"
              style={{ boxShadow: boxShadowValue }}
            />
          </Card>

          <Card className="relative group">
            <pre className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg text-sm font-mono overflow-x-auto border border-gray-200 dark:border-gray-800">
              <code>box-shadow: {boxShadowValue};</code>
            </pre>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary" onClick={copyToClipboard} className="shadow-sm">
                <Copy className="w-3 h-3 mr-1" /> Copy
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default BoxShadowGenerator;

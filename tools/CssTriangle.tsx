'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
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
    <ToolContainer
      title="CSS Triangle Generator"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card title="Settings">
            <div className="space-y-6">
              <div>
                <Label>Direction</Label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { val: 'top', icon: ChevronUp },
                    { val: 'right', icon: ChevronRight },
                    { val: 'bottom', icon: ChevronDown },
                    { val: 'left', icon: ChevronLeft }
                  ].map(({ val, icon: Icon }) => (
                    <Button
                      key={val}
                      variant={direction === val ? 'primary' : 'outline'}
                      onClick={() => setDirection(val)}
                      className="flex items-center justify-center py-3"
                      title={val.charAt(0).toUpperCase() + val.slice(1)}
                    >
                      <Icon size={20} />
                    </Button>
                  ))}
                </div>
              </div>

              <Slider
                label="Width"
                min={0}
                max={300}
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                valueDisplay={`${width}px`}
              />

              <Slider
                label="Height"
                min={0}
                max={300}
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                valueDisplay={`${height}px`}
              />

              <div>
                <Label>Color</Label>
                <div className="flex gap-2">
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
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 relative">
            <div className="absolute top-4 left-4 text-sm font-medium text-gray-500 dark:text-gray-400 pointer-events-none select-none bg-white/50 dark:bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
              Preview
            </div>
            <div style={getBorderStyles()} className="transition-all duration-200"></div>
          </Card>

          <Card className="relative group">
            <pre className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg text-sm font-mono overflow-x-auto border border-gray-200 dark:border-gray-800 h-40">
              <code>{cssOutput}</code>
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

export default CssTriangle;

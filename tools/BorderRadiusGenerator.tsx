'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Slider from '@/components/ui/Slider';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { Copy } from 'lucide-react';

const BorderRadiusGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [topLeft, setTopLeft] = useState(10);
  const [topRight, setTopRight] = useState(10);
  const [bottomLeft, setBottomLeft] = useState(10);
  const [bottomRight, setBottomRight] = useState(10);
  const [unit, setUnit] = useState<'px' | '%'>('px');
  const [linkCorners, setLinkCorners] = useState(false);

  const borderRadiusValue = useMemo(() => {
    if (linkCorners) {
      const value = topLeft;
      return `${value}${unit}`;
    }
    return `${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit}`;
  }, [topLeft, topRight, bottomLeft, bottomRight, unit, linkCorners]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`border-radius: ${borderRadiusValue};`);
  };

  const handleLinkedChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(value.target.value);
    setTopLeft(val);
    if (linkCorners) {
      setTopRight(val);
      setBottomLeft(val);
      setBottomRight(val);
    }
  };

  return (
    <ToolContainer title="Border Radius Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card title="Settings">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="mb-0">Unit</Label>
                <div className="flex space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="px"
                      checked={unit === 'px'}
                      onChange={e => setUnit(e.target.value as 'px' | '%')}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">px</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="%"
                      checked={unit === '%'}
                      onChange={e => setUnit(e.target.value as 'px' | '%')}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">%</span>
                  </label>
                </div>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={linkCorners}
                  onChange={() => setLinkCorners(p => !p)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Link all corners
                </span>
              </label>

              <div className="space-y-4">
                <Slider
                  label="Top Left"
                  value={topLeft}
                  onChange={
                    linkCorners ? handleLinkedChange : e => setTopLeft(parseFloat(e.target.value))
                  }
                  min={0}
                  max={unit === 'px' ? 100 : 50}
                  valueDisplay={`${topLeft}${unit}`}
                />

                <Slider
                  label="Top Right"
                  value={topRight}
                  onChange={e => setTopRight(parseFloat(e.target.value))}
                  min={0}
                  max={unit === 'px' ? 100 : 50}
                  disabled={linkCorners}
                  valueDisplay={`${topRight}${unit}`}
                />

                <Slider
                  label="Bottom Right"
                  value={bottomRight}
                  onChange={e => setBottomRight(parseFloat(e.target.value))}
                  min={0}
                  max={unit === 'px' ? 100 : 50}
                  disabled={linkCorners}
                  valueDisplay={`${bottomRight}${unit}`}
                />

                <Slider
                  label="Bottom Left"
                  value={bottomLeft}
                  onChange={e => setBottomLeft(parseFloat(e.target.value))}
                  min={0}
                  max={unit === 'px' ? 100 : 50}
                  disabled={linkCorners}
                  valueDisplay={`${bottomLeft}${unit}`}
                />
              </div>
            </div>
          </Card>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/50">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Shape Ideas</h4>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <p>
                • <strong>Pill shape:</strong> 50% on all corners
              </p>
              <p>
                • <strong>Rounded square:</strong> 10-20px on all corners
              </p>
              <p>
                • <strong>Speech bubble:</strong> 0px on one corner
              </p>
              <p>
                • <strong>Card design:</strong> Different values for each corner
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800/50 relative">
            <div className="absolute top-4 left-4 text-sm font-medium text-gray-500 dark:text-gray-400 pointer-events-none select-none bg-white/50 dark:bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
              Preview
            </div>
            <div
              className="w-48 h-48 bg-blue-500 shadow-lg transition-all duration-300 ease-in-out"
              style={{ borderRadius: borderRadiusValue }}
            />
          </Card>

          <Card className="relative group">
            <pre className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg text-sm font-mono overflow-x-auto border border-gray-200 dark:border-gray-800">
              <code>border-radius: {borderRadiusValue};</code>
            </pre>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary" onClick={copyToClipboard} className="shadow-sm">
                <Copy className="w-3 h-3 mr-1" /> Copy
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: 'Top Left', value: topLeft },
              { label: 'Top Right', value: topRight },
              { label: 'Bottom Right', value: bottomRight },
              { label: 'Bottom Left', value: bottomLeft },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center border border-gray-200 dark:border-gray-700"
              >
                <div className="font-medium text-gray-900 dark:text-gray-100">{item.label}</div>
                <div className="text-gray-600 dark:text-gray-400">
                  {item.value}
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default BorderRadiusGenerator;

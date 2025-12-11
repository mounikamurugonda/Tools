'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
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

  const fullExample = `.text-shadow-example {
  color: ${textColor};
  text-shadow: ${textShadowValue};
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolContainer
      title="Text Shadow Generator"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card title="Settings">
            <div className="space-y-6">
              <Slider label="Horizontal Offset" value={hOffset} onChange={(e) => setHOffset(parseFloat(e.target.value))} min={-20} max={20} valueDisplay={`${hOffset}px`} />
              <Slider label="Vertical Offset" value={vOffset} onChange={(e) => setVOffset(parseFloat(e.target.value))} min={-20} max={20} valueDisplay={`${vOffset}px`} />
              <Slider label="Blur Radius" value={blur} onChange={(e) => setBlur(parseFloat(e.target.value))} min={0} max={20} valueDisplay={`${blur}px`} />
              <Slider label="Shadow Opacity" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} min={0} max={1} step={0.01} valueDisplay={`${Math.round(opacity * 100)}%`} />

              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
                  <Label className="mb-0">Shadow Color</Label>
                  <div className="flex gap-2">
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-9 rounded cursor-pointer border-0" />
                  </div>
                </div>
                <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
                  <Label className="mb-0">Text Color</Label>
                  <div className="flex gap-2">
                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-9 w-9 rounded cursor-pointer border-0" />
                  </div>
                </div>
                <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
                  <Label className="mb-0">Background Color</Label>
                  <div className="flex gap-2">
                    <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="h-9 w-9 rounded cursor-pointer border-0" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/50">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Text Shadow Tips
            </h4>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <p>• <strong>Subtle depth:</strong> Small offsets (1-2px) with low blur</p>
              <p>• <strong>Dramatic effect:</strong> Larger offsets with high blur</p>
              <p>• <strong>Glow effect:</strong> Zero offset, high blur</p>
              <p>• <strong>Multiple shadows:</strong> Use comma-separated values (advanced)</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card title="Preview" className="h-[250px] flex items-center justify-center p-0 overflow-hidden relative transition-colors duration-300" style={{ backgroundColor }}>
            <h2
              className="text-5xl font-bold transition-all duration-300 p-8 text-center leading-tight"
              style={{
                color: textColor,
                textShadow: textShadowValue,
              }}
            >
              Text Shadow <br /> Generator
            </h2>
          </Card>

          <Card className="space-y-4">
            <div className="relative group">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Shadow Value</div>
              <pre className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg text-sm font-mono overflow-x-auto border border-gray-200 dark:border-gray-800">
                <code>{`text-shadow: ${textShadowValue};`}</code>
              </pre>
              <div className="absolute top-8 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary" onClick={() => copyToClipboard(`text-shadow: ${textShadowValue};`)} className="shadow-sm">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="relative group">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Full CSS</div>
              <pre className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg text-sm font-mono overflow-x-auto border border-gray-200 dark:border-gray-800">
                <code>{fullExample}</code>
              </pre>
              <div className="absolute top-8 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary" onClick={() => copyToClipboard(fullExample)} className="shadow-sm">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default TextShadowGenerator;

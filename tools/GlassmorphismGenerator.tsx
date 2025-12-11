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

const GlassmorphismGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [style, setStyle] = useState<'glassmorphism' | 'neumorphism'>(
    'glassmorphism',
  );
  const [background, setBackground] = useState('#1e40af');
  const [opacity, setOpacity] = useState(0.2);
  const [blur, setBlur] = useState(10);
  const [borderRadius, setBorderRadius] = useState(16);
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [borderOpacity, setBorderOpacity] = useState(0.2);
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(8);
  const [shadowBlur, setShadowBlur] = useState(32);
  const [shadowSpread, setShadowSpread] = useState(0);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  const borderColorWithOpacity = useMemo(() => {
    const hex = borderColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${borderOpacity})`;
  }, [borderColor, borderOpacity]);

  const shadowColorWithOpacity = useMemo(() => {
    const hex = shadowColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
  }, [shadowColor, shadowOpacity]);

  const glassmorphismStyles = useMemo(() => {
    if (style === 'glassmorphism') {
      return {
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        borderRadius: `${borderRadius}px`,
        border: `${borderWidth}px solid ${borderColorWithOpacity}`,
        boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColorWithOpacity}`,
      };
    } else {
      // Neumorphism
      const lightShadow = `${-shadowX}px ${-shadowY}px ${shadowBlur}px rgba(255, 255, 255, ${shadowOpacity})`;
      const darkShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`;
      return {
        background: background,
        borderRadius: `${borderRadius}px`,
        boxShadow: `${lightShadow}, ${darkShadow}`,
      };
    }
  }, [
    style,
    opacity,
    blur,
    borderRadius,
    borderWidth,
    borderColorWithOpacity,
    shadowX,
    shadowY,
    shadowBlur,
    shadowSpread,
    shadowColorWithOpacity,
    background,
    shadowOpacity,
  ]);

  const cssCode = style === 'glassmorphism'
    ? `.glassmorphism {
  background: rgba(255, 255, 255, ${opacity});
  backdrop-filter: blur(${blur}px);
  border-radius: ${borderRadius}px;
  border: ${borderWidth}px solid ${borderColorWithOpacity};
  box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColorWithOpacity};
}`
    : `.neumorphism {
  background: ${background};
  border-radius: ${borderRadius}px;
  box-shadow: ${-shadowX}px ${-shadowY}px ${shadowBlur}px rgba(255, 255, 255, ${shadowOpacity}), 
              ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity});
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
  };

  return (
    <ToolContainer
      title="Glassmorphism & Neumorphism Generator"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card title="Settings">
            <div className="space-y-6">
              <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <button
                  onClick={() => setStyle('glassmorphism')}
                  className={`flex-1 py-1.5 px-3 text-sm font-medium rounded-md transition-all ${style === 'glassmorphism' ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Glassmorphism
                </button>
                <button
                  onClick={() => setStyle('neumorphism')}
                  className={`flex-1 py-1.5 px-3 text-sm font-medium rounded-md transition-all ${style === 'neumorphism' ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Neumorphism
                </button>
              </div>

              {style === 'glassmorphism' ? (
                <>
                  <Slider label="Opacity" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} min={0} max={1} step={0.01} valueDisplay={`${opacity}`} />
                  <Slider label="Blur (px)" value={blur} onChange={(e) => setBlur(parseFloat(e.target.value))} min={0} max={50} valueDisplay={`${blur}px`} />
                  <Slider label="Border Radius (px)" value={borderRadius} onChange={(e) => setBorderRadius(parseFloat(e.target.value))} min={0} max={50} valueDisplay={`${borderRadius}px`} />
                  <Slider label="Border Width (px)" value={borderWidth} onChange={(e) => setBorderWidth(parseFloat(e.target.value))} min={0} max={5} valueDisplay={`${borderWidth}px`} />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Border Color</Label>
                      <input
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="h-10 w-full rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                      />
                    </div>
                    <div className="mt-1">
                      <Slider label="Border Opacity" value={borderOpacity} onChange={(e) => setBorderOpacity(parseFloat(e.target.value))} min={0} max={1} step={0.01} valueDisplay={`${borderOpacity}`} />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <Label>Background Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="h-10 w-12 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                    />
                    <Input value={background} onChange={(e) => setBackground(e.target.value)} className="flex-grow font-mono" />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Shadow Settings</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Slider label="Shadow X" value={shadowX} onChange={(e) => setShadowX(parseFloat(e.target.value))} min={-20} max={20} valueDisplay={`${shadowX}px`} />
                    <Slider label="Shadow Y" value={shadowY} onChange={(e) => setShadowY(parseFloat(e.target.value))} min={-20} max={20} valueDisplay={`${shadowY}px`} />
                  </div>
                  <Slider label="Shadow Blur" value={shadowBlur} onChange={(e) => setShadowBlur(parseFloat(e.target.value))} min={0} max={50} valueDisplay={`${shadowBlur}px`} />
                  <Slider label="Shadow Spread" value={shadowSpread} onChange={(e) => setShadowSpread(parseFloat(e.target.value))} min={-20} max={20} valueDisplay={`${shadowSpread}px`} />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Shadow Color</Label>
                      <input
                        type="color"
                        value={shadowColor}
                        onChange={(e) => setShadowColor(e.target.value)}
                        className="h-10 w-full rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                      />
                    </div>
                    <div className="mt-1">
                      <Slider label="Shadow Opacity" value={shadowOpacity} onChange={(e) => setShadowOpacity(parseFloat(e.target.value))} min={0} max={1} step={0.01} valueDisplay={`${shadowOpacity}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/50">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              {style === 'glassmorphism'
                ? 'Glassmorphism Tips'
                : 'Neumorphism Tips'}
            </h4>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              {style === 'glassmorphism' ? (
                <>
                  <p>• <strong>Low opacity:</strong> 0.1-0.3 for subtle effect</p>
                  <p>• <strong>High blur:</strong> 10-20px for frosted glass look</p>
                  <p>• <strong>Light borders:</strong> White with low opacity</p>
                  <p>• <strong>Background:</strong> Use colorful gradients behind</p>
                </>
              ) : (
                <>
                  <p>• <strong>Soft shadows:</strong> Similar X/Y values, high blur</p>
                  <p>• <strong>Light source:</strong> Top-left for raised effect</p>
                  <p>• <strong>Colors:</strong> Use subtle, muted backgrounds</p>
                  <p>• <strong>Contrast:</strong> Keep shadows subtle</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="h-[300px] flex items-center justify-center p-0 overflow-hidden relative" >
            <div className="absolute top-4 left-4 z-10 text-sm font-medium text-gray-500 dark:text-gray-400 pointer-events-none select-none bg-white/50 dark:bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
              Preview
            </div>
            <div
              className="absolute inset-0"
              style={{
                background: style === 'glassmorphism'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#e5e7eb'
              }}
            />

            {/* Decorative circles for glassmorphism */}
            {style === 'glassmorphism' && (
              <>
                <div className="absolute top-10 left-10 w-20 h-20 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-20 h-20 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              </>
            )}

            <div
              className="w-48 h-48 flex items-center justify-center text-xl font-medium transition-all duration-300"
              style={{
                ...glassmorphismStyles,
                color: style === 'glassmorphism' ? 'white' : '#4b5563'
              }}
            >
              {style === 'glassmorphism' ? 'Glass' : 'Soft'}
            </div>
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

export default GlassmorphismGenerator;

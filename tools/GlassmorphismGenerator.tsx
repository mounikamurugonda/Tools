'use client';

import React, { useState, useMemo, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import { Copy, Check, Sparkles, Box, RotateCcw, Layers } from 'lucide-react';

// Preset configurations
const PRESETS = {
  glassmorphism: [
    { name: 'Frosted Glass', opacity: 0.15, blur: 12, borderRadius: 16, borderWidth: 1, borderOpacity: 0.2 },
    { name: 'Crystal Clear', opacity: 0.08, blur: 20, borderRadius: 24, borderWidth: 1, borderOpacity: 0.1 },
    { name: 'Soft Blur', opacity: 0.25, blur: 8, borderRadius: 12, borderWidth: 2, borderOpacity: 0.3 },
    { name: 'Bold Glass', opacity: 0.35, blur: 5, borderRadius: 8, borderWidth: 1, borderOpacity: 0.4 },
  ],
  neumorphism: [
    { name: 'Soft Raised', shadowX: 6, shadowY: 6, shadowBlur: 12, intensity: 0.25, borderRadius: 16 },
    { name: 'Pressed', shadowX: 4, shadowY: 4, shadowBlur: 8, intensity: 0.30, borderRadius: 12, inset: true },
    { name: 'Subtle', shadowX: 3, shadowY: 3, shadowBlur: 6, intensity: 0.20, borderRadius: 20 },
    { name: 'Deep', shadowX: 10, shadowY: 10, shadowBlur: 20, intensity: 0.35, borderRadius: 24 },
  ],
};

const GlassmorphismGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [style, setStyle] = useState<'glassmorphism' | 'neumorphism'>('glassmorphism');
  const [copied, setCopied] = useState(false);

  // Glassmorphism states
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

  // Neumorphism specific states
  const [neuBackground, setNeuBackground] = useState('#e0e5ec');
  const [neuShadowX, setNeuShadowX] = useState(6);
  const [neuShadowY, setNeuShadowY] = useState(6);
  const [neuShadowBlur, setNeuShadowBlur] = useState(12);
  const [neuIntensity, setNeuIntensity] = useState(0.25);
  const [neuBorderRadius, setNeuBorderRadius] = useState(16);
  const [neuInset, setNeuInset] = useState(false);
  const [neuShape, setNeuShape] = useState<'flat' | 'concave' | 'convex'>('flat');

  // Helper function to lighten/darken colors
  const adjustColor = useCallback((hex: string, percent: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  }, []);

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

  // Neumorphism shadow calculation - intensity controls color contrast (0-50 range)
  const shadowIntensityPercent = Math.round(neuIntensity * 100);

  const neuLightShadow = useMemo(() => {
    const lightColor = adjustColor(neuBackground, shadowIntensityPercent);
    return `${neuInset ? 'inset ' : ''}${-neuShadowX}px ${-neuShadowY}px ${neuShadowBlur}px ${lightColor}`;
  }, [neuBackground, neuShadowX, neuShadowY, neuShadowBlur, neuInset, adjustColor, shadowIntensityPercent]);

  const neuDarkShadow = useMemo(() => {
    const darkColor = adjustColor(neuBackground, -shadowIntensityPercent);
    return `${neuInset ? 'inset ' : ''}${neuShadowX}px ${neuShadowY}px ${neuShadowBlur}px ${darkColor}`;
  }, [neuBackground, neuShadowX, neuShadowY, neuShadowBlur, neuInset, adjustColor, shadowIntensityPercent]);

  // Neumorphism gradient for shape
  const neuGradient = useMemo(() => {
    if (neuShape === 'flat') return neuBackground;
    const lightColor = adjustColor(neuBackground, 5);
    const darkColor = adjustColor(neuBackground, -5);
    if (neuShape === 'concave') {
      return `linear-gradient(145deg, ${darkColor}, ${lightColor})`;
    }
    return `linear-gradient(145deg, ${lightColor}, ${darkColor})`;
  }, [neuBackground, neuShape, adjustColor]);

  const glassmorphismStyles = useMemo(() => {
    if (style === 'glassmorphism') {
      return {
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        borderRadius: `${borderRadius}px`,
        border: `${borderWidth}px solid ${borderColorWithOpacity}`,
        boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColorWithOpacity}`,
      };
    } else {
      return {
        background: neuGradient,
        borderRadius: `${neuBorderRadius}px`,
        boxShadow: `${neuDarkShadow}, ${neuLightShadow}`,
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
    neuGradient,
    neuBorderRadius,
    neuDarkShadow,
    neuLightShadow,
  ]);

  const cssCode = useMemo(() => {
    if (style === 'glassmorphism') {
      return `.glassmorphism {
  background: rgba(255, 255, 255, ${opacity});
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  border-radius: ${borderRadius}px;
  border: ${borderWidth}px solid ${borderColorWithOpacity};
  box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColorWithOpacity};
}`;
    } else {
      const lightColor = adjustColor(neuBackground, shadowIntensityPercent);
      const darkColor = adjustColor(neuBackground, -shadowIntensityPercent);
      let bgValue = neuBackground;
      if (neuShape === 'concave') {
        const gradLight = adjustColor(neuBackground, 5);
        const gradDark = adjustColor(neuBackground, -5);
        bgValue = `linear-gradient(145deg, ${gradDark}, ${gradLight})`;
      } else if (neuShape === 'convex') {
        const gradLight = adjustColor(neuBackground, 5);
        const gradDark = adjustColor(neuBackground, -5);
        bgValue = `linear-gradient(145deg, ${gradLight}, ${gradDark})`;
      }
      const insetPrefix = neuInset ? 'inset ' : '';
      return `.neumorphism {
  background: ${bgValue};
  border-radius: ${neuBorderRadius}px;
  box-shadow: ${insetPrefix}${neuShadowX}px ${neuShadowY}px ${neuShadowBlur}px ${darkColor},
              ${insetPrefix}${-neuShadowX}px ${-neuShadowY}px ${neuShadowBlur}px ${lightColor};
}`;
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
    neuBackground,
    neuBorderRadius,
    neuShadowX,
    neuShadowY,
    neuShadowBlur,
    neuInset,
    neuShape,
    adjustColor,
    shadowIntensityPercent,
  ]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [cssCode]);

  const applyGlassPreset = useCallback((preset: typeof PRESETS.glassmorphism[0]) => {
    setOpacity(preset.opacity);
    setBlur(preset.blur);
    setBorderRadius(preset.borderRadius);
    setBorderWidth(preset.borderWidth);
    setBorderOpacity(preset.borderOpacity);
  }, []);

  const applyNeuPreset = useCallback((preset: typeof PRESETS.neumorphism[0]) => {
    setNeuShadowX(preset.shadowX);
    setNeuShadowY(preset.shadowY);
    setNeuShadowBlur(preset.shadowBlur);
    setNeuIntensity(preset.intensity);
    setNeuBorderRadius(preset.borderRadius);
    setNeuInset(preset.inset || false);
  }, []);

  const resetToDefault = useCallback(() => {
    if (style === 'glassmorphism') {
      setOpacity(0.2);
      setBlur(10);
      setBorderRadius(16);
      setBorderWidth(1);
      setBorderOpacity(0.2);
      setShadowX(0);
      setShadowY(8);
      setShadowBlur(32);
      setShadowSpread(0);
      setShadowOpacity(0.1);
    } else {
      setNeuBackground('#e0e5ec');
      setNeuShadowX(6);
      setNeuShadowY(6);
      setNeuShadowBlur(12);
      setNeuIntensity(0.25);
      setNeuBorderRadius(16);
      setNeuInset(false);
      setNeuShape('flat');
    }
  }, [style]);

  return (
    <ToolContainer title="Glassmorphism & Neumorphism Generator" details={details} toolId={toolId}>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card title="Settings">
            <div className="space-y-6">
              {/* Style Tabs */}
              <div className="flex gap-1 p-1 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                <button
                  onClick={() => setStyle('glassmorphism')}
                  className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${style === 'glassmorphism'
                    ? 'bg-white dark:bg-gray-700 shadow-lg shadow-blue-500/20 text-blue-600 dark:text-blue-400 scale-[1.02]'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Glassmorphism
                </button>
                <button
                  onClick={() => setStyle('neumorphism')}
                  className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${style === 'neumorphism'
                    ? 'bg-white dark:bg-gray-700 shadow-lg shadow-purple-500/20 text-purple-600 dark:text-purple-400 scale-[1.02]'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                >
                  <Box className="w-4 h-4" />
                  Neumorphism
                </button>
              </div>

              {/* Presets */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Quick Presets
                  </Label>
                  <button
                    onClick={resetToDefault}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {style === 'glassmorphism'
                    ? PRESETS.glassmorphism.map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => applyGlassPreset(preset)}
                        className="px-3 py-2 text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/40 dark:hover:to-purple-900/40 border border-blue-100 dark:border-blue-800 rounded-lg transition-all hover:scale-[1.02] hover:shadow-md"
                      >
                        {preset.name}
                      </button>
                    ))
                    : PRESETS.neumorphism.map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => applyNeuPreset(preset)}
                        className="px-3 py-2 text-xs font-medium bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/40 dark:hover:to-pink-900/40 border border-purple-100 dark:border-purple-800 rounded-lg transition-all hover:scale-[1.02] hover:shadow-md"
                      >
                        {preset.name}
                      </button>
                    ))}
                </div>
              </div>

              {/* Controls */}
              {style === 'glassmorphism' ? (
                <>
                  <Slider
                    label="Opacity"
                    value={opacity}
                    onChange={e => setOpacity(parseFloat(e.target.value))}
                    min={0}
                    max={1}
                    step={0.01}
                    valueDisplay={`${Math.round(opacity * 100)}%`}
                  />
                  <Slider
                    label="Blur"
                    value={blur}
                    onChange={e => setBlur(parseFloat(e.target.value))}
                    min={0}
                    max={50}
                    valueDisplay={`${blur}px`}
                  />
                  <Slider
                    label="Border Radius"
                    value={borderRadius}
                    onChange={e => setBorderRadius(parseFloat(e.target.value))}
                    min={0}
                    max={50}
                    valueDisplay={`${borderRadius}px`}
                  />
                  <Slider
                    label="Border Width"
                    value={borderWidth}
                    onChange={e => setBorderWidth(parseFloat(e.target.value))}
                    min={0}
                    max={5}
                    valueDisplay={`${borderWidth}px`}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Border Color</Label>
                      <div className="flex gap-2 mt-1">
                        <input
                          type="color"
                          value={borderColor}
                          onChange={e => setBorderColor(e.target.value)}
                          className="h-10 w-12 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 shadow-sm"
                        />
                        <Input
                          value={borderColor}
                          onChange={e => setBorderColor(e.target.value)}
                          className="flex-grow font-mono text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <Slider
                        label="Border Opacity"
                        value={borderOpacity}
                        onChange={e => setBorderOpacity(parseFloat(e.target.value))}
                        min={0}
                        max={1}
                        step={0.01}
                        valueDisplay={`${Math.round(borderOpacity * 100)}%`}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Shadow Settings</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Slider
                          label="Shadow X"
                          value={shadowX}
                          onChange={e => setShadowX(parseFloat(e.target.value))}
                          min={-20}
                          max={20}
                          valueDisplay={`${shadowX}px`}
                        />
                        <Slider
                          label="Shadow Y"
                          value={shadowY}
                          onChange={e => setShadowY(parseFloat(e.target.value))}
                          min={-20}
                          max={20}
                          valueDisplay={`${shadowY}px`}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Slider
                          label="Shadow Blur"
                          value={shadowBlur}
                          onChange={e => setShadowBlur(parseFloat(e.target.value))}
                          min={0}
                          max={50}
                          valueDisplay={`${shadowBlur}px`}
                        />
                        <Slider
                          label="Shadow Spread"
                          value={shadowSpread}
                          onChange={e => setShadowSpread(parseFloat(e.target.value))}
                          min={-20}
                          max={20}
                          valueDisplay={`${shadowSpread}px`}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Shadow Color</Label>
                          <input
                            type="color"
                            value={shadowColor}
                            onChange={e => setShadowColor(e.target.value)}
                            className="h-10 w-full rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 shadow-sm mt-1"
                          />
                        </div>
                        <div>
                          <Slider
                            label="Shadow Opacity"
                            value={shadowOpacity}
                            onChange={e => setShadowOpacity(parseFloat(e.target.value))}
                            min={0}
                            max={1}
                            step={0.01}
                            valueDisplay={`${Math.round(shadowOpacity * 100)}%`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Neumorphism Controls */}
                  <div>
                    <Label>Background Color</Label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="color"
                        value={neuBackground}
                        onChange={e => setNeuBackground(e.target.value)}
                        className="h-10 w-12 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 shadow-sm"
                      />
                      <Input
                        value={neuBackground}
                        onChange={e => setNeuBackground(e.target.value)}
                        className="flex-grow font-mono text-sm"
                      />
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {['#e0e5ec', '#f0f0f3', '#d1d9e6', '#bec8e4', '#c9d6df', '#e8dfe0'].map(color => (
                        <button
                          key={color}
                          onClick={() => setNeuBackground(color)}
                          className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 ${neuBackground === color ? 'border-purple-500 ring-2 ring-purple-300' : 'border-gray-300 dark:border-gray-600'}`}
                          style={{ background: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                      💡 Tip: Neumorphism works best with light, muted colors
                    </p>
                  </div>

                  <Slider
                    label="Border Radius"
                    value={neuBorderRadius}
                    onChange={e => setNeuBorderRadius(parseFloat(e.target.value))}
                    min={0}
                    max={50}
                    valueDisplay={`${neuBorderRadius}px`}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Slider
                      label="Shadow Distance X"
                      value={neuShadowX}
                      onChange={e => setNeuShadowX(parseFloat(e.target.value))}
                      min={0}
                      max={30}
                      valueDisplay={`${neuShadowX}px`}
                    />
                    <Slider
                      label="Shadow Distance Y"
                      value={neuShadowY}
                      onChange={e => setNeuShadowY(parseFloat(e.target.value))}
                      min={0}
                      max={30}
                      valueDisplay={`${neuShadowY}px`}
                    />
                  </div>

                  <Slider
                    label="Shadow Blur"
                    value={neuShadowBlur}
                    onChange={e => setNeuShadowBlur(parseFloat(e.target.value))}
                    min={0}
                    max={60}
                    valueDisplay={`${neuShadowBlur}px`}
                  />

                  <Slider
                    label="Shadow Intensity"
                    value={neuIntensity}
                    onChange={e => setNeuIntensity(parseFloat(e.target.value))}
                    min={0}
                    max={0.5}
                    step={0.01}
                    valueDisplay={`${Math.round(neuIntensity * 100)}%`}
                  />

                  {/* Shape Selection */}
                  <div>
                    <Label>Shape Style</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {(['flat', 'concave', 'convex'] as const).map(shape => (
                        <button
                          key={shape}
                          onClick={() => setNeuShape(shape)}
                          className={`py-2 px-3 text-sm font-medium rounded-lg transition-all capitalize ${neuShape === shape
                            ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/50'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                          {shape}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inset Toggle */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <Label className="mb-0">Inset (Pressed Effect)</Label>
                    <button
                      onClick={() => setNeuInset(!neuInset)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${neuInset ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${neuInset ? 'translate-x-6' : 'translate-x-0'
                          }`}
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Tips Card */}
          <div className={`p-4 rounded-xl border transition-all ${style === 'glassmorphism'
            ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-100 dark:border-blue-800'
            : 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-100 dark:border-purple-800'
            }`}>
            <h4 className={`font-semibold mb-3 flex items-center gap-2 ${style === 'glassmorphism' ? 'text-blue-900 dark:text-blue-100' : 'text-purple-900 dark:text-purple-100'
              }`}>
              <Sparkles className="w-4 h-4" />
              {style === 'glassmorphism' ? 'Glassmorphism Tips' : 'Neumorphism Tips'}
            </h4>
            <div className={`text-sm space-y-2 ${style === 'glassmorphism' ? 'text-blue-700 dark:text-blue-300' : 'text-purple-700 dark:text-purple-300'
              }`}>
              {style === 'glassmorphism' ? (
                <>
                  <p>• <strong>Low opacity:</strong> 10-30% for a subtle, elegant effect</p>
                  <p>• <strong>High blur:</strong> 10-20px creates a frosted glass appearance</p>
                  <p>• <strong>Light borders:</strong> White with low opacity adds depth</p>
                  <p>• <strong>Background:</strong> Use colorful gradients behind the glass</p>
                </>
              ) : (
                <>
                  <p>• <strong>Matching colors:</strong> Background should match the parent element</p>
                  <p>• <strong>Light source:</strong> Top-left is the standard light direction</p>
                  <p>• <strong>Soft shadows:</strong> Keep blur high relative to distance</p>
                  <p>• <strong>Subtle colors:</strong> Use muted, pastel backgrounds</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Preview Card */}
          <Card className="h-[320px] flex items-center justify-center p-0 overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 text-xs font-medium text-gray-500 dark:text-gray-400 pointer-events-none select-none bg-white/70 dark:bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${style === 'glassmorphism' ? 'bg-blue-500' : 'bg-purple-500'} animate-pulse`} />
              Live Preview
            </div>

            {/* Background */}
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{
                background:
                  style === 'glassmorphism'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                    : neuBackground,
              }}
            />

            {/* Decorative elements for glassmorphism */}
            {style === 'glassmorphism' && (
              <>
                <div className="absolute top-8 left-8 w-24 h-24 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
                <div className="absolute top-12 right-12 w-20 h-20 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-8 left-1/4 w-28 h-28 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }} />
              </>
            )}

            {/* Preview Element */}
            <div
              className="w-48 h-48 flex flex-col items-center justify-center text-center transition-all duration-300 select-none relative z-10"
              style={{
                ...glassmorphismStyles,
                color: style === 'glassmorphism' ? 'white' : adjustColor(neuBackground, -50),
              }}
            >
              <span className="text-2xl font-bold mb-1">
                {style === 'glassmorphism' ? '✨' : '🎨'}
              </span>
              <span className="text-lg font-semibold">
                {style === 'glassmorphism' ? 'Glass' : 'Soft UI'}
              </span>
              <span className="text-xs opacity-70 mt-1">
                {style === 'glassmorphism' ? 'Frosted Effect' : neuInset ? 'Pressed' : 'Raised'}
              </span>
            </div>

            {/* Additional neumorphism demo elements */}
            {style === 'neumorphism' && (
              <>
                <div
                  className="absolute bottom-4 left-4 w-12 h-12 rounded-full transition-all duration-300"
                  style={{
                    background: neuGradient,
                    boxShadow: `${neuDarkShadow}, ${neuLightShadow}`,
                  }}
                />
                <div
                  className="absolute bottom-4 right-4 w-12 h-12 rounded-xl transition-all duration-300"
                  style={{
                    background: neuBackground,
                    boxShadow: `inset ${neuShadowX}px ${neuShadowY}px ${neuShadowBlur}px ${adjustColor(neuBackground, -shadowIntensityPercent)}, inset ${-neuShadowX}px ${-neuShadowY}px ${neuShadowBlur}px ${adjustColor(neuBackground, shadowIntensityPercent)}`,
                  }}
                />
              </>
            )}
          </Card>

          {/* CSS Output */}
          <Card className="relative group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">CSS Output</h3>
              <Button
                size="sm"
                variant={copied ? 'primary' : 'secondary'}
                onClick={copyToClipboard}
                className={`shadow-sm transition-all ${copied ? 'bg-green-500 hover:bg-green-600' : ''}`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy CSS
                  </>
                )}
              </Button>
            </div>
            <pre className="p-4 bg-gray-950 rounded-xl text-sm font-mono overflow-x-auto border border-gray-800">
              <code className="text-gray-100">{cssCode}</code>
            </pre>
          </Card>

          {/* Browser Support Note */}
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/50">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              <strong>Browser Support:</strong> {style === 'glassmorphism'
                ? 'backdrop-filter is supported in modern browsers. Safari requires -webkit- prefix (included in output).'
                : 'box-shadow is widely supported. Works in all modern browsers.'
              }
            </p>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default GlassmorphismGenerator;

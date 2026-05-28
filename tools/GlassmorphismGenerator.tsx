'use client';

import React, { useState, useMemo, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Check, Sparkles, RotateCcw, Layers, Cloud } from 'lucide-react';

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
  claymorphism: [
    { name: 'Soft Clay', background: '#ecf0f3', shadowDistance: 16, shadowBlur: 32, intensity: 0.4, borderRadius: 32 },
    { name: 'Vibrant', background: '#f87171', shadowDistance: 12, shadowBlur: 24, intensity: 0.5, borderRadius: 30 },
    { name: 'Dark Clay', background: '#374151', shadowDistance: 10, shadowBlur: 20, intensity: 0.3, borderRadius: 26 },
    { name: 'Minimal', background: '#e0e7ff', shadowDistance: 8, shadowBlur: 16, intensity: 0.2, borderRadius: 24 },
  ],
};

const GlassmorphismGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [style, setStyle] = useState<'glassmorphism' | 'neumorphism' | 'claymorphism'>('glassmorphism');
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
  const [neuShadowSpread, setNeuShadowSpread] = useState(0);
  const [neuIntensity, setNeuIntensity] = useState(0.25);
  const [neuBorderRadius, setNeuBorderRadius] = useState(16);
  const [neuInset, setNeuInset] = useState(false);
  const [neuShape, setNeuShape] = useState<'flat' | 'concave' | 'convex'>('flat');

  // Claymorphism specific states
  const [clayBackground, setClayBackground] = useState('#ecf0f3');
  const [clayShadowDistance, setClayShadowDistance] = useState(16);
  const [clayShadowBlur, setClayShadowBlur] = useState(32);
  const [clayIntensity, setClayIntensity] = useState(0.4);
  const [clayBorderRadius, setClayBorderRadius] = useState(32);

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

  // Neumorphism shadow calculation
  const shadowIntensityPercent = Math.round(neuIntensity * 100);

  const neuLightShadow = useMemo(() => {
    const lightColor = adjustColor(neuBackground, shadowIntensityPercent);
    return `${neuInset ? 'inset ' : ''}${-neuShadowX}px ${-neuShadowY}px ${neuShadowBlur}px ${lightColor}`;
  }, [neuBackground, neuShadowX, neuShadowY, neuShadowBlur, neuInset, adjustColor, shadowIntensityPercent]);

  const neuDarkShadow = useMemo(() => {
    const darkColor = adjustColor(neuBackground, -shadowIntensityPercent);
    return `${neuInset ? 'inset ' : ''}${neuShadowX}px ${neuShadowY}px ${neuShadowBlur}px ${darkColor}`;
  }, [neuBackground, neuShadowX, neuShadowY, neuShadowBlur, neuInset, adjustColor, shadowIntensityPercent]);

  const neuGradient = useMemo(() => {
    if (neuShape === 'flat') return neuBackground;
    const lightColor = adjustColor(neuBackground, 5);
    const darkColor = adjustColor(neuBackground, -5);
    if (neuShape === 'concave') {
      return `linear-gradient(145deg, ${darkColor}, ${lightColor})`;
    }
    return `linear-gradient(145deg, ${lightColor}, ${darkColor})`;
  }, [neuBackground, neuShape, adjustColor]);

  // Claymorphism shadow calculation
  const clayShadows = useMemo(() => {
    const outer = `${clayShadowDistance}px ${clayShadowDistance}px ${clayShadowDistance * 2}px rgba(163, 177, 198, 0.4)`; // Soft colored shadow
    // Alternative simple outer shadow: 
    const outerSimple = `${clayShadowDistance}px ${clayShadowDistance}px ${clayShadowBlur}px rgba(0, 0, 0, ${clayIntensity * 0.5})`;

    // Inner highglight (top-left)
    const innerLight = `inset ${clayShadowDistance}px ${clayShadowDistance}px ${clayShadowBlur}px rgba(255, 255, 255, ${clayIntensity})`;

    // Inner shadow (bottom-right)
    const innerDark = `inset -${clayShadowDistance}px -${clayShadowDistance}px ${clayShadowBlur}px rgba(0, 0, 0, ${clayIntensity * 0.1})`;

    return { outer: outerSimple, innerLight, innerDark };
  }, [clayShadowDistance, clayShadowBlur, clayIntensity]);

  const elementStyles = useMemo(() => {
    if (style === 'glassmorphism') {
      return {
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        borderRadius: `${borderRadius}px`,
        border: `${borderWidth}px solid ${borderColorWithOpacity}`,
        boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColorWithOpacity}`,
      };
    } else if (style === 'neumorphism') {
      return {
        background: neuGradient,
        borderRadius: `${neuBorderRadius}px`,
        boxShadow: `${neuDarkShadow}, ${neuLightShadow}`,
      };
    } else {
      // Claymorphism
      return {
        background: clayBackground,
        borderRadius: `${clayBorderRadius}px`,
        boxShadow: `${clayShadows.outer}, ${clayShadows.innerLight}, ${clayShadows.innerDark}`,
        color: '#4b5563',
      }
    }
  }, [
    style, opacity, blur, borderRadius, borderWidth, borderColorWithOpacity,
    shadowX, shadowY, shadowBlur, shadowSpread, shadowColorWithOpacity,
    neuGradient, neuBorderRadius, neuDarkShadow, neuLightShadow,
    clayBackground, clayBorderRadius, clayShadows
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
    } else if (style === 'neumorphism') {
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
    } else {
      // Claymorphism CSS
      return `.claymorphism {
  background: ${clayBackground};
  border-radius: ${clayBorderRadius}px;
  box-shadow: ${clayShadows.outer},
              ${clayShadows.innerLight},
              ${clayShadows.innerDark};
}`;
    }
  }, [
    style, opacity, blur, borderRadius, borderWidth, borderColorWithOpacity,
    shadowX, shadowY, shadowBlur, shadowSpread, shadowColorWithOpacity,
    neuBackground, neuBorderRadius, neuShadowX, neuShadowY, neuShadowBlur,
    neuInset, neuShape, adjustColor, shadowIntensityPercent,
    clayBackground, clayBorderRadius, clayShadows
  ]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      toast.success('Copied CSS');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Copy failed');
    }
  }, [cssCode, toast]);

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

  const applyClayPreset = useCallback((preset: typeof PRESETS.claymorphism[0]) => {
    setClayBackground(preset.background);
    setClayShadowDistance(preset.shadowDistance);
    setClayShadowBlur(preset.shadowBlur);
    setClayIntensity(preset.intensity);
    setClayBorderRadius(preset.borderRadius);
  }, []);

  const resetToDefault = useCallback(() => {
    if (style === 'glassmorphism') {
      setOpacity(0.2); setBlur(10); setBorderRadius(16); setBorderWidth(1);
      setBorderOpacity(0.2); setShadowX(0); setShadowY(8); setShadowBlur(32);
      setShadowSpread(0); setShadowOpacity(0.1);
    } else if (style === 'neumorphism') {
      setNeuBackground('#e0e5ec'); setNeuShadowX(6); setNeuShadowY(6);
      setNeuShadowBlur(12); setNeuIntensity(0.25); setNeuBorderRadius(16);
      setNeuInset(false); setNeuShape('flat');
    } else {
      setClayBackground('#ecf0f3'); setClayShadowDistance(16); setClayShadowBlur(32);
      setClayIntensity(0.4); setClayBorderRadius(32);
    }
  }, [style]);

  return (
    <ToolContainer title="Glassmorphism, Neumorphism & Claymorphism" details={details} toolId={toolId}>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 items-start">

        {/* Left Side: Controls */}
        <div className="space-y-8 w-full">

          {/* Style Toggle */}
          <div>
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 w-full mb-4">
              <button
                onClick={() => setStyle('glassmorphism')}
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${style === 'glassmorphism'
                  ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
              >
                Glass
              </button>
              <button
                onClick={() => setStyle('neumorphism')}
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${style === 'neumorphism'
                  ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
              >
                Neumorph
              </button>
              <button
                onClick={() => setStyle('claymorphism')}
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${style === 'claymorphism'
                  ? 'bg-white dark:bg-gray-700 shadow text-pink-600 dark:text-pink-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
              >
                Claymorph
              </button>
            </div>

            {/* Presets */}
            <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <Label className="flex items-center gap-1.5 mb-0">
                  <Sparkles className="w-3.5 h-3.5" />
                  Presets
                </Label>
                <Button size="sm" variant="ghost" onClick={resetToDefault} className="h-6 text-xs text-gray-500 hover:text-gray-700">
                  <RotateCcw className="w-3 h-3 mr-1" /> Reset
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(style === 'glassmorphism' ? PRESETS.glassmorphism : style === 'neumorphism' ? PRESETS.neumorphism : PRESETS.claymorphism).map((preset: any, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (style === 'glassmorphism') applyGlassPreset(preset);
                      else if (style === 'neumorphism') applyNeuPreset(preset);
                      else applyClayPreset(preset);
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all hover:scale-[1.02] hover:shadow-sm ${style === 'glassmorphism'
                      ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 text-blue-700 dark:text-blue-300'
                      : style === 'neumorphism'
                        ? 'bg-purple-50/50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'bg-pink-50/50 dark:bg-pink-900/10 border-pink-100 dark:border-pink-900/30 text-pink-700 dark:text-pink-300'
                      }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Controls */}
          <div className="space-y-6">
            {style === 'glassmorphism' ? (
              <>
                <div className="grid sm:grid-cols-2 gap-6">
                  <ControlSlider label="Opacity" value={opacity} onChange={setOpacity} max={1} step={0.01} unit="%" displayMultiplier={100} />
                  <ControlSlider label="Blur" value={blur} onChange={setBlur} max={50} unit="px" />
                  <ControlSlider label="Border Radius" value={borderRadius} onChange={setBorderRadius} max={50} unit="px" />
                  <ControlSlider label="Border Width" value={borderWidth} onChange={setBorderWidth} max={5} unit="px" />
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-6"></div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <Label className="mb-2 block">Shadow</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <ControlSlider label="X" value={shadowX} onChange={setShadowX} min={-20} max={20} unit="px" />
                      <ControlSlider label="Y" value={shadowY} onChange={setShadowY} min={-20} max={20} unit="px" />
                      <ControlSlider label="Blur" value={shadowBlur} onChange={setShadowBlur} max={50} unit="px" />
                      <ControlSlider label="Opacity" value={shadowOpacity} onChange={setShadowOpacity} max={1} step={0.01} unit="%" displayMultiplier={100} />
                    </div>
                  </div>
                </div>
              </>
            ) : style === 'neumorphism' ? (
              <>
                <div>
                  <Label className="mb-2 block">Background Color</Label>
                  <div className="flex gap-2">
                    <ColorInput value={neuBackground} onChange={setNeuBackground} />
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {['#e0e5ec', '#f0f0f3', '#d1d9e6', '#bec8e4', '#c9d6df'].map(color => (
                      <button
                        key={color}
                        onClick={() => setNeuBackground(color)}
                        className={`w-6 h-6 rounded border transition-all ${neuBackground === color ? 'border-purple-500 ring-1 ring-purple-300' : 'border-gray-300 dark:border-gray-600'}`}
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <ControlSlider label="Size" value={neuBorderRadius} onChange={setNeuBorderRadius} max={50} unit="px" />
                  <ControlSlider label="Intensity" value={neuIntensity} onChange={setNeuIntensity} max={0.5} step={0.01} unit="%" displayMultiplier={100} />
                  <ControlSlider label="Distance X" value={neuShadowX} onChange={setNeuShadowX} max={30} unit="px" />
                  <ControlSlider label="Distance Y" value={neuShadowY} onChange={setNeuShadowY} max={30} unit="px" />
                </div>

                <div>
                  <Label className="mb-2 block">Shape & Effect</Label>
                  <div className="flex gap-2 mb-4">
                    {(['flat', 'concave', 'convex'] as const).map(s => (
                      <button key={s} onClick={() => setNeuShape(s)} className={`flex-1 py-1.5 text-xs font-medium rounded border ${neuShape === s ? 'bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300' : 'bg-transparent border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400'}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                    <Label className="mb-0">Inset (Pressed)</Label>
                    <button onClick={() => setNeuInset(!neuInset)} className={`w-10 h-5 rounded-full relative transition-colors ${neuInset ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${neuInset ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Claymorphism Controls
              <>
                <div>
                  <Label className="mb-2 block">Clay Background Color</Label>
                  <div className="flex gap-2">
                    <ColorInput value={clayBackground} onChange={setClayBackground} />
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {['#ecf0f3', '#f87171', '#374151', '#e0e7ff', '#fcd34d', '#34d399'].map(color => (
                      <button
                        key={color}
                        onClick={() => setClayBackground(color)}
                        className={`w-6 h-6 rounded-full border transition-all ${clayBackground === color ? 'border-pink-500 ring-1 ring-pink-300 transform scale-110' : 'border-gray-300 dark:border-gray-600'}`}
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <ControlSlider label="Border Radius" value={clayBorderRadius} onChange={setClayBorderRadius} max={60} unit="px" />
                  <ControlSlider label="Depth (Intensity)" value={clayIntensity} onChange={setClayIntensity} max={1} step={0.01} unit="%" displayMultiplier={100} />
                  <ControlSlider label="Shadow Distance" value={clayShadowDistance} onChange={setClayShadowDistance} max={50} unit="px" />
                  <ControlSlider label="Shadow Blur" value={clayShadowBlur} onChange={setClayShadowBlur} max={100} unit="px" />
                </div>
              </>
            )}
          </div>

        </div>

        {/* Right Side: Preview & Code */}
        <div className="space-y-6 sticky top-0 z-30 lg:top-24 bg-white/95 dark:bg-gray-900/95 backdrop-blur p-4 -mx-4 lg:mx-0 lg:p-0 rounded-b-2xl lg:rounded-none lg:bg-transparent lg:dark:bg-transparent shadow-md lg:shadow-none w-[calc(100%+2rem)] lg:w-full">
          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="relative h-[400px] w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex items-center justify-center">
              {/* Background */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background:
                    style === 'glassmorphism'
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                      : style === 'neumorphism'
                        ? neuBackground
                        : '#ffffff', // Claymorphism usually looks best on white or light background to see the floating effect
                }}
              />

              {style === 'claymorphism' && (
                // Claymorphism often needs a different background to pop
                <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900 transition-colors" />
              )}

              {/* Decorations */}
              {style === 'glassmorphism' && (
                <>
                  <div className="absolute top-10 left-10 w-24 h-24 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse" />
                  <div className="absolute top-16 right-16 w-20 h-20 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-75" />
                  <div className="absolute bottom-12 left-1/3 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-150" />
                </>
              )}

              {style === 'claymorphism' && (
                <>
                  <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-10 left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl" />
                </>
              )}

              {/* The Object */}
              <div
                className="w-48 h-48 flex flex-col items-center justify-center text-center transition-all duration-300 select-none relative z-10"
                style={{
                  ...elementStyles,
                  color: style === 'glassmorphism' ? 'white' : style === 'claymorphism' ? (parseInt(clayBackground.replace('#', ''), 16) > 0xffffff / 2 ? '#374151' : 'white') : adjustColor(neuBackground, -50),
                }}
              >
                <div className="mb-2">
                  {style === 'glassmorphism' && <Sparkles className="w-8 h-8 opacity-80" />}
                  {style === 'neumorphism' && <Layers className="w-8 h-8 opacity-60" />}
                  {style === 'claymorphism' && <Cloud className="w-8 h-8 opacity-80" />}
                </div>
                <span className="font-semibold text-lg">
                  {style === 'glassmorphism' ? 'Glass' : style === 'neumorphism' ? 'Neumorphic' : 'Claymorphic'}
                </span>
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>CSS Output</Label>
              <Button size="sm" variant="ghost" onClick={copyToClipboard} className="h-6 text-xs text-blue-600 hover:bg-blue-50 px-2">
                {copied ? <Check className="w-3 h-3 mr-1.5" /> : <Copy className="w-3 h-3 mr-1.5" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <div className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <pre className="p-4 text-gray-800 dark:text-gray-200 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
                <code>{cssCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

// Reusable Components to reduce clutter
const ControlSlider = ({ label, value, onChange, min = 0, max, step = 1, unit = '', displayMultiplier = 1 }: any) => (
  <div>
    <div className="flex justify-between mb-2">
      <Label className="text-xs text-gray-500 uppercase tracking-wide">{label}</Label>
      <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-1.5 rounded">{Math.round(value * displayMultiplier)}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 focus:outline-none transition-all"
    />
  </div>
);

const ColorInput = ({ value, onChange }: any) => (
  <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 w-full">
    <div className="relative w-8 h-8 rounded overflow-hidden border border-gray-200 dark:border-gray-600 flex-shrink-0">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 border-0 cursor-pointer" />
    </div>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-[80px] bg-transparent border-none text-xs font-mono focus:ring-0 p-0" />
  </div>
);

export default GlassmorphismGenerator;

'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Plus, Trash2 } from 'lucide-react';

interface ShadowLayer {
  id: string;
  hOffset: number;
  vOffset: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

const BoxShadowGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [shadows, setShadows] = useState<ShadowLayer[]>([
    {
      id: '1',
      hOffset: 0,
      vOffset: 10,
      blur: 15,
      spread: -3,
      color: '#000000',
      opacity: 0.1,
      inset: false,
    }
  ]);
  const [activeShadowId, setActiveShadowId] = useState<string>('1');
  const padRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_OFFSET = 50;
  const MAX_SHADOWS = 6;

  const activeShadow = shadows.find(s => s.id === activeShadowId) || shadows[0];
  const activeIndex = shadows.findIndex(s => s.id === activeShadowId);

  const updateShadow = (updates: Partial<ShadowLayer>) => {
    setShadows(prev => prev.map(s => s.id === activeShadowId ? { ...s, ...updates } : s));
  };

  const addShadow = () => {
    if (shadows.length >= MAX_SHADOWS) return;
    const newId = Date.now().toString();
    setShadows(prev => [
      ...prev,
      {
        id: newId,
        hOffset: 0,
        vOffset: 10,
        blur: 15,
        spread: -3,
        color: '#000000',
        opacity: 0.1,
        inset: false,
      }
    ]);
    setActiveShadowId(newId);
  };

  const removeShadow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (shadows.length <= 1) return;

    setShadows(prev => prev.filter(s => s.id !== id));
    if (activeShadowId === id) {
      setActiveShadowId(shadows[0].id);
    }
  };

  const getShadowString = (layer: ShadowLayer) => {
    const hex = layer.color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const rgba = `rgba(${r}, ${g}, ${b}, ${layer.opacity})`;
    return `${layer.inset ? 'inset ' : ''}${layer.hOffset}px ${layer.vOffset}px ${layer.blur}px ${layer.spread}px ${rgba}`;
  };

  const finalBoxShadow = shadows.map(getShadowString).join(', ');
  const tailwindShadow = `shadow-[${finalBoxShadow.replace(/,\s+/g, ',').replace(/\s+/g, '_')}]`;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  const handlePadChange = (clientX: number, clientY: number) => {
    if (!padRef.current) return;
    const rect = padRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const visualRadius = rect.width / 2;

    let newX = Math.round((deltaX / visualRadius) * MAX_OFFSET);
    let newY = Math.round((deltaY / visualRadius) * MAX_OFFSET);

    newX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, newX));
    newY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, newY));

    updateShadow({ hOffset: newX, vOffset: newY });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handlePadChange(e.clientX, e.clientY);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handlePadChange(e.clientX, e.clientY);
        e.preventDefault();
      }
    };
    const onMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  const getDotPosition = () => {
    const xPct = ((activeShadow.hOffset + MAX_OFFSET) / (MAX_OFFSET * 2)) * 100;
    const yPct = ((activeShadow.vOffset + MAX_OFFSET) / (MAX_OFFSET * 2)) * 100;
    return { left: `${xPct}%`, top: `${yPct}%` };
  };

  return (
    <ToolContainer title="Box Shadow Generator" details={details} toolId={toolId}>
      <div className="grid lg:grid-cols-2 gap-8 items-start">

        {/* Left Side: Controls */}
        <div className="space-y-8">

          {/* Type Toggle */}
          <div>
            <Label className="mb-2 block">Shadow Type</Label>
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 w-full max-w-[200px]">
              <button
                onClick={() => updateShadow({ inset: false })}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${!activeShadow.inset
                  ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
              >
                Outset
              </button>
              <button
                onClick={() => updateShadow({ inset: true })}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${activeShadow.inset
                  ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
              >
                Inset
              </button>
            </div>
          </div>

          {/* Sliders Area - Moved Up Usefully */}
          <div className="space-y-6">
            {/* Blur */}
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm">Blur Radius</Label>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{activeShadow.blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={activeShadow.blur}
                onChange={(e) => updateShadow({ blur: Math.max(0, Number(e.target.value)) })}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 focus:outline-none transition-all"
              />
            </div>

            {/* Spread */}
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm">Spread Radius</Label>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{activeShadow.spread}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={activeShadow.spread}
                onChange={(e) => updateShadow({ spread: Number(e.target.value) })}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 focus:outline-none transition-all"
              />
            </div>

            {/* Opacity */}
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm">Opacity</Label>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{activeShadow.opacity}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={activeShadow.opacity}
                onChange={(e) => updateShadow({ opacity: Number(e.target.value) })}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <Label className="mb-2 block">Shadow Color</Label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
              <div
                className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 cursor-pointer shadow-sm flex-shrink-0"
                style={{ backgroundColor: activeShadow.color }} // Improved preview
              >
                <input
                  type="color"
                  value={activeShadow.color}
                  onChange={(e) => updateShadow({ color: e.target.value })}
                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 m-0 border-0 opacity-0"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={activeShadow.color}
                  onChange={(e) => updateShadow({ color: e.target.value })}
                  className="w-full bg-transparent border-none text-gray-900 dark:text-gray-100 text-sm font-mono uppercase focus:ring-0 p-0"
                />
                <p className="text-[10px] text-gray-400">Hex Color Code</p>
              </div>
            </div>
          </div>

          {/* Offset Controls Area - Moved Down for logical flow */}
          <div>
            <Label className="mb-4 block">Position & Direction</Label>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="flex gap-4">
                {/* Inputs Column */}
                <div className="flex flex-col gap-4 flex-1 justify-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-16">X Offset</span>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={activeShadow.hOffset}
                        onChange={(e) => updateShadow({ hOffset: Number(e.target.value) })}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-1.5 text-sm text-right focus:outline-none focus:border-blue-500 text-gray-900 dark:text-gray-100 transition-colors"
                      />
                      <span className="absolute right-2 top-1.5 text-xs text-gray-400 pointer-events-none">px</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-16">Y Offset</span>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={activeShadow.vOffset}
                        onChange={(e) => updateShadow({ vOffset: Number(e.target.value) })}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-1.5 text-sm text-right focus:outline-none focus:border-blue-500 text-gray-900 dark:text-gray-100 transition-colors"
                      />
                      <span className="absolute right-2 top-1.5 text-xs text-gray-400 pointer-events-none">px</span>
                    </div>
                  </div>
                </div>

                {/* 2D Pad Side */}
                <div className="w-[88px] h-[88px] bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 relative overflow-hidden cursor-crosshair shrink-0 shadow-inner"
                  ref={padRef}
                  onMouseDown={onMouseDown}
                  onTouchStart={(e) => {
                    setIsDragging(true);
                    if (e.touches[0]) handlePadChange(e.touches[0].clientX, e.touches[0].clientY);
                  }}
                >
                  {/* Grid Lines */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 dark:bg-gray-700"></div>
                  <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gray-100 dark:bg-gray-700"></div>

                  {/* SVG Connection Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${((activeShadow.hOffset + MAX_OFFSET) / (MAX_OFFSET * 2)) * 100}%`}
                      y2={`${((activeShadow.vOffset + MAX_OFFSET) / (MAX_OFFSET * 2)) * 100}%`}
                      stroke="rgba(59, 130, 246, 0.5)"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Control Dot */}
                  <div
                    className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-sm ring-2 ring-white dark:ring-gray-800 border border-white/20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75"
                    style={getDotPosition()}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Preview & Code */}
        <div className="space-y-6 sticky top-6">

          {/* Main Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="min-h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 relative z-0 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-100"></div>

              {/* Preview Object */}
              <div
                className={`w-36 h-36 md:w-56 md:h-56 bg-white dark:bg-gray-800 rounded-2xl transition-all duration-200 ease-out border border-gray-200 dark:border-gray-700 relative z-10`}
                style={{
                  boxShadow: finalBoxShadow
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 font-medium text-sm opacity-0 hover:opacity-100 transition-opacity select-none">
                  Preview Object
                </div>
              </div>
            </div>
          </div>

          {/* Layer Navigation (Moved from Left) */}
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                disabled={activeIndex === 0}
                onClick={() => setActiveShadowId(shadows[activeIndex - 1].id)}
                className="h-8 w-8 p-0"
              >
                ←
              </Button>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 min-w-[80px] text-center">
                Layer {activeIndex + 1} / {shadows.length}
              </span>
              <Button
                size="sm"
                variant="ghost"
                disabled={activeIndex === shadows.length - 1}
                onClick={() => setActiveShadowId(shadows[activeIndex + 1].id)}
                className="h-8 w-8 p-0"
              >
                →
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {shadows.length < MAX_SHADOWS && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={addShadow}
                  className="h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3"
                >
                  <Plus className="w-3 h-3 mr-1.5" /> Add
                </Button>
              )}
              {shadows.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => removeShadow(activeShadowId, e)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </div>

          {/* Code Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center gap-2">
              <Label>Generated Code</Label>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" onClick={() => copy(`box-shadow: ${finalBoxShadow};`, 'CSS')} className="h-7 text-xs px-2">
                  <Copy className="w-3 h-3 mr-1.5" /> CSS
                </Button>
                <Button size="sm" variant="ghost" onClick={() => copy(tailwindShadow, 'Tailwind')} className="h-7 text-xs px-2">
                  <Copy className="w-3 h-3 mr-1.5" /> Tailwind
                </Button>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <pre className="p-4 text-gray-800 dark:text-gray-200 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
                <code>box-shadow: {finalBoxShadow};</code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </ToolContainer>
  );
};

export default BoxShadowGenerator;

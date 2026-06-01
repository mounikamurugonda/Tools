'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/ui/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { useToast } from '@/components/ui/ToastProvider';
import { Download, RotateCcw, Image as ImageIcon, Type, ImagePlus } from 'lucide-react';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
type Mode = 'image' | 'text';

interface Settings {
  mode: Mode;
  opacity: number;
  position: Position;
  size: number;
  margin: number;
  rotation: number;
  // Text-specific
  text: string;
  color: string;
  strokeColor: string;
  strokeWidth: number;
}

const DEFAULT_SETTINGS: Settings = {
  mode: 'image',
  opacity: 0.7,
  position: 'bottom-right',
  size: 20,
  margin: 20,
  rotation: 0,
  text: '© Your Brand',
  color: '#ffffff',
  strokeColor: '#000000',
  strokeWidth: 2,
};

const WatermarkAdder: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [mainImageSrc, setMainImageSrc] = useState('');
  const [watermarkImageSrc, setWatermarkImageSrc] = useState('');
  const [watermarkedImageSrc, setWatermarkedImageSrc] = useState('');
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMainImageChange = useCallback((file: File | null) => {
    setMainImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setMainImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setMainImageSrc('');
      setWatermarkedImageSrc('');
    }
  }, []);

  const handleWatermarkImageChange = useCallback((file: File | null) => {
    setWatermarkImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setWatermarkImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setWatermarkImageSrc('');
    }
  }, []);

  const applyWatermark = useCallback(async () => {
    if (!mainImageSrc) return;
    if (settings.mode === 'image' && !watermarkImageSrc) return;
    if (settings.mode === 'text' && !settings.text.trim()) return;

    setIsProcessing(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const mainImg = new Image();
      await new Promise<void>((resolve, reject) => {
        mainImg.onload = () => resolve();
        mainImg.onerror = () => reject(new Error('main image failed'));
        mainImg.src = mainImageSrc;
      });

      canvas.width = mainImg.naturalWidth;
      canvas.height = mainImg.naturalHeight;
      ctx.drawImage(mainImg, 0, 0);
      ctx.globalAlpha = settings.opacity;

      const computeAnchor = (w: number, h: number) => {
        switch (settings.position) {
          case 'top-left':
            return { x: settings.margin, y: settings.margin };
          case 'top-right':
            return { x: mainImg.width - w - settings.margin, y: settings.margin };
          case 'bottom-left':
            return { x: settings.margin, y: mainImg.height - h - settings.margin };
          case 'bottom-right':
            return {
              x: mainImg.width - w - settings.margin,
              y: mainImg.height - h - settings.margin,
            };
          case 'center':
            return { x: (mainImg.width - w) / 2, y: (mainImg.height - h) / 2 };
        }
      };

      if (settings.mode === 'image') {
        const wm = new Image();
        await new Promise<void>((resolve, reject) => {
          wm.onload = () => resolve();
          wm.onerror = () => reject(new Error('watermark failed'));
          wm.src = watermarkImageSrc;
        });
        const target = Math.min(
          (mainImg.width * settings.size) / 100,
          (mainImg.height * settings.size) / 100
        );
        const aspect = wm.width / wm.height;
        const w = target;
        const h = target / aspect;
        const { x, y } = computeAnchor(w, h);
        ctx.save();
        ctx.translate(x + w / 2, y + h / 2);
        ctx.rotate((settings.rotation * Math.PI) / 180);
        ctx.drawImage(wm, -w / 2, -h / 2, w, h);
        ctx.restore();
      } else {
        // text mode — size is % of min(image dimension)
        const fontPx = Math.round(
          (Math.min(mainImg.width, mainImg.height) * settings.size) / 100
        );
        ctx.font = `bold ${fontPx}px system-ui, sans-serif`;
        ctx.textBaseline = 'top';
        const metrics = ctx.measureText(settings.text);
        const w = metrics.width;
        const h = fontPx;
        const { x, y } = computeAnchor(w, h);
        ctx.save();
        ctx.translate(x + w / 2, y + h / 2);
        ctx.rotate((settings.rotation * Math.PI) / 180);
        ctx.fillStyle = settings.color;
        if (settings.strokeWidth > 0) {
          ctx.lineWidth = settings.strokeWidth;
          ctx.strokeStyle = settings.strokeColor;
          ctx.strokeText(settings.text, -w / 2, -h / 2);
        }
        ctx.fillText(settings.text, -w / 2, -h / 2);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      setWatermarkedImageSrc(canvas.toDataURL('image/png'));
    } catch {
      toast.error('Could not generate watermark');
    } finally {
      setIsProcessing(false);
    }
  }, [mainImageSrc, watermarkImageSrc, settings, toast]);

  useEffect(() => {
    if (mainImageSrc && (settings.mode === 'image' ? watermarkImageSrc : settings.text)) {
      applyWatermark();
    }
  }, [mainImageSrc, watermarkImageSrc, settings, applyWatermark]);

  const downloadWatermarkedImage = (type: 'image/png' | 'image/jpeg') => {
    const canvas = canvasRef.current;
    if (!canvas || !watermarkedImageSrc) return;
    canvas.toBlob(
      blob => {
        if (!blob) {
          toast.error('Export failed');
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const ext = type === 'image/jpeg' ? 'jpg' : 'png';
        link.href = url;
        link.download = `watermarked_${(mainImage?.name || 'image').replace(/\.[^.]+$/, '')}.${ext}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        toast.success('Image downloaded');
      },
      type,
      type === 'image/jpeg' ? 0.92 : undefined
    );
  };

  const resetAll = () => {
    setMainImage(null);
    setWatermarkImage(null);
    setMainImageSrc('');
    setWatermarkImageSrc('');
    setWatermarkedImageSrc('');
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <ToolContainer title="Watermark Adder" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Uploads" className="space-y-4">
            <div className="space-y-2">
              <Label>Main Image</Label>
              <FileUpload
                accept="image/*"
                onChange={handleMainImageChange}
                description="The image to be watermarked"
                maxSizeMB={50}
              />
            </div>
            <div
              className="inline-flex rounded-md bg-gray-100 dark:bg-gray-800 p-0.5"
              role="radiogroup"
              aria-label="Watermark type"
            >
              <button
                role="radio"
                aria-checked={settings.mode === 'image'}
                onClick={() => setSettings(s => ({ ...s, mode: 'image' }))}
                className={`px-3 py-1.5 text-sm rounded inline-flex items-center gap-1.5 ${
                  settings.mode === 'image'
                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <ImagePlus className="w-3.5 h-3.5" /> Image
              </button>
              <button
                role="radio"
                aria-checked={settings.mode === 'text'}
                onClick={() => setSettings(s => ({ ...s, mode: 'text' }))}
                className={`px-3 py-1.5 text-sm rounded inline-flex items-center gap-1.5 ${
                  settings.mode === 'text'
                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <Type className="w-3.5 h-3.5" /> Text
              </button>
            </div>
            {settings.mode === 'image' ? (
              <div className="space-y-2">
                <Label>Watermark / Logo</Label>
                <FileUpload
                  accept="image/*"
                  onChange={handleWatermarkImageChange}
                  description="The watermark image (transparent PNG recommended)"
                  maxSizeMB={10}
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label className="mb-1">Watermark text</Label>
                  <Input
                    value={settings.text}
                    onChange={e => setSettings(s => ({ ...s, text: e.target.value }))}
                    placeholder="© Your Brand"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Fill</Label>
                    <Input
                      type="color"
                      value={settings.color}
                      onChange={e => setSettings(s => ({ ...s, color: e.target.value }))}
                      className="w-full h-9 p-1 cursor-pointer"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Outline</Label>
                    <Input
                      type="color"
                      value={settings.strokeColor}
                      onChange={e => setSettings(s => ({ ...s, strokeColor: e.target.value }))}
                      className="w-full h-9 p-1 cursor-pointer"
                    />
                  </div>
                </div>
                <Slider
                  label="Outline width"
                  min={0}
                  max={8}
                  step={1}
                  value={settings.strokeWidth}
                  onChange={e =>
                    setSettings(s => ({ ...s, strokeWidth: Number(e.target.value) }))
                  }
                  valueDisplay={`${settings.strokeWidth}px`}
                />
              </div>
            )}
          </Card>

          <Card
            title="Settings"
            className={!mainImageSrc ? 'opacity-50 pointer-events-none' : ''}
          >
            <div className="space-y-5">
              <div>
                <Label className="mb-2">Position</Label>
                <Select
                  value={settings.position}
                  onChange={e =>
                    setSettings(prev => ({ ...prev, position: e.target.value as Position }))
                  }
                >
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="center">Center</option>
                </Select>
              </div>

              <Slider
                label="Opacity"
                min={0.1}
                max={1}
                step={0.05}
                value={settings.opacity}
                onChange={e =>
                  setSettings(prev => ({ ...prev, opacity: parseFloat(e.target.value) }))
                }
                valueDisplay={`${Math.round(settings.opacity * 100)}%`}
              />
              <Slider
                label={settings.mode === 'image' ? 'Size (%)' : 'Font size (%)'}
                min={2}
                max={50}
                step={1}
                value={settings.size}
                onChange={e => setSettings(prev => ({ ...prev, size: Number(e.target.value) }))}
                valueDisplay={`${settings.size}%`}
              />
              <Slider
                label="Margin (px)"
                min={0}
                max={100}
                step={5}
                value={settings.margin}
                onChange={e => setSettings(prev => ({ ...prev, margin: Number(e.target.value) }))}
                valueDisplay={`${settings.margin}px`}
              />
              <Slider
                label="Rotation"
                min={-180}
                max={180}
                step={5}
                value={settings.rotation}
                onChange={e =>
                  setSettings(prev => ({ ...prev, rotation: Number(e.target.value) }))
                }
                valueDisplay={`${settings.rotation}°`}
              />

              <Button onClick={resetAll} variant="secondary" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" /> Start Over
              </Button>
            </div>
          </Card>
        </div>

        {mainImageSrc && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Original Image">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                <img
                  src={mainImageSrc}
                  alt="Original"
                  className="max-w-full max-h-[300px] object-contain rounded shadow-sm"
                />
              </div>
            </Card>

            <Card title="Watermarked Result">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 flex items-center justify-center min-h-[200px] relative">
                {isProcessing && (
                  <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                      <span className="text-sm font-medium">Processing...</span>
                    </div>
                  </div>
                )}
                {watermarkedImageSrc ? (
                  <img
                    src={watermarkedImageSrc}
                    alt="Result"
                    className="max-w-full max-h-[300px] object-contain rounded shadow-lg"
                  />
                ) : (
                  <div className="text-gray-400 text-sm flex flex-col items-center">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span>
                      {settings.mode === 'image'
                        ? 'Upload a watermark image'
                        : 'Enter watermark text'}
                    </span>
                  </div>
                )}
              </div>
              {watermarkedImageSrc && (
                <div className="mt-4 flex gap-2 justify-end flex-wrap">
                  <Button onClick={() => downloadWatermarkedImage('image/png')} variant="primary">
                    <Download className="w-4 h-4 mr-1.5" /> PNG
                  </Button>
                  <Button
                    onClick={() => downloadWatermarkedImage('image/jpeg')}
                    variant="secondary"
                  >
                    <Download className="w-4 h-4 mr-1.5" /> JPEG
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </ToolContainer>
  );
};

export default WatermarkAdder;

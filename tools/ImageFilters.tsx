'use client';

import React, { useMemo, useRef, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/ui/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import { useToast } from '@/components/ui/ToastProvider';
import { Download, RotateCcw, Image as ImageIcon, Copy } from 'lucide-react';

interface Filters {
  grayscale: number;
  sepia: number;
  brightness: number;
  contrast: number;
  saturate: number;
  invert: number;
  blur: number;
  hueRotate: number;
}

const DEFAULT_FILTERS: Filters = {
  grayscale: 0,
  sepia: 0,
  brightness: 100,
  contrast: 100,
  saturate: 100,
  invert: 0,
  blur: 0,
  hueRotate: 0,
};

const PRESETS: Array<{ name: string; filters: Filters }> = [
  { name: 'Original', filters: DEFAULT_FILTERS },
  {
    name: 'Clarendon',
    filters: { ...DEFAULT_FILTERS, contrast: 120, saturate: 125, brightness: 105 },
  },
  { name: 'Moon', filters: { ...DEFAULT_FILTERS, grayscale: 100, contrast: 110, brightness: 110 } },
  { name: 'Lark', filters: { ...DEFAULT_FILTERS, contrast: 90, brightness: 110, saturate: 110 } },
  { name: 'Sepia', filters: { ...DEFAULT_FILTERS, sepia: 80, contrast: 110, brightness: 105 } },
  {
    name: 'Vintage',
    filters: { ...DEFAULT_FILTERS, sepia: 30, saturate: 80, contrast: 95, hueRotate: 350 },
  },
  { name: 'Cool', filters: { ...DEFAULT_FILTERS, hueRotate: 180, saturate: 110 } },
  { name: 'Warm', filters: { ...DEFAULT_FILTERS, hueRotate: 25, saturate: 120, brightness: 105 } },
  { name: 'Invert', filters: { ...DEFAULT_FILTERS, invert: 100 } },
];

const ImageFilters: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [image, setImage] = useState<string>('');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [activePreset, setActivePreset] = useState<string>('Original');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const filterString = useMemo(
    () =>
      `grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) invert(${filters.invert}%) blur(${filters.blur}px) hue-rotate(${filters.hueRotate}deg)`,
    [filters]
  );

  const handleUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.onerror = () => toast.error('Could not read image');
    reader.readAsDataURL(file);
  };

  const applyFilter = (key: keyof Filters, value: number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setActivePreset('Custom');
  };

  const applyPreset = (preset: { name: string; filters: Filters }) => {
    setFilters(preset.filters);
    setActivePreset(preset.name);
  };

  const downloadImage = (type: 'image/png' | 'image/jpeg') => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      toast.error('Canvas not available');
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.filter = filterString;
      if (type === 'image/jpeg') {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        blob => {
          if (!blob) {
            toast.error('Export failed');
            return;
          }
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `filtered.${type === 'image/jpeg' ? 'jpg' : 'png'}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          toast.success('Image saved');
        },
        type,
        type === 'image/jpeg' ? 0.92 : undefined
      );
    };
    img.onerror = () => toast.error('Could not load image');
    img.src = image;
  };

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(`filter: ${filterString};`);
      toast.success('Copied CSS filter');
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <ToolContainer title="Instagram Photo Filters" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card className="min-h-[400px] flex items-center justify-center p-0 overflow-hidden relative bg-gray-100 dark:bg-gray-900/50 border-dashed border-2 border-gray-200 dark:border-gray-800">
            {image ? (
              <img
                src={image}
                style={{ filter: filterString }}
                className="max-w-full max-h-[600px] object-contain"
                alt="Preview"
              />
            ) : (
              <div className="absolute inset-0 p-6">
                <FileUpload
                  accept="image/*"
                  onFileSelect={file => handleUpload(file)}
                  className="w-full h-full"
                />
              </div>
            )}
          </Card>

          {image && (
            <Card>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => downloadImage('image/png')} variant="primary">
                  <Download className="w-4 h-4 mr-1.5" /> PNG
                </Button>
                <Button onClick={() => downloadImage('image/jpeg')} variant="secondary">
                  <Download className="w-4 h-4 mr-1.5" /> JPEG
                </Button>
                <Button onClick={copyCss} variant="secondary">
                  <Copy className="w-4 h-4 mr-1.5" /> Copy CSS
                </Button>
                <Button
                  onClick={() => {
                    setFilters(DEFAULT_FILTERS);
                    setActivePreset('Original');
                  }}
                  variant="secondary"
                >
                  <RotateCcw className="w-4 h-4 mr-1.5" /> Reset
                </Button>
                <Button
                  onClick={() => {
                    setImage('');
                    setFilters(DEFAULT_FILTERS);
                    setActivePreset('Original');
                  }}
                  variant="secondary"
                  className="text-red-600 hover:text-red-700 ml-auto"
                >
                  Clear
                </Button>
              </div>
            </Card>
          )}
        </div>

        {image ? (
          <div className="space-y-4">
            <Card title="Presets">
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(p => (
                  <button
                    key={p.name}
                    onClick={() => applyPreset(p)}
                    aria-pressed={activePreset === p.name}
                    className={`px-2.5 py-1 text-xs rounded-md border transition ${
                      activePreset === p.name
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </Card>

            <Card title="Adjustments">
              <div className="space-y-5">
                <Slider
                  label="Grayscale"
                  value={filters.grayscale}
                  onChange={e => applyFilter('grayscale', Number(e.target.value))}
                  max={100}
                  valueDisplay={`${filters.grayscale}%`}
                />
                <Slider
                  label="Sepia"
                  value={filters.sepia}
                  onChange={e => applyFilter('sepia', Number(e.target.value))}
                  max={100}
                  valueDisplay={`${filters.sepia}%`}
                />
                <Slider
                  label="Brightness"
                  value={filters.brightness}
                  onChange={e => applyFilter('brightness', Number(e.target.value))}
                  max={200}
                  valueDisplay={`${filters.brightness}%`}
                />
                <Slider
                  label="Contrast"
                  value={filters.contrast}
                  onChange={e => applyFilter('contrast', Number(e.target.value))}
                  max={200}
                  valueDisplay={`${filters.contrast}%`}
                />
                <Slider
                  label="Saturate"
                  value={filters.saturate}
                  onChange={e => applyFilter('saturate', Number(e.target.value))}
                  max={200}
                  valueDisplay={`${filters.saturate}%`}
                />
                <Slider
                  label="Invert"
                  value={filters.invert}
                  onChange={e => applyFilter('invert', Number(e.target.value))}
                  max={100}
                  valueDisplay={`${filters.invert}%`}
                />
                <Slider
                  label="Blur"
                  value={filters.blur}
                  onChange={e => applyFilter('blur', Number(e.target.value))}
                  max={20}
                  valueDisplay={`${filters.blur}px`}
                />
                <Slider
                  label="Hue Rotate"
                  value={filters.hueRotate}
                  onChange={e => applyFilter('hueRotate', Number(e.target.value))}
                  max={360}
                  valueDisplay={`${filters.hueRotate}°`}
                />
              </div>
            </Card>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 h-[400px]">
            <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
            <p>Upload an image to start editing</p>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolContainer>
  );
};

export default ImageFilters;

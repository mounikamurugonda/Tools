'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import { Download, RotateCcw, Image as ImageIcon } from 'lucide-react';

interface Filters {
  grayscale: number;
  sepia: number;
  brightness: number;
  contrast: number;
  blur: number;
  hueRotate: number;
}

const DEFAULT_FILTERS: Filters = {
  grayscale: 0,
  sepia: 0,
  brightness: 100,
  contrast: 100,
  blur: 0,
  hueRotate: 0,
};

const ImageFilters: React.FC<ToolProps> = ({ details, toolId }) => {
  const [image, setImage] = useState<string>('');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getFilterString = () => {
    return `grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) brightness(${filters.brightness}%) contrast(${filters.contrast}%) blur(${filters.blur}px) hue-rotate(${filters.hueRotate}deg)`;
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.filter = getFilterString();
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = 'filtered-image.png';
        link.href = canvas.toDataURL();
        link.click();
      }
    };
  };

  return (
    <ToolContainer
      title="Instagram Photo Filters"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card className="min-h-[400px] flex items-center justify-center p-0 overflow-hidden relative bg-gray-100 dark:bg-gray-900/50 border-dashed border-2 border-gray-200 dark:border-gray-800 group">
            {image ? (
              <img
                src={image}
                style={{ filter: getFilterString() }}
                className="max-w-full max-h-[600px] object-contain"
                alt="Preview"
              />
            ) : (
              <div className="absolute inset-0 p-6">
                <FileUpload
                  accept="image/*"
                  onChange={handleUpload}
                  className="w-full h-full"
                />
              </div>
            )}
            {image && (
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      handleUpload(file || null);
                    };
                    input.click();
                  }}
                >
                  Change Image
                </Button>
              </div>
            )}
          </Card>

          {image && (
            <Card className="flex gap-4">
              <Button
                onClick={downloadImage}
                className="flex-1"
                variant="primary"
              >
                <Download className="w-4 h-4 mr-2" /> Download Image
              </Button>
              <Button
                onClick={() => {
                  setFilters(DEFAULT_FILTERS);
                }}
                variant="secondary"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Reset Filters
              </Button>
              <Button
                onClick={() => {
                  setImage('');
                  setFilters(DEFAULT_FILTERS);
                }}
                variant="outline"
                className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Clear
              </Button>
            </Card>
          )}
        </div>

        {image ? (
          <div className="space-y-6">
            <Card title="Adjustments" className="h-[calc(100%-1rem)]">
              <div className="space-y-6">
                <Slider
                  label="Grayscale"
                  value={filters.grayscale}
                  onChange={(e) => setFilters({ ...filters, grayscale: parseInt(e.target.value) })}
                  max={100}
                  valueDisplay={`${filters.grayscale}%`}
                />
                <Slider
                  label="Sepia"
                  value={filters.sepia}
                  onChange={(e) => setFilters({ ...filters, sepia: parseInt(e.target.value) })}
                  max={100}
                  valueDisplay={`${filters.sepia}%`}
                />
                <Slider
                  label="Brightness"
                  value={filters.brightness}
                  onChange={(e) => setFilters({ ...filters, brightness: parseInt(e.target.value) })}
                  max={200}
                  valueDisplay={`${filters.brightness}%`}
                />
                <Slider
                  label="Contrast"
                  value={filters.contrast}
                  onChange={(e) => setFilters({ ...filters, contrast: parseInt(e.target.value) })}
                  max={200}
                  valueDisplay={`${filters.contrast}%`}
                />
                <Slider
                  label="Blur"
                  value={filters.blur}
                  onChange={(e) => setFilters({ ...filters, blur: parseInt(e.target.value) })}
                  max={20}
                  valueDisplay={`${filters.blur}px`}
                />
                <Slider
                  label="Hue Rotate"
                  value={filters.hueRotate}
                  onChange={(e) => setFilters({ ...filters, hueRotate: parseInt(e.target.value) })}
                  max={360}
                  valueDisplay={`${filters.hueRotate}°`}
                />

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <Button
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                    variant="ghost"
                    size="sm"
                    className="w-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    Reset to Default
                  </Button>
                </div>
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

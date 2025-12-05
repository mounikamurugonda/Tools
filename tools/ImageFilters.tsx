
'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';

interface Filters {
    grayscale: number;
    sepia: number;
    brightness: number;
    contrast: number;
    blur: number;
    hueRotate: number;
}

const DEFAULT_FILTERS: Filters = { grayscale: 0, sepia: 0, brightness: 100, contrast: 100, blur: 0, hueRotate: 0 };

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
    <ToolContainer title="Instagram Photo Filters" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
            <div className="relative min-h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {image ? (
                    <img src={image} style={{ filter: getFilterString() }} className="max-w-full max-h-[600px] object-contain" alt="Preview" />
                ) : (
                    <FileUpload accept="image/*" onChange={handleUpload} className="w-full h-full" />
                )}
            </div>
            {image && (
                <div className="flex gap-4">
                    <button onClick={downloadImage} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">Download Image</button>
                    <button onClick={() => {setImage(''); setFilters(DEFAULT_FILTERS);}} className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded font-medium">Reset</button>
                </div>
            )}
        </div>
        
        {image && (
            <div className="space-y-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg">Adjustments</h3>
                <FilterSlider label="Grayscale" value={filters.grayscale} onChange={(v: number) => setFilters({...filters, grayscale: v})} max={100} unit="%" />
                <FilterSlider label="Sepia" value={filters.sepia} onChange={(v: number) => setFilters({...filters, sepia: v})} max={100} unit="%" />
                <FilterSlider label="Brightness" value={filters.brightness} onChange={(v: number) => setFilters({...filters, brightness: v})} max={200} unit="%" />
                <FilterSlider label="Contrast" value={filters.contrast} onChange={(v: number) => setFilters({...filters, contrast: v})} max={200} unit="%" />
                <FilterSlider label="Blur" value={filters.blur} onChange={(v: number) => setFilters({...filters, blur: v})} max={20} unit="px" />
                <FilterSlider label="Hue Rotate" value={filters.hueRotate} onChange={(v: number) => setFilters({...filters, hueRotate: v})} max={360} unit="deg" />
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button onClick={() => setFilters(DEFAULT_FILTERS)} className="text-sm text-blue-600 hover:underline">Reset Filters</button>
                </div>
            </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolContainer>
  );
};

const FilterSlider = ({ label, value, onChange, max, unit }: { label: string; value: number; onChange: (v: number) => void; max: number; unit: string; }) => (
    <div>
        <div className="flex justify-between mb-1">
            <label className="text-sm font-medium">{label}</label>
            <span className="text-sm text-gray-500">{value}{unit}</span>
        </div>
        <input type="range" min="0" max={max} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full" />
    </div>
);

export default ImageFilters;

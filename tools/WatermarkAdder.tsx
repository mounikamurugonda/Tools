'use client';

import React, { useState, useRef, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import { Download, RotateCcw, Settings } from 'lucide-react';

interface WatermarkSettings {
  opacity: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size: number; // percentage of image size
  margin: number; // pixels from edge
}

const WatermarkAdder: React.FC<ToolProps> = ({ details, toolId }) => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [mainImageSrc, setMainImageSrc] = useState<string>('');
  const [watermarkImageSrc, setWatermarkImageSrc] = useState<string>('');
  const [watermarkedImageSrc, setWatermarkedImageSrc] = useState<string>('');
  const [settings, setSettings] = useState<WatermarkSettings>({
    opacity: 0.7,
    position: 'bottom-right',
    size: 20,
    margin: 20
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMainImageChange = useCallback((file: File | null) => {
    setMainImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMainImageSrc(reader.result as string);
      };
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
      reader.onload = () => {
        setWatermarkImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setWatermarkImageSrc('');
      setWatermarkedImageSrc('');
    }
  }, []);

  const applyWatermark = useCallback(async () => {
    if (!mainImageSrc || !watermarkImageSrc) return;

    setIsProcessing(true);
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Load main image
      const mainImg = new Image();
      await new Promise((resolve, reject) => {
        mainImg.onload = resolve;
        mainImg.onerror = reject;
        mainImg.src = mainImageSrc;
      });

      // Load watermark image
      const watermarkImg = new Image();
      await new Promise((resolve, reject) => {
        watermarkImg.onload = resolve;
        watermarkImg.onerror = reject;
        watermarkImg.src = watermarkImageSrc;
      });

      // Set canvas size to match main image
      canvas.width = mainImg.width;
      canvas.height = mainImg.height;

      // Draw main image
      ctx.drawImage(mainImg, 0, 0);

      // Calculate watermark size and position
      const watermarkSize = Math.min(
        (mainImg.width * settings.size) / 100,
        (mainImg.height * settings.size) / 100
      );
      
      const watermarkAspectRatio = watermarkImg.width / watermarkImg.height;
      const watermarkWidth = watermarkSize;
      const watermarkHeight = watermarkSize / watermarkAspectRatio;

      let x = 0;
      let y = 0;

      switch (settings.position) {
        case 'top-left':
          x = settings.margin;
          y = settings.margin;
          break;
        case 'top-right':
          x = mainImg.width - watermarkWidth - settings.margin;
          y = settings.margin;
          break;
        case 'bottom-left':
          x = settings.margin;
          y = mainImg.height - watermarkHeight - settings.margin;
          break;
        case 'bottom-right':
          x = mainImg.width - watermarkWidth - settings.margin;
          y = mainImg.height - watermarkHeight - settings.margin;
          break;
        case 'center':
          x = (mainImg.width - watermarkWidth) / 2;
          y = (mainImg.height - watermarkHeight) / 2;
          break;
      }

      // Set opacity and draw watermark
      ctx.globalAlpha = settings.opacity;
      ctx.drawImage(watermarkImg, x, y, watermarkWidth, watermarkHeight);
      ctx.globalAlpha = 1;

      // Convert to data URL
      const watermarkedDataUrl = canvas.toDataURL('image/png', 0.9);
      setWatermarkedImageSrc(watermarkedDataUrl);
    } catch (error) {
      console.error('Error applying watermark:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [mainImageSrc, watermarkImageSrc, settings]);

  const downloadWatermarkedImage = () => {
    if (!watermarkedImageSrc) return;
    
    const link = document.createElement('a');
    link.href = watermarkedImageSrc;
    link.download = `watermarked_${mainImage?.name || 'image'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    setMainImage(null);
    setWatermarkImage(null);
    setMainImageSrc('');
    setWatermarkImageSrc('');
    setWatermarkedImageSrc('');
  };

  // Auto-apply watermark when settings change
  React.useEffect(() => {
    if (mainImageSrc && watermarkImageSrc) {
      applyWatermark();
    }
  }, [mainImageSrc, watermarkImageSrc, settings, applyWatermark]);

  return (
    <ToolContainer title="Watermark Adder" details={details} toolId={toolId}>
      <div className="space-y-6">
        {/* File Uploads */}
        <div className="grid md:grid-cols-2 gap-6">
          <FileUpload
            accept="image/*"
            onChange={handleMainImageChange}
            label="Upload Main Image"
            description="The image you want to add a watermark to"
            maxSize={50}
          />
          <FileUpload
            accept="image/*"
            onChange={handleWatermarkImageChange}
            label="Upload Watermark/Logo"
            description="The watermark or logo to add to the image"
            maxSize={10}
          />
        </div>

        {/* Settings Panel */}
        {(mainImageSrc && watermarkImageSrc) && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Watermark Settings</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Opacity: {Math.round(settings.opacity * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={settings.opacity}
                  onChange={(e) => setSettings(prev => ({ ...prev, opacity: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Size: {settings.size}%
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={settings.size}
                  onChange={(e) => setSettings(prev => ({ ...prev, size: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Margin: {settings.margin}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={settings.margin}
                  onChange={(e) => setSettings(prev => ({ ...prev, margin: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Position
                </label>
                <select
                  value={settings.position}
                  onChange={(e) => setSettings(prev => ({ ...prev, position: e.target.value as WatermarkSettings['position'] }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="center">Center</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Preview and Results */}
        {(mainImageSrc || watermarkImageSrc || watermarkedImageSrc) && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainImageSrc && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Original Image</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <img src={mainImageSrc} alt="Original" className="max-w-full max-h-64 mx-auto rounded" />
                </div>
              </div>
            )}

            {watermarkImageSrc && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Watermark</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <img src={watermarkImageSrc} alt="Watermark" className="max-w-full max-h-64 mx-auto rounded" />
                </div>
              </div>
            )}

            {watermarkedImageSrc && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Result</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <img src={watermarkedImageSrc} alt="Watermarked" className="max-w-full max-h-64 mx-auto rounded" />
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={downloadWatermarkedImage}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={resetAll}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400"></div>
              Processing watermark...
            </div>
          </div>
        )}

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </ToolContainer>
  );
};

export default WatermarkAdder;

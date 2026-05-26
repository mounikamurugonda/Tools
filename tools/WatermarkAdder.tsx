'use client';

import React, { useState, useRef, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/ui/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import Select from '@/components/ui/Select';
import Label from '@/components/ui/Label';
import { Download, RotateCcw, Settings, Upload, Image as ImageIcon } from 'lucide-react';

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
    margin: 20,
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
            <div className="space-y-2">
              <Label>Watermark / Logo</Label>
              <FileUpload
                accept="image/*"
                onChange={handleWatermarkImageChange}
                description="The watermark image"
                maxSizeMB={10}
              />
            </div>
          </Card>

          {/* Settings Panel */}
          <Card
            title="Settings"
            className={!mainImageSrc || !watermarkImageSrc ? 'opacity-50 pointer-events-none' : ''}
          >
            <div className="space-y-6">
              <div>
                <Label className="mb-2">Position</Label>
                <Select
                  value={settings.position}
                  onChange={e =>
                    setSettings(prev => ({
                      ...prev,
                      position: e.target.value as WatermarkSettings['position'],
                    }))
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
                step={0.1}
                value={settings.opacity}
                onChange={e =>
                  setSettings(prev => ({ ...prev, opacity: parseFloat(e.target.value) }))
                }
                valueDisplay={`${Math.round(settings.opacity * 100)}%`}
              />

              <Slider
                label="Size (%)"
                min={5}
                max={50}
                step={5}
                value={settings.size}
                onChange={e => setSettings(prev => ({ ...prev, size: parseInt(e.target.value) }))}
                valueDisplay={`${settings.size}%`}
              />

              <Slider
                label="Margin (px)"
                min={0}
                max={100}
                step={5}
                value={settings.margin}
                onChange={e => setSettings(prev => ({ ...prev, margin: parseInt(e.target.value) }))}
                valueDisplay={`${settings.margin}px`}
              />

              <Button onClick={resetAll} variant="outline" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" /> Start Over
              </Button>
            </div>
          </Card>
        </div>

        {/* Previews */}
        {(mainImageSrc || watermarkImageSrc) && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Preview */}
            <Card title="Original Image">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                {mainImageSrc ? (
                  <img
                    src={mainImageSrc}
                    alt="Original"
                    className="max-w-full max-h-[300px] object-contain rounded shadow-sm"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">No image uploaded</div>
                )}
              </div>
            </Card>

            {/* Result Preview */}
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
                    <span>Result will appear here</span>
                  </div>
                )}
              </div>
              {watermarkedImageSrc && (
                <div className="mt-4 flex justify-end">
                  <Button onClick={downloadWatermarkedImage} variant="primary">
                    <Download className="w-4 h-4 mr-2" /> Download Image
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </ToolContainer>
  );
};

export default WatermarkAdder;

'use client';

import React, { useState, useRef, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/ui/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import {
  Download,
  RotateCcw,
  Settings,
  Maximize2,
  Minimize2,
  Image as ImageIcon,
  Check
} from 'lucide-react';

interface ResizeSettings {
  mode: 'percentage' | 'dimensions';
  percentage: number;
  width: number;
  height: number;
  keepAspectRatio: boolean;
  quality: number;
}

const ImageResizer: React.FC<ToolProps> = ({ details, toolId }) => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string>('');
  const [resizedImageSrc, setResizedImageSrc] = useState<string>('');
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [resizedDimensions, setResizedDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [settings, setSettings] = useState<ResizeSettings>({
    mode: 'percentage',
    percentage: 100,
    width: 800,
    height: 600,
    keepAspectRatio: true,
    quality: 0.9,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageChange = useCallback((file: File | null) => {
    setOriginalImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setOriginalImageSrc(result);

        // Get original dimensions
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          // Set initial dimensions based on original
          setSettings((prev) => ({
            ...prev,
            width: img.width,
            height: img.height,
          }));
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    } else {
      setOriginalImageSrc('');
      setOriginalDimensions(null);
      setResizedImageSrc('');
      setResizedDimensions(null);
    }
  }, []);

  const resizeImage = useCallback(async () => {
    if (!originalImageSrc || !originalDimensions) return;

    setIsProcessing(true);

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Load original image
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = originalImageSrc;
      });

      let newWidth: number;
      let newHeight: number;

      if (settings.mode === 'percentage') {
        newWidth = Math.round(
          (originalDimensions.width * settings.percentage) / 100,
        );
        newHeight = Math.round(
          (originalDimensions.height * settings.percentage) / 100,
        );
      } else {
        if (settings.keepAspectRatio) {
          const aspectRatio =
            originalDimensions.width / originalDimensions.height;
          if (settings.width / settings.height > aspectRatio) {
            // Height is the limiting factor
            newHeight = settings.height;
            newWidth = Math.round(settings.height * aspectRatio);
          } else {
            // Width is the limiting factor
            newWidth = settings.width;
            newHeight = Math.round(settings.width / aspectRatio);
          }
        } else {
          newWidth = settings.width;
          newHeight = settings.height;
        }
      }

      // Set canvas size
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Draw resized image
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Convert to data URL
      const resizedDataUrl = canvas.toDataURL('image/jpeg', settings.quality);
      setResizedImageSrc(resizedDataUrl);
      setResizedDimensions({ width: newWidth, height: newHeight });
    } catch (error) {
      console.error('Error resizing image:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [originalImageSrc, originalDimensions, settings]);

  const downloadResizedImage = () => {
    if (!resizedImageSrc) return;

    const link = document.createElement('a');
    link.href = resizedImageSrc;
    link.download = `resized_${originalImage?.name || 'image'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    setOriginalImage(null);
    setOriginalImageSrc('');
    setResizedImageSrc('');
    setOriginalDimensions(null);
    setResizedDimensions(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Auto-resize when settings change
  React.useEffect(() => {
    if (originalImageSrc && originalDimensions) {
      resizeImage();
    }
  }, [originalImageSrc, originalDimensions, settings, resizeImage]);

  return (
    <ToolContainer title="Image Resizer" details={details} toolId={toolId}>
      <div className="space-y-6">
        {/* File Upload */}
        {!originalImageSrc && (
          <Card title="Upload Image">
            <FileUpload
              accept="image/*"
              onFileSelect={handleImageChange}
              title="Upload Image to Resize"
              description="Select an image file to resize"
            />
          </Card>
        )}

        {/* Resize Settings */}
        {originalImageSrc && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Sidebar Settings */}
            <div className="space-y-6">
              <Card title="Resize Settings">
                <div className="space-y-6">
                  {/* Resize Mode */}
                  <div>
                    <Label>Resize Mode</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={settings.mode === 'percentage' ? 'primary' : 'secondary'}
                        onClick={() => setSettings(prev => ({ ...prev, mode: 'percentage' }))}
                        size="sm"
                      >
                        Percentage
                      </Button>
                      <Button
                        variant={settings.mode === 'dimensions' ? 'primary' : 'secondary'}
                        onClick={() => setSettings(prev => ({ ...prev, mode: 'dimensions' }))}
                        size="sm"
                      >
                        Dimensions
                      </Button>
                    </div>
                  </div>

                  {/* Percentage Mode */}
                  {settings.mode === 'percentage' && (
                    <Slider
                      label="Scale"
                      min={1}
                      max={200}
                      value={settings.percentage}
                      onChange={(e) => setSettings(prev => ({ ...prev, percentage: parseInt(e.target.value) }))}
                      valueDisplay={`${settings.percentage}%`}
                    />
                  )}

                  {/* Dimensions Mode */}
                  {settings.mode === 'dimensions' && (
                    <div className="space-y-4">
                      <Slider
                        label="Width (px)"
                        min={1}
                        max={4000}
                        value={settings.width}
                        onChange={(e) => setSettings(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                        valueDisplay={`${settings.width}`}
                      />
                      <Slider
                        label="Height (px)"
                        min={1}
                        max={4000}
                        value={settings.height}
                        onChange={(e) => setSettings(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                        valueDisplay={`${settings.height}`}
                      />
                    </div>
                  )}

                  {/* Keep Aspect Ratio */}
                  <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded border cursor-pointer ${settings.keepAspectRatio ? 'bg-blue-600 border-blue-600' : 'border-gray-300 dark:border-gray-600'}`}
                      onClick={() => setSettings(prev => ({ ...prev, keepAspectRatio: !prev.keepAspectRatio }))}
                    >
                      {settings.keepAspectRatio && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <label
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                      onClick={() => setSettings(prev => ({ ...prev, keepAspectRatio: !prev.keepAspectRatio }))}
                    >
                      Keep aspect ratio
                    </label>
                  </div>

                  {/* Quality */}
                  <Slider
                    label="Quality"
                    min={0.1}
                    max={1}
                    step={0.1}
                    value={settings.quality}
                    onChange={(e) => setSettings(prev => ({ ...prev, quality: parseFloat(e.target.value) }))}
                    valueDisplay={`${Math.round(settings.quality * 100)}%`}
                  />

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Button
                      onClick={resetAll}
                      variant="secondary"
                      className="w-full"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Image Info Card */}
              {originalDimensions && (
                <Card title="Image Info">
                  <div className="space-y-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400 font-medium uppercase text-xs">Original</p>
                      <p className="font-mono">{originalDimensions.width} × {originalDimensions.height} px</p>
                      <p className="text-gray-600 dark:text-gray-400">{originalImage ? formatFileSize(originalImage.size) : 'Unknown'}</p>
                    </div>

                    {resizedDimensions && (
                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-1">
                        <p className="text-gray-500 dark:text-gray-400 font-medium uppercase text-xs">Resized</p>
                        <p className="font-mono">{resizedDimensions.width} × {resizedDimensions.height} px</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {originalDimensions
                            ? Math.round(((resizedDimensions.width * resizedDimensions.height) / (originalDimensions.width * originalDimensions.height)) * 100)
                            : 0}
                          % of original
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>

            {/* Preview Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Processing Indicator */}
              {isProcessing && (
                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  Processing...
                </div>
              )}

              <div className="grid gap-6">
                {originalImageSrc && (
                  <Card title="Original" className="bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex items-center justify-center p-4 min-h-[200px]">
                      <img src={originalImageSrc} alt="Original" className="max-w-full max-h-[300px] object-contain rounded shadow-sm" />
                    </div>
                  </Card>
                )}

                {resizedImageSrc && (
                  <Card title="Resized Output" className="bg-gray-50 dark:bg-gray-900/50 border-blue-200 dark:border-blue-900">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-center p-4 min-h-[200px]">
                        <img src={resizedImageSrc} alt="Resized" className="max-w-full max-h-[400px] object-contain rounded shadow-lg" />
                      </div>
                      <div className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-4">
                        <Button
                          onClick={downloadResizedImage}
                          size="sm"
                          variant="primary"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </ToolContainer>
  );
};

export default ImageResizer;

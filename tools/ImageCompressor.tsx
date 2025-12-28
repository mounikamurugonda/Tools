'use client';

import React, { useState, useRef, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/ui/FileUpload';
import { Download, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';

interface CompressionSettings {
  quality: number;
  maxWidth: number;
  maxHeight: number;
  maintainAspectRatio: boolean;
  outputFormat: 'jpeg' | 'png' | 'webp';
  aggressiveCompression: boolean;
}

const ImageCompressor: React.FC<ToolProps> = ({ details, toolId }) => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string>('');
  const [compressedImageSrc, setCompressedImageSrc] = useState<string>('');
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [compressedDimensions, setCompressedDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [settings, setSettings] = useState<CompressionSettings>({
    quality: 0.8,
    maxWidth: 1920,
    maxHeight: 1080,
    maintainAspectRatio: true,
    outputFormat: 'jpeg',
    aggressiveCompression: false,
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
        setOriginalSize(file.size);

        // Get original dimensions
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          // Set initial max dimensions based on original
          setSettings(prev => ({
            ...prev,
            maxWidth: Math.min(img.width, 1920),
            maxHeight: Math.min(img.height, 1080),
          }));
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    } else {
      setOriginalImageSrc('');
      setOriginalDimensions(null);
      setCompressedImageSrc('');
      setCompressedDimensions(null);
      setOriginalSize(0);
      setCompressedSize(0);
    }
  }, []);

  const compressImage = useCallback(async () => {
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

      let newWidth = img.width;
      let newHeight = img.height;

      // Calculate new dimensions
      if (settings.maintainAspectRatio) {
        const aspectRatio = img.width / img.height;

        if (img.width > settings.maxWidth || img.height > settings.maxHeight) {
          if (img.width / settings.maxWidth > img.height / settings.maxHeight) {
            // Width is the limiting factor
            newWidth = settings.maxWidth;
            newHeight = Math.round(settings.maxWidth / aspectRatio);
          } else {
            // Height is the limiting factor
            newHeight = settings.maxHeight;
            newWidth = Math.round(settings.maxHeight * aspectRatio);
          }
        }
      } else {
        newWidth = Math.min(img.width, settings.maxWidth);
        newHeight = Math.min(img.height, settings.maxHeight);
      }

      // Set canvas size
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Apply aggressive compression techniques
      if (settings.aggressiveCompression) {
        // Reduce quality further
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
      }

      // Draw resized image
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Convert to data URL based on format and quality
      let mimeType: string;
      let quality = settings.quality;

      if (settings.aggressiveCompression) {
        quality = Math.max(0.3, quality - 0.2); // Reduce quality further
      }

      switch (settings.outputFormat) {
        case 'jpeg':
          mimeType = 'image/jpeg';
          break;
        case 'png':
          mimeType = 'image/png';
          quality = 1.0; // PNG doesn't use quality parameter
          break;
        case 'webp':
          mimeType = 'image/webp';
          break;
        default:
          mimeType = 'image/jpeg';
      }

      const compressedDataUrl = canvas.toDataURL(mimeType, quality);
      setCompressedImageSrc(compressedDataUrl);
      setCompressedDimensions({ width: newWidth, height: newHeight });

      // Calculate compressed size
      const base64Length = compressedDataUrl.length;
      const padding = compressedDataUrl.split(',')[0].split(';')[1]?.includes('base64') ? 2 : 0;
      const sizeInBytes = Math.round((base64Length * 3) / 4) - padding;
      setCompressedSize(sizeInBytes);
    } catch (error) {
      console.error('Error compressing image:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [originalImageSrc, originalDimensions, settings]);

  const downloadCompressedImage = () => {
    if (!compressedImageSrc) return;

    const link = document.createElement('a');
    link.href = compressedImageSrc;
    const extension = settings.outputFormat === 'jpeg' ? 'jpg' : settings.outputFormat;
    link.download = `compressed_${originalImage?.name?.split('.')[0] || 'image'}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    setOriginalImage(null);
    setOriginalImageSrc('');
    setCompressedImageSrc('');
    setOriginalDimensions(null);
    setCompressedDimensions(null);
    setOriginalSize(0);
    setCompressedSize(0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCompressionRatio = () => {
    if (originalSize === 0) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  };

  // Auto-compress when settings change
  React.useEffect(() => {
    if (originalImageSrc && originalDimensions) {
      compressImage();
    }
  }, [originalImageSrc, originalDimensions, settings, compressImage]);

  return (
    <ToolContainer title="Image Compressor" details={details} toolId={toolId}>
      <div className="space-y-6">
        {/* File Upload */}
        <FileUpload
          accept="image/*"
          onFileSelect={handleImageChange}
          title="Upload Image to Compress"
          description="Select an image file to compress and reduce file size"
        />

        {/* Compression Settings */}
        {originalImageSrc && (
          <Card title="Compression Settings">
            <div className="space-y-6">
              {/* Output Format */}
              <div>
                <Label>Output Format</Label>
                <div className="flex gap-3">
                  {(['jpeg', 'png', 'webp'] as const).map(format => (
                    <label
                      key={format}
                      className="flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <input
                        type="radio"
                        name="outputFormat"
                        value={format}
                        checked={settings.outputFormat === format}
                        onChange={e =>
                          setSettings(prev => ({
                            ...prev,
                            outputFormat: e.target.value as CompressionSettings['outputFormat'],
                          }))
                        }
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {format.toUpperCase()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quality */}
              <Slider
                label="Quality"
                valueDisplay={`${Math.round(settings.quality * 100)}%`}
                min="0.1"
                max="1"
                step="0.1"
                value={settings.quality}
                onChange={e =>
                  setSettings(prev => ({
                    ...prev,
                    quality: parseFloat(e.target.value),
                  }))
                }
              />

              {/* Max Dimensions */}
              <div className="grid md:grid-cols-2 gap-6">
                <Slider
                  label="Max Width"
                  valueDisplay={`${settings.maxWidth}px`}
                  min="100"
                  max="4000"
                  step="10"
                  value={settings.maxWidth}
                  onChange={e =>
                    setSettings(prev => ({
                      ...prev,
                      maxWidth: parseInt(e.target.value),
                    }))
                  }
                />
                <Slider
                  label="Max Height"
                  valueDisplay={`${settings.maxHeight}px`}
                  min="100"
                  max="4000"
                  step="10"
                  value={settings.maxHeight}
                  onChange={e =>
                    setSettings(prev => ({
                      ...prev,
                      maxHeight: parseInt(e.target.value),
                    }))
                  }
                />
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintainAspectRatio}
                    onChange={e =>
                      setSettings(prev => ({
                        ...prev,
                        maintainAspectRatio: e.target.checked,
                      }))
                    }
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Maintain aspect ratio
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.aggressiveCompression}
                    onChange={e =>
                      setSettings(prev => ({
                        ...prev,
                        aggressiveCompression: e.target.checked,
                      }))
                    }
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Aggressive compression{' '}
                    <span className="text-gray-500 font-normal">(may reduce quality)</span>
                  </span>
                </label>
              </div>
            </div>
          </Card>
        )}

        {/* Compression Results */}
        {(originalImage || compressedImageSrc) && (
          <Card title="Compression Results" className="bg-white dark:bg-gray-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Original Image</h4>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    File Size:{' '}
                    <span className="font-mono text-gray-900 dark:text-gray-200">
                      {formatFileSize(originalSize)}
                    </span>
                  </p>
                  {originalDimensions && (
                    <p>
                      Dimensions:{' '}
                      <span className="font-mono text-gray-900 dark:text-gray-200">
                        {originalDimensions.width} × {originalDimensions.height} px
                      </span>
                    </p>
                  )}
                </div>
              </div>
              {compressedImageSrc && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Compressed Image
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      File Size:{' '}
                      <span className="font-mono text-gray-900 dark:text-gray-200">
                        {formatFileSize(compressedSize)}
                      </span>
                    </p>
                    {compressedDimensions && (
                      <p>
                        Dimensions:{' '}
                        <span className="font-mono text-gray-900 dark:text-gray-200">
                          {compressedDimensions.width} × {compressedDimensions.height} px
                        </span>
                      </p>
                    )}
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      Size Reduction: {getCompressionRatio()}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Preview and Results */}
        {(originalImageSrc || compressedImageSrc) && (
          <div className="grid md:grid-cols-2 gap-8">
            {originalImageSrc && (
              <div className="space-y-2">
                <Label>Original Preview</Label>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-2 shadow-sm">
                  <img
                    src={originalImageSrc}
                    alt="Original"
                    className="max-w-full max-h-80 mx-auto rounded-xl"
                  />
                </div>
              </div>
            )}

            {compressedImageSrc && (
              <div className="space-y-2">
                <Label>Compressed Preview</Label>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-2 shadow-sm">
                  <img
                    src={compressedImageSrc}
                    alt="Compressed"
                    className="max-w-full max-h-80 mx-auto rounded-xl"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <Button onClick={downloadCompressedImage} className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button
                    onClick={resetAll}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
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
              Compressing image...
            </div>
          </div>
        )}

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </ToolContainer>
  );
};

export default ImageCompressor;

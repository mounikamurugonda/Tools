'use client';

import React, { useState, useRef, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import {
  Download,
  RotateCcw,
  Settings,
  Maximize2,
  Minimize2,
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
        <FileUpload
          accept="image/*"
          onChange={handleImageChange}
          label="Upload Image to Resize"
          description="Select an image file to resize"
          maxSize={50}
        />

        {/* Resize Settings */}
        {originalImageSrc && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Resize Settings
              </h3>
            </div>

            <div className="space-y-4">
              {/* Resize Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resize Mode
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="percentage"
                      checked={settings.mode === 'percentage'}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          mode: e.target.value as 'percentage' | 'dimensions',
                        }))
                      }
                      className="mr-2"
                    />
                    Percentage (%)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="dimensions"
                      checked={settings.mode === 'dimensions'}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          mode: e.target.value as 'percentage' | 'dimensions',
                        }))
                      }
                      className="mr-2"
                    />
                    Dimensions (px)
                  </label>
                </div>
              </div>

              {/* Percentage Mode */}
              {settings.mode === 'percentage' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Scale: {settings.percentage}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="500"
                    step="1"
                    value={settings.percentage}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        percentage: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>1%</span>
                    <span>500%</span>
                  </div>
                </div>
              )}

              {/* Dimensions Mode */}
              {settings.mode === 'dimensions' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Width: {settings.width}px
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="4000"
                      step="1"
                      value={settings.width}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          width: parseInt(e.target.value),
                        }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Height: {settings.height}px
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="4000"
                      step="1"
                      value={settings.height}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          height: parseInt(e.target.value),
                        }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                </div>
              )}

              {/* Keep Aspect Ratio */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="keepAspectRatio"
                  checked={settings.keepAspectRatio}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      keepAspectRatio: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <label
                  htmlFor="keepAspectRatio"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Keep aspect ratio
                </label>
              </div>

              {/* Quality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quality: {Math.round(settings.quality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={settings.quality}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      quality: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>10%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview and Results */}
        {(originalImageSrc || resizedImageSrc) && (
          <div className="grid md:grid-cols-2 gap-6">
            {originalImageSrc && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Original Image
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <img
                    src={originalImageSrc}
                    alt="Original"
                    className="max-w-full max-h-64 mx-auto rounded"
                  />
                </div>
              </div>
            )}

            {resizedImageSrc && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Resized Image
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <img
                    src={resizedImageSrc}
                    alt="Resized"
                    className="max-w-full max-h-64 mx-auto rounded"
                  />
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={downloadResizedImage}
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
              Resizing image...
            </div>
          </div>
        )}

        {/* Image Information */}
        {originalDimensions && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Image Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Original Image
                </h4>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    <strong>Dimensions:</strong> {originalDimensions.width} ×{' '}
                    {originalDimensions.height} px
                  </p>
                  <p>
                    <strong>File Size:</strong>{' '}
                    {originalImage
                      ? formatFileSize(originalImage.size)
                      : 'Unknown'}
                  </p>
                  <p>
                    <strong>Aspect Ratio:</strong>{' '}
                    {(
                      originalDimensions.width / originalDimensions.height
                    ).toFixed(2)}
                    :1
                  </p>
                </div>
              </div>
              {resizedDimensions && (
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resized Image
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      <strong>Dimensions:</strong> {resizedDimensions.width} ×{' '}
                      {resizedDimensions.height} px
                    </p>
                    <p>
                      <strong>Size Change:</strong>{' '}
                      {originalDimensions
                        ? Math.round(
                            ((resizedDimensions.width *
                              resizedDimensions.height) /
                              (originalDimensions.width *
                                originalDimensions.height)) *
                              100,
                          )
                        : 0}
                      % of original
                    </p>
                    <p>
                      <strong>Aspect Ratio:</strong>{' '}
                      {(
                        resizedDimensions.width / resizedDimensions.height
                      ).toFixed(2)}
                      :1
                    </p>
                  </div>
                </div>
              )}
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

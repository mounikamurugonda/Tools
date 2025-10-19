'use client';

import React, { useState, useRef, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import { Download, RotateCcw, Settings, FileImage } from 'lucide-react';

interface ConversionSettings {
  outputFormat: 'jpeg' | 'png' | 'webp' | 'bmp';
  quality: number;
  removeTransparency: boolean;
}

const ImageConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string>('');
  const [convertedImageSrc, setConvertedImageSrc] = useState<string>('');
  const [originalFormat, setOriginalFormat] = useState<string>('');
  const [settings, setSettings] = useState<ConversionSettings>({
    outputFormat: 'jpeg',
    quality: 0.9,
    removeTransparency: false
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
        
        // Extract format from MIME type
        const format = file.type.split('/')[1]?.toLowerCase() || 'unknown';
        setOriginalFormat(format);
        
        // Auto-set output format based on input
        if (format === 'png' && !settings.removeTransparency) {
          setSettings(prev => ({ ...prev, outputFormat: 'png' }));
        } else if (format === 'jpeg' || format === 'jpg') {
          setSettings(prev => ({ ...prev, outputFormat: 'jpeg' }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      setOriginalImageSrc('');
      setOriginalFormat('');
      setConvertedImageSrc('');
    }
  }, [settings.removeTransparency]);

  const convertImage = useCallback(async () => {
    if (!originalImageSrc) return;

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

      // Set canvas size
      canvas.width = img.width;
      canvas.height = img.height;

      // Handle transparency removal for JPEG
      if (settings.outputFormat === 'jpeg' && settings.removeTransparency) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Convert to data URL based on format
      let mimeType: string;
      let dataUrl: string;

      switch (settings.outputFormat) {
        case 'jpeg':
          mimeType = 'image/jpeg';
          dataUrl = canvas.toDataURL(mimeType, settings.quality);
          break;
        case 'png':
          mimeType = 'image/png';
          dataUrl = canvas.toDataURL(mimeType);
          break;
        case 'webp':
          mimeType = 'image/webp';
          dataUrl = canvas.toDataURL(mimeType, settings.quality);
          break;
        case 'bmp':
          mimeType = 'image/bmp';
          dataUrl = canvas.toDataURL(mimeType);
          break;
        default:
          mimeType = 'image/jpeg';
          dataUrl = canvas.toDataURL(mimeType, settings.quality);
      }

      setConvertedImageSrc(dataUrl);
    } catch (error) {
      console.error('Error converting image:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [originalImageSrc, settings]);

  const downloadConvertedImage = () => {
    if (!convertedImageSrc) return;
    
    const link = document.createElement('a');
    link.href = convertedImageSrc;
    const extension = settings.outputFormat === 'jpeg' ? 'jpg' : settings.outputFormat;
    link.download = `converted_${originalImage?.name?.split('.')[0] || 'image'}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    setOriginalImage(null);
    setOriginalImageSrc('');
    setConvertedImageSrc('');
    setOriginalFormat('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFormatInfo = (format: string) => {
    const info = {
      jpeg: { name: 'JPEG', description: 'Best for photos, smaller file size' },
      png: { name: 'PNG', description: 'Best for graphics, supports transparency' },
      webp: { name: 'WebP', description: 'Modern format, excellent compression' },
      bmp: { name: 'BMP', description: 'Uncompressed bitmap format' }
    };
    return info[format as keyof typeof info] || { name: format.toUpperCase(), description: 'Image format' };
  };

  // Auto-convert when settings change
  React.useEffect(() => {
    if (originalImageSrc) {
      convertImage();
    }
  }, [originalImageSrc, settings, convertImage]);

  return (
    <ToolContainer title="Image Converter" details={details} toolId={toolId}>
      <div className="space-y-6">
        {/* File Upload */}
        <FileUpload
          accept="image/*"
          onChange={handleImageChange}
          label="Upload Image to Convert"
          description="Select an image file to convert to another format"
          maxSize={50}
        />

        {/* Conversion Settings */}
        {originalImageSrc && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Conversion Settings</h3>
            </div>
            
            <div className="space-y-4">
              {/* Output Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Output Format
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['jpeg', 'png', 'webp', 'bmp'] as const).map((format) => {
                    const info = getFormatInfo(format);
                    return (
                      <label key={format} className="flex flex-col items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="outputFormat"
                          value={format}
                          checked={settings.outputFormat === format}
                          onChange={(e) => setSettings(prev => ({ ...prev, outputFormat: e.target.value as ConversionSettings['outputFormat'] }))}
                          className="mb-2"
                        />
                        <span className="font-medium text-sm">{info.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 text-center">{info.description}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Quality (for JPEG and WebP) */}
              {(settings.outputFormat === 'jpeg' || settings.outputFormat === 'webp') && (
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
                    onChange={(e) => setSettings(prev => ({ ...prev, quality: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>10%</span>
                    <span>100%</span>
                  </div>
                </div>
              )}

              {/* Remove Transparency (for JPEG) */}
              {settings.outputFormat === 'jpeg' && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="removeTransparency"
                    checked={settings.removeTransparency}
                    onChange={(e) => setSettings(prev => ({ ...prev, removeTransparency: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="removeTransparency" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Remove transparency (fill with white background)
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Image Information */}
        {originalImage && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Image Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Original Image</h4>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>Format:</strong> {originalFormat.toUpperCase()}</p>
                  <p><strong>File Size:</strong> {formatFileSize(originalImage.size)}</p>
                  <p><strong>File Name:</strong> {originalImage.name}</p>
                </div>
              </div>
              {convertedImageSrc && (
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Converted Image</h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Format:</strong> {settings.outputFormat.toUpperCase()}</p>
                    <p><strong>Quality:</strong> {Math.round(settings.quality * 100)}%</p>
                    <p><strong>Transparency:</strong> {settings.removeTransparency ? 'Removed' : 'Preserved'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Preview and Results */}
        {(originalImageSrc || convertedImageSrc) && (
          <div className="grid md:grid-cols-2 gap-6">
            {originalImageSrc && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Original Image</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <img src={originalImageSrc} alt="Original" className="max-w-full max-h-64 mx-auto rounded" />
                </div>
              </div>
            )}

            {convertedImageSrc && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Converted Image</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <img src={convertedImageSrc} alt="Converted" className="max-w-full max-h-64 mx-auto rounded" />
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={downloadConvertedImage}
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
              Converting image...
            </div>
          </div>
        )}

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </ToolContainer>
  );
};

export default ImageConverter;

'use client';

import React, { useState, useRef, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/ui/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Slider from '@/components/ui/Slider';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { useToast } from '@/components/ui/ToastProvider';
import { Download, RotateCcw, FileImage, ArrowRight } from 'lucide-react';

type OutputFormat = 'jpeg' | 'png' | 'webp' | 'avif';

interface ConversionSettings {
  outputFormat: OutputFormat;
  quality: number;
  removeTransparency: boolean;
  bgColor: string;
}

const ImageConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string>('');
  const [convertedImageSrc, setConvertedImageSrc] = useState<string>('');
  const [convertedBytes, setConvertedBytes] = useState(0);
  const [originalFormat, setOriginalFormat] = useState<string>('');
  const [settings, setSettings] = useState<ConversionSettings>({
    outputFormat: 'jpeg',
    quality: 0.9,
    removeTransparency: false,
    bgColor: '#ffffff',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageChange = useCallback(
    (file: File | null) => {
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
    },
    [settings.removeTransparency]
  );

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

      // JPEG and AVIF cannot represent transparency — paint background first.
      const needsBg =
        (settings.outputFormat === 'jpeg' && settings.removeTransparency) ||
        settings.outputFormat === 'jpeg' ||
        (settings.outputFormat === 'avif' && settings.removeTransparency);
      if (needsBg) {
        ctx.fillStyle = settings.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const mimeType = `image/${settings.outputFormat}`;
      await new Promise<void>(resolve => {
        canvas.toBlob(
          blob => {
            if (!blob) {
              toast.error(
                `${settings.outputFormat.toUpperCase()} encoding is not supported in this browser`
              );
              resolve();
              return;
            }
            // Browsers without AVIF support sometimes return PNG silently. Check.
            if (blob.type !== mimeType) {
              toast.error(
                `${settings.outputFormat.toUpperCase()} not supported — got ${blob.type.replace('image/', '').toUpperCase()} instead`
              );
            }
            setConvertedBytes(blob.size);
            const reader = new FileReader();
            reader.onload = () => {
              setConvertedImageSrc(reader.result as string);
              resolve();
            };
            reader.readAsDataURL(blob);
          },
          mimeType,
          settings.outputFormat === 'png' ? undefined : settings.quality
        );
      });
    } catch {
      toast.error('Conversion failed');
    } finally {
      setIsProcessing(false);
    }
  }, [originalImageSrc, settings, toast]);

  const downloadConvertedImage = () => {
    if (!convertedImageSrc) return;
    const link = document.createElement('a');
    link.href = convertedImageSrc;
    const extension = settings.outputFormat === 'jpeg' ? 'jpg' : settings.outputFormat;
    link.download = `converted_${originalImage?.name?.split('.')[0] || 'image'}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded');
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
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card title="Upload & Settings">
              <div className="space-y-6">
                <FileUpload
                  accept="image/*"
                  onChange={handleImageChange}
                  label="Upload Image"
                  description="Select an image file"
                  maxSizeMB={50}
                />

                {originalImageSrc && (
                  <>
                    <hr className="border-gray-100 dark:border-gray-800" />
                    <div>
                      <Label className="mb-2">Output Format</Label>
                      <Select
                        value={settings.outputFormat}
                        onChange={e => {
                          setSettings(prev => ({
                            ...prev,
                            outputFormat: e.target.value as OutputFormat,
                          }));
                        }}
                      >
                        <option value="jpeg">JPEG</option>
                        <option value="png">PNG</option>
                        <option value="webp">WebP</option>
                        <option value="avif">AVIF (modern, smaller)</option>
                      </Select>
                    </div>

                    {settings.outputFormat !== 'png' && (
                      <Slider
                        label="Quality"
                        min={0.1}
                        max={1}
                        step={0.05}
                        value={settings.quality}
                        onChange={e =>
                          setSettings(prev => ({ ...prev, quality: parseFloat(e.target.value) }))
                        }
                        valueDisplay={`${Math.round(settings.quality * 100)}%`}
                      />
                    )}

                    {(settings.outputFormat === 'jpeg' || settings.outputFormat === 'avif') && (
                      <div>
                        <Label className="text-xs text-gray-500 mb-1 block">
                          Background (JPEG/AVIF have no alpha)
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={settings.bgColor}
                            onChange={e =>
                              setSettings(prev => ({ ...prev, bgColor: e.target.value }))
                            }
                            className="w-12 h-9 p-1 cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={settings.bgColor}
                            onChange={e =>
                              setSettings(prev => ({ ...prev, bgColor: e.target.value }))
                            }
                            className="flex-1 font-mono text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Card>

            {originalImage && (
              <Card title="Details">
                <div className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Original Format:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">
                      {originalFormat.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>File Size:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">
                      {formatFileSize(originalImage.size)}
                    </span>
                  </div>
                  {convertedBytes > 0 && (
                    <>
                      <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                        <span>Output:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-200">
                          {formatFileSize(convertedBytes)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Change:</span>
                        <span
                          className={`font-medium ${
                            convertedBytes < originalImage.size
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {convertedBytes < originalImage.size ? '−' : '+'}
                          {Math.abs(
                            Math.round(
                              ((convertedBytes - originalImage.size) / originalImage.size) * 100
                            )
                          )}
                          %
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            )}
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card title="Preview">
              <div className="grid grid-cols-2 gap-4 h-full min-h-[400px]">
                {/* Original */}
                <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 rounded-lg p-2">
                  <div className="text-xs text-center text-gray-500 mb-2">Original</div>
                  <div className="flex-1 flex items-center justify-center">
                    {originalImageSrc ? (
                      <img
                        src={originalImageSrc}
                        alt="Original"
                        className="max-w-full max-h-[300px] object-contain"
                      />
                    ) : (
                      <div className="text-gray-300 dark:text-gray-600">
                        <FileImage className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Converted */}
                <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 rounded-lg p-2 relative">
                  <div className="text-xs text-center text-gray-500 mb-2">Converted</div>
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                    </div>
                  )}
                  <div className="flex-1 flex items-center justify-center">
                    {convertedImageSrc ? (
                      <img
                        src={convertedImageSrc}
                        alt="Converted"
                        className="max-w-full max-h-[300px] object-contain"
                      />
                    ) : (
                      <div className="text-gray-300 dark:text-gray-600">
                        <ArrowRight className="w-12 h-12 opacity-20" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {convertedImageSrc && (
              <div className="flex justify-end gap-3">
                <Button onClick={resetAll} variant="secondary">
                  <RotateCcw className="w-4 h-4 mr-2" /> Start Over
                </Button>
                <Button onClick={downloadConvertedImage} variant="primary">
                  <Download className="w-4 h-4 mr-2" /> Download Converted Image
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </ToolContainer>
  );
};

export default ImageConverter;

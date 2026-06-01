'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/ui/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Slider from '@/components/ui/Slider';
import { useToast } from '@/components/ui/ToastProvider';
import { Download, Image as ImageIcon, Type, Upload, Copy } from 'lucide-react';

const MAX_DIM = 1080; // cap export size while preserving aspect ratio

const MemeGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState('Top Text');
  const [bottomText, setBottomText] = useState('Bottom Text');
  const [fontScale, setFontScale] = useState(10); // canvas.width / fontScale
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const toast = useToast();

  const handleImageUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => setImage(event.target?.result as string);
    reader.onerror = () => toast.error('Could not read that file');
    reader.readAsDataURL(file);
  };

  // Wrap a caption to the canvas width, returning the lines to draw.
  const wrapLines = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];
    const lines: string[] = [];
    let current = words[0];
    for (let i = 1; i < words.length; i++) {
      const test = `${current} ${words[i]}`;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = words[i];
      } else {
        current = test;
      }
    }
    lines.push(current);
    return lines;
  };

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imgRef.current;
    if (!canvas || !ctx || !img) return;

    // Preserve aspect ratio; cap the longest side at MAX_DIM.
    const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const fontSize = canvas.width / fontScale;
    ctx.font = `bold ${fontSize}px Impact, "Arial Narrow", sans-serif`;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.max(2, fontSize / 18);
    ctx.lineJoin = 'round';
    ctx.textAlign = 'center';
    const maxWidth = canvas.width * 0.92;
    const pad = fontSize * 0.3;

    const drawCaption = (text: string, position: 'top' | 'bottom') => {
      const lines = wrapLines(ctx, text.toUpperCase(), maxWidth);
      if (lines.length === 0) return;
      const lineHeight = fontSize * 1.1;
      lines.forEach((line, i) => {
        let y: number;
        if (position === 'top') {
          ctx.textBaseline = 'top';
          y = pad + i * lineHeight;
        } else {
          ctx.textBaseline = 'bottom';
          y = canvas.height - pad - (lines.length - 1 - i) * lineHeight;
        }
        const x = canvas.width / 2;
        ctx.strokeText(line, x, y);
        ctx.fillText(line, x, y);
      });
    };

    drawCaption(topText, 'top');
    drawCaption(bottomText, 'bottom');
  }, [topText, bottomText, fontScale]);

  // Load the image element when the data URL changes, then redraw.
  useEffect(() => {
    if (!image) {
      imgRef.current = null;
      return;
    }
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      drawMeme();
    };
    img.onerror = () => toast.error('That image could not be loaded');
    img.src = image;
    // drawMeme intentionally re-runs via the separate effect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  // Redraw on caption/font changes (image already loaded).
  useEffect(() => {
    if (imgRef.current) drawMeme();
  }, [topText, bottomText, fontScale, drawMeme]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success('Meme downloaded');
  };

  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    try {
      const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/png'));
      if (!blob || !navigator.clipboard || !('write' in navigator.clipboard)) {
        toast.error('Copying images is not supported in this browser');
        return;
      }
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      toast.success('Meme copied to clipboard');
    } catch {
      toast.error('Failed to copy image');
    }
  };

  return (
    <ToolContainer title="Meme Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card title="Controls" className="space-y-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Upload className="w-4 h-4" /> 1. Upload an Image
              </Label>
              <FileUpload
                accept="image/*"
                onChange={handleImageUpload}
                onError={msg => toast.error(msg)}
                maxSizeMB={10}
                className="h-32"
              />
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              <Label className="flex items-center gap-2">
                <Type className="w-4 h-4" /> 2. Add Text
              </Label>
              <div className="space-y-3">
                <Input value={topText} onChange={e => setTopText(e.target.value)} placeholder="Top Text" />
                <Input value={bottomText} onChange={e => setBottomText(e.target.value)} placeholder="Bottom Text" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Font size</span>
                  <span>{Math.round((1 / fontScale) * 100)}%</span>
                </div>
                {/* Smaller fontScale = bigger text, so invert the slider feel */}
                <Slider
                  min={6}
                  max={16}
                  step={1}
                  value={22 - fontScale}
                  onChange={e => setFontScale(22 - Number((e.target as HTMLInputElement).value))}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleDownload} disabled={!image} variant="primary" className="flex-1" size="lg">
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
              <Button onClick={handleCopy} disabled={!image} variant="secondary" size="lg">
                <Copy className="w-4 h-4 mr-2" /> Copy
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Preview" className="h-full min-h-[400px]">
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 flex items-center justify-center h-full min-h-[350px]">
              {image ? (
                <canvas ref={canvasRef} className="max-w-full max-h-[60vh] rounded shadow-sm" />
              ) : (
                <div className="text-center text-gray-400 dark:text-gray-500 flex flex-col items-center">
                  <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                  <p>Upload an image to start</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default MemeGenerator;

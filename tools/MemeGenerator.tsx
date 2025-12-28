'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { Download, Image as ImageIcon, Type, Upload } from 'lucide-react';

const MemeGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState('Top Text');
  const [bottomText, setBottomText] = useState('Bottom Text');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const img = new Image();
    img.src = image || '';
    img.onload = () => {
      // Scale canvas to image
      let canvasWidth = 500;
      let scale = canvasWidth / img.width;
      let canvasHeight = img.height * scale;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Text style
      const fontSize = canvas.width / 10;
      ctx.font = `bold ${fontSize}px Impact, sans-serif`;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize / 20;
      ctx.textAlign = 'center';

      // Draw top text
      ctx.textBaseline = 'top';
      ctx.fillText(topText, canvas.width / 2, 10);
      ctx.strokeText(topText, canvas.width / 2, 10);

      // Draw bottom text
      ctx.textBaseline = 'bottom';
      ctx.fillText(bottomText, canvas.width / 2, canvas.height - 10);
      ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 10);
    };
  }, [image, topText, bottomText]);

  useEffect(() => {
    if (image) {
      drawMeme();
    }
  }, [image, topText, bottomText, drawMeme]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
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
                maxSize={10}
                className="h-32"
              />
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              <Label className="flex items-center gap-2">
                <Type className="w-4 h-4" /> 2. Add Text
              </Label>
              <div className="space-y-3">
                <Input
                  value={topText}
                  onChange={e => setTopText(e.target.value)}
                  placeholder="Top Text"
                />
                <Input
                  value={bottomText}
                  onChange={e => setBottomText(e.target.value)}
                  placeholder="Bottom Text"
                />
              </div>
            </div>

            <Button
              onClick={handleDownload}
              disabled={!image}
              variant="primary"
              className="w-full"
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" /> 3. Download Meme
            </Button>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Preview" className="h-full min-h-[400px]">
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 flex items-center justify-center h-full min-h-[350px]">
              {image ? (
                <canvas ref={canvasRef} className="max-w-full max-h-full rounded shadow-sm" />
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

'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import QRCode from 'qrcode';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';

const QrCodeGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      if (text) {
        QRCode.toCanvas(
          canvasRef.current,
          text,
          { width: 256, margin: 2 },
          (error: Error | null | undefined) => {
            if (error) console.error(error);
          },
        );
      } else {
        const ctx = canvasRef.current.getContext('2d');
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [text]);

  const handleDownload = () => {
    if (canvasRef.current && text) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <ToolContainer title="QR Code Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={handleDownload}
            disabled={!text}
          >
            Download QR Code
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side - Input */}
          <div className="space-y-2">
            <Label htmlFor="qr-input">Text or URL</Label>
            <TextArea
              id="qr-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL here..."
              className="h-96 max-h-96"
            />
          </div>

          {/* Right side - QR Code Preview */}
          <div className="space-y-2">
            <Label>QR Code</Label>
            <Card className="min-h-[384px] flex items-center justify-center">
              {text ? (
                <div className="text-center">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <canvas ref={canvasRef} width="256" height="256" />
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-4">📱</div>
                  <p className="font-medium">QR Code will appear here</p>
                  <p className="text-sm mt-2 opacity-60">Enter text or URL to generate</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default QrCodeGenerator;

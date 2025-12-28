'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
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
        import('qrcode').then(QRCode => {
          if (canvasRef.current) {
            QRCode.toCanvas(
              canvasRef.current,
              text,
              { width: 256, margin: 2 },
              (error: Error | null | undefined) => {
                if (error) console.error(error);
              }
            );
          }
        });
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
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <Card title="Content" className="h-[calc(100%-1rem)]">
              <div className="space-y-4">
                <Label htmlFor="qr-input">Text or URL</Label>
                <TextArea
                  id="qr-input"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Enter text or URL here used to generate the QR Code..."
                  className="h-64 resize-none"
                />
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card title="Preview" className="h-full flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-dashed border-2 border-gray-200 dark:border-gray-800">
                {text ? (
                  <div className="p-4 bg-white rounded-xl shadow-lg">
                    <canvas ref={canvasRef} />
                  </div>
                ) : (
                  <div className="text-center text-gray-400 dark:text-gray-500">
                    <div className="text-5xl mb-4 grayscale opacity-50">📱</div>
                    <p className="font-medium text-lg">QR Code Preview</p>
                    <p className="text-sm opacity-70">Enter text to generate</p>
                  </div>
                )}
              </div>
              {text && (
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={handleDownload}
                    disabled={!text}
                    variant="primary"
                    className="w-full md:w-auto"
                  >
                    Download QR Code
                  </Button>
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

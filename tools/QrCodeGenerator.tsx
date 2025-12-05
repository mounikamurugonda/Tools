'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import QRCode from 'qrcode';

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
          <button
            onClick={handleDownload}
            disabled={!text}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Download QR Code
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side - Input */}
          <div className="space-y-4">
            <label
              htmlFor="qr-input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Text or URL
            </label>
            <div className="relative">
              <textarea
                id="qr-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL here..."
                className="w-full h-96 max-h-96 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 resize-none"
              />
            </div>
          </div>

          {/* Right side - QR Code Preview */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              QR Code
            </label>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 min-h-[300px] flex items-center justify-center">
              {text ? (
                <div className="text-center">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <canvas ref={canvasRef} width="256" height="256" />
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="text-2xl mb-2">📱</div>
                  <p>QR Code will appear here</p>
                  <p className="text-sm mt-2">Enter text or URL to generate</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default QrCodeGenerator;

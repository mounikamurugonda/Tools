
'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import QRCode from 'qrcode';

const QrCodeGenerator: React.FC<ToolProps> = ({ details }) => {
    const [text, setText] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            if (text) {
                QRCode.toCanvas(canvasRef.current, text, { width: 256, margin: 2 }, (error: Error | null | undefined) => {
                    if (error) console.error(error);
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
        <ToolContainer title="QR Code Generator" details={details}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <label className="block text-gray-700 dark:text-gray-300">Enter Text or URL</label>
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full h-32 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                    />
                    <button
                        onClick={handleDownload}
                        disabled={!text}
                        className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Download QR Code
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <div className="p-4 bg-white rounded">
                       <canvas ref={canvasRef} width="256" height="256" />
                    </div>
                </div>
            </div>
        </ToolContainer>
    );
};

export default QrCodeGenerator;

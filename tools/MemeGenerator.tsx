
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const MemeGenerator: React.FC<ToolProps> = ({ details }) => {
    const [image, setImage] = useState<string | null>(null);
    const [topText, setTopText] = useState('Top Text');
    const [bottomText, setBottomText] = useState('Bottom Text');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
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
        <ToolContainer title="Meme Generator" details={details}>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">1. Upload an Image</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">2. Add Text</label>
                        <input type="text" value={topText} onChange={e => setTopText(e.target.value)} placeholder="Top Text" className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input type="text" value={bottomText} onChange={e => setBottomText(e.target.value)} placeholder="Bottom Text" className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button onClick={handleDownload} disabled={!image} className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded font-bold disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed">
                        3. Download Meme
                    </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-2 flex items-center justify-center">
                    {image ? (
                        <canvas ref={canvasRef} className="max-w-full max-h-full" />
                    ) : (
                        <div className="text-center text-gray-500">
                            <p>Upload an image to start</p>
                        </div>
                    )}
                </div>
            </div>
        </ToolContainer>
    );
};

export default MemeGenerator;

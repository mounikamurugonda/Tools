
'use client';

import React, { useRef, useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const SignaturePad: React.FC<ToolProps> = ({ details, toolId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [width, setWidth] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const ctx = canvas.getContext('2d');
        if(ctx) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
       x = e.touches[0].clientX - rect.left;
       y = e.touches[0].clientY - rect.top;
    } else {
       x = e.clientX - rect.left;
       y = e.clientY - rect.top;
    }

    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'signature.png';
        link.href = canvas.toDataURL();
        link.click();
    }
  };

  return (
    <ToolContainer title="Signature Pad" details={details} toolId={toolId}>
      <div className="space-y-4">
        <canvas 
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="w-full h-64 bg-white border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-crosshair touch-none"
        />
        
        <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex gap-4 items-center">
                <div>
                    <label className="block text-xs font-medium mb-1">Color</label>
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-8 w-8 cursor-pointer" />
                </div>
                <div>
                    <label className="block text-xs font-medium mb-1">Width: {width}</label>
                    <input type="range" min="1" max="10" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-24" />
                </div>
            </div>
            
            <div className="flex gap-2">
                <button onClick={clear} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">Clear</button>
                <button onClick={download} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Download PNG</button>
            </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default SignaturePad;

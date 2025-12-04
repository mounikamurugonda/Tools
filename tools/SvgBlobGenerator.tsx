
'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

// Simple blob generation logic
const generateBlobPath = (size: number, complexity: number, contrast: number) => {
    // This is a simplified approximation for the sake of the example without external libs.
    // Real "blobs" use spline interpolation.
    // Here we will generate a random path string for demonstration.
    // In a production app, a library like `blobs` or spline algorithm is recommended.
    // For this lightweight version, we'll create a rough polygon smoothed by CSS or simple curves.
    
    const count = Math.max(3, Math.round(complexity));
    const points = [];
    const center = size / 2;
    const r = size / 2;
    
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const random = 1 - (Math.random() * contrast * 0.5); // Random radius factor
        const x = center + Math.cos(angle) * r * random;
        const y = center + Math.sin(angle) * r * random;
        points.push({ x, y });
    }
    
    // Build path with quadratic bezier curves for smoothness
    let d = `M ${(points[0].x + points[points.length-1].x)/2} ${(points[0].y + points[points.length-1].y)/2}`;
    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];
        d += ` Q ${p1.x} ${p1.y} ${(p1.x + p2.x)/2} ${(p1.y + p2.y)/2}`;
    }
    d += " Z";
    
    return d;
};

const SvgBlobGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [complexity, setComplexity] = useState(7);
  const [contrast, setContrast] = useState(0.5);
  const [color, setColor] = useState('#3b82f6');
  const [seed, setSeed] = useState(Date.now());

  const path = useMemo(() => generateBlobPath(400, complexity, contrast), [complexity, contrast, seed]);
  
  const svgString = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <path fill="${color}" d="${path}" />
</svg>`;

  return (
    <ToolContainer title="SVG Blob Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-1">Complexity</label>
                <input type="range" min="3" max="20" value={complexity} onChange={e => setComplexity(Number(e.target.value))} className="w-full" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Uniqueness</label>
                <input type="range" min="0" max="1" step="0.1" value={contrast} onChange={e => setContrast(Number(e.target.value))} className="w-full" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-10 cursor-pointer" />
            </div>
            <button onClick={() => setSeed(Date.now())} className="w-full py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Randomize 🎲
            </button>
        </div>
        
        <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg flex items-center justify-center p-4 h-80">
                <svg viewBox="0 0 400 400" className="w-64 h-64 transition-all duration-300">
                    <path fill={color} d={path} />
                </svg>
            </div>
            <div className="relative">
                <textarea readOnly value={svgString} className="w-full h-32 brand-input font-mono text-xs" />
                <CopyButton textToCopy={svgString} className="absolute top-2 right-2" />
            </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default SvgBlobGenerator;

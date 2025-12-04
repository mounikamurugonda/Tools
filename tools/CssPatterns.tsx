
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const PATTERNS = [
    { name: 'Stripes', css: 'linear-gradient(45deg, #000000 25%, transparent 25%, transparent 50%, #000000 50%, #000000 75%, transparent 75%, transparent)' },
    { name: 'Checks', css: 'linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000), linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000)' },
    { name: 'Dots', css: 'radial-gradient(#000000 1px, transparent 1px)' },
    { name: 'Grid', css: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)' },
];

const CssPatterns: React.FC<ToolProps> = ({ details, toolId }) => {
  const [selected, setSelected] = useState(0);
  const [color, setColor] = useState('#3b82f6');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(0.1);
  const [size, setSize] = useState(20);

  const activePattern = PATTERNS[selected];
  
  // Replace template color with actual RGBA
  const getPatternCss = () => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    
    return activePattern.css.replace(/#000000/g, rgba);
  };

  const finalStyle = {
    backgroundColor: bgColor,
    backgroundImage: getPatternCss(),
    backgroundSize: activePattern.name === 'Checks' ? `${size}px ${size}px` : `${size}px ${size}px`,
    backgroundPosition: activePattern.name === 'Checks' ? `0 0, ${size/2}px ${size/2}px` : undefined
  };

  const cssCode = `background-color: ${bgColor};
background-image: ${getPatternCss()};
background-size: ${size}px ${size}px;${activePattern.name === 'Checks' ? `\nbackground-position: 0 0, ${size/2}px ${size/2}px;` : ''}`;

  return (
    <ToolContainer title="CSS Background Patterns" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">Pattern Type</label>
                <div className="grid grid-cols-2 gap-2">
                    {PATTERNS.map((p, i) => (
                        <button 
                            key={p.name} 
                            onClick={() => setSelected(i)}
                            className={`p-2 text-sm rounded border ${selected === i ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700'}`}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <div className="flex gap-2">
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-10 w-10 cursor-pointer" />
                    <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={e => setOpacity(Number(e.target.value))} className="flex-grow" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Background Color</label>
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 cursor-pointer" />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Scale: {size}px</label>
                <input type="range" min="4" max="100" value={size} onChange={e => setSize(Number(e.target.value))} className="w-full" />
            </div>
        </div>

        <div className="md:col-span-2 space-y-4">
            <div className="h-64 rounded-lg border border-gray-200 dark:border-gray-700 w-full" style={finalStyle as any}></div>
            <div className="relative">
                <textarea readOnly value={cssCode} className="w-full h-32 brand-input font-mono text-xs" />
                <CopyButton textToCopy={cssCode} className="absolute top-2 right-2" />
            </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default CssPatterns;

'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const GlassmorphismGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
    const [style, setStyle] = useState<'glassmorphism' | 'neumorphism'>('glassmorphism');
    const [background, setBackground] = useState('#1e40af');
    const [opacity, setOpacity] = useState(0.2);
    const [blur, setBlur] = useState(10);
    const [borderRadius, setBorderRadius] = useState(16);
    const [borderWidth, setBorderWidth] = useState(1);
    const [borderColor, setBorderColor] = useState('#ffffff');
    const [borderOpacity, setBorderOpacity] = useState(0.2);
    const [shadowX, setShadowX] = useState(0);
    const [shadowY, setShadowY] = useState(8);
    const [shadowBlur, setShadowBlur] = useState(32);
    const [shadowSpread, setShadowSpread] = useState(0);
    const [shadowColor, setShadowColor] = useState('#000000');
    const [shadowOpacity, setShadowOpacity] = useState(0.1);

    const borderColorWithOpacity = useMemo(() => {
        const hex = borderColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${borderOpacity})`;
    }, [borderColor, borderOpacity]);

    const shadowColorWithOpacity = useMemo(() => {
        const hex = shadowColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
    }, [shadowColor, shadowOpacity]);

    const glassmorphismStyles = useMemo(() => {
        if (style === 'glassmorphism') {
            return {
                background: `rgba(255, 255, 255, ${opacity})`,
                backdropFilter: `blur(${blur}px)`,
                borderRadius: `${borderRadius}px`,
                border: `${borderWidth}px solid ${borderColorWithOpacity}`,
                boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColorWithOpacity}`
            };
        } else {
            // Neumorphism
            const lightShadow = `${-shadowX}px ${-shadowY}px ${shadowBlur}px rgba(255, 255, 255, ${shadowOpacity})`;
            const darkShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`;
            return {
                background: background,
                borderRadius: `${borderRadius}px`,
                boxShadow: `${lightShadow}, ${darkShadow}`
            };
        }
    }, [style, opacity, blur, borderRadius, borderWidth, borderColorWithOpacity, shadowX, shadowY, shadowBlur, shadowSpread, shadowColorWithOpacity, background, shadowOpacity]);

    const copyToClipboard = () => {
        const css = style === 'glassmorphism' 
            ? `.glassmorphism {
  background: rgba(255, 255, 255, ${opacity});
  backdrop-filter: blur(${blur}px);
  border-radius: ${borderRadius}px;
  border: ${borderWidth}px solid ${borderColorWithOpacity};
  box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColorWithOpacity};
}`
            : `.neumorphism {
  background: ${background};
  border-radius: ${borderRadius}px;
  box-shadow: ${-shadowX}px ${-shadowY}px ${shadowBlur}px rgba(255, 255, 255, ${shadowOpacity}), 
              ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity});
}`;
        navigator.clipboard.writeText(css);
    };

    return (
        <ToolContainer title="Glassmorphism & Neumorphism Generator" details={details} toolId={toolId}>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Style Type
                        </label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="glassmorphism"
                                    checked={style === 'glassmorphism'}
                                    onChange={(e) => setStyle(e.target.value as 'glassmorphism' | 'neumorphism')}
                                    className="mr-2"
                                />
                                Glassmorphism
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="neumorphism"
                                    checked={style === 'neumorphism'}
                                    onChange={(e) => setStyle(e.target.value as 'glassmorphism' | 'neumorphism')}
                                    className="mr-2"
                                />
                                Neumorphism
                            </label>
                        </div>
                    </div>

                    {style === 'glassmorphism' ? (
                        <>
                            <RangeSlider label="Opacity" value={opacity} setValue={setOpacity} min={0} max={1} step={0.01} />
                            <RangeSlider label="Blur (px)" value={blur} setValue={setBlur} min={0} max={50} />
                            <RangeSlider label="Border Radius (px)" value={borderRadius} setValue={setBorderRadius} min={0} max={50} />
                            <RangeSlider label="Border Width (px)" value={borderWidth} setValue={setBorderWidth} min={0} max={5} />
                            
                            <div className="flex items-center justify-between">
                                <label className="text-gray-700 dark:text-gray-300">Border Color</label>
                                <div className="flex items-center space-x-2">
                                    <input 
                                        type="color" 
                                        value={borderColor} 
                                        onChange={e => setBorderColor(e.target.value)} 
                                        className="w-12 h-8 bg-transparent border border-gray-300 dark:border-gray-600 rounded cursor-pointer" 
                                    />
                                    <RangeSlider label="Border Opacity" value={borderOpacity} setValue={setBorderOpacity} min={0} max={1} step={0.01} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-between">
                            <label className="text-gray-700 dark:text-gray-300">Background Color</label>
                            <input 
                                type="color" 
                                value={background} 
                                onChange={e => setBackground(e.target.value)} 
                                className="w-12 h-8 bg-transparent border border-gray-300 dark:border-gray-600 rounded cursor-pointer" 
                            />
                        </div>
                    )}

                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Shadow Settings</h4>
                        <RangeSlider label="Shadow X (px)" value={shadowX} setValue={setShadowX} min={-20} max={20} />
                        <RangeSlider label="Shadow Y (px)" value={shadowY} setValue={setShadowY} min={-20} max={20} />
                        <RangeSlider label="Shadow Blur (px)" value={shadowBlur} setValue={setShadowBlur} min={0} max={50} />
                        <RangeSlider label="Shadow Spread (px)" value={shadowSpread} setValue={setShadowSpread} min={-20} max={20} />
                        
                        <div className="flex items-center justify-between">
                            <label className="text-gray-700 dark:text-gray-300">Shadow Color</label>
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="color" 
                                    value={shadowColor} 
                                    onChange={e => setShadowColor(e.target.value)} 
                                    className="w-12 h-8 bg-transparent border border-gray-300 dark:border-gray-600 rounded cursor-pointer" 
                                />
                                <RangeSlider label="Shadow Opacity" value={shadowOpacity} setValue={setShadowOpacity} min={0} max={1} step={0.01} />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                            {style === 'glassmorphism' ? 'Glassmorphism Tips' : 'Neumorphism Tips'}
                        </h4>
                        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                            {style === 'glassmorphism' ? (
                                <>
                                    <p>• <strong>Low opacity:</strong> 0.1-0.3 for subtle effect</p>
                                    <p>• <strong>High blur:</strong> 10-20px for frosted glass look</p>
                                    <p>• <strong>Light borders:</strong> White with low opacity</p>
                                    <p>• <strong>Background:</strong> Use colorful gradients behind</p>
                                </>
                            ) : (
                                <>
                                    <p>• <strong>Soft shadows:</strong> Similar X/Y values, high blur</p>
                                    <p>• <strong>Light source:</strong> Top-left for raised effect</p>
                                    <p>• <strong>Colors:</strong> Use subtle, muted backgrounds</p>
                                    <p>• <strong>Contrast:</strong> Keep shadows subtle</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div 
                        className="h-48 rounded flex items-center justify-center p-8 relative overflow-hidden"
                        style={{ 
                            background: style === 'glassmorphism' 
                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                : '#e5e7eb'
                        }}
                    >
                        <div 
                            className="w-32 h-32 flex items-center justify-center text-white font-medium"
                            style={glassmorphismStyles}
                        >
                            {style === 'glassmorphism' ? 'Glass' : 'Soft'}
                        </div>
                    </div>
                    
                    <div className="relative">
                        <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-600 text-sm overflow-x-auto">
                            <code>{style === 'glassmorphism' 
                                ? `background: rgba(255, 255, 255, ${opacity});
backdrop-filter: blur(${blur}px);
border-radius: ${borderRadius}px;
border: ${borderWidth}px solid ${borderColorWithOpacity};
box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColorWithOpacity};`
                                : `background: ${background};
border-radius: ${borderRadius}px;
box-shadow: ${-shadowX}px ${-shadowY}px ${shadowBlur}px rgba(255, 255, 255, ${shadowOpacity}), 
            ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity});`
                            }</code>
                        </pre>
                        <button
                            onClick={copyToClipboard}
                            className="absolute top-2 right-2 px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded"
                        >
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        </ToolContainer>
    );
};

interface RangeSliderProps {
    label: string;
    value: number;
    setValue: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ label, value, setValue, min = 0, max = 100, step = 1 }) => (
    <div>
        <label className="flex justify-between text-gray-700 dark:text-gray-300 mb-1">
            <span>{label}</span>
            <span>{value}</span>
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => setValue(parseFloat(e.target.value))}
            className="w-full"
        />
    </div>
);

export default GlassmorphismGenerator;

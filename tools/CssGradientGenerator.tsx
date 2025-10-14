'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const CssGradientGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
    const [color1, setColor1] = useState('#3b82f6');
    const [color2, setColor2] = useState('#8b5cf6');
    const [angle, setAngle] = useState(45);
    const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
    const [position, setPosition] = useState('center');

    const gradientValue = useMemo(() => {
        if (gradientType === 'linear') {
            return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        } else {
            return `radial-gradient(circle at ${position}, ${color1}, ${color2})`;
        }
    }, [color1, color2, angle, gradientType, position]);

    return (
        <ToolContainer title="CSS Gradient Generator" details={details} toolId={toolId}>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Gradient Type
                        </label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="linear"
                                    checked={gradientType === 'linear'}
                                    onChange={(e) => setGradientType(e.target.value as 'linear' | 'radial')}
                                    className="mr-2"
                                />
                                Linear
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="radial"
                                    checked={gradientType === 'radial'}
                                    onChange={(e) => setGradientType(e.target.value as 'linear' | 'radial')}
                                    className="mr-2"
                                />
                                Radial
                            </label>
                        </div>
                    </div>

                    {gradientType === 'linear' && (
                        <RangeSlider 
                            label="Angle (degrees)" 
                            value={angle} 
                            setValue={setAngle} 
                            min={0} 
                            max={360} 
                        />
                    )}

                    {gradientType === 'radial' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Position
                            </label>
                            <select
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="center">Center</option>
                                <option value="top left">Top Left</option>
                                <option value="top right">Top Right</option>
                                <option value="bottom left">Bottom Left</option>
                                <option value="bottom right">Bottom Right</option>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-gray-700 dark:text-gray-300">Color 1</label>
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="color" 
                                    value={color1} 
                                    onChange={e => setColor1(e.target.value)} 
                                    className="w-12 h-8 bg-transparent border border-gray-300 dark:border-gray-600 rounded cursor-pointer" 
                                />
                                <input
                                    type="text"
                                    value={color1}
                                    onChange={e => setColor1(e.target.value)}
                                    className="w-20 px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded font-mono"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-gray-700 dark:text-gray-300">Color 2</label>
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="color" 
                                    value={color2} 
                                    onChange={e => setColor2(e.target.value)} 
                                    className="w-12 h-8 bg-transparent border border-gray-300 dark:border-gray-600 rounded cursor-pointer" 
                                />
                                <input
                                    type="text"
                                    value={color2}
                                    onChange={e => setColor2(e.target.value)}
                                    className="w-20 px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded font-mono"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center p-8">
                        <div 
                            className="w-32 h-32 rounded-lg shadow-lg"
                            style={{ background: gradientValue }}
                        ></div>
                    </div>
                    
                    <div className="relative">
                        <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-600 text-sm overflow-x-auto">
                            <code>{`background: ${gradientValue};`}</code>
                        </pre>
                        <CopyButton textToCopy={`background: ${gradientValue};`} className="absolute top-2 right-2" />
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
            <span>{value}°</span>
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

export default CssGradientGenerator;

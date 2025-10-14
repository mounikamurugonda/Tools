'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const BorderRadiusGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
    const [topLeft, setTopLeft] = useState(10);
    const [topRight, setTopRight] = useState(10);
    const [bottomLeft, setBottomLeft] = useState(10);
    const [bottomRight, setBottomRight] = useState(10);
    const [unit, setUnit] = useState<'px' | '%'>('px');
    const [linkCorners, setLinkCorners] = useState(false);

    const borderRadiusValue = useMemo(() => {
        if (linkCorners) {
            const value = topLeft;
            return `${value}${unit}`;
        }
        return `${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit}`;
    }, [topLeft, topRight, bottomLeft, bottomRight, unit, linkCorners]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`border-radius: ${borderRadiusValue};`);
    };

    const handleLinkedChange = (value: number) => {
        setTopLeft(value);
        if (linkCorners) {
            setTopRight(value);
            setBottomLeft(value);
            setBottomRight(value);
        }
    };

    return (
        <ToolContainer title="Border Radius Generator" details={details} toolId={toolId}>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 dark:text-gray-300">Unit</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="px"
                                    checked={unit === 'px'}
                                    onChange={(e) => setUnit(e.target.value as 'px' | '%')}
                                    className="mr-2"
                                />
                                px
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="%"
                                    checked={unit === '%'}
                                    onChange={(e) => setUnit(e.target.value as 'px' | '%')}
                                    className="mr-2"
                                />
                                %
                            </label>
                        </div>
                    </div>

                    <label className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={linkCorners} 
                            onChange={() => setLinkCorners(p => !p)} 
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span>Link all corners</span>
                    </label>

                    <div className="space-y-4">
                        <RangeSlider 
                            label="Top Left" 
                            value={topLeft} 
                            setValue={linkCorners ? handleLinkedChange : setTopLeft} 
                            min={0} 
                            max={unit === 'px' ? 100 : 50} 
                        />
                        
                        <RangeSlider 
                            label="Top Right" 
                            value={topRight} 
                            setValue={setTopRight} 
                            min={0} 
                            max={unit === 'px' ? 100 : 50} 
                            disabled={linkCorners}
                        />
                        
                        <RangeSlider 
                            label="Bottom Right" 
                            value={bottomRight} 
                            setValue={setBottomRight} 
                            min={0} 
                            max={unit === 'px' ? 100 : 50} 
                            disabled={linkCorners}
                        />
                        
                        <RangeSlider 
                            label="Bottom Left" 
                            value={bottomLeft} 
                            setValue={setBottomLeft} 
                            min={0} 
                            max={unit === 'px' ? 100 : 50} 
                            disabled={linkCorners}
                        />
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Shape Ideas</h4>
                        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                            <p>• <strong>Pill shape:</strong> 50% on all corners</p>
                            <p>• <strong>Rounded square:</strong> 10-20px on all corners</p>
                            <p>• <strong>Speech bubble:</strong> 0px on one corner</p>
                            <p>• <strong>Card design:</strong> Different values for each corner</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center p-8">
                        <div 
                            className="w-32 h-32 bg-blue-500 shadow-lg"
                            style={{ borderRadius: borderRadiusValue }}
                        ></div>
                    </div>
                    
                    <div className="relative">
                        <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-600 text-sm overflow-x-auto">
                            <code>border-radius: {borderRadiusValue};</code>
                        </pre>
                        <button
                            onClick={copyToClipboard}
                            className="absolute top-2 right-2 px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded"
                        >
                            Copy
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-center">
                            <div className="font-medium">Top Left</div>
                            <div className="text-gray-600 dark:text-gray-400">{topLeft}{unit}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-center">
                            <div className="font-medium">Top Right</div>
                            <div className="text-gray-600 dark:text-gray-400">{topRight}{unit}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-center">
                            <div className="font-medium">Bottom Right</div>
                            <div className="text-gray-600 dark:text-gray-400">{bottomRight}{unit}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-center">
                            <div className="font-medium">Bottom Left</div>
                            <div className="text-gray-600 dark:text-gray-400">{bottomLeft}{unit}</div>
                        </div>
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
    disabled?: boolean;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ 
    label, 
    value, 
    setValue, 
    min = 0, 
    max = 100, 
    step = 1, 
    disabled = false 
}) => (
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
            disabled={disabled}
            className={`w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
    </div>
);

export default BorderRadiusGenerator;

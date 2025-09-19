
'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const BoxShadowGenerator: React.FC<ToolProps> = ({ details }) => {
    const [hOffset, setHOffset] = useState(10);
    const [vOffset, setVOffset] = useState(10);
    const [blur, setBlur] = useState(5);
    const [spread, setSpread] = useState(0);
    const [color, setColor] = useState('#000000');
    const [opacity, setOpacity] = useState(0.5);
    const [inset, setInset] = useState(false);

    const colorWithOpacity = useMemo(() => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }, [color, opacity]);

    const boxShadowValue = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${colorWithOpacity}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`box-shadow: ${boxShadowValue};`);
    };

    return (
        <ToolContainer title="Box Shadow Generator" details={details}>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <RangeSlider label="Horizontal Offset (px)" value={hOffset} setValue={setHOffset} min={-50} max={50} />
                    <RangeSlider label="Vertical Offset (px)" value={vOffset} setValue={setVOffset} min={-50} max={50} />
                    <RangeSlider label="Blur Radius (px)" value={blur} setValue={setBlur} min={0} max={100} />
                    <RangeSlider label="Spread Radius (px)" value={spread} setValue={setSpread} min={-50} max={50} />
                    <RangeSlider label="Opacity" value={opacity} setValue={setOpacity} min={0} max={1} step={0.01} />
                    
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 dark:text-gray-300">Color</label>
                        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-12 h-8 bg-transparent border border-gray-300 dark:border-gray-600 rounded" />
                    </div>
                    
                    <label className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer">
                        <input type="checkbox" checked={inset} onChange={() => setInset(p => !p)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span>Inset</span>
                    </label>
                </div>
                <div className="space-y-4">
                    <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center p-8">
                        <div className="w-32 h-32 bg-blue-500 rounded-lg" style={{ boxShadow: boxShadowValue }}></div>
                    </div>
                    <div className="relative">
                        <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-600 text-sm overflow-x-auto">
                            <code>box-shadow: {boxShadowValue};</code>
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

const RangeSlider: React.FC<RangeSliderProps> = ({ label, value, setValue, min = -100, max = 100, step = 1 }) => (
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


export default BoxShadowGenerator;

'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import { Plus, Trash2 } from 'lucide-react';

interface ColorStop {
    id: number;
    color: string;
    position: number;
}

const presets = [
    { name: 'Sunset', colors: [{ color: '#ff7e5f', position: 0 }, { color: '#feb47b', position: 100 }] },
    { name: 'Ocean', colors: [{ color: '#2193b0', position: 0 }, { color: '#6dd5ed', position: 100 }] },
    { name: 'Lush', colors: [{ color: '#56ab2f', position: 0 }, { color: '#a8e063', position: 100 }] },
    { name: 'Royal', colors: [{ color: '#6a11cb', position: 0 }, { color: '#2575fc', position: 100 }] },
    { name: 'Mango', colors: [{ color: '#f2c94c', position: 0 }, { color: '#f2994a', position: 100 }] },
    { name: 'Mojito', colors: [{ color: '#1d976c', position: 0 }, { color: '#93f9b9', position: 100 }] },
    { name: 'Cherry', colors: [{ color: '#eb3349', position: 0 }, { color: '#f45c43', position: 100 }] },
    { name: 'Aurora', colors: [{ color: '#bbd2c5', position: 0 }, { color: '#536976', position: 50 }, { color: '#292e49', position: 100 }] },
    { name: 'Emerald', colors: [{ color: '#348f50', position: 0 }, { color: '#56b4d3', position: 100 }] },
    { name: 'Grapefruit', colors: [{ color: '#e96443', position: 0 }, { color: '#904e95', position: 100 }] },
];

const CssGradientGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
    const [colors, setColors] = useState<ColorStop[]>([
        { id: 1, color: '#3b82f6', position: 0 },
        { id: 2, color: '#8b5cf6', position: 100 },
    ]);
    const [angle, setAngle] = useState(45);
    const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
    const [radialShape, setRadialShape] = useState<'circle' | 'ellipse'>('circle');
    const [position, setPosition] = useState('center');

    const gradientValue = useMemo(() => {
        const sortedColors = [...colors].sort((a, b) => a.position - b.position);
        const colorStops = sortedColors.map(c => `${c.color} ${c.position}%`).join(', ');
        if (gradientType === 'linear') {
            return `linear-gradient(${angle}deg, ${colorStops})`;
        } else {
            return `radial-gradient(${radialShape} at ${position}, ${colorStops})`;
        }
    }, [colors, angle, gradientType, radialShape, position]);

    const addColor = (index: number) => {
        const sortedColors = [...colors].sort((a, b) => a.position - b.position);
        const prevColor = sortedColors[index];
        const nextColor = sortedColors[index + 1];
        
        const newPosition = (prevColor.position + nextColor.position) / 2;
        
        const newColorValue = interpolateColor(prevColor.color, nextColor.color, 0.5);

        const newColor: ColorStop = {
            id: Date.now(),
            color: newColorValue,
            position: newPosition,
        };
        setColors([...colors, newColor]);
    };

    const removeColor = (id: number) => {
        if (colors.length > 2) {
            setColors(colors.filter(c => c.id !== id));
        }
    };

    const updateColor = (id: number, newColor?: string, newPosition?: number) => {
        setColors(colors.map(c => {
            if (c.id === id) {
                return {
                    ...c,
                    color: newColor !== undefined ? newColor : c.color,
                    position: newPosition !== undefined ? newPosition : c.position,
                };
            }
            return c;
        }));
    };
    
    const applyPreset = (presetColors: Omit<ColorStop, 'id'>[]) => {
        setColors(presetColors.map((c, i) => ({ ...c, id: Date.now() + i })));
    };

    const sortedColors = useMemo(() => [...colors].sort((a, b) => a.position - b.position), [colors]);

    const getPresetStyle = (p: typeof presets[0]) => {
        const colorStops = p.colors.map(c => `${c.color} ${c.position}%`).join(', ');
        if (gradientType === 'linear') {
            return { background: `linear-gradient(45deg, ${colorStops})` };
        }
        return { background: `radial-gradient(circle at center, ${colorStops})` };
    };

    return (
        <ToolContainer title="CSS Gradient Generator" details={details} toolId={toolId}>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Settings</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setGradientType('linear')} className={`px-4 py-2 rounded-md text-sm font-medium ${gradientType === 'linear' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Linear</button>
                        <button onClick={() => setGradientType('radial')} className={`px-4 py-2 rounded-md text-sm font-medium ${gradientType === 'radial' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Radial</button>
                    </div>

                    {gradientType === 'linear' && (
                        <RangeSlider label="Angle" value={angle} setValue={setAngle} min={0} max={360} unit="°" />
                    )}

                    {gradientType === 'radial' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shape</label>
                                <select value={radialShape} onChange={(e) => setRadialShape(e.target.value as 'circle' | 'ellipse')} className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="circle">Circle</option>
                                    <option value="ellipse">Ellipse</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                                <select value={position} onChange={(e) => setPosition(e.target.value)} className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {['center', 'top left', 'top right', 'bottom left', 'bottom right', 'top', 'bottom', 'left', 'right'].map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <h4 className="font-semibold">Colors</h4>
                        {sortedColors.map((color, index) => (
                            <React.Fragment key={color.id}>
                                <ColorStop
                                    {...color}
                                    onUpdate={updateColor}
                                    onRemove={removeColor}
                                    canRemove={colors.length > 2}
                                />
                                {index < sortedColors.length - 1 && (
                                    <div className="flex justify-center my-1">
                                        <button onClick={() => addColor(index)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <GradientPreview gradient={gradientValue} />
                    <CodeOutput gradient={gradientValue} />
                    <div>
                        <h4 className="font-semibold mb-2">Presets</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                            {presets.map(p => (
                                <button key={p.name} onClick={() => applyPreset(p.colors)} className="h-10 w-full rounded-md transition-transform duration-200 hover:scale-105" style={getPresetStyle(p)} title={p.name}></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ToolContainer>
    );
};

const ColorStop: React.FC<ColorStop & { onUpdate: (id: number, color?: string, position?: number) => void, onRemove: (id: number) => void, canRemove: boolean }> = 
({ id, color, position, onUpdate, onRemove, canRemove }) => {
    return (
        <div className="p-3 bg-gray-100 dark:bg-gray-900/50 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <input type="color" value={color} onChange={e => onUpdate(id, e.target.value)} className="w-10 h-10 bg-transparent border-none rounded cursor-pointer" />
                    <input type="text" value={color} onChange={e => onUpdate(id, e.target.value)} className="w-24 px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded font-mono" />
                </div>
                {canRemove && <button onClick={() => onRemove(id)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><Trash2 size={16} className="text-red-500" /></button>}
            </div>
            <RangeSlider label="Position" value={position} setValue={val => onUpdate(id, undefined, val)} min={0} max={100} unit="%" />
        </div>
    );
};

const GradientPreview: React.FC<{ gradient: string }> = ({ gradient }) => (
    <div className="h-64 w-full rounded-lg shadow-inner" style={{ background: gradient }}></div>
);

const CodeOutput: React.FC<{ gradient: string }> = ({ gradient }) => {
    const code = `background: ${gradient};`;
    
    return (
        <div className="relative">
            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-600 text-sm overflow-x-auto">
                <code>{code}</code>
            </pre>
            <CopyButton textToCopy={code} className="absolute top-2 right-2" />
        </div>
    );
};

interface RangeSliderProps {
    label: string;
    value: number;
    setValue: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ label, value, setValue, min = 0, max = 100, step = 1, unit = '' }) => (
    <div>
        <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <span>{label}</span>
            <span>{value}{unit}</span>
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => setValue(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
    </div>
);

function interpolateColor(color1: string, color2: string, factor: number) {
    const result = color1.slice(1).match(/.{2}/g)!.map((hex, i) => {
        const c1 = parseInt(hex, 16);
        const c2 = parseInt(color2.slice(1).match(/.{2}/g)![i], 16);
        const c = Math.round(c1 + factor * (c2 - c1));
        return ('0' + c.toString(16)).slice(-2);
    }).join('');
    return `#${result}`;
}

export default CssGradientGenerator;

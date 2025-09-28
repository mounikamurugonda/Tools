
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const ColorConverter: React.FC<ToolProps> = ({ details, toolId }) => {
    const [hex, setHex] = useState('#3b82f6');
    const [rgb, setRgb] = useState('rgb(59, 130, 246)');
    const [hsl, setHsl] = useState('hsl(217, 91%, 60%)');

    const hexToRgb = (h: string) => {
        let r = '0', g = '0', b = '0';
        if (h.length === 4) {
            r = "0x" + h[1] + h[1];
            g = "0x" + h[2] + h[2];
            b = "0x" + h[3] + h[3];
        } else if (h.length === 7) {
            r = "0x" + h[1] + h[2];
            g = "0x" + h[3] + h[4];
            b = "0x" + h[5] + h[6];
        }
        return `rgb(${+r}, ${+g}, ${+b})`;
    };

    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255; g /= 255; b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    };

    const updateColorsFromHex = useCallback((newHex: string) => {
        if (/^#([0-9A-F]{3}){1,2}$/i.test(newHex)) {
            setHex(newHex);
            const newRgbStr = hexToRgb(newHex);
            setRgb(newRgbStr);
            const [r, g, b] = newRgbStr.replace(/[rgb()]/g, '').split(',').map(Number);
            setHsl(rgbToHsl(r, g, b));
        }
    }, []);
    
    useEffect(() => {
        updateColorsFromHex('#3b82f6');
    }, [updateColorsFromHex]);

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHex = e.target.value;
        setHex(newHex);
        updateColorsFromHex(newHex);
    };
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <ToolContainer title="Color Converter" details={details} toolId={toolId}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center items-center">
                    <div className="relative">
                        <div style={{ backgroundColor: hex }} className="w-48 h-48 rounded-full border-4 border-gray-200 dark:border-gray-700 shadow-lg"></div>
                        <input type="color" value={hex} onChange={handleHexChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                </div>
                <div className="space-y-4">
                    <ColorInput label="HEX" value={hex} onChange={handleHexChange} onCopy={() => copyToClipboard(hex)} />
                    <ColorInput label="RGB" value={rgb} readOnly onCopy={() => copyToClipboard(rgb)} />
                    <ColorInput label="HSL" value={hsl} readOnly onCopy={() => copyToClipboard(hsl)} />
                </div>
            </div>
        </ToolContainer>
    );
};

interface ColorInputProps {
    label: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCopy: () => void;
    readOnly?: boolean;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange, onCopy, readOnly = false }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly}
                    className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 pr-12"
                />
                <button
                    onClick={onCopy}
                    className="absolute top-1/2 right-1 transform -translate-y-1/2 px-2 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded"
                >
                    Copy
                </button>
            </div>
        </div>
    );
};

export default ColorConverter;

'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const TextShadowGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [hOffset, setHOffset] = useState(2);
  const [vOffset, setVOffset] = useState(2);
  const [blur, setBlur] = useState(4);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.5);
  const [textColor, setTextColor] = useState('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState('#bfcad9');

  const colorWithOpacity = useMemo(() => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }, [color, opacity]);

  const textShadowValue = `${hOffset}px ${vOffset}px ${blur}px ${colorWithOpacity}`;

  const fullExample = `.text-shadow-example {
  color: ${textColor};
  text-shadow: ${textShadowValue};
}`;

  return (
    <ToolContainer
      title="Text Shadow Generator"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <RangeSlider
              label="Horizontal Offset (px)"
              value={hOffset}
              setValue={setHOffset}
              min={-20}
              max={20}
            />
            <RangeSlider
              label="Vertical Offset (px)"
              value={vOffset}
              setValue={setVOffset}
              min={-20}
              max={20}
            />
            <RangeSlider
              label="Blur Radius (px)"
              value={blur}
              setValue={setBlur}
              min={0}
              max={20}
            />
            <RangeSlider
              label="Opacity"
              value={opacity}
              setValue={setOpacity}
              min={0}
              max={1}
              step={0.01}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">
                Shadow Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-8 bg-transparent border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-20 px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">
                Text Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-8 bg-transparent border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-20 px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">
                Background Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-12 h-8 bg-transparent border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-20 px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded font-mono"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Text Shadow Tips
            </h4>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <p>
                • <strong>Subtle depth:</strong> Small offsets (1-2px) with low
                blur
              </p>
              <p>
                • <strong>Dramatic effect:</strong> Larger offsets with high
                blur
              </p>
              <p>
                • <strong>Glow effect:</strong> Zero offset, high blur
              </p>
              <p>
                • <strong>Multiple shadows:</strong> Use comma-separated values
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="h-48 rounded flex items-center justify-center p-8"
            style={{ backgroundColor }}
          >
            <h2
              className="text-2xl font-bold"
              style={{
                color: textColor,
                textShadow: textShadowValue,
              }}
            >
              Sample Text
            </h2>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-600 text-sm overflow-x-auto">
                <code>{`text-shadow: ${textShadowValue};`}</code>
              </pre>
              <CopyButton
                textToCopy={`text-shadow: ${textShadowValue};`}
                className="absolute top-2 right-2"
              />
            </div>

            <div className="relative">
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-600 text-sm overflow-x-auto">
                <code>{fullExample}</code>
              </pre>
              <CopyButton
                textToCopy={fullExample}
                className="absolute top-2 right-2"
              />
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <h4 className="font-medium mb-2">Preview Values</h4>
            <div className="text-sm space-y-1">
              <div>X: {hOffset}px</div>
              <div>Y: {vOffset}px</div>
              <div>Blur: {blur}px</div>
              <div>Color: {colorWithOpacity}</div>
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
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  value,
  setValue,
  min = -20,
  max = 20,
  step = 1,
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
      onChange={(e) => setValue(parseFloat(e.target.value))}
      className="w-full"
    />
  </div>
);

export default TextShadowGenerator;

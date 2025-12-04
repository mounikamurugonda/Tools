
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const CssTriangle: React.FC<ToolProps> = ({ details, toolId }) => {
  const [direction, setDirection] = useState('top');
  const [color, setColor] = useState('#3b82f6');
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  const getBorderStyles = () => {
    const styles: any = {
      width: 0,
      height: 0,
      borderStyle: 'solid',
    };

    switch (direction) {
      case 'top':
        styles.borderWidth = `0 ${width / 2}px ${height}px ${width / 2}px`;
        styles.borderColor = `transparent transparent ${color} transparent`;
        break;
      case 'bottom':
        styles.borderWidth = `${height}px ${width / 2}px 0 ${width / 2}px`;
        styles.borderColor = `${color} transparent transparent transparent`;
        break;
      case 'left':
        styles.borderWidth = `${height / 2}px ${width}px ${height / 2}px 0`;
        styles.borderColor = `transparent ${color} transparent transparent`;
        break;
      case 'right':
        styles.borderWidth = `${height / 2}px 0 ${height / 2}px ${width}px`;
        styles.borderColor = `transparent transparent transparent ${color}`;
        break;
    }
    return styles;
  };

  const cssOutput = `width: 0;
height: 0;
border-style: solid;
border-width: ${getBorderStyles().borderWidth};
border-color: ${getBorderStyles().borderColor};`;

  return (
    <ToolContainer title="CSS Triangle Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">Direction</label>
                <div className="flex flex-wrap gap-2">
                    {['top', 'right', 'bottom', 'left'].map(d => (
                        <button
                            key={d}
                            onClick={() => setDirection(d)}
                            className={`px-4 py-2 capitalize rounded border ${direction === d ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Width ({width}px)</label>
                <input type="range" min="0" max="300" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Height ({height}px)</label>
                <input type="range" min="0" max="300" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-10" />
            </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-64 h-64 border border-gray-200 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded">
                <div style={getBorderStyles()}></div>
            </div>
            <div className="relative w-full">
                <textarea readOnly value={cssOutput} className="w-full h-32 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-3 font-mono text-xs" />
                <CopyButton textToCopy={cssOutput} className="absolute top-2 right-2" />
            </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default CssTriangle;

'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const RandomNumber: React.FC<ToolProps> = ({ details, toolId }) => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const nums = [];
    for (let i = 0; i < count; i++) {
      nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setResults(nums);
  };

  return (
    <ToolContainer
      title="Random Number Generator"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Min</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              className="brand-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="brand-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Count</label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="brand-input"
            />
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg shadow-md transition-transform active:scale-95"
        >
          Generate
        </button>

        {results.length > 0 && (
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl min-h-[100px] flex flex-wrap items-center justify-center gap-4">
            {results.map((n, i) => (
              <span
                key={i}
                className="text-4xl font-bold text-gray-800 dark:text-gray-100 animate-fade-in"
              >
                {n}
                {i < results.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        )}
      </div>
    </ToolContainer>
  );
};

export default RandomNumber;

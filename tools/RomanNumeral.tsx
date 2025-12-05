'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const toRoman = (num: number): string => {
  if (isNaN(num)) return '';
  const lookup: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let roman = '',
    i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
};

const fromRoman = (roman: string): number => {
  const lookup: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let num = 0;
  roman = roman.toUpperCase();
  for (let i = 0; i < roman.length; i++) {
    const curr = lookup[roman[i]];
    const next = lookup[roman[i + 1]];
    if (next > curr) {
      num += next - curr;
      i++;
    } else {
      num += curr;
    }
  }
  return num || 0;
};

const RomanNumeral: React.FC<ToolProps> = ({ details, toolId }) => {
  const [number, setNumber] = useState('2024');
  const [roman, setRoman] = useState('MMXXIV');

  const handleNumChange = (v: string) => {
    setNumber(v);
    setRoman(toRoman(parseInt(v)));
  };

  const handleRomanChange = (v: string) => {
    setRoman(v);
    setNumber(fromRoman(v).toString());
  };

  return (
    <ToolContainer
      title="Roman Numeral Converter"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-2xl mx-auto">
        <div className="space-y-2">
          <label className="text-xl font-bold block text-center">
            Decimal Number
          </label>
          <input
            type="number"
            value={number}
            onChange={(e) => handleNumChange(e.target.value)}
            className="w-full text-center text-4xl p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="flex justify-center text-gray-400">
          <svg
            className="w-8 h-8 md:rotate-0 rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <label className="text-xl font-bold block text-center">
            Roman Numeral
          </label>
          <input
            type="text"
            value={roman}
            onChange={(e) => handleRomanChange(e.target.value)}
            className="w-full text-center text-4xl p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 uppercase"
          />
        </div>
      </div>
    </ToolContainer>
  );
};

export default RomanNumeral;

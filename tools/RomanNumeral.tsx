'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import { ArrowLeftRight } from 'lucide-react';

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
    <ToolContainer title="Roman Numeral Converter" details={details} toolId={toolId}>
      <Card className="max-w-3xl mx-auto py-12 px-8">
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-8 items-center">
          <div className="space-y-4">
            <Label htmlFor="decimal-input" className="text-center block text-lg">
              Decimal Number
            </Label>
            <Input
              id="decimal-input"
              type="number"
              value={number}
              onChange={e => handleNumChange(e.target.value)}
              className="text-center text-3xl h-16"
              placeholder="123"
            />
          </div>

          <div className="flex justify-center text-gray-400">
            <ArrowLeftRight className="w-8 h-8 rotate-90 md:rotate-0 text-blue-500" />
          </div>

          <div className="space-y-4">
            <Label htmlFor="roman-input" className="text-center block text-lg">
              Roman Numeral
            </Label>
            <Input
              id="roman-input"
              type="text"
              value={roman}
              onChange={e => handleRomanChange(e.target.value)}
              className="text-center text-3xl h-16 uppercase font-serif"
              placeholder="IV"
            />
          </div>
        </div>
      </Card>
    </ToolContainer>
  );
};

export default RomanNumeral;

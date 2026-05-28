'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowLeftRight, Copy } from 'lucide-react';

const LOOKUP: [string, number][] = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
];

const toRoman = (num: number): string => {
  let n = num;
  let roman = '';
  for (const [sym, val] of LOOKUP) {
    while (n >= val) {
      roman += sym;
      n -= val;
    }
  }
  return roman;
};

const ROMAN_VALUES: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

const fromRoman = (roman: string): number => {
  let num = 0;
  const r = roman.toUpperCase();
  for (let i = 0; i < r.length; i++) {
    const curr = ROMAN_VALUES[r[i]];
    const next = ROMAN_VALUES[r[i + 1]];
    if (next > curr) {
      num += next - curr;
      i++;
    } else {
      num += curr;
    }
  }
  return num;
};

const RomanNumeral: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [number, setNumber] = useState('2024');
  const [roman, setRoman] = useState('MMXXIV');
  const [error, setError] = useState<string | null>(null);

  const handleNumChange = (v: string) => {
    setNumber(v);
    if (v.trim() === '') {
      setRoman('');
      setError(null);
      return;
    }
    const n = parseInt(v, 10);
    if (Number.isNaN(n) || n < 1 || n > 3999 || !Number.isInteger(Number(v))) {
      setError('Enter a whole number between 1 and 3999.');
      setRoman('');
      return;
    }
    setError(null);
    setRoman(toRoman(n));
  };

  const handleRomanChange = (v: string) => {
    setRoman(v.toUpperCase());
    if (v.trim() === '') {
      setNumber('');
      setError(null);
      return;
    }
    if (!/^[IVXLCDM]+$/i.test(v.trim())) {
      setError('Only the letters I, V, X, L, C, D, M are allowed.');
      setNumber('');
      return;
    }
    const n = fromRoman(v);
    // Validate canonical form: re-encode and compare.
    if (n < 1 || n > 3999 || toRoman(n) !== v.toUpperCase().trim()) {
      setError('Not a valid Roman numeral (check the ordering, e.g. IV not IIII).');
      setNumber('');
      return;
    }
    setError(null);
    setNumber(n.toString());
  };

  const copy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${text}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <ToolContainer title="Roman Numeral Converter" details={details} toolId={toolId}>
      <Card className="max-w-3xl mx-auto py-12 px-8">
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-8 items-center">
          <div className="space-y-3">
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
              min={1}
              max={3999}
            />
            <Button variant="ghost" size="sm" onClick={() => copy(number)} disabled={!number} className="w-full">
              <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy
            </Button>
          </div>

          <div className="flex justify-center text-gray-400">
            <ArrowLeftRight className="w-8 h-8 rotate-90 md:rotate-0 text-blue-500" />
          </div>

          <div className="space-y-3">
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
            <Button variant="ghost" size="sm" onClick={() => copy(roman)} disabled={!roman} className="w-full">
              <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy
            </Button>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-6 text-center text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Standard Roman numerals represent 1–3999. There is no symbol for zero or negative numbers.
        </p>
      </Card>
    </ToolContainer>
  );
};

export default RomanNumeral;

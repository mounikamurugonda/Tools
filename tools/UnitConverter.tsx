'use client';

import React, { useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import CustomSelect from '@/components/ui/CustomSelect';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowLeftRight, Copy } from 'lucide-react';

// Factor-based categories (value × factor = base unit).
const FACTOR_CATEGORIES = {
  length: {
    meters: 1,
    kilometers: 1000,
    centimeters: 0.01,
    millimeters: 0.001,
    miles: 1609.34,
    yards: 0.9144,
    feet: 0.3048,
    inches: 0.0254,
  },
  weight: {
    kilograms: 1,
    grams: 0.001,
    milligrams: 0.000001,
    'metric tons': 1000,
    pounds: 0.453592,
    ounces: 0.0283495,
    stones: 6.35029,
  },
  area: {
    'square meters': 1,
    'square kilometers': 1_000_000,
    'square feet': 0.092903,
    'square miles': 2_589_988,
    acres: 4046.86,
    hectares: 10_000,
  },
  volume: {
    liters: 1,
    milliliters: 0.001,
    'cubic meters': 1000,
    gallons: 3.78541,
    quarts: 0.946353,
    pints: 0.473176,
    cups: 0.24,
  },
  speed: {
    'm/s': 1,
    'km/h': 0.277778,
    mph: 0.44704,
    knots: 0.514444,
    'ft/s': 0.3048,
  },
  'digital storage': {
    bytes: 1,
    kilobytes: 1024,
    megabytes: 1024 ** 2,
    gigabytes: 1024 ** 3,
    terabytes: 1024 ** 4,
    bits: 0.125,
  },
  time: {
    seconds: 1,
    milliseconds: 0.001,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
  },
} as const;

// Temperature handled specially (non-multiplicative).
const TEMP_UNITS = ['celsius', 'fahrenheit', 'kelvin'] as const;
type TempUnit = (typeof TEMP_UNITS)[number];

function toCelsius(v: number, from: TempUnit): number {
  if (from === 'celsius') return v;
  if (from === 'fahrenheit') return ((v - 32) * 5) / 9;
  return v - 273.15;
}
function fromCelsius(c: number, to: TempUnit): number {
  if (to === 'celsius') return c;
  if (to === 'fahrenheit') return (c * 9) / 5 + 32;
  return c + 273.15;
}

type Category = keyof typeof FACTOR_CATEGORIES | 'temperature';
const CATEGORIES: Category[] = [
  'length',
  'weight',
  'temperature',
  'area',
  'volume',
  'speed',
  'digital storage',
  'time',
];

const UnitConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [category, setCategory] = useState<Category>('length');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState<string>('meters');
  const [toUnit, setToUnit] = useState<string>('feet');

  const units = useMemo(
    () =>
      category === 'temperature'
        ? (TEMP_UNITS as readonly string[])
        : Object.keys(FACTOR_CATEGORIES[category]),
    [category]
  );

  const result = useMemo(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return '—';

    let converted: number;
    if (category === 'temperature') {
      converted = fromCelsius(toCelsius(value, fromUnit as TempUnit), toUnit as TempUnit);
    } else {
      const factors = FACTOR_CATEGORIES[category] as Record<string, number>;
      converted = (value * factors[fromUnit]) / factors[toUnit];
    }
    return converted.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [inputValue, fromUnit, toUnit, category]);

  const handleCategoryChange = (next: Category) => {
    setCategory(next);
    const newUnits =
      next === 'temperature' ? (TEMP_UNITS as readonly string[]) : Object.keys(FACTOR_CATEGORIES[next]);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1] || newUnits[0]);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success(`Copied ${result}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <ToolContainer title="Unit Converter" details={details} toolId={toolId}>
      <Card className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => handleCategoryChange(c)}
              aria-pressed={category === c}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                category === c
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div className="space-y-2">
            <Label>From</Label>
            <Input
              type="number"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="text-lg font-medium"
              placeholder="Enter value"
            />
            <CustomSelect
              value={{ value: fromUnit, label: fromUnit }}
              onChange={option => setFromUnit((option as { value: string; label: string })?.value || fromUnit)}
              options={units.map(u => ({ value: u, label: u }))}
            />
          </div>

          <div className="flex justify-center pb-2">
            <Button variant="outline" size="sm" onClick={swap} title="Swap units" className="h-10 w-10 !p-0">
              <ArrowLeftRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <div className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-between gap-2 min-h-[46px]">
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 break-all" aria-live="polite">
                {result}
              </span>
              <button
                type="button"
                onClick={copyResult}
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex-shrink-0"
                title="Copy result"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <CustomSelect
              value={{ value: toUnit, label: toUnit }}
              onChange={option => setToUnit((option as { value: string; label: string })?.value || toUnit)}
              options={units.map(u => ({ value: u, label: u }))}
            />
          </div>
        </div>
      </Card>
    </ToolContainer>
  );
};

export default UnitConverter;

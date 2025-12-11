'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Label from '@/components/ui/Label';

const CONVERSION_FACTORS = {
  length: {
    meters: 1,
    kilometers: 1000,
    centimeters: 0.01,
    miles: 1609.34,
    feet: 0.3048,
    inches: 0.0254,
  },
  weight: {
    kilograms: 1,
    grams: 0.001,
    milligrams: 0.000001,
    pounds: 0.453592,
    ounces: 0.0283495,
  },
};

type Category = keyof typeof CONVERSION_FACTORS;

const UnitConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [category, setCategory] = useState<Category>('length');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState<string>('meters');
  const [toUnit, setToUnit] = useState<string>('feet');

  const units = Object.keys(CONVERSION_FACTORS[category]);

  const result = useMemo(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return '...';

    const factors = CONVERSION_FACTORS[category] as Record<string, number>;
    const fromFactor = factors[fromUnit];
    const toFactor = factors[toUnit];

    const valueInBase = value * fromFactor;
    const convertedValue = valueInBase / toFactor;

    return convertedValue.toLocaleString(undefined, {
      maximumFractionDigits: 5,
    });
  }, [inputValue, fromUnit, toUnit, category]);

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    const newUnits = Object.keys(CONVERSION_FACTORS[newCategory]);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1] || newUnits[0]);
  };

  return (
    <ToolContainer title="Unit Converter" details={details} toolId={toolId}>
      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded-xl flex">
          <button
            onClick={() => handleCategoryChange('length')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${category === 'length'
              ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
          >
            Length
          </button>
          <button
            onClick={() => handleCategoryChange('weight')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${category === 'weight'
              ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
          >
            Weight
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 items-start">
          <div className="space-y-2">
            <Label>From</Label>
            <Input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-lg font-medium"
            />
            <Select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>To</Label>
            <div className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center min-h-[46px]">
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 break-all">
                {result}
              </span>
            </div>
            <Select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default UnitConverter;

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

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

const UnitConverter: React.FC<ToolProps> = () => {
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
        
        return convertedValue.toLocaleString(undefined, { maximumFractionDigits: 5 });
    }, [inputValue, fromUnit, toUnit, category]);

    const handleCategoryChange = (newCategory: Category) => {
        setCategory(newCategory);
        const newUnits = Object.keys(CONVERSION_FACTORS[newCategory]);
        setFromUnit(newUnits[0]);
        setToUnit(newUnits[1] || newUnits[0]);
    };

    return (
        <ToolContainer title="Unit Converter">
            <div className="space-y-4 max-w-xl mx-auto">
                <div className="p-1 bg-gray-200 dark:bg-gray-700 rounded-lg flex">
                    <button onClick={() => handleCategoryChange('length')} className={`w-1/2 py-2 rounded-md ${category === 'length' ? 'bg-blue-600 text-white' : ''}`}>Length</button>
                    <button onClick={() => handleCategoryChange('weight')} className={`w-1/2 py-2 rounded-md ${category === 'weight' ? 'bg-blue-600 text-white' : ''}`}>Weight</button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
                        <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                         <select
                            value={fromUnit}
                            onChange={e => setFromUnit(e.target.value)}
                            className="w-full mt-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                        </select>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
                         <div className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-2 text-2xl text-blue-400 font-bold">
                            {result}
                         </div>
                        <select
                            value={toUnit}
                            onChange={e => setToUnit(e.target.value)}
                            className="w-full mt-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </ToolContainer>
    );
};

export default UnitConverter;
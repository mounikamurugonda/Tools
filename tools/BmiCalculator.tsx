
'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

type UnitSystem = 'metric' | 'imperial';

const BmiCalculator: React.FC<ToolProps> = () => {
    const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
    const [weight, setWeight] = useState('70');
    const [height, setHeight] = useState('175');
    const [heightFt, setHeightFt] = useState('5');
    const [heightIn, setHeightIn] = useState('9');

    const result = useMemo(() => {
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const hFt = parseFloat(heightFt);
        const hIn = parseFloat(heightIn);

        if (isNaN(w) || w <= 0) return null;

        let bmi = 0;
        if (unitSystem === 'metric') {
            if (isNaN(h) || h <= 0) return null;
            const heightInMeters = h / 100;
            bmi = w / (heightInMeters * heightInMeters);
        } else {
            if (isNaN(hFt) || isNaN(hIn) || (hFt <= 0 && hIn <= 0)) return null;
            const totalHeightInInches = (hFt * 12) + hIn;
            bmi = (w / (totalHeightInInches * totalHeightInInches)) * 703;
        }

        if (bmi <= 0 || !isFinite(bmi)) return null;

        let category = '';
        let color = '';
        if (bmi < 18.5) {
            category = 'Underweight';
            color = 'text-blue-400';
        } else if (bmi < 25) {
            category = 'Normal weight';
            color = 'text-green-400';
        } else if (bmi < 30) {
            category = 'Overweight';
            color = 'text-yellow-400';
        } else {
            category = 'Obese';
            color = 'text-red-400';
        }

        return {
            bmi: bmi.toFixed(1),
            category,
            color,
        };
    }, [unitSystem, weight, height, heightFt, heightIn]);

    return (
        <ToolContainer title="BMI Calculator">
            <div className="max-w-md mx-auto space-y-6">
                <div className="p-1 bg-gray-200 dark:bg-gray-700 rounded-lg flex">
                    <button onClick={() => setUnitSystem('metric')} className={`w-1/2 py-2 rounded-md ${unitSystem === 'metric' ? 'bg-blue-600 text-white' : ''}`}>Metric</button>
                    <button onClick={() => setUnitSystem('imperial')} className={`w-1/2 py-2 rounded-md ${unitSystem === 'imperial' ? 'bg-blue-600 text-white' : ''}`}>Imperial</button>
                </div>

                {unitSystem === 'metric' ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                        <NumberInput label="Height (cm)" value={height} onChange={setHeight} />
                        <NumberInput label="Weight (kg)" value={weight} onChange={setWeight} />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <NumberInput label="Height (ft)" value={heightFt} onChange={setHeightFt} />
                           <NumberInput label="Height (in)" value={heightIn} onChange={setHeightIn} />
                        </div>
                        <NumberInput label="Weight (lbs)" value={weight} onChange={setWeight} />
                    </div>
                )}

                {result && (
                    <div className="text-center bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Your BMI is</p>
                        <p className={`text-6xl font-bold my-2 ${result.color}`}>{result.bmi}</p>
                        <p className={`text-xl font-semibold ${result.color}`}>{result.category}</p>
                    </div>
                )}
            </div>
        </ToolContainer>
    );
};

const NumberInput: React.FC<{label: string, value: string, onChange: (v: string) => void}> = ({label, value, onChange}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
            type="number"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

export default BmiCalculator;

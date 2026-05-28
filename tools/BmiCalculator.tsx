'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

type UnitSystem = 'metric' | 'imperial';

const BmiCalculator: React.FC<ToolProps> = ({ details, toolId }) => {
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
    let heightMeters = 0;
    if (unitSystem === 'metric') {
      if (isNaN(h) || h <= 0) return null;
      heightMeters = h / 100;
      bmi = w / (heightMeters * heightMeters);
    } else {
      if (isNaN(hFt) || isNaN(hIn) || (hFt <= 0 && hIn <= 0)) return null;
      const totalInches = hFt * 12 + hIn;
      heightMeters = totalInches * 0.0254;
      bmi = (w / (totalInches * totalInches)) * 703;
    }

    if (bmi <= 0 || !isFinite(bmi)) return null;

    let category = '';
    let color = '';
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-500';
    } else if (bmi < 25) {
      category = 'Normal weight';
      color = 'text-green-500';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-500';
    } else {
      category = 'Obese';
      color = 'text-red-500';
    }

    // Healthy weight range (BMI 18.5–24.9) for this height.
    const lowKg = 18.5 * heightMeters * heightMeters;
    const highKg = 24.9 * heightMeters * heightMeters;
    const healthy =
      unitSystem === 'metric'
        ? `${lowKg.toFixed(1)}–${highKg.toFixed(1)} kg`
        : `${(lowKg / 0.453592).toFixed(1)}–${(highKg / 0.453592).toFixed(1)} lbs`;

    // Position on a 15–40 BMI scale for the marker.
    const pct = Math.max(0, Math.min(100, ((bmi - 15) / (40 - 15)) * 100));

    return { bmi: bmi.toFixed(1), category, color, healthy, pct };
  }, [unitSystem, weight, height, heightFt, heightIn]);

  return (
    <ToolContainer title="BMI Calculator" details={details} toolId={toolId}>
      <Card className="max-w-md mx-auto p-6 space-y-6">
        <div className="inline-flex w-full rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900">
          {(['metric', 'imperial'] as UnitSystem[]).map(u => (
            <button
              key={u}
              type="button"
              onClick={() => setUnitSystem(u)}
              aria-pressed={unitSystem === u}
              className={`flex-1 py-1.5 text-sm rounded-md capitalize transition-colors ${
                unitSystem === u
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {u}
            </button>
          ))}
        </div>

        {unitSystem === 'metric' ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input type="number" value={height} onChange={e => setHeight(e.target.value)} min={0} />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} min={0} />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Height (ft)</Label>
                <Input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} min={0} />
              </div>
              <div className="space-y-2">
                <Label>Height (in)</Label>
                <Input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} min={0} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Weight (lbs)</Label>
              <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} min={0} />
            </div>
          </div>
        )}

        {result ? (
          <div className="text-center bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">Your BMI is</p>
            <p className={`text-4xl font-bold my-2 ${result.color}`}>{result.bmi}</p>
            <p className={`text-xl font-semibold ${result.color}`}>{result.category}</p>

            {/* Scale */}
            <div className="mt-5">
              <div className="relative h-2 rounded-full overflow-hidden flex">
                <span className="flex-1 bg-blue-400" />
                <span className="flex-1 bg-green-400" />
                <span className="flex-1 bg-yellow-400" />
                <span className="flex-1 bg-red-400" />
                <span
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-900 dark:bg-white border-2 border-white dark:border-gray-900 shadow"
                  style={{ left: `${result.pct}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>15</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Healthy weight for your height: <span className="font-medium text-gray-700 dark:text-gray-200">{result.healthy}</span>
            </p>
          </div>
        ) : (
          <div className="text-center bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-dashed border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
            Enter a positive height and weight to see your BMI.
          </div>
        )}

        <p className="text-xs text-center text-gray-400">
          BMI is a screening tool, not a diagnosis — it doesn&apos;t account for muscle mass, age, or body composition.
        </p>
      </Card>
    </ToolContainer>
  );
};

export default BmiCalculator;

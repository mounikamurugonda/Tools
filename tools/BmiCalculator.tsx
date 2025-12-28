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
    if (unitSystem === 'metric') {
      if (isNaN(h) || h <= 0) return null;
      const heightInMeters = h / 100;
      bmi = w / (heightInMeters * heightInMeters);
    } else {
      if (isNaN(hFt) || isNaN(hIn) || (hFt <= 0 && hIn <= 0)) return null;
      const totalHeightInInches = hFt * 12 + hIn;
      bmi = (w / (totalHeightInInches * totalHeightInInches)) * 703;
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

    return {
      bmi: bmi.toFixed(1),
      category,
      color,
    };
  }, [unitSystem, weight, height, heightFt, heightIn]);

  return (
    <ToolContainer title="BMI Calculator" details={details} toolId={toolId}>
      <Card className="max-w-md mx-auto p-6 space-y-6">
        <div className="flex gap-2 p-1 bg-secondary rounded-lg">
          <Button
            onClick={() => setUnitSystem('metric')}
            variant={unitSystem === 'metric' ? 'primary' : 'ghost'}
            className="w-1/2"
          >
            Metric
          </Button>
          <Button
            onClick={() => setUnitSystem('imperial')}
            variant={unitSystem === 'imperial' ? 'primary' : 'ghost'}
            className="w-1/2"
          >
            Imperial
          </Button>
        </div>

        {unitSystem === 'metric' ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input type="number" value={height} onChange={e => setHeight(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Height (ft)</Label>
                <Input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Height (in)</Label>
                <Input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Weight (lbs)</Label>
              <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
            </div>
          </div>
        )}

        {result && (
          <div className="text-center bg-secondary/30 p-6 rounded-lg border border-border">
            <p className="text-muted-foreground">Your BMI is</p>
            <p className={`text-4xl font-bold my-2 ${result.color}`}>{result.bmi}</p>
            <p className={`text-xl font-semibold ${result.color}`}>{result.category}</p>
          </div>
        )}
      </Card>
    </ToolContainer>
  );
};

export default BmiCalculator;

'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';

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
        <Card title="Settings">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <Label>Min</Label>
              <Input
                type="number"
                value={min}
                onChange={(e) => setMin(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Max</Label>
              <Input
                type="number"
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Count</Label>
              <Input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
            </div>
          </div>
        </Card>

        <Button
          onClick={generate}
          fullWidth
          size="lg"
          variant="primary"
        >
          Generate
        </Button>

        {results.length > 0 && (
          <Card title="Results" className="min-h-[100px] flex flex-wrap items-center justify-center gap-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {results.map((n, i) => (
                <span
                  key={i}
                  className="text-4xl font-bold text-blue-600 dark:text-blue-400 animate-slide-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {n}
                  {i < results.length - 1 ? <span className="text-gray-300 dark:text-gray-600 ml-3">,</span> : ''}
                </span>
              ))}
            </div>
          </Card>
        )}
      </div>
    </ToolContainer>
  );
};

export default RandomNumber;

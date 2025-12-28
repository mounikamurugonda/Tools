'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const PercentageCalculator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [val1, setVal1] = useState(10);
  const [total1, setTotal1] = useState(50);

  const [val2, setVal2] = useState(25);
  const [total2, setTotal2] = useState(200);

  return (
    <ToolContainer title="Percentage Calculator" details={details} toolId={toolId}>
      <div className="space-y-8 max-w-3xl mx-auto">
        <Card title="What is X% of Y?">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="whitespace-nowrap">What is</span>
            <Input
              type="number"
              value={val1}
              onChange={e => setVal1(Number(e.target.value))}
              className="w-24"
            />
            <span className="whitespace-nowrap">% of</span>
            <Input
              type="number"
              value={total1}
              onChange={e => setTotal1(Number(e.target.value))}
              className="w-32"
            />
            <span>?</span>
          </div>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Result</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {((val1 / 100) * total1).toFixed(2)}
            </div>
          </div>
        </Card>

        <Card title="X is what % of Y?">
          <div className="flex items-center gap-4 flex-wrap">
            <Input
              type="number"
              value={val2}
              onChange={e => setVal2(Number(e.target.value))}
              className="w-24"
            />
            <span className="whitespace-nowrap">is what % of</span>
            <Input
              type="number"
              value={total2}
              onChange={e => setTotal2(Number(e.target.value))}
              className="w-32"
            />
            <span>?</span>
          </div>
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Result</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {((val2 / total2) * 100).toFixed(2)}%
            </div>
          </div>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default PercentageCalculator;

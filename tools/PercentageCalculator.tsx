
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const PercentageCalculator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [val1, setVal1] = useState(10);
  const [total1, setTotal1] = useState(50);
  
  const [val2, setVal2] = useState(25);
  const [total2, setTotal2] = useState(200);

  return (
    <ToolContainer title="Percentage Calculator" details={details} toolId={toolId}>
      <div className="space-y-8 max-w-2xl mx-auto">
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="font-bold mb-4">What is X% of Y?</h3>
            <div className="flex items-center gap-4 flex-wrap">
                <span>What is</span>
                <input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="w-20 brand-input" />
                <span>% of</span>
                <input type="number" value={total1} onChange={e => setTotal1(Number(e.target.value))} className="w-24 brand-input" />
                <span>?</span>
            </div>
            <div className="mt-4 text-2xl font-bold text-blue-600">= {((val1 / 100) * total1).toFixed(2)}</div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="font-bold mb-4">X is what % of Y?</h3>
            <div className="flex items-center gap-4 flex-wrap">
                <input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="w-20 brand-input" />
                <span>is what % of</span>
                <input type="number" value={total2} onChange={e => setTotal2(Number(e.target.value))} className="w-24 brand-input" />
                <span>?</span>
            </div>
            <div className="mt-4 text-2xl font-bold text-green-600">= {((val2 / total2) * 100).toFixed(2)}%</div>
        </div>

      </div>
    </ToolContainer>
  );
};

export default PercentageCalculator;

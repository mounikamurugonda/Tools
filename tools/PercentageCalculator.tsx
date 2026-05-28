'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy } from 'lucide-react';

function fmt(n: number): string {
  if (!Number.isFinite(n)) return '—';
  return Number(n.toFixed(2)).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

const PercentageCalculator: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [val1, setVal1] = useState(10);
  const [total1, setTotal1] = useState(50);

  const [val2, setVal2] = useState(25);
  const [total2, setTotal2] = useState(200);

  const [from3, setFrom3] = useState(80);
  const [to3, setTo3] = useState(100);

  const res1 = (val1 / 100) * total1;
  const res2 = total2 === 0 ? NaN : (val2 / total2) * 100;
  const res3 = from3 === 0 ? NaN : ((to3 - from3) / Math.abs(from3)) * 100;

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${text}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  const ResultBox = ({
    value,
    suffix = '',
    tone,
  }: {
    value: number;
    suffix?: string;
    tone: 'blue' | 'green' | 'purple';
  }) => {
    const tones = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400',
      green:
        'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900 text-green-600 dark:text-green-400',
      purple:
        'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900 text-purple-600 dark:text-purple-400',
    } as const;
    const display = `${fmt(value)}${suffix}`;
    return (
      <div className={`mt-6 p-4 rounded-xl border flex items-center justify-between gap-3 ${tones[tone]}`}>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Result</div>
          <div className="text-3xl font-bold" aria-live="polite">
            {display}
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copy(display)}
          disabled={!Number.isFinite(value)}
          title="Copy result"
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  return (
    <ToolContainer title="Percentage Calculator" details={details} toolId={toolId}>
      <div className="space-y-8 max-w-3xl mx-auto">
        <Card title="What is X% of Y?">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="whitespace-nowrap">What is</span>
            <Input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="w-24" />
            <span className="whitespace-nowrap">% of</span>
            <Input type="number" value={total1} onChange={e => setTotal1(Number(e.target.value))} className="w-32" />
            <span>?</span>
          </div>
          <ResultBox value={res1} tone="blue" />
        </Card>

        <Card title="X is what % of Y?">
          <div className="flex items-center gap-4 flex-wrap">
            <Input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="w-24" />
            <span className="whitespace-nowrap">is what % of</span>
            <Input type="number" value={total2} onChange={e => setTotal2(Number(e.target.value))} className="w-32" />
            <span>?</span>
          </div>
          <ResultBox value={res2} suffix="%" tone="green" />
          {total2 === 0 && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">Cannot divide by zero.</p>
          )}
        </Card>

        <Card title="Percentage change from X to Y">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="whitespace-nowrap">From</span>
            <Input type="number" value={from3} onChange={e => setFrom3(Number(e.target.value))} className="w-28" />
            <span className="whitespace-nowrap">to</span>
            <Input type="number" value={to3} onChange={e => setTo3(Number(e.target.value))} className="w-28" />
          </div>
          <ResultBox value={res3} suffix="%" tone="purple" />
          {Number.isFinite(res3) && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {res3 > 0 ? 'Increase' : res3 < 0 ? 'Decrease' : 'No change'} of {fmt(Math.abs(res3))}%
            </p>
          )}
          {from3 === 0 && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">Starting value cannot be zero.</p>
          )}
        </Card>
      </div>
    </ToolContainer>
  );
};

export default PercentageCalculator;

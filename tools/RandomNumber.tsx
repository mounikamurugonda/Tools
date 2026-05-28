'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy } from 'lucide-react';

// Unbiased integer in [min, max] via rejection sampling on crypto.getRandomValues.
function randInt(min: number, max: number): number {
  const range = max - min + 1;
  const limit = Math.floor(0xffffffff / range) * range;
  const buf = new Uint32Array(1);
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return min + (x % range);
}

const RandomNumber: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generate = () => {
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    const n = Math.max(1, Math.min(1000, Math.floor(count) || 1));
    const rangeSize = hi - lo + 1;

    if (!Number.isFinite(lo) || !Number.isFinite(hi)) {
      setError('Enter valid numbers.');
      setResults([]);
      return;
    }
    if (unique && n > rangeSize) {
      setError(`Can't pick ${n} unique values from a range of only ${rangeSize}.`);
      setResults([]);
      return;
    }

    setError(null);
    if (unique) {
      // Partial Fisher–Yates over the range.
      const pool = Array.from({ length: rangeSize }, (_, i) => lo + i);
      for (let i = 0; i < n; i++) {
        const j = i + randInt(0, rangeSize - 1 - i);
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      setResults(pool.slice(0, n));
    } else {
      setResults(Array.from({ length: n }, () => randInt(lo, hi)));
    }
  };

  const copyResults = async () => {
    if (!results.length) return;
    try {
      await navigator.clipboard.writeText(results.join(', '));
      toast.success('Copied results');
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <ToolContainer title="Random Number Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Settings">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <Label>Min</Label>
              <Input type="number" value={min} onChange={e => setMin(Number(e.target.value))} />
            </div>
            <div>
              <Label>Max</Label>
              <Input type="number" value={max} onChange={e => setMax(Number(e.target.value))} />
            </div>
            <div>
              <Label>Count</Label>
              <Input
                type="number"
                min={1}
                max={1000}
                value={count}
                onChange={e => setCount(Number(e.target.value))}
              />
            </div>
          </div>
          <label className="flex items-center gap-2 mt-4 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)} />
            No duplicates (unique values)
          </label>
        </Card>

        <Button onClick={generate} fullWidth size="lg" variant="primary">
          Generate
        </Button>

        {error && (
          <div role="alert" className="text-center text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <Card title="Results">
            <div className="flex justify-end mb-2">
              <Button size="sm" variant="ghost" onClick={copyResults}>
                <Copy className="w-4 h-4 mr-1.5" /> Copy
              </Button>
            </div>
            <div className="min-h-[80px] flex flex-wrap gap-3 justify-center items-center" aria-live="polite">
              {results.map((num, i) => (
                <span
                  key={i}
                  className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400"
                >
                  {num}
                  {i < results.length - 1 && (
                    <span className="text-gray-300 dark:text-gray-600 ml-3">,</span>
                  )}
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

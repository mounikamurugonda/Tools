'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy } from 'lucide-react';

type Mode = 'duration' | 'calculate';
type Unit = 'days' | 'weeks' | 'months' | 'years';

const DateCalculator: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [mode, setMode] = useState<Mode>('duration');
  const today = new Date().toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [includeEnd, setIncludeEnd] = useState(false);

  const [calcDate, setCalcDate] = useState(today);
  const [amount, setAmount] = useState('30');
  const [unit, setUnit] = useState<Unit>('days');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');

  const durationResult = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    const lo = start <= end ? start : end;
    const hi = start <= end ? end : start;

    const diffMs = hi.getTime() - lo.getTime();
    let diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (includeEnd) diffDays += 1;

    // Calendar Y/M/D breakdown.
    let years = hi.getFullYear() - lo.getFullYear();
    let months = hi.getMonth() - lo.getMonth();
    let bdays = hi.getDate() - lo.getDate();
    if (bdays < 0) {
      months--;
      bdays += new Date(hi.getFullYear(), hi.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return {
      days: diffDays,
      weeks: (diffDays / 7).toFixed(1),
      breakdown: { years, months, bdays },
    };
  }, [startDate, endDate, includeEnd]);

  const calculateResult = useMemo(() => {
    const start = new Date(calcDate);
    const amt = parseInt(amount, 10);
    if (isNaN(start.getTime()) || isNaN(amt)) return null;

    const result = new Date(start);
    const signed = operation === 'add' ? amt : -amt;
    switch (unit) {
      case 'days':
        result.setDate(result.getDate() + signed);
        break;
      case 'weeks':
        result.setDate(result.getDate() + signed * 7);
        break;
      case 'months':
        result.setMonth(result.getMonth() + signed);
        break;
      case 'years':
        result.setFullYear(result.getFullYear() + signed);
        break;
    }

    return result.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [calcDate, amount, unit, operation]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied result');
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <ToolContainer title="Date Calculator" details={details} toolId={toolId}>
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="inline-flex w-full rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900">
          {(['duration', 'calculate'] as Mode[]).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`flex-1 py-2 text-sm rounded-md transition-colors ${
                mode === m
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {m === 'duration' ? 'Duration Between Dates' : 'Add / Subtract'}
            </button>
          ))}
        </div>

        {mode === 'duration' ? (
          <Card className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div>
                <Label>End Date</Label>
                <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input type="checkbox" checked={includeEnd} onChange={e => setIncludeEnd(e.target.checked)} />
              Include end day in the count
            </label>
            {durationResult && (
              <div className="text-center bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {durationResult.days.toLocaleString()} days
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {durationResult.breakdown.years}y {durationResult.breakdown.months}m{' '}
                  {durationResult.breakdown.bdays}d · {durationResult.weeks} weeks
                </p>
                <Button size="sm" variant="ghost" onClick={() => copy(`${durationResult.days} days`)} className="mt-2">
                  <Copy className="w-4 h-4 mr-1.5" /> Copy
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <Card className="space-y-4">
            <div>
              <Label>Start Date</Label>
              <Input type="date" value={calcDate} onChange={e => setCalcDate(e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>Operation</Label>
                <Select value={operation} onChange={e => setOperation(e.target.value as 'add' | 'subtract')}>
                  <option value="add">Add</option>
                  <option value="subtract">Subtract</option>
                </Select>
              </div>
              <div>
                <Label>Amount</Label>
                <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={unit} onChange={e => setUnit(e.target.value as Unit)}>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </Select>
              </div>
            </div>
            {calculateResult && (
              <div className="text-center bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Resulting Date</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{calculateResult}</p>
                <Button size="sm" variant="ghost" onClick={() => copy(calculateResult)} className="mt-2">
                  <Copy className="w-4 h-4 mr-1.5" /> Copy
                </Button>
              </div>
            )}
          </Card>
        )}
      </div>
    </ToolContainer>
  );
};

export default DateCalculator;

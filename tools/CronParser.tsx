'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Calendar } from 'lucide-react';

type Field = { min: number; max: number; name: string; names?: Record<number, string> };

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const FIELDS: Field[] = [
  { min: 0, max: 59, name: 'minute' },
  { min: 0, max: 23, name: 'hour' },
  { min: 1, max: 31, name: 'day-of-month' },
  { min: 1, max: 12, name: 'month', names: Object.fromEntries(MONTHS.map((m, i) => [i + 1, m])) },
  { min: 0, max: 6, name: 'day-of-week', names: Object.fromEntries(DAYS.map((d, i) => [i, d])) },
];

const PRESETS = [
  { label: 'Every minute', expr: '* * * * *' },
  { label: 'Every 5 minutes', expr: '*/5 * * * *' },
  { label: 'Every 15 minutes', expr: '*/15 * * * *' },
  { label: 'Hourly', expr: '0 * * * *' },
  { label: 'Daily at midnight', expr: '0 0 * * *' },
  { label: 'Daily at 9 AM', expr: '0 9 * * *' },
  { label: 'Weekly (Mon 9 AM)', expr: '0 9 * * 1' },
  { label: 'Weekdays at 9 AM', expr: '0 9 * * 1-5' },
  { label: 'Monthly (1st @ midnight)', expr: '0 0 1 * *' },
  { label: 'Yearly (Jan 1 @ midnight)', expr: '0 0 1 1 *' },
];

function parseField(token: string, field: Field): { values: Set<number>; isStar: boolean } {
  const values = new Set<number>();
  let isStar = true;
  for (const part of token.split(',')) {
    const [rangePart, stepStr] = part.split('/');
    const step = stepStr ? parseInt(stepStr, 10) : 1;
    if (!Number.isFinite(step) || step <= 0) throw new Error(`Bad step in ${field.name}: ${part}`);
    let start: number, end: number;
    if (rangePart === '*') {
      start = field.min;
      end = field.max;
    } else if (rangePart.includes('-')) {
      const [a, b] = rangePart.split('-').map(n => parseInt(n, 10));
      if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error(`Bad range in ${field.name}: ${part}`);
      start = a; end = b;
      isStar = false;
    } else {
      const n = parseInt(rangePart, 10);
      if (!Number.isFinite(n)) throw new Error(`Bad value in ${field.name}: ${part}`);
      start = n;
      end = stepStr ? field.max : n;
      isStar = false;
    }
    if (start < field.min || end > field.max || start > end) {
      throw new Error(`${field.name} out of range (${field.min}-${field.max}): ${part}`);
    }
    for (let v = start; v <= end; v += step) values.add(v);
    if (stepStr && rangePart === '*' && step !== 1) isStar = false;
  }
  return { values, isStar };
}

interface ParsedCron {
  fields: { values: Set<number>; isStar: boolean }[];
  raw: string;
}

function parseCron(expression: string): ParsedCron {
  const tokens = expression.trim().split(/\s+/);
  if (tokens.length !== 5) throw new Error(`Expected 5 fields, got ${tokens.length}`);
  const fields = tokens.map((t, i) => parseField(t, FIELDS[i]));
  return { fields, raw: expression };
}

function describe(p: ParsedCron): string {
  const [min, hour, dom, month, dow] = p.fields;
  const parts: string[] = [];

  const describeMinHour = () => {
    if (min.isStar && hour.isStar) return 'every minute';
    if (min.values.size === 1 && hour.isStar) {
      const m = [...min.values][0];
      return m === 0 ? 'at the top of every hour' : `at minute ${m} of every hour`;
    }
    if (min.isStar && hour.values.size === 1) return `every minute, only at hour ${[...hour.values][0]}`;
    if (min.values.size === 1 && hour.values.size === 1) {
      const m = [...min.values][0];
      const h = [...hour.values][0];
      return `at ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    }
    if (!min.isStar) parts.push(`minutes [${[...min.values].join(',')}]`);
    if (!hour.isStar) parts.push(`hours [${[...hour.values].join(',')}]`);
    return parts.join(', ');
  };

  let s = describeMinHour();
  if (!dom.isStar) s += `, on day-of-month ${[...dom.values].join(',')}`;
  if (!month.isStar) s += `, in ${[...month.values].map(v => MONTHS[v - 1]).join(', ')}`;
  if (!dow.isStar) s += `, on ${[...dow.values].map(v => DAYS[v % 7]).join(', ')}`;
  return s;
}

function matches(p: ParsedCron, d: Date): boolean {
  const [min, hour, dom, month, dow] = p.fields;
  if (!min.values.has(d.getMinutes())) return false;
  if (!hour.values.has(d.getHours())) return false;
  if (!month.values.has(d.getMonth() + 1)) return false;
  // POSIX cron: when both DOM and DOW are restricted, match if either matches.
  const domMatch = dom.values.has(d.getDate());
  const dowMatch = dow.values.has(d.getDay());
  if (dom.isStar && dow.isStar) return true;
  if (dom.isStar) return dowMatch;
  if (dow.isStar) return domMatch;
  return domMatch || dowMatch;
}

function nextRuns(p: ParsedCron, count: number, from = new Date()): Date[] {
  const results: Date[] = [];
  const cursor = new Date(from);
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);
  const limit = 366 * 24 * 60;
  for (let i = 0; i < limit && results.length < count; i++) {
    if (matches(p, cursor)) results.push(new Date(cursor));
    cursor.setMinutes(cursor.getMinutes() + 1);
  }
  return results;
}

const FIELD_LABELS = [
  { label: 'Minute', placeholder: '0-59' },
  { label: 'Hour', placeholder: '0-23' },
  { label: 'Day', placeholder: '1-31' },
  { label: 'Month', placeholder: '1-12' },
  { label: 'Weekday', placeholder: '0-6 (Sun=0)' },
];

const CronParser: React.FC<ToolProps> = ({ details, toolId }) => {
  const [tokens, setTokens] = useState<string[]>(['*', '*', '*', '*', '*']);
  const toast = useToast();
  const expression = useMemo(() => tokens.join(' '), [tokens]);

  const [parsed, setParsed] = useState<ParsedCron | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setParsed(parseCron(expression));
      setError(null);
    } catch (e) {
      setParsed(null);
      setError(e instanceof Error ? e.message : 'Invalid cron');
    }
  }, [expression]);

  const setField = (i: number, v: string) => {
    setTokens(prev => prev.map((t, j) => (j === i ? v : t)));
  };

  const applyPreset = (expr: string) => {
    const t = expr.trim().split(/\s+/);
    if (t.length === 5) setTokens(t);
  };

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(expression);
      toast.success('Expression copied');
    } catch {
      toast.error('Copy failed');
    }
  }, [expression, toast]);

  const next = useMemo(() => (parsed ? nextRuns(parsed, 5) : []), [parsed]);

  return (
    <ToolContainer title="Cron Expression Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Fields" className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {FIELD_LABELS.map((f, i) => (
              <div key={f.label} className="space-y-1">
                <Label htmlFor={`cron-${i}`}>{f.label}</Label>
                <Input
                  id={`cron-${i}`}
                  value={tokens[i]}
                  onChange={e => setField(i, e.target.value)}
                  placeholder={f.placeholder}
                  className="font-mono text-center"
                />
              </div>
            ))}
          </div>
        </Card>

        <div className="relative p-6 bg-gray-50 dark:bg-gray-900 rounded-xl text-center border border-gray-200 dark:border-gray-700">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Cron Expression</p>
          <code className="block text-2xl md:text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 break-all" aria-live="polite">
            {expression}
          </code>
          <Button onClick={copy} variant="ghost" size="sm" className="absolute top-3 right-3" aria-label="Copy expression">
            <Copy size={16} />
          </Button>
          {error ? (
            <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
          ) : parsed && (
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{describe(parsed)}</p>
          )}
        </div>

        <Card title="Presets" className="p-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(p => (
              <button
                key={p.expr}
                type="button"
                onClick={() => applyPreset(p.expr)}
                aria-pressed={expression === p.expr}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  expression === p.expr
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title={p.expr}
              >
                {p.label}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Next 5 runs" className="p-4">
          {!parsed ? (
            <p className="text-sm text-gray-500">Fix the expression to see upcoming runs.</p>
          ) : next.length === 0 ? (
            <p className="text-sm text-gray-500">No matches found within the next year.</p>
          ) : (
            <ul className="space-y-2">
              {next.map((d, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                  <Calendar size={14} className="text-gray-400" />
                  <span>{d.toLocaleString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          Supports <code>*</code>, <code>n</code>, <code>a-b</code>, <code>a,b,c</code>, <code>*/n</code>, and <code>a-b/n</code> in each of the 5 fields (minute, hour, day, month, weekday).
        </div>
      </div>
    </ToolContainer>
  );
};

export default CronParser;

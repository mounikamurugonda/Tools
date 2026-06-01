'use client';

import React, { useState, useMemo, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import { useToast } from '@/components/ui/ToastProvider';
import { Shuffle, Trophy, Copy, Download } from 'lucide-react';

type Mode = 'shuffle' | 'winners';

// Unbiased Fisher–Yates using crypto when available (rejection-sampled).
function randomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) return 0;
  const cryptoObj = typeof window !== 'undefined' ? window.crypto : undefined;
  if (cryptoObj?.getRandomValues) {
    const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;
    const buf = new Uint32Array(1);
    let v = 0;
    do {
      cryptoObj.getRandomValues(buf);
      v = buf[0];
    } while (v >= limit);
    return v % maxExclusive;
  }
  return Math.floor(Math.random() * maxExclusive);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ListRandomizer: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('Apple\nBanana\nCherry\nDate\nElderberry');
  const [output, setOutput] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>('shuffle');
  const [winnerCount, setWinnerCount] = useState(1);
  const [trim, setTrim] = useState(true);
  const [dropBlanks, setDropBlanks] = useState(true);
  const [dedupe, setDedupe] = useState(false);
  const [numbered, setNumbered] = useState(false);
  const toast = useToast();

  const items = useMemo(() => {
    let lines = input.split('\n');
    if (trim) lines = lines.map(l => l.trim());
    if (dropBlanks) lines = lines.filter(l => l.length > 0);
    if (dedupe) lines = Array.from(new Set(lines));
    return lines;
  }, [input, trim, dropBlanks, dedupe]);

  const run = useCallback(() => {
    if (items.length === 0) {
      toast.error('Add at least one item to your list');
      return;
    }
    if (mode === 'shuffle') {
      setOutput(shuffle(items));
      toast.success(`Shuffled ${items.length} items`);
    } else {
      const n = Math.min(Math.max(1, winnerCount), items.length);
      setOutput(shuffle(items).slice(0, n));
      toast.success(`Picked ${n} winner${n === 1 ? '' : 's'}`);
    }
  }, [items, mode, winnerCount, toast]);

  const outputText = useMemo(
    () => output.map((line, i) => (numbered ? `${i + 1}. ${line}` : line)).join('\n'),
    [output, numbered]
  );

  const copyOutput = () => {
    if (!outputText) return;
    navigator.clipboard
      .writeText(outputText)
      .then(() => toast.success('Result copied'))
      .catch(() => toast.error('Failed to copy'));
  };

  const downloadOutput = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'winners' ? 'winners.txt' : 'shuffled-list.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolContainer title="List Randomizer" details={details} toolId={toolId}>
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="mb-0">List Items</Label>
            <span className="text-sm text-gray-500">{items.length} items</span>
          </div>
          <TextArea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="h-[340px]"
            placeholder="Enter items (one per line)..."
          />

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
            <Checkbox label="Trim whitespace" checked={trim} onChange={setTrim} />
            <Checkbox label="Drop blank lines" checked={dropBlanks} onChange={setDropBlanks} />
            <Checkbox label="Remove duplicates" checked={dedupe} onChange={setDedupe} />
            <Checkbox label="Number results" checked={numbered} onChange={setNumbered} />
          </div>
        </div>

        {/* Controls + Output */}
        <div className="space-y-4">
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1" role="tablist">
            <ModeTab label="Shuffle" icon={<Shuffle className="w-4 h-4" />} active={mode === 'shuffle'} onClick={() => setMode('shuffle')} />
            <ModeTab label="Pick Winners" icon={<Trophy className="w-4 h-4" />} active={mode === 'winners'} onClick={() => setMode('winners')} />
          </div>

          {mode === 'winners' && (
            <div className="flex items-center gap-3">
              <Label htmlFor="winner-count" className="mb-0 shrink-0">
                Number of winners
              </Label>
              <Input
                id="winner-count"
                type="number"
                min={1}
                max={items.length || 1}
                value={winnerCount}
                onChange={e => setWinnerCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-24"
              />
            </div>
          )}

          <Button onClick={run} variant="primary" size="lg" className="w-full">
            {mode === 'shuffle' ? (
              <>
                <Shuffle className="w-5 h-5 mr-2" /> Randomize List
              </>
            ) : (
              <>
                <Trophy className="w-5 h-5 mr-2" /> Pick {winnerCount > 1 ? `${winnerCount} Winners` : 'Winner'}
              </>
            )}
          </Button>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4 min-h-[220px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {mode === 'winners' ? 'Winners' : 'Shuffled'}
              </span>
              {output.length > 0 && (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={copyOutput} aria-label="Copy result">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={downloadOutput} aria-label="Download result">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            {output.length === 0 ? (
              <div className="flex items-center justify-center h-[160px] text-sm text-gray-400 dark:text-gray-500">
                Results will appear here.
              </div>
            ) : (
              <ol className="space-y-1" aria-live="polite">
                {output.map((line, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${
                      mode === 'winners'
                        ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300'
                        : 'bg-white dark:bg-gray-700/50 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <span className="text-xs font-mono text-gray-400 w-6 shrink-0">{i + 1}.</span>
                    <span className="break-words">{line}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

const Checkbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
    />
    {label}
  </label>
);

const ModeTab = ({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    role="tab"
    aria-selected={active}
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    {icon}
    {label}
  </button>
);

export default ListRandomizer;

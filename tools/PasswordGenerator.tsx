'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import { useToast } from '@/components/ui/ToastProvider';
import { Check, Copy, RefreshCw, Download, Eye, EyeOff } from 'lucide-react';

const CHARS = {
  LOWER: 'abcdefghijklmnopqrstuvwxyz',
  UPPER: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  NUMBERS: '0123456789',
  SYMBOLS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};
const AMBIGUOUS = /[lI1O0o]/g;

// Unbiased uniform integer in [0, max) using rejection sampling on crypto.getRandomValues.
function unbiasedRandomInt(max: number): number {
  if (max <= 0) throw new Error('max must be > 0');
  const limit = Math.floor(0xffffffff / max) * max;
  const buf = new Uint32Array(1);
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = unbiasedRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface GenerateOptions {
  length: number;
  useUpper: boolean;
  useLower: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
  excludeAmbiguous: boolean;
  requireEachClass: boolean;
}

function generateRandomPassword(opts: GenerateOptions): string {
  const pools: string[] = [];
  if (opts.useLower) pools.push(opts.excludeAmbiguous ? CHARS.LOWER.replace(AMBIGUOUS, '') : CHARS.LOWER);
  if (opts.useUpper) pools.push(opts.excludeAmbiguous ? CHARS.UPPER.replace(AMBIGUOUS, '') : CHARS.UPPER);
  if (opts.useNumbers) pools.push(opts.excludeAmbiguous ? CHARS.NUMBERS.replace(AMBIGUOUS, '') : CHARS.NUMBERS);
  if (opts.useSymbols) pools.push(CHARS.SYMBOLS);

  if (pools.length === 0) throw new Error('Select at least one character class.');

  const charset = pools.join('');
  if (charset.length === 0) throw new Error('Character set is empty after exclusions.');

  const chars: string[] = [];
  if (opts.requireEachClass) {
    if (opts.length < pools.length) {
      throw new Error(`Length must be ≥ ${pools.length} when requiring one of each class.`);
    }
    for (const pool of pools) {
      chars.push(pool[unbiasedRandomInt(pool.length)]);
    }
  }
  while (chars.length < opts.length) {
    chars.push(charset[unbiasedRandomInt(charset.length)]);
  }
  shuffleInPlace(chars);
  return chars.join('');
}

function calcEntropyBits(length: number, opts: Omit<GenerateOptions, 'length' | 'requireEachClass'>): number {
  let poolSize = 0;
  if (opts.useLower) poolSize += (opts.excludeAmbiguous ? CHARS.LOWER.replace(AMBIGUOUS, '') : CHARS.LOWER).length;
  if (opts.useUpper) poolSize += (opts.excludeAmbiguous ? CHARS.UPPER.replace(AMBIGUOUS, '') : CHARS.UPPER).length;
  if (opts.useNumbers) poolSize += (opts.excludeAmbiguous ? CHARS.NUMBERS.replace(AMBIGUOUS, '') : CHARS.NUMBERS).length;
  if (opts.useSymbols) poolSize += CHARS.SYMBOLS.length;
  if (poolSize <= 1) return 0;
  return length * Math.log2(poolSize);
}

function strengthLabel(bits: number): { label: string; color: string; pct: number } {
  // 0–40 very weak, 40–60 weak, 60–80 fair, 80–100 strong, 100+ very strong
  const pct = Math.min(100, Math.round((bits / 128) * 100));
  if (bits < 40) return { label: 'Very weak', color: 'bg-red-500', pct };
  if (bits < 60) return { label: 'Weak', color: 'bg-orange-500', pct };
  if (bits < 80) return { label: 'Fair', color: 'bg-yellow-500', pct };
  if (bits < 100) return { label: 'Strong', color: 'bg-green-500', pct };
  return { label: 'Very strong', color: 'bg-emerald-600', pct };
}

const PasswordGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [passwords, setPasswords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [length, setLength] = useState(20);
  const [count, setCount] = useState(1);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [requireEachClass, setRequireEachClass] = useState(true);
  const [reveal, setReveal] = useState(true);

  const opts = useMemo<GenerateOptions>(
    () => ({ length, useUpper, useLower, useNumbers, useSymbols, excludeAmbiguous, requireEachClass }),
    [length, useUpper, useLower, useNumbers, useSymbols, excludeAmbiguous, requireEachClass]
  );

  const generate = useCallback(() => {
    try {
      const next: string[] = [];
      for (let i = 0; i < count; i++) next.push(generateRandomPassword(opts));
      setPasswords(next);
      setError(null);
    } catch (e) {
      setPasswords([]);
      setError(e instanceof Error ? e.message : 'Generation failed');
    }
  }, [opts, count]);

  // Auto-regenerate when options change.
  useEffect(() => {
    generate();
  }, [generate]);

  const entropy = useMemo(
    () => calcEntropyBits(length, { useUpper, useLower, useNumbers, useSymbols, excludeAmbiguous }),
    [length, useUpper, useLower, useNumbers, useSymbols, excludeAmbiguous]
  );
  const strength = strengthLabel(entropy);

  const copyOne = async (pw: string) => {
    try {
      await navigator.clipboard.writeText(pw);
      toast.success('Copied');
    } catch {
      toast.error('Copy failed');
    }
  };

  const copyAll = async () => {
    if (!passwords.length) return;
    try {
      await navigator.clipboard.writeText(passwords.join('\n'));
      toast.success(`Copied ${passwords.length} password${passwords.length === 1 ? '' : 's'}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  const downloadAll = () => {
    if (!passwords.length) return;
    const blob = new Blob([passwords.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passwords.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const OptionButton = ({
    label,
    active,
    onClick,
    id,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
    id?: string;
  }) => (
    <button
      id={id}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
        active
          ? 'bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-700'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <span
        className={`text-sm font-medium ${
          active ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {label}
      </span>
      <div
        className={`w-5 h-5 rounded flex items-center justify-center border ${
          active ? 'bg-blue-600 border-blue-600' : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        {active && <Check size={12} className="text-white" />}
      </div>
    </button>
  );

  return (
    <ToolContainer title="Password Generator" details={details} toolId={toolId}>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Output */}
        <Card className="!p-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {passwords.length === 1 ? 'Password' : `${passwords.length} passwords`}
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setReveal(v => !v)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                title={reveal ? 'Hide passwords' : 'Show passwords'}
                aria-pressed={!reveal}
              >
                {reveal ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={generate}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Regenerate"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              {passwords.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={copyAll}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    title="Copy all"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={downloadAll}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    title="Download .txt"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {error ? (
            <div
              role="alert"
              className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg text-sm text-red-700 dark:text-red-300"
            >
              {error}
            </div>
          ) : passwords.length === 1 ? (
            <div className="flex items-center gap-2">
              <div
                className="flex-1 font-mono text-lg sm:text-xl px-4 h-14 flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 tracking-wider break-all select-all"
                aria-live="polite"
              >
                {reveal ? passwords[0] : '•'.repeat(passwords[0].length)}
              </div>
              <button
                type="button"
                onClick={() => copyOne(passwords[0])}
                className="inline-flex items-center justify-center w-12 h-14 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <ul className="space-y-1 max-h-72 overflow-y-auto" aria-live="polite">
              {passwords.map((pw, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                >
                  <span className="text-xs text-gray-400 tabular-nums w-6">{i + 1}.</span>
                  <span className="flex-1 font-mono text-sm break-all select-all">
                    {reveal ? pw : '•'.repeat(pw.length)}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyOne(pw)}
                    className="inline-flex items-center justify-center w-7 h-7 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    title="Copy"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Strength meter */}
          {!error && passwords.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1.5">
                <span>
                  Strength: <span className="font-semibold">{strength.label}</span>
                </span>
                <span className="tabular-nums">{entropy.toFixed(1)} bits of entropy</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all`}
                  style={{ width: `${strength.pct}%` }}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={128}
                  aria-valuenow={Math.round(entropy)}
                />
              </div>
            </div>
          )}
        </Card>

        <Card title="Configuration">
          <div className="space-y-4">
            <Slider
              label="Password length"
              value={length}
              onChange={e => setLength(parseInt(e.target.value, 10))}
              min={4}
              max={128}
              valueDisplay={length}
            />
            <Slider
              label="Generate count"
              value={count}
              onChange={e => setCount(parseInt(e.target.value, 10))}
              min={1}
              max={50}
              valueDisplay={count}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <OptionButton label="Uppercase (A–Z)" active={useUpper} onClick={() => setUseUpper(v => !v)} />
            <OptionButton label="Lowercase (a–z)" active={useLower} onClick={() => setUseLower(v => !v)} />
            <OptionButton label="Numbers (0–9)" active={useNumbers} onClick={() => setUseNumbers(v => !v)} />
            <OptionButton label="Symbols (!@#…)" active={useSymbols} onClick={() => setUseSymbols(v => !v)} />
            <OptionButton
              label="Exclude ambiguous (l, I, 1, O, 0)"
              active={excludeAmbiguous}
              onClick={() => setExcludeAmbiguous(v => !v)}
            />
            <OptionButton
              label="Require one of each class"
              active={requireEachClass}
              onClick={() => setRequireEachClass(v => !v)}
            />
          </div>
        </Card>

        <Button
          onClick={generate}
          fullWidth
          size="lg"
          variant="primary"
          className="h-12 text-lg"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Regenerate
        </Button>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Generated locally using <code className="font-mono">crypto.getRandomValues</code> with
          rejection sampling — passwords never leave your browser.
        </p>
      </div>
    </ToolContainer>
  );
};

export default PasswordGenerator;

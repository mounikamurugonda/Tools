'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { AlertCircle, Copy } from 'lucide-react';
import { AIActionButton } from '@/components/AIActionButton';
import { generateRegex } from '@/lib/sarvamAI';

type Mode = 'match' | 'replace';

const FLAG_LIST: { f: string; title: string }[] = [
  { f: 'g', title: 'global — find all matches' },
  { f: 'i', title: 'case-insensitive' },
  { f: 'm', title: 'multiline — ^ and $ match line boundaries' },
  { f: 's', title: 'dotall — . matches newlines' },
  { f: 'u', title: 'unicode' },
  { f: 'y', title: 'sticky — match from lastIndex' },
];

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const RegexTester: React.FC<ToolProps> = ({ details, toolId }) => {
  const [pattern, setPattern] = useState('(\\w+)@(\\w+\\.\\w+)');
  const [flagSet, setFlagSet] = useState<Set<string>>(new Set(['g']));
  const [testStr, setTestStr] = useState(
    'Contact us at hello@example.com or support@utiltoolkits.com — both are monitored.'
  );
  const [mode, setMode] = useState<Mode>('match');
  const [replacement, setReplacement] = useState('<a href="mailto:$&">$&</a>');
  const [aiDesc, setAiDesc] = useState('');
  const toast = useToast();

  const flags = useMemo(() => Array.from(flagSet).join(''), [flagSet]);

  const compiled = useMemo<{ regex: RegExp | null; error: string | null }>(() => {
    if (!pattern) return { regex: null, error: null };
    try {
      return { regex: new RegExp(pattern, flags), error: null };
    } catch (e) {
      return { regex: null, error: e instanceof Error ? e.message : 'Invalid pattern' };
    }
  }, [pattern, flags]);

  const matches = useMemo(() => {
    if (!compiled.regex || !testStr) return [];
    if (!flagSet.has('g')) {
      // matchAll requires /g; fall back to a single exec.
      const m = compiled.regex.exec(testStr);
      return m ? [m] : [];
    }
    return Array.from(testStr.matchAll(compiled.regex));
  }, [compiled.regex, testStr, flagSet]);

  const highlightedHtml = useMemo(() => {
    if (!compiled.regex || matches.length === 0) return escapeHtml(testStr);
    let lastIndex = 0;
    let out = '';
    matches.forEach(m => {
      const idx = m.index ?? -1;
      if (idx < 0) return;
      if (idx > lastIndex) out += escapeHtml(testStr.slice(lastIndex, idx));
      out += `<mark class="bg-blue-200/70 dark:bg-blue-500/40 rounded px-0.5 text-blue-900 dark:text-blue-100">${escapeHtml(m[0])}</mark>`;
      lastIndex = idx + m[0].length;
      // Zero-width matches: avoid infinite loop visually
      if (m[0].length === 0) lastIndex = idx + 1;
    });
    if (lastIndex < testStr.length) out += escapeHtml(testStr.slice(lastIndex));
    return out;
  }, [compiled.regex, matches, testStr]);

  const replaced = useMemo(() => {
    if (!compiled.regex || !testStr) return '';
    try {
      return testStr.replace(compiled.regex, replacement);
    } catch (e) {
      return e instanceof Error ? `# error: ${e.message}` : '';
    }
  }, [compiled.regex, testStr, replacement]);

  const toggleFlag = useCallback((f: string) => {
    setFlagSet(prev => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  }, []);

  const copy = useCallback(
    async (value: string, label: string) => {
      try {
        await navigator.clipboard.writeText(value);
        toast.success(`${label} copied`);
      } catch {
        toast.error('Copy failed');
      }
    },
    [toast]
  );

  // Auto-add 'g' when switching to replace if it's not present, so users don't get only-first-match surprise.
  useEffect(() => {
    if (mode === 'replace' && !flagSet.has('g')) {
      // intentionally don't auto-mutate; just hint via UI
    }
  }, [mode, flagSet]);

  return (
    <ToolContainer title="Regex Tester" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Pattern" className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="flex-1 flex items-center gap-2 min-w-0">
              <span className="text-xl font-mono text-gray-400 select-none">/</span>
              <Input
                value={pattern}
                onChange={e => setPattern(e.target.value)}
                placeholder="Regular expression"
                className="font-mono"
                aria-label="Regex pattern"
              />
              <span className="text-xl font-mono text-gray-400 select-none">/</span>
              <span className="font-mono text-blue-600 dark:text-blue-400 min-w-[3rem]">{flags}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {FLAG_LIST.map(f => {
                const on = flagSet.has(f.f);
                return (
                  <button
                    key={f.f}
                    type="button"
                    onClick={() => toggleFlag(f.f)}
                    aria-pressed={on}
                    title={f.title}
                    className={`w-8 h-8 text-xs font-mono rounded border transition-colors ${
                      on
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {f.f}
                  </button>
                );
              })}
            </div>
          </div>
          {compiled.error && (
            <div role="alert" className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="break-words">{compiled.error}</span>
            </div>
          )}
        </Card>

        {/* AI: Generate Regex from description */}
        <div className="bg-violet-50/50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800/40 rounded-xl p-4">
          <p className="text-xs font-semibold text-violet-700 dark:text-violet-400 mb-2 flex items-center gap-1.5">
            ✨ Generate Regex from Description
          </p>
          <div className="flex gap-2 items-start">
            <input
              value={aiDesc}
              onChange={e => setAiDesc(e.target.value)}
              placeholder="e.g. match any email address with a .com or .org domain"
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-violet-200 dark:border-violet-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <AIActionButton
              label="Generate"
              actionName="generate regex"
              onAction={async () => {
                const result = await generateRegex(aiDesc);
                setPattern(result.trim());
                return `Pattern set to: /${result.trim()}/`;
              }}
              disabled={!aiDesc.trim()}
              className="shrink-0"
            />
          </div>
        </div>

        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900">
          {(['match', 'replace'] as Mode[]).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`px-4 py-1.5 text-sm font-medium rounded ${
                mode === m ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {m === 'match' ? 'Match' : 'Replace'}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="regex-test">Test string</Label>
          <TextArea
            id="regex-test"
            value={testStr}
            onChange={e => setTestStr(e.target.value)}
            placeholder="Text to test against..."
            className="h-32 font-mono"
          />
        </div>

        {mode === 'replace' && (
          <div className="space-y-2">
            <Label htmlFor="regex-replacement">Replacement (use $&, $1, $2, …)</Label>
            <Input
              id="regex-replacement"
              value={replacement}
              onChange={e => setReplacement(e.target.value)}
              placeholder="Replacement string"
              className="font-mono"
            />
            {!flagSet.has('g') && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Without the <code className="font-mono">g</code> flag, only the first match is replaced.
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <Card
            title={mode === 'match' ? 'Highlighted matches' : 'Replaced output'}
            className="p-0 overflow-hidden"
          >
            {mode === 'match' ? (
              <div
                className="bg-gray-50 dark:bg-gray-900 p-3 text-gray-800 dark:text-gray-200 font-mono text-sm overflow-auto whitespace-pre-wrap break-words h-64"
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              />
            ) : (
              <div className="relative">
                <pre className="bg-gray-50 dark:bg-gray-900 p-3 text-gray-800 dark:text-gray-200 font-mono text-sm overflow-auto whitespace-pre-wrap break-words h-64">{replaced}</pre>
                {replaced && (
                  <button
                    type="button"
                    onClick={() => copy(replaced, 'Output')}
                    className="absolute top-2 right-2 p-1.5 rounded text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label="Copy output"
                  >
                    <Copy size={14} />
                  </button>
                )}
              </div>
            )}
          </Card>

          <Card
            title={
              <div className="flex justify-between items-center">
                <span>Matches</span>
                <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                  {matches.length} found
                </span>
              </div>
            }
            className="p-0 overflow-hidden"
          >
            <div className="bg-gray-50 dark:bg-gray-900 p-3 h-64 overflow-auto space-y-2">
              {matches.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">
                  No matches found
                </div>
              ) : (
                matches.map((m, i) => (
                  <div
                    key={i}
                    className="p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded text-sm"
                  >
                    <div className="flex gap-2 items-baseline">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">#{i + 1}</span>
                      <span className="font-mono break-all flex-1">{m[0] || '(empty match)'}</span>
                      <span className="text-[10px] text-gray-400 tabular-nums">@ {m.index}</span>
                    </div>
                    {m.length > 1 && (
                      <ol className="mt-1 pl-5 space-y-0.5 text-xs">
                        {Array.from(m).slice(1).map((g, gi) => (
                          <li key={gi} className="text-gray-600 dark:text-gray-400">
                            <span className="font-mono text-purple-600 dark:text-purple-400">${gi + 1}:</span>{' '}
                            <span className="font-mono break-all">{g === undefined ? '(undefined)' : g || '(empty)'}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                    {m.groups && Object.keys(m.groups).length > 0 && (
                      <ol className="mt-1 pl-5 space-y-0.5 text-xs">
                        {Object.entries(m.groups).map(([k, v]) => (
                          <li key={k} className="text-gray-600 dark:text-gray-400">
                            <span className="font-mono text-emerald-600 dark:text-emerald-400">&lt;{k}&gt;:</span>{' '}
                            <span className="font-mono break-all">{v === undefined ? '(undefined)' : v}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default RegexTester;

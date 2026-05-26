'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Download, Eraser } from 'lucide-react';

const WORDS_PER_MIN_READ = 225;
const WORDS_PER_MIN_SPEAK = 130;

const LIMITS: { label: string; max: number; basis: 'chars' | 'words' }[] = [
  { label: 'Twitter / X post', max: 280, basis: 'chars' },
  { label: 'SMS message', max: 160, basis: 'chars' },
  { label: 'Meta description', max: 160, basis: 'chars' },
  { label: 'Title tag', max: 60, basis: 'chars' },
];

function computeStats(text: string) {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s+/g, '').length;
  const trimmed = text.trim();
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  const lines = text === '' ? 0 : text.split('\n').length;
  const paragraphs =
    trimmed === '' ? 0 : trimmed.split(/\n{2,}/).filter(p => p.trim().length > 0).length;
  const sentenceMatches = trimmed.match(/[^.!?]+[.!?]+/g);
  let sentences = sentenceMatches ? sentenceMatches.length : 0;
  if (words > 0 && sentences === 0) sentences = 1;
  return {
    characters,
    charactersNoSpaces,
    words,
    lines,
    paragraphs,
    sentences,
    readingMinutes: words / WORDS_PER_MIN_READ,
    speakingMinutes: words / WORDS_PER_MIN_SPEAK,
  };
}

function formatDuration(minutes: number): string {
  if (minutes < 1 / 60) return '0s';
  const totalSeconds = Math.round(minutes * 60);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

const WordCounter: React.FC<ToolProps> = ({ details, toolId, tool }) => {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 300);
  const toast = useToast();

  const stats = useMemo(() => computeStats(debouncedInput), [debouncedInput]);

  const handleFile = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        setInput(text);
        toast.success(`Loaded ${file.name}`);
      } catch {
        toast.error('Could not read file');
      }
    },
    [toast]
  );

  const handleCopy = useCallback(async () => {
    if (!input) return;
    try {
      await navigator.clipboard.writeText(input);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Copy failed');
    }
  }, [input, toast]);

  const handleDownload = useCallback(() => {
    if (!input) return;
    const blob = new Blob([input], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [input]);

  const handleClear = useCallback(() => setInput(''), []);

  return (
    <ToolContainer title={tool?.name || 'Word Counter'} details={details} toolId={toolId}>
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFile}
          accept=".txt,.md,text/plain"
          maxSizeMB={20}
          title="Drop a text file here"
          description="or paste / type below — Ctrl/Cmd+V also works"
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-2 flex flex-col">
            <div className="flex items-center justify-between">
              <Label htmlFor="word-input">Text input</Label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!input}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Copy text"
                  title="Copy text"
                >
                  <Copy size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!input}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Download .txt"
                  title="Download .txt"
                >
                  <Download size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={!input}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Clear text"
                  title="Clear text"
                >
                  <Eraser size={16} />
                </button>
              </div>
            </div>
            <TextArea
              id="word-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter text here, paste, or drop a file above..."
              className="min-h-[420px] flex-1"
            />
          </div>

          <div className="space-y-4" aria-live="polite">
            <Label>Statistics</Label>
            <Card className="p-6 text-center bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800">
              <div className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-1">
                {stats.words.toLocaleString()}
              </div>
              <div className="text-xs uppercase tracking-wide font-bold text-blue-400/80 dark:text-blue-300/80">
                Words
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Characters" value={stats.characters} />
              <StatCard label="No spaces" value={stats.charactersNoSpaces} />
              <StatCard label="Sentences" value={stats.sentences} />
              <StatCard label="Paragraphs" value={stats.paragraphs} />
              <StatCard label="Lines" value={stats.lines} />
              <StatCard
                label="Reading"
                value={formatDuration(stats.readingMinutes)}
                literal
              />
              <StatCard
                label="Speaking"
                value={formatDuration(stats.speakingMinutes)}
                literal
                wide
              />
            </div>
          </div>
        </div>

        <Card title="Length limits" className="p-4">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {LIMITS.map(l => {
              const current = l.basis === 'chars' ? stats.characters : stats.words;
              const pct = Math.min(100, Math.round((current / l.max) * 100));
              const over = current > l.max;
              return (
                <li
                  key={l.label}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900/40"
                >
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-gray-800 dark:text-gray-100">{l.label}</span>
                    <span
                      className={`tabular-nums text-xs ${
                        over
                          ? 'text-red-600 dark:text-red-400 font-semibold'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {current.toLocaleString()} / {l.max.toLocaleString()}
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${l.label}: ${pct}% of limit used`}
                  >
                    <div
                      className={`h-full transition-all ${
                        over ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </ToolContainer>
  );
};

function StatCard({
  label,
  value,
  literal = false,
  wide = false,
}: {
  label: string;
  value: number | string;
  literal?: boolean;
  wide?: boolean;
}) {
  const shown = literal ? String(value) : (value as number).toLocaleString();
  return (
    <Card className={`p-3 text-center ${wide ? 'col-span-2' : ''}`}>
      <div className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-0.5 tabular-nums">
        {shown}
      </div>
      <div className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</div>
    </Card>
  );
}

export default WordCounter;

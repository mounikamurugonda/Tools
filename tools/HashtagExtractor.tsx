'use client';

import React, { useCallback, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Download, Eraser, Hash, AtSign } from 'lucide-react';

type Mode = 'hashtags' | 'mentions';

const PATTERNS: Record<Mode, RegExp> = {
  hashtags: /#[\p{L}\p{N}_]+/gu,
  mentions: /@[\p{L}\p{N}_.]+/gu,
};

const HashtagExtractor: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState(
    'Loving the new #coding tools by @utiltoolkits! #developer #react #nextjs #react'
  );
  const [mode, setMode] = useState<Mode>('hashtags');
  const [stripSymbol, setStripSymbol] = useState(false);
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const toast = useToast();

  const { ranked, totalMatches } = useMemo(() => {
    const matches = text.match(PATTERNS[mode]) ?? [];
    const counts = new Map<string, { display: string; count: number }>();
    for (const raw of matches) {
      const key = caseInsensitive ? raw.toLowerCase() : raw;
      const existing = counts.get(key);
      if (existing) existing.count++;
      else counts.set(key, { display: raw, count: 1 });
    }
    const arr = Array.from(counts.values()).sort((a, b) => b.count - a.count);
    return { ranked: arr, totalMatches: matches.length };
  }, [text, mode, caseInsensitive]);

  const display = useCallback(
    (raw: string) => (stripSymbol ? raw.slice(1) : raw),
    [stripSymbol]
  );

  const joinedSpaces = useMemo(
    () => ranked.map(r => display(r.display)).join(' '),
    [display, ranked]
  );
  const joinedNewlines = useMemo(
    () => ranked.map(r => display(r.display)).join('\n'),
    [display, ranked]
  );
  const joinedCsv = useMemo(
    () => ranked.map(r => display(r.display)).join(', '),
    [display, ranked]
  );

  const handleFile = useCallback(
    async (file: File) => {
      try {
        const t = await file.text();
        setText(t);
        toast.success(`Loaded ${file.name}`);
      } catch {
        toast.error('Could not read file');
      }
    },
    [toast]
  );

  const copy = useCallback(
    async (value: string, label: string) => {
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        toast.success(`${label} copied`);
      } catch {
        toast.error('Copy failed');
      }
    },
    [toast]
  );

  const downloadCsv = useCallback(() => {
    const csv = ['tag,count', ...ranked.map(r => `"${display(r.display)}",${r.count}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mode}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [display, mode, ranked]);

  const Icon = mode === 'hashtags' ? Hash : AtSign;

  return (
    <ToolContainer title="Hashtag Extractor" details={details} toolId={toolId}>
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFile}
          accept=".txt,.md,.csv,text/plain"
          maxSizeMB={20}
          title="Drop a text file"
          description="or paste social-media content below"
        />

        <Card className="p-4 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-900">
              {(['hashtags', 'mentions'] as Mode[]).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg inline-flex items-center gap-1.5 ${
                    mode === m
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {m === 'hashtags' ? <Hash size={14} /> : <AtSign size={14} />}
                  {m}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={caseInsensitive}
                onChange={e => setCaseInsensitive(e.target.checked)}
              />
              Case-insensitive
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={stripSymbol}
                onChange={e => setStripSymbol(e.target.checked)}
              />
              Drop {mode === 'hashtags' ? '#' : '@'} symbol when copying
            </label>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="hashtag-input">Source text</Label>
            <button
              type="button"
              onClick={() => setText('')}
              disabled={!text}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
              aria-label="Clear"
              title="Clear"
            >
              <Eraser size={16} />
            </button>
          </div>
          <TextArea
            id="hashtag-input"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={`Paste text containing ${mode}...`}
            className="h-48"
          />
        </Card>

        <Card className="p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold text-gray-900 dark:text-white inline-flex items-center gap-2">
              <Icon size={18} className="text-blue-500" />
              {ranked.length.toLocaleString()} unique {mode}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                ({totalMatches.toLocaleString()} total mentions)
              </span>
            </h3>
            <div className="flex flex-wrap gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copy(joinedSpaces, 'Space-separated')}
                disabled={ranked.length === 0}
              >
                <Copy size={14} className="mr-1" /> Copy (space)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copy(joinedCsv, 'Comma-separated')}
                disabled={ranked.length === 0}
              >
                <Copy size={14} className="mr-1" /> Copy (csv)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copy(joinedNewlines, 'Newline-separated')}
                disabled={ranked.length === 0}
              >
                <Copy size={14} className="mr-1" /> Copy (lines)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={downloadCsv}
                disabled={ranked.length === 0}
              >
                <Download size={14} className="mr-1" /> CSV
              </Button>
            </div>
          </div>

          {ranked.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-live="polite">
              {ranked.map(({ display, count }) => (
                <li key={display}>
                  <button
                    type="button"
                    onClick={() => copy(display, display)}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm transition-colors inline-flex items-center gap-2"
                    title="Click to copy"
                  >
                    {display}
                    {count > 1 && (
                      <span className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 rounded-full px-1.5 py-0.5">
                        ×{count}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic text-center py-6">
              No {mode} found in the text yet.
            </p>
          )}
        </Card>
      </div>
    </ToolContainer>
  );
};

export default HashtagExtractor;

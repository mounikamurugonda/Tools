'use client';

import React, { useCallback, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowDown, Copy, Download, Eraser, Wand2 } from 'lucide-react';

type Separator = '-' | '_' | '.' | '/';

interface SlugOpts {
  separator: Separator;
  lowercase: boolean;
  removeDiacritics: boolean;
  removeStopWords: boolean;
  maxLength: number;
}

const DEFAULT_OPTS: SlugOpts = {
  separator: '-',
  lowercase: true,
  removeDiacritics: true,
  removeStopWords: false,
  maxLength: 0,
};

const STOP_WORDS = new Set([
  'a','an','and','as','at','be','but','by','for','if','in','is','it','of','on','or','so',
  'the','to','with',
]);

function slugify(raw: string, opts: SlugOpts): string {
  let s = raw;
  if (opts.removeDiacritics) {
    s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  s = s.replace(/[^\p{L}\p{N}\s_-]/gu, '');
  if (opts.lowercase) s = s.toLowerCase();
  let words = s.split(/[\s_\-]+/).filter(Boolean);
  if (opts.removeStopWords) {
    words = words.filter(w => !STOP_WORDS.has(w.toLowerCase()));
  }
  let out = words.join(opts.separator);
  const sepEscaped = opts.separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  out = out
    .replace(new RegExp(`${sepEscaped}+`, 'g'), opts.separator)
    .replace(new RegExp(`^${sepEscaped}+|${sepEscaped}+$`, 'g'), '');
  if (opts.maxLength && out.length > opts.maxLength) {
    out = out.slice(0, opts.maxLength).replace(new RegExp(`${sepEscaped}+$`), '');
  }
  return out;
}

const SlugGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [batch, setBatch] = useState('');
  const [tab, setTab] = useState<'single' | 'batch'>('single');
  const [opts, setOpts] = useState<SlugOpts>({ ...DEFAULT_OPTS });
  const toast = useToast();

  const slug = useMemo(() => slugify(input, opts), [input, opts]);
  const batchResults = useMemo(
    () =>
      batch
        .split('\n')
        .map(line => ({ in: line, out: line.trim() ? slugify(line, opts) : '' })),
    [batch, opts]
  );

  const handleFile = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        setBatch(text);
        setTab('batch');
        toast.success(`Loaded ${file.name}`);
      } catch {
        toast.error('Could not read file');
      }
    },
    [toast]
  );

  const copy = useCallback(
    async (value: string, label = 'Slug') => {
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

  const downloadBatch = useCallback(() => {
    const text = batchResults.map(r => r.out).join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slugs.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [batchResults]);

  return (
    <ToolContainer title="Slug Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Options" className="p-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label>Separator</Label>
              <div className="mt-2 inline-flex rounded-xl border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-900">
                {(['-', '_', '.', '/'] as Separator[]).map(s => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={opts.separator === s}
                    onClick={() => setOpts(o => ({ ...o, separator: s }))}
                    className={`w-9 py-1.5 text-sm font-mono rounded-lg ${
                      opts.separator === s
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="slug-maxlen">Max length (0 = no limit)</Label>
              <Input
                id="slug-maxlen"
                type="number"
                min={0}
                max={200}
                value={opts.maxLength}
                onChange={e =>
                  setOpts(o => ({ ...o, maxLength: Math.max(0, parseInt(e.target.value, 10) || 0) }))
                }
                className="mt-2"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={opts.lowercase}
                onChange={e => setOpts(o => ({ ...o, lowercase: e.target.checked }))}
              />
              Lowercase
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={opts.removeDiacritics}
                onChange={e => setOpts(o => ({ ...o, removeDiacritics: e.target.checked }))}
              />
              Remove diacritics (café → cafe)
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={opts.removeStopWords}
                onChange={e => setOpts(o => ({ ...o, removeStopWords: e.target.checked }))}
              />
              Drop English stop words (the, and, …)
            </label>
          </div>
        </Card>

        <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-900">
          <button
            type="button"
            onClick={() => setTab('single')}
            aria-pressed={tab === 'single'}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg ${
              tab === 'single'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Single
          </button>
          <button
            type="button"
            onClick={() => setTab('batch')}
            aria-pressed={tab === 'batch'}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg ${
              tab === 'batch'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Batch
          </button>
        </div>

        {tab === 'single' ? (
          <Card className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slug-input">String to slugify</Label>
              <Input
                id="slug-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Hello World! This is a Title."
                autoFocus
              />
            </div>

            <div className="flex justify-center text-gray-400">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug-output">Generated slug</Label>
              <div className="relative">
                <Input
                  id="slug-output"
                  readOnly
                  value={slug}
                  className="bg-gray-50 dark:bg-gray-900 font-mono text-blue-600 dark:text-blue-400 pr-12"
                  placeholder="hello-world-this-is-a-title"
                  aria-live="polite"
                />
                {slug && (
                  <button
                    type="button"
                    onClick={() => copy(slug)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 p-2 rounded-md text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Copy slug"
                    title="Copy slug"
                  >
                    <Copy size={16} />
                  </button>
                )}
              </div>
            </div>
          </Card>
        ) : (
          <Card className="space-y-4">
            <FileUpload
              onFileSelect={handleFile}
              accept=".txt,.csv,text/plain"
              maxSizeMB={5}
              title="Drop a .txt or .csv file"
              description="one title per line, or paste below"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="slug-batch-in">Titles (one per line)</Label>
                  <button
                    type="button"
                    onClick={() => setBatch('')}
                    disabled={!batch}
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                    aria-label="Clear"
                    title="Clear"
                  >
                    <Eraser size={16} />
                  </button>
                </div>
                <TextArea
                  id="slug-batch-in"
                  value={batch}
                  onChange={e => setBatch(e.target.value)}
                  placeholder={'First post title\nSecond title — édition\nThird & final!'}
                  className="h-80 font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="slug-batch-out">Slugs</Label>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copy(batchResults.map(r => r.out).join('\n'), 'Slugs')}
                      disabled={batchResults.every(r => !r.out)}
                    >
                      <Copy size={14} className="mr-1" /> Copy all
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={downloadBatch}
                      disabled={batchResults.every(r => !r.out)}
                    >
                      <Download size={14} className="mr-1" /> Download
                    </Button>
                  </div>
                </div>
                <TextArea
                  id="slug-batch-out"
                  readOnly
                  value={batchResults.map(r => r.out).join('\n')}
                  className="h-80 font-mono text-sm bg-gray-50 dark:bg-gray-900/40 text-blue-600 dark:text-blue-400"
                  aria-live="polite"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <Wand2 size={12} />
              {batchResults.filter(r => r.out).length.toLocaleString()} slug(s) generated.
            </p>
          </Card>
        )}
      </div>
    </ToolContainer>
  );
};

export default SlugGenerator;

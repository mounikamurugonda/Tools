'use client';

import React, { useCallback, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { createInlineWorker } from '@/lib/worker-runner';
import {
  AlignJustify,
  ArrowDownAZ,
  Copy,
  Download,
  Eraser,
  FileText,
  Sparkles,
  Type,
} from 'lucide-react';

type OptKey =
  | 'collapseSpaces'
  | 'trim'
  | 'removeBlankLines'
  | 'removeLineBreaks'
  | 'stripHtml'
  | 'removeDuplicates'
  | 'sortLines'
  | 'normalizeQuotes'
  | 'removeDiacritics'
  | 'removeEmoji'
  | 'removePunctuation';

interface OptionMeta {
  id: OptKey;
  label: string;
  desc: string;
}

const OPTIONS: OptionMeta[] = [
  { id: 'collapseSpaces', label: 'Collapse spaces', desc: 'Multiple spaces/tabs → single space' },
  { id: 'trim', label: 'Trim line edges', desc: 'Strip whitespace at start/end of each line' },
  { id: 'removeBlankLines', label: 'Remove blank lines', desc: 'Drop empty/whitespace-only lines' },
  { id: 'removeLineBreaks', label: 'Remove line breaks', desc: 'Join everything onto one line' },
  { id: 'stripHtml', label: 'Strip HTML', desc: 'Remove <tags> and decode entities' },
  { id: 'removeDuplicates', label: 'Remove duplicate lines', desc: 'Keep first occurrence only' },
  { id: 'sortLines', label: 'Sort lines (A→Z)', desc: 'Alphabetical, case-insensitive' },
  { id: 'normalizeQuotes', label: 'Smart quotes → ASCII', desc: '“ ” ‘ ’ — … → " \' - ...' },
  { id: 'removeDiacritics', label: 'Remove diacritics', desc: 'café → cafe' },
  { id: 'removeEmoji', label: 'Remove emoji', desc: 'Strip emoji + pictographs' },
  { id: 'removePunctuation', label: 'Remove punctuation', desc: 'Keep letters/numbers/spaces only' },
];

const DEFAULT_OPTS: Record<OptKey, boolean> = {
  collapseSpaces: true,
  trim: true,
  removeBlankLines: false,
  removeLineBreaks: false,
  stripHtml: false,
  removeDuplicates: false,
  sortLines: false,
  normalizeQuotes: false,
  removeDiacritics: false,
  removeEmoji: false,
  removePunctuation: false,
};

// The cleaner runs in a Web Worker for big inputs. It MUST be self-contained.
function cleanText(input: { text: string; opts: Record<string, boolean> }): string {
  let s = input.text;
  const o = input.opts;
  if (o.stripHtml) {
    s = s
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }
  if (o.normalizeQuotes) {
    s = s
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[–—]/g, '-')
      .replace(/…/g, '...')
      .replace(/ /g, ' ');
  }
  if (o.removeDiacritics) {
    s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  if (o.removeEmoji) {
    // Strip extended pictographic + variation selectors. Property escapes require ES2018+.
    s = s.replace(/[\p{Extended_Pictographic}️‍]/gu, '');
  }
  if (o.removePunctuation) {
    s = s.replace(/[^\p{L}\p{N}\s]/gu, '');
  }
  if (o.removeLineBreaks) {
    s = s.replace(/\r?\n|\r/g, ' ');
  }
  if (o.collapseSpaces) {
    s = s.replace(/[ \t]+/g, ' ');
  }
  if (o.trim) {
    s = s
      .split('\n')
      .map(l => l.trim())
      .join('\n');
  }
  if (o.removeBlankLines) {
    s = s
      .split('\n')
      .filter(l => l.trim().length > 0)
      .join('\n');
  }
  if (o.removeDuplicates) {
    const seen = new Set<string>();
    s = s
      .split('\n')
      .filter(l => {
        const key = l.trim().toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .join('\n');
  }
  if (o.sortLines) {
    s = s
      .split('\n')
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
      .join('\n');
  }
  return s;
}

const WORKER_THRESHOLD = 500_000; // ~500KB → run off main thread

const TextCleaner: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [opts, setOpts] = useState<Record<OptKey, boolean>>({ ...DEFAULT_OPTS });
  const [isWorking, setIsWorking] = useState(false);
  const toast = useToast();

  const toggle = (id: OptKey) => setOpts(prev => ({ ...prev, [id]: !prev[id] }));

  const handleClean = useCallback(async () => {
    if (!text) return;
    setIsWorking(true);
    try {
      if (text.length > WORKER_THRESHOLD && typeof Worker !== 'undefined') {
        const run = createInlineWorker<{ text: string; opts: Record<string, boolean> }, string>(
          cleanText
        );
        const result = await run({ text, opts });
        run.terminate();
        setOutput(result);
      } else {
        setOutput(cleanText({ text, opts }));
      }
      toast.success('Cleaned');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Clean failed');
    } finally {
      setIsWorking(false);
    }
  }, [opts, text, toast]);

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

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      toast.success('Cleaned text copied');
    } catch {
      toast.error('Copy failed');
    }
  }, [output, toast]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleaned.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output]);

  const handleApplyToInput = useCallback(() => {
    if (!output) return;
    setText(output);
    setOutput('');
  }, [output]);

  const stats = useMemo(() => {
    const before = text.length;
    const after = output.length;
    const delta = before - after;
    return { before, after, delta };
  }, [output.length, text.length]);

  return (
    <ToolContainer title="Text Cleaner" details={details} toolId={toolId}>
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFile}
          accept=".txt,.md,.html,.csv,text/plain"
          maxSizeMB={50}
          title="Drop a file"
          description="or paste your text below (large files run off the main thread)"
        />

        <Card title="Cleaning options" className="p-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {OPTIONS.map(o => (
              <label
                key={o.id}
                className={`flex items-start gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                  opts[o.id]
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={opts[o.id]}
                  onChange={() => toggle(o.id)}
                  className="mt-0.5"
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {o.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{o.desc}</div>
                </div>
              </label>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <Button onClick={handleClean} disabled={!text || isWorking}>
              <Sparkles className="w-4 h-4 mr-2" />
              {isWorking ? 'Cleaning…' : 'Clean text'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpts({ ...DEFAULT_OPTS })}
              disabled={isWorking}
            >
              Reset options
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleApplyToInput}
              disabled={!output || isWorking}
              title="Move cleaned text back to the input pane"
            >
              <ArrowDownAZ className="w-4 h-4 mr-2" /> Apply to input
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="cleaner-input">
                <span className="inline-flex items-center gap-2">
                  <FileText size={14} /> Input
                </span>
              </Label>
              <button
                type="button"
                onClick={() => setText('')}
                disabled={!text}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                aria-label="Clear input"
                title="Clear input"
              >
                <Eraser size={16} />
              </button>
            </div>
            <TextArea
              id="cleaner-input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste or type text here..."
              className="h-[420px]"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {stats.before.toLocaleString()} chars
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="cleaner-output">
                <span className="inline-flex items-center gap-2">
                  <AlignJustify size={14} /> Cleaned
                </span>
              </Label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!output}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                  aria-label="Copy"
                  title="Copy"
                >
                  <Copy size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!output}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                  aria-label="Download"
                  title="Download"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
            <TextArea
              id="cleaner-output"
              readOnly
              value={output}
              placeholder='Click "Clean text" to see the result here'
              className="h-[420px] bg-gray-50 dark:bg-gray-900/40"
              aria-live="polite"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <Type size={12} />
              {stats.after.toLocaleString()} chars
              {stats.delta > 0 && (
                <span className="text-green-600 dark:text-green-400 font-medium">
                  −{stats.delta.toLocaleString()} ({((stats.delta / stats.before) * 100).toFixed(1)}
                  %)
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default TextCleaner;

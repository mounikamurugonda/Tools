'use client';

import React, { useCallback, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Download, Eraser } from 'lucide-react';

type CaseMode =
  | 'uppercase'
  | 'lowercase'
  | 'sentence'
  | 'title'
  | 'alternating'
  | 'inverse'
  | 'camel'
  | 'snake'
  | 'kebab';

const MODES: { id: CaseMode; label: string }[] = [
  { id: 'uppercase', label: 'UPPER CASE' },
  { id: 'lowercase', label: 'lower case' },
  { id: 'sentence', label: 'Sentence case' },
  { id: 'title', label: 'Title Case' },
  { id: 'alternating', label: 'aLtErNaTiNg' },
  { id: 'inverse', label: 'InVeRsE' },
  { id: 'camel', label: 'camelCase' },
  { id: 'snake', label: 'snake_case' },
  { id: 'kebab', label: 'kebab-case' },
];

function toSentenceCase(str: string): string {
  return str.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
}
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}
function toAlternatingCase(str: string): string {
  let out = '';
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    out += i % 2 === 0 ? c.toLowerCase() : c.toUpperCase();
  }
  return out;
}
function toInverseCase(str: string): string {
  let out = '';
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    out += c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
  }
  return out;
}
function splitWords(str: string): string[] {
  return str
    .replace(/[_\-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/\s+/)
    .filter(Boolean);
}
function toCamel(str: string): string {
  const words = splitWords(str.toLowerCase());
  return words
    .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join('');
}
function toSnake(str: string): string {
  return splitWords(str).map(w => w.toLowerCase()).join('_');
}
function toKebab(str: string): string {
  return splitWords(str).map(w => w.toLowerCase()).join('-');
}

function convert(input: string, mode: CaseMode): string {
  switch (mode) {
    case 'uppercase':
      return input.toUpperCase();
    case 'lowercase':
      return input.toLowerCase();
    case 'sentence':
      return toSentenceCase(input);
    case 'title':
      return toTitleCase(input);
    case 'alternating':
      return toAlternatingCase(input);
    case 'inverse':
      return toInverseCase(input);
    case 'camel':
      return toCamel(input);
    case 'snake':
      return toSnake(input);
    case 'kebab':
      return toKebab(input);
  }
}

function stats(text: string): { chars: number; words: number; lines: number } {
  return {
    chars: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split(/\n/).length : 0,
  };
}

const CaseConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<CaseMode | null>(null);
  const toast = useToast();

  const handleConvert = useCallback(
    (next: CaseMode) => {
      setMode(next);
      setOutput(convert(input, next));
    },
    [input]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setInput(value);
      if (mode) setOutput(convert(value, mode));
    },
    [mode]
  );

  const handleFile = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        setInput(text);
        if (mode) setOutput(convert(text, mode));
        toast.success(`Loaded ${file.name}`);
      } catch {
        toast.error('Could not read file');
      }
    },
    [mode, toast]
  );

  const handleCopy = useCallback(
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

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-${mode ?? 'text'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [mode, output]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setMode(null);
  }, []);

  const inputStats = useMemo(() => stats(input), [input]);
  const outputStats = useMemo(() => stats(output), [output]);

  return (
    <ToolContainer title="Case Converter" details={details} toolId={toolId}>
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFile}
          accept=".txt,.md,.csv,text/plain"
          maxSizeMB={10}
          title="Drop a .txt or .md file here"
          description="or paste text below — Ctrl/Cmd+V also works"
        />

        <Card title="Choose a case" className="p-4">
          <div className="flex flex-wrap gap-2">
            {MODES.map(m => {
              const isActive = mode === m.id;
              return (
                <Button
                  key={m.id}
                  size="sm"
                  variant={isActive ? 'primary' : 'outline'}
                  onClick={() => handleConvert(m.id)}
                  aria-pressed={isActive}
                >
                  {m.label}
                </Button>
              );
            })}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="case-input">Input</Label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handleCopy(input, 'Input')}
                  disabled={!input}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Copy input"
                  title="Copy input"
                >
                  <Copy size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={!input && !output}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Clear all"
                  title="Clear all"
                >
                  <Eraser size={16} />
                </button>
              </div>
            </div>
            <TextArea
              id="case-input"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter text here, paste, or drop a file above..."
              className="h-96"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {inputStats.chars.toLocaleString()} chars · {inputStats.words.toLocaleString()} words
              · {inputStats.lines.toLocaleString()} lines
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="case-output">Output</Label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handleCopy(output, 'Output')}
                  disabled={!output}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Copy output"
                  title="Copy output"
                >
                  <Copy size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!output}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Download .txt"
                  title="Download .txt"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
            <TextArea
              id="case-output"
              readOnly
              value={output}
              placeholder={mode ? 'Output will appear here.' : 'Pick a case above to convert.'}
              className="h-96 bg-gray-50 dark:bg-gray-900/40"
              aria-live="polite"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {outputStats.chars.toLocaleString()} chars · {outputStats.words.toLocaleString()} words
              · {outputStats.lines.toLocaleString()} lines
            </p>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default CaseConverter;

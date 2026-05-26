'use client';

import React, { useCallback, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowRightLeft, Copy, Download, Eraser } from 'lucide-react';

type Mode = 'chars' | 'words' | 'lines' | 'wordOrder';

const MODES: { id: Mode; label: string; help: string }[] = [
  { id: 'chars', label: 'Characters', help: 'flip every character' },
  { id: 'words', label: 'Words', help: 'reverse letters in each word' },
  { id: 'lines', label: 'Lines', help: 'reverse the order of lines' },
  { id: 'wordOrder', label: 'Word order', help: 'last word becomes first' },
];

function reverse(input: string, mode: Mode): string {
  switch (mode) {
    case 'chars':
      // Surrogate-pair aware reverse so emojis don't break.
      return Array.from(input).reverse().join('');
    case 'words':
      return input.replace(/\S+/g, w => Array.from(w).reverse().join(''));
    case 'lines':
      return input.split('\n').reverse().join('\n');
    case 'wordOrder':
      return input
        .split('\n')
        .map(line => line.split(/(\s+)/).reverse().join(''))
        .join('\n');
  }
}

const TextReverser: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('chars');
  const toast = useToast();

  const output = useMemo(() => reverse(input, mode), [input, mode]);

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

  const download = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reversed-${mode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [mode, output]);

  return (
    <ToolContainer title="Text Reverser" details={details} toolId={toolId}>
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFile}
          accept=".txt,.md,text/plain"
          maxSizeMB={10}
          title="Drop a text file"
          description="or paste / type below"
        />

        <Card title="Reverse mode" className="p-4">
          <div className="flex flex-wrap gap-2">
            {MODES.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                aria-pressed={mode === m.id}
                title={m.help}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  mode === m.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            {MODES.find(m => m.id === mode)?.help}
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="reverse-input">Original</Label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => copy(input, 'Input')}
                  disabled={!input}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                  aria-label="Copy input"
                  title="Copy input"
                >
                  <Copy size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setInput('')}
                  disabled={!input}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                  aria-label="Clear"
                  title="Clear"
                >
                  <Eraser size={16} />
                </button>
              </div>
            </div>
            <TextArea
              id="reverse-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter text to reverse..."
              className="h-96"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="reverse-output">
                <span className="inline-flex items-center gap-2">
                  <ArrowRightLeft size={14} /> Reversed
                </span>
              </Label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => copy(output, 'Output')}
                  disabled={!output}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                  aria-label="Copy output"
                  title="Copy output"
                >
                  <Copy size={16} />
                </button>
                <button
                  type="button"
                  onClick={download}
                  disabled={!output}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                  aria-label="Download .txt"
                  title="Download .txt"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
            <TextArea
              id="reverse-output"
              readOnly
              value={output}
              placeholder="Reversed text will appear here..."
              className="h-96 bg-gray-50 dark:bg-gray-900/40"
              aria-live="polite"
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default TextReverser;

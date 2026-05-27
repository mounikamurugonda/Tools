'use client';

import React, { useCallback, useEffect, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowLeftRight } from 'lucide-react';

type Mode = 'text-to-binary' | 'binary-to-text';
type Base = 2 | 8 | 10 | 16;

const BASES: { value: Base; label: string; width: number }[] = [
  { value: 2, label: 'Binary', width: 8 },
  { value: 8, label: 'Octal', width: 3 },
  { value: 10, label: 'Decimal', width: 0 },
  { value: 16, label: 'Hex', width: 2 },
];

function textToCode(text: string, base: Base, width: number): string {
  // Use UTF-8 byte sequence so Unicode (emoji, accents) round-trips correctly.
  const bytes = new TextEncoder().encode(text);
  return Array.from(bytes)
    .map(b => {
      const s = b.toString(base);
      return width > 0 ? s.padStart(width, '0') : s;
    })
    .join(' ');
}

function codeToText(code: string, base: Base): string {
  const tokens = code.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return '';
  const bytes = new Uint8Array(tokens.length);
  for (let i = 0; i < tokens.length; i++) {
    const n = parseInt(tokens[i], base);
    if (!Number.isFinite(n) || n < 0 || n > 255) {
      throw new Error(`Invalid byte at position ${i + 1}: "${tokens[i]}"`);
    }
    bytes[i] = n;
  }
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}

const BinaryConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [mode, setMode] = useState<Mode>('text-to-binary');
  const [base, setBase] = useState<Base>(2);
  const [input, setInput] = useState('Hello 👋');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const width = BASES.find(b => b.value === base)!.width;

  useEffect(() => {
    if (!input) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      const result =
        mode === 'text-to-binary' ? textToCode(input, base, width) : codeToText(input, base);
      setOutput(result);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
      setOutput('');
    }
  }, [input, mode, base, width]);

  const swap = useCallback(() => {
    setMode(m => (m === 'text-to-binary' ? 'binary-to-text' : 'text-to-binary'));
    setInput(output);
    toast.info(`Switched to ${mode === 'text-to-binary' ? 'decode' : 'encode'}`);
  }, [mode, output, toast]);

  const actions = (
    <div className="flex flex-col gap-3 w-full lg:w-44">
      <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
        {(['text-to-binary', 'binary-to-text'] as Mode[]).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`px-2 py-1.5 text-[11px] rounded ${
              mode === m ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
            title={m === 'text-to-binary' ? 'Text → numeric bytes' : 'Numeric bytes → text'}
          >
            {m === 'text-to-binary' ? 'Encode' : 'Decode'}
          </button>
        ))}
      </div>
      <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center flex-wrap">
        {BASES.map(b => (
          <button
            key={b.value}
            type="button"
            onClick={() => setBase(b.value)}
            aria-pressed={base === b.value}
            className={`px-2 py-1 text-[10px] rounded font-mono uppercase ${
              base === b.value ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
            title={b.label}
          >
            {b.value === 2 ? 'BIN' : b.value === 8 ? 'OCT' : b.value === 10 ? 'DEC' : 'HEX'}
          </button>
        ))}
      </div>
      <Button onClick={swap} variant="outline" size="sm" disabled={!output}>
        <ArrowLeftRight className="w-4 h-4 mr-1.5" /> Swap
      </Button>
      {error && (
        <div role="alert" className="text-xs text-red-600 dark:text-red-400 text-center px-2 py-1.5 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
          {error}
        </div>
      )}
      <div className="text-[10px] text-center text-gray-500 dark:text-gray-400">
        UTF-8 bytes · space-separated
      </div>
    </div>
  );

  const inputLabel = mode === 'text-to-binary' ? 'Text' : BASES.find(b => b.value === base)!.label;
  const outputLabel = mode === 'text-to-binary' ? BASES.find(b => b.value === base)!.label : 'Text';

  return (
    <ConverterLayout
      title="Binary Converter"
      details={details}
      toolId={toolId}
      actions={actions}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'plaintext',
        label: inputLabel,
        fileUpload: true,
        acceptFileTypes: '.txt',
        placeholder:
          mode === 'text-to-binary'
            ? 'Type or paste text (Unicode-safe)...'
            : 'Paste space-separated byte values...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'plaintext',
        label: outputLabel,
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
    />
  );
};

export default BinaryConverter;

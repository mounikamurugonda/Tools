'use client';

import React, { useCallback, useEffect, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowLeftRight } from 'lucide-react';

type Mode = 'encode' | 'decode';

// Unicode-safe Base64 (handles emojis + non-ASCII via TextEncoder).
function encode(s: string, urlSafe: boolean): string {
  const bytes = new TextEncoder().encode(s);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  let b64 = btoa(binary);
  if (urlSafe) b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return b64;
}

function decode(s: string, urlSafe: boolean): string {
  let input = s.trim();
  if (urlSafe) {
    input = input.replace(/-/g, '+').replace(/_/g, '/');
    const padding = input.length % 4;
    if (padding) input += '='.repeat(4 - padding);
  }
  const binary = atob(input);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

const Base64Converter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
    try {
      setOutput(mode === 'encode' ? encode(input, urlSafe) : decode(input, urlSafe));
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid input');
      setOutput('');
    }
  }, [input, mode, urlSafe]);

  const swapPanes = useCallback(() => {
    setMode(m => (m === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    toast.info(`Switched to ${mode === 'encode' ? 'decode' : 'encode'}`);
  }, [mode, output, toast]);

  const actionSection = (
    <div className="flex flex-col gap-3 w-full lg:w-44">
      <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
        {(['encode', 'decode'] as Mode[]).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`px-3 py-1.5 text-xs rounded ${
              mode === m ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 self-center">
        <input
          type="checkbox"
          checked={urlSafe}
          onChange={e => setUrlSafe(e.target.checked)}
        />
        URL-safe (base64url)
      </label>
      <Button onClick={swapPanes} variant="outline" size="sm" disabled={!output}>
        <ArrowLeftRight className="w-4 h-4 mr-1.5" /> Swap
      </Button>
      {error && (
        <div
          role="alert"
          className="text-xs text-red-600 dark:text-red-400 text-center px-2 py-1.5 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50"
        >
          {error}
        </div>
      )}
    </div>
  );

  return (
    <ConverterLayout
      title="Base64 Converter"
      details={details}
      toolId={toolId}
      actions={actionSection}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'plaintext',
        label: mode === 'encode' ? 'Plain text' : 'Base64',
        fileUpload: true,
        acceptFileTypes: '.txt',
        placeholder:
          mode === 'encode'
            ? 'Type or paste text (Unicode-safe — emojis welcome)...'
            : 'Paste a Base64 string...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'plaintext',
        label: mode === 'encode' ? 'Base64' : 'Plain text',
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
    />
  );
};

export default Base64Converter;

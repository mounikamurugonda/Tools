'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowLeftRight, Download } from 'lucide-react';

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
  // Tolerate a data-URI prefix like "data:image/png;base64,...." by stripping it.
  let input = s.trim().replace(/^data:[^,]*,/, '');
  if (urlSafe || /[-_]/.test(input)) {
    input = input.replace(/-/g, '+').replace(/_/g, '/');
  }
  const padding = input.length % 4;
  if (padding) input += '='.repeat(4 - padding);
  const binary = atob(input);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

function byteLength(s: string): number {
  return new TextEncoder().encode(s).length;
}

const Base64Converter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [urlSafe, setUrlSafe] = useState(false);
  const [dataUri, setDataUri] = useState(false);
  const [mime, setMime] = useState('text/plain');
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

  // Optional data-URI wrapping is a display/export concern, not part of the core conversion.
  const displayOutput = useMemo(() => {
    if (mode === 'encode' && dataUri && output) {
      return `data:${mime || 'application/octet-stream'};base64,${output}`;
    }
    return output;
  }, [mode, dataUri, output, mime]);

  const stats = useMemo(() => {
    if (!input || !output) return '';
    const inB = byteLength(input);
    const outB = byteLength(displayOutput);
    const pct = inB ? Math.round(((outB - inB) / inB) * 100) : 0;
    return `${inB} → ${outB} bytes (${pct >= 0 ? '+' : ''}${pct}%)`;
  }, [input, output, displayOutput]);

  const swapPanes = useCallback(() => {
    setMode(m => (m === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    toast.info(`Switched to ${mode === 'encode' ? 'decode' : 'encode'}`);
  }, [mode, output, toast]);

  const download = useCallback(() => {
    if (!displayOutput) return;
    const blob = new Blob([displayOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `base64-${mode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [displayOutput, mode]);

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
      {mode === 'encode' && (
        <>
          <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 self-center">
            <input
              type="checkbox"
              checked={dataUri}
              onChange={e => setDataUri(e.target.checked)}
            />
            Wrap as data URI
          </label>
          {dataUri && (
            <input
              type="text"
              value={mime}
              onChange={e => setMime(e.target.value)}
              placeholder="mime type"
              aria-label="MIME type for data URI"
              className="text-[11px] font-mono px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
            />
          )}
        </>
      )}
      <Button onClick={swapPanes} variant="outline" size="sm" disabled={!output}>
        <ArrowLeftRight className="w-4 h-4 mr-1.5" /> Swap
      </Button>
      <Button onClick={download} variant="outline" size="sm" disabled={!displayOutput}>
        <Download className="w-4 h-4 mr-1.5" /> Download
      </Button>
      {stats && (
        <div className="text-[10px] text-center text-gray-500 dark:text-gray-400 tabular-nums">
          {stats}
        </div>
      )}
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
            : 'Paste a Base64 string (data: URIs are accepted)...',
        clearable: true,
      }}
      editorOutput={{
        value: displayOutput,
        language: 'plaintext',
        label: mode === 'encode' ? 'Base64' : 'Plain text',
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
    />
  );
};

export default Base64Converter;

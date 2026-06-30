'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowLeftRight, Download } from 'lucide-react';

type Mode = 'encode' | 'decode';
type Scope = 'component' | 'uri';

const UrlEncoder: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [scope, setScope] = useState<Scope>('component');
  const [plusAsSpace, setPlusAsSpace] = useState(false);
  const [perLine, setPerLine] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
    const convertOne = (value: string): string => {
      if (mode === 'encode') {
        const enc = scope === 'uri' ? encodeURI(value) : encodeURIComponent(value);
        return plusAsSpace ? enc.replace(/%20/g, '+') : enc;
      }
      const prepped = plusAsSpace ? value.replace(/\+/g, '%20') : value;
      return scope === 'uri' ? decodeURI(prepped) : decodeURIComponent(prepped);
    };
    try {
      // Per-line mode converts each line independently — handy for lists of
      // query-param values or URLs where a single bad token shouldn't fail the batch.
      setOutput(perLine ? input.split('\n').map(convertOne).join('\n') : convertOne(input));
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid input');
      setOutput('');
    }
  }, [input, mode, scope, plusAsSpace, perLine]);

  const stats = useMemo(() => {
    if (!input || !output) return '';
    return `${input.length} → ${output.length} chars`;
  }, [input, output]);

  const download = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `url-${mode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output, mode]);

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
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Scope</div>
        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900">
          <button
            type="button"
            onClick={() => setScope('component')}
            aria-pressed={scope === 'component'}
            className={`px-2 py-1 text-[11px] rounded ${
              scope === 'component'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300'
            }`}
            title="encodeURIComponent — escapes &=?#/ etc."
          >
            Component
          </button>
          <button
            type="button"
            onClick={() => setScope('uri')}
            aria-pressed={scope === 'uri'}
            className={`px-2 py-1 text-[11px] rounded ${
              scope === 'uri' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
            title="encodeURI — preserves reserved URI chars"
          >
            Full URI
          </button>
        </div>
      </div>
      <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 self-center">
        <input
          type="checkbox"
          checked={plusAsSpace}
          onChange={e => setPlusAsSpace(e.target.checked)}
        />
        + = space (form data)
      </label>
      <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 self-center">
        <input
          type="checkbox"
          checked={perLine}
          onChange={e => setPerLine(e.target.checked)}
        />
        Per-line (batch)
      </label>
      <Button onClick={swapPanes} variant="outline" size="sm" disabled={!output}>
        <ArrowLeftRight className="w-4 h-4 mr-1.5" /> Swap
      </Button>
      <Button onClick={download} variant="outline" size="sm" disabled={!output}>
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
      title="URL Encoder / Decoder"
      details={details}
      toolId={toolId}
      actions={actionSection}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'plaintext',
        label: mode === 'encode' ? 'Raw value' : 'Encoded URL',
        fileUpload: true,
        acceptFileTypes: '.txt',
        placeholder:
          mode === 'encode'
            ? 'Enter the string or URL to encode...'
            : 'Enter the encoded string to decode...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'plaintext',
        label: mode === 'encode' ? 'Encoded' : 'Decoded',
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
    />
  );
};

export default UrlEncoder;

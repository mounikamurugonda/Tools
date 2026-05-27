'use client';

import React, { useCallback, useEffect, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowLeftRight } from 'lucide-react';

type Mode = 'escape' | 'unescape';
type Flavor = 'json' | 'js' | 'html' | 'url' | 'xml' | 'csv' | 'regex';

const FLAVORS: { id: Flavor; label: string }[] = [
  { id: 'json', label: 'JSON' },
  { id: 'js', label: 'JS' },
  { id: 'html', label: 'HTML' },
  { id: 'xml', label: 'XML' },
  { id: 'url', label: 'URL' },
  { id: 'csv', label: 'CSV' },
  { id: 'regex', label: 'Regex' },
];

function escapeStr(value: string, flavor: Flavor): string {
  switch (flavor) {
    case 'json':
      return JSON.stringify(value).slice(1, -1);
    case 'js':
      // Same as JSON but allow single-quoted output (no surrounding quotes).
      return JSON.stringify(value).slice(1, -1).replace(/\\"/g, '"');
    case 'html':
      return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    case 'xml':
      return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    case 'url':
      return encodeURIComponent(value);
    case 'csv':
      // RFC 4180: wrap in quotes if contains , " or newline; double internal quotes.
      if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
      return value;
    case 'regex':
      return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

function unescapeStr(value: string, flavor: Flavor): string {
  switch (flavor) {
    case 'json':
    case 'js': {
      // Parse as a JSON string by surrounding with quotes.
      return JSON.parse(`"${value.replace(/\\?"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r')}"`);
    }
    case 'html':
    case 'xml': {
      const entities: Record<string, string> = {
        amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'", '#x27': "'",
      };
      return value.replace(/&(#x?[0-9a-fA-F]+|\w+);/g, (m, name: string) => {
        if (name.startsWith('#x') || name.startsWith('#X'))
          return String.fromCodePoint(parseInt(name.slice(2), 16));
        if (name.startsWith('#')) return String.fromCodePoint(parseInt(name.slice(1), 10));
        return entities[name] ?? m;
      });
    }
    case 'url':
      return decodeURIComponent(value);
    case 'csv': {
      const trimmed = value.trim();
      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        return trimmed.slice(1, -1).replace(/""/g, '"');
      }
      return value;
    }
    case 'regex':
      return value.replace(/\\([.*+?^${}()|[\]\\])/g, '$1');
  }
}

const SAMPLE = `Hello "World" & <Friends>\nLine 2 with 'quotes'`;

const StringEscaper: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('escape');
  const [flavor, setFlavor] = useState<Flavor>('json');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (!input) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      setOutput(mode === 'escape' ? escapeStr(input, flavor) : unescapeStr(input, flavor));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
      setOutput('');
    }
  }, [input, mode, flavor]);

  const swap = useCallback(() => {
    setMode(m => (m === 'escape' ? 'unescape' : 'escape'));
    setInput(output);
    toast.info(`Switched to ${mode === 'escape' ? 'unescape' : 'escape'}`);
  }, [mode, output, toast]);

  const actions = (
    <div className="flex flex-col gap-3 w-full lg:w-44">
      <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
        {(['escape', 'unescape'] as Mode[]).map(m => (
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
      <div className="inline-flex flex-wrap rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center gap-0.5">
        {FLAVORS.map(f => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFlavor(f.id)}
            aria-pressed={flavor === f.id}
            className={`px-2 py-1 text-[10px] rounded font-mono uppercase ${
              flavor === f.id ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {f.label}
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
    </div>
  );

  const flavorLabel = FLAVORS.find(f => f.id === flavor)!.label;

  return (
    <ConverterLayout
      title="String Escaper"
      details={details}
      toolId={toolId}
      actions={actions}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'plaintext',
        label: mode === 'escape' ? 'Raw String' : `Escaped ${flavorLabel}`,
        fileUpload: true,
        acceptFileTypes: '.txt',
        placeholder: mode === 'escape' ? 'Paste a raw string...' : `Paste an escaped ${flavorLabel} string...`,
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'plaintext',
        label: mode === 'escape' ? `Escaped ${flavorLabel}` : 'Raw String',
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
    />
  );
};

export default StringEscaper;

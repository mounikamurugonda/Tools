'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowDownToLine, Braces, Minimize2, SortAsc } from 'lucide-react';

type Mode = 'pretty' | 'minify';
type Indent = 2 | 4 | '\t';

interface FormatError {
  message: string;
  line?: number;
  column?: number;
}

function locateError(input: string, position: number): { line: number; column: number } {
  let line = 1;
  let col = 1;
  for (let i = 0; i < position && i < input.length; i++) {
    if (input[i] === '\n') {
      line++;
      col = 1;
    } else {
      col++;
    }
  }
  return { line, column: col };
}

function sortKeysDeep(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(sortKeysDeep);
  if (v && typeof v === 'object') {
    return Object.keys(v as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, k) => {
        acc[k] = sortKeysDeep((v as Record<string, unknown>)[k]);
        return acc;
      }, {});
  }
  return v;
}

const JsonFormatter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('{"name":"John","age":30,"city":"New York"}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<FormatError | null>(null);
  const [mode, setMode] = useState<Mode>('pretty');
  const [indent, setIndent] = useState<Indent>(2);
  const [sortKeys, setSortKeys] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      let parsed = JSON.parse(input);
      if (sortKeys) parsed = sortKeysDeep(parsed);
      const formatted =
        mode === 'minify'
          ? JSON.stringify(parsed)
          : JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError(null);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      const posMatch = msg.match(/position (\d+)/);
      const loc = posMatch ? locateError(input, parseInt(posMatch[1], 10)) : undefined;
      setError({ message: msg, line: loc?.line, column: loc?.column });
    }
  }, [input, mode, indent, sortKeys]);

  const sizes = useMemo(() => {
    const bytes = (s: string) => new Blob([s]).size;
    const inB = bytes(input);
    const outB = bytes(output);
    return {
      inB,
      outB,
      delta: outB - inB,
      pct: inB > 0 ? ((outB - inB) / inB) * 100 : 0,
    };
  }, [input, output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'minify' ? 'min.json' : 'pretty.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded');
  }, [mode, output, toast]);

  const actionSection = (
    <div className="flex flex-col gap-3 w-full lg:w-44">
      <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
        {(['pretty', 'minify'] as Mode[]).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`px-3 py-1.5 text-xs rounded inline-flex items-center gap-1 ${
              mode === m ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {m === 'pretty' ? <Braces size={12} /> : <Minimize2 size={12} />}
            {m}
          </button>
        ))}
      </div>
      {mode === 'pretty' && (
        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
          {([2, 4, '\t'] as Indent[]).map(v => (
            <button
              key={String(v)}
              type="button"
              onClick={() => setIndent(v)}
              aria-pressed={indent === v}
              className={`w-9 py-1 text-xs rounded font-mono ${
                indent === v ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              title={`Indent: ${v === '\t' ? 'tab' : `${v} spaces`}`}
            >
              {v === '\t' ? '⇥' : v}
            </button>
          ))}
        </div>
      )}
      <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 self-center">
        <input
          type="checkbox"
          checked={sortKeys}
          onChange={e => setSortKeys(e.target.checked)}
        />
        <SortAsc size={12} /> Sort keys
      </label>
      <Button
        size="sm"
        variant="outline"
        onClick={handleDownload}
        disabled={!output}
        className="self-center"
      >
        <ArrowDownToLine size={14} className="mr-1" /> Save .json
      </Button>
      {error ? (
        <div
          role="alert"
          className="text-xs text-red-600 dark:text-red-400 text-center px-2 py-1.5 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50"
        >
          <div className="font-semibold mb-0.5">Invalid JSON</div>
          <div className="opacity-80">
            {error.line ? `line ${error.line}, col ${error.column}` : error.message}
          </div>
        </div>
      ) : (
        output && (
          <div className="text-[10px] text-center text-gray-500 dark:text-gray-400 tabular-nums">
            {sizes.inB.toLocaleString()} B → {sizes.outB.toLocaleString()} B
            {sizes.delta !== 0 && (
              <span className={sizes.delta < 0 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}>
                {' '}
                ({sizes.delta > 0 ? '+' : ''}
                {sizes.pct.toFixed(1)}%)
              </span>
            )}
          </div>
        )
      )}
    </div>
  );

  return (
    <ConverterLayout
      title="JSON Formatter"
      details={details}
      toolId={toolId}
      actions={actionSection}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'json',
        label: 'JSON input',
        fileUpload: true,
        acceptFileTypes: '.json,.txt',
        placeholder: 'Paste JSON here...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'json',
        label: mode === 'minify' ? 'Minified JSON' : 'Formatted JSON',
        readOnly: true,
        placeholder: error ? `Fix error above to see formatted JSON` : 'Formatted JSON will appear here...',
      }}
    />
  );
};

export default JsonFormatter;

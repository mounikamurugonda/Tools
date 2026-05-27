'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowDownToLine, ArrowLeftRight } from 'lucide-react';

type Mode = 'json-to-csv' | 'csv-to-json';
type Sep = ',' | ';' | '\t' | '|';
type OutShape = 'objects' | 'arrays';

const SEP_LABELS: { value: Sep; label: string }[] = [
  { value: ',', label: ',' },
  { value: ';', label: ';' },
  { value: '\t', label: '⇥' },
  { value: '|', label: '|' },
];

function escapeCell(value: unknown, sep: string): string {
  const s = value === null || value === undefined ? '' : String(value);
  if (s.includes(sep) || s.includes('"') || /[\r\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function jsonToCsv(input: string, sep: string, includeHeaders: boolean): string {
  const data = JSON.parse(input);
  if (!Array.isArray(data)) throw new Error('Top-level JSON must be an array.');
  if (data.length === 0) return '';

  // Collect union of keys from all objects so we don't lose columns when rows vary.
  const allKeys = new Set<string>();
  let allObjects = true;
  for (const row of data) {
    if (row === null || typeof row !== 'object' || Array.isArray(row)) {
      allObjects = false;
      break;
    }
    Object.keys(row).forEach(k => allKeys.add(k));
  }

  if (!allObjects) {
    // Array of primitives or arrays — write each as a row.
    return data
      .map(row => (Array.isArray(row) ? row.map(c => escapeCell(c, sep)).join(sep) : escapeCell(row, sep)))
      .join('\n');
  }

  const headers = Array.from(allKeys);
  const lines: string[] = [];
  if (includeHeaders) lines.push(headers.map(h => escapeCell(h, sep)).join(sep));
  for (const row of data) {
    lines.push(headers.map(h => escapeCell((row as Record<string, unknown>)[h], sep)).join(sep));
  }
  return lines.join('\n');
}

// RFC 4180 parser — handles quoted fields, embedded separators, embedded newlines, doubled quotes.
function parseCsv(input: string, sep: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (inQuotes) {
      if (ch === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === sep) {
      row.push(field);
      field = '';
      i++;
      continue;
    }
    if (ch === '\r') {
      // swallow standalone or part of \r\n
      i++;
      continue;
    }
    if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i++;
      continue;
    }
    field += ch;
    i++;
  }
  // Trailing field/row (no trailing newline)
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function coerce(value: string, parseNumbers: boolean, parseBooleans: boolean, parseNull: boolean): string | number | boolean | null {
  if (parseNull && value === '') return null;
  if (parseBooleans) {
    if (value === 'true') return true;
    if (value === 'false') return false;
  }
  if (parseNumbers && value !== '' && /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(value)) {
    return Number(value);
  }
  return value;
}

function csvToJson(
  input: string,
  sep: string,
  shape: OutShape,
  parseNumbers: boolean,
  parseBooleans: boolean
): unknown[] {
  const rows = parseCsv(input, sep);
  if (rows.length === 0) return [];
  if (shape === 'arrays') return rows.map(r => r.map(v => coerce(v, parseNumbers, parseBooleans, false)));
  const [headerRow, ...dataRows] = rows;
  return dataRows.map(r => {
    const obj: Record<string, unknown> = {};
    headerRow.forEach((h, i) => {
      obj[h] = coerce(r[i] ?? '', parseNumbers, parseBooleans, true);
    });
    return obj;
  });
}

const SAMPLE_JSON = `[
  { "name": "Alice, Smith", "age": 30, "city": "New York" },
  { "name": "Bob", "age": 25, "city": "Los Angeles" }
]`;

const JsonCsvConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [mode, setMode] = useState<Mode>('json-to-csv');
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sep, setSep] = useState<Sep>(',');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [outShape, setOutShape] = useState<OutShape>('objects');
  const [parseNumbers, setParseNumbers] = useState(true);
  const [parseBooleans, setParseBooleans] = useState(true);
  const [indent, setIndent] = useState<2 | 4>(2);
  const toast = useToast();

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      if (mode === 'json-to-csv') {
        setOutput(jsonToCsv(input, sep, includeHeaders));
      } else {
        const data = csvToJson(input, sep, outShape, parseNumbers, parseBooleans);
        setOutput(JSON.stringify(data, null, indent));
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
      setOutput('');
    }
  }, [input, mode, sep, includeHeaders, outShape, parseNumbers, parseBooleans, indent]);

  const stats = useMemo(() => {
    const inLines = input ? input.split('\n').length : 0;
    const outLines = output ? output.split('\n').length : 0;
    return { inLines, outLines };
  }, [input, output]);

  const swap = useCallback(() => {
    if (!output) return;
    const next: Mode = mode === 'json-to-csv' ? 'csv-to-json' : 'json-to-csv';
    setMode(next);
    setInput(output);
    toast.info(`Switched to ${next === 'json-to-csv' ? 'JSON → CSV' : 'CSV → JSON'}`);
  }, [mode, output, toast]);

  const download = useCallback(() => {
    if (!output) return;
    const isJson = mode === 'csv-to-json';
    const blob = new Blob([output], {
      type: isJson ? 'application/json;charset=utf-8' : 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isJson ? 'output.json' : 'output.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded');
  }, [output, mode, toast]);

  const actions = (
    <div className="flex flex-col gap-3 w-full lg:w-48">
      <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
        {(['json-to-csv', 'csv-to-json'] as Mode[]).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`px-2 py-1.5 text-[11px] rounded font-mono ${
              mode === m ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {m === 'json-to-csv' ? 'JSON→CSV' : 'CSV→JSON'}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <div className="text-[10px] uppercase tracking-wide text-gray-500 text-center">Separator</div>
        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 w-full justify-center">
          {SEP_LABELS.map(s => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSep(s.value)}
              aria-pressed={sep === s.value}
              className={`flex-1 py-1 text-xs rounded font-mono ${
                sep === s.value ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              title={s.value === '\t' ? 'Tab' : `Use "${s.value}"`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {mode === 'json-to-csv' && (
        <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 self-center">
          <input type="checkbox" checked={includeHeaders} onChange={e => setIncludeHeaders(e.target.checked)} />
          Header row
        </label>
      )}

      {mode === 'csv-to-json' && (
        <>
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
            {(['objects', 'arrays'] as OutShape[]).map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setOutShape(s)}
                aria-pressed={outShape === s}
                className={`px-2 py-1 text-[11px] rounded ${
                  outShape === s ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {s === 'objects' ? '[{…}]' : '[[…]]'}
              </button>
            ))}
          </div>
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
            {([2, 4] as const).map(v => (
              <button
                key={v}
                type="button"
                onClick={() => setIndent(v)}
                aria-pressed={indent === v}
                className={`w-9 py-1 text-xs rounded font-mono ${
                  indent === v ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 self-center">
            <input type="checkbox" checked={parseNumbers} onChange={e => setParseNumbers(e.target.checked)} />
            Parse numbers
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 self-center">
            <input type="checkbox" checked={parseBooleans} onChange={e => setParseBooleans(e.target.checked)} />
            Parse booleans
          </label>
        </>
      )}

      <Button onClick={swap} variant="outline" size="sm" disabled={!output}>
        <ArrowLeftRight className="w-4 h-4 mr-1.5" /> Swap
      </Button>
      <Button onClick={download} variant="outline" size="sm" disabled={!output}>
        <ArrowDownToLine className="w-4 h-4 mr-1" />
        Save .{mode === 'json-to-csv' ? 'csv' : 'json'}
      </Button>
      {error ? (
        <div role="alert" className="text-xs text-red-600 dark:text-red-400 text-center px-2 py-1.5 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
          <div className="font-semibold mb-0.5">Parse error</div>
          <div className="opacity-80 break-words">{error}</div>
        </div>
      ) : (
        output && (
          <div className="text-[10px] text-center text-gray-500 dark:text-gray-400 tabular-nums">
            {stats.inLines} → {stats.outLines} lines
          </div>
        )
      )}
    </div>
  );

  return (
    <ConverterLayout
      title="JSON ↔ CSV Converter"
      details={details}
      toolId={toolId}
      actions={actions}
      editorInput={{
        value: input,
        onChange: setInput,
        language: mode === 'json-to-csv' ? 'json' : 'plaintext',
        label: mode === 'json-to-csv' ? 'JSON Input' : 'CSV Input',
        fileUpload: true,
        acceptFileTypes: mode === 'json-to-csv' ? '.json,.txt' : '.csv,.tsv,.txt',
        placeholder: `Paste ${mode === 'json-to-csv' ? 'JSON' : 'CSV'} here...`,
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: mode === 'json-to-csv' ? 'plaintext' : 'json',
        label: mode === 'json-to-csv' ? 'CSV Output' : 'JSON Output',
        readOnly: true,
        placeholder: error ? 'Fix the input above' : 'Result will appear here...',
      }}
    />
  );
};

export default JsonCsvConverter;

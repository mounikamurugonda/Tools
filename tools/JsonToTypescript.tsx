'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowDownToLine, Braces, Type as TypeIcon } from 'lucide-react';

type Kind = 'interface' | 'type';
type Indent = 2 | 4 | '\t';

interface ConvertError {
  message: string;
  line?: number;
  column?: number;
}

function locateError(input: string, position: number): { line: number; column: number } {
  let line = 1;
  let col = 1;
  for (let i = 0; i < position && i < input.length; i++) {
    if (input[i] === '\n') { line++; col = 1; } else { col++; }
  }
  return { line, column: col };
}

const KEYWORDS = new Set([
  'break','case','catch','class','const','continue','debugger','default','delete','do','else','enum',
  'export','extends','false','finally','for','function','if','import','in','instanceof','new','null',
  'return','super','switch','this','throw','true','try','typeof','var','void','while','with','yield',
]);

function isSafeIdent(key: string): boolean {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) && !KEYWORDS.has(key);
}

function pascal(s: string): string {
  return s
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('') || 'Item';
}

function singularize(s: string): string {
  if (/ies$/i.test(s)) return s.replace(/ies$/i, 'y');
  if (/sses$/i.test(s)) return s.replace(/es$/i, '');
  if (/[^s]s$/i.test(s)) return s.replace(/s$/i, '');
  return s;
}

type Field = { key: string; type: string; optional: boolean };

interface Builder {
  decls: string[];
  used: Set<string>;
  kind: Kind;
  indent: string;
  exportKw: boolean;
  optionalNull: boolean;
}

function uniqueName(base: string, used: Set<string>): string {
  let name = base;
  let i = 2;
  while (used.has(name)) name = `${base}${i++}`;
  used.add(name);
  return name;
}

function unionUnique(types: string[]): string {
  const set = new Set(types);
  if (set.size === 0) return 'unknown';
  if (set.size === 1) return [...set][0];
  return [...set].join(' | ');
}

function getType(value: unknown, suggested: string, b: Builder): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) {
    if (value.length === 0) return 'unknown[]';
    const itemName = singularize(suggested);
    const itemTypes = value.map(v => getType(v, itemName, b));
    const union = unionUnique(itemTypes);
    return union.includes(' | ') ? `(${union})[]` : `${union}[]`;
  }
  if (typeof value === 'object') {
    return buildInterface(value as Record<string, unknown>, suggested, b);
  }
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  return 'unknown';
}

function buildInterface(obj: Record<string, unknown>, suggested: string, b: Builder): string {
  const name = uniqueName(pascal(suggested), b.used);
  const fields: Field[] = Object.entries(obj).map(([k, v]) => {
    const type = getType(v, k, b);
    return { key: k, type, optional: b.optionalNull && v === null };
  });

  const lines = fields.map(f => {
    const key = isSafeIdent(f.key) ? f.key : JSON.stringify(f.key);
    const opt = f.optional ? '?' : '';
    const type = f.optional ? f.type.replace(/\bnull\b/, '').trim() || 'unknown' : f.type;
    return `${b.indent}${key}${opt}: ${type};`;
  });

  const prefix = b.exportKw ? 'export ' : '';
  const decl = b.kind === 'interface'
    ? `${prefix}interface ${name} {\n${lines.join('\n')}\n}`
    : `${prefix}type ${name} = {\n${lines.join('\n')}\n};`;
  b.decls.push(decl);
  return name;
}

function convert(json: string, opts: { kind: Kind; indent: Indent; rootName: string; exportKw: boolean; optionalNull: boolean }): string {
  const parsed = JSON.parse(json);
  const b: Builder = {
    decls: [],
    used: new Set(),
    kind: opts.kind,
    indent: opts.indent === '\t' ? '\t' : ' '.repeat(opts.indent),
    exportKw: opts.exportKw,
    optionalNull: opts.optionalNull,
  };
  const rootBase = pascal(opts.rootName || 'Root');
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    buildInterface(parsed as Record<string, unknown>, rootBase, b);
  } else {
    const t = getType(parsed, rootBase, b);
    const prefix = b.exportKw ? 'export ' : '';
    b.decls.push(`${prefix}type ${uniqueName(rootBase, b.used)} = ${t};`);
  }
  return b.decls.reverse().join('\n\n');
}

const SAMPLE = `{
  "id": 1,
  "name": "UtilToolkits",
  "active": true,
  "tags": ["fast", "free"],
  "owner": { "email": "team@example.com", "verified": null },
  "posts": [{ "title": "Hello", "views": 12 }]
}`;

const JsonToTypescript: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<ConvertError | null>(null);
  const [kind, setKind] = useState<Kind>('interface');
  const [indent, setIndent] = useState<Indent>(2);
  const [rootName, setRootName] = useState('Root');
  const [exportKw, setExportKw] = useState(true);
  const [optionalNull, setOptionalNull] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      const result = convert(input, { kind, indent, rootName, exportKw, optionalNull });
      setOutput(result);
      setError(null);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      const posMatch = msg.match(/position (\d+)/);
      const loc = posMatch ? locateError(input, parseInt(posMatch[1], 10)) : undefined;
      setError({ message: msg, line: loc?.line, column: loc?.column });
      setOutput('');
    }
  }, [input, kind, indent, rootName, exportKw, optionalNull]);

  const stats = useMemo(() => {
    const decls = (output.match(/^(export )?(interface|type) /gm) || []).length;
    const lines = output ? output.split('\n').length : 0;
    return { decls, lines };
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rootName.toLowerCase() || 'types'}.ts`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded');
  }, [output, rootName, toast]);

  const actions = (
    <div className="flex flex-col gap-3 w-full lg:w-48">
      <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
        {(['interface', 'type'] as Kind[]).map(k => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            aria-pressed={kind === k}
            className={`px-3 py-1.5 text-xs rounded inline-flex items-center gap-1 ${
              kind === k ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {k === 'interface' ? <Braces size={12} /> : <TypeIcon size={12} />}
            {k}
          </button>
        ))}
      </div>
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
      <div className="w-full">
        <Input
          value={rootName}
          onChange={e => setRootName(e.target.value)}
          placeholder="Root name"
          aria-label="Root type name"
          className="text-xs"
        />
      </div>
      <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 self-center">
        <input type="checkbox" checked={exportKw} onChange={e => setExportKw(e.target.checked)} />
        export
      </label>
      <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 self-center" title="Treat null values as optional (key?: T) instead of (key: T | null)">
        <input type="checkbox" checked={optionalNull} onChange={e => setOptionalNull(e.target.checked)} />
        null → optional
      </label>
      <Button size="sm" variant="outline" onClick={handleDownload} disabled={!output} className="self-center">
        <ArrowDownToLine size={14} className="mr-1" /> Save .ts
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
            {stats.decls} {stats.decls === 1 ? 'type' : 'types'} · {stats.lines} lines
          </div>
        )
      )}
    </div>
  );

  return (
    <ConverterLayout
      title="JSON to TypeScript"
      details={details}
      toolId={toolId}
      actions={actions}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'json',
        label: 'JSON Input',
        fileUpload: true,
        acceptFileTypes: '.json,.txt',
        placeholder: 'Paste JSON here...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'typescript',
        label: 'TypeScript Output',
        readOnly: true,
        placeholder: error ? 'Fix the JSON above to see types' : 'Types will appear here...',
      }}
    />
  );
};

export default JsonToTypescript;

'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowDownToLine, Minimize2, Sparkles } from 'lucide-react';
import { format } from 'sql-formatter';

type Mode = 'pretty' | 'minify';
type KeywordCase = 'upper' | 'lower' | 'preserve';
type Indent = 2 | 4 | '\t';

const DIALECTS: { value: string; label: string }[] = [
  { value: 'sql', label: 'Standard SQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'mariadb', label: 'MariaDB' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'transactsql', label: 'SQL Server (T-SQL)' },
  { value: 'plsql', label: 'Oracle PL/SQL' },
  { value: 'bigquery', label: 'BigQuery' },
  { value: 'snowflake', label: 'Snowflake' },
  { value: 'redshift', label: 'Redshift' },
  { value: 'spark', label: 'Spark SQL' },
  { value: 'hive', label: 'Hive' },
  { value: 'db2', label: 'DB2' },
  { value: 'tidb', label: 'TiDB' },
  { value: 'trino', label: 'Trino' },
];

function minifySql(sql: string): string {
  return sql
    .replace(/--[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([,;()])\s*/g, '$1')
    .trim();
}

const SAMPLE = `select u.id, u.name, count(o.id) as orders
from users u left join orders o on o.user_id = u.id
where u.created_at > '2024-01-01' group by u.id, u.name
order by orders desc limit 10;`;

const SqlFormatter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('pretty');
  const [dialect, setDialect] = useState('sql');
  const [keywordCase, setKeywordCase] = useState<KeywordCase>('upper');
  const [indent, setIndent] = useState<Indent>(2);
  const toast = useToast();

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      if (mode === 'minify') {
        setOutput(minifySql(input));
        setError(null);
        return;
      }
      const formatted = format(input, {
        language: dialect as any,
        tabWidth: indent === '\t' ? 2 : indent,
        useTabs: indent === '\t',
        keywordCase,
        linesBetweenQueries: 2,
      });
      setOutput(formatted);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid SQL');
    }
  }, [input, mode, dialect, keywordCase, indent]);

  const stats = useMemo(() => {
    const inB = new Blob([input]).size;
    const outB = new Blob([output]).size;
    return { inB, outB, delta: outB - inB, pct: inB > 0 ? ((outB - inB) / inB) * 100 : 0 };
  }, [input, output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/sql;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'minify' ? 'min.sql' : 'pretty.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded');
  }, [output, mode, toast]);

  const actions = (
    <div className="flex flex-col gap-3 w-full lg:w-48">
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
            {m === 'pretty' ? <Sparkles size={12} /> : <Minimize2 size={12} />}
            {m}
          </button>
        ))}
      </div>
      <Select
        value={dialect}
        onChange={e => setDialect(e.target.value)}
        aria-label="SQL dialect"
        className="!py-2 text-xs"
      >
        {DIALECTS.map(d => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </Select>
      {mode === 'pretty' && (
        <>
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
            {(['upper', 'lower', 'preserve'] as KeywordCase[]).map(k => (
              <button
                key={k}
                type="button"
                onClick={() => setKeywordCase(k)}
                aria-pressed={keywordCase === k}
                className={`px-2 py-1 text-[10px] rounded uppercase tracking-wide ${
                  keywordCase === k ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
                title={`Keywords: ${k}`}
              >
                {k === 'upper' ? 'AaA' : k === 'lower' ? 'aaa' : '—'}
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
        </>
      )}
      <Button size="sm" variant="outline" onClick={handleDownload} disabled={!output} className="self-center">
        <ArrowDownToLine size={14} className="mr-1" /> Save .sql
      </Button>
      {error ? (
        <div role="alert" className="text-xs text-red-600 dark:text-red-400 text-center px-2 py-1.5 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
          <div className="font-semibold mb-0.5">Parse error</div>
          <div className="opacity-80 break-words">{error}</div>
        </div>
      ) : (
        output && (
          <div className="text-[10px] text-center text-gray-500 dark:text-gray-400 tabular-nums">
            {stats.inB.toLocaleString()} B → {stats.outB.toLocaleString()} B
            {stats.delta !== 0 && (
              <span className={stats.delta < 0 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}>
                {' '}({stats.delta > 0 ? '+' : ''}{stats.pct.toFixed(1)}%)
              </span>
            )}
          </div>
        )
      )}
    </div>
  );

  return (
    <ConverterLayout
      title="SQL Formatter"
      details={details}
      toolId={toolId}
      actions={actions}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'sql',
        label: 'SQL Input',
        fileUpload: true,
        acceptFileTypes: '.sql,.txt',
        placeholder: 'Paste SQL here...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'sql',
        label: mode === 'minify' ? 'Minified SQL' : 'Formatted SQL',
        readOnly: true,
        placeholder: error ? 'Fix the SQL above to see formatted output' : 'Formatted SQL will appear here...',
      }}
    />
  );
};

export default SqlFormatter;

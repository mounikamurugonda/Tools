'use client';

import React, { useState, useCallback, useMemo } from 'react';
import type { ToolProps } from '@/types';

function parseCsv(raw: string): { headers: string[]; rows: string[][] } {
  const lines = raw.trim().split('\n').filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [] };
  const parse = (line: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { inQuotes = !inQuotes; continue; }
      if (c === ',' && !inQuotes) { result.push(cur.trim()); cur = ''; continue; }
      cur += c;
    }
    result.push(cur.trim());
    return result;
  };
  const headers = parse(lines[0]);
  const rows = lines.slice(1).map(parse);
  return { headers, rows };
}

const CsvToPrompt: React.FC<ToolProps> = () => {
  const [input, setInput] = useState('');
  const [task, setTask] = useState('');
  const [rowLimit, setRowLimit] = useState(50);
  const [selectedCols, setSelectedCols] = useState<Set<string>>(new Set());
  const [allColsSelected, setAllColsSelected] = useState(true);
  const [format, setFormat] = useState<'list' | 'table' | 'summary'>('list');
  const [copied, setCopied] = useState(false);

  const { headers, rows } = useMemo(() => parseCsv(input), [input]);

  const toggleCol = useCallback((col: string) => {
    setAllColsSelected(false);
    setSelectedCols(prev => {
      const next = new Set(prev);
      if (next.has(col)) next.delete(col); else next.add(col);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setAllColsSelected(true);
    setSelectedCols(new Set(headers));
  }, [headers]);

  const activeCols = useMemo(() =>
    allColsSelected || selectedCols.size === 0
      ? headers
      : headers.filter(h => selectedCols.has(h)),
    [headers, selectedCols, allColsSelected]
  );

  const output = useMemo(() => {
    if (!headers.length) return '';
    const limitedRows = rows.slice(0, rowLimit);
    const colIdx = activeCols.map(c => headers.indexOf(c));

    let data = '';
    if (format === 'table') {
      data = activeCols.join(' | ') + '\n' + activeCols.map(() => '---').join(' | ') + '\n';
      data += limitedRows.map(r => colIdx.map(i => r[i] ?? '').join(' | ')).join('\n');
    } else if (format === 'list') {
      data = limitedRows.map((r, i) => {
        const fields = colIdx.map((ci, j) => `${activeCols[j]}: ${r[ci] ?? ''}`).join(', ');
        return `${i + 1}. ${fields}`;
      }).join('\n');
    } else {
      // summary: just first row structure
      data = `Dataset has ${rows.length} rows and ${activeCols.length} columns: ${activeCols.join(', ')}.\n\n`;
      data += `Sample rows (first ${Math.min(5, limitedRows.length)}):\n`;
      data += limitedRows.slice(0, 5).map((r, i) => {
        const fields = colIdx.map((ci, j) => `${activeCols[j]}="${r[ci] ?? ''}"`).join(', ');
        return `Row ${i + 1}: ${fields}`;
      }).join('\n');
      if (rows.length > limitedRows.length) data += `\n... and ${rows.length - limitedRows.length} more rows`;
    }

    const header = task.trim()
      ? `${task.trim()}\n\nData (${limitedRows.length} of ${rows.length} rows):\n\n`
      : `Analyze the following CSV data (${limitedRows.length} of ${rows.length} rows):\n\n`;

    return header + data;
  }, [headers, rows, rowLimit, activeCols, task, format]);

  const tokens = Math.round((output.length / 4 + output.split(/\s+/).length * 0.75) / 2);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target?.result as string ?? '';
      setInput(text);
      setAllColsSelected(true);
      setSelectedCols(new Set());
    };
    reader.readAsText(file);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [output]);

  const handleExample = useCallback(() => {
    setInput(`name,age,city,revenue,signup_date
Alice Chen,32,New York,48500,2023-01-15
Bob Smith,45,London,92000,2022-07-20
Carol Jones,28,Tokyo,31000,2023-08-01
David Kim,39,Seoul,67500,2021-11-30
Eva Brown,55,Paris,115000,2020-03-12`);
    setTask('Analyze this customer dataset. Find the highest revenue customer, average revenue by city, and identify any trends.');
    setAllColsSelected(true);
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CSV to AI Prompt</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
          Feed tabular data to any AI model without wasting tokens. Control which columns, how many rows, and how the data is formatted — all in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                CSV Input {rows.length > 0 && <span className="text-gray-400 font-normal">({rows.length} rows, {headers.length} cols)</span>}
              </label>
              <div className="flex gap-2">
                <button onClick={handleExample} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 transition-colors">Example</button>
                <label className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 transition-colors cursor-pointer">
                  Load CSV
                  <input type="file" accept=".csv,.tsv,.txt" className="hidden" onChange={handleFile} />
                </label>
              </div>
            </div>
            <textarea
              value={input}
              onChange={e => { setInput(e.target.value); setAllColsSelected(true); setSelectedCols(new Set()); }}
              placeholder="Paste CSV data or load a file..."
              rows={8}
              className="w-full p-3 text-xs font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
          </div>

          {headers.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Columns to include</span>
                <button onClick={selectAll} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Select all</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {headers.map(h => {
                  const active = allColsSelected || selectedCols.has(h);
                  return (
                    <button
                      key={h}
                      onClick={() => toggleCol(h)}
                      className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                        active ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                      }`}
                    >{h}</button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">Row limit</label>
              <input
                type="number"
                value={rowLimit}
                onChange={e => setRowLimit(Math.max(1, parseInt(e.target.value) || 1))}
                min={1}
                max={rows.length || 9999}
                className="w-full p-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">Format</label>
              <select
                value={format}
                onChange={e => setFormat(e.target.value as 'list' | 'table' | 'summary')}
                className="w-full p-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
              >
                <option value="list">Numbered list</option>
                <option value="table">Markdown table</option>
                <option value="summary">Summary + sample</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">Task instruction (optional)</label>
            <textarea
              value={task}
              onChange={e => setTask(e.target.value)}
              placeholder="What should the AI do with this data?"
              rows={2}
              className="w-full p-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">AI-Ready Prompt</label>
            {output && (
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>~{tokens.toLocaleString()} tokens</span>
                <button onClick={handleCopy} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Your AI-ready prompt will appear here..."
            rows={20}
            className="w-full p-3 text-xs font-mono bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl resize-y focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default CsvToPrompt;

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import type { ToolProps } from '@/types';

type Verbosity = 'concise' | 'standard' | 'detailed';
type OutputStyle = 'natural' | 'structured' | 'table';

function jsonToNatural(obj: unknown, depth = 0, style: OutputStyle, verbosity: Verbosity): string {
  const indent = '  '.repeat(depth);
  if (obj === null) return 'null';
  if (typeof obj === 'boolean') return obj ? 'yes' : 'no';
  if (typeof obj === 'number' || typeof obj === 'string') return String(obj);

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '(empty list)';
    if (obj.every(i => typeof i !== 'object' || i === null)) {
      const list = obj.slice(0, verbosity === 'concise' ? 10 : undefined).map(String);
      const extra = verbosity === 'concise' && obj.length > 10 ? ` ... and ${obj.length - 10} more` : '';
      return list.join(', ') + extra;
    }
    const limit = verbosity === 'concise' ? 3 : verbosity === 'standard' ? 10 : obj.length;
    const items = obj.slice(0, limit).map((item, i) => {
      if (style === 'table') return `Row ${i + 1}: ${jsonToNatural(item, 0, style, verbosity)}`;
      return `${indent}  - ${jsonToNatural(item, depth + 1, style, verbosity)}`;
    });
    if (obj.length > limit) items.push(`${indent}  ... and ${obj.length - limit} more items`);
    return '\n' + items.join('\n');
  }

  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return '(empty object)';
    const lines = entries.map(([k, v]) => {
      const key = k.replace(/_/g, ' ');
      const val = jsonToNatural(v, depth + 1, style, verbosity);
      return `${indent}  ${key}: ${val}`;
    });
    return '\n' + lines.join('\n');
  }

  return String(obj);
}

function buildPrompt(json: unknown, task: string, style: OutputStyle, verbosity: Verbosity): string {
  const data = jsonToNatural(json, 0, style, verbosity);
  const preamble = task.trim()
    ? `${task.trim()}\n\nHere is the data:\n`
    : 'Analyze the following data and provide insights:\n\n';
  return preamble + data;
}

const JsonToPrompt: React.FC<ToolProps> = () => {
  const [input, setInput] = useState('');
  const [task, setTask] = useState('');
  const [verbosity, setVerbosity] = useState<Verbosity>('standard');
  const [style, setStyle] = useState<OutputStyle>('natural');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => {
    if (!input.trim()) return null;
    try {
      const r = JSON.parse(input);
      setError('');
      return r;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      return null;
    }
  }, [input]);

  const output = useMemo(() => {
    if (!parsed) return '';
    return buildPrompt(parsed, task, style, verbosity);
  }, [parsed, task, style, verbosity]);

  const tokens = Math.round((output.length / 4 + output.split(/\s+/).length * 0.75) / 2);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setInput(ev.target?.result as string ?? '');
    reader.readAsText(file);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [output]);

  const handleExample = useCallback(() => {
    setInput(JSON.stringify([
      { id: 1, name: 'Alice Chen', role: 'Engineer', department: 'Backend', salary: 120000, joined: '2022-03-15', performance_score: 4.8 },
      { id: 2, name: 'Bob Smith', role: 'Designer', department: 'Product', salary: 95000, joined: '2021-07-01', performance_score: 4.2 },
      { id: 3, name: 'Carol Jones', role: 'Manager', department: 'Frontend', salary: 145000, joined: '2019-11-20', performance_score: 4.9 },
    ], null, 2));
    setTask('Analyze this employee dataset. Identify the highest-paid employee, average salary by department, and any patterns in performance scores.');
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">JSON to AI Prompt</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
          Convert large JSON datasets into clean, token-efficient prompts. No more pasting raw JSON and hoping the AI understands it — convert it first.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">JSON Input</label>
              <div className="flex gap-2">
                <button onClick={handleExample} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 transition-colors">Try example</button>
                <label className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 transition-colors cursor-pointer">
                  Load file
                  <input type="file" accept=".json" className="hidden" onChange={handleFile} />
                </label>
              </div>
            </div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder='{"key": "value"} or paste a large JSON array...'
              rows={10}
              className="w-full p-3 text-xs font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">What should the AI do with this data? <span className="text-gray-400">(optional)</span></label>
            <textarea
              value={task}
              onChange={e => setTask(e.target.value)}
              placeholder="e.g. Summarize the key trends, identify outliers, or answer specific questions about this dataset..."
              rows={3}
              className="w-full p-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">Output Style</label>
              <select
                value={style}
                onChange={e => setStyle(e.target.value as OutputStyle)}
                className="w-full p-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
              >
                <option value="natural">Natural language</option>
                <option value="structured">Structured (key: value)</option>
                <option value="table">Table rows</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">Verbosity</label>
              <select
                value={verbosity}
                onChange={e => setVerbosity(e.target.value as Verbosity)}
                className="w-full p-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
              >
                <option value="concise">Concise (fewer tokens)</option>
                <option value="standard">Standard</option>
                <option value="detailed">Detailed (all data)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">AI-Ready Prompt</label>
            {output && (
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>~{tokens.toLocaleString()} tokens</span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Your AI-ready prompt will appear here..."
            rows={18}
            className="w-full p-3 text-xs font-mono bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl resize-y focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default JsonToPrompt;

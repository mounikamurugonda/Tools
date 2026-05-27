'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowDownToLine, ArrowLeftRight } from 'lucide-react';
import yaml from 'js-yaml';

type Mode = 'json-to-yaml' | 'yaml-to-json';
type Indent = 2 | 4;

const SAMPLE_JSON = `{
  "name": "UtilToolkits",
  "active": true,
  "skills": ["React", "Next.js", "TypeScript"],
  "meta": { "owner": "team", "stars": 42 }
}`;

const JsonYamlConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [mode, setMode] = useState<Mode>('json-to-yaml');
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
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
      if (mode === 'json-to-yaml') {
        const parsed = JSON.parse(input);
        setOutput(
          yaml.dump(parsed, {
            indent,
            sortKeys,
            lineWidth: 120,
            noRefs: true,
          })
        );
      } else {
        const parsed = yaml.load(input);
        setOutput(JSON.stringify(parsed, sortKeys ? (Object.keys(parsed as object).sort) as any : undefined, indent));
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
      setOutput('');
    }
  }, [input, mode, indent, sortKeys]);

  const stats = useMemo(() => {
    const inLines = input ? input.split('\n').length : 0;
    const outLines = output ? output.split('\n').length : 0;
    return { inLines, outLines };
  }, [input, output]);

  const swap = useCallback(() => {
    if (!output) return;
    const newMode: Mode = mode === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml';
    setMode(newMode);
    setInput(output);
    toast.info(`Switched to ${newMode === 'json-to-yaml' ? 'JSON → YAML' : 'YAML → JSON'}`);
  }, [mode, output, toast]);

  const download = useCallback(() => {
    if (!output) return;
    const isYaml = mode === 'json-to-yaml';
    const blob = new Blob([output], {
      type: isYaml ? 'text/yaml;charset=utf-8' : 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isYaml ? 'output.yaml' : 'output.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded');
  }, [output, mode, toast]);

  const actions = (
    <div className="flex flex-col gap-3 w-full lg:w-48">
      <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
        {(['json-to-yaml', 'yaml-to-json'] as Mode[]).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`px-2 py-1.5 text-[11px] rounded font-mono ${
              mode === m ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {m === 'json-to-yaml' ? 'JSON→YAML' : 'YAML→JSON'}
          </button>
        ))}
      </div>
      <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
        {([2, 4] as Indent[]).map(v => (
          <button
            key={v}
            type="button"
            onClick={() => setIndent(v)}
            aria-pressed={indent === v}
            className={`w-9 py-1 text-xs rounded font-mono ${
              indent === v ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
            title={`${v} spaces`}
          >
            {v}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 self-center">
        <input type="checkbox" checked={sortKeys} onChange={e => setSortKeys(e.target.checked)} />
        Sort keys
      </label>
      <Button onClick={swap} variant="outline" size="sm" disabled={!output}>
        <ArrowLeftRight className="w-4 h-4 mr-1.5" /> Swap
      </Button>
      <Button onClick={download} variant="outline" size="sm" disabled={!output}>
        <ArrowDownToLine className="w-4 h-4 mr-1" />
        Save .{mode === 'json-to-yaml' ? 'yaml' : 'json'}
      </Button>
      {error ? (
        <div role="alert" className="text-xs text-red-600 dark:text-red-400 text-center px-2 py-1.5 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
          <div className="font-semibold mb-0.5">Parse error</div>
          <div className="opacity-80 break-words">{error}</div>
        </div>
      ) : (
        output && (
          <div className="text-[10px] text-center text-gray-500 dark:text-gray-400 tabular-nums">
            {stats.inLines} lines → {stats.outLines} lines
          </div>
        )
      )}
    </div>
  );

  return (
    <ConverterLayout
      title="JSON ↔ YAML Converter"
      details={details}
      toolId={toolId}
      actions={actions}
      editorInput={{
        value: input,
        onChange: setInput,
        language: mode === 'json-to-yaml' ? 'json' : 'yaml',
        label: mode === 'json-to-yaml' ? 'JSON Input' : 'YAML Input',
        fileUpload: true,
        acceptFileTypes: mode === 'json-to-yaml' ? '.json,.txt' : '.yaml,.yml,.txt',
        placeholder: `Paste ${mode === 'json-to-yaml' ? 'JSON' : 'YAML'} here...`,
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: mode === 'json-to-yaml' ? 'yaml' : 'json',
        label: mode === 'json-to-yaml' ? 'YAML Output' : 'JSON Output',
        readOnly: true,
        placeholder: error ? 'Fix the input above' : 'Result will appear here...',
      }}
    />
  );
};

export default JsonYamlConverter;

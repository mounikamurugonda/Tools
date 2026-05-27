'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowDownToLine, Minimize2, Sparkles } from 'lucide-react';
import * as prettier from 'prettier/standalone';
import parserXml from '@prettier/plugin-xml';

type Mode = 'pretty' | 'minify';
type Indent = 2 | 4 | '\t';

function minifyXml(xml: string): string {
  // Drop comments, collapse whitespace between tags, keep content whitespace inside text nodes only when significant.
  return xml
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .replace(/\s*\/>/g, '/>')
    .trim();
}

function validateXml(xml: string): string | null {
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') return null;
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  const err = doc.querySelector('parsererror');
  if (err) {
    // Firefox-style errors come back as text inside <parsererror>; Chrome similar.
    const text = err.textContent?.trim().split('\n')[0] || 'XML parse error';
    return text;
  }
  return null;
}

const SAMPLE = `<catalog><book id="bk101"><author>Gambardella, Matthew</author><title>XML Developer's Guide</title><genre>Computer</genre><price>44.95</price></book></catalog>`;

const XmlFormatter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('pretty');
  const [indent, setIndent] = useState<Indent>(2);
  const toast = useToast();

  useEffect(() => {
    let cancelled = false;
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    const validationError = validateXml(input);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (mode === 'minify') {
      setOutput(minifyXml(input));
      setError(null);
      return;
    }
    (async () => {
      try {
        const formatted = await prettier.format(input, {
          parser: 'xml',
          plugins: [parserXml as any],
          tabWidth: indent === '\t' ? 2 : indent,
          useTabs: indent === '\t',
          xmlSelfClosingSpace: true,
          xmlWhitespaceSensitivity: 'ignore',
        });
        if (!cancelled) {
          setOutput(formatted);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Format failed');
      }
    })();
    return () => { cancelled = true; };
  }, [input, mode, indent]);

  const stats = useMemo(() => {
    const inB = new Blob([input]).size;
    const outB = new Blob([output]).size;
    return { inB, outB, delta: outB - inB, pct: inB > 0 ? ((outB - inB) / inB) * 100 : 0 };
  }, [input, output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'minify' ? 'min.xml' : 'pretty.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded');
  }, [output, mode, toast]);

  const actions = (
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
            {m === 'pretty' ? <Sparkles size={12} /> : <Minimize2 size={12} />}
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
      <Button size="sm" variant="outline" onClick={handleDownload} disabled={!output} className="self-center">
        <ArrowDownToLine size={14} className="mr-1" /> Save .xml
      </Button>
      {error ? (
        <div role="alert" className="text-xs text-red-600 dark:text-red-400 text-center px-2 py-1.5 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
          <div className="font-semibold mb-0.5">Invalid XML</div>
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
      title="XML Formatter"
      details={details}
      toolId={toolId}
      actions={actions}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'xml',
        label: 'XML Input',
        fileUpload: true,
        acceptFileTypes: '.xml,.xsd,.xsl,.svg,.txt',
        placeholder: 'Paste XML here...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'xml',
        label: mode === 'minify' ? 'Minified XML' : 'Formatted XML',
        readOnly: true,
        placeholder: error ? 'Fix the XML above to see formatted output' : 'Formatted XML will appear here...',
      }}
    />
  );
};

export default XmlFormatter;

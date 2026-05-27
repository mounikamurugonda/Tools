'use client';

import React, { useCallback, useEffect, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowLeftRight } from 'lucide-react';

type Mode = 'encode' | 'decode';
type EncodeScheme = 'named' | 'decimal' | 'hex';

const NAMED: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  ' ': '&nbsp;',
  '©': '&copy;',
  '®': '&reg;',
  '™': '&trade;',
  '€': '&euro;',
  '£': '&pound;',
  '¥': '&yen;',
  '¢': '&cent;',
  '§': '&sect;',
  '¶': '&para;',
  '±': '&plusmn;',
  '×': '&times;',
  '÷': '&divide;',
  '°': '&deg;',
  'µ': '&micro;',
  '–': '&ndash;',
  '—': '&mdash;',
  '…': '&hellip;',
  '‘': '&lsquo;',
  '’': '&rsquo;',
  '“': '&ldquo;',
  '”': '&rdquo;',
  '«': '&laquo;',
  '»': '&raquo;',
};

const ALWAYS_ESCAPE = new Set(['&', '<', '>', '"', "'"]);

function encodeChar(ch: string, scheme: EncodeScheme): string {
  if (scheme === 'named' && NAMED[ch]) return NAMED[ch];
  const cp = ch.codePointAt(0)!;
  return scheme === 'hex' ? `&#x${cp.toString(16).toUpperCase()};` : `&#${cp};`;
}

function encode(input: string, scheme: EncodeScheme, all: boolean): string {
  let out = '';
  for (const ch of input) {
    const code = ch.codePointAt(0)!;
    if (ALWAYS_ESCAPE.has(ch) || (all && code > 127)) {
      out += encodeChar(ch, scheme);
    } else {
      out += ch;
    }
  }
  return out;
}

const NAMED_REVERSE = (() => {
  // Common HTML5 named entities — enough for the inverse of NAMED plus a few extras users will paste.
  const map: Record<string, string> = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
    copy: '©', reg: '®', trade: '™', euro: '€', pound: '£', yen: '¥', cent: '¢',
    sect: '§', para: '¶', plusmn: '±', times: '×', divide: '÷', deg: '°', micro: 'µ',
    ndash: '–', mdash: '—', hellip: '…', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
    laquo: '«', raquo: '»', middot: '·', bull: '•', dagger: '†', Dagger: '‡',
    permil: '‰', prime: '′', Prime: '″', lsaquo: '‹', rsaquo: '›',
  };
  return map;
})();

function decode(input: string): string {
  return input.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z][a-zA-Z0-9]+);/g, (match, name: string) => {
    if (name.startsWith('#x') || name.startsWith('#X')) {
      const cp = parseInt(name.slice(2), 16);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : match;
    }
    if (name.startsWith('#')) {
      const cp = parseInt(name.slice(1), 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : match;
    }
    return NAMED_REVERSE[name] ?? match;
  });
}

const HtmlEntity: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('<h1>Hello "World" & <Friends> — café ☕️</h1>');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [scheme, setScheme] = useState<EncodeScheme>('named');
  const [escapeNonAscii, setEscapeNonAscii] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }
    setOutput(mode === 'encode' ? encode(input, scheme, escapeNonAscii) : decode(input));
  }, [input, mode, scheme, escapeNonAscii]);

  const swap = useCallback(() => {
    setMode(m => (m === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    toast.info(`Switched to ${mode === 'encode' ? 'decode' : 'encode'}`);
  }, [mode, output, toast]);

  const actions = (
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
      {mode === 'encode' && (
        <>
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900 self-center">
            {(['named', 'decimal', 'hex'] as EncodeScheme[]).map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setScheme(s)}
                aria-pressed={scheme === s}
                className={`px-2 py-1 text-[11px] rounded font-mono ${
                  scheme === s ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
                title={
                  s === 'named' ? '&amp;' :
                  s === 'decimal' ? '&#38;' :
                  '&#x26;'
                }
              >
                {s}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 self-center">
            <input
              type="checkbox"
              checked={escapeNonAscii}
              onChange={e => setEscapeNonAscii(e.target.checked)}
            />
            Escape all non-ASCII
          </label>
        </>
      )}
      <Button onClick={swap} variant="outline" size="sm" disabled={!output}>
        <ArrowLeftRight className="w-4 h-4 mr-1.5" /> Swap
      </Button>
      <div className="text-[10px] text-center text-gray-500 dark:text-gray-400 tabular-nums">
        {output ? `${input.length} → ${output.length} chars` : ''}
      </div>
    </div>
  );

  return (
    <ConverterLayout
      title="HTML Entity Encoder/Decoder"
      details={details}
      toolId={toolId}
      actions={actions}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'html',
        label: mode === 'encode' ? 'Raw Text/HTML' : 'Encoded Text',
        fileUpload: true,
        acceptFileTypes: '.html,.htm,.xml,.txt',
        placeholder: mode === 'encode' ? 'Paste text with special characters...' : 'Paste &amp;encoded text...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'html',
        label: mode === 'encode' ? 'Encoded Output' : 'Decoded Output',
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
    />
  );
};

export default HtmlEntity;

'use client';

import React, { useCallback, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import TextArea from '@/components/ui/TextArea';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Search } from 'lucide-react';

type Transformer = (s: string) => string;

const offset = (lowerStart: number, upperStart: number, digitStart?: number): Transformer =>
  s =>
    s.replace(/[a-zA-Z0-9]/g, c => {
      if (/[a-z]/.test(c)) return String.fromCodePoint(c.charCodeAt(0) - 97 + lowerStart);
      if (/[A-Z]/.test(c)) return String.fromCodePoint(c.charCodeAt(0) - 65 + upperStart);
      if (digitStart != null && /[0-9]/.test(c))
        return String.fromCodePoint(c.charCodeAt(0) - 48 + digitStart);
      return c;
    });

const INVERTED_MAP: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ',
  j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
  s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  '.': '˙', ',': "'", '?': '¿', '!': '¡', "'": ',', '"': ',,',
  '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<',
};

const SMALL_CAPS: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
  j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
  s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
};

const FONTS: { name: string; transform: Transformer }[] = [
  // 𝐁𝐨𝐥𝐝
  { name: 'Bold', transform: offset(0x1d41a, 0x1d400, 0x1d7ce) },
  // 𝐼𝑡𝑎𝑙𝑖𝑐
  { name: 'Italic', transform: offset(0x1d44e, 0x1d434) },
  // 𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄
  { name: 'Bold Italic', transform: offset(0x1d482, 0x1d468) },
  // 𝓢𝓬𝓻𝓲𝓹𝓽 (bold script)
  { name: 'Script', transform: offset(0x1d4ea, 0x1d4d0) },
  // 𝔉𝔯𝔞𝔨𝔱𝔲𝔯
  { name: 'Fraktur', transform: offset(0x1d51e, 0x1d504) },
  // 𝔻𝕠𝕦𝕓𝕝𝕖
  { name: 'Double Struck', transform: offset(0x1d552, 0x1d538, 0x1d7d8) },
  // 𝙼𝚘𝚗𝚘
  { name: 'Monospace', transform: offset(0x1d68a, 0x1d670, 0x1d7f6) },
  // 𝖲𝖺𝗇𝗌
  { name: 'Sans-serif', transform: offset(0x1d5ba, 0x1d5a0, 0x1d7e2) },
  // ⓑⓤⓑⓑⓛⓔ
  {
    name: 'Bubble',
    transform: s =>
      s.replace(/[a-zA-Z0-9]/g, c => {
        if (/[0-9]/.test(c)) return c === '0' ? '⓪' : String.fromCodePoint(c.charCodeAt(0) - 49 + 0x2460);
        if (/[a-z]/.test(c)) return String.fromCodePoint(c.charCodeAt(0) - 97 + 0x24d0);
        return String.fromCodePoint(c.charCodeAt(0) - 65 + 0x24b6);
      }),
  },
  // sᴍᴀʟʟ ᴄᴀᴘs
  {
    name: 'Small Caps',
    transform: s =>
      s.replace(/[a-zA-Z]/g, c => SMALL_CAPS[c.toLowerCase()] ?? c),
  },
  // ʇdıɹɔsdn
  {
    name: 'Upside-down',
    transform: s =>
      s
        .toLowerCase()
        .split('')
        .reverse()
        .map(c => INVERTED_MAP[c] ?? c)
        .join(''),
  },
  // s̶t̶r̶i̶k̶e̶
  {
    name: 'Strikethrough',
    transform: s =>
      s
        .split('')
        .map(c => (c === ' ' || c === '\n' ? c : c + '̶'))
        .join(''),
  },
  // s̲p̲a̲c̲e̲d̲
  {
    name: 'Wide',
    transform: s =>
      s
        .replace(/[a-zA-Z0-9]/g, c =>
          /[0-9]/.test(c)
            ? String.fromCodePoint(c.charCodeAt(0) - 48 + 0xff10)
            : String.fromCodePoint(c.charCodeAt(0) - (/[a-z]/.test(c) ? 97 : 65) + (/[a-z]/.test(c) ? 0xff41 : 0xff21))
        )
        .replace(/ /g, '　'),
  },
];

const FancyFontGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('Hello World');
  const [query, setQuery] = useState('');
  const toast = useToast();

  const filteredFonts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? FONTS.filter(f => f.name.toLowerCase().includes(q)) : FONTS;
  }, [query]);

  const copy = useCallback(
    async (value: string, label: string) => {
      try {
        await navigator.clipboard.writeText(value);
        toast.success(`${label} copied`);
      } catch {
        toast.error('Copy failed');
      }
    },
    [toast]
  );

  return (
    <ToolContainer title="Fancy Font Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card className="p-4 space-y-3">
          <Label htmlFor="fancy-text">Text</Label>
          <TextArea
            id="fancy-text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type your text here..."
            className="text-lg h-28"
          />
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`Filter ${FONTS.length} styles…`}
              className="max-w-xs"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
              {filteredFonts.length} style{filteredFonts.length === 1 ? '' : 's'}
            </span>
          </div>
        </Card>

        <div className="grid sm:grid-cols-2 gap-3" aria-live="polite">
          {filteredFonts.map(({ name, transform }) => {
            const transformed = transform(text);
            return (
              <button
                key={name}
                type="button"
                onClick={() => copy(transformed, name)}
                className="group text-left p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                title={`Click to copy "${name}"`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
                      {name}
                    </div>
                    <p className="text-xl text-gray-900 dark:text-white break-all">
                      {transformed || <span className="text-gray-400">Type something…</span>}
                    </p>
                  </div>
                  <span
                    className="shrink-0 mt-1 opacity-60 group-hover:opacity-100 text-gray-500"
                    aria-hidden="true"
                  >
                    <Copy size={14} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </ToolContainer>
  );
};

export default FancyFontGenerator;

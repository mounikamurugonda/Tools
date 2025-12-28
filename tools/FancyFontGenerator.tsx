'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const FONTS: Record<string, (s: string) => string> = {
  Bold: s =>
    s.replace(/[a-zA-Z0-9]/g, c => {
      const diff = /[0-9]/.test(c) ? 120764 : /[a-z]/.test(c) ? 120205 : 120211;
      return String.fromCodePoint(c.charCodeAt(0) + diff);
    }),
  Italic: s =>
    s.replace(/[a-zA-Z]/g, c => {
      const diff = /[a-z]/.test(c) ? 120257 : 120263;
      return String.fromCodePoint(c.charCodeAt(0) + diff);
    }),
  Script: s =>
    s.replace(/[a-zA-Z]/g, c => {
      const diff = /[a-z]/.test(c) ? 119951 : 119957;
      // Fix some script chars that aren't in the continuous block
      if (c === 'e') return 'ℯ';
      if (c === 'g') return 'ℊ';
      if (c === 'o') return 'ℴ';
      return String.fromCodePoint(c.charCodeAt(0) + diff);
    }),
  Typewriter: s =>
    s.replace(/[a-zA-Z0-9]/g, c => {
      return String.fromCodePoint(c.charCodeAt(0) + 120361);
    }),
  Bubble: s =>
    s.replace(/[a-zA-Z0-9]/g, c => {
      if (/[0-9]/.test(c)) return String.fromCodePoint(c.charCodeAt(0) + 9322);
      const diff = /[a-z]/.test(c) ? 9327 : 9333;
      return String.fromCodePoint(c.charCodeAt(0) + diff);
    }),
  Inverted: s => {
    const map: Record<string, string> = {
      a: 'ɐ',
      b: 'q',
      c: 'ɔ',
      d: 'p',
      e: 'ǝ',
      f: 'ɟ',
      g: 'ƃ',
      h: 'ɥ',
      i: 'ᴉ',
      j: 'ɾ',
      k: 'ʞ',
      l: 'l',
      m: 'ɯ',
      n: 'u',
      o: 'o',
      p: 'd',
      q: 'b',
      r: 'ɹ',
      s: 's',
      t: 'ʇ',
      u: 'n',
      v: 'ʌ',
      w: 'ʍ',
      x: 'x',
      y: 'ʎ',
      z: 'z',
      '.': '˙',
      ',': "'",
      '?': '¿',
      '!': '¡',
      "'": ',',
      '"': ',,',
      '(': ')',
      ')': '(',
      '[': ']',
      ']': '[',
      '{': '}',
      '}': '{',
      '<': '>',
      '>': '<',
    };
    return s
      .toLowerCase()
      .split('')
      .reverse()
      .map(c => map[c] || c)
      .join('');
  },
};

const FancyFontGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('Hello World');

  return (
    <ToolContainer title="Fancy Font Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full h-32 brand-input text-lg"
          placeholder="Type your text here..."
        />

        <div className="grid gap-4">
          {Object.entries(FONTS).map(([name, transform]) => (
            <div
              key={name}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">
                  {name}
                </span>
                <p className="text-xl text-gray-900 dark:text-white">{transform(text)}</p>
              </div>
              <CopyButton textToCopy={transform(text)} />
            </div>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
};

export default FancyFontGenerator;

'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';

const MORSE_MAP: Record<string, string> = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',
  ' ': '/',
};

const REVERSE_MAP = Object.entries(MORSE_MAP).reduce(
  (acc, [char, code]) => ({ ...acc, [code]: char }),
  {} as Record<string, string>
);

const MorseConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('HELLO WORLD');
  const [morse, setMorse] = useState('');

  const toMorse = () => {
    setMorse(
      text
        .toUpperCase()
        .split('')
        .map(c => MORSE_MAP[c] || c)
        .join(' ')
    );
  };

  const toText = () => {
    setText(
      morse
        .split(' ')
        .map(c => REVERSE_MAP[c] || c)
        .join('')
    );
  };

  return (
    <ToolContainer title="Morse Code Converter" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 flex flex-col h-full">
            <Label>Text Input</Label>
            <div className="relative flex-1">
              <TextArea
                value={text}
                onChange={e => setText(e.target.value)}
                className="h-64 resize-none"
                placeholder="Enter text here..."
              />
              {text && (
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={text} />
                </div>
              )}
            </div>
            <Button onClick={toMorse} className="w-full mt-2" variant="primary">
              Convert to Morse &darr;
            </Button>
          </div>

          <div className="space-y-2 flex flex-col h-full">
            <Label>Morse Code Output</Label>
            <div className="relative flex-1">
              <TextArea
                value={morse}
                onChange={e => setMorse(e.target.value)}
                className="h-64 resize-none font-mono bg-gray-50 dark:bg-gray-900"
                placeholder="Enter morse code here..."
              />
              {morse && (
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={morse} />
                </div>
              )}
            </div>
            <Button onClick={toText} className="w-full mt-2" variant="secondary">
              Convert to Text &uarr;
            </Button>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default MorseConverter;

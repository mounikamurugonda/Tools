'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { ArrowLeftRight } from 'lucide-react';

const MORSE_MAP: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
  ' ': '/',
};

const REVERSE_MAP = Object.entries(MORSE_MAP).reduce(
  (acc, [char, code]) => ({ ...acc, [code]: char }),
  {} as Record<string, string>
);

const toMorse = (text: string) => {
  return (text || '')
    .toUpperCase()
    .split('')
    .map(c => MORSE_MAP[c] || c)
    .join(' ');
};

const toText = (morse: string) => {
  return (morse || '')
    .split(' ')
    .map(c => REVERSE_MAP[c] || c)
    .join('');
};

const MorseConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [mode, setMode] = useState<'text-to-morse' | 'morse-to-text'>('text-to-morse');
  const [input, setInput] = useState('HELLO WORLD');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (mode === 'text-to-morse') {
      setOutput(toMorse(input));
    } else {
      setOutput(toText(input));
    }
  }, [input, mode]);

  const swapMode = () => {
    const newMode = mode === 'text-to-morse' ? 'morse-to-text' : 'text-to-morse';
    setMode(newMode);
    setInput(output); // usage of previous output as new input
    setOutput(''); // will update via useEffect
  };

  const headerOptions = (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
      <Button onClick={swapMode} variant="secondary" className="w-full sm:w-auto" title="Swap Mode">
        <ArrowLeftRight className="w-4 h-4 mr-2" />
        Swap: {mode === 'text-to-morse' ? 'Text → Morse' : 'Morse → Text'}
      </Button>
    </div>
  );

  return (
    <ConverterLayout
      title="Morse Code Converter"
      details={details}
      toolId={toolId}
      options={headerOptions}
      actions={null}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'plaintext',
        label: mode === 'text-to-morse' ? 'Text Input' : 'Morse Input',
        placeholder: mode === 'text-to-morse' ? 'Enter text here...' : 'Enter morse code here...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'plaintext',
        label: mode === 'text-to-morse' ? 'Morse Output' : 'Text Output',
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
    />
  );
};

export default MorseConverter;

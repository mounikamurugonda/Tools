
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const MORSE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
};

const REVERSE_MAP = Object.entries(MORSE_MAP).reduce((acc, [char, code]) => ({...acc, [code]: char}), {} as Record<string, string>);

const MorseConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('HELLO WORLD');
  const [morse, setMorse] = useState('');

  const toMorse = () => {
    setMorse(text.toUpperCase().split('').map(c => MORSE_MAP[c] || c).join(' '));
  };

  const toText = () => {
    setText(morse.split(' ').map(c => REVERSE_MAP[c] || c).join(''));
  };

  return (
    <ToolContainer title="Morse Code Converter" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="font-semibold">Text</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-40 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-3"
                />
                <button onClick={toMorse} className="w-full py-2 bg-blue-600 text-white rounded">Convert to Morse ↓</button>
            </div>
            <div className="space-y-2">
                <label className="font-semibold">Morse Code</label>
                <textarea
                    value={morse}
                    onChange={(e) => setMorse(e.target.value)}
                    className="w-full h-40 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-3 font-mono"
                />
                <button onClick={toText} className="w-full py-2 bg-green-600 text-white rounded">Convert to Text ↑</button>
            </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default MorseConverter;

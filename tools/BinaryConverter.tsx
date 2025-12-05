'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const BinaryConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('Hello');
  const [binary, setBinary] = useState(
    '01001000 01100101 01101100 01101100 01101111',
  );

  const textToBinary = (str: string) => {
    setText(str);
    setBinary(
      str
        .split('')
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' '),
    );
  };

  const binaryToText = (bin: string) => {
    setBinary(bin);
    try {
      setText(
        bin
          .split(' ')
          .map((b) => String.fromCharCode(parseInt(b, 2)))
          .join(''),
      );
    } catch (e) {
      setText('Invalid Binary');
    }
  };

  return (
    <ToolContainer title="Binary Converter" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold">Text Input</label>
            <textarea
              value={text}
              onChange={(e) => textToBinary(e.target.value)}
              className="w-full h-48 p-3 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">Binary Output</label>
            <textarea
              value={binary}
              onChange={(e) => binaryToText(e.target.value)}
              className="w-full h-48 p-3 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono"
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default BinaryConverter;

'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import CopyButton from '@/components/CopyButton';
import Card from '@/components/ui/Card';

const BinaryConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('Hello');
  const [binary, setBinary] = useState('01001000 01100101 01101100 01101100 01101111');

  const textToBinary = (str: string) => {
    setText(str);
    setBinary(
      str
        .split('')
        .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ')
    );
  };

  const binaryToText = (bin: string) => {
    setBinary(bin);
    try {
      setText(
        bin
          .split(' ')
          .map(b => String.fromCharCode(parseInt(b, 2)))
          .join('')
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
            <Label>Text Input</Label>
            <div className="relative">
              <TextArea
                value={text}
                onChange={e => textToBinary(e.target.value)}
                className="h-96 resize-none"
                placeholder="Type text to convert to binary..."
              />
              {text && (
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={text} />
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Binary Output</Label>
            <div className="relative">
              <TextArea
                value={binary}
                onChange={e => binaryToText(e.target.value)}
                className="h-96 font-mono bg-gray-50 dark:bg-gray-900 resize-none"
                placeholder="Type binary (space separated bytes) to convert to text..."
              />
              {binary && (
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={binary} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default BinaryConverter;

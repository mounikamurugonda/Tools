'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import CopyButton from '@/components/CopyButton';
import MonacoLiteEditor from '@/components/MonacoLiteEditor';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';

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
      // simplified error handling like original
    }
  };

  const handleClear = () => {
    setText('');
    setBinary('');
  };

  const inputSection = (
    <div className="h-full flex flex-col space-y-2">
      <Label>Text Input</Label>
      <div className="relative flex-1">
        <MonacoLiteEditor
          language="plaintext"
          value={text}
          onChange={val => textToBinary(val || '')}
          className="w-full h-full rounded-md overflow-hidden border border-transparent"
        />
        {text && (
          <div className="absolute top-4 right-6 z-10">
            <CopyButton textToCopy={text} />
          </div>
        )}
      </div>
    </div>
  );

  const outputSection = (
    <div className="h-full flex flex-col space-y-2">
      <Label>Binary Output</Label>
      <div className="relative flex-1">
        <MonacoLiteEditor
          language="plaintext"
          value={binary}
          onChange={val => binaryToText(val || '')}
          className="w-full h-full rounded-md overflow-hidden border border-transparent"
        />
        {binary && (
          <div className="absolute top-4 right-6 z-10">
            <CopyButton textToCopy={binary} />
          </div>
        )}
      </div>
    </div>
  );

  const actionSection = (
    <div className="flex flex-col gap-3 w-full lg:w-40">
      <Button onClick={handleClear} variant="ghost" className="w-full">
        <Trash2 className="w-4 h-4 mr-2" /> Clear
      </Button>
    </div>
  );

  return (
    <ConverterLayout
      title="Binary Converter"
      details={details}
      toolId={toolId}
      inputComponent={inputSection}
      outputComponent={outputSection}
      actions={actionSection}
    />
  );
};

export default BinaryConverter;

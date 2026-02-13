'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { ArrowLeftRight } from 'lucide-react';

const HtmlEntity: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('<h1>Hello & Welcome</h1>');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    try {
      if (!input) {
        setOutput('');
        return;
      }
      if (mode === 'encode') {
        const encoded = input.replace(/[\u00A0-\u9999<>&]/g, i => '&#' + i.charCodeAt(0) + ';');
        setOutput(encoded);
      } else {
        const txt = document.createElement('textarea');
        txt.innerHTML = input;
        setOutput(txt.value);
      }
    } catch (e) {
      // Ignore errors or set empty
      setOutput('');
    }
  };

  useEffect(() => {
    handleConvert();
  }, [input, mode]);

  const headerOptions = (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
      <Label className="uppercase text-xs font-bold text-muted-foreground mr-2">Mode:</Label>
      <div className="flex bg-muted p-1 rounded-md">
        <Button
          onClick={() => setMode('encode')}
          variant={mode === 'encode' ? 'secondary' : 'ghost'}
          size="sm"
          className="text-xs transition-all"
        >
          Encode
        </Button>
        <Button
          onClick={() => setMode('decode')}
          variant={mode === 'decode' ? 'secondary' : 'ghost'}
          size="sm"
          className="text-xs transition-all"
        >
          Decode
        </Button>
      </div>
    </div>
  );

  return (
    <ConverterLayout
      title="HTML Entity Encoder/Decoder"
      details={details}
      toolId={toolId}
      options={headerOptions}
      actions={null} // Remove actions column
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'html',
        label: 'Input Text',
        fileUpload: true,
        acceptFileTypes: '.html,.xml,.txt',
        placeholder: 'Enter text here...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'html',
        label: `Output (${mode.toUpperCase()})`,
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
    />
  );
};

export default HtmlEntity;

'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';

const StringEscaper: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('Hello "World" & <Friends>');
  const [mode, setMode] = useState('json');

  const getEscaped = () => {
    switch (mode) {
      case 'json':
        // Handle undefined input safely
        return JSON.stringify(input || '').slice(1, -1);
      case 'html':
        return (input || '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      case 'url':
        return encodeURIComponent(input || '');
      case 'java':
        return (input || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      default:
        return input;
    }
  };

  const output = getEscaped();

  const headerOptions = (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-800 flex-wrap">
      <Label className="uppercase text-xs font-bold text-muted-foreground mr-2">Mode:</Label>
      {['json', 'html', 'url', 'java'].map(m => (
        <Button
          key={m}
          onClick={() => setMode(m)}
          variant={mode === m ? 'primary' : 'secondary'}
          size="sm"
          className="uppercase font-bold min-w-[60px]"
        >
          {m}
        </Button>
      ))}
    </div>
  );

  return (
    <ConverterLayout
      title="String Escaper"
      details={details}
      toolId={toolId}
      options={headerOptions}
      actions={null}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'plaintext',
        label: 'Input String',
        placeholder: 'Enter string to escape...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'plaintext',
        label: `Escaped Output (${mode.toUpperCase()})`,
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
    />
  );
};

export default StringEscaper;

'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';

const StringEscaper: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('Hello "World" & <Friends>');
  const [mode, setMode] = useState('json');

  const getEscaped = () => {
    switch (mode) {
      case 'json':
        return JSON.stringify(input).slice(1, -1);
      case 'html':
        return input
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      case 'url':
        return encodeURIComponent(input);
      case 'java':
        return input.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      default:
        return input;
    }
  };

  const output = getEscaped();

  return (
    <ToolContainer title="String Escaper" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="flex gap-2">
          {['json', 'html', 'url', 'java'].map((m) => (
            <Button
              key={m}
              onClick={() => setMode(m)}
              variant={mode === m ? 'primary' : 'secondary'}
              className="capitalize"
            >
              {m}
            </Button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-64"
            placeholder="Input string..."
          />
          <div className="relative">
            <TextArea
              readOnly
              value={output}
              className="h-64 bg-gray-50 dark:bg-gray-900"
            />
            <CopyButton
              textToCopy={output}
              className="absolute top-4 right-4"
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default StringEscaper;

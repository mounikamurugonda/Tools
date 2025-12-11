'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';

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
        <Card title="Escape Mode" className="p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {['json', 'html', 'url', 'java'].map((m) => (
              <Button
                key={m}
                onClick={() => setMode(m)}
                variant={mode === m ? 'primary' : 'secondary'}
                className="min-w-[100px] uppercase font-bold"
              >
                {m}
              </Button>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Input String</Label>
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-80 resize-none"
              placeholder="Input string..."
            />
          </div>

          <div className="space-y-2">
            <Label>Escaped Output</Label>
            <div className="relative">
              <TextArea
                readOnly
                value={output}
                className="h-80 bg-gray-50 dark:bg-gray-900 resize-none"
                placeholder="Escaped output..."
              />
              <div className="absolute top-2 right-2">
                <CopyButton textToCopy={output} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default StringEscaper;

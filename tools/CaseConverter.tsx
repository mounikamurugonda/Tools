'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';

const CaseConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const toSentenceCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleConvert = (type: string) => {
    switch (type) {
      case 'uppercase':
        setOutput(input.toUpperCase());
        break;
      case 'lowercase':
        setOutput(input.toLowerCase());
        break;
      case 'sentence':
        setOutput(toSentenceCase(input));
        break;
      case 'title':
        setOutput(toTitleCase(input));
        break;
      default:
        break;
    }
  };

  return (
    <ToolContainer title="Case Converter" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => handleConvert('uppercase')}>UPPER CASE</Button>
          <Button onClick={() => handleConvert('lowercase')}>lower case</Button>
          <Button onClick={() => handleConvert('sentence')}>Sentence case</Button>
          <Button onClick={() => handleConvert('title')}>Title Case</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side - Input */}
          <div className="space-y-2">
            <Label htmlFor="case-input">Input</Label>
            <div className="relative">
              <TextArea
                id="case-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text here..."
                className="h-96 max-h-96"
              />
              {input && (
                <CopyButton
                  textToCopy={input}
                  className="absolute top-4 right-4"
                />
              )}
            </div>
          </div>

          {/* Right side - Output */}
          <div className="space-y-2">
            <Label htmlFor="case-output">Output</Label>
            <div className="relative">
              <TextArea
                id="case-output"
                readOnly
                value={output}
                placeholder="Converted text will appear here..."
                className="h-96 max-h-96 bg-gray-50 dark:bg-gray-900"
              />
              {output && (
                <CopyButton
                  textToCopy={output}
                  className="absolute top-4 right-4"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default CaseConverter;

'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';

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

  const toAlternatingCase = (str: string) => {
    return str
      .split('')
      .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
      .join('');
  };

  const toInverseCase = (str: string) => {
    return str
      .split('')
      .map((c) =>
        c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase(),
      )
      .join('');
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
      case 'alternating':
        setOutput(toAlternatingCase(input));
        break;
      case 'inverse':
        setOutput(toInverseCase(input));
        break;
      default:
        break;
    }
  };

  return (
    <ToolContainer title="Case Converter" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Controls" className="p-4">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => handleConvert('uppercase')}>UPPER CASE</Button>
            <Button onClick={() => handleConvert('lowercase')}>lower case</Button>
            <Button onClick={() => handleConvert('sentence')}>Sentence case</Button>
            <Button onClick={() => handleConvert('title')}>Title Case</Button>
            <Button onClick={() => handleConvert('alternating')}>aLtErNaTiNg cAsE</Button>
            <Button onClick={() => handleConvert('inverse')}>InVeRsE CaSe</Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side - Input */}
          <div className="space-y-2">
            <Label htmlFor="case-input">Input</Label>
            <Card className="p-0 overflow-hidden text-black dark:text-white">
              <div className="relative">
                <TextArea
                  id="case-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text here..."
                  className="h-96 max-h-96 border-none focus:ring-0 rounded-none bg-white dark:bg-gray-900"
                />
                {input && (
                  <div className="absolute top-2 right-2">
                    <CopyButton textToCopy={input} />
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right side - Output */}
          <div className="space-y-2">
            <Label htmlFor="case-output">Output</Label>
            <Card className="p-0 overflow-hidden text-black dark:text-white">
              <div className="relative">
                <TextArea
                  id="case-output"
                  readOnly
                  value={output}
                  placeholder="Converted text will appear here..."
                  className="h-96 max-h-96 bg-gray-50 dark:bg-gray-900 border-none focus:ring-0 rounded-none"
                />
                {output && (
                  <div className="absolute top-2 right-2">
                    <CopyButton textToCopy={output} />
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default CaseConverter;

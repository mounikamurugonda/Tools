'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';

const TextReverser: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');

  const reversedText = input.split('').reverse().join('');

  return (
    <ToolContainer title="Text Reverser" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Input */}
        <div className="space-y-2">
          <Label htmlFor="input-text">Original Text</Label>
          <div className="relative">
            <TextArea
              id="input-text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to reverse..."
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
          <Label htmlFor="output-text">Reversed Text</Label>
          <div className="relative">
            <TextArea
              id="output-text"
              readOnly
              value={reversedText}
              placeholder="Reversed text will appear here..."
              className="h-96 max-h-96 bg-gray-50 dark:bg-gray-900"
            />
            {reversedText && (
              <CopyButton
                textToCopy={reversedText}
                className="absolute top-4 right-4"
              />
            )}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default TextReverser;

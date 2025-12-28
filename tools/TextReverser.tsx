'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import { ArrowRightLeft } from 'lucide-react';

const TextReverser: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');

  const reversedText = input.split('').reverse().join('');

  return (
    <ToolContainer title="Text Reverser" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-11 gap-4 items-center">
          <div className="md:col-span-5 space-y-2">
            <Label htmlFor="input-text">Original Text</Label>
            <div className="relative">
              <TextArea
                id="input-text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Enter text to reverse..."
                className="h-96 max-h-96"
              />
              {input && (
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={input} />
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-1 flex justify-center py-4 md:py-0">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
              <ArrowRightLeft className="w-6 h-6 text-gray-500" />
            </div>
          </div>

          <div className="md:col-span-5 space-y-2">
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
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={reversedText} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default TextReverser;

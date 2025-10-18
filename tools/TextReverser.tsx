
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const TextReverser: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');

  const reversedText = input.split('').reverse().join('');

  return (
    <ToolContainer title="Text Reverser" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Input */}
        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Original Text
            </label>
            <textarea
              id="input-text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to reverse..."
              className="w-full h-96 max-h-96 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 resize-none"
            />
            {input && <CopyButton textToCopy={input} className="absolute top-8 right-2" />}
          </div>
        </div>

        {/* Right side - Output */}
        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="output-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Reversed Text
            </label>
            <textarea
              id="output-text"
              readOnly
              value={reversedText}
              placeholder="Reversed text will appear here..."
              className="w-full h-96 max-h-96 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded p-3 text-gray-800 dark:text-gray-200 resize-none"
            />
            {reversedText && <CopyButton textToCopy={reversedText} className="absolute top-8 right-2" />}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default TextReverser;

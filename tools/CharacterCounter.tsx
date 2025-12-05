'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const CharacterCounter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');

  const stats = useMemo(() => {
    const charactersWithSpaces = input.length;
    const charactersWithoutSpaces = input.replace(/\s/g, '').length;
    // Calculate byte length (UTF-8)
    const byteLength = new TextEncoder().encode(input).length;

    return { charactersWithSpaces, charactersWithoutSpaces, byteLength };
  }, [input]);

  return (
    <ToolContainer title="Character Counter" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Input */}
        <div className="space-y-4">
          <div className="relative">
            <label
              htmlFor="char-input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Text Input
            </label>
            <textarea
              id="char-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text here..."
              className="w-full h-96 max-h-96 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 resize-none"
              aria-label="Text input for character counter"
            />
            {input && (
              <CopyButton
                textToCopy={input}
                className="absolute top-8 right-2"
              />
            )}
          </div>
        </div>

        {/* Right side - Statistics */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Character Statistics
          </label>
          <div className="grid grid-cols-1 gap-4 text-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div
                className="text-3xl font-bold text-blue-400"
                aria-live="polite"
              >
                {stats.charactersWithSpaces.toLocaleString()}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                Characters (with spaces)
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div
                className="text-3xl font-bold text-blue-400"
                aria-live="polite"
              >
                {stats.charactersWithoutSpaces.toLocaleString()}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                Characters (no spaces)
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div
                className="text-3xl font-bold text-blue-400"
                aria-live="polite"
              >
                {stats.byteLength.toLocaleString()}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                Bytes (UTF-8)
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default CharacterCounter;

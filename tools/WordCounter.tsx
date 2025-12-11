'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';

const WordCounter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');

  const stats = useMemo(() => {
    const trimmedInput = input.trim();
    const characters = input.length;
    const words = trimmedInput === '' ? 0 : trimmedInput.split(/\s+/).length;
    const lines = input.split('\n').length;
    const sentences =
      trimmedInput === ''
        ? 0
        : (trimmedInput.match(/[.!?]+(?!\s*$)/g) || []).length + 1;

    // For single-word inputs without punctuation, sentences are 1.
    // If there's no input, sentences are 0.
    if (trimmedInput === '') return { characters, words, lines, sentences: 0 };
    if (words > 0 && (trimmedInput.match(/[.!?]/g) || []).length === 0)
      return { characters, words, lines, sentences: 1 };

    return { characters, words, lines, sentences };
  }, [input]);

  return (
    <ToolContainer
      title="Word & Character Counter"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Input */}
        <div className="space-y-2">
          <div className="relative">
            <Label htmlFor="word-input">Text Input</Label>
            <TextArea
              id="word-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text here..."
              className="h-96 max-h-96"
            />
            {input && (
              <CopyButton
                textToCopy={input}
                className="absolute top-9 right-4"
              />
            )}
          </div>
        </div>

        {/* Right side - Statistics */}
        <div className="space-y-4">
          <Label>Statistics</Label>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stats.words}
              </div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">Words</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stats.characters}
              </div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">Characters</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stats.sentences}
              </div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">Sentences</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stats.lines}
              </div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">Lines</div>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default WordCounter;

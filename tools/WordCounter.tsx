
'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const WordCounter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');

  const stats = useMemo(() => {
    const trimmedInput = input.trim();
    const characters = input.length;
    const words = trimmedInput === '' ? 0 : trimmedInput.split(/\s+/).length;
    const lines = input.split('\n').length;
    const sentences = trimmedInput === '' ? 0 : (trimmedInput.match(/[.!?]+(?!\s*$)/g) || []).length + 1;
    
    // For single-word inputs without punctuation, sentences are 1.
    // If there's no input, sentences are 0.
    if (trimmedInput === '') return { characters, words, lines, sentences: 0 };
    if (words > 0 && (trimmedInput.match(/[.!?]/g) || []).length === 0) return { characters, words, lines, sentences: 1 };


    return { characters, words, lines, sentences };
  }, [input]);

  return (
    <ToolContainer title="Word & Character Counter" details={details} toolId={toolId}>
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text here..."
          className="w-full h-48 bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-400">{stats.words}</div>
            <div className="text-gray-500 dark:text-gray-400">Words</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-400">{stats.characters}</div>
            <div className="text-gray-500 dark:text-gray-400">Characters</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-400">{stats.sentences}</div>
            <div className="text-gray-500 dark:text-gray-400">Sentences</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-400">{stats.lines}</div>
            <div className="text-gray-500 dark:text-gray-400">Lines</div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default WordCounter;

'use client';

import React, { useState, useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';

const WordCounter: React.FC<ToolProps> = ({ details, toolId, tool }) => {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 500);

  const stats = useMemo(() => {
    const trimmedInput = debouncedInput.trim();
    const characters = debouncedInput.length;
    const words = trimmedInput === '' ? 0 : trimmedInput.split(/\s+/).length;
    const lines = debouncedInput.split('\n').length;
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
  }, [debouncedInput]);

  return (
    <ToolContainer
      title={tool?.name || 'Word Counter'}
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-3 gap-6 h-[70vh]">
        {/* Left side - Input */}
        <div className="md:col-span-2 space-y-2 h-full flex flex-col">
          <Label htmlFor="word-input">Text Input</Label>
          <div className="relative flex-1">
            <TextArea
              id="word-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text here..."
              className="w-full h-full resize-none"
            />
            {input && (
              <div className="absolute top-2 right-2">
                <CopyButton textToCopy={input} />
              </div>
            )}
          </div>
        </div>

        {/* Right side - Statistics */}
        <div className="space-y-6">
          <Label>Statistics</Label>
          <div className="grid grid-cols-1 gap-4 text-center">
            <Card className="p-6 bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800">
              <div className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-1">
                {stats.words.toLocaleString()}
              </div>
              <div className="text-xs uppercase tracking-wide font-bold text-blue-400/80 dark:text-blue-300/80">Words</div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  {stats.characters.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Chars</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  {stats.sentences.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Sentences</div>
              </Card>
              <Card className="p-4 col-span-2">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  {stats.lines.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Lines</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default WordCounter;

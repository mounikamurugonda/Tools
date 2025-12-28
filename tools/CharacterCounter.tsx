'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';

const CharacterCounter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');

  const stats = useMemo(() => {
    const charactersWithSpaces = input.length;
    const charactersWithoutSpaces = input.replace(/\s/g, '').length;
    const words = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;
    const lines = input.split('\n').length;
    // Calculate byte length (UTF-8)
    const byteLength = new TextEncoder().encode(input).length;

    return {
      charactersWithSpaces,
      charactersWithoutSpaces,
      words,
      lines,
      byteLength,
    };
  }, [input]);

  return (
    <ToolContainer title="Character Counter" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="char-input">Text Input</Label>
            <div className="relative">
              <TextArea
                id="char-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Enter text here..."
                className="w-full h-[500px] resize-none"
              />
              {input && (
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={input} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Statistics */}
        <div className="space-y-4">
          <Label>Statistics</Label>
          <div className="space-y-4">
            <Card className="text-center p-6">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {stats.charactersWithSpaces.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                Characters
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  {stats.words.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Words</div>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  {stats.lines.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Lines</div>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  {stats.charactersWithoutSpaces.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">No Spaces</div>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  {stats.byteLength.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Bytes</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default CharacterCounter;

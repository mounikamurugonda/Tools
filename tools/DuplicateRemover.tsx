'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const DuplicateRemover: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState(
    'Apple\nBanana\nApple\nCherry\nBanana\nDate',
  );
  const [output, setOutput] = useState('');
  const [removedCount, setRemovedCount] = useState(0);

  const process = () => {
    const lines = input
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l !== '');
    const unique = Array.from(new Set(lines));
    setOutput(unique.join('\n'));
    setRemovedCount(lines.length - unique.length);
  };

  return (
    <ToolContainer
      title="Duplicate Line Remover"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-semibold">Input List</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 brand-input"
            placeholder="Paste list here..."
          />
        </div>
        <div className="space-y-2 relative">
          <label className="font-semibold">Unique List</label>
          <textarea
            readOnly
            value={output}
            className="w-full h-64 brand-input bg-gray-50 dark:bg-gray-900"
            placeholder="Result..."
          />
          {output && (
            <CopyButton
              textToCopy={output}
              className="absolute top-8 right-2"
            />
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={process}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium"
        >
          Remove Duplicates
        </button>
        {output && (
          <span className="text-gray-600 dark:text-gray-400">
            Removed {removedCount} duplicates
          </span>
        )}
      </div>
    </ToolContainer>
  );
};

export default DuplicateRemover;

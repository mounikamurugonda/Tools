'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const ListRandomizer: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('Apple\nBanana\nCherry\nDate\nElderberry');

  const shuffle = () => {
    const lines = input.split('\n').filter((l) => l.trim());
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setInput(lines.join('\n'));
  };

  return (
    <ToolContainer title="List Randomizer" details={details} toolId={toolId}>
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-64 brand-input"
          placeholder="Enter items (one per line)..."
        />
        <button
          onClick={shuffle}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded font-bold text-lg"
        >
          Randomize List 🎲
        </button>
      </div>
    </ToolContainer>
  );
};

export default ListRandomizer;

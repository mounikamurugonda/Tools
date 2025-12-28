'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import CopyButton from '@/components/CopyButton';
import { Shuffle } from 'lucide-react';

const ListRandomizer: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('Apple\nBanana\nCherry\nDate\nElderberry');

  const shuffle = () => {
    const lines = input.split('\n').filter(l => l.trim());
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setInput(lines.join('\n'));
  };

  return (
    <ToolContainer title="List Randomizer" details={details} toolId={toolId}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <Label>List Items</Label>
          <div className="relative">
            <TextArea
              value={input}
              onChange={e => setInput(e.target.value)}
              className="h-[400px]"
              placeholder="Enter items (one per line)..."
            />
            {input && (
              <div className="absolute top-2 right-2">
                <CopyButton textToCopy={input} />
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 text-right">
            {input.split('\n').filter(l => l.trim()).length} Items
          </p>
        </div>

        <Button onClick={shuffle} variant="primary" size="lg" className="w-full">
          <Shuffle className="w-5 h-5 mr-2" /> Randomize List
        </Button>
      </div>
    </ToolContainer>
  );
};

export default ListRandomizer;

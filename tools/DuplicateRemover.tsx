'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import { Trash2, ArrowRight } from 'lucide-react';

const DuplicateRemover: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState(
    'Apple\nBanana\nApple\nCherry\nBanana\nDate',
  );
  const [output, setOutput] = useState('');
  const [removedCount, setRemovedCount] = useState<number | null>(null);

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
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Input List</Label>
            <div className="relative">
              <TextArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="h-[400px]"
                placeholder="Paste list here..."
              />
              {input && (
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={input} />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 relative">
            <div className="flex justify-between items-center">
              <Label>Unique List (Result)</Label>
              {removedCount !== null && (
                <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded">
                  Removed {removedCount} duplicates
                </span>
              )}
            </div>
            <div className="relative">
              <TextArea
                readOnly
                value={output}
                className="h-[400px] bg-gray-50 dark:bg-gray-900"
                placeholder="Result will appear here..."
              />
              {output && (
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={output} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={process}
            variant="primary"
            size="lg"
            className="w-full md:w-auto min-w-[200px]"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Remove Duplicates
          </Button>
        </div>
      </div>
    </ToolContainer>
  );
};

export default DuplicateRemover;

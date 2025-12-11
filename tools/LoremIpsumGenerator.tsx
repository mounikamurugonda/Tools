'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';

const LOREM_IPSUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const LoremIpsumGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [paragraphs, setParagraphs] = useState(3);
  const [generatedText, setGeneratedText] = useState('');

  const generateText = () => {
    let text = '';
    for (let i = 0; i < paragraphs; i++) {
      text += LOREM_IPSUM_TEXT + '\n\n';
    }
    setGeneratedText(text.trim());
  };

  return (
    <ToolContainer
      title="Lorem Ipsum Generator"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-6">
        <div className="flex items-end gap-4 max-w-md">
          <div className="flex-1">
            <Label htmlFor="paragraphs">Number of Paragraphs</Label>
            <Input
              type="number"
              id="paragraphs"
              value={paragraphs}
              onChange={(e) =>
                setParagraphs(Math.max(1, parseInt(e.target.value, 10)))
              }
              className="w-full"
            />
          </div>
          <Button onClick={generateText}>Generate</Button>
        </div>
        {generatedText && (
          <div className="relative">
            <TextArea
              readOnly
              value={generatedText}
              className="h-96"
            />
            <CopyButton textToCopy={generatedText} className="absolute top-4 right-4" />
          </div>
        )}
      </div>
    </ToolContainer>
  );
};

export default LoremIpsumGenerator;

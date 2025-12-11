'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import { Type } from 'lucide-react';

const LOREM_IPSUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const LoremIpsumGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [paragraphs, setParagraphs] = useState(3);
  const [generatedText, setGeneratedText] = useState(
    Array(3).fill(LOREM_IPSUM_TEXT).join('\n\n')
  );

  const generateText = (count: number) => {
    let text = '';
    for (let i = 0; i < count; i++) {
      text += LOREM_IPSUM_TEXT + '\n\n';
    }
    setGeneratedText(text.trim());
  };

  const handleParagraphsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(1, parseInt(e.target.value, 10));
    setParagraphs(count);
    generateText(count);
  };

  return (
    <ToolContainer
      title="Lorem Ipsum Generator"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-6">
        <Card title="Controls">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Slider
                label={`Number of Paragraphs: ${paragraphs}`}
                min={1}
                max={20}
                value={paragraphs}
                onChange={handleParagraphsChange}
              />
            </div>
            <Button onClick={() => generateText(paragraphs)} variant="primary">
              <Type className="w-4 h-4 mr-2" /> Regenerate
            </Button>
          </div>
        </Card>

        {generatedText && (
          <Card className="p-0 overflow-hidden" title="Generated Text">
            <div className="relative">
              <TextArea
                readOnly
                value={generatedText}
                className="h-[500px] border-none focus:ring-0 rounded-none bg-gray-50 dark:bg-gray-900"
              />
              <div className="absolute top-2 right-2">
                <CopyButton textToCopy={generatedText} />
              </div>
            </div>
          </Card>
        )}
      </div>
    </ToolContainer>
  );
};

export default LoremIpsumGenerator;

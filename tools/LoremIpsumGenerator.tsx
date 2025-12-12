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

// Optimize text generation: Use Array.from + join for better performance than string concatenation
const generateText = (count: number) => {
  return Array.from({ length: count }, () => LOREM_IPSUM_TEXT).join('\n\n');
};

const LoremIpsumGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [paragraphs, setParagraphs] = useState(3);
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Initial generation
  React.useEffect(() => {
    setGeneratedText(generateText(3));
  }, []);

  // Debounced generation for slider
  React.useEffect(() => {
    setIsGenerating(true);
    const timeoutId = setTimeout(() => {
      setGeneratedText(generateText(paragraphs));
      setIsGenerating(false);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [paragraphs]);

  const handleParagraphsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(1, parseInt(e.target.value, 10));
    setParagraphs(count);
    // Removed direct generateText call to avoid blocking main thread on drag
  };

  const handleManualRegenerate = () => {
    setGeneratedText(generateText(paragraphs));
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
                max={50} // Increased max slightly as performance is better now
                value={paragraphs}
                onChange={handleParagraphsChange}
              />
            </div>
            <Button onClick={handleManualRegenerate} variant="primary">
              <Type className="w-4 h-4 mr-2" /> Regenerate
            </Button>
          </div>
        </Card>

        <Card className="p-0 overflow-hidden" title="Generated Text">
          <div className="relative">
            <div className={`transition-opacity duration-200 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
              <TextArea
                readOnly
                value={generatedText}
                className="h-[500px] border-none focus:ring-0 rounded-none bg-gray-50 dark:bg-gray-900"
              />
            </div>
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="px-3 py-1 bg-gray-800 text-white text-xs rounded-full opacity-70">
                  Generating...
                </div>
              </div>
            )}
            <div className="absolute top-2 right-2">
              <CopyButton textToCopy={generatedText} />
            </div>
          </div>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default LoremIpsumGenerator;

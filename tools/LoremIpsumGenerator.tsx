
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const LOREM_IPSUM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

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
    <ToolContainer title="Lorem Ipsum Generator" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label htmlFor="paragraphs" className="text-gray-700 dark:text-gray-300">Number of Paragraphs:</label>
          <input
            type="number"
            id="paragraphs"
            value={paragraphs}
            onChange={(e) => setParagraphs(Math.max(1, parseInt(e.target.value, 10)))}
            className="w-24 bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
          />
          <button onClick={generateText} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Generate</button>
        </div>
        {generatedText && (
          <div className="relative">
            <textarea
              readOnly
              value={generatedText}
              className="w-full h-64 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded p-2 text-gray-800 dark:text-gray-200"
            />
            <CopyButton textToCopy={generatedText} />
          </div>
        )}
      </div>
    </ToolContainer>
  );
};

export default LoremIpsumGenerator;

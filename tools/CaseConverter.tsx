
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const CaseConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleConvert = (type: string) => {
    switch (type) {
      case 'uppercase':
        setOutput(input.toUpperCase());
        break;
      case 'lowercase':
        setOutput(input.toLowerCase());
        break;
      case 'sentence':
        setOutput(toSentenceCase(input));
        break;
      case 'title':
        setOutput(toTitleCase(input));
        break;
      default:
        break;
    }
  };

  return (
    <ToolContainer title="Case Converter" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text here..."
            className="w-full h-32 bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
          />
          {input && <CopyButton textToCopy={input} className="absolute top-2 right-2" />}
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => handleConvert('uppercase')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">UPPER CASE</button>
          <button onClick={() => handleConvert('lowercase')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">lower case</button>
          <button onClick={() => handleConvert('sentence')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">Sentence case</button>
          <button onClick={() => handleConvert('title')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">Title Case</button>
        </div>
        <div className="relative">
          <textarea
            readOnly
            value={output}
            placeholder="Result..."
            className="w-full h-32 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded p-2 text-gray-800 dark:text-gray-200"
          />
          {output && <CopyButton textToCopy={output} className="absolute top-2 right-2" />}
        </div>
      </div>
    </ToolContainer>
  );
};

export default CaseConverter;

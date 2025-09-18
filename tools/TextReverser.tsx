
import React, { useState } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

const TextReverser: React.FC<ToolProps> = () => {
  const [input, setInput] = useState('');

  const reversedText = input.split('').reverse().join('');

  return (
    <ToolContainer title="Text Reverser">
      <div className="space-y-4">
        <div>
          <label htmlFor="input-text" className="block text-sm font-medium text-gray-300 mb-1">
            Original Text
          </label>
          <textarea
            id="input-text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to reverse..."
            className="w-full h-32 bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="output-text" className="block text-sm font-medium text-gray-300 mb-1">
            Reversed Text
          </label>
          <textarea
            id="output-text"
            readOnly
            value={reversedText}
            placeholder="Reversed text will appear here..."
            className="w-full h-32 bg-gray-900 border border-gray-600 rounded p-2 text-gray-200"
          />
        </div>
      </div>
    </ToolContainer>
  );
};

export default TextReverser;
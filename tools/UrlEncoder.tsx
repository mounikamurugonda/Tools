
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

const UrlEncoder: React.FC<ToolProps> = ({ details }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
      setError('');
    } catch (e) {
      setError('Failed to encode URL component.');
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError('');
    } catch (e) {
      setError('Failed to decode. The string may be malformed.');
      setOutput('');
    }
  };

  return (
    <ToolContainer title="URL Encoder/Decoder" details={details}>
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter URL component here..."
          className="w-full h-32 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
        />
        <div className="flex flex-wrap gap-2">
          <button onClick={handleEncode} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Encode</button>
          <button onClick={handleDecode} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">Decode</button>
        </div>
        {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
        <textarea
          readOnly
          value={output}
          placeholder="Result..."
          className="w-full h-32 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded p-2 text-gray-800 dark:text-gray-200"
        />
      </div>
    </ToolContainer>
  );
};

export default UrlEncoder;
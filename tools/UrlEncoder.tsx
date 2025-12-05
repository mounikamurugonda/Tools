'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const UrlEncoder: React.FC<ToolProps> = ({ details, toolId }) => {
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
    <ToolContainer
      title="URL Encoder/Decoder"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleEncode}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Encode
          </button>
          <button
            onClick={handleDecode}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Decode
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side - Input */}
          <div className="space-y-4">
            <div className="relative">
              <label
                htmlFor="url-input"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Input
              </label>
              <textarea
                id="url-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter URL component here..."
                className="w-full h-96 max-h-96 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 font-mono resize-none"
              />
              {input && (
                <CopyButton
                  textToCopy={input}
                  className="absolute top-8 right-2"
                />
              )}
            </div>
            {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
          </div>

          {/* Right side - Output */}
          <div className="space-y-4">
            <label
              htmlFor="url-output"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Output
            </label>
            <div className="relative">
              <textarea
                id="url-output"
                readOnly
                value={output}
                placeholder="Result will appear here..."
                className="w-full h-96 max-h-96 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-3 text-gray-800 dark:text-gray-200 font-mono resize-none"
              />
              {output && (
                <CopyButton
                  textToCopy={output}
                  className="absolute top-2 right-2"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default UrlEncoder;

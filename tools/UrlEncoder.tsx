'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';

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
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleEncode}>Encode</Button>
          <Button onClick={handleDecode} variant="secondary">Decode</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side - Input */}
          <div className="space-y-2">
            <Label htmlFor="url-input">Input</Label>
            <div className="relative">
              <TextArea
                id="url-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter URL component here..."
                className="h-96 max-h-96 font-mono"
              />
              {input && (
                <CopyButton
                  textToCopy={input}
                  className="absolute top-4 right-4"
                />
              )}
            </div>
            {error && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{error}</p>}
          </div>

          {/* Right side - Output */}
          <div className="space-y-2">
            <Label htmlFor="url-output">Output</Label>
            <div className="relative">
              <TextArea
                id="url-output"
                readOnly
                value={output}
                placeholder="Result will appear here..."
                className="h-96 max-h-96 bg-gray-50 dark:bg-gray-900 font-mono"
              />
              {output && (
                <CopyButton
                  textToCopy={output}
                  className="absolute top-4 right-4"
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

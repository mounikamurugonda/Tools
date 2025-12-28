'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import { ArrowLeftRight, Trash2 } from 'lucide-react';

const Base64Converter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      setOutput(btoa(input));
      setError('');
    } catch (e) {
      setError('Failed to encode. Invalid character found.');
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(atob(input));
      setError('');
    } catch (e) {
      setError('Failed to decode. Invalid Base64 string.');
      setOutput('');
    }
  };

  return (
    <ToolContainer title="Base64 Encoder/Decoder" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Controls" className="p-4">
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleEncode} variant="primary">
              Encode (to Base64)
            </Button>
            <Button onClick={handleDecode} variant="secondary">
              Decode (from Base64)
            </Button>
            <Button
              onClick={() => {
                setInput('');
                setOutput('');
                setError('');
              }}
              variant="ghost"
              className="ml-auto"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Clear All
            </Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side - Input */}
          <div className="space-y-2">
            <Label htmlFor="base64-input">Input</Label>
            <div className="relative">
              <TextArea
                id="base64-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Enter text or Base64 string here..."
                className="h-96 max-h-96 font-mono resize-none"
              />
              {input && (
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={input} />
                </div>
              )}
            </div>
            {error && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{error}</p>}
          </div>

          {/* Right side - Output */}
          <div className="space-y-2">
            <Label htmlFor="base64-output">Output</Label>
            <div className="relative">
              <TextArea
                id="base64-output"
                readOnly
                value={output}
                placeholder="Result will appear here..."
                className="h-96 max-h-96 bg-gray-50 dark:bg-gray-900 font-mono resize-none"
              />
              {output && (
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={output} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default Base64Converter;

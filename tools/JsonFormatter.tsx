'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';

const JsonFormatter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  const handleFormat = () => {
    if (!input.trim()) {
      setStatus({ type: 'idle', message: '' });
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setStatus({ type: 'success', message: 'Valid JSON' });
    } catch (e) {
      if (e instanceof Error) {
        setStatus({ type: 'error', message: `Invalid JSON: ${e.message}` });
      } else {
        setStatus({
          type: 'error',
          message: 'An unknown error occurred during parsing.',
        });
      }
      setOutput(input);
    }
  };

  const getStatusColor = () => {
    switch (status.type) {
      case 'success':
        return 'text-green-500 dark:text-green-400';
      case 'error':
        return 'text-red-500 dark:text-red-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  return (
    <ToolContainer
      title="JSON Formatter & Validator"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-3">
            <Button onClick={handleFormat}>Format / Beautify</Button>
            <Button
              onClick={() => {
                setInput('');
                setOutput('');
                setStatus({ type: 'idle', message: '' });
              }}
              variant="secondary"
            >
              Clear
            </Button>
          </div>
          <p className={`text-sm font-medium ${getStatusColor()}`}>
            {status.message || 'Ready'}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side - Input */}
          <div className="space-y-2">
            <Label htmlFor="json-input">JSON Input</Label>
            <div className="relative">
              <TextArea
                id="json-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="h-96 max-h-96 font-mono"
              />
              {input && (
                <CopyButton
                  textToCopy={input}
                  className="absolute top-4 right-4"
                />
              )}
            </div>
          </div>

          {/* Right side - Output */}
          <div className="space-y-2">
            <Label htmlFor="json-output">Formatted Output</Label>
            <div className="relative">
              <TextArea
                id="json-output"
                readOnly
                value={output}
                placeholder="Formatted JSON will appear here..."
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

export default JsonFormatter;

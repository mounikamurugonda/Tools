'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import FileUpload from '@/components/ui/FileUpload';
import { FileText, Trash, Upload } from 'lucide-react';

const JsonFormatter: React.FC<ToolProps> = ({ details, toolId, tool }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  // Auto-format whenever input changes
  useEffect(() => {
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
  }, [input]);

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

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setInput(text);
        setInputMode('text');
        // Auto-format for convenience
        try {
          const parsed = JSON.parse(text);
          setOutput(JSON.stringify(parsed, null, 2));
          setStatus({ type: 'success', message: 'Valid JSON' });
        } catch (e) {
          // Just set input if parse fails
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <ToolContainer title={tool?.name || 'JSON Formatter'} details={details} toolId={toolId}>
      <div className="space-y-6">

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side - Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="json-input">JSON Input</Label>
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setInput('');
                    setOutput('');
                    setStatus({ type: 'idle', message: '' });
                  }}
                  variant="ghost"
                  className='!p-0'
                >
                  <Trash className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setInputMode('text')}
                  title="Paste Text"
                  className='!p-0'
                >
                  <FileText className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className='!p-0 '
                  onClick={() => setInputMode('file')}
                  title="Upload File"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="relative">
              {inputMode === 'file' ? (
                <FileUpload onFileSelect={handleFileUpload} className="h-96" accept=".json,.txt" />
              ) : (
                <>
                  <TextArea
                    id="json-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Paste your JSON here..."
                    className="h-96 max-h-96 font-mono resize-none"
                  />
                  {input && (
                    <div className="absolute top-4 right-4 z-10">
                      <CopyButton textToCopy={input} />
                    </div>
                  )}
                </>
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
                className="h-96 max-h-96 bg-gray-50 dark:bg-gray-900 font-mono resize-none"
              />
              {output && (
                <div className="absolute top-4 right-4 z-10">
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

export default JsonFormatter;

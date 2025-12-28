'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import FileUpload from '@/components/ui/FileUpload';
import { FileText, Upload } from 'lucide-react';

type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-512';

const HashGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');

  const generateHash = async () => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
    try {
      setError('');
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setOutput(hashHex);
    } catch (e) {
      setError('Failed to generate hash. Your browser may not support the Web Crypto API.');
      setOutput('');
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setInput(text);
        setInputMode('text');
      }
    };
    reader.readAsText(file);
  };

  return (
    <ToolContainer title="Hash Generator" details={details} toolId={toolId}>
      <Card className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:w-1/3">
            <Label className="mb-2">Algorithm</Label>
            <Select value={algorithm} onChange={e => setAlgorithm(e.target.value as HashAlgorithm)}>
              <option value="SHA-1">SHA-1</option>
              <option value="SHA-256">SHA-256</option>
              <option value="SHA-512">SHA-512</option>
            </Select>
          </div>
          <Button onClick={generateHash} className="w-full sm:w-auto">
            Generate Hash
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Input Text</Label>
              <div className="flex gap-1">
                <Button
                  variant={inputMode === 'text' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setInputMode('text')}
                  title="Paste Text"
                >
                  <FileText className="w-4 h-4" />
                </Button>
                <Button
                  variant={inputMode === 'file' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setInputMode('file')}
                  title="Upload File"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="relative">
              {inputMode === 'file' ? (
                <FileUpload onFileSelect={handleFileUpload} className="h-96" />
              ) : (
                <>
                  <TextArea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Enter text here..."
                    className="h-96 resize-none"
                  />
                  {input && (
                    <div className="absolute top-2 right-2 z-10">
                      <CopyButton textToCopy={input} />
                    </div>
                  )}
                </>
              )}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Right side - Output */}
          <div className="space-y-4">
            <Label>Hash Output</Label>
            <div className="relative">
              <TextArea
                readOnly
                value={output}
                placeholder="Hash output will appear here..."
                className="h-96 resize-none font-mono bg-secondary/20"
              />
              {output && (
                <div className="absolute top-2 right-2 z-10">
                  <CopyButton textToCopy={output} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </ToolContainer>
  );
};

export default HashGenerator;

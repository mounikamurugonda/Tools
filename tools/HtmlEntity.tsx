'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import FileUpload from '@/components/ui/FileUpload';
import Label from '@/components/ui/Label';
import { FileText, Upload } from 'lucide-react';

const HtmlEntity: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('<h1>Hello & Welcome</h1>');
  const [output, setOutput] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');

  const encode = () => {
    setOutput(input.replace(/[\u00A0-\u9999<>&]/g, i => '&#' + i.charCodeAt(0) + ';'));
  };

  const decode = () => {
    const txt = document.createElement('textarea');
    txt.innerHTML = input;
    setOutput(txt.value);
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
    <ToolContainer title="HTML Entity Encoder/Decoder" details={details} toolId={toolId}>
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
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

          {inputMode === 'file' ? (
            <FileUpload onFileSelect={handleFileUpload} className="h-40" accept=".html,.xml,.txt" />
          ) : (
            <TextArea
              value={input}
              onChange={e => setInput(e.target.value)}
              className="h-40"
              placeholder="Input text..."
            />
          )}

          <div className="flex gap-4">
            <Button onClick={encode} className="flex-1">
              Encode
            </Button>
            <Button onClick={decode} variant="secondary" className="flex-1">
              Decode
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Output</Label>
            <div className="relative">
              <TextArea
                readOnly
                value={output}
                className="h-40 bg-secondary/20"
                placeholder="Output..."
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

export default HtmlEntity;

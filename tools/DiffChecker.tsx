'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import * as Diff from 'diff';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import FileUpload from '@/components/ui/FileUpload';
import Label from '@/components/ui/Label';
import { FileText, Upload } from 'lucide-react';

const DiffChecker: React.FC<ToolProps> = ({ details, toolId }) => {
  const [originalText, setOriginalText] = useState(
    'Hello World\nThis is the original text.\nIt has three lines.',
  );
  const [changedText, setChangedText] = useState(
    'Hello There\nThis is the new text.\nIt also has three lines.',
  );

  const [inputModeOriginal, setInputModeOriginal] = useState<'text' | 'file'>('text');
  const [inputModeChanged, setInputModeChanged] = useState<'text' | 'file'>('text');

  const diffResult = useMemo(() => {
    return Diff.diffLines(originalText, changedText);
  }, [originalText, changedText]);

  const handleFileUpload = (file: File, setText: (t: string) => void, setMode: (m: 'text' | 'file') => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setText(text);
        setMode('text');
      }
    };
    reader.readAsText(file);
  };

  return (
    <ToolContainer title="Diff Checker" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6 h-[50vh]">
          {/* Original Text Column */}
          <div className="flex flex-col h-full gap-2">
            <div className="flex justify-between items-center">
              <Label>Original Text</Label>
              <div className="flex gap-1">
                <Button
                  variant={inputModeOriginal === 'text' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setInputModeOriginal('text')}
                  title="Paste Text"
                >
                  <FileText className="w-4 h-4" />
                </Button>
                <Button
                  variant={inputModeOriginal === 'file' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setInputModeOriginal('file')}
                  title="Upload File"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {inputModeOriginal === 'file' ? (
              <div className="h-full">
                <FileUpload
                  onFileSelect={(file) => handleFileUpload(file, setOriginalText, setInputModeOriginal)}
                  className="h-full flex flex-col justify-center"
                  accept=".txt,.js,.ts,.tsx,.json,.md,.html,.css,.csv,.xml"
                />
              </div>
            ) : (
              <div className="relative h-full">
                <TextArea
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  placeholder="Original text"
                  className="h-full resize-none font-mono text-sm"
                />
                {originalText && (
                  <div className="absolute top-2 right-2 z-10">
                    <CopyButton textToCopy={originalText} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Changed Text Column */}
          <div className="flex flex-col h-full gap-2">
            <div className="flex justify-between items-center">
              <Label>Changed Text</Label>
              <div className="flex gap-1">
                <Button
                  variant={inputModeChanged === 'text' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setInputModeChanged('text')}
                  title="Paste Text"
                >
                  <FileText className="w-4 h-4" />
                </Button>
                <Button
                  variant={inputModeChanged === 'file' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setInputModeChanged('file')}
                  title="Upload File"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {inputModeChanged === 'file' ? (
              <div className="h-full">
                <FileUpload
                  onFileSelect={(file) => handleFileUpload(file, setChangedText, setInputModeChanged)}
                  className="h-full flex flex-col justify-center"
                  accept=".txt,.js,.ts,.tsx,.json,.md,.html,.css,.csv,.xml"
                />
              </div>
            ) : (
              <div className="relative h-full">
                <TextArea
                  value={changedText}
                  onChange={(e) => setChangedText(e.target.value)}
                  placeholder="Changed text"
                  className="h-full resize-none font-mono text-sm"
                />
                {changedText && (
                  <div className="absolute top-2 right-2 z-10">
                    <CopyButton textToCopy={changedText} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <Card className="p-4">
          <Label className="mb-2 block">Differences</Label>
          <pre className="w-full h-[40vh] bg-secondary/30 border border-border rounded-lg p-4 text-sm font-mono overflow-auto whitespace-pre-wrap break-all">
            {diffResult.map((part, index) => {
              const color = part.added
                ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                : part.removed
                  ? 'bg-red-500/20 text-red-700 dark:text-red-300'
                  : 'text-foreground';
              const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';
              return (
                <span key={index} className={`block ${color}`}>
                  {part.value
                    .split('\n')
                    .filter(
                      (line: string, i: number) =>
                        i < part.value.split('\n').length - 1 || line !== '',
                    )
                    .map((line: string, lineIndex: number) => (
                      <span key={lineIndex} className="block">
                        <span className="select-none inline-block w-6 opacity-50">{prefix}</span>
                        <span>{line}</span>
                      </span>
                    ))}
                </span>
              );
            })}
          </pre>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default DiffChecker;

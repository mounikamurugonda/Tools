'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import FileUpload from '@/components/ui/FileUpload';
import { FileText, Upload } from 'lucide-react';

const SqlFormatter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('SELECT * FROM users WHERE id = 1 ORDER BY created_at DESC');
  const [output, setOutput] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');

  const formatSql = () => {
    let formatted = input
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*([,()])\s*/g, '$1 ') // Fix spacing around punctuation
      .replace(/\s*(\()\s*/g, ' ( ')
      .replace(/\s*(\))\s*/g, ' ) ')
      .replace(
        /(SELECT|FROM|WHERE|GROUP BY|ORDER BY|INSERT INTO|UPDATE|DELETE|HAVING|LIMIT|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN|UNION|VALUES|SET)/gi,
        '\n$1'
      )
      .trim();

    // Simple indentation
    const lines = formatted.split('\n');
    formatted = lines.map(line => line.trim()).join('\n');

    setOutput(formatted);
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
    <ToolContainer title="SQL Formatter" details={details} toolId={toolId}>
      <Card className=" mx-auto p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>SQL Input</Label>
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
              <FileUpload onFileSelect={handleFileUpload} className="h-64" accept=".sql,.txt" />
            ) : (
              <TextArea
                value={input}
                onChange={e => setInput(e.target.value)}
                className="w-full h-64 font-mono text-sm resize-none"
                placeholder="Enter SQL here..."
              />
            )}
          </div>

          <div className="relative space-y-2">
            <Label>Formatted SQL</Label>
            <div className="relative">
              <TextArea
                readOnly
                value={output}
                className="w-full h-64 bg-secondary/20 font-mono text-sm text-blue-600 dark:text-blue-400 resize-none"
                placeholder="Formatted SQL..."
              />
              {output && (
                <div className="absolute top-2 right-2 z-10">
                  <CopyButton textToCopy={output} />
                </div>
              )}
            </div>
          </div>
        </div>
        <Button onClick={formatSql} className="w-full">
          Format SQL
        </Button>
      </Card>
    </ToolContainer>
  );
};

export default SqlFormatter;

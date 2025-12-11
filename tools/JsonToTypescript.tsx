'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import FileUpload from '@/components/ui/FileUpload';
import { FileText, Upload } from 'lucide-react';

const JsonToTypescript: React.FC<ToolProps> = ({ details, toolId }) => {
  const [jsonInput, setJsonInput] = useState(
    '{\n  "id": 1,\n  "name": "UtilToolkits",\n  "features": ["Free", "Fast"],\n  "active": true\n}',
  );
  const [tsOutput, setTsOutput] = useState('');
  const [interfaceName, setInterfaceName] = useState('RootObject');
  const [error, setError] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');

  // Helper functions moved inside but could be outside if pure.
  // Keeping them pure and synchronous for simplicity, but we will wrap execution.
  const getType = (value: any): string => {
    if (value === null) return 'any';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      const type = getType(value[0]);
      return `${type}[]`;
    }
    if (typeof value === 'object') return 'object';
    return typeof value;
  };

  const generateInterface = (obj: any, name: string): string => {
    let output = `export interface ${name} {\n`;
    const nestedInterfaces: string[] = [];

    Object.entries(obj).forEach(([key, value]) => {
      let type = getType(value);

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const nestedName = key.charAt(0).toUpperCase() + key.slice(1);
        type = nestedName;
        nestedInterfaces.push(generateInterface(value, nestedName));
      } else if (
        Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === 'object'
      ) {
        const nestedName = key.charAt(0).toUpperCase() + key.slice(1) + 'Item';
        type = `${nestedName}[]`;
        nestedInterfaces.push(generateInterface(value[0], nestedName));
      }

      output += `  ${key}: ${type};\n`;
    });

    output += '}\n';
    return nestedInterfaces.join('\n') + '\n' + output;
  };

  const handleConvert = async () => {
    setError('');
    setIsConverting(true);

    // Use setTimeout to allow the UI to show the loading state before blocking
    setTimeout(() => {
      try {
        if (!jsonInput.trim()) {
          setTsOutput('');
          setIsConverting(false);
          return;
        }
        const parsed = JSON.parse(jsonInput);
        const result = generateInterface(parsed, interfaceName);
        setTsOutput(result.trim());
      } catch (e) {
        setError('Invalid JSON input');
        setTsOutput('');
      } finally {
        setIsConverting(false);
      }
    }, 10);
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setJsonInput(text);
        setInputMode('text');
      }
    };
    reader.readAsText(file);
  };

  return (
    <ToolContainer title="JSON to TypeScript" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card className="p-4 bg-secondary/10">
          <div className="flex gap-4 items-end">
            <div className="flex-grow">
              <Label className="mb-2">
                Root Interface Name
              </Label>
              <Input
                type="text"
                value={interfaceName}
                onChange={(e) => setInterfaceName(e.target.value)}
              />
            </div>
            <Button
              onClick={handleConvert}
              disabled={isConverting}
              className="h-11"
            >
              {isConverting ? 'Processing...' : 'Convert'}
            </Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 h-[50vh]">
          <div className="relative flex flex-col h-full gap-2">
            <div className="flex justify-between items-center">
              <Label>JSON Input</Label>
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
              <div className="h-full">
                <FileUpload
                  onFileSelect={handleFileUpload}
                  className="h-full"
                  accept=".json,.txt"
                />
              </div>
            ) : (
              <TextArea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="flex-grow w-full resize-none font-mono text-sm"
                placeholder="Paste JSON here..."
              />
            )}
          </div>
          <div className="relative flex flex-col h-full gap-2">
            <Label>
              TypeScript Output
            </Label>
            <div className="relative flex-grow">
              <TextArea
                readOnly
                value={tsOutput}
                className="w-full h-full bg-secondary/20 resize-none font-mono text-sm text-blue-600 dark:text-blue-400"
                placeholder="TypeScript interfaces will appear here..."
              />
              {tsOutput && (
                <div className="absolute top-2 right-2 z-10">
                  <CopyButton textToCopy={tsOutput} />
                </div>
              )}
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 text-center font-medium bg-red-100 dark:bg-red-900/30 p-2 rounded">{error}</p>}
      </div>
    </ToolContainer>
  );
};

export default JsonToTypescript;

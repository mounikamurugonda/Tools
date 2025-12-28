'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import { ArrowLeftRight, Trash2 } from 'lucide-react';

type ConversionMode = 'json-to-yaml' | 'yaml-to-json';

const JsonYamlConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [mode, setMode] = useState<ConversionMode>('json-to-yaml');
  const [input, setInput] = useState('{"name": "John", "age": 30, "skills": ["React", "Next.js"]}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const jsonToYaml = (jsonStr: string) => {
    const obj = JSON.parse(jsonStr);

    // Simple recursive stringifier
    const toYaml = (data: any, indent = 0): string => {
      const space = '  '.repeat(indent);
      if (data === null) return 'null';
      if (typeof data !== 'object') return String(data);

      if (Array.isArray(data)) {
        return data
          .map(
            item =>
              `${space}- ${typeof item === 'object' ? '\n' + toYaml(item, indent + 1) : String(item)}`
          )
          .join('\n');
      }

      return Object.entries(data)
        .map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return `${space}${key}:\n${toYaml(value, indent + 1)}`;
          }
          return `${space}${key}: ${value}`;
        })
        .join('\n');
    };

    return toYaml(obj);
  };

  const yamlToJson = (yamlStr: string) => {
    const lines = yamlStr.split('\n');
    const obj: any = {};
    lines.forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim().replace(/^- /, ''); // handle list item start loosely
        const val = parts.slice(1).join(':').trim();
        if (key) obj[key] = val; // Simply treats it as flat object
      }
    });
    return obj;
  };

  const handleConvert = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      let result = '';
      if (mode === 'json-to-yaml') {
        result = jsonToYaml(input);
      } else {
        const obj = yamlToJson(input);
        result = JSON.stringify(obj, null, 2);
      }
      setOutput(result);
    } catch (e) {
      setError(
        'Conversion failed. Input format might be invalid or too complex for this basic parser.'
      );
      setOutput('');
    }
  };

  const swapMode = () => {
    const newMode = mode === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml';
    setMode(newMode);
    if (output && !error) {
      setInput(output);
      setOutput('');
    } else {
      if (newMode === 'json-to-yaml') setInput('{"name": "John", "age": 30}');
      else setInput('name: John\nage: 30');
      setOutput('');
    }
  };

  return (
    <ToolContainer title="JSON <> YAML Converter" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button onClick={swapMode} variant="outline" className="w-full sm:w-auto">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            {mode === 'json-to-yaml' ? 'Switch to YAML to JSON' : 'Switch to JSON to YAML'}
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button onClick={handleConvert} variant="primary" className="flex-1 sm:flex-none">
              Convert
            </Button>
            <Button onClick={() => setInput('')} variant="ghost">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>{mode === 'json-to-yaml' ? 'JSON Input' : 'YAML Input'}</Label>
            <div className="relative">
              <TextArea
                value={input}
                onChange={e => setInput(e.target.value)}
                className="h-96 resize-none font-mono text-sm"
                placeholder="Enter data here..."
              />
              {input && (
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={input} />
                </div>
              )}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label>{mode === 'json-to-yaml' ? 'YAML Output' : 'JSON Output'}</Label>
            <div className="relative">
              <TextArea
                value={output}
                readOnly
                className="h-96 resize-none font-mono text-sm bg-gray-50 dark:bg-gray-900"
                placeholder="Result..."
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

export default JsonYamlConverter;

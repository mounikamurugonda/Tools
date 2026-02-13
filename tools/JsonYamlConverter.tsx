'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { ArrowLeftRight } from 'lucide-react';

type ConversionMode = 'json-to-yaml' | 'yaml-to-json';

const JsonYamlConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [mode, setMode] = useState<ConversionMode>('json-to-yaml');
  const [input, setInput] = useState('{"name": "John", "age": 30, "skills": ["React", "Next.js"]}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  // Keep existing logic
  const jsonToYaml = (jsonStr: string) => {
    try {
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
    } catch (e) { throw e; }
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
        const obj = yamlToJson(input); // This is basic custom parser
        result = JSON.stringify(obj, null, 2);
      }
      setOutput(result);
    } catch (e) {
      // Don't clear output on intermediate error?
      // setError('Conversion failed.'); 
      // setOutput('');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleConvert();
    }, 500);
    return () => clearTimeout(timer);
  }, [input, mode]);

  const swapMode = () => {
    const newMode = mode === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml';
    setMode(newMode);
    setInput(output); // simple swap logic
    // Auto-convert will trigger on new input
  };

  const headerOptions = (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
      <Button onClick={swapMode} variant="secondary" className="w-full sm:w-auto" title="Swap Mode">
        <ArrowLeftRight className="w-4 h-4 mr-2" />
        Swap: {mode === 'json-to-yaml' ? 'JSON → YAML' : 'YAML → JSON'}
      </Button>
    </div>
  );

  return (
    <ConverterLayout
      title="JSON <> YAML Converter"
      details={details}
      toolId={toolId}
      options={headerOptions}
      actions={null}
      editorInput={{
        value: input,
        onChange: setInput,
        language: mode === 'json-to-yaml' ? 'json' : 'yaml',
        label: mode === 'json-to-yaml' ? 'JSON Input' : 'YAML Input',
        fileUpload: true,
        acceptFileTypes: mode === 'json-to-yaml' ? '.json,.txt' : '.yaml,.yml,.txt',
        placeholder: `Paste ${mode === 'json-to-yaml' ? 'JSON' : 'YAML'} here...`,
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: mode === 'json-to-yaml' ? 'yaml' : 'json',
        label: mode === 'json-to-yaml' ? 'YAML Output' : 'JSON Output',
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
    />
  );
};

export default JsonYamlConverter;

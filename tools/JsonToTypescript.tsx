'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';

const JsonToTypescript: React.FC<ToolProps> = ({ details, toolId }) => {
  const [jsonInput, setJsonInput] = useState(
    '{\n  "id": 1,\n  "name": "UtilToolkits",\n  "features": ["Free", "Fast"],\n  "active": true\n}'
  );
  const [tsOutput, setTsOutput] = useState('');
  const [error, setError] = useState('');

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

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const nestedName = key.charAt(0).toUpperCase() + key.slice(1);
        type = nestedName;
        nestedInterfaces.push(generateInterface(value, nestedName));
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
        const nestedName = key.charAt(0).toUpperCase() + key.slice(1) + 'Item';
        type = `${nestedName}[]`;
        nestedInterfaces.push(generateInterface(value[0], nestedName));
      }

      output += `  ${key}: ${type};\n`;
    });

    output += '}\n';
    return nestedInterfaces.join('\n') + '\n' + output;
  };

  const handleConvert = () => {
    try {
      if (!jsonInput.trim()) {
        setTsOutput('');
        return;
      }
      const parsed = JSON.parse(jsonInput);
      const result = generateInterface(parsed, 'RootObject');
      setTsOutput(result.trim());
      setError('');
    } catch (e) {
      setError('Invalid JSON input');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleConvert();
    }, 500);
    return () => clearTimeout(timer);
  }, [jsonInput]);

  return (
    <ConverterLayout
      title="JSON to TypeScript"
      details={details}
      toolId={toolId}
      editorInput={{
        value: jsonInput,
        onChange: setJsonInput,
        language: 'json',
        label: 'JSON Input',
        fileUpload: true,
        acceptFileTypes: '.json,.txt',
        placeholder: 'Paste JSON here...',
        clearable: true,
      }}
      editorOutput={{
        value: tsOutput,
        language: 'typescript',
        label: 'TypeScript Output',
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
      actions={
        error ? (
          <div className="text-red-500 text-xs text-center p-2 bg-red-50 rounded border border-red-100 dark:bg-red-900/20 dark:border-red-900/50">
            {error}
          </div>
        ) : null
      }
    />
  );
};

export default JsonToTypescript;

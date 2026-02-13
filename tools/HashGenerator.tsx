'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Select from '@/components/ui/Select';
import Label from '@/components/ui/Label';

type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-512';

const HashGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

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

  useEffect(() => {
    generateHash();
  }, [input, algorithm]);

  const headerOptions = (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="w-full max-w-xs">
        <Label className="mb-2 block">Algorithm</Label>
        <Select
          value={algorithm}
          onChange={e => setAlgorithm(e.target.value as HashAlgorithm)}
          className="w-full bg-white dark:bg-gray-800"
        >
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-512">SHA-512</option>
        </Select>
      </div>
    </div>
  );

  return (
    <ConverterLayout
      title="Hash Generator"
      details={details}
      toolId={toolId}
      options={headerOptions}
      actions={
        error ? (
          <div className="text-red-500 text-xs text-center p-2 bg-red-50 rounded border border-red-100 dark:bg-red-900/20 dark:border-red-900/50">
            {error}
          </div>
        ) : null
      }
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'plaintext',
        label: 'Input Text',
        fileUpload: true,
        acceptFileTypes: '.txt',
        placeholder: 'Enter text to hash...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'plaintext',
        label: 'Hash Output',
        readOnly: true,
        placeholder: 'Hash will appear here...',
      }}
    />
  );
};

export default HashGenerator;

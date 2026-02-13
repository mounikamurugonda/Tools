'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { Trash2, ArrowRight } from 'lucide-react';

// ... imports

const JsonFormatter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('{"name":"John","age":30,"city":"New York"}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (e) {
      setError('Invalid JSON');
      // output remains stale or empty?
      // best to keep stale output if error is transient typing
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleFormat();
    }, 500);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <ConverterLayout
      title="JSON Formatter"
      details={details}
      toolId={toolId}
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
        language: 'json',
        label: 'JSON Input',
        fileUpload: true,
        acceptFileTypes: '.json,.txt',
        placeholder: 'Paste JSON here...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'json',
        label: 'Formatted JSON',
        readOnly: true,
        placeholder: 'Formatted JSON will appear here...',
      }}
    />
  );
};

export default JsonFormatter;

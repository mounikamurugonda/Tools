'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { Trash2, ArrowRight } from 'lucide-react';
import { format } from 'sql-formatter';

const SqlFormatter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('SELECT * FROM users WHERE id = 1');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const formatted = format(input, {
        language: 'sql',
        tabWidth: 2,
        keywordCase: 'upper',
        linesBetweenQueries: 2,
        indentStyle: 'tabularLeft',
      });
      setOutput(formatted);
      setError('');
    } catch (e) {
      console.error(e);
      // Don't clear output on error while typing, maybe show error toast or small text?
      setError('Invalid SQL');
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
      title="SQL Formatter"
      details={details}
      toolId={toolId}
      // If error exists, maybe show it in actions area?
      // Or in input/output area?
      // ConverterLayout supports actions as ReactNode. I can put error message there.
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
        language: 'sql',
        label: 'Input SQL',
        fileUpload: true,
        acceptFileTypes: '.sql,.txt',
        placeholder: 'Enter SQL here...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'sql',
        label: 'Formatted SQL',
        readOnly: true,
        placeholder: 'Formatted SQL will appear here...',
      }}
    />
  );
};

export default SqlFormatter;

'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { Trash2, ArrowRight } from 'lucide-react';
import * as prettier from 'prettier/standalone';
import parserXml from '@prettier/plugin-xml';

// ... imports

const XmlFormatter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('<root><child>text</child></root>');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = async () => {
    try {
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const formatted = await prettier.format(input, {
        parser: 'xml',
        plugins: [parserXml],
        tabWidth: 2,
        xmlSelfClosingSpace: true,
      });
      setOutput(formatted);
      setError('');
    } catch (e) {
      console.error(e);
      setError('Invalid XML');
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
      title="XML Formatter"
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
        language: 'xml',
        label: 'Input XML',
        fileUpload: true,
        acceptFileTypes: '.xml,.txt',
        placeholder: 'Paste XML here...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'xml',
        label: 'Formatted XML',
        readOnly: true,
        placeholder: 'Formatted XML will appear here...',
      }}
    />
  );
};

export default XmlFormatter;

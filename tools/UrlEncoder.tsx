'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { ArrowLeftRight, Trash2 } from 'lucide-react';

// ... imports

const UrlEncoder: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleConvert = () => {
    if (!input) {
      setOutput('');
      return;
    }
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      setError('Invalid input for URL operation.');
    }
  };

  React.useEffect(() => {
    handleConvert();
  }, [input, mode]);

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    // output clears, then loop
  };

  const actionSection = (
    <div className="flex flex-col gap-3 w-full lg:w-40">
      <Button onClick={swapMode} variant="secondary" className="w-full" title="Swap Mode">
        <ArrowLeftRight className="w-4 h-4 mr-2" /> Swap
      </Button>
      <div className="text-center">
        <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
          {mode.toUpperCase()} MODE
        </span>
      </div>
      {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
    </div>
  );

  return (
    <ConverterLayout
      title="URL Encoder/Decoder"
      details={details}
      toolId={toolId}
      actions={actionSection}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'plaintext',
        label: 'Input',
        placeholder: 'Enter URL component here...',
        clearable: true,
      }}
      editorOutput={{
        value: output,
        language: 'plaintext',
        label: 'Output',
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
    />
  );
};

export default UrlEncoder;

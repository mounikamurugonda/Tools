
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const JsonFormatter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  const handleFormat = () => {
    if (!input.trim()) {
      setStatus({ type: 'idle', message: '' });
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setStatus({ type: 'success', message: 'Valid JSON' });
    } catch (e) {
      if (e instanceof Error) {
        setStatus({ type: 'error', message: `Invalid JSON: ${e.message}` });
      } else {
        setStatus({ type: 'error', message: 'An unknown error occurred during parsing.' });
      }
      setOutput(input);
    }
  };

  const getStatusColor = () => {
    switch (status.type) {
      case 'success': return 'text-green-500 dark:text-green-400';
      case 'error': return 'text-red-500 dark:text-red-400';
      default: return 'text-gray-500 dark:text-gray-400';
    }
  };

  return (
    <ToolContainer title="JSON Formatter & Validator" details={details} toolId={toolId} fullHeight>
      <div className="flex items-center gap-4 mb-4">
        <button onClick={handleFormat} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Format / Beautify</button>
        <button onClick={() => { setInput(''); setOutput(''); setStatus({ type: 'idle', message: '' }); }} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded">Clear</button>
        <p className={`text-sm ${getStatusColor()}`}>{status.message || 'Ready'}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 flex-1">
        <div className="flex flex-col h-full relative">
          <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">JSON Input</label>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 font-mono"
          />
          {input && <CopyButton textToCopy={input} className="absolute top-8 right-2" />}
        </div>
        <div className="flex flex-col h-full">
          <label htmlFor="json-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Formatted Output</label>
          <div className="relative flex-1">
            <textarea
              id="json-output"
              readOnly
              value={output}
              placeholder="Formatted JSON will appear here..."
              className="w-full h-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded p-2 text-gray-800 dark:text-gray-200 font-mono"
            />
            {output && <CopyButton textToCopy={output} className="absolute top-2 right-2" />}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default JsonFormatter;

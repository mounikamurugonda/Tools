
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

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
    <ToolContainer title="JSON Formatter & Validator" details={details} toolId={toolId}>
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="w-full h-48 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 font-mono"
        />
        <div className="flex items-center gap-4">
          <button onClick={handleFormat} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Format / Validate</button>
          {status.type !== 'idle' && (
            <div className={`p-2 rounded ${getStatusColor()}`}>
              {status.message}
            </div>
          )}
        </div>
        <textarea
          readOnly
          value={output}
          placeholder="Formatted JSON will appear here..."
          className="w-full h-64 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded p-2 text-gray-800 dark:text-gray-200 font-mono"
        />
      </div>
    </ToolContainer>
  );
};

export default JsonFormatter;

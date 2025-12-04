
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const SqlFormatter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('SELECT * FROM users WHERE id = 1 ORDER BY created_at DESC');
  const [output, setOutput] = useState('');

  const formatSql = () => {
    let formatted = input
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*([,()])\s*/g, '$1 ') // Fix spacing around punctuation
      .replace(/\s*(\()\s*/g, ' ( ')
      .replace(/\s*(\))\s*/g, ' ) ')
      .replace(/(SELECT|FROM|WHERE|GROUP BY|ORDER BY|INSERT INTO|UPDATE|DELETE|HAVING|LIMIT|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN|UNION|VALUES|SET)/gi, '\n$1')
      .trim();
      
    // Simple indentation
    const lines = formatted.split('\n');
    formatted = lines.map(line => line.trim()).join('\n');
    
    setOutput(formatted);
  };

  return (
    <ToolContainer title="SQL Formatter" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-64 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-3 font-mono text-sm"
                placeholder="Enter SQL here..."
            />
            <div className="relative">
                <textarea
                    readOnly
                    value={output}
                    className="w-full h-64 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-3 font-mono text-sm text-blue-600 dark:text-blue-400"
                    placeholder="Formatted SQL..."
                />
                {output && <CopyButton textToCopy={output} className="absolute top-2 right-2" />}
            </div>
        </div>
        <button onClick={formatSql} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">Format SQL</button>
      </div>
    </ToolContainer>
  );
};

export default SqlFormatter;

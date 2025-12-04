
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const StringEscaper: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('Hello "World" & <Friends>');
  const [mode, setMode] = useState('json');

  const getEscaped = () => {
    switch (mode) {
        case 'json': return JSON.stringify(input).slice(1, -1);
        case 'html': return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        case 'url': return encodeURIComponent(input);
        case 'java': return input.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        default: return input;
    }
  };

  const output = getEscaped();

  return (
    <ToolContainer title="String Escaper" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
            {['json', 'html', 'url', 'java'].map(m => (
                <button 
                    key={m} 
                    onClick={() => setMode(m)} 
                    className={`px-4 py-1 rounded capitalize ${mode === m ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                >
                    {m}
                </button>
            ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-48 brand-input" placeholder="Input string..." />
            <div className="relative">
                <textarea readOnly value={output} className="w-full h-48 brand-input bg-gray-50 dark:bg-gray-900" />
                <CopyButton textToCopy={output} className="absolute top-2 right-2" />
            </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default StringEscaper;

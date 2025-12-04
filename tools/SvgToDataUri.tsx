
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const SvgToDataUri: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>');
  const [encoded, setEncoded] = useState('');

  const encode = () => {
    const uri = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(input);
    setEncoded(uri);
  };

  return (
    <ToolContainer title="SVG to Data URI" details={details} toolId={toolId}>
      <div className="space-y-4">
        <textarea 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className="w-full h-32 brand-input font-mono text-sm" 
            placeholder="Paste SVG code here..."
        />
        <button onClick={encode} className="px-4 py-2 bg-blue-600 text-white rounded">Convert</button>
        {encoded && (
            <div className="relative">
                <textarea readOnly value={encoded} className="w-full h-32 brand-input bg-gray-50 dark:bg-gray-900 break-all" />
                <CopyButton textToCopy={encoded} className="absolute top-2 right-2" />
                <div className="mt-4">
                    <p className="mb-2 font-medium">Preview (as Background Image):</p>
                    <div className="w-full h-16 border rounded bg-gray-100" style={{ backgroundImage: `url("${encoded}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                </div>
            </div>
        )}
      </div>
    </ToolContainer>
  );
};

export default SvgToDataUri;

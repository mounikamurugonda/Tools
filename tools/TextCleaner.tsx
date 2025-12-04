
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const TextCleaner: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('  This   is  a   messy\n\ntext file.  ');
  
  const clean = () => {
    let res = text;
    res = res.replace(/\s+/g, ' '); // Extra spaces
    res = res.trim();
    setText(res);
  };

  const removeLines = () => {
    setText(text.replace(/(\r\n|\n|\r)/gm, " "));
  };

  return (
    <ToolContainer title="Text Cleaner" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div className="flex gap-2">
            <button onClick={clean} className="px-4 py-2 bg-blue-600 text-white rounded">Remove Extra Spaces</button>
            <button onClick={removeLines} className="px-4 py-2 bg-green-600 text-white rounded">Remove Line Breaks</button>
            <button onClick={() => setText(text.toUpperCase())} className="px-4 py-2 bg-gray-600 text-white rounded">UPPERCASE</button>
            <button onClick={() => setText(text.toLowerCase())} className="px-4 py-2 bg-gray-600 text-white rounded">lowercase</button>
        </div>
        <textarea 
            value={text} 
            onChange={e => setText(e.target.value)} 
            className="w-full h-64 brand-input" 
        />
      </div>
    </ToolContainer>
  );
};

export default TextCleaner;

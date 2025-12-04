
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const SlugGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');
  
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return (
    <ToolContainer title="Slug Generator" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium mb-1">String to Slugify</label>
            <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                className="brand-input" 
                placeholder="Hello World! This is a Title."
            />
        </div>
        
        <div className="relative">
            <label className="block text-sm font-medium mb-1">Generated Slug</label>
            <input readOnly value={slug} className="brand-input bg-gray-50 dark:bg-gray-900" />
            {slug && <CopyButton textToCopy={slug} className="absolute top-7 right-2" />}
        </div>
      </div>
    </ToolContainer>
  );
};

export default SlugGenerator;

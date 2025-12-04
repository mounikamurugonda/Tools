
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const MetaTagGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');

  const output = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">
<meta name="viewport" content="width=device-width, initial-scale=1">`;

  return (
    <ToolContainer title="Meta Tag Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Page Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className="brand-input" maxLength={60} />
                <p className="text-xs text-right text-gray-500">{title.length}/60</p>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="brand-input h-24" maxLength={160} />
                <p className="text-xs text-right text-gray-500">{description.length}/160</p>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Keywords (comma separated)</label>
                <input value={keywords} onChange={e => setKeywords(e.target.value)} className="brand-input" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <input value={author} onChange={e => setAuthor(e.target.value)} className="brand-input" />
            </div>
        </div>
        <div className="relative">
            <label className="block text-sm font-medium mb-1">HTML Code</label>
            <textarea readOnly value={output} className="w-full h-full min-h-[300px] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-3 font-mono text-sm" />
            <CopyButton textToCopy={output} className="absolute top-8 right-2" />
        </div>
      </div>
    </ToolContainer>
  );
};

export default MetaTagGenerator;

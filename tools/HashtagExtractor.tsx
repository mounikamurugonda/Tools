
'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const HashtagExtractor: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('Loving the new #coding tools! #developer #react #nextjs');
  
  const hashtags = useMemo(() => {
    const matches = text.match(/#[a-zA-Z0-9_]+/g);
    return matches ? Array.from(new Set(matches)) : [];
  }, [text]);

  return (
    <ToolContainer title="Hashtag Extractor" details={details} toolId={toolId}>
      <div className="space-y-6">
        <textarea 
            value={text} 
            onChange={e => setText(e.target.value)} 
            className="w-full h-40 brand-input" 
            placeholder="Paste text with hashtags..." 
        />
        
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Extracted Hashtags ({hashtags.length})</h3>
                {hashtags.length > 0 && <CopyButton textToCopy={hashtags.join(' ')} />}
            </div>
            
            {hashtags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {hashtags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 italic">No hashtags found.</p>
            )}
        </div>
      </div>
    </ToolContainer>
  );
};

export default HashtagExtractor;

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

declare const marked: any;

const MarkdownPreviewer: React.FC<ToolProps> = () => {
  const [markdown, setMarkdown] = useState(`# Hello, Markdown!

**This is a real-time Markdown previewer.**

- Write Markdown on the left.
- See the rendered HTML on the right.

[marked.js](https://marked.js.org/) is used for the conversion.
`);

  const renderedHtml = useMemo(() => {
    if (typeof marked !== 'undefined') {
      return marked.parse(markdown);
    }
    return 'Loading Markdown library...';
  }, [markdown]);

  return (
    <ToolContainer title="Markdown Previewer">
      <div className="grid md:grid-cols-2 gap-4 h-[60vh]">
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Enter Markdown here..."
          className="w-full h-full bg-gray-700 border border-gray-600 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 font-mono resize-none"
          aria-label="Markdown Input"
        />
        <div 
          className="w-full h-full bg-gray-900 border border-gray-700 rounded p-4 overflow-auto prose prose-invert prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
          aria-label="Markdown Preview"
        />
      </div>
    </ToolContainer>
  );
};

export default MarkdownPreviewer;
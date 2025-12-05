'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import { marked } from 'marked';
import CopyButton from '@/components/CopyButton';

const MarkdownPreviewer: React.FC<ToolProps> = ({ details, toolId }) => {
  const [markdown, setMarkdown] = useState(`# Hello, Markdown!

**This is a real-time Markdown previewer.**

- Write Markdown on the left.
- See the rendered HTML on the right.

[marked.js](https://marked.js.org/) is used for the conversion.
`);
  const [renderedHtml, setRenderedHtml] = useState('');

  useEffect(() => {
    const render = async () => {
      const html = await marked.parse(markdown);
      setRenderedHtml(html);
    };
    render();
  }, [markdown]);

  return (
    <ToolContainer title="Markdown Previewer" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col relative">
          <label
            htmlFor="markdown-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Markdown Input
          </label>
          <textarea
            id="markdown-input"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Enter Markdown here..."
            className="w-full h-96 max-h-96 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 font-mono resize-none"
            aria-label="Markdown Input"
          />
          {markdown && (
            <CopyButton
              textToCopy={markdown}
              className="absolute top-8 right-2"
            />
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="markdown-output"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Preview
          </label>
          <div className="relative">
            <div
              id="markdown-output"
              className="w-full h-96 max-h-96 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-4 overflow-auto prose dark:prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
              aria-label="Markdown Preview"
            />
            {renderedHtml && (
              <CopyButton
                textToCopy={renderedHtml}
                className="absolute top-2 right-2"
              />
            )}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default MarkdownPreviewer;

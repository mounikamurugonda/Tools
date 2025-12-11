'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import { marked } from 'marked';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';

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
      <div className="grid md:grid-cols-2 gap-6 h-[70vh]">
        <div className="flex flex-col space-y-2 h-full">
          <Label htmlFor="markdown-input">Markdown Input</Label>
          <div className="relative flex-1">
            <TextArea
              id="markdown-input"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter Markdown here..."
              className="w-full h-full font-mono resize-none"
              aria-label="Markdown Input"
            />
            {markdown && (
              <div className="absolute top-2 right-2">
                <CopyButton textToCopy={markdown} />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-2 h-full">
          <Label>Preview</Label>
          <Card className="flex-1 p-0 overflow-hidden bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <div className="relative h-full">
              <div
                id="markdown-output"
                className="w-full h-full overflow-auto p-6 prose dark:prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
                aria-label="Markdown Preview"
              />
              {renderedHtml && (
                <div className="absolute top-2 right-2">
                  <CopyButton textToCopy={renderedHtml} />
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default MarkdownPreviewer;

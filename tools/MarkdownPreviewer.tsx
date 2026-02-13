'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import { marked } from 'marked';
import CopyButton from '@/components/CopyButton';
import MonacoLiteEditor from '@/components/MonacoLiteEditor';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';

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

  const inputSection = (
    <div className="h-full flex flex-col space-y-2">
      <Label htmlFor="markdown-input">Markdown Input</Label>
      <div className="relative flex-1">
        <MonacoLiteEditor
          language="markdown"
          value={markdown}
          onChange={val => setMarkdown(val || '')}
          className="w-full h-full rounded-md overflow-hidden border border-transparent"
        />
        {markdown && (
          <div className="absolute top-4 right-4 z-10">
            <CopyButton textToCopy={markdown} />
          </div>
        )}
      </div>
    </div>
  );

  const outputSection = (
    <div className="h-full flex flex-col space-y-2">
      <Label>Preview</Label>
      <div className="relative flex-1 bg-gray-50 dark:bg-gray-900 overflow-hidden rounded-md">
        <div
          id="markdown-output"
          className="w-full h-full overflow-auto p-6 prose dark:prose-invert prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
          aria-label="Markdown Preview"
        />
        {renderedHtml && (
          <div className="absolute top-4 right-4 z-10">
            <CopyButton textToCopy={renderedHtml} />
          </div>
        )}
      </div>
    </div>
  );

  const actionSection = (
    <div className="flex flex-col gap-3 w-full lg:w-40">
      <Button
        onClick={() => setMarkdown('')}
        variant="ghost"
        className="w-full"
      >
        <Trash2 className="w-4 h-4 mr-2" /> Clear
      </Button>
    </div>
  );

  return (
    <ConverterLayout
      title="Markdown Previewer"
      details={details}
      toolId={toolId}
      inputComponent={inputSection}
      outputComponent={outputSection}
      actions={actionSection}
    />
  );
};

export default MarkdownPreviewer;

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import { marked } from 'marked';
import MonacoLiteEditor from '@/components/MonacoLiteEditor';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Download, FileText, Trash2 } from 'lucide-react';

const STARTER = `# Hello, Markdown!

**This is a real-time Markdown previewer.**

- Write Markdown on the left.
- See the rendered HTML on the right.

[marked.js](https://marked.js.org/) is used for the conversion.
`;

const MarkdownPreviewer: React.FC<ToolProps> = ({ details, toolId }) => {
  const [markdown, setMarkdown] = useState(STARTER);
  const [renderedHtml, setRenderedHtml] = useState('');
  const toast = useToast();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const html = await marked.parse(markdown);
      if (!cancelled) setRenderedHtml(html);
    })();
    return () => {
      cancelled = true;
    };
  }, [markdown]);

  const handleFile = useCallback(
    async (file: File) => {
      try {
        const t = await file.text();
        setMarkdown(t);
        toast.success(`Loaded ${file.name}`);
      } catch {
        toast.error('Could not read file');
      }
    },
    [toast]
  );

  const copy = useCallback(
    async (value: string, label: string) => {
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        toast.success(`${label} copied`);
      } catch {
        toast.error('Copy failed');
      }
    },
    [toast]
  );

  const download = useCallback((value: string, filename: string, mime: string) => {
    if (!value) return;
    const blob = new Blob([value], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const inputSection = (
    <div className="h-full flex flex-col space-y-3">
      <FileUpload
        onFileSelect={handleFile}
        accept=".md,.markdown,.txt,text/markdown,text/plain"
        maxSizeMB={5}
        title="Drop a .md file"
        description="or paste Markdown below"
      />
      <div className="flex items-center justify-between">
        <Label htmlFor="markdown-input">Markdown</Label>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => copy(markdown, 'Markdown')}
            disabled={!markdown}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
            aria-label="Copy markdown"
            title="Copy markdown"
          >
            <Copy size={16} />
          </button>
          <button
            type="button"
            onClick={() => download(markdown, 'document.md', 'text/markdown')}
            disabled={!markdown}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
            aria-label="Download .md"
            title="Download .md"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
      <div className="relative flex-1 min-h-[300px]">
        <MonacoLiteEditor
          language="markdown"
          value={markdown}
          onChange={val => setMarkdown(val || '')}
          className="w-full h-full rounded-md overflow-hidden border border-transparent"
        />
      </div>
    </div>
  );

  const outputSection = (
    <div className="h-full flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <Label>Preview</Label>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => copy(renderedHtml, 'HTML')}
            disabled={!renderedHtml}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
            aria-label="Copy HTML"
            title="Copy HTML"
          >
            <Copy size={16} />
          </button>
          <button
            type="button"
            onClick={() => download(renderedHtml, 'document.html', 'text/html')}
            disabled={!renderedHtml}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
            aria-label="Download .html"
            title="Download .html"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
      <div className="relative flex-1 bg-gray-50 dark:bg-gray-900 overflow-hidden rounded-md">
        <div
          id="markdown-output"
          className="w-full h-full overflow-auto p-6 prose dark:prose-invert prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
          aria-label="Markdown preview"
        />
      </div>
    </div>
  );

  const actionSection = (
    <div className="flex flex-col gap-3 w-full lg:w-40">
      <Button onClick={() => setMarkdown(STARTER)} variant="outline" className="w-full">
        <FileText className="w-4 h-4 mr-2" /> Sample
      </Button>
      <Button onClick={() => setMarkdown('')} variant="ghost" className="w-full">
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

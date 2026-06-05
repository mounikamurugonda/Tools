'use client';

import React, { useState, useMemo, useCallback } from 'react';
import type { ToolProps } from '@/types';

type Mode = 'auto' | 'json' | 'markdown' | 'plain' | 'table';

function detectMode(text: string): Mode {
  const t = text.trim();
  if (t.startsWith('{') || t.startsWith('[')) return 'json';
  if (t.includes('|') && t.includes('---')) return 'table';
  if (/^#{1,6}\s|^\*\*|^-\s|^\d+\.\s/m.test(t)) return 'markdown';
  return 'plain';
}

function formatJson(text: string): { output: string; error: string } {
  try {
    const parsed = JSON.parse(text.trim());
    return { output: JSON.stringify(parsed, null, 2), error: '' };
  } catch (e: unknown) {
    return { output: text, error: e instanceof Error ? e.message : 'Invalid JSON' };
  }
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^[-*+]\s/gm, '• ')
    .replace(/^\d+\.\s/gm, match => match)
    .trim();
}

function cleanAiArtifacts(text: string): string {
  return text
    .replace(/^(Sure|Of course|Certainly|Absolutely|Great|I'd be happy to|I'll|I can help)[!,.]?\s*/im, '')
    .replace(/^(Here (is|are|you go).*?:)\n/im, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+$/gm, '')
    .trim();
}

function extractCodeBlocks(text: string): Array<{ lang: string; code: string }> {
  const matches = [...text.matchAll(/```(\w*)\n([\s\S]*?)```/g)];
  return matches.map(m => ({ lang: m[1] || 'text', code: m[2].trim() }));
}

const AiOutputFormatter: React.FC<ToolProps> = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('auto');
  const [cleanArtifacts, setCleanArtifacts] = useState(true);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [copiedBlock, setCopiedBlock] = useState<number | null>(null);

  const effectiveMode = useMemo(() =>
    mode === 'auto' ? detectMode(input) : mode
  , [mode, input]);

  const { output, error, codeBlocks } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '', codeBlocks: [] };

    let text = cleanArtifacts ? cleanAiArtifacts(input) : input;
    const blocks = extractCodeBlocks(text);

    if (effectiveMode === 'json') {
      const r = formatJson(text);
      return { output: r.output, error: r.error, codeBlocks: [] };
    }

    if (effectiveMode === 'plain') {
      text = stripMarkdown(text);
    }

    return { output: text, error: '', codeBlocks: blocks };
  }, [input, effectiveMode, cleanArtifacts]);

  const handleCopyOutput = useCallback(async () => {
    await navigator.clipboard.writeText(output);
    setCopiedOutput(true);
    setTimeout(() => setCopiedOutput(false), 1800);
  }, [output]);

  const handleCopyBlock = useCallback(async (i: number) => {
    await navigator.clipboard.writeText(codeBlocks[i].code);
    setCopiedBlock(i);
    setTimeout(() => setCopiedBlock(null), 1800);
  }, [codeBlocks]);

  const EXAMPLE = `Sure! Here is the analysis you requested:

## Key Findings

The dataset contains **1,247 records** across 3 product categories:

- **Electronics**: 42% of total revenue
- **Clothing**: 31% of total revenue
- **Home & Garden**: 27% of total revenue

### Top Performers

| Product | Revenue | Growth |
|---------|---------|--------|
| Laptop Pro X | $124,500 | +18% |
| Running Shoes | $98,200 | +7% |

\`\`\`python
# Summary statistics
df.groupby('category')['revenue'].agg(['sum', 'mean', 'count'])
\`\`\`

The results show a clear trend toward electronics in Q4.`;

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Output Formatter</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
          Clean, format, and structure raw AI responses. Strip filler phrases, fix JSON, extract code blocks, and convert to plain text or polished Markdown.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Output mode:</span>
          {(['auto', 'json', 'markdown', 'plain'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors capitalize ${mode === m ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-400'}`}
            >
              {m === 'auto' ? `Auto${input ? ` (${effectiveMode})` : ''}` : m}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 cursor-pointer ml-auto">
          <span className="text-sm text-gray-700 dark:text-gray-300">Strip AI filler phrases</span>
          <div
            onClick={() => setCleanArtifacts(!cleanArtifacts)}
            className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${cleanArtifacts ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${cleanArtifacts ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Raw AI Output</label>
            <button onClick={() => setInput(EXAMPLE)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Try example</button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste raw AI output here (ChatGPT, Claude, Gemini, etc.)..."
            rows={18}
            className="w-full p-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 font-mono"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Formatted Output
              {error && <span className="ml-2 text-red-500 text-xs">{error}</span>}
            </label>
            {output && (
              <button onClick={handleCopyOutput} className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                {copiedOutput ? '✓ Copied' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            rows={18}
            placeholder="Formatted output will appear here..."
            className="w-full p-3 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl resize-y focus:outline-none text-gray-800 dark:text-gray-200 font-mono"
          />
        </div>
      </div>

      {/* Extracted code blocks */}
      {codeBlocks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Extracted Code Blocks ({codeBlocks.length})</h3>
          {codeBlocks.map((block, i) => (
            <div key={i} className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                <span className="text-xs text-gray-400 font-mono">{block.lang || 'text'}</span>
                <button onClick={() => handleCopyBlock(i)} className="text-xs text-blue-400 hover:text-blue-300">
                  {copiedBlock === i ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 text-xs text-gray-100 overflow-x-auto font-mono whitespace-pre-wrap">{block.code}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AiOutputFormatter;

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import type { ToolProps } from '@/types';
import { AIActionButton } from '@/components/AIActionButton';
import { summarizeText } from '@/lib/geminiAI';

function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.round((text.trim().split(/\s+/).length * 0.75 + text.length / 4) / 2);
}

function chunkText(text: string, chunkSize: number, strategy: 'tokens' | 'words' | 'paragraphs'): string[] {
  if (!text.trim()) return [];

  if (strategy === 'paragraphs') {
    const paras = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
    const chunks: string[] = [];
    let current = '';
    for (const para of paras) {
      const combined = current ? current + '\n\n' + para : para;
      const tokens = estimateTokens(combined);
      if (tokens > chunkSize && current) {
        chunks.push(current);
        current = para;
      } else {
        current = combined;
      }
    }
    if (current) chunks.push(current);
    return chunks;
  }

  if (strategy === 'words') {
    const words = text.split(/\s+/);
    const chunks: string[] = [];
    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(' '));
    }
    return chunks;
  }

  // tokens
  const words = text.split(/\s+/);
  const tokensPerWord = 0.75;
  const wordsPerChunk = Math.floor(chunkSize / tokensPerWord);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += wordsPerChunk) {
    chunks.push(words.slice(i, i + wordsPerChunk).join(' '));
  }
  return chunks;
}

const AiTextSummarizer: React.FC<ToolProps> = () => {
  const [text, setText] = useState('');
  const [aiSummaryStyle, setAiSummaryStyle] = useState<'brief' | 'detailed' | 'bullets'>('brief');
  const [chunkSize, setChunkSize] = useState(2000);
  const [strategy, setStrategy] = useState<'tokens' | 'words' | 'paragraphs'>('tokens');
  const [overlap, setOverlap] = useState(100);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const tokens = useMemo(() => estimateTokens(text), [text]);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const chunks = useMemo(() => {
    const raw = chunkText(text, chunkSize, strategy);
    if (overlap === 0 || raw.length <= 1 || strategy !== 'tokens') return raw;
    // Add token overlap between chunks
    return raw.map((chunk, i) => {
      if (i === 0) return chunk;
      const prevWords = raw[i - 1].trim().split(/\s+/);
      const overlapWords = prevWords.slice(-Math.floor(overlap / 0.75));
      return overlapWords.join(' ') + '\n[...]\n' + chunk;
    });
  }, [text, chunkSize, strategy, overlap]);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setText(ev.target?.result as string ?? '');
    reader.readAsText(file);
  }, []);

  const handleCopyChunk = useCallback(async (i: number) => {
    await navigator.clipboard.writeText(chunks[i]);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1800);
  }, [chunks]);

  const handleCopyAll = useCallback(async () => {
    await navigator.clipboard.writeText(chunks.join('\n\n---\n\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1800);
  }, [chunks]);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Text Chunker</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
          Split large documents into AI-ready chunks that fit any model's context window. Smart chunking by tokens, words, or paragraphs — handles files up to 10 MB.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Input text</label>
              <label className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 transition-colors cursor-pointer">
                Load file
                <input type="file" accept=".txt,.md,.json,.csv,.html" className="hidden" onChange={handleFile} />
              </label>
            </div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your document here or load a file..."
              rows={12}
              className="w-full p-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
          </div>

          {/* Stats */}
          {text && (
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Tokens', value: tokens.toLocaleString() },
                { label: 'Words', value: words.toLocaleString() },
                { label: 'Characters', value: text.length.toLocaleString() },
                { label: 'Chunks', value: chunks.length.toLocaleString() },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-100 dark:border-gray-700">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{s.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">Chunking strategy</label>
              <select value={strategy} onChange={e => setStrategy(e.target.value as typeof strategy)}
                className="w-full p-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100">
                <option value="tokens">By token count (recommended)</option>
                <option value="words">By word count</option>
                <option value="paragraphs">By paragraph</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                Chunk size: <span className="text-blue-600 dark:text-blue-400 font-semibold">{chunkSize.toLocaleString()} {strategy}</span>
              </label>
              <input type="range" min={200} max={16000} step={100} value={chunkSize}
                onChange={e => setChunkSize(Number(e.target.value))}
                className="w-full accent-blue-600" />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>200</span><span>4k</span><span>8k</span><span>16k</span>
              </div>
            </div>
            {strategy === 'tokens' && (
              <div>
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                  Token overlap: <span className="text-blue-600 dark:text-blue-400">{overlap}</span>
                </label>
                <input type="range" min={0} max={500} step={50} value={overlap}
                  onChange={e => setOverlap(Number(e.target.value))}
                  className="w-full accent-blue-600" />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {chunks.length > 0 ? `${chunks.length} chunk${chunks.length !== 1 ? 's' : ''}` : 'Chunks will appear here'}
            </h2>
            {chunks.length > 1 && (
              <button onClick={handleCopyAll} className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                {copiedAll ? '✓ Copied all' : `Copy all ${chunks.length} chunks`}
              </button>
            )}
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {chunks.map((chunk, i) => {
              const chunkTokens = estimateTokens(chunk);
              return (
                <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white text-xs font-bold rounded-full">{i + 1}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">~{chunkTokens.toLocaleString()} tokens · {chunk.split(/\s+/).length.toLocaleString()} words</span>
                    </div>
                    <button onClick={() => handleCopyChunk(i)} className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                      {copiedIdx === i ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap line-clamp-6">{chunk}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* AI: Summarize */}
          {text && (
            <div className="bg-violet-50/50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800/40 rounded-xl p-4">
              <p className="text-xs font-semibold text-violet-700 dark:text-violet-400 mb-3">
                ✨ AI Summarize — get an instant AI summary instead of chunking
              </p>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {(['brief', 'detailed', 'bullets'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setAiSummaryStyle(s)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors ${
                      aiSummaryStyle === s
                        ? 'bg-violet-600 text-white border-violet-600'
                        : 'border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20'
                    }`}
                  >
                    {s === 'brief' ? '📝 Brief' : s === 'detailed' ? '📄 Detailed' : '• Bullets'}
                  </button>
                ))}
              </div>
              <AIActionButton
                label="AI Summarize"
                actionName="summarize documents"
                onAction={() => summarizeText(text, aiSummaryStyle)}
                hint="AI reads your full text and returns a clean summary"
              />
            </div>
          )}

          {!text && (
            <div className="text-center py-16 text-gray-400 dark:text-gray-500 text-sm">
              <p className="text-4xl mb-3">✂️</p>
              <p>Paste or load a document to start chunking.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiTextSummarizer;

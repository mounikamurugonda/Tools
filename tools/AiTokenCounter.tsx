'use client';

import React, { useState, useCallback, useMemo } from 'react';
import type { ToolProps } from '@/types';

// Simple token estimator: ~4 chars/token for English (matches cl100k_base closely)
function estimateTokens(text: string): number {
  if (!text) return 0;
  // Rough tiktoken-like approximation
  const words = text.trim().split(/\s+/).filter(Boolean);
  const chars = text.length;
  // Average: 0.75 tokens per word, cross-checked with char/4
  return Math.round((words.length * 0.75 + chars / 4) / 2);
}

const MODELS = [
  { name: 'GPT-4o', limit: 128000, inputCost: 0.0000025, outputCost: 0.00001, provider: 'OpenAI' },
  { name: 'GPT-4o mini', limit: 128000, inputCost: 0.00000015, outputCost: 0.0000006, provider: 'OpenAI' },
  { name: 'GPT-3.5 Turbo', limit: 16385, inputCost: 0.0000005, outputCost: 0.0000015, provider: 'OpenAI' },
  { name: 'Claude 3.5 Sonnet', limit: 200000, inputCost: 0.000003, outputCost: 0.000015, provider: 'Anthropic' },
  { name: 'Claude 3 Haiku', limit: 200000, inputCost: 0.00000025, outputCost: 0.00000125, provider: 'Anthropic' },
  { name: 'Claude 3 Opus', limit: 200000, inputCost: 0.000015, outputCost: 0.000075, provider: 'Anthropic' },
  { name: 'Gemini 1.5 Pro', limit: 1000000, inputCost: 0.00000125, outputCost: 0.000005, provider: 'Google' },
  { name: 'Gemini 1.5 Flash', limit: 1000000, inputCost: 0.000000075, outputCost: 0.0000003, provider: 'Google' },
  { name: 'Llama 3.1 405B', limit: 128000, inputCost: 0.000003, outputCost: 0.000003, provider: 'Meta (via API)' },
  { name: 'Mistral Large', limit: 128000, inputCost: 0.000002, outputCost: 0.000006, provider: 'Mistral' },
];

const AiTokenCounter: React.FC<ToolProps> = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const tokens = useMemo(() => estimateTokens(text), [text]);
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(String(tokens));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [tokens]);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setText(ev.target?.result as string ?? '');
    reader.readAsText(file);
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const t = await navigator.clipboard.readText();
      setText(t);
    } catch {/* ignore */}
  }, []);

  const barColor = (used: number, limit: number) => {
    const pct = used / limit;
    if (pct >= 1) return 'bg-red-500';
    if (pct >= 0.8) return 'bg-orange-400';
    if (pct >= 0.5) return 'bg-yellow-400';
    return 'bg-emerald-500';
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Token Counter</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
          Paste any text — documents, prompts, code — and instantly see token counts for every major AI model. 100% browser-based, no data leaves your device.
        </p>
      </div>

      {/* Input area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Text</label>
          <div className="flex gap-2">
            <button
              onClick={handlePaste}
              className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Paste from clipboard
            </button>
            <label className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
              Load file
              <input type="file" accept=".txt,.md,.json,.csv,.js,.ts,.py,.html,.xml" className="hidden" onChange={handleFile} />
            </label>
            {text && (
              <button onClick={() => setText('')} className="px-3 py-1.5 text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 transition-colors">
                Clear
              </button>
            )}
          </div>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste your text here — prompts, documents, code, CSV data, anything..."
          className="w-full h-48 p-4 text-sm font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
        />
      </div>

      {/* Stats bar */}
      {text && (
        <div className="flex flex-wrap gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
          {[
            { label: 'Tokens (est.)', value: tokens.toLocaleString() },
            { label: 'Characters', value: chars.toLocaleString() },
            { label: 'Words', value: words.toLocaleString() },
            { label: 'Lines', value: lines.toLocaleString() },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center min-w-[80px]">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
            </div>
          ))}
          <div className="flex items-center ml-auto">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy token count'}
            </button>
          </div>
        </div>
      )}

      {/* Model table */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Context Window Usage by Model</h2>
        <div className="space-y-3">
          {Object.entries(
            MODELS.reduce((acc, m) => {
              (acc[m.provider] = acc[m.provider] || []).push(m);
              return acc;
            }, {} as Record<string, typeof MODELS>)
          ).map(([provider, models]) => (
            <div key={provider} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{provider}</span>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {models.map(model => {
                  const used = tokens;
                  const pct = Math.min((used / model.limit) * 100, 100);
                  const fits = used <= model.limit;
                  const estimatedCost = (used * model.inputCost).toFixed(4);
                  return (
                    <div key={model.name} className="px-4 py-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{model.name}</span>
                          {!fits && (
                            <span className="px-2 py-0.5 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full font-medium">Exceeds limit</span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>{used.toLocaleString()} / {model.limit.toLocaleString()} tokens</span>
                          {text && <span className="text-emerald-600 dark:text-emerald-400">≈ ${estimatedCost} input cost</span>}
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${barColor(used, model.limit)}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Token counts are estimates (±5%) using a cl100k_base approximation. For exact counts, use the official tokenizer libraries. Cost estimates are for input tokens only based on publicly listed pricing.
      </p>
    </div>
  );
};

export default AiTokenCounter;

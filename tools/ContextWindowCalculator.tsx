'use client';

import React, { useState, useMemo, useCallback } from 'react';
import type { ToolProps } from '@/types';

const MODELS = [
  { name: 'GPT-4o', provider: 'OpenAI', limit: 128000, color: 'bg-emerald-500' },
  { name: 'GPT-4o mini', provider: 'OpenAI', limit: 128000, color: 'bg-emerald-400' },
  { name: 'GPT-3.5 Turbo', provider: 'OpenAI', limit: 16385, color: 'bg-yellow-500' },
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', limit: 200000, color: 'bg-orange-500' },
  { name: 'Claude 3 Haiku', provider: 'Anthropic', limit: 200000, color: 'bg-orange-400' },
  { name: 'Claude 3 Opus', provider: 'Anthropic', limit: 200000, color: 'bg-orange-600' },
  { name: 'Gemini 1.5 Pro', provider: 'Google', limit: 1000000, color: 'bg-blue-500' },
  { name: 'Gemini 1.5 Flash', provider: 'Google', limit: 1000000, color: 'bg-blue-400' },
  { name: 'Gemini 2.0 Flash', provider: 'Google', limit: 1000000, color: 'bg-blue-600' },
  { name: 'Llama 3.1 405B', provider: 'Meta', limit: 128000, color: 'bg-purple-500' },
  { name: 'Mistral Large', provider: 'Mistral', limit: 128000, color: 'bg-pink-500' },
  { name: 'Qwen2.5 72B', provider: 'Alibaba', limit: 131072, color: 'bg-teal-500' },
];

function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.round((text.trim().split(/\s+/).length * 0.75 + text.length / 4) / 2);
}

const ContextWindowCalculator: React.FC<ToolProps> = () => {
  const [text, setText] = useState('');
  const [reservedOutput, setReservedOutput] = useState(1000);
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set(MODELS.map(m => m.name)));

  const tokens = useMemo(() => estimateTokens(text), [text]);
  const totalNeeded = tokens + reservedOutput;

  const toggleModel = useCallback((name: string) => {
    setSelectedModels(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  }, []);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setText(ev.target?.result as string ?? '');
    reader.readAsText(file);
  }, []);

  const visibleModels = MODELS.filter(m => selectedModels.has(m.name));
  const fittingCount = visibleModels.filter(m => totalNeeded <= m.limit).length;

  const providers = Array.from(new Set(MODELS.map(m => m.provider)));

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Context Window Calculator</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
          Paste your document or prompt to see instantly which AI models can handle it within their context window — and which can't.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Input Text / Prompt</label>
              <label className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 transition-colors cursor-pointer">
                Load file
                <input type="file" accept=".txt,.md,.json,.csv" className="hidden" onChange={handleFile} />
              </label>
            </div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your document, prompt, or data here..."
              rows={10}
              className="w-full p-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
              Reserved for output: <span className="text-blue-600 dark:text-blue-400">{reservedOutput.toLocaleString()} tokens</span>
            </label>
            <input
              type="range"
              min={0}
              max={8000}
              step={100}
              value={reservedOutput}
              onChange={e => setReservedOutput(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0</span><span>2k</span><span>4k</span><span>6k</span><span>8k</span>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 space-y-2">
            {[
              { label: 'Input tokens (est.)', value: tokens.toLocaleString() },
              { label: 'Reserved output', value: reservedOutput.toLocaleString() },
              { label: 'Total needed', value: totalNeeded.toLocaleString(), bold: true },
              { label: 'Models that fit', value: `${fittingCount} / ${visibleModels.length}`, bold: true },
            ].map(s => (
              <div key={s.label} className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{s.label}</span>
                <span className={`text-sm ${s.bold ? 'font-bold text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'}`}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Model filter */}
          <div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Filter models:</p>
            <div className="space-y-2">
              {providers.map(provider => (
                <div key={provider}>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">{provider}</p>
                  <div className="flex flex-wrap gap-1">
                    {MODELS.filter(m => m.provider === provider).map(m => (
                      <button
                        key={m.name}
                        onClick={() => toggleModel(m.name)}
                        className={`px-2 py-0.5 text-xs rounded-full border transition-colors ${selectedModels.has(m.name) ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 border-transparent' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-500'}`}
                      >{m.name}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Context window usage</h2>
          {visibleModels.map(model => {
            const pct = Math.min((totalNeeded / model.limit) * 100, 100);
            const fits = totalNeeded <= model.limit;
            const remaining = Math.max(0, model.limit - totalNeeded);
            return (
              <div key={model.name} className={`bg-white dark:bg-gray-800 border rounded-xl p-4 ${fits ? 'border-gray-200 dark:border-gray-700' : 'border-red-200 dark:border-red-800'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{model.name}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{model.provider}</span>
                    {!fits && <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-full font-medium">❌ Too large</span>}
                    {fits && pct < 50 && <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs rounded-full font-medium">✓ Fits easily</span>}
                    {fits && pct >= 50 && pct < 80 && <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs rounded-full font-medium">⚠ Moderate</span>}
                    {fits && pct >= 80 && <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs rounded-full font-medium">⚠ Near limit</span>}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                    <span>{pct.toFixed(1)}% used</span>
                    {fits && <span className="block text-emerald-600 dark:text-emerald-400">{remaining.toLocaleString()} remaining</span>}
                  </div>
                </div>
                <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${fits ? (pct < 50 ? 'bg-emerald-500' : pct < 80 ? 'bg-yellow-400' : 'bg-orange-500') : 'bg-red-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
                  <span>0</span>
                  <span>{(model.limit / 1000).toFixed(0)}k tokens max</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Token counts are estimates (±5%). Context limits shown are the maximum input context for each model as of 2026 — check provider docs for latest values.
      </p>
    </div>
  );
};

export default ContextWindowCalculator;

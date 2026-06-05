'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';

const MODELS = [
  {
    name: 'GPT-4o',
    provider: 'OpenAI',
    providerColor: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    contextK: 128,
    inputPer1M: 2.50,
    outputPer1M: 10.00,
    strengths: ['Multimodal', 'Code', 'Reasoning', 'Fast'],
    bestFor: 'General-purpose, coding, vision tasks',
    speed: 'Fast',
    updated: '2025',
  },
  {
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    providerColor: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    contextK: 128,
    inputPer1M: 0.15,
    outputPer1M: 0.60,
    strengths: ['Fast', 'Cheap', 'Efficient'],
    bestFor: 'High-volume, cost-sensitive tasks',
    speed: 'Very Fast',
    updated: '2025',
  },
  {
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    providerColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    contextK: 200,
    inputPer1M: 3.00,
    outputPer1M: 15.00,
    strengths: ['Long context', 'Writing', 'Instruction following', 'Safety'],
    bestFor: 'Long documents, writing, nuanced reasoning',
    speed: 'Fast',
    updated: '2025',
  },
  {
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    providerColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    contextK: 200,
    inputPer1M: 0.25,
    outputPer1M: 1.25,
    strengths: ['Ultra-fast', 'Cheap', 'Large context'],
    bestFor: 'Real-time apps, summarization at scale',
    speed: 'Ultra Fast',
    updated: '2025',
  },
  {
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    providerColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    contextK: 200,
    inputPer1M: 15.00,
    outputPer1M: 75.00,
    strengths: ['Highest quality', 'Complex reasoning', 'Long context'],
    bestFor: 'Research, complex multi-step tasks',
    speed: 'Slower',
    updated: '2025',
  },
  {
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    providerColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    contextK: 1000,
    inputPer1M: 1.25,
    outputPer1M: 5.00,
    strengths: ['1M token context', 'Multimodal', 'Video', 'Audio'],
    bestFor: 'Massive documents, video analysis, multi-modal',
    speed: 'Fast',
    updated: '2025',
  },
  {
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    providerColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    contextK: 1000,
    inputPer1M: 0.075,
    outputPer1M: 0.30,
    strengths: ['Ultra-cheap', '1M context', 'Fast'],
    bestFor: 'Budget-friendly large-context tasks',
    speed: 'Very Fast',
    updated: '2025',
  },
  {
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    providerColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    contextK: 1000,
    inputPer1M: 0.10,
    outputPer1M: 0.40,
    strengths: ['Latest Gemini', '1M context', 'Agentic'],
    bestFor: 'Agentic tasks, large-scale data processing',
    speed: 'Very Fast',
    updated: '2026',
  },
  {
    name: 'Llama 3.1 405B',
    provider: 'Meta (Open)',
    providerColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    contextK: 128,
    inputPer1M: 3.00,
    outputPer1M: 3.00,
    strengths: ['Open weights', 'Self-hostable', 'Strong reasoning'],
    bestFor: 'Privacy-focused, self-hosted deployments',
    speed: 'Variable',
    updated: '2025',
  },
  {
    name: 'Mistral Large',
    provider: 'Mistral',
    providerColor: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
    contextK: 128,
    inputPer1M: 2.00,
    outputPer1M: 6.00,
    strengths: ['European', 'Multilingual', 'Code', 'Efficient'],
    bestFor: 'European data compliance, multilingual apps',
    speed: 'Fast',
    updated: '2025',
  },
];

type SortKey = 'name' | 'contextK' | 'inputPer1M' | 'provider';

const AiModelComparator: React.FC<ToolProps> = () => {
  const [sortKey, setSortKey] = useState<SortKey>('contextK');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');
  const [selectedProviders, setSelectedProviders] = useState<Set<string>>(new Set());
  const [compareList, setCompareList] = useState<Set<string>>(new Set());

  const providers = Array.from(new Set(MODELS.map(m => m.provider)));

  const toggleProvider = (p: string) => {
    setSelectedProviders(prev => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p); else next.add(p);
      return next;
    });
  };

  const toggleCompare = (name: string) => {
    setCompareList(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const filtered = useMemo(() => {
    let list = MODELS.filter(m =>
      (selectedProviders.size === 0 || selectedProviders.has(m.provider)) &&
      (search === '' || m.name.toLowerCase().includes(search.toLowerCase()) || m.provider.toLowerCase().includes(search.toLowerCase()) || m.bestFor.toLowerCase().includes(search.toLowerCase()))
    );
    list = [...list].sort((a, b) => {
      const av = a[sortKey]; const bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return list;
  }, [selectedProviders, search, sortKey, sortDir]);

  const comparing = compareList.size >= 2 ? MODELS.filter(m => compareList.has(m.name)) : [];

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 text-gray-400">{sortKey === col ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</span>
  );

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Model Comparator</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
          Compare GPT-4o, Claude, Gemini, Llama, and Mistral side-by-side. Context window, pricing, strengths, and best use cases — updated 2026.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search models..."
          className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 w-48"
        />
        <div className="flex flex-wrap gap-1.5">
          {providers.map(p => (
            <button key={p} onClick={() => toggleProvider(p)}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${selectedProviders.has(p) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'}`}
            >{p}</button>
          ))}
        </div>
        {compareList.size > 0 && (
          <button onClick={() => setCompareList(new Set())} className="text-xs text-red-500 hover:underline ml-auto">
            Clear comparison ({compareList.size})
          </button>
        )}
      </div>

      {/* Side-by-side compare */}
      {comparing.length >= 2 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-3">Side-by-side comparison</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {comparing.map(m => (
              <div key={m.name} className="bg-white dark:bg-gray-800 rounded-lg p-3 space-y-2 border border-gray-100 dark:border-gray-700">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{m.name}</p>
                <p className="text-xs text-gray-500">Context: <strong className="text-gray-800 dark:text-gray-200">{m.contextK}k</strong></p>
                <p className="text-xs text-gray-500">Input: <strong className="text-gray-800 dark:text-gray-200">${m.inputPer1M}/1M</strong></p>
                <p className="text-xs text-gray-500">Speed: <strong className="text-gray-800 dark:text-gray-200">{m.speed}</strong></p>
                <div className="flex flex-wrap gap-1 mt-1">{m.strengths.slice(0, 3).map(s => <span key={s} className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400">{s}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left">
                <button onClick={() => handleSort('name')} className="font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Model <SortIcon col="name" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button onClick={() => handleSort('provider')} className="font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Provider <SortIcon col="provider" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => handleSort('contextK')} className="font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Context <SortIcon col="contextK" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => handleSort('inputPer1M')} className="font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Input/1M <SortIcon col="inputPer1M" />
                </button>
              </th>
              <th className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 font-semibold">Output/1M</th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Speed</th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Best for</th>
              <th className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 font-semibold">Compare</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filtered.map(m => (
              <tr key={m.name} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${compareList.has(m.name) ? 'ring-2 ring-blue-400 ring-inset' : ''}`}>
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-900 dark:text-white">{m.name}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {m.strengths.slice(0, 2).map(s => <span key={s} className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400">{s}</span>)}
                  </div>
                </td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${m.providerColor}`}>{m.provider}</span></td>
                <td className="px-4 py-3 text-right font-mono text-gray-700 dark:text-gray-300">{m.contextK >= 1000 ? `${(m.contextK/1000).toFixed(0)}M` : `${m.contextK}k`}</td>
                <td className="px-4 py-3 text-right font-mono text-gray-700 dark:text-gray-300">${m.inputPer1M.toFixed(2)}</td>
                <td className="px-4 py-3 text-right font-mono text-gray-700 dark:text-gray-300">${m.outputPer1M.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{m.speed}</td>
                <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 max-w-[200px]">{m.bestFor}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleCompare(m.name)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors ${compareList.has(m.name) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-400'}`}
                  >
                    {compareList.has(m.name) ? 'Remove' : 'Add'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Pricing is approximate and subject to change. Always verify with the provider's current pricing page. Updated June 2026.
      </p>
    </div>
  );
};

export default AiModelComparator;

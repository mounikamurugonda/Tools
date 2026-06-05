'use client';

import React, { useState, useCallback } from 'react';
import type { ToolProps } from '@/types';
import { AIActionButton } from '@/components/AIActionButton';
import { improvePrompt } from '@/lib/sarvamAI';

interface PromptSection {
  id: string;
  label: string;
  placeholder: string;
  hint: string;
  value: string;
  enabled: boolean;
}

const DEFAULT_SECTIONS: PromptSection[] = [
  {
    id: 'role',
    label: 'Role / Persona',
    placeholder: 'e.g. You are a senior software engineer specializing in TypeScript and React...',
    hint: 'Tell the AI who it should act as. A specific, expert persona improves output quality significantly.',
    value: '',
    enabled: true,
  },
  {
    id: 'context',
    label: 'Context / Background',
    placeholder: 'e.g. I am building a SaaS app for small businesses. The codebase uses Next.js 14 with App Router...',
    hint: 'Provide background information the AI needs to understand your situation.',
    value: '',
    enabled: true,
  },
  {
    id: 'task',
    label: 'Task / Instruction',
    placeholder: 'e.g. Review the following function and identify performance bottlenecks...',
    hint: 'The specific action you want the AI to perform. Be precise and use action verbs.',
    value: '',
    enabled: true,
  },
  {
    id: 'data',
    label: 'Input Data',
    placeholder: 'Paste your data, code, text, or examples here...',
    hint: 'The raw material the AI should work with — code, text, CSV rows, JSON, etc.',
    value: '',
    enabled: false,
  },
  {
    id: 'format',
    label: 'Output Format',
    placeholder: 'e.g. Return a numbered list. Use markdown. Output valid JSON with keys: name, score, reason.',
    hint: 'Specify exactly how you want the response structured.',
    value: '',
    enabled: true,
  },
  {
    id: 'constraints',
    label: 'Constraints / Rules',
    placeholder: 'e.g. Do not use external libraries. Keep the response under 300 words. Avoid jargon.',
    hint: 'Boundaries the AI must not cross.',
    value: '',
    enabled: false,
  },
  {
    id: 'examples',
    label: 'Examples (Few-shot)',
    placeholder: 'Input: "Hello world" → Output: "HELLO WORLD"\nInput: "foo bar" → Output: "FOO BAR"',
    hint: 'Showing examples is the single most reliable way to control output format.',
    value: '',
    enabled: false,
  },
];

const SECTION_LABELS: Record<string, string> = {
  role: 'Role',
  context: 'Context',
  task: 'Task',
  data: 'Input Data',
  format: 'Output Format',
  constraints: 'Constraints',
  examples: 'Examples',
};

const AiPromptBuilder: React.FC<ToolProps> = () => {
  const [sections, setSections] = useState<PromptSection[]>(DEFAULT_SECTIONS);
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState(false);

  const updateSection = useCallback((id: string, field: 'value' | 'enabled', val: string | boolean) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));
  }, []);

  const buildPrompt = useCallback(() => {
    return sections
      .filter(s => s.enabled && s.value.trim())
      .map(s => {
        const label = SECTION_LABELS[s.id];
        if (s.id === 'role') return s.value.trim();
        return `## ${label}\n${s.value.trim()}`;
      })
      .join('\n\n');
  }, [sections]);

  const prompt = buildPrompt();

  const handleCopy = useCallback(async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [prompt]);

  const handleReset = useCallback(() => {
    setSections(DEFAULT_SECTIONS);
    setPreview(false);
  }, []);

  const tokenEstimate = Math.round((prompt.length / 4 + prompt.split(/\s+/).length * 0.75) / 2);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Prompt Builder</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
          Structure your prompts with proven engineering principles. Toggle sections on/off, fill in what you need, and copy a production-ready prompt in seconds.
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Toggle sections:
        </div>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => updateSection(s.id, 'enabled', !s.enabled)}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
              s.enabled
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-400'
            }`}
          >
            {SECTION_LABELS[s.id]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {sections.filter(s => s.enabled).map((section, i) => (
          <div key={section.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white text-xs font-bold rounded-full">{i + 1}</span>
                <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{section.label}</span>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 max-w-sm text-right hidden sm:block">{section.hint}</span>
            </div>
            <div className="p-4">
              <textarea
                value={section.value}
                onChange={e => updateSection(section.id, 'value', e.target.value)}
                placeholder={section.placeholder}
                rows={section.id === 'data' || section.id === 'examples' ? 6 : 3}
                className="w-full p-3 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 font-mono"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Preview & Actions */}
      {prompt && (
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ~{tokenEstimate.toLocaleString()} tokens · {prompt.length.toLocaleString()} chars
              </span>
              <button
                onClick={() => setPreview(!preview)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {preview ? 'Hide preview' : 'Preview prompt'}
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleCopy}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {copied ? '✓ Copied!' : 'Copy Prompt'}
              </button>
            </div>
          </div>
          {preview && (
            <pre className="p-4 bg-gray-900 text-gray-100 text-xs rounded-xl overflow-auto whitespace-pre-wrap max-h-72 font-mono">
              {prompt}
            </pre>
          )}
        </div>
      )}

      {!prompt && (
        <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
          Fill in one or more sections above to build your prompt.
        </div>
      )}

      {/* AI: Improve Prompt */}
      {prompt && (
        <div className="bg-violet-50/50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800/40 rounded-xl p-4">
          <p className="text-xs font-semibold text-violet-700 dark:text-violet-400 mb-3">
            ✨ AI Improve — let AI polish and strengthen your prompt
          </p>
          <AIActionButton
            label="Improve Prompt"
            actionName="improve your prompt"
            onAction={() => improvePrompt(prompt)}
            hint="AI rewrites your prompt to be clearer and more effective"
          />
        </div>
      )}

      {/* Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {[
          { icon: '🎯', title: 'Role first, always', body: 'Starting with a specific expert persona consistently improves output quality — even for simple tasks.' },
          { icon: '📋', title: 'Examples beat instructions', body: 'Showing 2–3 input/output examples is more reliable than describing the format in words.' },
          { icon: '🔢', title: 'Watch your token budget', body: 'Each section adds tokens. Use the token counter to ensure your full prompt + data fits the model\'s context window.' },
          { icon: '🚫', title: 'Constraints matter', body: 'Telling the AI what NOT to do (no jargon, no bullet points, no markdown) prevents common output issues.' },
        ].map(tip => (
          <div key={tip.title} className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            <span className="text-2xl">{tip.icon}</span>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tip.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tip.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiPromptBuilder;

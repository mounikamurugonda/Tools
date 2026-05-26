'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Download, RefreshCw, Type } from 'lucide-react';

const LOREM_WORDS = [
  'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod',
  'tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam',
  'quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo',
  'consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum',
  'eu','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident',
  'sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum','curabitur',
  'pretium','tincidunt','lacus','nulla','gravida','orci','a','odio','nullam','varius','turpis',
  'molestie','volutpat','urna','elementum','arcu','sapien','rutrum','nec','dignissim','sed',
];

type Unit = 'paragraphs' | 'sentences' | 'words';
type Wrap = 'none' | 'p' | 'br';

function randomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}
function makeSentence(min = 6, max = 18): string {
  const len = min + Math.floor(Math.random() * (max - min + 1));
  const words: string[] = [];
  for (let i = 0; i < len; i++) words.push(randomWord());
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(' ') + '.';
}
function makeParagraph(startWithLorem: boolean): string {
  const sentenceCount = 4 + Math.floor(Math.random() * 5);
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) sentences.push(makeSentence());
  if (startWithLorem) {
    sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  }
  return sentences.join(' ');
}
function generate(unit: Unit, count: number, startWithLorem: boolean): string {
  if (unit === 'words') {
    const out: string[] = [];
    for (let i = 0; i < count; i++) out.push(randomWord());
    if (out.length) out[0] = out[0][0].toUpperCase() + out[0].slice(1);
    if (startWithLorem && count >= 5) {
      out.splice(0, 5, 'Lorem', 'ipsum', 'dolor', 'sit', 'amet');
    }
    return out.join(' ') + '.';
  }
  if (unit === 'sentences') {
    const sentences: string[] = [];
    for (let i = 0; i < count; i++) sentences.push(makeSentence());
    if (startWithLorem && sentences.length > 0) {
      sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    }
    return sentences.join(' ');
  }
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) paragraphs.push(makeParagraph(startWithLorem && i === 0));
  return paragraphs.join('\n\n');
}
function wrap(text: string, mode: Wrap, unit: Unit): string {
  if (mode === 'none') return text;
  if (mode === 'p') {
    const parts = unit === 'paragraphs' ? text.split('\n\n') : [text];
    return parts.map(p => `<p>${p}</p>`).join('\n');
  }
  return text.replace(/\n\n/g, '<br><br>\n');
}

const LoremIpsumGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [unit, setUnit] = useState<Unit>('paragraphs');
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [wrapMode, setWrapMode] = useState<Wrap>('none');
  const [seed, setSeed] = useState(0);
  const toast = useToast();

  const maxByUnit: Record<Unit, number> = useMemo(
    () => ({ paragraphs: 50, sentences: 100, words: 1000 }),
    []
  );

  useEffect(() => {
    setCount(c => Math.min(c, maxByUnit[unit]));
  }, [unit, maxByUnit]);

  const text = useMemo(() => {
    // seed is part of deps so "Regenerate" forces re-render
    void seed;
    return wrap(generate(unit, count, startWithLorem), wrapMode, unit);
  }, [unit, count, startWithLorem, wrapMode, seed]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Copy failed');
    }
  }, [text, toast]);

  const handleDownload = useCallback(() => {
    const ext = wrapMode === 'none' ? 'txt' : 'html';
    const blob = new Blob([text], {
      type: ext === 'html' ? 'text/html;charset=utf-8' : 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lorem-ipsum.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [text, wrapMode]);

  return (
    <ToolContainer title="Lorem Ipsum Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Controls">
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <div>
              <Label>Generate</Label>
              <div className="mt-2 inline-flex rounded-xl border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-900">
                {(['paragraphs', 'sentences', 'words'] as Unit[]).map(u => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    aria-pressed={unit === u}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      unit === u
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>HTML wrap</Label>
              <div className="mt-2 inline-flex rounded-xl border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-900">
                {(['none', 'p', 'br'] as Wrap[]).map(w => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWrapMode(w)}
                    aria-pressed={wrapMode === w}
                    className={`px-3 py-1.5 text-sm font-mono rounded-lg transition-colors ${
                      wrapMode === w
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {w === 'none' ? 'plain' : `<${w}>`}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <Slider
                label={`Count: ${count} ${unit}`}
                min={1}
                max={maxByUnit[unit]}
                value={count}
                onChange={e => setCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={e => setStartWithLorem(e.target.checked)}
                className="rounded"
              />
              Start with “Lorem ipsum dolor sit amet…”
            </label>
            <div className="flex justify-end">
              <Button onClick={() => setSeed(s => s + 1)} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-0 overflow-hidden" title="Generated text">
          <div className="relative">
            <TextArea
              readOnly
              value={text}
              className="h-[500px] border-none focus:ring-0 rounded-none bg-gray-50 dark:bg-gray-900 font-mono text-sm"
              aria-live="polite"
              aria-label="Generated lorem ipsum text"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                type="button"
                onClick={handleCopy}
                className="p-2 rounded-md bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white shadow-sm"
                aria-label="Copy text"
                title="Copy text"
              >
                <Copy size={16} />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="p-2 rounded-md bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white shadow-sm"
                aria-label="Download"
                title="Download"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 flex items-center gap-2">
            <Type size={12} />
            {text.length.toLocaleString()} chars ·{' '}
            {text.trim() ? text.trim().split(/\s+/).length.toLocaleString() : 0} words
          </div>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default LoremIpsumGenerator;

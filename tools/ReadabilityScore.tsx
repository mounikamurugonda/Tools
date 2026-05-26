'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { BookOpen, Copy, Download } from 'lucide-react';

function countSyllables(word: string): number {
  let w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  w = w.replace(/^y/, '');
  const matches = w.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

interface Stats {
  words: number;
  sentences: number;
  syllables: number;
  complexWords: number;
  characters: number;
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  gunningFog: number;
  smog: number;
  colemanLiau: number;
  ari: number;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  longestSentence: string;
}

function analyze(text: string): Stats {
  const sentenceArr = text.match(/[^.!?]+[.!?]+/g) ?? [];
  const words = text
    .trim()
    .split(/\s+/)
    .filter(w => /[\p{L}\p{N}]/u.test(w));
  let syllables = 0;
  let complexWords = 0;
  for (const w of words) {
    const s = countSyllables(w);
    syllables += s;
    if (s >= 3) complexWords++;
  }
  const characters = text.replace(/\s/g, '').length;
  const wordCount = words.length;
  const sentenceCount = sentenceArr.length || (wordCount > 0 ? 1 : 0);
  if (wordCount === 0 || sentenceCount === 0) {
    return {
      words: 0, sentences: 0, syllables: 0, complexWords: 0, characters: 0,
      fleschReadingEase: 0, fleschKincaidGrade: 0, gunningFog: 0, smog: 0,
      colemanLiau: 0, ari: 0, avgWordsPerSentence: 0, avgSyllablesPerWord: 0,
      longestSentence: '',
    };
  }
  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = syllables / wordCount;
  const fleschReadingEase =
    206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  const fleschKincaidGrade =
    0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
  const gunningFog = 0.4 * (avgWordsPerSentence + 100 * (complexWords / wordCount));
  const smog =
    sentenceCount >= 30
      ? 1.043 * Math.sqrt(complexWords * (30 / sentenceCount)) + 3.1291
      : 1.043 * Math.sqrt(complexWords * (30 / Math.max(sentenceCount, 1))) + 3.1291;
  const L = (characters / wordCount) * 100;
  const S = (sentenceCount / wordCount) * 100;
  const colemanLiau = 0.0588 * L - 0.296 * S - 15.8;
  const ari = 4.71 * (characters / wordCount) + 0.5 * avgWordsPerSentence - 21.43;
  const longestSentence = sentenceArr.reduce(
    (a, b) => (b.trim().split(/\s+/).length > a.trim().split(/\s+/).length ? b : a),
    sentenceArr[0] ?? ''
  );
  return {
    words: wordCount,
    sentences: sentenceCount,
    syllables,
    complexWords,
    characters,
    fleschReadingEase: Math.max(0, Math.min(100, fleschReadingEase)),
    fleschKincaidGrade: Math.max(0, fleschKincaidGrade),
    gunningFog: Math.max(0, gunningFog),
    smog: Math.max(0, smog),
    colemanLiau: Math.max(0, colemanLiau),
    ari: Math.max(0, ari),
    avgWordsPerSentence,
    avgSyllablesPerWord,
    longestSentence: longestSentence.trim(),
  };
}

function describeFlesch(score: number) {
  if (score >= 90) return { text: 'Very Easy', details: 'Easily understood by an average 11-year-old.', color: 'bg-green-500' };
  if (score >= 80) return { text: 'Easy', details: 'Conversational English.', color: 'bg-green-400' };
  if (score >= 70) return { text: 'Fairly Easy', details: 'Easy for 13–15 year olds.', color: 'bg-lime-400' };
  if (score >= 60) return { text: 'Standard', details: 'Plain English for ages 15–16.', color: 'bg-yellow-400' };
  if (score >= 50) return { text: 'Fairly Difficult', details: 'High-school graduate level.', color: 'bg-orange-400' };
  if (score >= 30) return { text: 'Difficult', details: 'College graduate level.', color: 'bg-orange-500' };
  return { text: 'Very Difficult', details: 'University graduate level.', color: 'bg-red-500' };
}

const ReadabilityScore: React.FC<ToolProps> = ({ details, toolId, tool }) => {
  const [text, setText] = useState(
    'The quick brown fox jumps over the lazy dog. This sentence is easy to read. Complex sentences, however, are more difficult to understand.'
  );
  const toast = useToast();
  const debounced = useDebounce(text, 400);
  const stats = useMemo(() => analyze(debounced), [debounced]);
  const fleschInfo = describeFlesch(stats.fleschReadingEase);

  const handleFile = useCallback(
    async (file: File) => {
      try {
        const t = await file.text();
        setText(t);
        toast.success(`Loaded ${file.name}`);
      } catch {
        toast.error('Could not read file');
      }
    },
    [toast]
  );

  const report = useMemo(() => {
    return [
      '# Readability report',
      '',
      `Flesch Reading Ease: ${stats.fleschReadingEase.toFixed(1)}  (${fleschInfo.text})`,
      `Flesch–Kincaid Grade: ${stats.fleschKincaidGrade.toFixed(1)}`,
      `Gunning Fog Index: ${stats.gunningFog.toFixed(1)}`,
      `SMOG Index: ${stats.smog.toFixed(1)}`,
      `Coleman–Liau Index: ${stats.colemanLiau.toFixed(1)}`,
      `Automated Readability Index: ${stats.ari.toFixed(1)}`,
      '',
      `Words: ${stats.words}`,
      `Sentences: ${stats.sentences}`,
      `Syllables: ${stats.syllables}`,
      `Complex words (3+ syllables): ${stats.complexWords}`,
      `Avg words / sentence: ${stats.avgWordsPerSentence.toFixed(1)}`,
      `Avg syllables / word: ${stats.avgSyllablesPerWord.toFixed(2)}`,
      '',
      'Longest sentence:',
      stats.longestSentence || '(none)',
    ].join('\n');
  }, [stats, fleschInfo]);

  const copyReport = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(report);
      toast.success('Report copied');
    } catch {
      toast.error('Copy failed');
    }
  }, [report, toast]);

  const downloadReport = useCallback(() => {
    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'readability-report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [report]);

  return (
    <ToolContainer
      title={tool?.name || 'Readability Score Calculator'}
      details={details}
      toolId={toolId}
    >
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFile}
          accept=".txt,.md,text/plain"
          maxSizeMB={20}
          title="Drop a document"
          description="or paste your text below"
        />

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2">
            <Label htmlFor="readability-input">Text input</Label>
            <TextArea
              id="readability-input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your text here to calculate its readability score..."
              className="h-[500px]"
            />
          </div>

          <div className="space-y-4" aria-live="polite">
            <Card className="text-center p-6 border-blue-100 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-900/10">
              <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                Flesch Reading Ease
              </h3>
              <div className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-3 tabular-nums">
                {stats.fleschReadingEase.toFixed(1)}
              </div>
              <div
                className={`inline-block px-4 py-1.5 rounded-full text-white text-sm font-bold shadow-sm ${fleschInfo.color}`}
              >
                {fleschInfo.text}
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {fleschInfo.details}
              </p>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Metric label="Flesch–Kincaid Grade" value={stats.fleschKincaidGrade} />
              <Metric label="Gunning Fog" value={stats.gunningFog} />
              <Metric label="SMOG Index" value={stats.smog} />
              <Metric label="Coleman–Liau" value={stats.colemanLiau} />
              <Metric label="ARI" value={stats.ari} wide={false} />
              <Metric label="Avg words/sentence" value={stats.avgWordsPerSentence} wide={false} />
            </div>

            <Card title="Detail" className="space-y-3">
              <div className="grid grid-cols-3 gap-3 text-center">
                <Stat label="Words" v={stats.words} />
                <Stat label="Sentences" v={stats.sentences} />
                <Stat label="Syllables" v={stats.syllables} />
                <Stat label="Complex words" v={stats.complexWords} />
                <Stat label="Characters" v={stats.characters} />
                <Stat label="Syll / word" v={Number(stats.avgSyllablesPerWord.toFixed(2))} />
              </div>
              {stats.longestSentence && (
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <div className="font-semibold mb-1 uppercase tracking-wide text-[10px]">
                    Longest sentence ({stats.longestSentence.trim().split(/\s+/).length} words)
                  </div>
                  <blockquote className="italic border-l-2 border-amber-400 pl-2">
                    {stats.longestSentence}
                  </blockquote>
                </div>
              )}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={copyReport}
                  className="px-3 py-1.5 rounded-md text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 inline-flex items-center"
                >
                  <Copy size={14} className="mr-1.5" /> Copy report
                </button>
                <button
                  type="button"
                  onClick={downloadReport}
                  className="px-3 py-1.5 rounded-md text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 inline-flex items-center"
                >
                  <Download size={14} className="mr-1.5" /> Download .md
                </button>
              </div>
            </Card>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs text-gray-600 dark:text-gray-400 flex gap-2">
              <BookOpen className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                <strong>Flesch Reading Ease</strong> rates text from 0 (hardest) to 100 (easiest).
                <strong> Flesch–Kincaid</strong>, <strong>Gunning Fog</strong>, <strong>SMOG</strong>,
                <strong> Coleman–Liau</strong> and <strong>ARI</strong> all translate to a U.S.
                school grade level — aim for grade 7–9 for general audiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

const Stat: React.FC<{ label: string; v: number }> = ({ label, v }) => (
  <div className="bg-white dark:bg-gray-900 p-2 rounded border border-gray-100 dark:border-gray-800 shadow-sm">
    <div className="text-base font-bold text-gray-800 dark:text-gray-200 tabular-nums">
      {v.toLocaleString()}
    </div>
    <div className="text-gray-500 text-[10px] font-medium uppercase tracking-wide mt-0.5">
      {label}
    </div>
  </div>
);

const Metric: React.FC<{ label: string; value: number; wide?: boolean }> = ({
  label,
  value,
}) => (
  <Card className="p-3 text-center">
    <div className="text-xl font-bold text-gray-800 dark:text-gray-100 tabular-nums">
      {value.toFixed(1)}
    </div>
    <div className="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5">{label}</div>
  </Card>
);

export default ReadabilityScore;

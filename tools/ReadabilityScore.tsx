'use client';

import React, { useState, useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import { BookOpen } from 'lucide-react';

const countSyllables = (word: string): number => {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 0;
};

const ReadabilityScore: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState(
    'The quick brown fox jumps over the lazy dog. This sentence is easy to read. Complex sentences, however, are more difficult to understand.',
  );

  const debouncedText = useDebounce(text, 500);

  const stats = useMemo(() => {
    const sentences = debouncedText.match(/[^.!?]+[.!?]+/g) || [];
    const words = debouncedText
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    const syllables = words.reduce(
      (acc, word) => acc + countSyllables(word),
      0,
    );

    const wordCount = words.length;
    const sentenceCount = sentences.length;

    if (wordCount === 0 || sentenceCount === 0) {
      return {
        wordCount: 0,
        sentenceCount: 0,
        syllableCount: 0,
        fleschReadingEase: 0,
        fleschKincaidGrade: 0,
      };
    }

    const fleschReadingEase =
      206.835 -
      1.015 * (wordCount / sentenceCount) -
      84.6 * (syllables / wordCount);
    const fleschKincaidGrade =
      0.39 * (wordCount / sentenceCount) +
      11.8 * (syllables / wordCount) -
      15.59;

    return {
      wordCount,
      sentenceCount,
      syllableCount: syllables,
      fleschReadingEase: Math.max(0, Math.min(100, fleschReadingEase)),
      fleschKincaidGrade: Math.max(0, fleschKincaidGrade),
    };
  }, [debouncedText]);

  const getScoreDescription = (score: number) => {
    if (score >= 90)
      return {
        text: 'Very Easy',
        details: 'Easily understood by an average 11-year-old student.',
        color: 'bg-green-500',
      };
    if (score >= 80)
      return {
        text: 'Easy',
        details: 'Conversational English.',
        color: 'bg-green-400',
      };
    if (score >= 70)
      return {
        text: 'Fairly Easy',
        details: 'Easily understood by 13- to 15-year-old students.',
        color: 'bg-lime-400',
      };
    if (score >= 60)
      return {
        text: 'Standard',
        details:
          'Plain English. Easily understood by 15- to 16-year-old students.',
        color: 'bg-yellow-400',
      };
    if (score >= 50)
      return {
        text: 'Fairly Difficult',
        details: 'Best understood by high school graduates.',
        color: 'bg-orange-400',
      };
    if (score >= 30)
      return {
        text: 'Difficult',
        details: 'Best understood by college graduates.',
        color: 'bg-orange-500',
      };
    return {
      text: 'Very Difficult',
      details: 'Best understood by university graduates.',
      color: 'bg-red-500',
    };
  };

  const scoreInfo = getScoreDescription(stats.fleschReadingEase);

  return (
    <ToolContainer
      title="Readability Score Calculator"
      details={details}
      toolId={toolId}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Text Input</Label>
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here to calculate its readability score..."
            className="w-full h-[500px]"
          />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="text-center p-6 border-blue-100 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-900/10">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                Flesch Reading Ease
              </h3>
              <div className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
                {stats.fleschReadingEase.toFixed(1)}
              </div>
              <div className="relative">
                <div
                  className={`inline-block px-4 py-1.5 rounded-full text-white text-sm font-bold shadow-sm ${scoreInfo.color}`}
                >
                  {scoreInfo.text}
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {scoreInfo.details}
                </p>
              </div>
            </Card>

            <Card className="text-center p-6 flex flex-col justify-center">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                US Grade Level
              </h3>
              <div className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-2">
                {stats.fleschKincaidGrade.toFixed(1)}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Corresponds to a U.S. school grade level.
              </p>
            </Card>
          </div>

          <Card title="Detailed Statistics">
            <div className="grid grid-cols-3 gap-4 text-center">
              <StatBox label="Words" value={stats.wordCount} />
              <StatBox label="Sentences" value={stats.sentenceCount} />
              <StatBox label="Syllables" value={stats.syllableCount} />
            </div>
          </Card>

          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2 mb-2 font-semibold text-gray-900 dark:text-gray-200">
              <BookOpen className="w-4 h-4" />
              About these scores
            </div>
            <p>
              The <strong>Flesch Reading Ease</strong> score measures how easy it is to read text. Higher scores indicate easier reading.
              The <strong>Flesch-Kincaid Grade Level</strong> translates the score to a U.S. school grade level. For example, a score of 8.0 means an 8th grader can understand the text.
            </p>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

const StatBox: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-100 dark:border-gray-800 shadow-sm">
    <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
      {value.toLocaleString()}
    </div>
    <div className="text-gray-500 text-xs font-medium uppercase tracking-wide mt-1">{label}</div>
  </div>
);

export default ReadabilityScore;

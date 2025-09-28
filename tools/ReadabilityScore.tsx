
'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const countSyllables = (word: string): number => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 0;
};

const ReadabilityScore: React.FC<ToolProps> = ({ details, toolId }) => {
    const [text, setText] = useState('The quick brown fox jumps over the lazy dog. This sentence is easy to read. Complex sentences, however, are more difficult to understand.');

    const stats = useMemo(() => {
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        const syllables = words.reduce((acc, word) => acc + countSyllables(word), 0);

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

        const fleschReadingEase = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount);
        const fleschKincaidGrade = 0.39 * (wordCount / sentenceCount) + 11.8 * (syllables / wordCount) - 15.59;

        return {
            wordCount,
            sentenceCount,
            syllableCount: syllables,
            fleschReadingEase: Math.max(0, Math.min(100, fleschReadingEase)),
            fleschKincaidGrade: Math.max(0, fleschKincaidGrade),
        };
    }, [text]);
    
    const getScoreDescription = (score: number) => {
        if (score >= 90) return { text: "Very Easy", details: "Easily understood by an average 11-year-old student.", color: "bg-green-500" };
        if (score >= 80) return { text: "Easy", details: "Conversational English.", color: "bg-green-400" };
        if (score >= 70) return { text: "Fairly Easy", details: "Easily understood by 13- to 15-year-old students.", color: "bg-lime-400" };
        if (score >= 60) return { text: "Standard", details: "Plain English. Easily understood by 15- to 16-year-old students.", color: "bg-yellow-400" };
        if (score >= 50) return { text: "Fairly Difficult", details: "Best understood by high school graduates.", color: "bg-orange-400" };
        if (score >= 30) return { text: "Difficult", details: "Best understood by college graduates.", color: "bg-orange-500" };
        return { text: "Very Difficult", details: "Best understood by university graduates.", color: "bg-red-500" };
    };

    const scoreInfo = getScoreDescription(stats.fleschReadingEase);

    return (
        <ToolContainer title="Readability Score Calculator" details={details} toolId={toolId}>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your text here to calculate its readability score..."
                        className="w-full h-96 bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Flesch Reading Ease</h3>
                        <p className="text-6xl font-bold text-blue-500 dark:text-blue-400">{stats.fleschReadingEase.toFixed(1)}</p>
                        <div className="mt-4">
                            <div className={`text-xl font-bold px-4 py-1 rounded-full inline-block text-white ${scoreInfo.color}`}>{scoreInfo.text}</div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{scoreInfo.details}</p>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Flesch-Kincaid Grade Level</h3>
                        <p className="text-6xl font-bold text-blue-500 dark:text-blue-400">{stats.fleschKincaidGrade.toFixed(1)}</p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Corresponds to a U.S. school grade level.</p>
                    </div>
                     <div className="grid grid-cols-3 gap-4 text-center">
                        <StatCard label="Words" value={stats.wordCount} />
                        <StatCard label="Sentences" value={stats.sentenceCount} />
                        <StatCard label="Syllables" value={stats.syllableCount} />
                    </div>
                </div>
            </div>
        </ToolContainer>
    );
};

const StatCard: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        <div className="text-2xl font-bold text-blue-400">{value.toLocaleString()}</div>
        <div className="text-gray-500 dark:text-gray-400 text-sm">{label}</div>
    </div>
);

export default ReadabilityScore;

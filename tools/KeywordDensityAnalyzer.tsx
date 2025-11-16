
'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const STOP_WORDS = new Set(['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 's', 'same', 'she', 'should', 'so', 'some', 'such', 't', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves']);

const KeywordDensityAnalyzer: React.FC<ToolProps> = ({ details, toolId }) => {
    const [text, setText] = useState('The quick brown fox jumps over the lazy dog. The dog was not amused.');
    const [ignoreStopWords, setIgnoreStopWords] = useState(true);

    const analysis = useMemo(() => {
        const cleanedText = text.toLowerCase().replace(/[^\w\s']/g, '');
        const words = cleanedText.split(/\s+/).filter(Boolean);

        const filteredWords = ignoreStopWords ? words.filter(word => !STOP_WORDS.has(word)) : words;
        const totalWords = filteredWords.length;

        if (totalWords === 0) {
            return { one_word: [], two_words: [], three_words: [] };
        }

        const getNgramFrequency = (n: number) => {
            const ngramMap: { [key: string]: number } = {};
            for (let i = 0; i <= filteredWords.length - n; i++) {
                const ngram = filteredWords.slice(i, i + n).join(' ');
                ngramMap[ngram] = (ngramMap[ngram] || 0) + 1;
            }
            return Object.entries(ngramMap)
                .map(([keyword, count]) => ({ keyword, count, density: (count / totalWords) * 100 }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 20);
        };

        return {
            one_word: getNgramFrequency(1),
            two_words: getNgramFrequency(2),
            three_words: getNgramFrequency(3),
        };
    }, [text, ignoreStopWords]);

    return (
        <ToolContainer title="Keyword Density Analyzer" details={details} toolId={toolId}>
            <div className="space-y-4">
                <div className="relative">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text here to analyze keyword density..."
                        className="w-full h-48 bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {text && <CopyButton textToCopy={text} className="absolute top-2 right-2" />}
                </div>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer">
                        <input
                            type="checkbox"
                            checked={ignoreStopWords}
                            onChange={() => setIgnoreStopWords(prev => !prev)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>Ignore Common Stop Words</span>
                    </label>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    <KeywordTable title="One-Word Keywords" data={analysis.one_word} />
                    <KeywordTable title="Two-Word Keywords" data={analysis.two_words} />
                    <KeywordTable title="Three-Word Keywords" data={analysis.three_words} />
                </div>
            </div>
        </ToolContainer>
    );
};

interface KeywordTableProps {
    title: string;
    data: { keyword: string; count: number; density: number }[];
}

const KeywordTable: React.FC<KeywordTableProps> = ({ title, data }) => (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">{title}</h3>
        <div className="overflow-auto h-80">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-700 sticky top-0">
                    <tr>
                        <th scope="col" className="px-4 py-2">Keyword</th>
                        <th scope="col" className="px-4 py-2 text-right">Count</th>
                        <th scope="col" className="px-4 py-2 text-right">Density</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map(({ keyword, count, density }) => (
                        <tr key={keyword} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-4 py-2 font-medium">{keyword}</td>
                            <td className="px-4 py-2 text-right">{count}</td>
                            <td className="px-4 py-2 text-right">{density.toFixed(2)}%</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={3} className="text-center py-4 text-gray-500">No data to display.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export default KeywordDensityAnalyzer;

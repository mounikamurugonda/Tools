
'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

const RegexTester: React.FC<ToolProps> = ({ details }) => {
    const [regexStr, setRegexStr] = useState('d(b+)d');
    const [flags, setFlags] = useState('g');
    const [testStr, setTestStr] = useState('cdbbdbsbz');
    const [error, setError] = useState<string | null>(null);

    const { matches, highlightedText } = useMemo(() => {
        if (!regexStr) {
            return { matches: [], highlightedText: testStr };
        }

        try {
            const regex = new RegExp(regexStr, flags);
            setError(null);
            
            const localMatches = Array.from(testStr.matchAll(regex));
            
            let lastIndex = 0;
            const parts = [];
            localMatches.forEach(match => {
                if (match.index === undefined) return;
                if (match.index > lastIndex) {
                    parts.push(testStr.substring(lastIndex, match.index));
                }
                parts.push(`<mark class="bg-blue-500/30 dark:bg-blue-500/50 rounded px-1">${match[0]}</mark>`);
                lastIndex = match.index + match[0].length;
            });
            if (lastIndex < testStr.length) {
                parts.push(testStr.substring(lastIndex));
            }

            return { matches: localMatches, highlightedText: parts.join('') };

        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            return { matches: [], highlightedText: testStr };
        }
    }, [regexStr, flags, testStr]);

    return (
        <ToolContainer title="Regex Tester" details={details}>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                    <span className="flex items-center text-lg font-mono text-gray-500 dark:text-gray-400">/</span>
                    <input
                        type="text"
                        value={regexStr}
                        onChange={(e) => setRegexStr(e.target.value)}
                        placeholder="Regular Expression"
                        className="flex-grow bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                    <span className="flex items-center text-lg font-mono text-gray-500 dark:text-gray-400">/</span>
                    <input
                        type="text"
                        value={flags}
                        onChange={(e) => setFlags(e.target.value)}
                        placeholder="flags"
                        className="w-24 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                </div>
                {error && <div className="p-2 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-300 text-sm">{error}</div>}

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Test String</label>
                    <textarea
                        value={testStr}
                        onChange={(e) => setTestStr(e.target.value)}
                        placeholder="Text to test against..."
                        className="w-full h-32 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Result</h3>
                        <div
                            className="w-full h-48 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-2 text-gray-800 dark:text-gray-200 font-mono overflow-auto whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: highlightedText }}
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Matches ({matches.length})</h3>
                        <div className="w-full h-48 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-2 text-gray-800 dark:text-gray-200 font-mono overflow-auto">
                            {matches.length > 0 ? (
                                matches.map((match, i) => (
                                    <div key={i} className="mb-2 p-1 border-b border-gray-200 dark:border-gray-800">
                                        <p><strong>Full Match {i}:</strong> {match[0]}</p>
                                        {match.length > 1 && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Groups: {JSON.stringify(match.slice(1))}</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No matches found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ToolContainer>
    );
};

export default RegexTester;
import React, { useState, useMemo } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

declare const Diff: any;

const DiffChecker: React.FC<ToolProps> = () => {
    const [originalText, setOriginalText] = useState('Hello World\nThis is the original text.\nIt has three lines.');
    const [changedText, setChangedText] = useState('Hello There\nThis is the new text.\nIt also has three lines.');

    const diffResult = useMemo(() => {
        if (typeof Diff === 'undefined') return [];
        return Diff.diffLines(originalText, changedText);
    }, [originalText, changedText]);

    return (
        <ToolContainer title="Diff Checker">
            <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 h-[40vh]">
                    <textarea
                        value={originalText}
                        onChange={(e) => setOriginalText(e.target.value)}
                        placeholder="Original text"
                        className="w-full h-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 font-mono resize-none"
                    />
                    <textarea
                        value={changedText}
                        onChange={(e) => setChangedText(e.target.value)}
                        placeholder="Changed text"
                        className="w-full h-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 font-mono resize-none"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Differences</h3>
                    <pre className="w-full h-[40vh] bg-gray-900 border border-gray-700 rounded p-2 text-sm text-gray-200 font-mono overflow-auto">
                        {diffResult.map((part: any, index: number) => {
                            const color = part.added ? 'bg-green-900/50' : part.removed ? 'bg-red-900/50' : 'bg-transparent';
                            const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';
                            return (
                                <div key={index} className={color}>
                                    {part.value.split('\n').filter((line: string, i: number) => i < part.value.split('\n').length - 1 || line !== '').map((line: string, lineIndex: number) => (
                                        <div key={lineIndex}>
                                            <span className="select-none">{prefix}</span>
                                            <span>{line}</span>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </pre>
                </div>
            </div>
        </ToolContainer>
    );
};

export default DiffChecker;
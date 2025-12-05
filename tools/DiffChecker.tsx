'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import * as Diff from 'diff';
import CopyButton from '@/components/CopyButton';

const DiffChecker: React.FC<ToolProps> = ({ details, toolId }) => {
  const [originalText, setOriginalText] = useState(
    'Hello World\nThis is the original text.\nIt has three lines.',
  );
  const [changedText, setChangedText] = useState(
    'Hello There\nThis is the new text.\nIt also has three lines.',
  );

  const diffResult = useMemo(() => {
    return Diff.diffLines(originalText, changedText);
  }, [originalText, changedText]);

  return (
    <ToolContainer title="Diff Checker" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4 h-[40vh]">
          <div className="relative h-full">
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Original text"
              className="w-full h-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 font-mono resize-none"
            />
            {originalText && (
              <CopyButton
                textToCopy={originalText}
                className="absolute top-2 right-2"
              />
            )}
          </div>
          <div className="relative h-full">
            <textarea
              value={changedText}
              onChange={(e) => setChangedText(e.target.value)}
              placeholder="Changed text"
              className="w-full h-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 font-mono resize-none"
            />
            {changedText && (
              <CopyButton
                textToCopy={changedText}
                className="absolute top-2 right-2"
              />
            )}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Differences</h3>
          <pre className="w-full h-[40vh] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-2 text-sm text-gray-800 dark:text-gray-200 font-mono overflow-auto">
            {diffResult.map((part, index) => {
              const color = part.added
                ? 'bg-green-100 dark:bg-green-900/50'
                : part.removed
                  ? 'bg-red-100 dark:bg-red-900/50'
                  : 'bg-transparent';
              const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';
              return (
                <div key={index} className={color}>
                  {part.value
                    .split('\n')
                    .filter(
                      (line: string, i: number) =>
                        i < part.value.split('\n').length - 1 || line !== '',
                    )
                    .map((line: string, lineIndex: number) => (
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

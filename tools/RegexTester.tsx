'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import { AlertCircle } from 'lucide-react';

const RegexTester: React.FC<ToolProps> = ({ details, toolId }) => {
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
      const parts: string[] = [];
      localMatches.forEach((match) => {
        const m = match as RegExpMatchArray;
        if (m.index === undefined) return;
        if (m.index > lastIndex) {
          parts.push(testStr.substring(lastIndex, m.index));
        }
        parts.push(
          `<mark class="bg-blue-500/30 dark:bg-blue-500/50 rounded px-1 text-blue-900 dark:text-blue-100">${m[0]}</mark>`,
        );
        lastIndex = m.index + m[0].length;
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
    <ToolContainer title="Regex Tester" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Pattern">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 flex items-center gap-2 w-full">
              <span className="text-xl font-mono text-gray-400 select-none">/</span>
              <Input
                value={regexStr}
                onChange={(e) => setRegexStr(e.target.value)}
                placeholder="Regular Expression"
                className="font-mono"
              />
              <span className="text-xl font-mono text-gray-400 select-none">/</span>
            </div>
            <div className="w-full sm:w-24">
              <Input
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                placeholder="flags"
                className="font-mono text-center"
              />
            </div>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </Card>

        <div className="space-y-2">
          <Label>Test String</Label>
          <div className="relative">
            <TextArea
              value={testStr}
              onChange={(e) => setTestStr(e.target.value)}
              placeholder="Text to test against..."
              className="h-32 font-mono"
            />
            {testStr && (
              <div className="absolute top-2 right-2">
                <CopyButton textToCopy={testStr} />
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Result (Highlighted)" className="h-full flex flex-col">
            <div
              className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-gray-800 dark:text-gray-200 font-mono overflow-auto whitespace-pre-wrap h-64"
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          </Card>

          <Card
            title={
              <div className="flex justify-between items-center">
                <span>Matches</span>
                <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  {matches.length} found
                </span>
              </div>
            }
            className="h-full flex flex-col"
          >
            <div className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-gray-800 dark:text-gray-200 font-mono overflow-auto h-64 space-y-2">
              {matches.length > 0 ? (
                matches.map((match, i) => (
                  <div
                    key={i}
                    className="p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded text-sm"
                  >
                    <div className="flex gap-2 mb-1">
                      <span className="text-blue-500 font-bold">#{i + 1}</span>
                      <span className="break-all">{match[0]}</span>
                    </div>
                    {match.length > 1 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 pl-6 border-l-2 border-gray-100 dark:border-gray-700 ml-1">
                        Groups: {JSON.stringify(Array.from(match).slice(1))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">
                  No matches found
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default RegexTester;
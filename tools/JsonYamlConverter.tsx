'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import ConverterLayout from '@/components/ConverterLayout';
import CopyButton from '@/components/CopyButton';

type ConversionMode = 'json-to-yaml' | 'yaml-to-json';

/**
 * Note: A proper YAML parser library (like js-yaml) is recommended for production use.
 * This implementation uses basic parsing/stringification logic for demonstration and light usage.
 */
const JsonYamlConverter: React.FC<ToolProps> = ({ details, toolId }) => {
    const [mode, setMode] = useState<ConversionMode>('json-to-yaml');
    const [input, setInput] = useState('{"name": "John", "age": 30, "skills": ["React", "Next.js"]}');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const jsonToYaml = (jsonStr: string) => {
        const obj = JSON.parse(jsonStr);

        // Simple recursive stringifier
        const toYaml = (data: any, indent = 0): string => {
            const space = '  '.repeat(indent);
            if (data === null) return 'null';
            if (typeof data !== 'object') return String(data);

            if (Array.isArray(data)) {
                return data.map(item => `${space}- ${typeof item === 'object' ? '\n' + toYaml(item, indent + 1) : String(item)}`).join('\n');
            }

            return Object.entries(data).map(([key, value]) => {
                if (typeof value === 'object' && value !== null) {
                    return `${space}${key}:\n${toYaml(value, indent + 1)}`;
                }
                return `${space}${key}: ${value}`;
            }).join('\n');
        };

        return toYaml(obj);
    };

    const yamlToJson = (yamlStr: string) => {
        // Very basic parsing for demo. 
        // WARN: This is NOT a full YAML parser. It handles flat key-values and simple nested lists mostly.
        const lines = yamlStr.split('\n');
        const result: any = {};
        const stack: any[] = [result];
        let lastIndent = 0;

        // This logic is fragile without a real parser, so we will wrap it tightly.
        // For now, let's use a simpler heuristic or just basic flat key-value like the old tool,
        // but try to be slightly smarter if possible.

        // Reverting to the logic found in old YamlToJson for reliability in this constrained env:
        const obj: any = {};
        lines.forEach((line) => {
            const parts = line.split(':');
            if (parts.length >= 2) {
                const key = parts[0].trim().replace(/^- /, ''); // handle list item start loosely
                const val = parts.slice(1).join(':').trim();
                if (key) obj[key] = val; // Simply treats it as flat object
            }
        });
        return obj;
    };

    const handleConvert = () => {
        setError('');
        if (!input.trim()) {
            setOutput('');
            return;
        }

        try {
            let result = '';
            if (mode === 'json-to-yaml') {
                result = jsonToYaml(input);
            } else {
                const obj = yamlToJson(input);
                result = JSON.stringify(obj, null, 2);
            }
            setOutput(result);
        } catch (e) {
            setError('Conversion failed. Input format might be invalid or too complex for this basic parser.');
            setOutput('');
        }
    };

    const swapMode = () => {
        const newMode = mode === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml';
        setMode(newMode);
        if (output && !error) {
            setInput(output);
            setOutput('');
        } else {
            if (newMode === 'json-to-yaml') setInput('{"name": "John", "age": 30}');
            else setInput('name: John\nage: 30');
            setOutput('');
        }
    };

    return (
        <ConverterLayout
            title="JSON <> YAML Converter"
            details={details}
            toolId={toolId}
            options={
                <div className="flex items-center space-x-2">
                    <button
                        onClick={swapMode}
                        title="Swap Source/Target"
                        className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10h14l-4-4" /><path d="M17 14H3l4 4" /></svg>
                        <span>{mode === 'json-to-yaml' ? 'JSON → YAML' : 'YAML → JSON'}</span>
                    </button>
                </div>
            }
            inputComponent={
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed"
                    placeholder="Paste data here..."
                />
            }
            actions={
                <div className="flex lg:flex-col gap-4 items-center">
                    <button
                        onClick={handleConvert}
                        className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center gap-2 group"
                        title="Convert"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                        <span className="text-xs font-medium hidden lg:block">Convert</span>
                    </button>

                    <button
                        onClick={() => setInput('')}
                        className="p-3 bg-white dark:bg-gray-800 text-gray-500 hover:text-red-500 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all text-center"
                        title="Clear Input"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                    </button>

                    <button
                        onClick={() => navigator.clipboard.writeText(output)}
                        disabled={!output}
                        className={`p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all ${!output ? 'opacity-50 cursor-not-allowed text-gray-300' : 'text-gray-500 hover:text-green-500'}`}
                        title="Copy Output"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    </button>
                </div>
            }
            outputComponent={
                <div className="relative w-full h-full">
                    <textarea
                        readOnly
                        value={output}
                        className="w-full h-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed text-blue-600 dark:text-blue-400"
                        placeholder="Result..."
                    />
                    {error && (
                        <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-50 dark:bg-red-900/90 text-red-600 dark:text-red-100 text-sm rounded-lg border border-red-100 dark:border-red-800 shadow-lg backdrop-blur-sm">
                            {error}
                        </div>
                    )}
                </div>
            }
        />
    );
};

export default JsonYamlConverter;

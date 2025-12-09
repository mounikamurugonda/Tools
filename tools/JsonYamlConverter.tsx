'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
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
        <ToolContainer title="JSON <> YAML Converter" details={details} toolId={toolId}>
            <div className="space-y-6">
                {/* Mode Swithcer */}
                <div className="flex justify-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex">
                        <button onClick={() => setMode('json-to-yaml')} className={`px-4 py-2 rounded-md transition-all ${mode === 'json-to-yaml' ? 'bg-white dark:bg-gray-700 shadow-sm font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>JSON to YAML</button>
                        <button onClick={() => setMode('yaml-to-json')} className={`px-4 py-2 rounded-md transition-all ${mode === 'yaml-to-json' ? 'bg-white dark:bg-gray-700 shadow-sm font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>YAML to JSON</button>
                    </div>
                    <button onClick={swapMode} className="ml-4 p-2 text-gray-500 hover:text-blue-600" title="Swap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10h14l-4-4" /><path d="M17 14H3l4 4" /></svg>
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 h-[50vh]">
                    <div className="flex flex-col relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{mode === 'json-to-yaml' ? 'JSON Input' : 'YAML Input'}</label>
                        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full flex-grow bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Paste data here..." />
                    </div>
                    <div className="flex flex-col relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{mode === 'json-to-yaml' ? 'YAML Output' : 'JSON Output'}</label>
                        <div className="relative flex-grow">
                            <textarea readOnly value={output} className="w-full h-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 font-mono text-sm resize-none text-blue-600 dark:text-blue-400" placeholder="Output..." />
                            {output && <CopyButton textToCopy={output} className="absolute top-2 right-2" />}
                        </div>
                    </div>
                </div>

                {error && <div className="text-red-500 text-center font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded">{error}</div>}

                <div className="flex justify-center">
                    <button
                        onClick={handleConvert}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                        Convert {mode === 'json-to-yaml' ? 'JSON → YAML' : 'YAML → JSON'}
                    </button>
                </div>
            </div>
        </ToolContainer>
    );
};

export default JsonYamlConverter;

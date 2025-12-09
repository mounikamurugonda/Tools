'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

type ConversionMode = 'json-to-csv' | 'csv-to-json';

interface JsonCsvOptions {
    separator: string;
    customSeparator: string;
    // JSON -> CSV options
    includeHeaders: boolean;
    replaceLineBreaks: boolean;
    lineBreakReplacement: string;
    // CSV -> JSON options
    outputFormat: 'objects' | 'arrays';
    parseNumbers: boolean;
    parseBooleans: boolean;
}

const JsonCsvConverter: React.FC<ToolProps> = ({ details, toolId }) => {
    const [mode, setMode] = useState<ConversionMode>('json-to-csv');
    const [input, setInput] = useState(
        '[\n  {\n    "name": "Alice, Smith",\n    "age": 30,\n    "city": "New York"\n  },\n  {\n    "name": "Bob",\n    "age": 25,\n    "city": "Los Angeles"\n  }\n]',
    );
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    // Combined Options
    const [separator, setSeparator] = useState(',');
    const [customSeparator, setCustomSeparator] = useState('');
    const [includeHeaders, setIncludeHeaders] = useState(true);
    const [replaceLineBreaks, setReplaceLineBreaks] = useState(true);
    const [lineBreakReplacement, setLineBreakReplacement] = useState(' ');
    const [outputFormat, setOutputFormat] = useState<'objects' | 'arrays'>('objects');
    const [parseNumbers, setParseNumbers] = useState(true);
    const [parseBooleans, setParseBooleans] = useState(true);

    const getEffectiveSeparator = () => (separator === 'custom' ? customSeparator : separator);

    // --- Logic Conversion ---

    const jsonToCsv = (jsonStr: string) => {
        const json = JSON.parse(jsonStr);
        if (!Array.isArray(json)) throw new Error('Input must be an array of objects.');
        if (json.length === 0) return '';

        const sep = getEffectiveSeparator();
        if (!sep && separator === 'custom') return '';

        const headers = Object.keys(json[0]);
        const csvRows = [];

        if (includeHeaders) {
            csvRows.push(headers.join(sep));
        }

        for (const row of json) {
            const values = headers.map((header) => {
                const val = row[header as keyof typeof row];
                let strVal = String(val === null || val === undefined ? '' : val);

                if (replaceLineBreaks) {
                    strVal = strVal.replace(/(\r\n|\n|\r)/gm, lineBreakReplacement);
                }

                if (strVal.includes(sep) || strVal.includes('"') || strVal.includes('\n')) {
                    return `"${strVal.replace(/"/g, '""')}"`;
                }
                return strVal;
            });
            csvRows.push(values.join(sep));
        }
        return csvRows.join('\n');
    };

    const csvToJson = (csvStr: string) => {
        const lines = csvStr.split('\n').map((l) => l.trim()).filter(Boolean);
        if (lines.length === 0) return [];

        const sep = getEffectiveSeparator();
        if (!sep && separator === 'custom') return [];

        const parseValue = (val: string): string | number | boolean => {
            const trimmedVal = val.trim();
            if (parseNumbers && trimmedVal !== '' && !isNaN(Number(trimmedVal))) {
                return Number(trimmedVal);
            }
            if (parseBooleans) {
                if (trimmedVal.toLowerCase() === 'true') return true;
                if (trimmedVal.toLowerCase() === 'false') return false;
            }
            return val;
        };

        if (outputFormat === 'arrays') {
            return lines.map((line) => line.split(sep).map(parseValue));
        }

        // Objects format
        if (lines.length < 2) {
            if (lines.length === 1 && lines[0]) throw new Error("CSV needed at least header + 1 row for Object format.");
            return [];
        }

        const headers = lines[0].split(sep).map((h) => h.trim());
        const jsonArray: Record<string, any>[] = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(sep);
            const entry: Record<string, any> = {};
            headers.forEach((header, index) => {
                entry[header] = parseValue(values[index] || '');
            });
            jsonArray.push(entry);
        }
        return jsonArray;
    };


    const handleConvert = () => {
        setError('');
        if (!input.trim()) {
            setOutput('');
            return;
        }

        try {
            let result: string | any = '';
            if (mode === 'json-to-csv') {
                result = jsonToCsv(input);
            } else {
                result = csvToJson(input);
                result = JSON.stringify(result, null, 2);
            }
            setOutput(result);
        } catch (e) {
            if (e instanceof Error) setError(e.message);
            else setError('Conversion failed. Check your input format.');
            setOutput('');
        }
    };

    const swapMode = () => {
        // Attempt to swap input/output if valid
        const newMode = mode === 'json-to-csv' ? 'csv-to-json' : 'json-to-csv';
        setMode(newMode);

        // Swap content logic: If we have a valid output, make it input
        if (output && !error) {
            setInput(output);
            setOutput('');
            // If we swapped content, we might want to auto-convert, but let's wait for user action
        } else {
            // Reset defaults
            if (newMode === 'json-to-csv') {
                setInput('[\n  {\n    "name": "Alice, Smith",\n    "age": 30\n  }\n]');
            } else {
                setInput('name,age\nAlice,30\nBob,25');
            }
            setOutput('');
        }
    };


    return (
        <ToolContainer
            title="JSON <> CSV Converter"
            details={details}
            toolId={toolId}
            headerContent={
                <div className="flex items-center space-x-2">
                    <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex">
                        <button
                            onClick={() => setMode('json-to-csv')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-all ${mode === 'json-to-csv' ? 'bg-white dark:bg-gray-700 shadow-sm font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
                        >
                            JSON to CSV
                        </button>
                        <button
                            onClick={() => setMode('csv-to-json')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-all ${mode === 'csv-to-json' ? 'bg-white dark:bg-gray-700 shadow-sm font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
                        >
                            CSV to JSON
                        </button>
                    </div>
                    <button onClick={swapMode} className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors" title="Swap Input/Output">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10h14l-4-4" /><path d="M17 14H3l4 4" /></svg>
                    </button>
                </div>
            }
        >
            <div className="space-y-6">

                {/* Mode Switcher moved to header */}

                {/* Options Panel */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Separator</label>
                        <select
                            value={separator}
                            onChange={(e) => setSeparator(e.target.value)}
                            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 text-sm"
                        >
                            <option value=",">Comma (,)</option>
                            <option value=";">Semicolon (;)</option>
                            <option value="\t">Tab</option>
                            <option value="|">Pipe (|)</option>
                            <option value="custom">Custom</option>
                        </select>
                        {separator === 'custom' && (
                            <input type="text" value={customSeparator} onChange={(e) => setCustomSeparator(e.target.value)} className="mt-2 w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600" placeholder="Custom..." />
                        )}
                    </div>

                    {/* Dynamic Options based on Mode */}
                    {mode === 'json-to-csv' ? (
                        <>
                            <div className="flex flex-col gap-2 pt-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={includeHeaders} onChange={(e) => setIncludeHeaders(e.target.checked)} className="rounded text-blue-600" />
                                    <span className="text-sm">Include Headers</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={replaceLineBreaks} onChange={(e) => setReplaceLineBreaks(e.target.checked)} className="rounded text-blue-600" />
                                    <span className="text-sm">Flatten Line Breaks</span>
                                </label>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Output Format</label>
                                <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as any)} className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 text-sm">
                                    <option value="objects">Array of Objects</option>
                                    <option value="arrays">Array of Arrays</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2 pt-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={parseNumbers} onChange={(e) => setParseNumbers(e.target.checked)} className="rounded text-blue-600" />
                                    <span className="text-sm">Parse Numbers</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={parseBooleans} onChange={(e) => setParseBooleans(e.target.checked)} className="rounded text-blue-600" />
                                    <span className="text-sm">Parse Booleans</span>
                                </label>
                            </div>
                        </>
                    )}
                </div>


                <div className="grid md:grid-cols-2 gap-4 h-[50vh]">
                    <div className="flex flex-col relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {mode === 'json-to-csv' ? 'JSON Input' : 'CSV Input'}
                        </label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste data here..."
                            className="w-full flex-grow bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex flex-col relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {mode === 'json-to-csv' ? 'CSV Output' : 'JSON Output'}
                        </label>
                        <div className="relative flex-grow">
                            <textarea
                                readOnly
                                value={output}
                                placeholder="Output will appear here..."
                                className="w-full h-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 font-mono text-sm resize-none text-blue-600 dark:text-blue-400"
                            />
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
                        Convert {mode === 'json-to-csv' ? 'JSON → CSV' : 'CSV → JSON'}
                    </button>
                </div>
            </div>
        </ToolContainer>
    );
};

export default JsonCsvConverter;

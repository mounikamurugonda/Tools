'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import ConverterLayout from '@/components/ConverterLayout';
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
        <ConverterLayout
            title="JSON <> CSV Converter"
            details={details}
            toolId={toolId}
            options={
                <div className="flex items-center gap-4">
                    {/* Simplified Mode Switcher in Header */}
                    <button
                        onClick={swapMode}
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
                        title="Switch Mode"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10h14l-4-4" /><path d="M17 14H3l4 4" /></svg>
                        {mode === 'json-to-csv' ? 'JSON to CSV' : 'CSV to JSON'}
                    </button>

                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>

                    {/* Quick Options - Truncated for header, full options could be in a modal or non-intrusive panel */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 uppercase">Sep:</span>
                        <select
                            value={separator}
                            onChange={(e) => setSeparator(e.target.value)}
                            className="bg-transparent text-sm border-none focus:ring-0 p-0 text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                            <option value=",">Comma</option>
                            <option value=";">Semi</option>
                            <option value="\t">Tab</option>
                        </select>
                    </div>
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
                        className="p-3 bg-white dark:bg-gray-800 text-gray-500 hover:text-red-500 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all"
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

export default JsonCsvConverter;

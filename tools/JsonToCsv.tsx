
'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

interface JsonToCsvOptions {
    separator: string;
    includeHeaders: boolean;
    replaceLineBreaks: boolean;
    lineBreakReplacement: string;
}

const jsonToCsv = (json: object[], options: JsonToCsvOptions): string => {
    if (!Array.isArray(json)) {
        throw new Error("Input must be an array of objects.");
    }
    if (json.length === 0) return '';

    const { separator, includeHeaders, replaceLineBreaks, lineBreakReplacement } = options;
    const headers = Object.keys(json[0]);
    const csvRows = [];

    if (includeHeaders) {
        csvRows.push(headers.join(separator));
    }

    for (const row of json) {
        const values = headers.map(header => {
            const val = row[header as keyof typeof row];
            let strVal = String(val === null || val === undefined ? '' : val);

            if (replaceLineBreaks) {
                strVal = strVal.replace(/(\r\n|\n|\r)/gm, lineBreakReplacement);
            }

            // Quote the field if it contains the separator, a quote, or a newline
            if (strVal.includes(separator) || strVal.includes('"') || strVal.includes('\n')) {
                return `"${strVal.replace(/"/g, '""')}"`;
            }
            return strVal;
        });
        csvRows.push(values.join(separator));
    }

    return csvRows.join('\n');
};

const JsonToCsv: React.FC<ToolProps> = ({ details, toolId }) => {
    const [jsonInput, setJsonInput] = useState('[\n  {\n    "name": "Alice, Smith",\n    "age": 30,\n    "city": "New York"\n  },\n  {\n    "name": "Bob \\"The Builder\\"",\n    "age": 25,\n    "city": "Los Angeles\\n(LA)"\n  }\n]');
    const [csvOutput, setCsvOutput] = useState('');
    const [error, setError] = useState('');

    // Options state
    const [separator, setSeparator] = useState(',');
    const [customSeparator, setCustomSeparator] = useState('');
    const [includeHeaders, setIncludeHeaders] = useState(true);
    const [replaceLineBreaks, setReplaceLineBreaks] = useState(true);
    const [lineBreakReplacement, setLineBreakReplacement] = useState(' ');
    
    useEffect(() => {
        if (!jsonInput.trim()) {
            setCsvOutput('');
            setError('');
            return;
        }
        try {
            const effectiveSeparator = separator === 'custom' ? customSeparator : separator;
            if (separator === 'custom' && !effectiveSeparator) {
                // Don't convert if custom separator is selected but empty
                setCsvOutput('');
                setError('');
                return;
            }
            const parsed = JSON.parse(jsonInput);
            const result = jsonToCsv(parsed, { separator: effectiveSeparator, includeHeaders, replaceLineBreaks, lineBreakReplacement });
            setCsvOutput(result);
            setError('');
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('Invalid JSON or wrong format.');
            }
            setCsvOutput('');
        }
    }, [jsonInput, separator, customSeparator, includeHeaders, replaceLineBreaks, lineBreakReplacement]);
    
    const copyToClipboard = () => {
        if(csvOutput) navigator.clipboard.writeText(csvOutput);
    };

    const downloadCsv = () => {
        if (!csvOutput) return;
        const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <ToolContainer title="JSON to CSV Converter" details={details} toolId={toolId}>
            <div className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Options</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
                        <div>
                            <label htmlFor="separator" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Separator</label>
                            <select id="separator" value={separator} onChange={e => setSeparator(e.target.value)} className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value=",">Comma (,)</option>
                                <option value=";">Semicolon (;)</option>
                                <option value="\t">Tab</option>
                                <option value="|">Pipe (|)</option>
                                <option value="custom">Custom</option>
                            </select>
                            {separator === 'custom' && (
                                <input type="text" value={customSeparator} onChange={e => setCustomSeparator(e.target.value)} className="mt-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Custom separator" />
                            )}
                        </div>

                        <div className="pt-1 space-y-2">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Headers</label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={includeHeaders} onChange={e => setIncludeHeaders(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span>Include Headers</span>
                            </label>
                        </div>
                        
                        <div>
                            <label className="flex items-center gap-2 cursor-pointer mb-2">
                                <input type="checkbox" checked={replaceLineBreaks} onChange={e => setReplaceLineBreaks(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Replace Line Breaks</span>
                            </label>
                            {replaceLineBreaks && (
                                <input type="text" value={lineBreakReplacement} onChange={e => setLineBreakReplacement(e.target.value)} className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Replace with..." />
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 h-[50vh]">
                    <div className="flex flex-col">
                        <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">JSON Input</label>
                        <textarea
                            id="json-input"
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            placeholder="Paste your JSON array here..."
                            className="w-full flex-grow bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 font-mono resize-none"
                        />
                    </div>
                     <div className="flex flex-col">
                        <label htmlFor="csv-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CSV Output</label>
                        <div className="relative flex-grow">
                            <textarea
                                id="csv-output"
                                readOnly
                                value={csvOutput}
                                placeholder="CSV output will appear here..."
                                className="w-full h-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded p-2 text-gray-800 dark:text-gray-200 font-mono resize-none"
                            />
                             {csvOutput && (
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button onClick={copyToClipboard} className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded">Copy</button>
                                    <button onClick={downloadCsv} className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded">Download</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {error && <p className="text-red-500 dark:text-red-400 text-center">{error}</p>}
            </div>
        </ToolContainer>
    );
};

export default JsonToCsv;

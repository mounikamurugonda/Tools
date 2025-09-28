
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

interface CsvToJsonOptions {
    separator: string;
    outputFormat: 'objects' | 'arrays';
    parseNumbers: boolean;
    parseBooleans: boolean;
}

const csvToJson = (csv: string, options: CsvToJsonOptions): any[] => {
    const { separator, outputFormat, parseNumbers, parseBooleans } = options;
    const lines = csv.split('\n').map(l => l.trim()).filter(Boolean);
    
    if (lines.length === 0) return [];
    
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
        return lines.map(line => line.split(separator).map(parseValue));
    }
    
    // Default to 'objects' format
    if (lines.length < 2) {
      if (lines.length === 1 && lines[0]) throw new Error("CSV must have at least one header row and one data row for 'Array of Objects' format.");
      return [];
    }
    
    const headers = lines[0].split(separator).map(h => h.trim());
    const jsonArray: Record<string, any>[] = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(separator);
        const entry: Record<string, any> = {};
        headers.forEach((header, index) => {
            entry[header] = parseValue(values[index] || '');
        });
        jsonArray.push(entry);
    }
    return jsonArray;
};

const CsvToJson: React.FC<ToolProps> = ({ details, toolId }) => {
    const [csvInput, setCsvInput] = useState('name,age,city,active,balance\nAlice,30,New York,true,150.75\nBob,25,Los Angeles,false,2000');
    const [jsonOutput, setJsonOutput] = useState('');
    const [error, setError] = useState('');

    // Options state
    const [separator, setSeparator] = useState(',');
    const [customSeparator, setCustomSeparator] = useState('');
    const [outputFormat, setOutputFormat] = useState<'objects' | 'arrays'>('objects');
    const [parseNumbers, setParseNumbers] = useState(true);
    const [parseBooleans, setParseBooleans] = useState(true);

    const handleConvert = () => {
        try {
            const effectiveSeparator = separator === 'custom' ? customSeparator : separator;
            if (!effectiveSeparator) {
                setError("Separator cannot be empty.");
                return;
            }
            const result = csvToJson(csvInput, { separator: effectiveSeparator, outputFormat, parseNumbers, parseBooleans });
            setJsonOutput(JSON.stringify(result, null, 2));
            setError('');
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('An unknown error occurred during conversion.');
            }
            setJsonOutput('');
        }
    };
    
    const copyToClipboard = () => {
        if(jsonOutput) navigator.clipboard.writeText(jsonOutput);
    };

    return (
        <ToolContainer title="CSV to JSON Converter" details={details} toolId={toolId}>
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
                        <div>
                            <label htmlFor="outputFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Output Format</label>
                            <select id="outputFormat" value={outputFormat} onChange={e => setOutputFormat(e.target.value as any)} className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="objects">Array of Objects</option>
                                <option value="arrays">Array of Arrays</option>
                            </select>
                        </div>
                        <div className="space-y-2 pt-1">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Parsing</label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={parseNumbers} onChange={e => setParseNumbers(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span>Parse Numbers</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={parseBooleans} onChange={e => setParseBooleans(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span>Parse Booleans</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 h-[50vh]">
                    <div className="flex flex-col">
                        <label htmlFor="csv-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CSV Input</label>
                        <textarea
                            id="csv-input"
                            value={csvInput}
                            onChange={(e) => setCsvInput(e.target.value)}
                            placeholder="Paste your CSV data here..."
                            className="w-full flex-grow bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 font-mono resize-none"
                        />
                    </div>
                     <div className="flex flex-col">
                        <label htmlFor="json-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">JSON Output</label>
                        <div className="relative flex-grow">
                            <textarea
                                id="json-output"
                                readOnly
                                value={jsonOutput}
                                placeholder="JSON output will appear here..."
                                className="w-full h-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded p-2 text-gray-800 dark:text-gray-200 font-mono resize-none"
                            />
                            {jsonOutput && (
                                <button onClick={copyToClipboard} className="absolute top-2 right-2 px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded">
                                    Copy
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {error && <p className="text-red-500 dark:text-red-400 text-center">{error}</p>}
                <div className="text-center">
                    <button onClick={handleConvert} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg">
                        Convert
                    </button>
                </div>
            </div>
        </ToolContainer>
    );
};

export default CsvToJson;

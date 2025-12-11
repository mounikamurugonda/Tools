'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { ArrowLeftRight, Trash2 } from 'lucide-react';

type ConversionMode = 'json-to-csv' | 'csv-to-json';

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
    const [outputFormat, setOutputFormat] = useState<'objects' | 'arrays'>(
        'objects',
    );
    const [parseNumbers, setParseNumbers] = useState(true);
    const [parseBooleans, setParseBooleans] = useState(true);

    const [showOptions, setShowOptions] = useState(false);

    const getEffectiveSeparator = () =>
        separator === 'custom' ? customSeparator : separator;

    // --- Logic Conversion ---

    const jsonToCsv = (jsonStr: string) => {
        const json = JSON.parse(jsonStr);
        if (!Array.isArray(json))
            throw new Error('Input must be an array of objects.');
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

                if (
                    strVal.includes(sep) ||
                    strVal.includes('"') ||
                    strVal.includes('\n')
                ) {
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
            if (
                parseNumbers &&
                trimmedVal !== '' &&
                !isNaN(Number(trimmedVal))
            ) {
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
            if (lines.length === 1 && lines[0])
                throw new Error(
                    'CSV needed at least header + 1 row for Object format.',
                );
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
                setInput(
                    '[\n  {\n    "name": "Alice, Smith",\n    "age": 30\n  }\n]',
                );
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
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Button onClick={swapMode} variant="outline" className="w-full sm:w-auto">
                        <ArrowLeftRight className="w-4 h-4 mr-2" />
                        {mode === 'json-to-csv' ? 'Switch to CSV to JSON' : 'Switch to JSON to CSV'}
                    </Button>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button onClick={handleConvert} variant="primary" className="flex-1 sm:flex-none">
                            Convert
                        </Button>
                        <Button onClick={() => setInput('')} variant="ghost" >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>{mode === 'json-to-csv' ? 'JSON Input' : 'CSV Input'}</Label>
                        <div className="relative">
                            <TextArea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="h-96 resize-none font-mono text-sm"
                                placeholder="Enter data here..."
                            />
                            {input && (
                                <div className="absolute top-2 right-2">
                                    <CopyButton textToCopy={input} />
                                </div>
                            )}
                        </div>
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>{mode === 'json-to-csv' ? 'CSV Output' : 'JSON Output'}</Label>
                        <div className="relative">
                            <TextArea
                                value={output}
                                readOnly
                                className="h-96 resize-none font-mono text-sm bg-gray-50 dark:bg-gray-900"
                                placeholder="Result..."
                            />
                            {output && (
                                <div className="absolute top-2 right-2">
                                    <CopyButton textToCopy={output} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Card
                    title={
                        <button
                            onClick={() => setShowOptions(!showOptions)}
                            className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors w-full text-left"
                        >
                            <span>{showOptions ? 'Hide' : 'Show'} Options</span>
                        </button>
                    }
                >
                    {showOptions && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                            <div className="space-y-2">
                                <Label>Separator</Label>
                                <Select
                                    value={{
                                        value: separator, label: [
                                            { value: ",", label: "Comma (,)" },
                                            { value: ";", label: "Semicolon (;)" },
                                            { value: "\\t", label: "Tab" },
                                            { value: "custom", label: "Custom" }
                                        ].find(o => o.value === separator)?.label || "Custom"
                                    }}
                                    onChange={(option) => setSeparator(option?.value as string)}
                                    options={[
                                        { value: ",", label: "Comma (,)" },
                                        { value: ";", label: "Semicolon (;)" },
                                        { value: "\\t", label: "Tab" },
                                        { value: "custom", label: "Custom" }
                                    ]}
                                />
                                {separator === 'custom' && (
                                    <Input
                                        value={customSeparator}
                                        onChange={(e) => setCustomSeparator(e.target.value)}
                                        placeholder="Custom Separator"
                                        className="mt-2"
                                    />
                                )}
                            </div>

                            {mode === 'json-to-csv' && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pt-8">
                                        <input
                                            type="checkbox"
                                            id="includeHeaders"
                                            checked={includeHeaders}
                                            onChange={(e) => setIncludeHeaders(e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <Label htmlFor="includeHeaders" className="mb-0 cursor-pointer">Include Headers</Label>
                                    </div>
                                </div>
                            )}

                            {mode === 'csv-to-json' && (
                                <div className="space-y-2">
                                    <Label>Output Format</Label>
                                    <Select
                                        value={{ value: outputFormat, label: outputFormat === 'objects' ? 'List of Objects' : 'List of Arrays' }}
                                        onChange={(option) => setOutputFormat(option?.value as any)}
                                        options={[
                                            { value: 'objects', label: 'List of Objects' },
                                            { value: 'arrays', label: 'List of Arrays' }
                                        ]}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </ToolContainer>
    );
};

export default JsonCsvConverter;

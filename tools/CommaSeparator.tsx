'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import { Settings, RefreshCw, ArrowRightLeft, Trash2 } from 'lucide-react';

const DELIMITERS = [
    { label: 'Commma (,)', value: ',' },
    { label: 'New Line (\\n)', value: '\n' },
    { label: 'Space ( )', value: ' ' },
    { label: 'Tab (\\t)', value: '\t' },
    { label: 'Semicolon (;)', value: ';' },
    { label: 'Pipe (|)', value: '|' },
    { label: 'Colon (:)', value: ':' },
    { label: 'Custom', value: 'custom' },
];

const WRAPPERS = [
    { label: 'None', value: 'none' },
    { label: "Single Quotes (')", value: "'" },
    { label: 'Double Quotes (")', value: '"' },
    { label: 'Backticks (`)', value: '`' },
    { label: 'Parentheses ()', value: '()' },
    { label: 'Square Brackets []', value: '[]' },
    { label: 'Curly Braces {}', value: '{}' },
    { label: 'Custom', value: 'custom' },
];

const CommaSeparator: React.FC<ToolProps> = ({ details, toolId }) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    // Settings
    const [inputDelimiter, setInputDelimiter] = useState('\n');
    const [inputCustomDelimiter, setInputCustomDelimiter] = useState('');

    const [outputDelimiter, setOutputDelimiter] = useState(',');
    const [outputCustomDelimiter, setOutputCustomDelimiter] = useState('');

    const [wrapper, setWrapper] = useState('none');
    const [customWrapperLeft, setCustomWrapperLeft] = useState('');
    const [customWrapperRight, setCustomWrapperRight] = useState('');

    const [prefix, setPrefix] = useState('');
    const [suffix, setSuffix] = useState('');

    const [options, setOptions] = useState({
        removeDuplicates: true,
        removeEmpty: true,
        trimWhitespace: true,
        sort: 'none' as 'none' | 'asc' | 'desc',
        newLineAfter: false,
    });

    const processText = () => {
        let text = input;
        if (!text) {
            setOutput('');
            return;
        }

        // 1. Determine Input Splitter
        let splitter = inputDelimiter;
        if (inputDelimiter === 'custom') splitter = inputCustomDelimiter;

        // Auto-detect fallback if splitter logic needed, but explicit is safer for now.
        // If splitter is empty and not "custom" empty, output might be weird.

        // Special handling for new lines if user selected something else but pasted distinct lines? 
        // Usually tool assumes input format matches setting.

        let items = text.split(splitter);

        // 2. Process Items
        if (options.trimWhitespace) {
            items = items.map(i => i.trim());
        }

        if (options.removeEmpty) {
            items = items.filter(i => i.length > 0);
        }

        if (options.removeDuplicates) {
            items = Array.from(new Set(items));
        }

        if (options.sort === 'asc') {
            const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            items.sort(collator.compare);
        } else if (options.sort === 'desc') {
            const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            items.sort((a, b) => collator.compare(b, a));
        }

        // 3. Apply Formatting (Prefix/Suffix/Wrapper)
        items = items.map(item => {
            let wrapped = item;

            // Wrapper
            if (wrapper !== 'none') {
                if (wrapper === 'custom') {
                    wrapped = `${customWrapperLeft}${item}${customWrapperRight}`;
                } else if (['()', '[]', '{}'].includes(wrapper)) {
                    wrapped = `${wrapper[0]}${item}${wrapper[1]}`;
                } else {
                    wrapped = `${wrapper}${item}${wrapper}`;
                }
            }

            return `${prefix}${wrapped}${suffix}`;
        });

        // 4. Join
        let joiner = outputDelimiter;
        if (outputDelimiter === 'custom') joiner = outputCustomDelimiter;

        if (options.newLineAfter && joiner !== '\n') {
            joiner = `${joiner}\n`;
        }

        setOutput(items.join(joiner));
    };

    useEffect(() => {
        processText();
    }, [input, inputDelimiter, inputCustomDelimiter, outputDelimiter, outputCustomDelimiter, wrapper, customWrapperLeft, customWrapperRight, prefix, suffix, options]);

    const clearAll = () => {
        setInput('');
        setOutput('');
    };

    const [showOptions, setShowOptions] = useState(false);

    // Custom Header for Input Card
    const InputCardHeader = (
        <div className="flex items-center justify-between gap-4 w-full">
            <span>Input Data</span>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 pr-3 mr-1">
                    <span className="text-xs font-normal text-gray-500 hidden sm:inline-block">Delimiter:</span>
                    <select
                        value={inputDelimiter}
                        onChange={(e) => setInputDelimiter(e.target.value)}
                        className="text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500 py-1 pl-2 pr-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <option value="auto">Auto-Detect</option>
                        {DELIMITERS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </select>
                    {inputDelimiter === 'custom' && (
                        <input
                            placeholder="Custom"
                            value={inputCustomDelimiter}
                            onChange={(e) => setInputCustomDelimiter(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-20 text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 py-1 px-2"
                        />
                    )}
                </div>

                <span className="text-xs text-gray-500 font-normal whitespace-nowrap hidden sm:inline-block">
                    {inputDelimiter === '\n' || inputDelimiter === 'auto' ? input.split('\n').filter(x => x.trim()).length : input.split(inputDelimiter === 'custom' ? inputCustomDelimiter : inputDelimiter).length} items
                </span>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); clearAll(); }}
                    className="text-gray-500 hover:text-red-500 p-1 h-auto"
                    title="Clear Input"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );

    const OptionsButton = (
        <Button
            variant="outline"
            size="sm"
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-2 ml-4"
        >
            <Settings className="w-4 h-4" />
            {showOptions ? 'Hide Options' : 'More Options'}
        </Button>
    );

    // Custom Header for Result Card
    const ResultCardHeader = (
        <div className="flex items-center justify-between gap-4 w-full">
            <span>Result</span>
            <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-normal">
                    {output.length > 0 ? output.split(outputDelimiter === 'custom' ? outputCustomDelimiter : outputDelimiter).length : 0} items
                </span>
                <CopyButton textToCopy={output} className="h-6 w-6" />
            </div>
        </div>
    );

    return (
        <ToolContainer
            title="Comma Separator & Delimiting Tool"
            details={details}
            toolId={toolId}
            headerContent={OptionsButton}
        >
            <div className="space-y-6">

                {/* Collapsible Configuration */}
                {showOptions && (
                    <Card title="Advanced Configuration" className="animate-in fade-in slide-in-from-top-4 duration-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Col 1: Output Delimiter */}
                            <div>
                                <Label className="flex items-center gap-2 mb-2">
                                    <ArrowRightLeft className="w-4 h-4" /> Output Delimiter
                                </Label>
                                <Select value={outputDelimiter} onChange={(e) => setOutputDelimiter(e.target.value)} className="w-full">
                                    {DELIMITERS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                                </Select>
                                {outputDelimiter === 'custom' && (
                                    <Input
                                        placeholder="Custom delimiter"
                                        value={outputCustomDelimiter}
                                        onChange={(e) => setOutputCustomDelimiter(e.target.value)}
                                        className="mt-2 w-full"
                                    />
                                )}
                                <div className="mt-2 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="newLineAfter"
                                        checked={options.newLineAfter}
                                        onChange={(e) => setOptions({ ...options, newLineAfter: e.target.checked })}
                                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="newLineAfter" className="text-sm text-gray-600 dark:text-gray-300">Add New Line after delimiter</label>
                                </div>
                            </div>

                            {/* Col 2: Formatting */}
                            <div className="border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-4 md:pt-0 md:pl-6">
                                <Label className="mb-2 block">Item Formatting</Label>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs text-gray-500 mb-1 block">Wrapper</span>
                                        <Select value={wrapper} onChange={(e) => setWrapper(e.target.value)} className="w-full">
                                            {WRAPPERS.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
                                        </Select>
                                        {wrapper === 'custom' && (
                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                <Input placeholder="Left" value={customWrapperLeft} onChange={e => setCustomWrapperLeft(e.target.value)} />
                                                <Input placeholder="Right" value={customWrapperRight} onChange={e => setCustomWrapperRight(e.target.value)} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <span className="text-xs text-gray-500 mb-1 block">Prefix all</span>
                                            <Input placeholder="Prefix" value={prefix} onChange={e => setPrefix(e.target.value)} />
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 mb-1 block">Suffix all</span>
                                            <Input placeholder="Suffix" value={suffix} onChange={e => setSuffix(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Col 3: Filters */}
                            <div className="border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-4 md:pt-0 md:pl-6">
                                <Label className="mb-3 block">Filters & Sorting</Label>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox" id="removeDuplicates"
                                            checked={options.removeDuplicates}
                                            onChange={(e) => setOptions({ ...options, removeDuplicates: e.target.checked })}
                                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="removeDuplicates" className="text-sm text-gray-700 dark:text-gray-300">Remove Duplicates</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox" id="removeEmpty"
                                            checked={options.removeEmpty}
                                            onChange={(e) => setOptions({ ...options, removeEmpty: e.target.checked })}
                                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="removeEmpty" className="text-sm text-gray-700 dark:text-gray-300">Remove Empty Items</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox" id="trimWhitespace"
                                            checked={options.trimWhitespace}
                                            onChange={(e) => setOptions({ ...options, trimWhitespace: e.target.checked })}
                                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="trimWhitespace" className="text-sm text-gray-700 dark:text-gray-300">Trim Whitespace</label>
                                    </div>

                                    <div className="pt-2">
                                        <span className="text-sm text-gray-700 dark:text-gray-300 block mb-2">Sort Order:</span>
                                        <div className="flex flex-col gap-2">
                                            <label className="flex items-center gap-2 text-sm">
                                                <input type="radio" value="none" checked={options.sort === 'none'} onChange={() => setOptions({ ...options, sort: 'none' })} /> None
                                            </label>
                                            <label className="flex items-center gap-2 text-sm">
                                                <input type="radio" value="asc" checked={options.sort === 'asc'} onChange={() => setOptions({ ...options, sort: 'asc' })} /> A-Z (Ascending)
                                            </label>
                                            <label className="flex items-center gap-2 text-sm">
                                                <input type="radio" value="desc" checked={options.sort === 'desc'} onChange={() => setOptions({ ...options, sort: 'desc' })} /> Z-A (Descending)
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Bottom: Inputs & Outputs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Data */}
                    <Card title={InputCardHeader} className="h-full flex flex-col">
                        <textarea
                            className="flex-1 w-full min-h-[400px] p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y"
                            placeholder="Paste your list here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </Card>

                    {/* Output Result */}
                    <Card title={ResultCardHeader} className="h-full flex flex-col">
                        <textarea
                            className="flex-1 w-full min-h-[400px] p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y"
                            readOnly
                            placeholder="Result will appear here..."
                            value={output}
                        />
                    </Card>
                </div>
            </div>
        </ToolContainer>
    );
};

export default CommaSeparator;

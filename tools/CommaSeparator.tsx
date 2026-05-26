'use client';

import React, { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { Settings, Trash2 } from 'lucide-react';

const DELIMITERS = [
  { label: 'Comma (,)', value: ',' },
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
  const toast = useToast();

  const handleFile = async (file: File) => {
    try {
      const text = await file.text();
      setInput(text);
      toast.success(`Loaded ${file.name}`);
    } catch {
      toast.error('Could not read file');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      toast.success('Copied');
    } catch {
      toast.error('Copy failed');
    }
  };

  // Settings
  const [inputDelimiter, setInputDelimiter] = useState('auto');
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

  const debouncedInput = useDebounce(input, 500);
  const debouncedInputDelimiter = useDebounce(inputDelimiter, 500);
  const debouncedInputCustomDelimiter = useDebounce(inputCustomDelimiter, 500);
  const debouncedOutputDelimiter = useDebounce(outputDelimiter, 500);
  const debouncedOutputCustomDelimiter = useDebounce(outputCustomDelimiter, 500);
  const debouncedWrapper = useDebounce(wrapper, 500);
  const debouncedCustomWrapperLeft = useDebounce(customWrapperLeft, 500);
  const debouncedCustomWrapperRight = useDebounce(customWrapperRight, 500);
  const debouncedPrefix = useDebounce(prefix, 500);
  const debouncedSuffix = useDebounce(suffix, 500);
  const debouncedOptions = useDebounce(options, 500);

  const processText = () => {
    let text = debouncedInput;
    if (!text) {
      setOutput('');
      return;
    }

    // 1. Determine Input Splitter
    let splitter = debouncedInputDelimiter;

    if (debouncedInputDelimiter === 'auto') {
      const candidates = [
        { val: '\n', count: (text.match(/\n/g) || []).length },
        { val: ',', count: (text.match(/,/g) || []).length },
        { val: ';', count: (text.match(/;/g) || []).length },
        { val: '\t', count: (text.match(/\t/g) || []).length },
        { val: '|', count: (text.match(/\|/g) || []).length },
        { val: ':', count: (text.match(/:/g) || []).length },
      ];

      // Find the delimiter with the highest occurrence count
      const winner = candidates.reduce((prev, current) =>
        prev.count > current.count ? prev : current
      );
      splitter = winner.count > 0 ? winner.val : '\n';
    } else if (debouncedInputDelimiter === 'custom') {
      splitter = debouncedInputCustomDelimiter;
    }

    let items = text.split(splitter);

    // 2. Process Items
    if (debouncedOptions.trimWhitespace) {
      items = items.map(i => i.trim());
    }

    if (debouncedOptions.removeEmpty) {
      items = items.filter(i => i.length > 0);
    }

    if (debouncedOptions.removeDuplicates) {
      items = Array.from(new Set(items));
    }

    if (debouncedOptions.sort === 'asc') {
      const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
      items.sort(collator.compare);
    } else if (debouncedOptions.sort === 'desc') {
      const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
      items.sort((a, b) => collator.compare(b, a));
    }

    // 3. Apply Formatting (Prefix/Suffix/Wrapper)
    items = items.map(item => {
      let wrapped = item;

      // Wrapper
      if (debouncedWrapper !== 'none') {
        if (debouncedWrapper === 'custom') {
          wrapped = `${debouncedCustomWrapperLeft}${item}${debouncedCustomWrapperRight}`;
        } else if (['()', '[]', '{}'].includes(debouncedWrapper)) {
          wrapped = `${debouncedWrapper[0]}${item}${debouncedWrapper[1]}`;
        } else {
          wrapped = `${debouncedWrapper}${item}${debouncedWrapper}`;
        }
      }

      return `${debouncedPrefix}${wrapped}${debouncedSuffix}`;
    });

    // 4. Join
    let joiner = debouncedOutputDelimiter;
    if (debouncedOutputDelimiter === 'custom') joiner = debouncedOutputCustomDelimiter;

    if (debouncedOptions.newLineAfter && joiner !== '\n') {
      joiner = `${joiner}\n`;
    }

    setOutput(items.join(joiner));
  };

  useEffect(() => {
    processText();
  }, [
    debouncedInput,
    debouncedInputDelimiter,
    debouncedInputCustomDelimiter,
    debouncedOutputDelimiter,
    debouncedOutputCustomDelimiter,
    debouncedWrapper,
    debouncedCustomWrapperLeft,
    debouncedCustomWrapperRight,
    debouncedPrefix,
    debouncedSuffix,
    debouncedOptions,
  ]);

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
        <span className="text-xs text-gray-500 font-normal whitespace-nowrap hidden sm:inline-block">
          {inputDelimiter === '\n' || inputDelimiter === 'auto'
            ? input.split('\n').filter(x => x.trim()).length
            : input.split(inputDelimiter === 'custom' ? inputCustomDelimiter : inputDelimiter)
              .length}{' '}
          items
        </span>

        <Button
          variant="ghost"
          size="sm"
          onClick={e => {
            e.stopPropagation();
            clearAll();
          }}
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
          {output.length > 0
            ? output.split(outputDelimiter === 'custom' ? outputCustomDelimiter : outputDelimiter)
              .length
            : 0}{' '}
          items
        </span>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
          aria-label="Copy result"
          title="Copy result"
        >
          <span className="sr-only">Copy</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        </button>
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
        <FileUpload
          onFileSelect={handleFile}
          accept=".txt,.csv,text/plain,text/csv"
          maxSizeMB={20}
          title="Drop a .txt or .csv"
          description="or paste your list below"
        />

        {/* Collapsible Configuration */}
        {showOptions && (
          <Card
            title="Advanced Configuration"
            className="animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Col 2: Formatting */}
              <div>
                <Label className="mb-2 block">Item Formatting</Label>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-gray-500 mb-1 block">Wrapper</span>
                    <Select
                      value={wrapper}
                      onChange={e => setWrapper(e.target.value)}
                      className="w-full"
                    >
                      {WRAPPERS.map(w => (
                        <option key={w.value} value={w.value}>
                          {w.label}
                        </option>
                      ))}
                    </Select>
                    {wrapper === 'custom' && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input
                          placeholder="Left"
                          value={customWrapperLeft}
                          onChange={e => setCustomWrapperLeft(e.target.value)}
                        />
                        <Input
                          placeholder="Right"
                          value={customWrapperRight}
                          onChange={e => setCustomWrapperRight(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Prefix all</span>
                      <Input
                        placeholder="Prefix"
                        value={prefix}
                        onChange={e => setPrefix(e.target.value)}
                      />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Suffix all</span>
                      <Input
                        placeholder="Suffix"
                        value={suffix}
                        onChange={e => setSuffix(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 3: Filters */}
              <div>
                <Label className="mb-3 block">Filters & Sorting</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="removeDuplicates"
                      checked={options.removeDuplicates}
                      onChange={e => setOptions({ ...options, removeDuplicates: e.target.checked })}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="removeDuplicates"
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      Remove Duplicates
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="removeEmpty"
                      checked={options.removeEmpty}
                      onChange={e => setOptions({ ...options, removeEmpty: e.target.checked })}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="removeEmpty"
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      Remove Empty Items
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="trimWhitespace"
                      checked={options.trimWhitespace}
                      onChange={e => setOptions({ ...options, trimWhitespace: e.target.checked })}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="trimWhitespace"
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      Trim Whitespace
                    </label>
                  </div>

                  <div className="pt-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300 block mb-2">
                      Sort Order:
                    </span>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          value="none"
                          checked={options.sort === 'none'}
                          onChange={() => setOptions({ ...options, sort: 'none' })}
                        />{' '}
                        None
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          value="asc"
                          checked={options.sort === 'asc'}
                          onChange={() => setOptions({ ...options, sort: 'asc' })}
                        />{' '}
                        A-Z (Ascending)
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          value="desc"
                          checked={options.sort === 'desc'}
                          onChange={() => setOptions({ ...options, sort: 'desc' })}
                        />{' '}
                        Z-A (Descending)
                      </label>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="newLineAfter"
                        checked={options.newLineAfter}
                        onChange={e => setOptions({ ...options, newLineAfter: e.target.checked })}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="newLineAfter"
                        className="text-sm text-gray-600 dark:text-gray-300"
                      >
                        Add New Line after delimiter
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Bottom: Inputs & Outputs */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4">
          {/* Input Data */}
          <Card title={InputCardHeader} className="h-full flex flex-col">
            <textarea
              data-lenis-prevent
              className="flex-1 w-full min-h-[400px] p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y"
              placeholder="Paste your list here..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </Card>

          {/* Convert Action & Controls */}
          <div className="flex flex-col justify-center items-center gap-6 p-2">
            {/* Control Panel */}

            {/* Output Delimiter */}
            <div className="space-y-1">
              <Label className="text-xs text-gray-500">Output Separator</Label>
              <Select
                value={outputDelimiter}
                onChange={e => setOutputDelimiter(e.target.value)}
                className="w-full text-sm"
              >
                {DELIMITERS.map(d => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </Select>
              {outputDelimiter === 'custom' && (
                <Input
                  placeholder="Custom"
                  value={outputCustomDelimiter}
                  onChange={e => setOutputCustomDelimiter(e.target.value)}
                  className="mt-1 w-full h-8 text-sm"
                />
              )}
            </div>
          </div>

          {/* Output Result */}
          <Card title={ResultCardHeader} className="h-full flex flex-col">
            <textarea
              data-lenis-prevent
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

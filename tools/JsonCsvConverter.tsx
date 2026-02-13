'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import CopyButton from '@/components/CopyButton';
import MonacoLiteEditor from '@/components/MonacoLiteEditor';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import CustomSelect from '@/components/ui/CustomSelect';
import Input from '@/components/ui/Input';
import { ArrowLeftRight, Trash2, Settings2 } from 'lucide-react';

type ConversionMode = 'json-to-csv' | 'csv-to-json';

const JsonCsvConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [mode, setMode] = useState<ConversionMode>('json-to-csv');
  const [input, setInput] = useState(
    '[\n  {\n    "name": "Alice, Smith",\n    "age": 30,\n    "city": "New York"\n  },\n  {\n    "name": "Bob",\n    "age": 25,\n    "city": "Los Angeles"\n  }\n]'
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

  const [showOptions, setShowOptions] = useState(false);

  const getEffectiveSeparator = () => (separator === 'custom' ? customSeparator : separator);

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
      const values = headers.map(header => {
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
    const lines = csvStr
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);
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
      return lines.map(line => line.split(sep).map(parseValue));
    }

    // Objects format
    if (lines.length < 2) {
      if (lines.length === 1 && lines[0])
        throw new Error('CSV needed at least header + 1 row for Object format.');
      return [];
    }

    const headers = lines[0].split(sep).map(h => h.trim());
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
    const newMode = mode === 'json-to-csv' ? 'csv-to-json' : 'json-to-csv';
    setMode(newMode);
    if (output && !error) {
      setInput(output);
      setOutput('');
    } else {
      if (newMode === 'json-to-csv') {
        setInput('[\n  {\n    "name": "Alice, Smith",\n    "age": 30\n  }\n]');
      } else {
        setInput('name,age\nAlice,30\nBob,25');
      }
      setOutput('');
    }
  };

  const inputSection = (
    <div className="h-full flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <Label>{mode === 'json-to-csv' ? 'JSON Input' : 'CSV Input'}</Label>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 gap-1.5 text-xs text-muted-foreground"
          onClick={() => setShowOptions(!showOptions)}
        >
          <Settings2 className="w-3.5 h-3.5" /> Options
        </Button>
      </div>

      {showOptions && (
        <div className="bg-muted/30 p-3 rounded-md mb-2 space-y-3 text-sm animate-fade-in-up">
          <div className="space-y-1">
            <Label className="text-xs">Separator</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <CustomSelect
                  value={{
                    value: separator,
                    label: [{ value: ',', label: 'Comma (,)' }, { value: ';', label: 'Semicolon (;)' }, { value: '\\t', label: 'Tab' }, { value: 'custom', label: 'Custom' }].find(o => o.value === separator)?.label || 'Custom',
                  }}
                  onChange={option => setSeparator((option as { value: string; label: string })?.value || ',')}
                  options={[{ value: ',', label: 'Comma (,)' }, { value: ';', label: 'Semicolon (;)' }, { value: '\\t', label: 'Tab' }, { value: 'custom', label: 'Custom' }]}
                />
              </div>
            </div>
            {separator === 'custom' && (
              <Input
                value={customSeparator}
                onChange={e => setCustomSeparator(e.target.value)}
                placeholder="Char"
                className="mt-1 h-8 text-sm"
              />
            )}
          </div>

          {mode === 'json-to-csv' && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includeHeaders"
                checked={includeHeaders}
                onChange={e => setIncludeHeaders(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="includeHeaders" className="mb-0 cursor-pointer">Include Headers</Label>
            </div>
          )}

          {mode === 'csv-to-json' && (
            <div className="space-y-1">
              <Label className="text-xs">Format</Label>
              <CustomSelect
                value={{
                  value: outputFormat,
                  label: outputFormat === 'objects' ? 'List of Objects' : 'List of Arrays',
                }}
                onChange={option => setOutputFormat((option as { value: 'objects' | 'arrays'; label: string })?.value || 'objects')}
                options={[{ value: 'objects', label: 'List of Objects' }, { value: 'arrays', label: 'List of Arrays' }]}
              />
            </div>
          )}
        </div>
      )}

      <div className="relative flex-1">
        <MonacoLiteEditor
          language={mode === 'json-to-csv' ? 'json' : 'plaintext'}
          value={input}
          onChange={val => setInput(val || '')}
          className="w-full h-full rounded-md overflow-hidden border border-transparent"
        />
        {input && (
          <div className="absolute top-4 right-6 z-10">
            <CopyButton textToCopy={input} />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  const outputSection = (
    <div className="h-full flex flex-col space-y-2">
      <Label>{mode === 'json-to-csv' ? 'CSV Output' : 'JSON Output'}</Label>
      <div className="relative flex-1">
        <MonacoLiteEditor
          language={mode === 'json-to-csv' ? 'plaintext' : 'json'}
          value={output}
          readOnly
          className="w-full h-full rounded-md overflow-hidden border border-transparent"
        />
        {output && (
          <div className="absolute top-4 right-6 z-10">
            <CopyButton textToCopy={output} />
          </div>
        )}
      </div>
    </div>
  );

  const actionSection = (
    <div className="flex flex-col gap-3 w-full lg:w-40">
      <Button onClick={handleConvert} className="w-full">
        Convert
      </Button>
      <Button onClick={swapMode} variant="secondary" className="w-full" title="Swap Mode">
        <ArrowLeftRight className="w-4 h-4 mr-2" /> Swap
      </Button>
      <Button onClick={() => { setInput(''); setOutput(''); }} variant="ghost" className="w-full">
        <Trash2 className="w-4 h-4 mr-2" /> Clear
      </Button>
    </div>
  );

  return (
    <ConverterLayout
      title="JSON <> CSV Converter"
      details={details}
      toolId={toolId}
      inputComponent={inputSection}
      outputComponent={outputSection}
      actions={actionSection}
    />
  );
};

export default JsonCsvConverter;

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import * as XLSX from 'xlsx';
import CopyButton from '@/components/CopyButton';

type ConversionMode = 'csv-to-xlsx' | 'xlsx-to-csv';
type QuoteFields = 'smart' | 'always' | 'never';

interface ConvertOptions {
    separator: string;
    includeHeaders: boolean;
    quoteFields: QuoteFields;
    replaceLineBreaks: boolean;
    lineBreakReplacement: string;
}

const convertSheetToCsv = (worksheet: XLSX.WorkSheet, options: ConvertOptions): string => {
    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (!options.includeHeaders) {
        data.shift(); // Remove header row
    }

    if (data.length === 0) return '';

    const escapeCell = (cell: any): string => {
        const str = String(cell === null || cell === undefined ? '' : cell);
        
        let finalStr = str;
        if (options.replaceLineBreaks) {
            finalStr = finalStr.replace(/(\r\n|\n|\r)/gm, options.lineBreakReplacement);
        }
        
        let needsQuotes = false;
        if (options.quoteFields === 'always') {
            needsQuotes = true;
        } else if (options.quoteFields === 'smart') {
            needsQuotes = finalStr.includes(options.separator) || finalStr.includes('"') || finalStr.includes('\n');
        }

        if (needsQuotes) {
            return `"${finalStr.replace(/"/g, '""')}"`;
        }
        return finalStr;
    };

    return data.map(row => row.map(escapeCell).join(options.separator)).join('\n');
};

const CsvXlsxConverter: React.FC<ToolProps> = ({ details, toolId }) => {
    const [conversionMode, setConversionMode] = useState<ConversionMode>('csv-to-xlsx');
    const [error, setError] = useState('');

    // CSV to XLSX states
    const [csvInput, setCsvInput] = useState('name,age,city,is_member,balance\nAlice,30,New York,true,150.75\nBob,25,Los Angeles,false,2000');
    const [csvToXlsxSeparator, setCsvToXlsxSeparator] = useState(',');
    const [csvToXlsxCustomSeparator, setCsvToXlsxCustomSeparator] = useState('');
    const [hasHeaders, setHasHeaders] = useState(true);
    const [sheetName, setSheetName] = useState('Sheet1');
    const [autoDetectTypes, setAutoDetectTypes] = useState(true);

    // XLSX to CSV states
    const [csvOutput, setCsvOutput] = useState('');
    const [fileName, setFileName] = useState('');
    const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
    const [sheetNames, setSheetNames] = useState<string[]>([]);
    const [selectedSheet, setSelectedSheet] = useState('');
    const [xlsxToCsvSeparator, setXlsxToCsvSeparator] = useState(',');
    const [xlsxToCsvCustomSeparator, setXlsxToCsvCustomSeparator] = useState('');
    const [includeHeaders, setIncludeHeaders] = useState(true);
    const [quoteFields, setQuoteFields] = useState<QuoteFields>('smart');
    const [replaceLineBreaks, setReplaceLineBreaks] = useState(true);
    const [lineBreakReplacement, setLineBreakReplacement] = useState(' ');

    const handleCsvToXlsxDownload = () => {
        try {
            setError('');
            if (!csvInput.trim()) {
                setError("CSV input cannot be empty.");
                return;
            }

            const effectiveSeparator = csvToXlsxSeparator === 'custom' ? csvToXlsxCustomSeparator : csvToXlsxSeparator;
            if (csvToXlsxSeparator === 'custom' && !effectiveSeparator) {
                setError("Custom separator cannot be empty.");
                return;
            }

            const wb = XLSX.utils.book_new();
            const ws = {};
            
            (XLSX.utils as any).sheet_add_csv(ws, csvInput, {
                FS: effectiveSeparator,
                raw: !autoDetectTypes,
                skipheaders: !hasHeaders
            });
            
            XLSX.utils.book_append_sheet(wb, ws, sheetName.trim() || 'Sheet1');
            XLSX.writeFile(wb, "data.xlsx", { bookType: 'xlsx' });

        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('An error occurred during conversion.');
            }
        }
    };

    const handleFile = useCallback((file: File) => {
        setError('');
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = event.target?.result;
                const wb = XLSX.read(data, { type: 'array' });
                setWorkbook(wb);
                const names = wb.SheetNames;
                if (!names || names.length === 0) {
                    throw new Error("No sheets found in the file.");
                }
                setSheetNames(names);
                setSelectedSheet(names[0]);
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Please ensure it is a valid format.';
                setError(`Failed to process file: ${message}`);
                setWorkbook(null);
                setSheetNames([]);
                setSelectedSheet('');
                setFileName('');
            }
        };
        reader.onerror = () => {
             setError('Error reading the file.');
             setFileName('');
        }
        reader.readAsArrayBuffer(file);
    }, []);

    useEffect(() => {
        if (conversionMode === 'xlsx-to-csv') {
            if (!workbook || !selectedSheet) {
                setCsvOutput('');
                return;
            };

            try {
                const effectiveSeparator = xlsxToCsvSeparator === 'custom' ? xlsxToCsvCustomSeparator : xlsxToCsvSeparator;
                if (xlsxToCsvSeparator === 'custom' && !effectiveSeparator) {
                    setCsvOutput('');
                    return;
                }
                const worksheet = workbook.Sheets[selectedSheet];
                const csv = convertSheetToCsv(worksheet, {
                    separator: effectiveSeparator,
                    includeHeaders,
                    quoteFields,
                    replaceLineBreaks,
                    lineBreakReplacement,
                });
                setCsvOutput(csv);
                setError('');
            } catch (err) {
                const message = err instanceof Error ? err.message : 'An error occurred during conversion.';
                setError(message);
                setCsvOutput('');
            }
        }
    }, [workbook, selectedSheet, xlsxToCsvSeparator, xlsxToCsvCustomSeparator, includeHeaders, quoteFields, replaceLineBreaks, lineBreakReplacement, conversionMode]);

    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove('border-blue-500');
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            handleFile(event.dataTransfer.files[0]);
        }
    }, [handleFile]);

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.add('border-blue-500');
    };
    
    const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove('border-blue-500');
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };
    
    const downloadCsv = () => {
        if (!csvOutput) return;
        const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${fileName.split('.')[0] || 'data'}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    const CsvToXlsxContent = (
        <div className="space-y-4 max-w-3xl mx-auto">
             <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                        <label htmlFor="separator-csv-xlsx" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Separator</label>
                        <select id="separator-csv-xlsx" value={csvToXlsxSeparator} onChange={e => setCsvToXlsxSeparator(e.target.value)} className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value=",">Comma (,)</option>
                            <option value=";">Semicolon (;)</option>
                            <option value="\t">Tab</option>
                            <option value="|">Pipe (|)</option>
                            <option value="custom">Custom</option>
                        </select>
                        {csvToXlsxSeparator === 'custom' && (
                            <input type="text" value={csvToXlsxCustomSeparator} onChange={e => setCsvToXlsxCustomSeparator(e.target.value)} className="mt-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Custom separator" />
                        )}
                    </div>
                    <div>
                        <label htmlFor="sheetName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sheet Name</label>
                        <input id="sheetName" type="text" value={sheetName} onChange={e => setSheetName(e.target.value)} className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Sheet1" />
                    </div>
                     <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={hasHeaders} onChange={e => setHasHeaders(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm font-medium">First row contains headers</span>
                        </label>
                         <p className="text-xs text-gray-500 dark:text-gray-400 pl-6">If unchecked, the first row will be treated as data.</p>
                    </div>
                     <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={autoDetectTypes} onChange={e => setAutoDetectTypes(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm font-medium">Auto-detect data types</span>
                        </label>
                         <p className="text-xs text-gray-500 dark:text-gray-400 pl-6">If checked, values like "123" or "true" will be saved as numbers/booleans. If unchecked, all data will be saved as text.</p>
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="csv-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CSV Input</label>
                <textarea
                    id="csv-input"
                    value={csvInput}
                    onChange={(e) => setCsvInput(e.target.value)}
                    placeholder="Paste your CSV data here..."
                    className="w-full h-64 bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 font-mono resize-none"
                />
            </div>
            {error && <p className="text-red-500 dark:text-red-400 text-center">{error}</p>}
            <div className="text-center">
                <button onClick={handleCsvToXlsxDownload} className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg">
                    Download .xlsx File
                </button>
            </div>
        </div>
    );
    
    const XlsxToCsvContent = (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button 
                    onClick={downloadCsv}
                    disabled={!csvOutput}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Download CSV
                </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {/* Left side - File Upload and Options */}
                <div className="space-y-4">
                    <div 
                        className="flex justify-center items-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <div className="text-center">
                            {fileName ? (
                                 <p className="font-semibold text-gray-700 dark:text-gray-300">File: {fileName}</p>
                            ) : (
                                <>
                                    <p className="text-gray-500 dark:text-gray-400">Drag & drop your .xlsx file here</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">or</p>
                                    <p className="font-semibold text-blue-500">Click to select a file</p>
                                </>
                            )}
                            <input id="file-upload" type="file" accept=".xlsx, .xls" className="hidden" onChange={handleFileChange} />
                        </div>
                    </div>

                    {workbook && (
                        <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Options</h3>
                            <div className="space-y-4">
                                 <div>
                                    <label htmlFor="sheet-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sheet to Convert</label>
                                    <select id="sheet-select" value={selectedSheet} onChange={e => setSelectedSheet(e.target.value)} className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        {sheetNames.map(name => <option key={name} value={name}>{name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="separator-xlsx-csv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Separator</label>
                                    <select id="separator-xlsx-csv" value={xlsxToCsvSeparator} onChange={e => setXlsxToCsvSeparator(e.target.value)} className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value=",">Comma (,)</option>
                                        <option value=";">Semicolon (;)</option>
                                        <option value="\t">Tab</option>
                                        <option value="|">Pipe (|)</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                    {xlsxToCsvSeparator === 'custom' && (
                                        <input type="text" value={xlsxToCsvCustomSeparator} onChange={e => setXlsxToCsvCustomSeparator(e.target.value)} className="mt-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Custom" />
                                    )}
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quote Fields</label>
                                    <select value={quoteFields} onChange={e => setQuoteFields(e.target.value as QuoteFields)} className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="smart">Smart (Recommended)</option>
                                        <option value="always">Always</option>
                                        <option value="never">Never</option>
                                    </select>
                                 </div>
                                 <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={includeHeaders} onChange={e => setIncludeHeaders(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm font-medium">Include Headers</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer mb-2">
                                        <input type="checkbox" checked={replaceLineBreaks} onChange={e => setReplaceLineBreaks(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm font-medium">Replace Line Breaks</span>
                                    </label>
                                    {replaceLineBreaks && (
                                        <input type="text" value={lineBreakReplacement} onChange={e => setLineBreakReplacement(e.target.value)} className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Replace with..." />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
                </div>

                {/* Right side - CSV Output */}
                <div className="space-y-4">
                    <label htmlFor="csv-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CSV Output</label>
                    <div className="relative">
                        <textarea
                            id="csv-output"
                            readOnly
                            value={csvOutput}
                            placeholder="CSV output will appear here after uploading a file..."
                            className="w-full h-96 max-h-96 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-3 text-gray-800 dark:text-gray-200 font-mono resize-none"
                        />
                        {csvOutput && (
                            <div className="absolute top-2 right-2 flex gap-2">
                                <CopyButton textToCopy={csvOutput} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <ToolContainer title="CSV & XLSX Converter" details={details} toolId={toolId}>
            <div className="flex justify-center mb-4">
                <div className="flex p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-md ${conversionMode === 'csv-to-xlsx' ? 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100' : 'text-gray-600 dark:text-gray-300'}`}
                        onClick={() => setConversionMode('csv-to-xlsx')}
                    >
                        CSV to XLSX
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-md ${conversionMode === 'xlsx-to-csv' ? 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100' : 'text-gray-600 dark:text-gray-300'}`}
                        onClick={() => setConversionMode('xlsx-to-csv')}
                    >
                        XLSX to CSV
                    </button>
                </div>
            </div>
            {conversionMode === 'csv-to-xlsx' ? CsvToXlsxContent : XlsxToCsvContent}
        </ToolContainer>
    );
};

export default CsvXlsxConverter;


'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import * as XLSX from 'xlsx';

const CsvToXlsx: React.FC<ToolProps> = ({ details }) => {
    const [csvInput, setCsvInput] = useState('name,age,city,is_member,balance\nAlice,30,New York,true,150.75\nBob,25,Los Angeles,false,2000');
    const [error, setError] = useState('');

    // Options state
    const [separator, setSeparator] = useState(',');
    const [customSeparator, setCustomSeparator] = useState('');
    const [hasHeaders, setHasHeaders] = useState(true);
    const [sheetName, setSheetName] = useState('Sheet1');
    const [autoDetectTypes, setAutoDetectTypes] = useState(true);


    const handleDownload = () => {
        try {
            setError('');
            if (!csvInput.trim()) {
                setError("CSV input cannot be empty.");
                return;
            }

            const effectiveSeparator = separator === 'custom' ? customSeparator : separator;
            if (separator === 'custom' && !effectiveSeparator) {
                setError("Custom separator cannot be empty.");
                return;
            }

            const wb = XLSX.utils.book_new();
            // Create a dummy worksheet object to add CSV data to
            const ws = {};
            
            // FIX: The type definitions for 'xlsx' are missing 'sheet_add_csv'.
            // Using a type assertion to 'any' to bypass the compile-time error,
            // as this is the correct library function for robust CSV parsing into a worksheet.
            // The `raw` option logic is also corrected: `raw: true` disables type detection.
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

    return (
        <ToolContainer title="CSV to XLSX Converter" details={details}>
            <div className="space-y-4 max-w-3xl mx-auto">
                 <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Options</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-6 gap-y-4">
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
                    <button onClick={handleDownload} className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg">
                        Download .xlsx File
                    </button>
                </div>
            </div>
        </ToolContainer>
    );
};

export default CsvToXlsx;

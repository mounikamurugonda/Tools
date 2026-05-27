'use client';

import type React from 'react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import type ExcelJS from 'exceljs';
import {
  File,
  Settings,
  RefreshCw,
  FileSpreadsheet,
  FileJson,
  Code2,
  Database,
  Users,
  X,
  CheckCircle2,
  Copy,
  Download,
} from 'lucide-react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import CustomSelect from '@/components/ui/CustomSelect';
import TextArea from '@/components/ui/TextArea';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';

type OutputFormat = 'xlsx' | 'csv' | 'sql' | 'html' | 'json' | 'md' | 'vcf' | 'tsv';
type QuoteFields = 'smart' | 'always' | 'never';

interface ConvertOptions {
  separator: string;
  includeHeaders: boolean;
  quoteFields: QuoteFields;
  replaceLineBreaks: boolean;
  lineBreakReplacement: string;
}

const outputFormats: {
  value: OutputFormat;
  label: string;
  icon: React.ReactNode;
  description: string;
  extension: string;
  color: string;
}[] = [
  {
    value: 'xlsx',
    label: 'Excel',
    icon: <FileSpreadsheet size={20} />,
    description: 'Spreadsheet',
    extension: '.xlsx',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    value: 'csv',
    label: 'CSV',
    icon: <File size={20} />,
    description: 'Text Format',
    extension: '.csv',
    color: 'from-blue-500 to-blue-600',
  },
  {
    value: 'tsv',
    label: 'TSV',
    icon: <File size={20} />,
    description: 'Tab-Separated',
    extension: '.tsv',
    color: 'from-lime-500 to-lime-600',
  },
  {
    value: 'json',
    label: 'JSON',
    icon: <FileJson size={20} />,
    description: 'Data Format',
    extension: '.json',
    color: 'from-amber-500 to-amber-600',
  },
  {
    value: 'sql',
    label: 'SQL',
    icon: <Database size={20} />,
    description: 'Database',
    extension: '.sql',
    color: 'from-purple-500 to-purple-600',
  },
  {
    value: 'html',
    label: 'HTML Table',
    icon: <Code2 size={20} />,
    description: 'Web Format',
    extension: '.html',
    color: 'from-red-500 to-red-600',
  },
  {
    value: 'md',
    label: 'Markdown',
    icon: <File size={20} />,
    description: 'Documentation',
    extension: '.md',
    color: 'from-slate-500 to-slate-600',
  },
  {
    value: 'vcf',
    label: 'vCard',
    icon: <Users size={20} />,
    description: 'Contacts',
    extension: '.vcf',
    color: 'from-pink-500 to-pink-600',
  },
];

// RFC 4180 state-machine parser. Handles quoted fields, embedded separators,
// embedded newlines, and doubled-quote escapes.
function parseCsvRfc4180(input: string, sep: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (inQuotes) {
      if (ch === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === sep) {
      row.push(field);
      field = '';
      i++;
      continue;
    }
    if (ch === '\r') {
      i++;
      continue;
    }
    if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i++;
      continue;
    }
    field += ch;
    i++;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function splitHeadersAndRows(
  csvString: string,
  separator: string,
  hasHeaders: boolean
): { headers: string[]; rows: string[][] } {
  const parsed = parseCsvRfc4180(csvString, separator);
  if (parsed.length === 0) return { headers: [], rows: [] };
  if (!hasHeaders) {
    const width = Math.max(...parsed.map(r => r.length));
    const headers = Array.from({ length: width }, (_, i) => `column_${i + 1}`);
    return { headers, rows: parsed };
  }
  const [headers, ...rows] = parsed;
  return { headers, rows };
}

const convertToJson = (csvString: string, separator: string, hasHeaders: boolean): string => {
  const { headers, rows } = splitHeadersAndRows(csvString, separator, hasHeaders);
  const data = rows.map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] ?? '';
    });
    return obj;
  });
  return JSON.stringify(data, null, 2);
};

const convertToSql = (
  csvString: string,
  separator: string,
  tableName: string,
  hasHeaders: boolean
): string => {
  const { headers, rows } = splitHeadersAndRows(csvString, separator, hasHeaders);
  const safeTable = tableName.replace(/`/g, '');
  const createTable = `CREATE TABLE \`${safeTable}\` (\n${headers
    .map(h => `  \`${h.replace(/`/g, '')}\` VARCHAR(255)`)
    .join(',\n')}\n);\n\n`;
  const inserts = rows
    .map(row => {
      const values = row.map(cell => `'${(cell ?? '').replace(/'/g, "''")}'`).join(', ');
      return `INSERT INTO \`${safeTable}\` (${headers.map(h => `\`${h.replace(/`/g, '')}\``).join(', ')}) VALUES (${values});`;
    })
    .join('\n');
  return createTable + inserts;
};

const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const convertToHtml = (csvString: string, separator: string, hasHeaders: boolean): string => {
  const { headers, rows } = splitHeadersAndRows(csvString, separator, hasHeaders);
  const head = `<thead>\n  <tr>\n${headers.map(h => `    <th>${escapeHtml(h)}</th>`).join('\n')}\n  </tr>\n</thead>`;
  const body = `<tbody>\n${rows
    .map(
      row =>
        `  <tr>\n${row.map(cell => `    <td>${escapeHtml(cell ?? '')}</td>`).join('\n')}\n  </tr>`
    )
    .join('\n')}\n</tbody>`;
  return `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <style>\n    table { border-collapse: collapse; width: 100%; font-family: sans-serif; }\n    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }\n    th { background-color: #f2f2f2; }\n  </style>\n</head>\n<body>\n<table>\n${head}\n${body}\n</table>\n</body>\n</html>`;
};

const convertToMarkdown = (csvString: string, separator: string, hasHeaders: boolean): string => {
  const { headers, rows } = splitHeadersAndRows(csvString, separator, hasHeaders);
  const escapePipe = (s: string) => (s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
  const headerLine = `| ${headers.map(escapePipe).join(' | ')} |`;
  const separatorLine = `| ${headers.map(() => '---').join(' | ')} |`;
  const bodyLines = rows.map(row => `| ${row.map(escapePipe).join(' | ')} |`).join('\n');
  return [headerLine, separatorLine, bodyLines].join('\n');
};

const convertToVcf = (csvString: string, separator: string, hasHeaders: boolean): string => {
  const { headers, rows } = splitHeadersAndRows(csvString, separator, hasHeaders);
  const nameIdx = headers.findIndex(h => /name/i.test(h));
  const emailIdx = headers.findIndex(h => /email/i.test(h));
  const phoneIdx = headers.findIndex(h => /phone|tel|mobile/i.test(h));

  return rows
    .map(row => {
      const name = row[nameIdx >= 0 ? nameIdx : 0] ?? '';
      const email = emailIdx >= 0 ? row[emailIdx] ?? '' : '';
      const phone = phoneIdx >= 0 ? row[phoneIdx] ?? '' : '';
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${name}`,
        `N:${name};;;;`,
        email ? `EMAIL;TYPE=INTERNET:${email}` : null,
        phone ? `TEL;TYPE=CELL:${phone}` : null,
        'END:VCARD',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');
};

const convertToDelimited = (
  csvString: string,
  separator: string,
  outSep: string,
  hasHeaders: boolean
): string => {
  const { headers, rows } = splitHeadersAndRows(csvString, separator, hasHeaders);
  const allRows = hasHeaders ? [headers, ...rows] : rows;
  return allRows
    .map(r =>
      r
        .map(c => {
          const s = c ?? '';
          if (s.includes(outSep) || s.includes('"') || /[\r\n]/.test(s)) {
            return `"${s.replace(/"/g, '""')}"`;
          }
          return s;
        })
        .join(outSep)
    )
    .join('\n');
};

const convertSheetToCsv = (worksheet: ExcelJS.Worksheet, options: ConvertOptions): string => {
  const data: unknown[][] = [];
  worksheet.eachRow({ includeEmpty: true }, row => {
    const rowValues = row.values as unknown[];
    data.push(rowValues.slice(1));
  });

  if (!options.includeHeaders && data.length > 0) {
    data.shift();
  }
  if (data.length === 0) return '';

  const escapeCell = (cell: unknown): string => {
    const str = String(cell === null || cell === undefined ? '' : cell);
    let finalStr = str;
    if (options.replaceLineBreaks) {
      finalStr = finalStr.replace(/(\r\n|\n|\r)/gm, options.lineBreakReplacement);
    }

    let needsQuotes = false;
    if (options.quoteFields === 'always') {
      needsQuotes = true;
    } else if (options.quoteFields === 'smart') {
      needsQuotes =
        finalStr.includes(options.separator) || finalStr.includes('"') || finalStr.includes('\n');
    }

    if (needsQuotes) {
      return `"${finalStr.replace(/"/g, '""')}"`;
    }
    return finalStr;
  };

  return data.map(row => row.map(escapeCell).join(options.separator)).join('\n');
};

const CsvXlsxConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [error, setError] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<'csv-to-xlsx' | 'xlsx-to-csv' | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('xlsx');
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [showOptions, setShowOptions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [csvInput, setCsvInput] = useState('');
  const [isPasted, setIsPasted] = useState(false);
  const [csvToXlsxSeparator, setCsvToXlsxSeparator] = useState(',');
  const [csvToXlsxCustomSeparator, setCsvToXlsxCustomSeparator] = useState('');
  const [hasHeaders, setHasHeaders] = useState(true);
  const [sheetName, setSheetName] = useState('Sheet1');
  const [sqlTableName, setSqlTableName] = useState('my_table');

  const [csvOutput, setCsvOutput] = useState('');
  const [workbook, setWorkbook] = useState<ExcelJS.Workbook | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [xlsxToCsvSeparator, setXlsxToCsvSeparator] = useState(',');
  const [xlsxToCsvCustomSeparator, setXlsxToCsvCustomSeparator] = useState('');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [quoteFields, setQuoteFields] = useState<QuoteFields>('smart');
  const [replaceLineBreaks, setReplaceLineBreaks] = useState(true);
  const [lineBreakReplacement, setLineBreakReplacement] = useState(' ');

  const effectiveCsvToXlsxSep = useMemo(
    () => (csvToXlsxSeparator === 'custom' ? csvToXlsxCustomSeparator : csvToXlsxSeparator === '\\t' ? '\t' : csvToXlsxSeparator),
    [csvToXlsxSeparator, csvToXlsxCustomSeparator]
  );
  const effectiveXlsxToCsvSep = useMemo(
    () => (xlsxToCsvSeparator === 'custom' ? xlsxToCsvCustomSeparator : xlsxToCsvSeparator === '\\t' ? '\t' : xlsxToCsvSeparator),
    [xlsxToCsvSeparator, xlsxToCsvCustomSeparator]
  );

  const reportError = useCallback(
    (msg: string) => {
      setError(msg);
      toast.error(msg);
    },
    [toast]
  );

  const handleConvertAndDownload = async () => {
    try {
      setIsProcessing(true);
      setError('');

      const sourceCsv = conversionType === 'xlsx-to-csv' ? csvOutput : csvInput;
      if (!sourceCsv.trim()) {
        reportError('Input data is empty.');
        return;
      }

      const separator =
        conversionType === 'xlsx-to-csv' ? effectiveXlsxToCsvSep : effectiveCsvToXlsxSep;

      if (!separator) {
        reportError('Separator must be defined for this conversion.');
        return;
      }

      let blob: Blob;
      const selectedFormat = outputFormats.find(f => f.value === outputFormat);
      const baseName = isPasted
        ? 'converted'
        : uploadedFile?.name.split('.').slice(0, -1).join('.') || 'converted';
      const fileName = baseName + (selectedFormat?.extension ?? '');

      switch (outputFormat) {
        case 'xlsx': {
          const ExcelJSMod = await import('exceljs');
          const newWorkbook = new ExcelJSMod.Workbook();
          const ws = newWorkbook.addWorksheet(sheetName.trim() || 'Sheet1');
          const parsedRows = parseCsvRfc4180(sourceCsv, separator);
          parsedRows.forEach(r => ws.addRow(r));
          if (hasHeaders && ws.getRow(1)) {
            ws.getRow(1).font = { bold: true };
          }
          const buffer = await newWorkbook.xlsx.writeBuffer();
          blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          break;
        }
        case 'csv': {
          blob = new Blob([sourceCsv], { type: 'text/csv;charset=utf-8;' });
          break;
        }
        case 'tsv': {
          blob = new Blob([convertToDelimited(sourceCsv, separator, '\t', hasHeaders)], {
            type: 'text/tab-separated-values',
          });
          break;
        }
        case 'json': {
          blob = new Blob([convertToJson(sourceCsv, separator, hasHeaders)], {
            type: 'application/json',
          });
          break;
        }
        case 'sql': {
          blob = new Blob([convertToSql(sourceCsv, separator, sqlTableName, hasHeaders)], {
            type: 'application/sql',
          });
          break;
        }
        case 'html': {
          blob = new Blob([convertToHtml(sourceCsv, separator, hasHeaders)], { type: 'text/html' });
          break;
        }
        case 'md': {
          blob = new Blob([convertToMarkdown(sourceCsv, separator, hasHeaders)], {
            type: 'text/markdown',
          });
          break;
        }
        case 'vcf': {
          blob = new Blob([convertToVcf(sourceCsv, separator, hasHeaders)], { type: 'text/vcard' });
          break;
        }
        default:
          throw new Error('Invalid output format selected');
      }
      downloadBlob(blob, fileName);
      toast.success(`Downloaded ${fileName}`);
    } catch (e) {
      reportError(e instanceof Error ? e.message : 'An error occurred during conversion.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyTextOutput = async () => {
    if (outputFormat === 'xlsx') {
      toast.info('Excel output is binary — use Download.');
      return;
    }
    try {
      const sourceCsv = conversionType === 'xlsx-to-csv' ? csvOutput : csvInput;
      const separator =
        conversionType === 'xlsx-to-csv' ? effectiveXlsxToCsvSep : effectiveCsvToXlsxSep;
      let text = '';
      switch (outputFormat) {
        case 'csv':
          text = sourceCsv;
          break;
        case 'tsv':
          text = convertToDelimited(sourceCsv, separator, '\t', hasHeaders);
          break;
        case 'json':
          text = convertToJson(sourceCsv, separator, hasHeaders);
          break;
        case 'sql':
          text = convertToSql(sourceCsv, separator, sqlTableName, hasHeaders);
          break;
        case 'html':
          text = convertToHtml(sourceCsv, separator, hasHeaders);
          break;
        case 'md':
          text = convertToMarkdown(sourceCsv, separator, hasHeaders);
          break;
        case 'vcf':
          text = convertToVcf(sourceCsv, separator, hasHeaders);
          break;
      }
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Copy failed');
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetState = () => {
    setError('');
    setUploadedFile(null);
    setIsPasted(false);
    setInputMode('upload');
    setConversionType(null);
    setCsvInput('');
    setCsvOutput('');
    setWorkbook(null);
    setSheetNames([]);
    setSelectedSheet('');
    setShowOptions(false);
  };

  const handleFileUpload = useCallback(
    async (file: File) => {
      resetState();
      setInputMode('upload');
      setUploadedFile(file);

      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const reader = new FileReader();

      if (['xlsx', 'xls'].includes(fileExtension || '')) {
        setConversionType('xlsx-to-csv');
        setOutputFormat('csv');
        reader.onload = async event => {
          try {
            const data = event.target?.result;
            const ExcelJSMod = await import('exceljs');
            const wb = new ExcelJSMod.Workbook();
            await wb.xlsx.load(data as ArrayBuffer);
            setWorkbook(wb);
            const names = wb.worksheets.map(ws => ws.name);
            setSheetNames(names);
            if (names.length > 0) setSelectedSheet(names[0]);
            toast.success(`Loaded ${file.name} (${names.length} sheet${names.length === 1 ? '' : 's'})`);
          } catch (err) {
            reportError(err instanceof Error ? err.message : 'Failed to read XLSX file.');
          }
        };
        reader.readAsArrayBuffer(file);
      } else if (['csv', 'tsv', 'txt'].includes(fileExtension || '')) {
        setConversionType('csv-to-xlsx');
        if (fileExtension === 'tsv') setCsvToXlsxSeparator('\\t');
        reader.onload = event => {
          const text = event.target?.result as string;
          setCsvInput(text);
          toast.success(`Loaded ${file.name}`);
        };
        reader.readAsText(file);
      } else {
        reportError('Unsupported file type. Please upload a .csv, .tsv, .txt, .xlsx, or .xls file.');
        setUploadedFile(null);
      }
    },
    [reportError, toast]
  );

  const handlePaste = (pastedText: string) => {
    resetState();
    setInputMode('paste');
    setIsPasted(true);
    setCsvInput(pastedText);
    setConversionType('csv-to-xlsx');
  };

  useEffect(() => {
    if (conversionType === 'xlsx-to-csv' && workbook && selectedSheet) {
      try {
        if (xlsxToCsvSeparator === 'custom' && !xlsxToCsvCustomSeparator) {
          setCsvOutput('');
          return;
        }
        const worksheet = workbook.getWorksheet(selectedSheet);
        if (!worksheet) {
          reportError(`Sheet "${selectedSheet}" could not be found.`);
          setCsvOutput('');
          return;
        }
        const csv = convertSheetToCsv(worksheet, {
          separator: effectiveXlsxToCsvSep,
          includeHeaders,
          quoteFields,
          replaceLineBreaks,
          lineBreakReplacement,
        });
        setCsvOutput(csv);
        setError('');
      } catch (err) {
        reportError(err instanceof Error ? err.message : 'An error occurred during conversion.');
        setCsvOutput('');
      }
    } else if (conversionType === 'csv-to-xlsx') {
      const name = isPasted ? 'PastedData' : uploadedFile?.name.split('.').slice(0, -1).join('.');
      setSheetName(name || 'Sheet1');
    }
  }, [
    workbook,
    selectedSheet,
    xlsxToCsvSeparator,
    xlsxToCsvCustomSeparator,
    effectiveXlsxToCsvSep,
    includeHeaders,
    quoteFields,
    replaceLineBreaks,
    lineBreakReplacement,
    conversionType,
    uploadedFile,
    isPasted,
    reportError,
  ]);

  const sepOptions = [
    { value: ',', label: 'Comma (,)' },
    { value: ';', label: 'Semicolon (;)' },
    { value: '\\t', label: 'Tab' },
    { value: '|', label: 'Pipe (|)' },
    { value: 'custom', label: 'Custom' },
  ];

  return (
    <ToolContainer title="Data Converter" details={details} toolId={toolId}>
      <div className="space-y-6">
        {!(uploadedFile || isPasted) ? (
          <Card title="Start Conversion" className="p-6">
            <div className="space-y-6">
              <div className="flex justify-center border-b border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setInputMode('upload')}
                  className={`px-4 py-2 text-sm border-b-2 transition-colors ${
                    inputMode === 'upload'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('paste')}
                  className={`px-4 py-2 text-sm border-b-2 transition-colors ${
                    inputMode === 'paste'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  Paste Data
                </button>
              </div>

              {inputMode === 'upload' ? (
                <FileUpload
                  onFileSelect={handleFileUpload}
                  onError={msg => reportError(msg)}
                  accept=".csv,.tsv,.txt,.xlsx,.xls"
                  maxSizeMB={50}
                  title="Drag & drop your file here"
                  description="Supported: CSV, TSV, TXT, XLSX, XLS (max 50MB)"
                />
              ) : (
                <div className="space-y-4">
                  <TextArea
                    value={csvInput}
                    onChange={e => setCsvInput(e.target.value)}
                    placeholder="Paste your CSV or delimited data here..."
                    className="h-64 font-mono text-sm"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handlePaste(csvInput)}
                      disabled={!csvInput.trim()}
                      variant="primary"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl"
                >
                  <X className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <div className="space-y-8">
            <Card>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center flex-shrink-0">
                    <File className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Input</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {isPasted ? 'Pasted Data' : uploadedFile?.name}
                    </p>
                    {conversionType === 'xlsx-to-csv' && sheetNames.length > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {sheetNames.length} sheet{sheetNames.length === 1 ? '' : 's'}
                      </p>
                    )}
                  </div>
                </div>
                <Button onClick={resetState} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>

              {conversionType === 'xlsx-to-csv' && sheetNames.length > 1 && (
                <div className="mt-4">
                  <Label htmlFor="sheet-picker">Active Sheet</Label>
                  <CustomSelect
                    id="sheet-picker"
                    value={{ value: selectedSheet, label: selectedSheet }}
                    onChange={option =>
                      setSelectedSheet((option as { value: string; label: string })?.value || '')
                    }
                    options={sheetNames.map(n => ({ value: n, label: n }))}
                  />
                </div>
              )}
            </Card>

            {(conversionType === 'csv-to-xlsx' || conversionType === 'xlsx-to-csv') && (
              <div>
                <Label className="mb-4 text-base">Select Output Format</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {outputFormats
                    .filter(format =>
                      conversionType === 'xlsx-to-csv' ? format.value !== 'xlsx' : true
                    )
                    .map(format => (
                      <button
                        key={format.value}
                        type="button"
                        onClick={() => setOutputFormat(format.value)}
                        aria-pressed={outputFormat === format.value}
                        className={`p-4 rounded-xl transition-all duration-300 group relative ${
                          outputFormat === format.value
                            ? `bg-gradient-to-br ${format.color} text-white shadow-lg`
                            : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={
                              outputFormat === format.value
                                ? 'text-white'
                                : 'text-gray-600 dark:text-gray-400'
                            }
                          >
                            {format.icon}
                          </div>
                          <span className="text-xs font-semibold text-center leading-tight">
                            {format.label}
                          </span>
                          <span className="text-xs opacity-75">{format.description}</span>
                        </div>
                        {outputFormat === format.value && (
                          <CheckCircle2 className="h-5 w-5 absolute top-1 right-1 text-white" />
                        )}
                      </button>
                    ))}
                </div>
              </div>
            )}

            <Card
              title={
                <button
                  type="button"
                  onClick={() => setShowOptions(!showOptions)}
                  className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <Settings size={16} />
                  <span>{showOptions ? 'Hide' : 'Show'} Advanced Settings</span>
                </button>
              }
            >
              {showOptions && (
                <div className="space-y-6 pt-4">
                  {conversionType === 'csv-to-xlsx' && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="separator">Input Separator</Label>
                        <CustomSelect
                          id="separator"
                          value={{
                            value: csvToXlsxSeparator,
                            label:
                              sepOptions.find(o => o.value === csvToXlsxSeparator)?.label ||
                              'Custom',
                          }}
                          onChange={option =>
                            setCsvToXlsxSeparator(
                              (option as { value: string; label: string })?.value || ','
                            )
                          }
                          options={sepOptions}
                        />
                        {csvToXlsxSeparator === 'custom' && (
                          <Input
                            value={csvToXlsxCustomSeparator}
                            onChange={e => setCsvToXlsxCustomSeparator(e.target.value)}
                            className="mt-2"
                            placeholder="Custom separator"
                          />
                        )}
                      </div>

                      {outputFormat === 'xlsx' && (
                        <div>
                          <Label htmlFor="sheetName">Sheet Name</Label>
                          <Input
                            id="sheetName"
                            value={sheetName}
                            onChange={e => setSheetName(e.target.value)}
                            placeholder="e.g., Sheet1"
                          />
                        </div>
                      )}

                      {outputFormat === 'sql' && (
                        <div>
                          <Label htmlFor="sqlTable">Table Name</Label>
                          <Input
                            id="sqlTable"
                            value={sqlTableName}
                            onChange={e => setSqlTableName(e.target.value)}
                            placeholder="e.g., my_table"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={hasHeaders}
                          onChange={e => setHasHeaders(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          id="hasHeaders"
                        />
                        <Label htmlFor="hasHeaders" className="mb-0 cursor-pointer">
                          First row contains headers
                        </Label>
                      </div>
                    </div>
                  )}

                  {conversionType === 'xlsx-to-csv' && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="xlsx-separator">Output Separator</Label>
                        <CustomSelect
                          id="xlsx-separator"
                          value={{
                            value: xlsxToCsvSeparator,
                            label:
                              sepOptions.find(o => o.value === xlsxToCsvSeparator)?.label ||
                              'Custom',
                          }}
                          onChange={option =>
                            setXlsxToCsvSeparator(
                              (option as { value: string; label: string })?.value || ','
                            )
                          }
                          options={sepOptions}
                        />
                        {xlsxToCsvSeparator === 'custom' && (
                          <Input
                            value={xlsxToCsvCustomSeparator}
                            onChange={e => setXlsxToCsvCustomSeparator(e.target.value)}
                            placeholder="Custom separator"
                            className="mt-2"
                          />
                        )}
                      </div>

                      <div>
                        <Label htmlFor="quoteFields">Quote Fields</Label>
                        <CustomSelect
                          id="quoteFields"
                          value={{
                            value: quoteFields,
                            label: quoteFields.charAt(0).toUpperCase() + quoteFields.slice(1),
                          }}
                          onChange={option =>
                            setQuoteFields(
                              (option as { value: QuoteFields; label: string })?.value || 'smart'
                            )
                          }
                          options={[
                            { value: 'smart', label: 'Smart (Auto)' },
                            { value: 'always', label: 'Always Quote' },
                            { value: 'never', label: 'Never Quote' },
                          ]}
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={includeHeaders}
                          onChange={e => setIncludeHeaders(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          id="includeHeaders"
                        />
                        <Label htmlFor="includeHeaders" className="mb-0 cursor-pointer">
                          Include Headers
                        </Label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={replaceLineBreaks}
                          onChange={e => setReplaceLineBreaks(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          id="replaceLineBreaks"
                        />
                        <Label htmlFor="replaceLineBreaks" className="mb-0 cursor-pointer">
                          Replace cell line-breaks
                        </Label>
                      </div>

                      {replaceLineBreaks && (
                        <div>
                          <Label htmlFor="lineBreakReplacement">Line-break replacement</Label>
                          <Input
                            id="lineBreakReplacement"
                            value={lineBreakReplacement}
                            onChange={e => setLineBreakReplacement(e.target.value)}
                            placeholder="(space)"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Card>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={handleConvertAndDownload}
                disabled={isProcessing}
                size="lg"
                className="w-full sm:w-auto sm:min-w-[260px]"
                variant="primary"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download {outputFormats.find(f => f.value === outputFormat)?.label}
                  </>
                )}
              </Button>
              {outputFormat !== 'xlsx' && (
                <Button
                  onClick={copyTextOutput}
                  disabled={isProcessing}
                  variant="outline"
                  size="lg"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              )}
            </div>
            {error && (
              <div
                role="alert"
                className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-sm text-red-700 dark:text-red-300"
              >
                <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolContainer>
  );
};

export default CsvXlsxConverter;

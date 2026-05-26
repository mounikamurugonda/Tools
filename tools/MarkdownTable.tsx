'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ClipboardPaste,
  Copy,
  Download,
  Plus,
  Trash2,
} from 'lucide-react';

type Align = 'left' | 'center' | 'right';

const ALIGN_CYCLE: Align[] = ['left', 'center', 'right'];
const SEPARATORS: Record<Align, string> = {
  left: ':---',
  center: ':---:',
  right: '---:',
};

function parseDelimited(text: string): string[][] {
  // Detect tab vs comma
  const sep = text.includes('\t') ? '\t' : ',';
  // naive CSV (good enough for human-paste); doesn't handle escaped quotes-in-quotes
  return text
    .split(/\r?\n/)
    .filter(l => l.trim() !== '')
    .map(l => l.split(sep).map(c => c.trim().replace(/^"(.*)"$/, '$1')));
}

const MarkdownTable: React.FC<ToolProps> = ({ details, toolId }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState<string[][]>(
    Array.from({ length: 3 }, () => Array(3).fill(''))
  );
  const [align, setAlign] = useState<Align[]>(['left', 'left', 'left']);
  const toast = useToast();

  const updateCell = (r: number, c: number, val: string) => {
    setData(prev => prev.map((row, i) => (i === r ? row.map((cell, j) => (j === c ? val : cell)) : row)));
  };

  const handleResize = useCallback((newRows: number, newCols: number) => {
    setData(prev => {
      const next = prev.slice(0, newRows);
      while (next.length < newRows) next.push(Array(newCols).fill(''));
      return next.map(row => {
        if (newCols > row.length) return [...row, ...Array(newCols - row.length).fill('')];
        return row.slice(0, newCols);
      });
    });
    setAlign(prev => {
      const next = prev.slice(0, newCols);
      while (next.length < newCols) next.push('left');
      return next;
    });
    setRows(newRows);
    setCols(newCols);
  }, []);

  const addRow = () => handleResize(rows + 1, cols);
  const removeRow = () => handleResize(Math.max(1, rows - 1), cols);
  const addCol = () => handleResize(rows, Math.min(20, cols + 1));
  const removeCol = () => handleResize(rows, Math.max(1, cols - 1));

  const cycleAlign = (idx: number) =>
    setAlign(prev =>
      prev.map((a, i) => (i === idx ? ALIGN_CYCLE[(ALIGN_CYCLE.indexOf(a) + 1) % 3] : a))
    );

  const handlePasteCsv = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      const parsed = parseDelimited(text);
      if (!parsed.length) {
        toast.error('Clipboard is empty');
        return;
      }
      const maxCols = Math.max(...parsed.map(r => r.length));
      const padded = parsed.map(r => [...r, ...Array(Math.max(0, maxCols - r.length)).fill('')]);
      setData(padded);
      setRows(padded.length);
      setCols(maxCols);
      setAlign(Array(maxCols).fill('left'));
      toast.success(`Imported ${padded.length} rows × ${maxCols} cols`);
    } catch {
      toast.error('Could not read clipboard');
    }
  }, [toast]);

  const handleFile = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        const parsed = parseDelimited(text);
        if (!parsed.length) {
          toast.error('File is empty');
          return;
        }
        const maxCols = Math.max(...parsed.map(r => r.length));
        const padded = parsed.map(r => [
          ...r,
          ...Array(Math.max(0, maxCols - r.length)).fill(''),
        ]);
        setData(padded);
        setRows(padded.length);
        setCols(maxCols);
        setAlign(Array(maxCols).fill('left'));
        toast.success(`Imported ${file.name}`);
      } catch {
        toast.error('Could not read file');
      }
    },
    [toast]
  );

  const debouncedData = useDebounce(data, 250);
  const debouncedAlign = useDebounce(align, 250);

  const markdownOutput = useMemo(() => {
    if (!debouncedData.length || !debouncedData[0]) return '';
    // Pad each column so the source markdown is also human-readable
    const widths = debouncedData[0].map((_, c) =>
      Math.max(3, ...debouncedData.map(row => (row[c] ?? '').length))
    );
    const pad = (cell: string, w: number, a: Align) => {
      const padLen = w - cell.length;
      if (padLen <= 0) return cell;
      if (a === 'right') return ' '.repeat(padLen) + cell;
      if (a === 'center') {
        const l = Math.floor(padLen / 2);
        return ' '.repeat(l) + cell + ' '.repeat(padLen - l);
      }
      return cell + ' '.repeat(padLen);
    };
    const headerCells = debouncedData[0].map((cell, c) =>
      pad(cell || `Header${c + 1}`, widths[c], debouncedAlign[c] ?? 'left')
    );
    const separator = widths.map((w, c) => {
      const base = SEPARATORS[debouncedAlign[c] ?? 'left'];
      return base.length >= w ? base : base.replace('---', '-'.repeat(w - (base.length - 3)));
    });
    const header = '| ' + headerCells.join(' | ') + ' |';
    const sep = '| ' + separator.join(' | ') + ' |';
    const body = debouncedData
      .slice(1)
      .map(
        row =>
          '| ' +
          row
            .map((cell, c) => pad(cell || ' ', widths[c], debouncedAlign[c] ?? 'left'))
            .join(' | ') +
          ' |'
      )
      .join('\n');
    return debouncedData.length === 1 ? `${header}\n${sep}` : `${header}\n${sep}\n${body}`;
  }, [debouncedAlign, debouncedData]);

  const handleCopy = useCallback(async () => {
    if (!markdownOutput) return;
    try {
      await navigator.clipboard.writeText(markdownOutput);
      toast.success('Markdown copied');
    } catch {
      toast.error('Copy failed');
    }
  }, [markdownOutput, toast]);

  const handleDownload = useCallback(() => {
    if (!markdownOutput) return;
    const blob = new Blob([markdownOutput], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [markdownOutput]);

  const AlignIcon = (a: Align) =>
    a === 'left' ? <AlignLeft size={14} /> : a === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />;

  return (
    <ToolContainer title="Markdown Table Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFile}
          accept=".csv,.tsv,.txt,text/csv,text/plain"
          maxSizeMB={5}
          title="Import a CSV or TSV"
          description="Paste tab/comma-delimited data below, or click Paste from clipboard"
        />

        <Card title="Table size" className="p-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="w-24">
              <Label htmlFor="rows">Rows</Label>
              <Input
                id="rows"
                type="number"
                min={1}
                max={500}
                value={rows}
                onChange={e => handleResize(Number(e.target.value) || 1, cols)}
              />
            </div>
            <div className="w-24">
              <Label htmlFor="cols">Columns</Label>
              <Input
                id="cols"
                type="number"
                min={1}
                max={20}
                value={cols}
                onChange={e => handleResize(rows, Number(e.target.value) || 1)}
              />
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={addRow} title="Add row">
                <Plus size={14} className="mr-1" /> Row
              </Button>
              <Button size="sm" variant="outline" onClick={removeRow} title="Remove last row">
                <Trash2 size={14} className="mr-1" /> Row
              </Button>
              <Button size="sm" variant="outline" onClick={addCol} title="Add column">
                <Plus size={14} className="mr-1" /> Col
              </Button>
              <Button size="sm" variant="outline" onClick={removeCol} title="Remove last column">
                <Trash2 size={14} className="mr-1" /> Col
              </Button>
            </div>
            <div className="ml-auto">
              <Button size="sm" variant="outline" onClick={handlePasteCsv}>
                <ClipboardPaste size={14} className="mr-1" /> Paste from clipboard
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Data editor" className="overflow-hidden">
          <div className="overflow-x-auto pb-2">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr>
                  {Array.from({ length: cols }).map((_, c) => (
                    <th
                      key={`head-${c}`}
                      className="p-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-500"
                    >
                      <button
                        type="button"
                        onClick={() => cycleAlign(c)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 uppercase tracking-wider"
                        title={`Column align: ${align[c] ?? 'left'} (click to cycle)`}
                      >
                        {AlignIcon(align[c] ?? 'left')}
                        Col {c + 1}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rows }).map((_, r) => (
                  <tr key={r}>
                    {Array.from({ length: cols }).map((_, c) => (
                      <td key={c} className="border border-gray-200 dark:border-gray-700 p-0">
                        <input
                          aria-label={`Row ${r + 1} column ${c + 1}`}
                          className={`w-full p-3 outline-none bg-transparent text-sm ${
                            r === 0 ? 'font-bold bg-gray-50/50 dark:bg-gray-800/30' : ''
                          }`}
                          placeholder={r === 0 ? 'Header' : 'Cell'}
                          value={data[r]?.[c] || ''}
                          onChange={e => updateCell(r, c, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Markdown output" className="p-0 overflow-hidden">
          <div className="relative">
            <TextArea
              readOnly
              value={markdownOutput}
              className="h-56 border-none focus:ring-0 rounded-none font-mono text-sm bg-gray-50 dark:bg-gray-900"
              aria-live="polite"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!markdownOutput}
                className="p-2 rounded-md bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white shadow-sm disabled:opacity-40"
                aria-label="Copy"
                title="Copy"
              >
                <Copy size={16} />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!markdownOutput}
                className="p-2 rounded-md bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white shadow-sm disabled:opacity-40"
                aria-label="Download .md"
                title="Download .md"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default MarkdownTable;

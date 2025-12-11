'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import { Table as TableIcon } from 'lucide-react';

const MarkdownTable: React.FC<ToolProps> = ({ details, toolId }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState<string[][]>(
    Array.from({ length: 3 }, () => Array(3).fill('')),
  );

  const updateCell = (r: number, c: number, val: string) => {
    const newData = data.map((row, i) =>
      i === r ? row.map((cell, j) => (j === c ? val : cell)) : row,
    );
    setData(newData);
  };

  const handleResize = (newRows: number, newCols: number) => {
    const currentData = [...data];

    // Adjust rows
    if (newRows > currentData.length) {
      for (let i = currentData.length; i < newRows; i++) {
        currentData.push(Array(newCols).fill(''));
      }
    } else {
      currentData.splice(newRows);
    }

    // Adjust cols
    const resizedData = currentData.map(row => {
      if (newCols > row.length) {
        return [...row, ...Array(newCols - row.length).fill('')];
      } else {
        return row.slice(0, newCols);
      }
    });

    setData(resizedData);
    setRows(newRows);
    setCols(newCols);
  }

  const generateMarkdown = () => {
    if (!data.length || !data[0]) return '';
    const header = '| ' + data[0].map((cell) => cell || 'Header').join(' | ') + ' |';
    const separator = '| ' + data[0].map(() => '---').join(' | ') + ' |';

    // Skip first row as header
    if (data.length === 1) return `${header}\n${separator}`;

    const body = data.slice(1)
      .map((row) => '| ' + row.map((cell) => cell || 'Cell').join(' | ') + ' |')
      .join('\n');
    return `${header}\n${separator}\n${body}`;
  };

  return (
    <ToolContainer
      title="Markdown Table Generator"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-6">
        <Card title="Table Settings">
          <div className="flex gap-4 items-end">
            <div className="w-24">
              <Label htmlFor="rows">Rows</Label>
              <Input
                id="rows"
                type="number"
                min={1}
                max={50}
                value={rows}
                onChange={(e) => handleResize(Number(e.target.value), cols)}
              />
            </div>
            <div className="w-24">
              <Label htmlFor="cols">Columns</Label>
              <Input
                id="cols"
                type="number"
                min={1}
                max={10}
                value={cols}
                onChange={(e) => handleResize(rows, Number(e.target.value))}
              />
            </div>
          </div>
        </Card>

        <Card title="Data Editor" className="overflow-hidden">
          <div className="overflow-x-auto pb-2">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr>
                  {Array.from({ length: cols }).map((_, c) => (
                    <th key={`head-${c}`} className="p-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Col {c + 1}
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
                          className={`w-full p-3 outline-none bg-transparent text-sm ${r === 0 ? 'font-bold bg-gray-50/50 dark:bg-gray-800/30' : ''}`}
                          placeholder={r === 0 ? "Header" : `Cell`}
                          value={data[r]?.[c] || ''}
                          onChange={(e) => updateCell(r, c, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Markdown Output" className="p-0 overflow-hidden">
          <div className="relative">
            <TextArea
              readOnly
              value={generateMarkdown()}
              className="h-48 border-none focus:ring-0 rounded-none font-mono text-sm bg-gray-50 dark:bg-gray-900"
            />
            <div className="absolute top-2 right-2">
              <CopyButton textToCopy={generateMarkdown()} />
            </div>
          </div>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default MarkdownTable;

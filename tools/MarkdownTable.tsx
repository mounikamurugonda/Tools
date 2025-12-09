'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

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

  const generateMarkdown = () => {
    if (!data.length || !data[0]) return '';
    const header = '| ' + data[0].map(() => 'Header').join(' | ') + ' |';
    const separator = '| ' + data[0].map(() => '---').join(' | ') + ' |';
    const body = data
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
        <div className="flex gap-4 items-center">
          <label>
            Rows:{' '}
            <input
              type="number"
              value={rows}
              onChange={(e) => {
                setRows(Number(e.target.value));
                setData(
                  Array.from({ length: Number(e.target.value) }, () =>
                    Array(cols).fill(''),
                  ),
                );
              }}
              className="w-16 brand-input inline-block"
            />
          </label>
          <label>
            Cols:{' '}
            <input
              type="number"
              value={cols}
              onChange={(e) => {
                setCols(Number(e.target.value));
                setData(
                  Array.from({ length: rows }, () =>
                    Array(Number(e.target.value)).fill(''),
                  ),
                );
              }}
              className="w-16 brand-input inline-block"
            />
          </label>
        </div>

        <div className="overflow-auto border rounded">
          <table className="w-full">
            <tbody>
              {Array.from({ length: rows }).map((_, r) => (
                <tr key={r}>
                  {Array.from({ length: cols }).map((_, c) => (
                    <td key={c} className="border p-1">
                      <input
                        className="w-full p-1 outline-none bg-transparent"
                        placeholder={`R${r + 1}C${c + 1}`}
                        onChange={(e) => updateCell(r, c, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="relative">
          <textarea
            readOnly
            value={generateMarkdown()}
            className="w-full h-48 brand-input font-mono text-sm"
          />
          <CopyButton
            textToCopy={generateMarkdown()}
            className="absolute top-2 right-2"
          />
        </div>
      </div>
    </ToolContainer>
  );
};

export default MarkdownTable;

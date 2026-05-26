'use client';

import React, { useCallback, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import TextArea from '@/components/ui/TextArea';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Download, RefreshCw } from 'lucide-react';

type Format = 'standard' | 'uppercase' | 'no-hyphens' | 'braces';
type Version = 'v4' | 'v7';

// Minimal v7 implementation (time-ordered UUID, draft RFC 9562). v4 from crypto.randomUUID.
function uuidV4(): string {
  return crypto.randomUUID();
}
function uuidV7(): string {
  const now = BigInt(Date.now());
  const rand = new Uint8Array(10);
  crypto.getRandomValues(rand);
  // 48 bits time
  const timeHex = now.toString(16).padStart(12, '0');
  // Set version to 7 (top nibble of bytes[6])
  rand[0] = (rand[0] & 0x0f) | 0x70;
  // Set variant (top two bits of bytes[8])
  rand[2] = (rand[2] & 0x3f) | 0x80;
  const tail = Array.from(rand)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  // Layout: TTTTTTTT-TTTT-7xxx-yxxx-xxxxxxxxxxxx
  return (
    timeHex.slice(0, 8) +
    '-' +
    timeHex.slice(8, 12) +
    '-' +
    tail.slice(0, 4) +
    '-' +
    tail.slice(4, 8) +
    '-' +
    tail.slice(8, 20)
  );
}

function format(uuid: string, fmt: Format): string {
  switch (fmt) {
    case 'standard':
      return uuid;
    case 'uppercase':
      return uuid.toUpperCase();
    case 'no-hyphens':
      return uuid.replace(/-/g, '');
    case 'braces':
      return `{${uuid}}`;
  }
}

const UuidGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [count, setCount] = useState(10);
  const [version, setVersion] = useState<Version>('v4');
  const [fmt, setFmt] = useState<Format>('standard');
  const [list, setList] = useState<string[]>(() => Array.from({ length: 10 }, uuidV4));
  const toast = useToast();

  const generate = useCallback(() => {
    const n = Math.max(1, Math.min(1000, Math.floor(count) || 1));
    const gen = version === 'v7' ? uuidV7 : uuidV4;
    setList(Array.from({ length: n }, gen));
  }, [count, version]);

  const formatted = useMemo(() => list.map(u => format(u, fmt)), [list, fmt]);

  const copyOne = useCallback(
    async (uuid: string) => {
      try {
        await navigator.clipboard.writeText(uuid);
        toast.success('UUID copied');
      } catch {
        toast.error('Copy failed');
      }
    },
    [toast]
  );

  const copyAll = useCallback(async () => {
    if (formatted.length === 0) return;
    try {
      await navigator.clipboard.writeText(formatted.join('\n'));
      toast.success(`${formatted.length} UUIDs copied`);
    } catch {
      toast.error('Copy failed');
    }
  }, [formatted, toast]);

  const download = useCallback(() => {
    const blob = new Blob([formatted.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${version}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [formatted, version]);

  return (
    <ToolContainer title="UUID Generator" details={details} toolId={toolId}>
      <div className="space-y-6 max-w-3xl mx-auto">
        <Card title="Options" className="p-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="uuid-count">How many?</Label>
              <Input
                id="uuid-count"
                type="number"
                min={1}
                max={1000}
                value={count}
                onChange={e => setCount(parseInt(e.target.value, 10) || 1)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Version</Label>
              <div className="mt-1.5 inline-flex rounded-xl border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-900">
                {(['v4', 'v7'] as Version[]).map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVersion(v)}
                    aria-pressed={version === v}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                      version === v
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    title={v === 'v4' ? 'Random' : 'Time-ordered (RFC 9562)'}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="uuid-format">Format</Label>
              <div className="mt-1.5 inline-flex rounded-xl border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-900">
                {(
                  [
                    { id: 'standard', label: 'std' },
                    { id: 'uppercase', label: 'UPPER' },
                    { id: 'no-hyphens', label: 'flat' },
                    { id: 'braces', label: '{…}' },
                  ] as { id: Format; label: string }[]
                ).map(f => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFmt(f.id)}
                    aria-pressed={fmt === f.id}
                    className={`px-2 py-1 text-xs font-mono rounded-lg ${
                      fmt === f.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={generate}>
              <RefreshCw className="w-4 h-4 mr-2" /> Generate
            </Button>
            <Button variant="outline" size="sm" onClick={copyAll} disabled={formatted.length === 0}>
              <Copy className="w-4 h-4 mr-1" /> Copy all
            </Button>
            <Button variant="outline" size="sm" onClick={download} disabled={formatted.length === 0}>
              <Download className="w-4 h-4 mr-1" /> Download .txt
            </Button>
          </div>
        </Card>

        {formatted.length <= 1 ? (
          <Card>
            {formatted.length === 1 ? (
              <div className="flex items-center justify-between gap-3">
                <code className="font-mono text-lg break-all text-blue-600 dark:text-blue-400">
                  {formatted[0]}
                </code>
                <button
                  type="button"
                  onClick={() => copyOne(formatted[0])}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Copy"
                  title="Copy"
                >
                  <Copy size={16} />
                </button>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic text-center">
                No UUIDs yet.
              </p>
            )}
          </Card>
        ) : (
          <Card title={`${formatted.length} UUIDs`} className="p-0 overflow-hidden">
            <TextArea
              readOnly
              value={formatted.join('\n')}
              className="h-96 border-none focus:ring-0 rounded-none font-mono text-sm bg-gray-50 dark:bg-gray-900"
              aria-label="Generated UUIDs"
            />
          </Card>
        )}
      </div>
    </ToolContainer>
  );
};

export default UuidGenerator;

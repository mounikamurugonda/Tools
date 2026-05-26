'use client';

import React, { useCallback, useEffect, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import TextArea from '@/components/ui/TextArea';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, FileText, Hash, KeySquare } from 'lucide-react';

type Algorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

const ALGORITHMS: Algorithm[] = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

async function hashBuffer(algo: Algorithm, data: ArrayBuffer): Promise<string> {
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

const HashGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<Partial<Record<Algorithm, string>>>({});
  const [mode, setMode] = useState<'text' | 'file'>('text');
  const [hashing, setHashing] = useState(false);
  const toast = useToast();

  const computeForText = useCallback(async (value: string) => {
    if (!value) {
      setHashes({});
      return;
    }
    const bytes = new TextEncoder().encode(value);
    const next: Partial<Record<Algorithm, string>> = {};
    for (const a of ALGORITHMS) next[a] = await hashBuffer(a, bytes.buffer as ArrayBuffer);
    setHashes(next);
  }, []);

  useEffect(() => {
    if (mode === 'text') void computeForText(text);
  }, [computeForText, mode, text]);

  const handleFile = useCallback(
    async (f: File) => {
      setFile(f);
      setMode('file');
      setHashing(true);
      try {
        const buf = await f.arrayBuffer();
        const next: Partial<Record<Algorithm, string>> = {};
        for (const a of ALGORITHMS) next[a] = await hashBuffer(a, buf);
        setHashes(next);
        toast.success(`Hashed ${f.name}`);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Hashing failed');
      } finally {
        setHashing(false);
      }
    },
    [toast]
  );

  const copy = useCallback(
    async (value: string, label: string) => {
      try {
        await navigator.clipboard.writeText(value);
        toast.success(`${label} copied`);
      } catch {
        toast.error('Copy failed');
      }
    },
    [toast]
  );

  return (
    <ToolContainer title="Hash Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-900">
          {(['text', 'file'] as const).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg inline-flex items-center gap-2 ${
                mode === m
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {m === 'text' ? <FileText size={14} /> : <KeySquare size={14} />}
              {m === 'text' ? 'Text' : 'File'}
            </button>
          ))}
        </div>

        {mode === 'text' ? (
          <div className="space-y-2">
            <Label htmlFor="hash-input">Text to hash</Label>
            <TextArea
              id="hash-input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type or paste text — hashes update live"
              className="h-40"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <FileUpload
              onFileSelect={handleFile}
              maxSizeMB={500}
              title="Drop a file to hash"
              description="Anything from 1 KB to ~500 MB. Browser-only."
            />
            {file && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hashing ? 'Hashing…' : `Hashed ${file.name} (${(file.size / 1024).toFixed(1)} KB)`}
              </p>
            )}
          </div>
        )}

        <Card title="Hashes" className="p-4">
          <ul className="space-y-3">
            {ALGORITHMS.map(a => {
              const value = hashes[a] ?? '';
              return (
                <li key={a} className="grid grid-cols-[80px_1fr_auto] items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 inline-flex items-center gap-1">
                    <Hash size={12} />
                    {a}
                  </span>
                  <code
                    className="font-mono text-xs sm:text-sm break-all min-h-[24px] px-2 py-1 rounded bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 text-blue-700 dark:text-blue-300"
                    aria-live="polite"
                  >
                    {value || <span className="text-gray-400">…</span>}
                  </code>
                  <button
                    type="button"
                    onClick={() => copy(value, a)}
                    disabled={!value}
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                    aria-label={`Copy ${a}`}
                    title={`Copy ${a}`}
                  >
                    <Copy size={16} />
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default HashGenerator;

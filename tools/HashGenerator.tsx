'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import TextArea from '@/components/ui/TextArea';
import Input from '@/components/ui/Input';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, FileText, Hash, KeySquare, Check, X } from 'lucide-react';
import { md5Hex, crc32Hex } from '@/lib/legacyHash';

type Algorithm = 'MD5' | 'CRC32' | 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

const ALGORITHMS: Algorithm[] = ['MD5', 'CRC32', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
const SUBTLE_ALGOS = new Set<Algorithm>(['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']);

async function subtleDigest(algo: AlgorithmIdentifier, data: ArrayBuffer): Promise<string> {
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function computeAll(bytes: Uint8Array): Promise<Record<Algorithm, string>> {
  // Copy into a standalone ArrayBuffer so subtle.digest never sees a view offset.
  const buffer =
    bytes.byteOffset === 0 && bytes.byteLength === bytes.buffer.byteLength
      ? (bytes.buffer as ArrayBuffer)
      : (bytes.slice().buffer as ArrayBuffer);
  const out = {} as Record<Algorithm, string>;
  out['MD5'] = md5Hex(bytes);
  out['CRC32'] = crc32Hex(bytes);
  for (const a of ALGORITHMS) {
    if (SUBTLE_ALGOS.has(a)) out[a] = await subtleDigest(a, buffer);
  }
  return out;
}

/** Normalize a hash for comparison: strip whitespace, colons, 0x prefix, lowercase. */
function normalizeHash(h: string): string {
  return h.trim().toLowerCase().replace(/^0x/, '').replace(/[\s:]/g, '');
}

const HashGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<Partial<Record<Algorithm, string>>>({});
  const [mode, setMode] = useState<'text' | 'file'>('text');
  const [hashing, setHashing] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [expected, setExpected] = useState('');
  const toast = useToast();

  const computeForText = useCallback(async (value: string) => {
    if (!value) {
      setHashes({});
      return;
    }
    setHashes(await computeAll(new TextEncoder().encode(value)));
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
        setHashes(await computeAll(new Uint8Array(buf)));
        toast.success(`Hashed ${f.name}`);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Hashing failed');
      } finally {
        setHashing(false);
      }
    },
    [toast]
  );

  const display = useCallback((v: string) => (uppercase ? v.toUpperCase() : v), [uppercase]);

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

  // Which algorithm (if any) matches the expected hash the user pasted.
  const matchedAlgo = useMemo<Algorithm | null>(() => {
    const norm = normalizeHash(expected);
    if (!norm) return null;
    for (const a of ALGORITHMS) {
      const h = hashes[a];
      if (h && h.toLowerCase() === norm) return a;
    }
    return null;
  }, [expected, hashes]);

  const hasExpected = normalizeHash(expected).length > 0;
  const hasAnyHash = Object.keys(hashes).length > 0;

  return (
    <ToolContainer title="Hash Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
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

          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={e => setUppercase(e.target.checked)}
              className="rounded"
            />
            Uppercase hex
          </label>
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

        {/* Verify / compare against an expected checksum */}
        <div className="space-y-2">
          <Label htmlFor="hash-verify">Verify against a known hash (optional)</Label>
          <Input
            id="hash-verify"
            value={expected}
            onChange={e => setExpected(e.target.value)}
            placeholder="Paste an expected checksum to find a match…"
            className="font-mono text-sm"
          />
          {hasExpected &&
            hasAnyHash &&
            (matchedAlgo ? (
              <p className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 dark:text-green-400">
                <Check size={16} /> Match — this is a valid {matchedAlgo} hash of the input above.
              </p>
            ) : (
              <p className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                <X size={16} /> No match against any algorithm for the current input.
              </p>
            ))}
        </div>

        <Card title="Hashes" className="p-4">
          <ul className="space-y-3">
            {ALGORITHMS.map(a => {
              const raw = hashes[a] ?? '';
              const value = raw ? display(raw) : '';
              const isMatch = matchedAlgo === a;
              return (
                <li key={a} className="grid grid-cols-[80px_1fr_auto] items-center gap-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1 ${
                      isMatch
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    <Hash size={12} />
                    {a}
                  </span>
                  <code
                    className={`font-mono text-xs sm:text-sm break-all min-h-[24px] px-2 py-1 rounded border ${
                      isMatch
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800 text-green-700 dark:text-green-300'
                        : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800 text-blue-700 dark:text-blue-300'
                    }`}
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
          <p className="mt-3 text-[11px] text-gray-400 dark:text-gray-500">
            MD5 and CRC32 are checksums for integrity/legacy interop — not secure for passwords or
            signatures. Use SHA-256+ for security.
          </p>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default HashGenerator;

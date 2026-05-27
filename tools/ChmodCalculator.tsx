'use client';

import React, { useCallback, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Terminal } from 'lucide-react';

type Role = 'owner' | 'group' | 'public';
type Perm = 'read' | 'write' | 'execute';
type Permissions = Record<Role, Record<Perm, boolean>>;

const ROLES: Role[] = ['owner', 'group', 'public'];
const PERMS: Perm[] = ['read', 'write', 'execute'];
const PERM_LETTER: Record<Perm, string> = { read: 'r', write: 'w', execute: 'x' };
const PERM_VALUE: Record<Perm, number> = { read: 4, write: 2, execute: 1 };

const PRESETS: { label: string; octal: string; hint: string }[] = [
  { label: '755', octal: '755', hint: 'rwxr-xr-x — common for executables / dirs' },
  { label: '644', octal: '644', hint: 'rw-r--r-- — common for regular files' },
  { label: '700', octal: '700', hint: 'rwx------ — owner-only' },
  { label: '600', octal: '600', hint: 'rw------- — private file (SSH keys)' },
  { label: '777', octal: '777', hint: 'rwxrwxrwx — everyone full (avoid!)' },
  { label: '444', octal: '444', hint: 'r--r--r-- — read-only for all' },
];

function permsFromOctal(octal: string): Permissions | null {
  if (!/^[0-7]{3}$/.test(octal)) return null;
  const make = (n: number): Record<Perm, boolean> => ({
    read: (n & 4) === 4,
    write: (n & 2) === 2,
    execute: (n & 1) === 1,
  });
  return {
    owner: make(parseInt(octal[0], 10)),
    group: make(parseInt(octal[1], 10)),
    public: make(parseInt(octal[2], 10)),
  };
}

function octalDigit(p: Record<Perm, boolean>): number {
  return PERMS.reduce((sum, perm) => sum + (p[perm] ? PERM_VALUE[perm] : 0), 0);
}

function symbolic(p: Record<Perm, boolean>): string {
  return PERMS.map(perm => (p[perm] ? PERM_LETTER[perm] : '-')).join('');
}

const ChmodCalculator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [permissions, setPermissions] = useState<Permissions>({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    public: { read: true, write: false, execute: true },
  });
  const [filename, setFilename] = useState('filename');
  const toast = useToast();

  const octal = useMemo(
    () => ROLES.map(r => octalDigit(permissions[r])).join(''),
    [permissions]
  );
  const symbolicFull = useMemo(
    () => '-' + ROLES.map(r => symbolic(permissions[r])).join(''),
    [permissions]
  );
  const command = useMemo(() => `chmod ${octal} ${filename || 'filename'}`, [octal, filename]);

  const toggle = useCallback((role: Role, perm: Perm) => {
    setPermissions(prev => ({
      ...prev,
      [role]: { ...prev[role], [perm]: !prev[role][perm] },
    }));
  }, []);

  const applyOctal = useCallback((value: string) => {
    const parsed = permsFromOctal(value);
    if (parsed) setPermissions(parsed);
  }, []);

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
    <ToolContainer title="Chmod Calculator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Permissions" className="p-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {ROLES.map(role => (
              <div
                key={role}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4"
              >
                <h3 className="font-semibold capitalize mb-3 text-gray-900 dark:text-gray-100">
                  {role}
                </h3>
                <div className="space-y-2">
                  {PERMS.map(perm => (
                    <label
                      key={perm}
                      className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300"
                    >
                      <input
                        type="checkbox"
                        checked={permissions[role][perm]}
                        onChange={() => toggle(role, perm)}
                        className="rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="capitalize">{perm}</span>
                      <span className="ml-auto text-xs font-mono text-gray-500">
                        {PERM_LETTER[perm]} = {PERM_VALUE[perm]}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm">
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    {symbolic(permissions[role])}
                  </span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-lg">
                    {octalDigit(permissions[role])}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="relative p-6 bg-gray-50 dark:bg-gray-900 rounded-xl text-center border border-gray-200 dark:border-gray-700">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Octal</p>
            <code
              className="block text-4xl font-mono font-bold text-blue-600 dark:text-blue-400"
              aria-live="polite"
            >
              {octal}
            </code>
            <Button
              onClick={() => copy(octal, 'Octal')}
              variant="ghost"
              size="sm"
              className="absolute top-3 right-3"
              aria-label="Copy octal"
            >
              <Copy size={14} />
            </Button>
          </div>
          <div className="relative p-6 bg-gray-50 dark:bg-gray-900 rounded-xl text-center border border-gray-200 dark:border-gray-700">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Symbolic</p>
            <code
              className="block text-2xl md:text-3xl font-mono font-bold text-emerald-600 dark:text-emerald-400 break-all"
              aria-live="polite"
            >
              {symbolicFull}
            </code>
            <Button
              onClick={() => copy(symbolicFull, 'Symbolic')}
              variant="ghost"
              size="sm"
              className="absolute top-3 right-3"
              aria-label="Copy symbolic"
            >
              <Copy size={14} />
            </Button>
          </div>
        </div>

        <Card title="Command" className="p-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="chmod-filename">Filename</Label>
              <Input
                id="chmod-filename"
                value={filename}
                onChange={e => setFilename(e.target.value)}
                placeholder="filename"
                className="font-mono"
              />
            </div>
            <div className="relative bg-gray-900 dark:bg-black text-gray-100 rounded-lg p-4 font-mono text-sm flex items-center gap-2">
              <Terminal size={14} className="text-emerald-400 flex-shrink-0" />
              <code className="flex-1 break-all">{command}</code>
              <button
                type="button"
                onClick={() => copy(command, 'Command')}
                className="p-1.5 rounded text-gray-300 hover:text-white hover:bg-gray-700"
                aria-label="Copy command"
                title="Copy command"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        </Card>

        <Card title="Presets" className="p-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(p => (
              <button
                key={p.octal}
                type="button"
                onClick={() => applyOctal(p.octal)}
                aria-pressed={octal === p.octal}
                title={p.hint}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-mono ${
                  octal === p.octal
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Each digit is the sum: <span className="font-mono">read=4 · write=2 · execute=1</span>.
            Order is owner · group · public.
          </p>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default ChmodCalculator;

'use client';

import React, { useCallback, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface Decoded {
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string | null;
  parts: [string, string, string] | null;
  error: string | null;
}

function base64UrlDecode(s: string): string {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder('utf-8').decode(bytes);
}

function decodeJwt(raw: string): Decoded {
  const token = raw.trim().replace(/^Bearer\s+/i, '');
  if (!token) return { header: null, payload: null, signature: null, parts: null, error: null };
  const parts = token.split('.');
  if (parts.length !== 3) {
    return { header: null, payload: null, signature: null, parts: null, error: `Expected 3 segments separated by ".", got ${parts.length}` };
  }
  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return {
      header,
      payload,
      signature: parts[2],
      parts: [parts[0], parts[1], parts[2]],
      error: null,
    };
  } catch (e) {
    return { header: null, payload: null, signature: null, parts: null, error: e instanceof Error ? e.message : 'Decode failed' };
  }
}

const CLAIM_DESCRIPTIONS: Record<string, string> = {
  iss: 'Issuer',
  sub: 'Subject (user/owner)',
  aud: 'Audience',
  exp: 'Expiration time',
  nbf: 'Not before',
  iat: 'Issued at',
  jti: 'JWT ID',
};

function formatTimestamp(value: unknown): string | null {
  if (typeof value !== 'number') return null;
  // JWT spec: seconds since epoch.
  const ms = value > 1e12 ? value : value * 1000;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString();
}

function relativeFrom(value: number): string {
  const nowSec = Date.now() / 1000;
  const sec = value > 1e12 ? value / 1000 : value;
  const diff = sec - nowSec;
  const abs = Math.abs(diff);
  const future = diff > 0;
  let str: string;
  if (abs < 60) str = `${Math.round(abs)}s`;
  else if (abs < 3600) str = `${Math.round(abs / 60)}m`;
  else if (abs < 86400) str = `${Math.round(abs / 3600)}h`;
  else str = `${Math.round(abs / 86400)}d`;
  return future ? `in ${str}` : `${str} ago`;
}

const JwtDebugger: React.FC<ToolProps> = ({ details, toolId }) => {
  const [token, setToken] = useState('');
  const toast = useToast();

  const decoded = useMemo(() => decodeJwt(token), [token]);

  const validity = useMemo(() => {
    if (!decoded.payload) return null;
    const now = Date.now() / 1000;
    const exp = typeof decoded.payload.exp === 'number' ? decoded.payload.exp : null;
    const nbf = typeof decoded.payload.nbf === 'number' ? decoded.payload.nbf : null;
    if (exp !== null && now > exp) return { ok: false, reason: `Expired ${relativeFrom(exp)}` };
    if (nbf !== null && now < nbf) return { ok: false, reason: `Not valid yet (starts ${relativeFrom(nbf)})` };
    if (exp !== null) return { ok: true, reason: `Expires ${relativeFrom(exp)}` };
    return { ok: true, reason: 'No exp claim' };
  }, [decoded.payload]);

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
    <ToolContainer title="JWT Decoder" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Encoded Token" className="p-4">
          <div className="space-y-2">
            <Label htmlFor="jwt-input" className="sr-only">JWT</Label>
            <TextArea
              id="jwt-input"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="Paste your JWT (with or without 'Bearer ' prefix)..."
              className="font-mono min-h-[120px] break-all"
            />
            {decoded.parts && (
              <div className="font-mono text-sm break-all leading-relaxed p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <span className="text-rose-600 dark:text-rose-400">{decoded.parts[0]}</span>
                <span className="text-gray-400">.</span>
                <span className="text-violet-600 dark:text-violet-400">{decoded.parts[1]}</span>
                <span className="text-gray-400">.</span>
                <span className="text-sky-600 dark:text-sky-400">{decoded.parts[2]}</span>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Header
              </span>
              <span className="inline-flex items-center gap-1 text-violet-600 dark:text-violet-400">
                <span className="w-2 h-2 rounded-full bg-violet-500" /> Payload
              </span>
              <span className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400">
                <span className="w-2 h-2 rounded-full bg-sky-500" /> Signature
              </span>
            </div>
          </div>
        </Card>

        {decoded.error && (
          <div role="alert" className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{decoded.error}</span>
          </div>
        )}

        {validity && (
          <div
            className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
              validity.ok
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50'
                : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50'
            }`}
          >
            {validity.ok ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            <span className="font-medium">{validity.reason}</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <SegmentCard title="Header" color="rose" data={decoded.header} onCopy={copy} />
          <SegmentCard title="Payload" color="violet" data={decoded.payload} onCopy={copy} withClaimHints />
        </div>

        {decoded.signature && (
          <Card title={<span><span className="text-sky-600 dark:text-sky-400">●</span> Signature</span>} className="p-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              The signature is opaque — verifying it requires the issuer's secret/public key, which never leaves their server.
            </p>
            <code className="block break-all font-mono text-xs text-sky-700 dark:text-sky-300 bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
              {decoded.signature}
            </code>
          </Card>
        )}
      </div>
    </ToolContainer>
  );
};

const SegmentCard: React.FC<{
  title: string;
  color: 'rose' | 'violet';
  data: Record<string, unknown> | null;
  withClaimHints?: boolean;
  onCopy: (v: string, l: string) => void;
}> = ({ title, color, data, withClaimHints, onCopy }) => {
  const colorDot = color === 'rose' ? 'text-rose-600 dark:text-rose-400' : 'text-violet-600 dark:text-violet-400';
  return (
    <Card title={<span><span className={colorDot}>●</span> {title}</span>} className="p-0 overflow-hidden">
      <div className="relative">
        <pre className="bg-gray-50 dark:bg-gray-900 p-4 font-mono text-xs sm:text-sm text-gray-800 dark:text-gray-200 overflow-auto min-h-[200px] whitespace-pre">
          {data ? JSON.stringify(data, null, 2) : <span className="text-gray-400 italic">No data</span>}
        </pre>
        {data && (
          <button
            type="button"
            onClick={() => onCopy(JSON.stringify(data, null, 2), title)}
            className="absolute top-2 right-2 p-1.5 rounded text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={`Copy ${title}`}
          >
            <Copy size={14} />
          </button>
        )}
      </div>
      {withClaimHints && data && (
        <ul className="border-t border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 text-xs">
          {Object.entries(data)
            .filter(([k]) => CLAIM_DESCRIPTIONS[k] !== undefined)
            .map(([k, v]) => {
              const ts = formatTimestamp(v);
              return (
                <li key={k} className="px-4 py-2 flex items-baseline gap-2">
                  <span className="font-mono font-semibold text-violet-700 dark:text-violet-300 min-w-[2.5rem]">{k}</span>
                  <span className="text-gray-500 dark:text-gray-400 min-w-[8rem]">{CLAIM_DESCRIPTIONS[k]}</span>
                  <span className="text-gray-800 dark:text-gray-200 font-mono break-all flex-1">
                    {ts ? `${ts} (${relativeFrom(v as number)})` : String(v)}
                  </span>
                </li>
              );
            })}
        </ul>
      )}
    </Card>
  );
};

export default JwtDebugger;

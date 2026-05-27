'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, RotateCcw } from 'lucide-react';

interface CapturedEvent {
  key: string;
  code: string;
  keyCode: number;
  which: number;
  location: number;
  repeat: boolean;
  shiftKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}

const LOCATION_NAMES = ['Standard', 'Left', 'Right', 'Numpad'];

function isModifierOnly(e: KeyboardEvent): boolean {
  return ['Shift', 'Control', 'Alt', 'Meta', 'AltGraph', 'CapsLock', 'NumLock', 'ScrollLock'].includes(e.key);
}

const KeycodeInfo: React.FC<ToolProps> = ({ details, toolId }) => {
  const [event, setEvent] = useState<CapturedEvent | null>(null);
  const [paused, setPaused] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    if (paused) return;
    const handler = (e: KeyboardEvent) => {
      // Don't swallow browser shortcuts (Ctrl-T, F5, Escape, etc.) — only capture, never preventDefault.
      // Only prevent default if the user is focused inside the capture area AND it's a plain key (no modifiers).
      const target = e.target as HTMLElement | null;
      const insideCapture = !!captureRef.current && (e.target === captureRef.current || captureRef.current.contains(target));
      if (insideCapture && !e.ctrlKey && !e.metaKey && !e.altKey && e.key !== 'Tab' && e.key !== 'F5') {
        e.preventDefault();
      }
      setEvent({
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        which: e.which,
        location: e.location,
        repeat: e.repeat,
        shiftKey: e.shiftKey,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
      });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [paused]);

  const reset = useCallback(() => {
    setEvent(null);
    captureRef.current?.focus();
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

  const copyAsJson = useCallback(() => {
    if (!event) return;
    void copy(JSON.stringify(event, null, 2), 'JSON');
  }, [event, copy]);

  return (
    <ToolContainer title="Keycode Info" details={details} toolId={toolId}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div
          ref={captureRef}
          tabIndex={0}
          role="application"
          aria-label="Keyboard capture area"
          className="relative p-10 sm:p-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors flex flex-col items-center justify-center min-h-[260px]"
        >
          {!event ? (
            <>
              <div className="text-6xl mb-4 select-none">⌨️</div>
              <p className="text-lg sm:text-2xl font-semibold text-gray-600 dark:text-gray-300 text-center">
                Click here, then press any key
              </p>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Browser shortcuts (Ctrl-T, F5, ⌘-W, …) keep working
              </p>
            </>
          ) : (
            <>
              <div className="text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold mb-3">
                event.key
              </div>
              <div className="text-6xl sm:text-8xl font-bold font-mono text-gray-900 dark:text-white select-none">
                {event.key === ' ' ? '␣' : event.key.length === 1 ? event.key : event.key}
              </div>
              {event.repeat && (
                <span className="mt-3 px-2 py-0.5 text-[10px] rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 font-semibold uppercase tracking-wider">
                  Auto-repeat
                </span>
              )}
            </>
          )}
        </div>

        {event && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <InfoCard label="event.code" value={event.code} mono onCopy={() => copy(event.code, 'event.code')} />
              <InfoCard label="event.keyCode" value={String(event.keyCode)} mono onCopy={() => copy(String(event.keyCode), 'keyCode')} />
              <InfoCard label="event.which" value={String(event.which)} mono onCopy={() => copy(String(event.which), 'which')} deprecated />
              <InfoCard
                label="event.location"
                value={`${event.location} (${LOCATION_NAMES[event.location] ?? '?'})`}
                onCopy={() => copy(String(event.location), 'location')}
              />
            </div>

            <Card title="Modifiers" className="p-4">
              <div className="flex flex-wrap gap-2">
                <Badge label="Shift" active={event.shiftKey} />
                <Badge label="Ctrl" active={event.ctrlKey} />
                <Badge label="Alt" active={event.altKey} />
                <Badge label="Meta / ⌘" active={event.metaKey} />
              </div>
            </Card>

            <div className="flex flex-wrap gap-2 justify-center">
              <Button onClick={copyAsJson} variant="outline" size="sm">
                <Copy size={14} className="mr-1.5" /> Copy as JSON
              </Button>
              <Button onClick={() => setPaused(p => !p)} variant="outline" size="sm">
                {paused ? 'Resume capture' : 'Pause capture'}
              </Button>
              <Button onClick={reset} variant="ghost" size="sm">
                <RotateCcw size={14} className="mr-1.5" /> Reset
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolContainer>
  );
};

const InfoCard: React.FC<{ label: string; value: string; mono?: boolean; deprecated?: boolean; onCopy: () => void }> = ({
  label,
  value,
  mono,
  deprecated,
  onCopy,
}) => (
  <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400 font-mono">{label}</span>
      {deprecated && (
        <span className="text-[9px] text-amber-600 dark:text-amber-400 font-semibold uppercase">deprecated</span>
      )}
    </div>
    <div className={`${mono ? 'font-mono' : ''} text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate`} title={value}>
      {value === ' ' ? '(Space)' : value || '(empty)'}
    </div>
    <button
      type="button"
      onClick={onCopy}
      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      aria-label={`Copy ${label}`}
    >
      <Copy size={12} />
    </button>
  </div>
);

const Badge: React.FC<{ label: string; active: boolean }> = ({ label, active }) => (
  <span
    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      active
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 ring-1 ring-blue-300 dark:ring-blue-700'
        : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
    }`}
  >
    {label}
  </span>
);

export default KeycodeInfo;

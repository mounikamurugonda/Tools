'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Sparkles, Copy, CheckCheck, AlertCircle, Loader2, X } from 'lucide-react';
import { GentleLoginModal } from './GentleLoginModal';

interface AIActionButtonProps {
  label: string;
  actionName?: string;
  onAction: () => Promise<string>;
  className?: string;
  disabled?: boolean;
  hint?: string;
}

export const AIActionButton: React.FC<AIActionButtonProps> = ({
  label,
  actionName,
  onAction,
  className = '',
  disabled = false,
  hint,
}) => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [copied, setCopied] = useState(false);

  // Only render session-aware UI after hydration to avoid SSR mismatch.
  // On the server session=null; on the client it may differ → [object Object] crash.
  useEffect(() => { setMounted(true); }, []);

  const handleClick = async () => {
    if (!session) {
      setShowLogin(true);
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await onAction();
      setResult(typeof res === 'string' ? res : String(res));
    } catch (e: unknown) {
      let msg = 'AI request failed. Please try again.';
      if (e instanceof Error) msg = e.message;
      else if (typeof e === 'string') msg = e;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Before hydration: render a static placeholder that matches SSR output exactly.
  // The button is present but session-dependent hints are suppressed.
  if (!mounted) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            disabled
            className={[
              'inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg',
              'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-sm',
              'opacity-50 cursor-not-allowed',
              className,
            ].join(' ')}
          >
            <Sparkles size={14} />
            <span>{label}</span>
          </button>
          {hint && (
            <span className="text-xs text-gray-400 dark:text-gray-500 italic">{hint}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <GentleLoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        actionName={actionName ?? label}
      />

      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleClick}
            disabled={loading || disabled}
            className={[
              'inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all',
              'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700',
              'text-white shadow-sm hover:shadow-md active:scale-95',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
              className,
            ].join(' ')}
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Sparkles size={14} />
            )}
            <span>{loading ? 'Thinking…' : label}</span>
          </button>

          {hint && !result && !loading && (
            <span className="text-xs text-gray-400 dark:text-gray-500 italic">{hint}</span>
          )}

          {/* Only shown after mount — avoids hydration mismatch */}
          {!session && (
            <span className="text-xs text-violet-500 dark:text-violet-400 font-medium">
              Sign in to use AI
            </span>
          )}
        </div>

        {error && (
          
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span> {error} </span>
          </div>
        )}

        {result && (
          <div className="relative rounded-xl border border-violet-200 dark:border-violet-800/60 bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-900/10 dark:to-blue-900/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-violet-200/70 dark:border-violet-800/40 bg-white/40 dark:bg-white/5">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-violet-700 dark:text-violet-400">
                <Sparkles size={12} />
                AI Result
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-900 dark:hover:text-violet-200 transition-colors"
                >
                  {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                
                <button
                  onClick={() => setResult(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ml-1"
                  title="Dismiss"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            <div className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {result}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const AIBadgeButton: React.FC<Omit<AIActionButtonProps, 'hint'>> = (props) => (
  <AIActionButton
    {...props}
    className={`px-3 py-1.5 text-xs ${props.className ?? ''}`}
  />
);

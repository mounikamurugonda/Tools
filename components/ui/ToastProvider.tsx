'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AlertCircle, Check, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
}

interface ToastApi {
  show: (message: string, opts?: { type?: ToastType; duration?: number }) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  dismiss: (id?: number) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

const styles: Record<ToastType, { bg: string; icon: React.ReactNode }> = {
  success: {
    bg: 'bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400',
    icon: <Check size={18} className="text-green-500" />,
  },
  error: {
    bg: 'bg-white dark:bg-gray-800 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400',
    icon: <AlertCircle size={18} className="text-red-500" />,
  },
  info: {
    bg: 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400',
    icon: <Info size={18} className="text-blue-500" />,
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id?: number) => {
    setToasts(prev => (id == null ? [] : prev.filter(t => t.id !== id)));
  }, []);

  const show = useCallback<ToastApi['show']>((message, opts) => {
    const id = ++idRef.current;
    const item: ToastItem = {
      id,
      message,
      type: opts?.type ?? 'info',
      duration: opts?.duration ?? 3000,
    };
    setToasts(prev => [...prev, item]);
    if (item.duration > 0) {
      window.setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, item.duration);
    }
  }, []);

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: (m, d) => show(m, { type: 'success', duration: d }),
      error: (m, d) => show(m, { type: 'error', duration: d ?? 5000 }),
      info: (m, d) => show(m, { type: 'info', duration: d }),
      dismiss,
    }),
    [dismiss, show]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        role="region"
        aria-label="Notifications"
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] flex flex-col items-center gap-2 pointer-events-none"
      >
        {toasts.map(t => {
          const s = styles[t.type];
          return (
            <div
              key={t.id}
              role={t.type === 'error' ? 'alert' : 'status'}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border backdrop-blur-md transition-all animate-in fade-in slide-in-from-top-4 duration-300 ${s.bg}`}
            >
              <span className="shrink-0">{s.icon}</span>
              <p className="text-sm font-semibold">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
      console.warn('useToast() called outside <ToastProvider>. Falling back to no-op.');
    }
    const noop: ToastApi = {
      show: () => {},
      success: () => {},
      error: () => {},
      info: () => {},
      dismiss: () => {},
    };
    return noop;
  }
  return ctx;
}

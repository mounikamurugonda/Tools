/**
 * Lazy-load helper for heavy tool components.
 *
 * Why: tools that pull in Monaco, FFmpeg.wasm, @huggingface/transformers,
 * onnxruntime-web, kokoro-js, etc. should NOT block first paint on every
 * route. Wrap their entry component with `lazyTool()` so the heavy chunk
 * is split out and only loaded when the tool actually renders.
 *
 * Usage:
 *
 *   // tools/JsonFormatter.lazy.tsx
 *   import { lazyTool } from '@/lib/lazy';
 *   export default lazyTool(() => import('./JsonFormatter'));
 *
 * Then register `JsonFormatter.lazy` in the dynamic tool loader.
 *
 * Notes:
 *  - SSR is disabled — these tools are interactive client-only.
 *  - A small skeleton renders while the chunk loads.
 */

import dynamic from 'next/dynamic';
import type { ComponentType, ReactNode } from 'react';
import React from 'react';

const defaultLoading = (): ReactNode =>
  React.createElement('div', {
    role: 'status',
    'aria-busy': 'true',
    'aria-label': 'Loading tool',
    className:
      'animate-pulse rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 h-64 w-full',
  });

export function lazyTool<P>(
  loader: () => Promise<{ default: ComponentType<P> }>,
  options?: { loading?: () => ReactNode }
): ComponentType<P> {
  return dynamic(loader, {
    ssr: false,
    loading: options?.loading ?? defaultLoading,
  }) as unknown as ComponentType<P>;
}

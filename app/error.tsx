'use client';

import React, { useEffect } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

/**
 * Route-level error boundary. Renders when a child throws during render.
 * Logs the error so it shows up in any wired analytics; gives the user a
 * recoverable retry.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[RouteError]', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="p-4 mb-6 rounded-full bg-red-50 dark:bg-red-900/20">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        Something went wrong
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        We hit an unexpected error rendering this page. You can try again, or head back home.
      </p>
      {error.digest && (
        <p className="text-xs font-mono text-gray-400 dark:text-gray-500 mb-6">
          ref: {error.digest}
        </p>
      )}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={() => reset()} size="md">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Try again
        </Button>
        <Link href="/">
          <Button variant="outline" size="md">
            Return home
          </Button>
        </Link>
      </div>
    </div>
  );
}

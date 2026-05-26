'use client';

import React, { useEffect } from 'react';

/**
 * Top-level error boundary that wraps the root layout itself. Must
 * render its own <html> + <body> because the regular layout has not
 * mounted at this point.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Critical error</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            The application failed to load. Please refresh, or try again in a moment.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-gray-400 dark:text-gray-500 mb-6">
              ref: {error.digest}
            </p>
          )}
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}

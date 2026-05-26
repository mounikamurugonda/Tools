import React from 'react';

/**
 * Default route-level loading skeleton. Tools have their own under
 * app/tools/[toolId]/loading.tsx; this covers the rest of the routes
 * so users never see a blank screen during navigation.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading page"
      className="container mx-auto px-4 max-w-7xl animate-pulse py-12 space-y-8"
    >
      <div className="h-10 w-1/3 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-700/50 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3"
          >
            <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-full bg-gray-100 dark:bg-gray-700/60 rounded" />
            <div className="h-3 w-5/6 bg-gray-100 dark:bg-gray-700/60 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

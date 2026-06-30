import React from 'react';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 max-w-7xl animate-pulse space-y-8">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 sm:w-1/4"></div>
        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Main Tool Area Skeleton */}
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-[400px] flex flex-col gap-6">
        {/* Input/Control Area Mockup */}
        <div className="flex gap-4">
          <div className="h-10 bg-gray-100 dark:bg-gray-700/50 rounded-md w-1/4"></div>
          <div className="h-10 bg-gray-100 dark:bg-gray-700/50 rounded-md w-24"></div>
        </div>

        {/* Split View Mockup */}
        <div className="grid md:grid-cols-2 gap-6 flex-grow">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl h-full p-4 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-full bg-gray-200 dark:bg-gray-700/30 rounded-lg"></div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl h-full p-4 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-full bg-gray-200 dark:bg-gray-700/30 rounded-lg opacity-70"></div>
          </div>
        </div>
      </div>

      {/* Tags Skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-blue-50 dark:bg-blue-900/20 rounded-full"></div>
          <div className="h-8 w-24 bg-blue-50 dark:bg-blue-900/20 rounded-full"></div>
          <div className="h-8 w-16 bg-blue-50 dark:bg-blue-900/20 rounded-full"></div>
        </div>
      </div>

      {/* Text Content Skeleton */}
      <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

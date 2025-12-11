'use client';

import React from 'react';
import { TOOLS } from '@/constants';
import ToolCard from './ToolCard';
import Link from 'next/link';
import { ChevronRightIcon } from './icons';

const MostViewedTools: React.FC = () => {
  // Show popular tools that are not featured
  const popularTools = TOOLS.filter((tool) => !tool.featured).slice(0, 6);

  if (popularTools.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Most Popular Tools
        </h2>
        <Link
          href="/tools"
          className="text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center transition-all hover:gap-2 group"
        >
          View All Tools <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {popularTools.map((tool) => (
          <Link key={tool.id} href={`/tools/${tool.id}`}>
            <ToolCard tool={tool} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostViewedTools;


import React from 'react';
import type { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
  isCompact?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, isCompact = false }) => {
  if (isCompact) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 pt-0.5">
            <div className="inline-flex items-center justify-center w-6 h-6">
              {tool.icon}
            </div>
          </div>
          <div className="min-w-0 flex-1 text-left">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{tool.name}</h4>
            <p className="mt-1 text-gray-600 dark:text-gray-400 text-xs line-clamp-3 min-h-[3.75rem]">{tool.description}</p>
            <div className="mt-3">
              <span className="inline-block text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">Read more</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 h-full">
      <div className="flex items-start gap-4 text-left">
        <div className="flex-shrink-0 pt-0.5">
          <div className="inline-flex items-center justify-center w-8 h-8">
            {tool.icon}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tool.name}</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-3 ">{tool.description}</p>
          <div className="mt-4">
            <span className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">Read more</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;

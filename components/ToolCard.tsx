
import React from 'react';
import type { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
  isCompact?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, isCompact = false }) => {
  if (isCompact) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
        <div className="flex-shrink-0 mr-3">
          {React.cloneElement(tool.icon as React.ReactElement, {
            className: "w-6 h-6 text-blue-400"
          })}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{tool.name}</h4>
          <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{tool.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 h-full"
    >
      {tool.icon}
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{tool.name}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{tool.description}</p>
    </div>
  );
};

export default ToolCard;

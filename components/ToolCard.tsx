
import React from 'react';
import type { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
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

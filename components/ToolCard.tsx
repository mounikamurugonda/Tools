import React from 'react';
import type { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
  isCompact?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, isCompact = false }) => {
  if (isCompact) {
    return (
      <div className="brand-card p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 pt-0.5">
            <div className="inline-flex items-center justify-center w-6 h-6 text-accent">
              {tool.icon}
            </div>
          </div>
          <div className="min-w-0 flex-1 text-left">
            <h4 className="text-sm font-medium text-light-text dark:text-dark-text">{tool.name}</h4>
            <p className="mt-1 text-gray-500 text-xs line-clamp-3 min-h-[3.75rem]">{tool.description}</p>
            <div className="mt-3">
              <span className="inline-block text-xs font-semibold text-accent hover:underline">Read more</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="brand-card p-6 h-full">
      <div className="flex items-start gap-4 text-left">
        <div className="flex-shrink-0 pt-0.5">
          <div className="inline-flex items-center justify-center w-8 h-8 text-accent">
            {tool.icon}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-light-text dark:text-dark-text ">{tool.name}</h3>
          <p className="mt-2 text-gray-500 text-sm line-clamp-3 ">{tool.description}</p>
          <div className="mt-4">
            <span className="inline-block text-sm font-semibold text-accent hover:underline">Try Now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
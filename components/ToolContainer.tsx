import React from 'react';
import type { ToolDetails } from '@/types';
import ToolDescription from './ToolDescription';

interface ToolContainerProps {
  title: string;
  children: React.ReactNode;
  details: ToolDetails;
  toolId?: string;
  fullHeight?: boolean;
}

const ToolContainer: React.FC<ToolContainerProps> = ({ title, children, details, toolId, fullHeight }) => {

  return (
    <div className={`animate-fade-in p-4 md:p-8 ${fullHeight ? 'flex flex-col h-full' : ''}`}>
      <div className="flex justify-between items-center mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${fullHeight ? 'flex-1 flex flex-col' : ''}`}>
        {children}
      </div>
      <ToolDescription details={details} />
    </div>
  );
};

export default ToolContainer;

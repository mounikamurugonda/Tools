import React, { useEffect } from 'react';
import type { ToolDetails } from '@/types';
import ToolDescription from './ToolDescription';
import ViewCount from './ViewCount';
import { incrementViewCount } from '@/lib/viewCount';

interface ToolContainerProps {
  title: string;
  children: React.ReactNode;
  details: ToolDetails;
  toolId?: string;
}

const ToolContainer: React.FC<ToolContainerProps> = ({ title, children, details, toolId }) => {
  // Increment view count when tool container mounts (only on actual tool pages)
  useEffect(() => {
    if (toolId) {
      incrementViewCount(toolId);
    }
  }, [toolId]);

  return (
    <div className="p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {toolId && <ViewCount toolId={toolId} />}
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {children}
      </div>
      <ToolDescription details={details} />
    </div>
  );
};

export default ToolContainer;

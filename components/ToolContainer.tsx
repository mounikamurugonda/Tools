import React, { useRef } from 'react';
import type { Tool, ToolDetails } from '@/types';
import ToolDescription from './ToolDescription';
import ShareButton from './ShareButton';
import ToolCredits from './ToolCredits';
import { SITE_CREDITS, TOOL_CREDITS } from '@/lib/credits';
import ToolCard from './ToolCard'; // Import ToolCard for recommended tools
import Link from 'next/link';
import { TOOLS } from '@/constants';

interface ToolContainerProps {
  title: string;
  children: React.ReactNode;
  details: ToolDetails;
  toolId?: string;
}

const ToolContainer: React.FC<ToolContainerProps> = ({ title, children, details, toolId }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentTool = toolId ? TOOLS.find(tool => tool.id === toolId) : undefined;
  const currentToolCategory = currentTool ? currentTool.category : undefined;

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const recommendedTools = currentToolCategory
    ? TOOLS.filter(tool => tool.category === currentToolCategory && tool.id !== toolId)
    : [];

  return (
    <div className=" animate-fade-in">
      <div className="flex justify-between items-center mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">
        <h2 className="sm:text-2xl text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {toolId && <ShareButton toolId={toolId} title={title} />}
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        {children} 
      </div>

      {recommendedTools.length > 0 && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recommended {currentToolCategory} Tools
            </h3>
            <div className="flex space-x-2">
              <button onClick={() => scroll(-300)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={() => scroll(300)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {recommendedTools.map((tool) => (
              <div key={tool.id} className="flex-none w-64">
                <Link href={`/tools/${tool.id}`} passHref>
                  <ToolCard tool={tool as unknown as Tool} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToolDescription details={details} />
      <ToolCredits items={[...(toolId ? (TOOL_CREDITS[toolId] || []) : []), ...SITE_CREDITS]} />
    </div>
  );
};

export default ToolContainer;

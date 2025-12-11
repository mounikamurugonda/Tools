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
  headerContent?: React.ReactNode;
}

const ToolContainer: React.FC<ToolContainerProps> = ({
  title,
  children,
  details,
  toolId,
  headerContent,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentTool = toolId
    ? TOOLS.find((tool) => tool.id === toolId)
    : undefined;
  const currentToolCategory = currentTool ? currentTool.category : undefined;

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  const recommendedTools = currentToolCategory
    ? TOOLS.filter(
      (tool) => tool.category === currentToolCategory && tool.id !== toolId,
    )
    : [];

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          {headerContent}
          {toolId && <ShareButton toolId={toolId} title={title} />}
        </div>
      </div>

      {/* Main Tool Area */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in-up relative z-20">
        {children}
      </div>

      {/* Tags */}
      {currentTool?.tags && currentTool.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 animate-fade-in delay-200">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Tags:
          </span>
          {currentTool.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase()}`}
              className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-50 rounded-full dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:scale-105 transition-all duration-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Recommended Tools */}
      {recommendedTools.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 animate-fade-in delay-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              More {currentToolCategory}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => scroll(-300)}
                className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => scroll(300)}
                className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x"
          >
            {recommendedTools.map((tool) => (
              <div key={tool.id} className="flex-none w-72 snap-start">
                <Link href={`/tools/${tool.id}`} className="block h-full">
                  <ToolCard tool={tool as unknown as Tool} isCompact />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description & Credits */}
      <div className="animate-fade-in delay-500">
        <ToolDescription details={details} />
        <ToolCredits
          items={[...(toolId ? TOOL_CREDITS[toolId] || [] : []), ...SITE_CREDITS]}
        />
      </div>
    </div>
  );
};

export default ToolContainer;
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOOLS } from '@/constants';
import { ToolCategory } from '@/types';

const Sidebar = () => {
  const pathname = usePathname();
  const [openCategory, setOpenCategory] = useState<ToolCategory | null>(null);

  React.useEffect(() => {
    if (pathname) {
      const toolId = pathname.split('/').pop();
      const tool = TOOLS.find((t) => t.id === toolId);
      if (tool) {
        setOpenCategory(tool.category);
      }
    }
  }, [pathname]);

  // Group tools by category
  const toolsByCategory = TOOLS.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<ToolCategory, typeof TOOLS>);

  const categories = Object.keys(toolsByCategory) as ToolCategory[];

  const toggleCategory = (category: ToolCategory) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 h-[calc(100vh-64px)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-16">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Tool Categories
        </h2>
        <nav className="space-y-1">
          {categories.map((category) => (
            <div key={category}>
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {/* Icons could be added here based on category */}
                  {category}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${openCategory === category ? 'transform rotate-180' : ''
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expandable list */}
              {openCategory === category && (
                <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-2">
                  {toolsByCategory[category].map((tool) => {
                    const isActive = pathname === `/tools/${tool.id}`;
                    return (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.id}`}
                        className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${isActive
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          }`}
                      >
                        {tool.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
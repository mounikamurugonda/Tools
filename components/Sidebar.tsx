'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOOLS, CATEGORY_ICONS } from '@/constants';
import { ToolCategory } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const [openCategory, setOpenCategory] = useState<ToolCategory | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed to match layout padding

  React.useEffect(() => {
    if (pathname) {
      const toolId = pathname.split('/').pop();
      const tool = TOOLS.find(t => t.id === toolId);
      if (tool) {
        setOpenCategory(tool.category);
      }
    }
  }, [pathname]);

  // Bounce animation: Start collapsed, expand briefly to show users, then collapse back
  useEffect(() => {
    // Expand immediately
    const expandTimer = setTimeout(() => {
      setIsCollapsed(false);
    }, 100);

    // Then collapse after showing
    const collapseTimer = setTimeout(() => {
      setIsCollapsed(true);
    }, 1600);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(collapseTimer);
    };
  }, []);

  // Group tools by category
  const toolsByCategory = TOOLS.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = [];
      }
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<ToolCategory, typeof TOOLS>
  );

  const categories = Object.keys(toolsByCategory) as ToolCategory[];

  const toggleCategory = (category: ToolCategory) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <aside
      data-lenis-prevent
      className={`hidden lg:flex flex-col bottom-0 overflow-y-auto overscroll-y-contain border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 fixed left-0 top-20 z-40 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isCollapsed ? 'w-20' : 'w-64'
        }`}
    >
      <div className="py-6 px-3">
        {/* Header with title and toggle */}
        <div className="flex items-center justify-between px-3 mb-4">
          <h2
            className={`text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
              }`}
          >
            Tool Categories
          </h2>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors flex-shrink-0"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        <nav className="space-y-1">
          {categories.map(category => {
            const CategoryIcon = CATEGORY_ICONS[category];
            const isOpen = openCategory === category;

            return (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-lg transition-all ${isOpen
                    ? 'text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  title={isCollapsed ? category : undefined}
                >
                  <span className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center w-full' : ''}`}>
                    {CategoryIcon && <CategoryIcon className="w-4 h-4 flex-shrink-0" />}
                    <span
                      className={`text-sm font-medium transition-all duration-300 ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'opacity-100'
                        }`}
                    >
                      {category}
                    </span>
                  </span>
                  {!isCollapsed && (
                    <svg
                      className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {isOpen && (
                  <div className="mt-1 ml-1 space-y-0.5">
                    {toolsByCategory[category].map(tool => {
                      const isActive = pathname === `/tools/${tool.id}`;
                      return (
                        <Link
                          key={tool.id}
                          href={`/tools/${tool.id}`}
                          className={`group flex items-center gap-2.5 px-3 py-1.5 text-sm rounded-lg transition-all ${isActive
                            ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                          title={isCollapsed ? tool.name : undefined}
                        >
                          <div
                            className={`flex-shrink-0 w-4 h-4 flex items-center justify-center ${isActive
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                              }`}
                          >
                            {tool.icon}
                          </div>
                          <span
                            className={`truncate text-sm transition-all duration-300 ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'opacity-100'
                              }`}
                          >
                            {tool.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOOLS, CATEGORY_ICONS } from '@/constants';
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
    <aside data-lenis-prevent className="hidden lg:flex flex-col w-64 bottom-0 overflow-y-auto overscroll-y-contain border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 fixed left-0 top-20 z-40">
      <div className="py-6 px-3">
        <h2 className="px-3 mb-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          Tool Categories
        </h2>
        <nav className="space-y-1">
          {categories.map((category) => {
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
                >
                  <span className="flex items-center gap-2.5">
                    {CategoryIcon && <CategoryIcon className="w-4 h-4 flex-shrink-0" />}
                    <span className="text-sm font-medium">{category}</span>
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="mt-1 ml-1 space-y-0.5">
                    {toolsByCategory[category].map((tool) => {
                      const isActive = pathname === `/tools/${tool.id}`;
                      return (
                        <Link
                          key={tool.id}
                          href={`/tools/${tool.id}`}
                          className={`group flex items-center gap-2.5 px-3 py-1.5 text-sm rounded-lg transition-all ${isActive
                            ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                          <div className={`flex-shrink-0 w-4 h-4 flex items-center justify-center ${isActive
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                            }`}>
                            {tool.icon}
                          </div>
                          <span className="truncate text-sm">{tool.name}</span>
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
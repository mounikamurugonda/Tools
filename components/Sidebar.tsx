'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Tool } from '@/types';
import { ToolCategory } from '@/types';
import { CATEGORY_ORDER, CATEGORY_ICONS, CATEGORY_URL_MAP } from '@/constants';
import { ChevronDownIcon } from './icons';
import { TOOLS } from '@/constants';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  const params = useParams();
  const pathname = usePathname();
  const activeToolId = params?.toolId as string;
  const activeCategoryName = params?.categoryName
    ? decodeURIComponent(params.categoryName as string)
    : undefined;
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    let categoryToOpen: ToolCategory | undefined;
    if (activeToolId) {
      const tool = TOOLS.find((t) => t.id === activeToolId);
      if (tool) categoryToOpen = tool.category;
    } else if (activeCategoryName) {
      const category = CATEGORY_ORDER.find(
        (c) => c.toLowerCase() === activeCategoryName.toLowerCase(),
      );
      if (category) categoryToOpen = category;
    }

    if (categoryToOpen) {
      setOpenCategories((prevOpen) => ({
        ...prevOpen,
        [categoryToOpen!]: true,
      }));

      const categoryElement = categoryRefs.current[categoryToOpen];
      if (categoryElement) {
        setTimeout(() => {
          categoryElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 300);
      }
    }
  }, [activeToolId, activeCategoryName]);

  const filteredTools = useMemo(() => {
    // Always return all tools - sidebar should never be filtered
    return TOOLS;
  }, []);

  const groupedTools = useMemo(() => {
    return filteredTools.reduce(
      (acc, tool) => {
        (acc[tool.category] = acc[tool.category] || []).push(tool);
        return acc;
      },
      {} as Record<ToolCategory, Tool[]>,
    );
  }, [filteredTools]);

  const activeTool = useMemo(
    () => TOOLS.find((t) => t.id === activeToolId),
    [activeToolId],
  );
  const currentActiveCategory = activeTool
    ? activeTool.category
    : activeCategoryName;

  return (
    <aside className="hidden bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 md:block w-full md:w-72 flex-shrink-0 h-[calc(100vh-81px)] overflow-y-auto sidebar-scroll border-r border-gray-200 dark:border-gray-700">
      <div className="sticky top-0 p-4 space-y-2">
        {CATEGORY_ORDER.map((category) => {
          const categoryTools = groupedTools[category];
          if (!categoryTools || categoryTools.length === 0) return null;

          const CategoryIcon = CATEGORY_ICONS[category];
          const isOpen = openCategories[category];
          const isCurrentCategoryActive =
            currentActiveCategory?.toLowerCase() === category.toLowerCase();

          return (
            <div
              key={category}
              ref={(el) => {
                categoryRefs.current[category] = el;
              }}
              className="group"
            >
              <div
                className={`w-full flex items-center justify-between text-left p-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  isCurrentCategoryActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <Link
                  href={`/tools/category/${CATEGORY_URL_MAP[category]}`}
                  className="flex items-center grow"
                >
                  {CategoryIcon && (
                    <CategoryIcon 
                      className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors ${
                        isCurrentCategoryActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 group-hover:text-blue-500'
                      }`} 
                    />
                  )}
                  <span className="leading-none">{category}</span>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenCategories((prev) => ({
                      ...prev,
                      [category]: !prev[category],
                    }));
                  }}
                  className={`p-1 rounded-full transition-all duration-200 ${
                    isOpen 
                      ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200' 
                      : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
              
              {/* Smooth Collapsible Content */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[2000px] opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'
                }`}
              >
                <div className="space-y-0.5 pl-3 border-l-2 border-gray-100 dark:border-gray-700 ml-3.5 mb-2">
                  {categoryTools.map((tool) => {
                    const isActive = activeToolId === tool.id;
                    return (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.id}`}
                        className={`group/link flex items-center w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-600 text-white font-medium shadow-sm translate-x-1'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white hover:translate-x-1'
                        }`}
                      >
                        <span
                          className={`mr-3 flex-shrink-0 inline-flex items-center justify-center w-4 h-4 transition-colors ${
                            isActive ? 'text-white' : 'text-gray-400 group-hover/link:text-blue-500'
                          }`}
                        >
                          {React.cloneElement(tool.icon as React.ReactElement<{ className?: string }>, { className: "w-full h-full" })}
                        </span>
                        <span className="truncate leading-none">
                          {tool.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
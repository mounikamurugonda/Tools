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
    const activeCategoryName = params?.categoryName ? decodeURIComponent(params.categoryName as string) : undefined;
    const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    useEffect(() => {
        let categoryToOpen: ToolCategory | undefined;
        if (activeToolId) {
            const tool = TOOLS.find(t => t.id === activeToolId);
            if (tool) categoryToOpen = tool.category;
        } else if (activeCategoryName) {
            const category = CATEGORY_ORDER.find(c => c.toLowerCase() === activeCategoryName.toLowerCase());
            if (category) categoryToOpen = category;
        }

        if (categoryToOpen) {
            setOpenCategories(prevOpen => ({ ...prevOpen, [categoryToOpen!]: true }));
            
            const categoryElement = categoryRefs.current[categoryToOpen];
            if (categoryElement) {
                setTimeout(() => {
                    categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [activeToolId, activeCategoryName]);

    const filteredTools = useMemo(() => {
        // Always return all tools - sidebar should never be filtered
        return TOOLS;
    }, []);

    const groupedTools = useMemo(() => {
        return filteredTools.reduce((acc, tool) => {
            (acc[tool.category] = acc[tool.category] || []).push(tool);
            return acc;
        }, {} as Record<ToolCategory, Tool[]>);
    }, [filteredTools]);
    
    const activeTool = useMemo(() => TOOLS.find(t => t.id === activeToolId), [activeToolId]);
    const currentActiveCategory = activeTool ? activeTool.category : activeCategoryName;

    return (
        <aside className="hidden bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 md:block w-full md:w-72 flex-shrink-0 h-[calc(100vh-81px)] overflow-y-auto sidebar-scroll brand-fade-in">
            <div className="sticky top-2">
                <nav className="space-y-1 px-4 py-2">
                    {CATEGORY_ORDER.map(category => {
                        const categoryTools = groupedTools[category];
                        if (!categoryTools || categoryTools.length === 0) return null;

                        const CategoryIcon = CATEGORY_ICONS[category];
                        const isOpen = openCategories[category];
                        const isCurrentCategoryActive = currentActiveCategory?.toLowerCase() === category.toLowerCase();

                        return (
                            <div key={category} ref={el => { categoryRefs.current[category] = el; }}>
                                <div className={`w-full flex items-center justify-between text-left p-2 rounded-lg ${isCurrentCategoryActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                                    <Link href={`/tools/category/${CATEGORY_URL_MAP[category]}`} className="flex items-center grow text-gray-700 dark:text-gray-300 font-semibold">
                                        {CategoryIcon && <CategoryIcon className="w-5 h-5 mr-2 flex-shrink-0" />}
                                        <span className="leading-none">{category}</span>
                                    </Link>
                                    <button
                                        onClick={() => setOpenCategories(prev => ({...prev, [category]: !prev[category]}))}
                                        className="p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>
                                {isOpen && (
                                    <div className="mt-1 space-y-1 pl-2 border-l-2 border-gray-200 dark:border-gray-700 ml-3 animate-fade-in">
                                        {categoryTools.map(tool => {
                                            const isActive = activeToolId === tool.id;
                                            return (
                                                <Link
                                                    key={tool.id}
                                                    href={`/tools/${tool.id}`}
                                                    className={`group flex items-center w-full text-left px-3 py-1.5 text-sm rounded-md transition-all ${
                                                        isActive
                                                            ? 'bg-blue-600 text-white font-semibold shadow-sm'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:-translate-x-0.5'
                                                    }`}
                                                >
                                                    <span className={`mr-3 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 ${isActive ? 'text-white' : 'text-blue-500/70 dark:text-blue-400/70 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors'}`}>
                                                        {tool.icon}
                                                    </span>
                                                    <span className="truncate leading-none">{tool.name}</span>
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
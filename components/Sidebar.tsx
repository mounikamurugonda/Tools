'use client';

import React, { useState, useMemo, useEffect, useRef, cloneElement, isValidElement } from 'react';
import type { Tool } from '@/types';
import { ToolCategory } from '@/types';
import { CATEGORY_ORDER, CATEGORY_ICONS } from '@/constants';
import { ChevronDownIcon } from './icons';
import { TOOLS } from '@/constants';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Sidebar: React.FC = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const activeToolId = params?.toolId as string;
    const activeCategoryName = params?.categoryName ? decodeURIComponent(params.categoryName as string) : undefined;
    const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setSearchTerm(searchParams?.get('search') || '');
    }, [searchParams]);

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
        const query = searchTerm.toLowerCase().trim();
        if (!query) return TOOLS;
        return TOOLS.filter(tool =>
            tool.name.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query)
        );
    }, [searchTerm]);

    const groupedTools = useMemo(() => {
        return filteredTools.reduce((acc, tool) => {
            (acc[tool.category] = acc[tool.category] || []).push(tool);
            return acc;
        }, {} as Record<ToolCategory, Tool[]>);
    }, [filteredTools]);
    
    const activeTool = useMemo(() => TOOLS.find(t => t.id === activeToolId), [activeToolId]);
    const currentActiveCategory = activeTool ? activeTool.category : activeCategoryName;

    return (
        <aside className="w-full md:w-[20%] bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-4">
                <nav className="space-y-4">
                    {CATEGORY_ORDER.map(category => {
                        const categoryTools = groupedTools[category];
                        if (!categoryTools || categoryTools.length === 0) return null;

                        const CategoryIcon = CATEGORY_ICONS[category];
                        const isOpen = openCategories[category];
                        const isCurrentCategoryActive = currentActiveCategory?.toLowerCase() === category.toLowerCase();

                        return (
                            <div key={category} ref={el => { categoryRefs.current[category] = el; }}>
                                <div className={`w-full flex items-center justify-between text-left px-2 py-2 text-sm font-semibold rounded ${isCurrentCategoryActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                                    <Link href={`/tools/category/${encodeURIComponent(category)}`} className="flex items-center grow text-gray-700 dark:text-gray-300">
                                        {CategoryIcon && <CategoryIcon />}
                                        <span>{category}</span>
                                    </Link>
                                    <button
                                        onClick={() => setOpenCategories(prev => ({...prev, [category]: !prev[category]}))}
                                        className="p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>
                                {isOpen && (
                                    <div className="mt-2 space-y-1 pl-4">
                                        {categoryTools.map(tool => {
                                            const isActive = activeToolId === tool.id;
                                            return (
                                                <Link
                                                    key={tool.id}
                                                    href={`/tools/${tool.id}`}
                                                    className={`flex items-center w-full text-left px-4 py-2 text-sm rounded transition-colors ${
                                                        isActive
                                                            ? 'bg-blue-600 text-white font-semibold'
                                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                                    }`}
                                                >
                                                    {isValidElement(tool.icon) && cloneElement(tool.icon as React.ReactElement, { className: 'w-5 h-5 mr-3 flex-shrink-0' })}
                                                    <span className="truncate">{tool.name}</span>
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
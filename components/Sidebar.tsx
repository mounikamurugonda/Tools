
'use client';

import React, { useState, useMemo } from 'react';
import type { Tool } from '../types';
import { ToolCategory } from '../types';
import { CATEGORY_ORDER, CATEGORY_ICONS } from './HomePageClient';
import { ChevronDownIcon } from './icons';
import { TOOLS } from '@/constants';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface SidebarProps {
    // Props for legacy SPA mode
    activeToolId?: string;
    onSelectTool?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeToolId: activeToolIdFromProps, onSelectTool }) => {
    const params = useParams();
    const isSpaMode = typeof onSelectTool === 'function';

    // Determine active tool ID based on mode
    const activeToolId = isSpaMode ? activeToolIdFromProps : (params?.toolId as string);

    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
        const initialState: Record<string, boolean> = {};
        const activeTool = TOOLS.find(t => t.id === activeToolId);
        CATEGORY_ORDER.forEach(cat => {
            initialState[cat] = cat === activeTool?.category;
        });
        return initialState;
    });

    const toggleCategory = (category: ToolCategory) => {
        setOpenCategories(prev => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const groupedTools = useMemo(() => {
        return TOOLS.reduce((acc, tool) => {
            (acc[tool.category] = acc[tool.category] || []).push(tool);
            return acc;
        }, {} as Record<ToolCategory, Tool[]>);
    }, []);
    
    return (
        <aside className="w-full md:w-72 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="p-4 h-full overflow-y-auto">
                <nav className="space-y-4">
                    {CATEGORY_ORDER.map(category => {
                        const categoryTools = groupedTools[category];
                        if (!categoryTools || categoryTools.length === 0) return null;

                        const CategoryIcon = CATEGORY_ICONS[category];
                        const isOpen = openCategories[category];

                        return (
                            <div key={category}>
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className="w-full flex items-center justify-between text-left px-2 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <div className="flex items-center">
                                        {CategoryIcon && <CategoryIcon />}
                                        <span>{category}</span>
                                    </div>
                                    <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isOpen && (
                                    <div className="mt-2 space-y-1 pl-4">
                                        {categoryTools.map(tool => {
                                            const isActive = activeToolId === tool.id;
                                            const className = `block w-full text-left px-4 py-2 text-sm rounded transition-colors ${
                                                isActive
                                                    ? 'bg-blue-600 text-white font-semibold'
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                            }`;

                                            return isSpaMode ? (
                                                <button
                                                    key={tool.id}
                                                    onClick={() => onSelectTool(tool.id)}
                                                    className={className}
                                                >
                                                    {tool.name}
                                                </button>
                                            ) : (
                                                <Link
                                                    key={tool.id}
                                                    href={`/tools/${tool.id}`}
                                                    className={className}
                                                >
                                                    {tool.name}
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

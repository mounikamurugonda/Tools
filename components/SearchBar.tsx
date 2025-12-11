'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TOOLS } from '../constants';
import type { Tool } from '../types';
import { trackSearch, trackToolUsage } from '@/lib/analytics';
import { SearchIcon } from './icons';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Filter tools based on search query
    const filteredTools = useMemo(() => {
        if (!searchQuery.trim()) return [];

        return TOOLS.filter(
            (tool) =>
                tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 8); // Limit to 8 suggestions
    }, [searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        setShowSuggestions(query.trim().length > 0);
        setSelectedIndex(-1);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            trackSearch(searchQuery.trim(), filteredTools.length);
            router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (tool: Tool) => {
        trackToolUsage(tool.name);
        router.push(`/tools/${tool.id}`);
        setSearchQuery(''); // Clear on selection
        setShowSuggestions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions || filteredTools.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < filteredTools.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : filteredTools.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < filteredTools.length) {
                    handleSuggestionClick(filteredTools[selectedIndex]);
                } else if (searchQuery.trim()) {
                    handleSearchSubmit(e);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node) &&
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full max-w-xl mx-auto hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative group">
                <div className="relative transform transition-transform duration-300">
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search tools..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <SearchIcon className="w-4 h-4" />
                    </div>
                </div>

                {/* Search Suggestions Dropdown */}
                {showSuggestions && filteredTools.length > 0 && (
                    <div
                        ref={suggestionsRef}
                        className="absolute top-full left-0 right-0 mt-2 brand-card z-[9998] max-h-[80vh] overflow-y-auto animate-fade-in-up shadow-2xl border-gray-100 dark:border-gray-800"
                    >
                        {filteredTools.map((tool, index) => (
                            <div
                                key={tool.id}
                                onClick={() => handleSuggestionClick(tool)}
                                className={`px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ${index === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-accent p-1.5">
                                        {tool.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                            {tool.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                                            {tool.description}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className="brand-badge-secondary !text-[10px] !px-2">
                                            {tool.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Show all results link */}
                        <div className="p-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                            <button
                                type="button"
                                onClick={() => {
                                    router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
                                    setShowSuggestions(false);
                                }}
                                className="w-full text-center text-xs font-medium text-blue-600 dark:text-blue-400 py-1.5 hover:underline rounded-lg transition-colors"
                            >
                                View all results
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;

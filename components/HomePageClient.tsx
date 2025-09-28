

'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TOOLS } from '../constants';
import ToolCard from './ToolCard';
import type { Tool } from '../types';
import { ToolCategory } from '../types';
import { trackSearch, trackToolUsage } from '@/lib/analytics';
import MostViewedTools from './MostViewedTools';
import Logo from './Logo';
import { 
    SearchIcon,
    ChevronRightIcon,
} from './icons';
import Link from 'next/link';
import { CATEGORY_ORDER, CATEGORY_ICONS, CATEGORY_DESCRIPTIONS, CATEGORY_URL_MAP } from '@/constants';
import { HomepageAd, InlineAd } from './AdContainer';

const HomePageClient: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const toolCount = TOOLS.length;

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return TOOLS.filter(tool => 
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
    setSearchQuery(tool.name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredTools.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredTools.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
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
  
  const featuredTools = useMemo(() => TOOLS.filter(tool => tool.featured), []);
  const visibleCategories = useMemo(() => CATEGORY_ORDER.slice(0, 6), []);

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-block">
          <Logo size={80} />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">UtilToolkits</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Your one-stop collection of free, browser-based utilities. All tools run locally for maximum speed and privacy.
        </p>
        
        <div className="mt-8 max-w-xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative">
              <input
                ref={searchRef}
                type="text"
                placeholder={`Search from ${toolCount} tools... (e.g., "JSON Formatter")`}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white dark:bg-gray-800 text-lg"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoComplete="off"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <SearchIcon className="text-gray-400" />
              </div>
            </div>
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && filteredTools.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
              >
                {filteredTools.map((tool, index) => (
                  <div
                    key={tool.id}
                    onClick={() => handleSuggestionClick(tool)}
                    className={`px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      index === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {React.cloneElement(tool.icon as React.ReactElement, {
                          className: "w-6 h-6 text-blue-500"
                        })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {tool.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {tool.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {tool.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Show all results link */}
                <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <button
                    type="button"
                    onClick={() => {
                      router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    View all results for &quot;{searchQuery}&quot;
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* Most Viewed Tools Section */}
      <MostViewedTools />

      {/* Ad Container */}
      <HomepageAd key="homepage-ad" />

      {/* Featured Tools Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-wide mb-6">Featured Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.id}`} className="block">
              <ToolCard tool={tool} />
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-wide">Categories</h2>
          <Link href="/tools" className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
            View All Tools <ChevronRightIcon className="w-5 h-5 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCategories.map(category => {
            const CategoryIcon = CATEGORY_ICONS[category];
            const toolCount = TOOLS.filter(t => t.category === category).length;
            const description = CATEGORY_DESCRIPTIONS[category];
            return (
              <Link
                key={category}
                href={`/tools/category/${CATEGORY_URL_MAP[category]}`}
                className="group flex flex-col justify-between p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div>
                  <div className="flex items-center">
                    {CategoryIcon && <CategoryIcon />}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{toolCount} tools</p>
                </div>
                <div className="mt-4 text-blue-500 dark:text-blue-400 font-semibold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Go to {category} <ChevronRightIcon className="w-5 h-5 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom Ad Container */}
      <InlineAd />
    </main>
  );
};

export default HomePageClient;


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
    <main className="brand-container brand-section">
      <div className="brand-fade-in">
        <div className="text-center mb-16">
          <div className="inline-block brand-scale-hover">
            <Logo size={80} />
          </div>
          <h1 className="brand-heading-1 mt-6">
            Welcome to <span className="brand-gradient-text">UtilToolkits</span>
          </h1>
          <p className="brand-subheading mt-6 max-w-3xl mx-auto">
            Your one-stop collection of free, browser-based utilities. All tools run locally for maximum speed and privacy.
          </p>
          
          <div className="mt-10 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder={`Search from ${toolCount} tools... (e.g., "JSON Formatter")`}
                  className="brand-input-xl w-full pl-14"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  autoComplete="off"
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2">
                  <SearchIcon className="text-gray-400 w-6 h-6" />
                </div>
              </div>
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && filteredTools.length > 0 && (
                <div
                  ref={suggestionsRef}
                   className="absolute top-full left-0 right-0 mt-2 brand-card z-[9998] max-h-96 overflow-y-auto"
                >
                  {filteredTools.map((tool, index) => (
                    <div
                      key={tool.id}
                      onClick={() => handleSuggestionClick(tool)}
                      className={`px-4 py-3 cursor-pointer brand-border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                        index === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 text-blue-500">
                          {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {tool.name}
                          </p>
                          <p className="brand-text-muted text-sm truncate mt-1">
                            {tool.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="brand-badge-secondary">
                            {tool.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Show all results link */}
                  <div className="p-2 border-t brand-border-t bg-gray-50 dark:bg-gray-700/50">
                    <button
                      type="button"
                      onClick={() => {
                        router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-center brand-button-tertiary"
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
        <section className="mb-12">
          <h2 className="brand-heading-2 mb-6">Featured Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`} className="block brand-scale-hover">
                <ToolCard tool={tool} />
              </Link>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="brand-heading-2">Categories</h2>
            <Link 
              href="/tools" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center"
            >
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
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 h-full"
                >
                  <div className="flex items-start gap-4 text-left">
                    {CategoryIcon && <CategoryIcon className="w-8 h-8 text-blue-500" />}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category}</h3>
                      <p className="mt-2 text-base text-gray-700 dark:text-gray-300 line-clamp-3 min-h-[4.5rem]">{description}</p>
                      <div className="mt-3">
                        <span className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">Read more</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Bottom Ad Container */}
        <InlineAd />
      </div>
    </main>
  );
};

export default HomePageClient;
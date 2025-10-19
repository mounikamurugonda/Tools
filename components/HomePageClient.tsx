

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
            Discover the ultimate collection of <strong>50+ free online developer tools</strong> that work directly in your browser. From JSON formatters and Base64 converters to image tools and text utilities - everything you need to boost your productivity, all running locally for <strong>maximum speed and privacy</strong>. No downloads, no registration, just powerful tools at your fingertips.
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

        {/* Why Choose UtilToolkits Section */}
        <section className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="brand-heading-2 mb-4">Why Developers Love UtilToolkits</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of developers who trust UtilToolkits for their daily workflow. Our tools are designed by developers, for developers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">100% Private</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">All processing happens in your browser. Your data never leaves your device.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">No server delays. Instant results with client-side processing.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Always Free</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">No hidden costs, no premium tiers. All tools are completely free.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No Registration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Start using tools immediately. No accounts or sign-ups required.</p>
            </div>
          </div>
        </section>

        {/* Featured Tools Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="brand-heading-2 mb-4">Most Popular Developer Tools</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These are the tools our community uses most frequently. From JSON formatting to password generation, these utilities will supercharge your development workflow.
            </p>
          </div>
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
          <div className="text-center mb-8">
            <h2 className="brand-heading-2 mb-4">Explore by Category</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Organize your workflow with our carefully curated tool categories. Whether you're working with text, images, code, or data - we've got you covered.
            </p>
            <Link 
              href="/tools" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              View All {toolCount} Tools <ChevronRightIcon className="w-5 h-5 ml-1" />
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
                      <p className="mt-2 text-base text-gray-700 dark:text-gray-300 line-clamp-3">{description}</p>
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

        
      </div>
    </main>
  );
};

export default HomePageClient;
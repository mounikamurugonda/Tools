'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TOOLS } from '../constants';
import ToolCard from './ToolCard';
import CategoryCard from './CategoryCard';
import type { Tool } from '../types';
import { trackSearch, trackToolUsage } from '@/lib/analytics';
import MostViewedTools from './MostViewedTools';
import { SearchIcon, ChevronRightIcon } from './icons';
import Link from 'next/link';
import {
  CATEGORY_ORDER,
  CATEGORY_ICONS,
  CATEGORY_DESCRIPTIONS,
  CATEGORY_URL_MAP,
} from '@/constants';

const HomePageClient: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const toolCount = TOOLS.length;

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase()),
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
        setSelectedIndex((prev) =>
          prev < filteredTools.length - 1 ? prev + 1 : 0,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredTools.length - 1,
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

  const featuredTools = useMemo(
    () => TOOLS.filter((tool) => tool.featured),
    [],
  );
  const visibleCategories = useMemo(() => CATEGORY_ORDER.slice(0, 6), []);

  return (
    <main className="brand-container brand-section">
      <div className="animate-fade-in">
        <div className="text-center mb-24 relative">
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow pointer-events-none" />
          
          <h1 className="brand-heading-1 mt-6 animate-slide-in-right">
            Welcome to <span className="brand-gradient-text">UtilToolkits</span>
          </h1>
          <p className="brand-subheading mt-6 max-w-3xl mx-auto animate-slide-in-left delay-100">
            The ultimate collection of{' '}
            <strong>{toolCount}+ free online developer tools</strong>.
          </p>
          
          <div className="mt-12 max-w-2xl mx-auto animate-fade-in-up delay-200">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <div className="relative transform transition-transform duration-300 group-focus-within:scale-105">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder={`Search for a tool... (e.g., "JSON Formatter")`}
                  className="brand-input-xl w-full pl-14 shadow-xl border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-transform duration-300 group-focus-within:scale-110 group-focus-within:text-blue-500">
                  <SearchIcon className="text-gray-400 w-6 h-6" />
                </div>
              </div>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && filteredTools.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 mt-3 brand-card z-[9998] max-h-96 overflow-y-auto animate-fade-in-up shadow-2xl border-gray-100 dark:border-gray-800"
                >
                  {filteredTools.map((tool, index) => (
                    <div
                      key={tool.id}
                      onClick={() => handleSuggestionClick(tool)}
                      className={`px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ${
                        index === selectedIndex
                          ? 'bg-blue-50 dark:bg-blue-900/30'
                          : ''
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-accent">
                          {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {tool.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
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
                  <div className="p-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                    <button
                      type="button"
                      onClick={() => {
                        router.push(
                          `/tools?search=${encodeURIComponent(searchQuery.trim())}`,
                        );
                        setShowSuggestions(false);
                      }}
                      className="w-full text-center brand-button-tertiary py-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors"
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
        <div className="animate-fade-in delay-300">
          <MostViewedTools />
        </div>

        {/* Why Choose UtilToolkits Section */}
        <section className="my-24 animate-fade-in delay-400">
          <div className="text-center mb-12">
            <h2 className="brand-heading-2 mb-4">
              Why Developers Love UtilToolkits
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              Join thousands of developers who trust UtilToolkits for their
              daily workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '100% Private', desc: 'All processing happens in your browser. Your data never leaves your device.' },
              { title: 'Lightning Fast', desc: 'No server delays. Instant results with client-side processing.' },
              { title: 'Always Free', desc: 'No hidden costs, no premium tiers. All tools are completely free.' },
              { title: 'No Registration', desc: 'Start using tools immediately. No accounts or sign-ups required.' },
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="text-center p-8 rounded-2xl brand-card hover:-translate-y-2 transition-transform duration-300"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Tools Section */}
        <section className="my-24">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="brand-heading-2 mb-4">Most Popular Tools</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              These are the tools our community uses most frequently.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredTools.map((tool, index) => (
              <div 
                key={tool.id} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link
                  href={`/tools/${tool.id}`}
                  className="block h-full"
                >
                  <ToolCard tool={tool} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="my-24">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="brand-heading-2 mb-4">Explore by Category</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Find the right tool for the job by browsing our categories.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-all hover:gap-2 group"
            >
              View All {toolCount} Tools{' '}
              <ChevronRightIcon className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {visibleCategories.map((category, index) => {
              const CategoryIcon = CATEGORY_ICONS[category];
              const description = CATEGORY_DESCRIPTIONS[category];
              const tool = {
                id: CATEGORY_URL_MAP[category],
                name: category,
                description: description,
                icon: <CategoryIcon className="w-8 h-8 text-blue-500" />,
                category: 'Category',
              } as Tool;

              return (
                <div
                  key={category}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link
                    href={`/tools/category/${CATEGORY_URL_MAP[category]}`}
                    className="block h-full"
                  >
                    <ToolCard tool={tool} />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePageClient;
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TOOLS } from '../constants';
import ToolCard from './ToolCard';
import type { Tool } from '../types';
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
        <div className="text-center mb-24">
          <h1 className="brand-heading-1 mt-6">
            Welcome to <span className="brand-gradient-text">UtilToolkits</span>
          </h1>
          <p className="brand-subheading mt-6 max-w-3xl mx-auto">
            The ultimate collection of <strong>{toolCount}+ free online developer tools</strong>.
          </p>
          <div className="mt-12 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder={`Search for a tool... (e.g., "JSON Formatter")`}
                  className="brand-input-xl w-full pl-14"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
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
                        <div className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 text-accent">
                          {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-light-text dark:text-dark-text truncate">
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
        <section className="my-24">
          <div className="text-center mb-12">
            <h2 className="brand-heading-2 mb-4">Why Developers Love UtilToolkits</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Join thousands of developers who trust UtilToolkits for their daily workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl brand-card">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2 text-lg">100% Private</h3>
              <p className="text-sm text-gray-400">All processing happens in your browser. Your data never leaves your device.</p>
            </div>
            <div className="text-center p-8 rounded-2xl brand-card">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2 text-lg">Lightning Fast</h3>
              <p className="text-sm text-gray-400">No server delays. Instant results with client-side processing.</p>
            </div>
            <div className="text-center p-8 rounded-2xl brand-card">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2 text-lg">Always Free</h3>
              <p className="text-sm text-gray-400">No hidden costs, no premium tiers. All tools are completely free.</p>
            </div>
            <div className="text-center p-8 rounded-2xl brand-card">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2 text-lg">No Registration</h3>
              <p className="text-sm text-gray-400">Start using tools immediately. No accounts or sign-ups required.</p>
            </div>
          </div>
        </section>

        {/* Featured Tools Section */}
        <section className="my-24">
          <div className="text-center mb-12">
            <h2 className="brand-heading-2 mb-4">Most Popular Tools</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              These are the tools our community uses most frequently.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredTools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`} className="block brand-scale-hover">
                <ToolCard tool={tool} />
              </Link>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="my-24">
          <div className="text-center mb-12">
            <h2 className="brand-heading-2 mb-4">Explore by Category</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              Find the right tool for the job by browsing our categories.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center text-accent hover:text-accent-hover font-medium"
            >
              View All {toolCount} Tools <ChevronRightIcon className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleCategories.map(category => {
              const CategoryIcon = CATEGORY_ICONS[category];
              const description = CATEGORY_DESCRIPTIONS[category];
              return (
                <Link
                  key={category}
                  href={`/tools/category/${CATEGORY_URL_MAP[category]}`}
                  className="group block brand-scale-hover"
                >
                    <div className="brand-card p-6 h-full">
                        <div className="flex items-start gap-4 text-left">
                        {CategoryIcon && <CategoryIcon className="w-8 h-8 text-accent" />}
                        <div className="min-w-0 flex-1">
                            <h3 className="text-xl font-bold text-light-text dark:text-dark-text">{category}</h3>
                            <p className="mt-2 text-base text-gray-400 line-clamp-3">{description}</p>
                            <div className="mt-3">
                                <span className="inline-block text-sm font-semibold text-accent hover:underline">View Tools</span>
                            </div>
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
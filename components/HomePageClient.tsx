

'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TOOLS } from '../constants';
import ToolCard from './ToolCard';
import type { Tool } from '../types';
import { ToolCategory } from '../types';
import Logo from './Logo';
import { 
    SearchIcon,
    ChevronRightIcon,
} from './icons';
import Link from 'next/link';
import { CATEGORY_ORDER, CATEGORY_ICONS, CATEGORY_DESCRIPTIONS } from '@/constants';

const HomePageClient: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const toolCount = TOOLS.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      router.push(`/tools?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/`);
    }
  };
  
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
          <div className="relative">
            <input
              type="text"
              placeholder={`Search from ${toolCount} tools... (e.g., "JSON Formatter")`}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white dark:bg-gray-800 text-lg"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <SearchIcon className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
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
                href={`/tools/category/${encodeURIComponent(category)}`}
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
    </main>
  );
};

export default HomePageClient;
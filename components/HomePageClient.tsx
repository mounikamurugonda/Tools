
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TOOLS } from '../constants';
import ToolCard from './ToolCard';
import type { Tool } from '../types';
import { ToolCategory } from '../types';
import Logo from './Logo';
import { 
    TextCategoryIcon, 
    ImageCategoryIcon, 
    CssCategoryIcon, 
    CodeCategoryIcon, 
    ColorCategoryIcon,
    MathCategoryIcon,
    ProductivityCategoryIcon,
    FunCategoryIcon,
    MiscCategoryIcon,
    SearchIcon,
} from './icons';
import Link from 'next/link';

export const CATEGORY_ORDER: ToolCategory[] = [
    ToolCategory.TEXT,
    ToolCategory.CODING,
    ToolCategory.IMAGE,
    ToolCategory.CSS,
    ToolCategory.COLOR,
    ToolCategory.MATH,
    ToolCategory.PRODUCTIVITY,
    ToolCategory.FUN,
    ToolCategory.MISC,
];

export const CATEGORY_ICONS: Record<ToolCategory, React.FC> = {
    [ToolCategory.TEXT]: TextCategoryIcon,
    [ToolCategory.CODING]: CodeCategoryIcon,
    [ToolCategory.IMAGE]: ImageCategoryIcon,
    [ToolCategory.CSS]: CssCategoryIcon,
    [ToolCategory.COLOR]: ColorCategoryIcon,
    [ToolCategory.MATH]: MathCategoryIcon,
    [ToolCategory.PRODUCTIVITY]: ProductivityCategoryIcon,
    [ToolCategory.FUN]: FunCategoryIcon,
    [ToolCategory.MISC]: MiscCategoryIcon,
};


const HomePageClient: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const categoryToScroll = searchParams.get('category');
    if (categoryToScroll && categoryRefs.current[categoryToScroll]) {
        const headerOffset = 70; // Height of the sticky header
        const elementPosition = categoryRefs.current[categoryToScroll]!.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        // Clean up URL
        router.replace('/', { scroll: false });
    }
  }, [searchParams, router]);


  const filteredTools = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
        return TOOLS;
    }
    return TOOLS.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const groupedTools = useMemo(() => {
    return filteredTools.reduce((acc, tool) => {
      (acc[tool.category] = acc[tool.category] || []).push(tool);
      return acc;
    }, {} as Record<ToolCategory, Tool[]>);
  }, [filteredTools]);

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 animate-fade-in">
       <div className="text-center py-12 sm:py-16 md:py-20">
        <div className="flex justify-center text-4xl sm:text-5xl md:text-6xl tracking-tight">
          <Logo />
        </div>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          A collection of handy browser-based utilities for developers. Inspired by 10015.io.
        </p>
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search for a tool (e.g., 'json', 'color', 'base64')..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 text-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-full shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              aria-label="Search for tools"
            />
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {CATEGORY_ORDER.map((category) => {
          const tools = groupedTools[category];
          if (!tools || tools.length === 0) return null;
          
          const CategoryIcon = CATEGORY_ICONS[category];

          return (
            <section key={category} ref={el => { categoryRefs.current[category] = el; }}>
              <div className="flex items-center mb-6">
                {CategoryIcon && <CategoryIcon />}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">{category}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tools.map((tool) => (
                  <Link key={tool.id} href={`/tools/${tool.id}`} className="block">
                    <ToolCard tool={tool} />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
        {filteredTools.length === 0 && searchQuery && (
            <div className="text-center py-16">
                <p className="text-xl text-gray-500 dark:text-gray-400">No tools found for "{searchQuery}"</p>
            </div>
        )}
      </div>
    </main>
  );
};

export default HomePageClient;

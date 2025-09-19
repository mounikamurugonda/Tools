

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
  const toolCount = TOOLS.length;

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
       <div className="relative text-center py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-900"></div>
        
        <div className="flex justify-center mb-6">
            <Logo />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            The Ultimate Frontend Developer Toolbox
        </h1>
        
        <div className="mt-8">
            <div className="inline-block bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    Now with <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">{toolCount}</span> powerful tools to streamline your workflow.
                </p>
                <p className="mt-2 text-md text-gray-600 dark:text-gray-400">Fast, private, and always available.</p>
            </div>
        </div>

        <div className="mt-10 max-w-xl mx-auto">
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
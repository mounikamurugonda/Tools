'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOOLS } from '@/constants';
import { TIPS } from '@/lib/tips';
import { LightbulbIcon, FolderIcon, ChevronDownIcon } from './icons';
import ToolCard from './ToolCard';

// Helper to generate a URL-friendly slug from a string
const slugify = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, '-');
};

const TipsSidebar = () => {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {
      categories: true,
      'recommended-tools': true,
    },
  );

  // Get unique categories from TIPS
  const tipCategories = [...new Set(TIPS.map((tip) => tip.category))];

  // Hand-picking a few interesting and popular tools to recommend
  const recommendedTools = TOOLS.filter((tool) =>
    [
      'json-formatter',
      'image-to-base64',
      'password-generator',
      'pomodoro-timer',
      'case-converter',
      'color-converter',
    ].includes(tool.id),
  );

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <aside className="hidden bg-white dark:bg-gray-800 md:block w-full md:w-72 flex-shrink-0 h-[calc(100vh-81px)] overflow-y-auto sidebar-scroll brand-fade-in">
      <div className="sticky top-2">
        <nav className="space-y-1 px-4 py-2">
          {/* Tip Categories */}
          <div>
            <div className="w-full flex items-center justify-between text-left p-2 rounded-lg">
              <span className="flex items-center grow text-gray-700 dark:text-gray-300 font-semibold">
                <FolderIcon className="w-6 h-6 mr-3 text-blue-400" />
                <span>Categories</span>
              </span>
              <button
                onClick={() => toggleCategory('categories')}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${openCategories['categories'] ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
            {openCategories['categories'] && (
              <div className="mt-1 space-y-1 pl-4 border-l-2 border-gray-200 dark:border-gray-700 ml-3 animate-fade-in">
                <Link
                  href="/tips"
                  className={`group flex items-center w-full text-left px-3 py-1.5 text-sm rounded-md transition-all ${pathname === '/tips' ? 'brand-sidebar-link-active' : 'brand-sidebar-link'}`}
                >
                  All Tips
                </Link>
                {tipCategories.map((category) => {
                  const categorySlug = slugify(category);
                  const href = `/tips/category/${categorySlug}`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={category}
                      href={href}
                      className={`group flex items-center w-full text-left px-3 py-1.5 text-sm rounded-md transition-all ${isActive ? 'brand-sidebar-link-active' : 'brand-sidebar-link'}`}
                    >
                      {category}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recommended Tools */}
          <div>
            <div className="w-full flex items-center justify-between text-left p-2 rounded-lg">
              <span className="flex items-center grow text-gray-700 dark:text-gray-300 font-semibold">
                <LightbulbIcon className="w-6 h-6 mr-3 text-yellow-500" />
                <span>Recommended Tools</span>
              </span>
              <button
                onClick={() => toggleCategory('recommended-tools')}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${openCategories['recommended-tools'] ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
            {openCategories['recommended-tools'] && (
              <div className="mt-1 space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700 ml-3 animate-fade-in">
                {recommendedTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="block"
                  >
                    <ToolCard tool={tool} isCompact />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 shadow-sm border border-blue-200 dark:border-blue-700 mx-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💡 Pro Tip
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
            Bookmark your frequently used tools for quick access!
          </p>
          <Link href="/tools" className="brand-text-link text-sm">
            Browse All Tools →
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default TipsSidebar;

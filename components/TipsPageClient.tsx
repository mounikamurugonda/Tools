'use client';

import React, { useState, useMemo } from 'react';
import { TIPS } from '@/lib/tips';
import TipCard from './TipCard';

export default function TipsPageClient() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(TIPS.map((tip) => tip.category)))],
    [],
  );
  const filteredTips = useMemo(() => {
    if (selectedCategory === 'All') return TIPS;
    return TIPS.filter((tip) => tip.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip, index) => (
            <TipCard key={index} tip={tip} />
          ))}
        </div>
      </div>
    </>
  );
}

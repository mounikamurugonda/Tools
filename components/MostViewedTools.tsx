'use client';

import { useState, useEffect, useMemo } from 'react';
import { getMostViewedTools, getTrendingTools } from '@/lib/viewCount';
import { TOOLS } from '@/constants';
import ToolCard from './ToolCard';
import Link from 'next/link';

const MostViewedTools: React.FC = () => {
  const [mostViewed, setMostViewed] = useState<Array<{toolId: string, count: number}>>([]);

  useEffect(() => {
    // Try trending tools first, then fall back to most viewed
    const trending = getTrendingTools(6);
    if (trending.length > 0) {
      setMostViewed(trending);
    } else {
      const viewed = getMostViewedTools(6);
      setMostViewed(viewed);
    }
  }, []);

  // Get most viewed tools, with fallback to popular tools if no views yet
  const mostViewedTools = useMemo(() => {
    if (mostViewed.length > 0) {
      // Show actual most viewed/trending tools
      return mostViewed
        .map(({ toolId }) => TOOLS.find(tool => tool.id === toolId))
        .filter(Boolean);
    } else {
      // Fallback: Show popular tools that are not featured
      const featuredToolIds = TOOLS.filter(tool => tool.featured).map(tool => tool.id);
      return TOOLS
        .filter(tool => !featuredToolIds.includes(tool.id))
        .slice(0, 6);
    }
  }, [mostViewed]);

  if (mostViewedTools.length === 0) {
    return null;
  }

  // Determine section title based on data source
  const sectionTitle = useMemo(() => {
    if (mostViewed.length > 0) {
      const totalViews = mostViewed.reduce((sum, { count }) => sum + count, 0);
      return totalViews >= 10 ? "Trending Tools" : "Most Popular Tools";
    }
    return "Most Popular Tools";
  }, [mostViewed]);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{sectionTitle}</h2>
        <Link 
          href="/tools" 
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
        >
          View All Tools →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mostViewedTools.map((tool) => (
          <Link key={tool!.id} href={`/tools/${tool!.id}`}>
            <ToolCard tool={tool!} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostViewedTools;

"use client";

import React, { useEffect, useState } from 'react';
import type { ToolDetails } from '@/types'; // kept for prop interface compatibility
import ShareButton from './ShareButton';
import Link from 'next/link';
import { TOOLS } from '@/constants';
import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useSession } from 'next-auth/react';

interface ToolContainerProps {
  title: string;
  children: React.ReactNode;
  details?: ToolDetails; // kept for API compatibility — rendering moved to ToolLoader
  toolId?: string;
  headerContent?: React.ReactNode;
  suppressRecommendations?: boolean; // kept for API compatibility, no longer used
  variant?: 'card' | 'transparent';
}

const ToolContainer: React.FC<ToolContainerProps> = ({
  title,
  children,
  details: _details,
  toolId,
  headerContent,
  suppressRecommendations: _suppressRecommendations,
  variant = 'card',
}) => {
  const { favorites, isFavorite, toggleFavorite } = useFavoritesStore();
  const { data: session } = useSession();
  const [isFav, setIsFav] = useState(false);

  const currentTool = toolId ? TOOLS.find(tool => tool.id === toolId) : undefined;

  // Sync with favorites store - depend on favorites array so it updates when changed
  useEffect(() => {
    if (toolId) {
      setIsFav(isFavorite(toolId));
    }
  }, [toolId, favorites, isFavorite]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      alert("Please sign in to save favorites!");
      return;
    }

    if (toolId) {
      toggleFavorite(toolId);
    }
  };

  return (
    <div className="animate-fade-in space-y-2">
      {/* Header */}
      <div className="flex justify-between items-center  ">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          {headerContent}
          {toolId && (
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-lg transition-all duration-200 ${isFav
                ? 'text-red-500 '
                : 'text-gray-400'
                }`}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={20} className={isFav ? "fill-current" : ""} />
            </button>
          )}
          {toolId && <ShareButton toolId={toolId} title={title} />}
        </div>
      </div>

      {/* Main Tool Area */}
      <div className={variant === 'transparent'
        ? "animate-fade-in-up relative z-20"
        : "bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in-up relative z-20"
      }>
        {children}
      </div>

      {/* Tags */}
      {currentTool?.tags && currentTool.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 animate-fade-in delay-200">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Tags:</span>
          {currentTool.tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase()}`}
              className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-50 rounded-full dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:scale-105 transition-all duration-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}


    </div>
  );
};

export default ToolContainer;

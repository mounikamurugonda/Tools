"use client";

import React, { useEffect, useState } from 'react';
import type { Tool } from '@/types';
import { ArrowRightIcon, Heart } from 'lucide-react';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useSession } from 'next-auth/react';

interface ToolCardProps {
  tool: Tool;
  isCompact?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, isCompact = false }) => {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { data: session } = useSession();
  const [isFav, setIsFav] = useState(false);

  // Sync with store
  useEffect(() => {
    setIsFav(isFavorite(tool.id));
  }, [tool.id, isFavorite]); // Store changes trigger re-render of hook consumer

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      // Optional: prompt login? For now just do nothing or show toast (not implemented)
      alert("Please sign in to save favorites!");
      return;
    }
    toggleFavorite(tool.id);
  };


  return (
    <div className="group h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 relative overflow-hidden">
      {/* Background Gradient Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative flex flex-col h-full">
        <div className="absolute top-0 right-0 z-20">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full transition-all transform hover:scale-110 shadow-sm ${isFav
              ? 'text-red-500 bg-white/90 dark:bg-gray-800/90'
              : 'text-gray-400 bg-white/80 dark:bg-gray-800/80 hover:text-red-500'
              }`}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={20} className={isFav ? "fill-current" : ""} />
          </button>
        </div>

        <div className="flex items-start justify-between mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110   transition-all duration-300 shadow-sm">
            {tool.icon}
          </div>
          {tool.featured && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 animate-fade-in">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {tool.name}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
          {tool.description}
        </p>

        <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 transition-all duration-300">
          Try Now
          <ArrowRightIcon className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default ToolCard;

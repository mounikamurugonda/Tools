import React, { useEffect, useState } from 'react';
import type { Tool } from '@/types';
import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useSession } from 'next-auth/react';
import { FeatureGuard } from './FeatureGuard'; // Optional, or just let users click but handle auth

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
  if (isCompact) {
    return (
      <div className="group h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 pt-0.5">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              {tool.icon}
            </div>
          </div>
          <div className="min-w-0 flex-1 text-left">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tool.name}
            </h4>
            <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs line-clamp-2">
              {tool.description}
            </p>
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`p-1.5 rounded-full transition-all ${isFav
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20 opacity-100'
                : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100'
              }`}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={16} className={isFav ? "fill-current" : ""} />
          </button>
        </div>
      </div>
    );
  }

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
                : 'text-gray-400 bg-white/80 dark:bg-gray-800/80 hover:text-red-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
              }`}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={20} className={isFav ? "fill-current" : ""} />
          </button>
        </div>

        <div className="flex items-start justify-between mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
            {React.cloneElement(tool.icon as React.ReactElement<{ className?: string }>, {
              className: 'w-6 h-6 transition-transform duration-300',
            })}
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

        <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          Try Now
          <svg
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;

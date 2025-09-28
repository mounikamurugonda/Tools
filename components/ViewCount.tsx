'use client';

import { useState, useEffect } from 'react';
import { getViewCount, incrementViewCount, logViewCounts } from '@/lib/viewCount';
import { EyeIcon } from './icons';

interface ViewCountProps {
  toolId: string;
  showIcon?: boolean;
  className?: string;
}

const ViewCount: React.FC<ViewCountProps> = ({ 
  toolId, 
  showIcon = true, 
  className = '' 
}) => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize development helpers
    logViewCounts();
    
    // Get initial count without incrementing
    const initialCount = getViewCount(toolId);
    setCount(initialCount);
    setIsLoading(false);
  }, [toolId]);

  if (isLoading) {
    return (
      <div className={`flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
        {showIcon && <EyeIcon className="w-4 h-4" />}
        <span>...</span>
      </div>
    );
  }

  const formatCount = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className={`flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      {showIcon && <EyeIcon className="w-4 h-4" />}
      <span>{formatCount(count)} views</span>
    </div>
  );
};

export default ViewCount;

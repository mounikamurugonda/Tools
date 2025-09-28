'use client';

// View count tracking utility
export interface ViewCount {
  [toolId: string]: number;
}

// Get view counts from localStorage
export const getViewCounts = (): ViewCount => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem('tool_view_counts');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading view counts:', error);
    return {};
  }
};

// Increment view count for a tool
export const incrementViewCount = (toolId: string): number => {
  if (typeof window === 'undefined') return 0;
  
  try {
    const viewCounts = getViewCounts();
    const currentCount = viewCounts[toolId] || 0;
    const newCount = currentCount + 1;
    
    viewCounts[toolId] = newCount;
    localStorage.setItem('tool_view_counts', JSON.stringify(viewCounts));
    
    // Track in Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'tool_view', {
        tool_id: toolId,
        view_count: newCount,
        event_category: 'Tool Usage',
        event_label: toolId
      });
    }
    
    return newCount;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return 0;
  }
};

// Get view count for a specific tool
export const getViewCount = (toolId: string): number => {
  const viewCounts = getViewCounts();
  return viewCounts[toolId] || 0;
};

// Get most viewed tools
export const getMostViewedTools = (limit: number = 10): Array<{toolId: string, count: number}> => {
  const viewCounts = getViewCounts();
  return Object.entries(viewCounts)
    .map(([toolId, count]) => ({ toolId, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

// Reset all view counts (useful for testing)
export const resetViewCounts = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('tool_view_counts');
  } catch (error) {
    console.error('Error resetting view counts:', error);
  }
};

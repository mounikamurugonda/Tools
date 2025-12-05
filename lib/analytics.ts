// Google Analytics utility functions

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-1FR50BJ792', {
      page_path: url,
    });
  }
};

// Track search events
export const trackSearch = (searchQuery: string, resultsCount: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchQuery,
      results_count: resultsCount,
    });
  }
};

// Track tool usage
export const trackToolUsage = (toolName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tool_used', {
      tool_name: toolName,
    });
  }
};

// Track category views
export const trackCategoryView = (categoryName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'category_view', {
      category_name: categoryName,
    });
  }
};

// Track tip views
export const trackTipView = (tipTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tip_view', {
      tip_title: tipTitle,
    });
  }
};

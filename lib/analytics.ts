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

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track tool usage
export const trackToolUsage = (toolName: string) => {
  trackEvent('tool_used', 'Tools', toolName);
};

// Track search queries
export const trackSearch = (searchQuery: string, resultsCount: number) => {
  trackEvent('search', 'Search', searchQuery, resultsCount);
};

// Track category views
export const trackCategoryView = (categoryName: string) => {
  trackEvent('category_view', 'Navigation', categoryName);
};

// Track tip views
export const trackTipView = (tipCategory: string) => {
  trackEvent('tip_view', 'Tips', tipCategory);
};

// Track external link clicks
export const trackExternalLink = (url: string) => {
  trackEvent('external_link_click', 'Navigation', url);
};

// Track conversion events (e.g., tool completion)
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', 'Conversion', conversionType, value);
};

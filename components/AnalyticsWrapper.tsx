'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, trackCategoryView, trackTipView, trackToolUsage } from '@/lib/analytics';

interface AnalyticsWrapperProps {
  children: React.ReactNode;
  pageType?: 'tool' | 'category' | 'tips' | 'home' | 'other' | string;
  categoryName?: string;
  toolName?: string;
}
 
const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({ 
  children, 
  pageType = 'other',
  categoryName,
  toolName 
}) => {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    trackPageView(pathname);

    // Track specific page types
    switch (pageType) {
      case 'category':
        if (categoryName) {
          trackCategoryView(categoryName);
        }
        break;
      case 'tips':
        trackTipView('tips_page');
        break;
      case 'tool':
        if (toolName) {
          trackToolUsage(toolName);
        }
        break;
    }
  }, [pathname, pageType, categoryName, toolName]);

  return <>{children}</>;
};

export default AnalyticsWrapper;

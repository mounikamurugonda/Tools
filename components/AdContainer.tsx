'use client';

import React, { useRef, useEffect, useState } from 'react';

interface AdContainerProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  adStyle?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

const AdContainer: React.FC<AdContainerProps> = ({
  adSlot,
  adFormat = 'auto',
  adStyle = { display: 'block' },
  className = '',
  responsive = true
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isAdInitialized = useRef(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag to prevent hydration mismatch
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const initializeAd = () => {
      if (!adRef.current || isAdInitialized.current) return;

      try {
        // Check if this specific ad element already has ads
        if (adRef.current.getAttribute('data-adsbygoogle-status')) {
          isAdInitialized.current = true;
          return;
        }

        // Check if adsbygoogle is available
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          (window as any).adsbygoogle.push({});
          isAdInitialized.current = true;
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    };

    // Wait for adsbygoogle to be available
    const checkAndInitialize = () => {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        initializeAd();
      } else {
        // Retry after a short delay
        setTimeout(checkAndInitialize, 100);
      }
    };

    // Start checking after a small delay
    const timer = setTimeout(checkAndInitialize, 100);
    
    return () => clearTimeout(timer);
  }, [adSlot, isClient]);

  // Don't render the ad element on the server to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className={`ad-container ${className}`}>
        <div style={adStyle} className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded">
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
            Loading ad...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-7845670227485203"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

// Predefined ad components for different placements
export const HomepageAd: React.FC = () => (
  <div className="my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
    <AdContainer
      adSlot="1234567890"
      adFormat="auto"
      className="text-center"
      adStyle={{ display: 'block', width: '100%', height: '250px' }}
    />
  </div>
);

export const SidebarAd: React.FC = () => (
  <div className="my-6 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
    <AdContainer
      adSlot="2345678901"
      adFormat="rectangle"
      className="text-center"
      adStyle={{ display: 'block', width: '100%', height: '200px' }}
    />
  </div>
);

export const InlineAd: React.FC = () => (
  <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
    <AdContainer
      adSlot="3456789012"
      adFormat="horizontal"
      className="text-center"
      adStyle={{ display: 'block', width: '100%', height: '90px' }}
    />
  </div>
);

export const BannerAd: React.FC = () => (
  <div className="my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
    <AdContainer
      adSlot="4567890123"
      adFormat="horizontal"
      className="text-center"
      adStyle={{ display: 'block', width: '100%', height: '120px' }}
    />
  </div>
);

export default AdContainer;

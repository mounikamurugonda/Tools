'use client';

import React from 'react';

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
  React.useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
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

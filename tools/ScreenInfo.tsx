'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const ScreenInfo: React.FC<ToolProps> = ({ details, toolId }) => {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const update = () => {
      setInfo({
        screen: { w: window.screen.width, h: window.screen.height },
        avail: { w: window.screen.availWidth, h: window.screen.availHeight },
        window: { w: window.innerWidth, h: window.innerHeight },
        dpr: window.devicePixelRatio,
        colorDepth: window.screen.colorDepth,
        orientation: window.screen.orientation ? window.screen.orientation.type : 'unknown',
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!info) return null;

  return (
    <ToolContainer title="Screen Resolution Info" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Window Viewport"
          w={info.window.w}
          h={info.window.h}
          desc="The inner width/height of your browser window."
        />
        <Card
          title="Screen Resolution"
          w={info.screen.w}
          h={info.screen.h}
          desc="The full resolution of your monitor."
        />
        <Card
          title="Available Screen"
          w={info.avail.w}
          h={info.avail.h}
          desc="Screen size excluding taskbars/docks."
        />

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
            Device Pixel Ratio
          </h3>
          <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">{info.dpr}</p>
          <p className="text-sm text-gray-500 mt-2">Retina/High DPI scaling factor.</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Color Depth</h3>
          <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">
            {info.colorDepth}-bit
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Orientation</h3>
          <p className="text-xl font-bold text-teal-600 dark:text-teal-400 capitalize">
            {info.orientation.replace(/-/g, ' ')}
          </p>
        </div>
      </div>
    </ToolContainer>
  );
};

const Card = ({ title, w, h, desc }: any) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
    <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
      {w} x {h}
    </p>
    <p className="text-sm text-gray-500 mt-2">{desc}</p>
  </div>
);

export default ScreenInfo;

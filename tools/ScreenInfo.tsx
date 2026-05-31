'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';

interface ScreenData {
  screen: { w: number; h: number };
  avail: { w: number; h: number };
  window: { w: number; h: number };
  dpr: number;
  colorDepth: number;
  orientation: string;
  touch: boolean;
  platform: string;
}

const ScreenInfo: React.FC<ToolProps> = ({ details, toolId }) => {
  const [info, setInfo] = useState<ScreenData | null>(null);
  const toast = useToast();

  useEffect(() => {
    const update = () => {
      setInfo({
        screen: { w: window.screen.width, h: window.screen.height },
        avail: { w: window.screen.availWidth, h: window.screen.availHeight },
        window: { w: window.innerWidth, h: window.innerHeight },
        dpr: window.devicePixelRatio,
        colorDepth: window.screen.colorDepth,
        orientation: window.screen.orientation ? window.screen.orientation.type : 'unknown',
        touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        platform:
          (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData
            ?.platform ||
          navigator.platform ||
          'unknown',
      });
    };
    update();
    window.addEventListener('resize', update);
    window.screen.orientation?.addEventListener('change', update);
    return () => {
      window.removeEventListener('resize', update);
      window.screen.orientation?.removeEventListener('change', update);
    };
  }, []);

  const copyAll = useCallback(() => {
    if (!info) return;
    const payload = {
      screenResolution: `${info.screen.w} x ${info.screen.h}`,
      availableScreen: `${info.avail.w} x ${info.avail.h}`,
      windowViewport: `${info.window.w} x ${info.window.h}`,
      devicePixelRatio: info.dpr,
      colorDepth: `${info.colorDepth}-bit`,
      orientation: info.orientation,
      touchSupport: info.touch,
      platform: info.platform,
    };
    navigator.clipboard
      .writeText(JSON.stringify(payload, null, 2))
      .then(() => toast.success('Copied all values as JSON'))
      .catch(() => toast.error('Failed to copy to clipboard'));
  }, [info, toast]);

  if (!info) {
    return (
      <ToolContainer title="Screen Resolution Info" details={details} toolId={toolId}>
        <div className="flex items-center justify-center py-20 text-gray-500 dark:text-gray-400">
          <span className="animate-pulse">Detecting your screen…</span>
        </div>
      </ToolContainer>
    );
  }

  return (
    <ToolContainer title="Screen Resolution Info" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Resize your window to watch the viewport values update live.
          </p>
          <Button variant="secondary" size="sm" onClick={copyAll}>
            Copy all as JSON
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Metric
            title="Window Viewport"
            value={`${info.window.w} x ${info.window.h}`}
            color="text-blue-600 dark:text-blue-400"
            desc="The inner width/height of your browser window."
          />
          <Metric
            title="Screen Resolution"
            value={`${info.screen.w} x ${info.screen.h}`}
            color="text-blue-600 dark:text-blue-400"
            desc="The full resolution of your monitor."
          />
          <Metric
            title="Available Screen"
            value={`${info.avail.w} x ${info.avail.h}`}
            color="text-blue-600 dark:text-blue-400"
            desc="Screen size excluding taskbars/docks."
          />
          <Metric
            title="Device Pixel Ratio"
            value={String(info.dpr)}
            color="text-purple-600 dark:text-purple-400"
            desc="Retina/High DPI scaling factor."
          />
          <Metric
            title="Color Depth"
            value={`${info.colorDepth}-bit`}
            color="text-orange-600 dark:text-orange-400"
            desc="Bits per pixel for color."
          />
          <Metric
            title="Orientation"
            value={info.orientation.replace(/-/g, ' ')}
            color="text-teal-600 dark:text-teal-400"
            desc="Current display orientation."
            capitalize
          />
          <Metric
            title="Touch Support"
            value={info.touch ? 'Yes' : 'No'}
            color="text-pink-600 dark:text-pink-400"
            desc="Whether the device reports touch input."
          />
          <Metric
            title="Platform"
            value={info.platform}
            color="text-indigo-600 dark:text-indigo-400"
            desc="Operating system reported by the browser."
          />
        </div>
      </div>
    </ToolContainer>
  );
};

const Metric = ({
  title,
  value,
  color,
  desc,
  capitalize,
}: {
  title: string;
  value: string;
  color: string;
  desc: string;
  capitalize?: boolean;
}) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
    <p className={`text-3xl font-bold break-words ${color} ${capitalize ? 'capitalize' : ''}`}>
      {value}
    </p>
    <p className="text-sm text-gray-500 mt-2">{desc}</p>
  </div>
);

export default ScreenInfo;

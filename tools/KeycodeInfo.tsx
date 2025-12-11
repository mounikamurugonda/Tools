'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';

const KeycodeInfo: React.FC<ToolProps> = ({ details, toolId }) => {
  const [event, setEvent] = useState<KeyboardEvent | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      setEvent(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ToolContainer title="Keycode Info" details={details} toolId={toolId}>
      <div className="space-y-8 text-center max-w-4xl mx-auto">
        {!event ? (
          <div className="p-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center min-h-[300px]">
            <div className="text-6xl mb-6 opacity-20">⌨️</div>
            <p className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
              Press any key on your keyboard
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="inline-block min-w-[300px] border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20">
              <div className="p-4">
                <span className="block text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide">
                  JavaScript Key Code
                </span>
                <span className="text-8xl font-bold text-gray-900 dark:text-white">
                  {event.keyCode}
                </span>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoCard label="event.key" value={event.key} />
              <InfoCard label="event.code" value={event.code} />
              <InfoCard label="event.which" value={event.which.toString()} />
              <InfoCard
                label="event.location"
                value={event.location.toString()}
              />
            </div>

            <Card className="text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Modifiers</h3>
              <div className="flex gap-4 flex-wrap">
                <Badge label="Shift" active={event.shiftKey} />
                <Badge label="Ctrl" active={event.ctrlKey} />
                <Badge label="Alt" active={event.altKey} />
                <Badge label="Meta" active={event.metaKey} />
              </div>
            </Card>
          </div>
        )}
      </div>
    </ToolContainer>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center gap-2">
    <span className="text-xs text-gray-500 font-mono">{label}</span>
    <span className="text-xl font-mono font-bold text-gray-900 dark:text-white truncate max-w-full">
      {value === ' ' ? '(Space)' : value}
    </span>
  </div>
);

const Badge = ({ label, active }: { label: string; active: boolean }) => (
  <span
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
      : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
      }`}
  >
    {label}
  </span>
);

export default KeycodeInfo;

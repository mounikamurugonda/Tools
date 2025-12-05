'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

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
      <div className="space-y-8 text-center">
        {!event ? (
          <div className="p-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl font-semibold text-gray-500">
              Press any key on your keyboard
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl inline-block">
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                JavaScript Key Code
              </span>
              <span className="text-8xl font-bold text-blue-600 dark:text-blue-400">
                {event.keyCode}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InfoCard label="event.key" value={event.key} />
              <InfoCard label="event.code" value={event.code} />
              <InfoCard label="event.which" value={event.which.toString()} />
              <InfoCard
                label="event.location"
                value={event.location.toString()}
              />
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-left">
              <h3 className="font-bold mb-2">Modifiers</h3>
              <div className="flex gap-4">
                <Badge label="Shift" active={event.shiftKey} />
                <Badge label="Ctrl" active={event.ctrlKey} />
                <Badge label="Alt" active={event.altKey} />
                <Badge label="Meta" active={event.metaKey} />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
    <span className="block text-xs text-gray-500 mb-1">{label}</span>
    <span className="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
      {value === ' ' ? '(Space)' : value}
    </span>
  </div>
);

const Badge = ({ label, active }: { label: string; active: boolean }) => (
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${active ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}
  >
    {label}
  </span>
);

export default KeycodeInfo;

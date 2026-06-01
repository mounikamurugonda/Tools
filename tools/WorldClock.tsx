'use client';

import React, { useState, useEffect } from 'react';
import CustomSelect from '@/components/ui/CustomSelect';
import type { ToolProps } from '@/types';
import { timezones } from '@/lib/timezones';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Trash2 } from 'lucide-react';

interface TimezoneOption {
  value: string;
  label: string;
}

const TIMEZONE_OPTIONS: TimezoneOption[] = timezones.flatMap(group =>
  group.zones.map(zone => ({
    value: zone.value,
    label: `${group.group} / ${zone.label}`,
  }))
);

const getInitialTimezones = () => {
  if (typeof window === 'undefined') return ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
  try {
    const saved = localStorage.getItem('world-clocks');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse timezones from localStorage', e);
  }
  return ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
};

const WorldClock: React.FC<ToolProps> = ({ details, toolId }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);
  const [hour12, setHour12] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setSelectedTimezones(getInitialTimezones());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('world-clocks', JSON.stringify(selectedTimezones));
    } catch (e) {
      console.error('Failed to save timezones to localStorage', e);
    }
  }, [selectedTimezones]);

  const addTimezone = (option: unknown) => {
    const singleOption = option as TimezoneOption | null;
    if (singleOption && !selectedTimezones.includes(singleOption.value)) {
      setSelectedTimezones([...selectedTimezones, singleOption.value]);
    }
  };

  const removeTimezone = (tz: string) => {
    setSelectedTimezones(selectedTimezones.filter(t => t !== tz));
  };

  const copyTime = (tz: string) => {
    const label = tz.replace(/_/g, ' ').split('/').pop();
    const t = currentTime.toLocaleTimeString(undefined, { timeZone: tz, hour12 });
    navigator.clipboard
      .writeText(`${label}: ${t}`)
      .then(() => toast.success('Time copied'))
      .catch(() => toast.error('Failed to copy'));
  };

  return (
    <ToolContainer title="World Clock" details={details} toolId={toolId}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <CustomSelect<TimezoneOption>
            options={TIMEZONE_OPTIONS}
            onChange={addTimezone}
            placeholder="-- Add time zone --"
            value={null}
            className="flex-grow text-gray-800 dark:text-gray-200"
          />
          <div
            className="flex shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg p-1"
            role="group"
            aria-label="Time format"
          >
            <button
              onClick={() => setHour12(false)}
              aria-pressed={!hour12}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                !hour12
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              24h
            </button>
            <button
              onClick={() => setHour12(true)}
              aria-pressed={hour12}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                hour12
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              12h
            </button>
          </div>
        </div>

        {selectedTimezones.length === 0 && (
          <div className="text-center py-12 text-sm text-gray-400 dark:text-gray-500">
            Add a time zone above to start tracking it.
          </div>
        )}
        <div className="space-y-4">
          {selectedTimezones.map(tz => (
            <Card key={tz} className="flex items-center justify-between p-4">
              <div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {tz.replace(/_/g, ' ').split('/').pop()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentTime.toLocaleDateString(undefined, {
                    timeZone: tz,
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <p className="text-2xl sm:text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                  {currentTime.toLocaleTimeString(undefined, {
                    timeZone: tz,
                    hour12,
                  })}
                </p>
                <Button
                  onClick={() => copyTime(tz)}
                  variant="ghost"
                  size="sm"
                  aria-label={`Copy time for ${tz}`}
                  className="!p-2 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <Copy className="h-5 w-5" />
                </Button>
                <Button
                  onClick={() => removeTimezone(tz)}
                  variant="ghost"
                  size="sm"
                  aria-label={`Remove ${tz}`}
                  className="!p-2 text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
};

export default WorldClock;

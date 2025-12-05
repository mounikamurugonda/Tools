'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import { timezones } from '@/lib/timezones';

const TimeZoneConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  // Get user's current timezone as default
  const userTimeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
      return 'America/New_York';
    }
  }, []);

  const [fromTimeZone, setFromTimeZone] = useState(userTimeZone);
  const [toTimeZone, setToTimeZone] = useState('Europe/London');

  const now = new Date();
  const [date, setDate] = useState(now.toISOString().split('T')[0]);
  const [time, setTime] = useState(
    now.toTimeString().split(' ')[0].substring(0, 5),
  );

  useEffect(() => {
    // Timezones are now imported from a local file
  }, []);

  const timeDifference = useMemo(() => {
    try {
      const now = new Date();
      const fromOffset = new Intl.DateTimeFormat('en-US', {
        timeZone: fromTimeZone,
        timeZoneName: 'longOffset',
      })
        .formatToParts(now)
        .find((p) => p.type === 'timeZoneName')
        ?.value.replace('GMT', '');
      const toOffset = new Intl.DateTimeFormat('en-US', {
        timeZone: toTimeZone,
        timeZoneName: 'longOffset',
      })
        .formatToParts(now)
        .find((p) => p.type === 'timeZoneName')
        ?.value.replace('GMT', '');

      if (!fromOffset || !toOffset) return '';

      const [fromHours, fromMinutes] = fromOffset.split(':').map(Number);
      const [toHours, toMinutes] = toOffset.split(':').map(Number);

      const fromTotalMinutes = fromHours * 60 + (fromMinutes || 0);
      const toTotalMinutes = toHours * 60 + (toMinutes || 0);

      const diffMinutes = toTotalMinutes - fromTotalMinutes;
      const diffHours = diffMinutes / 60;

      if (diffHours === 0) return 'Same timezone';

      return `${toTimeZone.replace(/_/g, ' ')} is ${Math.abs(diffHours)} hour${Math.abs(diffHours) !== 1 ? 's' : ''} ${diffHours > 0 ? 'ahead' : 'behind'} ${fromTimeZone.replace(/_/g, ' ')}`;
    } catch (e) {
      return '';
    }
  }, [fromTimeZone, toTimeZone]);

  const result = useMemo(() => {
    if (!date || !time) return { date: '', time: '', day: '' };

    try {
      // Construct a date object from the input, specifying the fromTimeZone
      const dateInFromZone = new Date(`${date}T${time}:00`);

      const targetFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: toTimeZone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      const formatted = targetFormatter.format(dateInFromZone);
      return {
        formattedString: formatted,
        date: dateInFromZone.toLocaleDateString(undefined, {
          timeZone: toTimeZone,
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        time: dateInFromZone.toLocaleTimeString(undefined, {
          timeZone: toTimeZone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        day: dateInFromZone.toLocaleDateString(undefined, {
          timeZone: toTimeZone,
          weekday: 'long',
        }),
      };
    } catch (e) {
      console.error('Timezone conversion error:', e);
      return { date: 'Invalid Date', time: '', day: '' };
    }
  }, [date, time, fromTimeZone, toTimeZone]);

  const handleSwap = () => {
    setFromTimeZone(toTimeZone);
    setToTimeZone(fromTimeZone);
  };

  return (
    <ToolContainer
      title="Time Zone Converter"
      details={details}
      toolId={toolId}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="grid md:grid-cols-2 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 items-start">
          <div className="space-y-4">
            <TimeZoneSelector
              label="From"
              selected={fromTimeZone}
              onSelect={setFromTimeZone}
              timezones={timezones}
            />
          </div>
          <div className="space-y-4">
            <TimeZoneSelector
              label="To"
              selected={toTimeZone}
              onSelect={setToTimeZone}
              timezones={timezones}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Swap timezones"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </button>
        </div>

        {timeDifference && (
          <div className="text-center text-gray-600 dark:text-gray-400">
            {timeDifference}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 text-center">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              {fromTimeZone.replace(/_/g, ' ')}
            </h3>
            <p className="text-2xl font-bold text-blue-500 dark:text-blue-400 my-2">
              {time}
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              {new Date(`${date}T${time}`).toLocaleDateString(undefined, {
                weekday: 'long',
              })}
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400">
              {new Date(`${date}T${time}`).toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              {toTimeZone.replace(/_/g, ' ')}
            </h3>
            <p className="text-2xl font-bold text-blue-500 dark:text-blue-400 my-2">
              {result.time}
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              {result.day}
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400">
              {result.date}
            </p>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

const TimeZoneSelector: React.FC<{
  label: string;
  selected: string;
  onSelect: (tz: string) => void;
  timezones: { group: string; zones: { value: string; label: string }[] }[];
}> = ({ label, selected, onSelect, timezones }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <select
      value={selected}
      onChange={(e) => onSelect(e.target.value)}
      className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {timezones.map((group) => (
        <optgroup key={group.group} label={group.group}>
          {group.zones.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  </div>
);

export default TimeZoneConverter;

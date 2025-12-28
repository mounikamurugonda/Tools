'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import { timezones } from '@/lib/timezones';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Select from 'react-select';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ArrowLeftRight } from 'lucide-react';

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
  const [time, setTime] = useState(now.toTimeString().split(' ')[0].substring(0, 5));

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
        .find(p => p.type === 'timeZoneName')
        ?.value.replace('GMT', '');
      const toOffset = new Intl.DateTimeFormat('en-US', {
        timeZone: toTimeZone,
        timeZoneName: 'longOffset',
      })
        .formatToParts(now)
        .find(p => p.type === 'timeZoneName')
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

  const getSelectOptions = (
    tzs: { group: string; zones: { value: string; label: string }[] }[]
  ) => {
    const options: { label: string; options: { value: string; label: string }[] }[] = [];
    tzs.forEach(group => {
      options.push({
        label: group.group,
        options: group.zones,
      });
    });
    return options;
  };

  const flattenedTimezones = useMemo(() => {
    return timezones.flatMap(group =>
      group.zones.map(z => ({
        value: z.value,
        label: z.label,
        group: group.group,
      }))
    );
  }, []);

  return (
    <ToolContainer title="Time Zone Converter" details={details} toolId={toolId}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <div>
              <Label htmlFor="date-input">Date</Label>
              <Input
                id="date-input"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="time-input">Time</Label>
              <Input
                id="time-input"
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
            <div className="space-y-4">
              <Label>From Time Zone</Label>
              <Select
                value={flattenedTimezones.find(z => z.value === fromTimeZone)}
                onChange={opt => setFromTimeZone(opt?.value || 'UTC')}
                options={getSelectOptions(timezones) as any}
                isSearchable
              />
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg text-center border border-gray-100 dark:border-gray-800">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{time}</p>
                <p className="text-sm text-gray-500">
                  {new Date(`${date}T${time}`).toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button onClick={handleSwap} variant="ghost" className="rounded-full p-2 h-auto">
                <ArrowLeftRight className="w-6 h-6 text-gray-400 hover:text-blue-500 transition-colors" />
              </Button>
            </div>

            <div className="space-y-4">
              <Label>To Time Zone</Label>
              <Select
                value={flattenedTimezones.find(z => z.value === toTimeZone)}
                onChange={opt => setToTimeZone(opt?.value || 'UTC')}
                options={getSelectOptions(timezones) as any}
                isSearchable
              />
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center border border-blue-100 dark:border-blue-800">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {result.time}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {result.day}, {result.date}
                </p>
              </div>
            </div>
          </div>

          {timeDifference && (
            <div className="mt-6 text-center">
              <span className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                {timeDifference}
              </span>
            </div>
          )}
        </Card>
      </div>
    </ToolContainer>
  );
};

export default TimeZoneConverter;

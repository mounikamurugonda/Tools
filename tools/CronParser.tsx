'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const CronParser: React.FC<ToolProps> = ({ details, toolId }) => {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [weekday, setWeekday] = useState('*');
  const [expression, setExpression] = useState('* * * * *');

  useEffect(() => {
    setExpression(`${minute} ${hour} ${day} ${month} ${weekday}`);
  }, [minute, hour, day, month, weekday]);

  return (
    <ToolContainer title="Cron Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Minute</label>
            <input
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full brand-input"
              placeholder="*"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hour</label>
            <input
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full brand-input"
              placeholder="*"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Day</label>
            <input
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full brand-input"
              placeholder="*"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Month</label>
            <input
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full brand-input"
              placeholder="*"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Weekday</label>
            <input
              value={weekday}
              onChange={(e) => setWeekday(e.target.value)}
              className="w-full brand-input"
              placeholder="*"
            />
          </div>
        </div>

        <div className="relative p-6 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
          <p className="text-sm text-gray-500 mb-2">Cron Expression</p>
          <code className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400">
            {expression}
          </code>
          <CopyButton
            textToCopy={expression}
            className="absolute top-4 right-4"
          />
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>
            <strong>Common Examples:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <code>*/15 * * * *</code> - Every 15 minutes
            </li>
            <li>
              <code>0 0 * * *</code> - Every day at midnight
            </li>
            <li>
              <code>0 9 * * 1</code> - At 9:00 AM on Monday
            </li>
          </ul>
        </div>
      </div>
    </ToolContainer>
  );
};

export default CronParser;

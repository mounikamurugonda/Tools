'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const AgeCalculator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [dob, setDob] = useState('2000-01-01');
  const [today, setToday] = useState(new Date().toISOString().split('T')[0]);

  const age = useMemo(() => {
    const start = new Date(dob);
    const end = new Date(today);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total days approx
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays };
  }, [dob, today]);

  return (
    <ToolContainer title="Age Calculator" details={details} toolId={toolId}>
      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="brand-input"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Calculate Age At
            </label>
            <input
              type="date"
              value={today}
              onChange={(e) => setToday(e.target.value)}
              className="brand-input"
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-8 text-center shadow-lg">
          <p className="text-lg opacity-80 mb-2">You are</p>
          <div className="flex justify-center items-baseline gap-2 mb-4">
            <span className="text-6xl font-bold">{age.years}</span>
            <span className="text-2xl">years</span>
          </div>
          <div className="flex justify-center gap-6 text-xl">
            <span>
              <span className="font-bold">{age.months}</span> months
            </span>
            <span>
              <span className="font-bold">{age.days}</span> days
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-gray-500 text-sm">Total Months</p>
            <p className="text-2xl font-bold">{age.years * 12 + age.months}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-gray-500 text-sm">Total Days</p>
            <p className="text-2xl font-bold">
              {age.totalDays.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default AgeCalculator;

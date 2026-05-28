'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';

const AgeCalculator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [dob, setDob] = useState('2000-01-01');
  const [today, setToday] = useState(new Date().toISOString().split('T')[0]);

  const data = useMemo(() => {
    const start = new Date(dob);
    const end = new Date(today);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { error: 'Enter valid dates.' as const };
    }
    if (start.getTime() > end.getTime()) {
      return { error: 'Date of birth is after the target date.' as const };
    }

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

    const diffMs = end.getTime() - start.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    // Next birthday relative to the target date.
    let nextBday = new Date(end.getFullYear(), start.getMonth(), start.getDate());
    if (nextBday.getTime() < end.getTime()) {
      nextBday = new Date(end.getFullYear() + 1, start.getMonth(), start.getDate());
    }
    const daysToBday = Math.ceil((nextBday.getTime() - end.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays, totalWeeks, totalHours, daysToBday };
  }, [dob, today]);

  return (
    <ToolContainer title="Age Calculator" details={details} toolId={toolId}>
      <div className="space-y-8 max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2">Date of Birth</Label>
              <Input type="date" value={dob} onChange={e => setDob(e.target.value)} />
            </div>
            <div>
              <Label className="mb-2">Calculate Age At</Label>
              <Input type="date" value={today} onChange={e => setToday(e.target.value)} />
            </div>
          </div>
        </Card>

        {'error' in data ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 p-6 text-center text-red-700 dark:text-red-300"
          >
            {data.error}
          </div>
        ) : (
          <>
            <div className="bg-blue-600 rounded-2xl text-white p-8 text-center shadow-lg">
              <p className="text-lg opacity-80 mb-2">You are</p>
              <div className="flex justify-center items-baseline gap-2 mb-4">
                <span className="text-6xl font-bold">{data.years}</span>
                <span className="text-2xl">years</span>
              </div>
              <div className="flex justify-center gap-6 text-xl">
                <span>
                  <span className="font-bold">{data.months}</span> months
                </span>
                <span>
                  <span className="font-bold">{data.days}</span> days
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Months</p>
                <p className="text-2xl font-bold">{(data.years * 12 + data.months).toLocaleString()}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Weeks</p>
                <p className="text-2xl font-bold">{data.totalWeeks.toLocaleString()}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Days</p>
                <p className="text-2xl font-bold">{data.totalDays.toLocaleString()}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Hours</p>
                <p className="text-2xl font-bold">{data.totalHours.toLocaleString()}</p>
              </Card>
            </div>

            <Card className="p-4 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Next birthday</p>
              <p className="text-xl font-semibold">
                {data.daysToBday === 0
                  ? '🎉 Today!'
                  : `in ${data.daysToBday.toLocaleString()} day${data.daysToBday === 1 ? '' : 's'}`}
              </p>
            </Card>
          </>
        )}
      </div>
    </ToolContainer>
  );
};

export default AgeCalculator;

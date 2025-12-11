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
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2">Date of Birth</Label>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2">Calculate Age At</Label>
              <Input
                type="date"
                value={today}
                onChange={(e) => setToday(e.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card className="bg-blue-600 border-none text-white p-8 text-center shadow-lg">
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
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <p className="text-muted-foreground text-sm">Total Months</p>
            <p className="text-2xl font-bold">{age.years * 12 + age.months}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-muted-foreground text-sm">Total Days</p>
            <p className="text-2xl font-bold">
              {age.totalDays.toLocaleString()}
            </p>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default AgeCalculator;

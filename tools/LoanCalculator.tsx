'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';

const LoanCalculator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [loanAmount, setLoanAmount] = useState('250000');
  const [interestRate, setInterestRate] = useState('5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [termUnit, setTermUnit] = useState<'years' | 'months'>('years');

  const { monthlyPayment, totalInterest, totalPayment, schedule } = useMemo(() => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const termInYears = termUnit === 'years' ? parseFloat(loanTerm) : parseFloat(loanTerm) / 12;

    if (
      isNaN(P) ||
      P <= 0 ||
      isNaN(annualRate) ||
      annualRate < 0 ||
      isNaN(termInYears) ||
      termInYears <= 0
    ) {
      return {
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
        schedule: [],
      };
    }

    const i = annualRate / 100 / 12;
    const n = termInYears * 12;

    if (i === 0) {
      // Interest-free loan
      const M = P / n;
      return {
        monthlyPayment: M,
        totalInterest: 0,
        totalPayment: P,
        schedule: [],
      }; // Schedule generation for 0% is simple, but let's omit for now.
    }

    const M = (P * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);
    const totalPayment = M * n;
    const totalInterest = totalPayment - P;

    // Generate amortization schedule
    let balance = P;
    const scheduleData = [];
    for (let j = 1; j <= n; j++) {
      const interestPaid = balance * i;
      const principalPaid = M - interestPaid;
      balance -= principalPaid;
      scheduleData.push({
        month: j,
        payment: M,
        principal: principalPaid,
        interest: interestPaid,
        balance: balance > 0 ? balance : 0,
      });
    }

    return {
      monthlyPayment: M,
      totalInterest,
      totalPayment,
      schedule: scheduleData,
    };
  }, [loanAmount, interestRate, loanTerm, termUnit]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <ToolContainer title="Loan Calculator" details={details} toolId={toolId}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card title="Loan Details">
            <div className="space-y-4">
              <div>
                <Label>Loan Amount ($)</Label>
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={e => setLoanAmount(e.target.value)}
                  placeholder="e.g. 250000"
                />
              </div>
              <div>
                <Label>Interest Rate (%)</Label>
                <Input
                  type="number"
                  value={interestRate}
                  onChange={e => setInterestRate(e.target.value)}
                  step="0.01"
                  placeholder="e.g. 5.5"
                />
              </div>
              <div>
                <Label>Loan Term</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={e => setLoanTerm(e.target.value)}
                    className="flex-1"
                  />
                  <div className="w-32">
                    <Select
                      value={termUnit}
                      onChange={e => setTermUnit(e.target.value as 'years' | 'months')}
                    >
                      <option value="years">Years</option>
                      <option value="months">Months</option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title="Summary"
            className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-blue-200 dark:border-blue-800">
                <span className="text-sm text-gray-600 dark:text-gray-300">Monthly Payment</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(monthlyPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Total Interest</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(totalInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Total Cost</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(totalPayment)}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card title="Amortization Schedule" className="h-full">
            <div className="overflow-auto max-h-[600px] -mx-6">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800/50 sticky top-0 backdrop-blur-sm z-10">
                  <tr>
                    <th className="px-6 py-3">Month</th>
                    <th className="px-6 py-3 text-right">Payment</th>
                    <th className="px-6 py-3 text-right">Principal</th>
                    <th className="px-6 py-3 text-right">Interest</th>
                    <th className="px-6 py-3 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {schedule.length > 0 ? (
                    schedule.map(row => (
                      <tr key={row.month} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                          {row.month}
                        </td>
                        <td className="px-6 py-3 text-right text-gray-600 dark:text-gray-300">
                          {formatCurrency(row.payment)}
                        </td>
                        <td className="px-6 py-3 text-right text-green-600 dark:text-green-400 font-medium">
                          {formatCurrency(row.principal)}
                        </td>
                        <td className="px-6 py-3 text-right text-red-600 dark:text-red-400 font-medium">
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="px-6 py-3 text-right font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(row.balance)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        Enter loan details to view the schedule.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default LoanCalculator;

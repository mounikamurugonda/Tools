'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const LoanCalculator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [loanAmount, setLoanAmount] = useState('250000');
  const [interestRate, setInterestRate] = useState('5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [termUnit, setTermUnit] = useState<'years' | 'months'>('years');

  const { monthlyPayment, totalInterest, totalPayment, schedule } =
    useMemo(() => {
      const P = parseFloat(loanAmount);
      const annualRate = parseFloat(interestRate);
      const termInYears =
        termUnit === 'years' ? parseFloat(loanTerm) : parseFloat(loanTerm) / 12;

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
        <div className="lg:col-span-1 space-y-4">
          <NumberInput
            label="Loan Amount ($)"
            value={loanAmount}
            onChange={setLoanAmount}
          />
          <NumberInput
            label="Interest Rate (%)"
            value={interestRate}
            onChange={setInterestRate}
            step="0.01"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loan Term
            </label>
            <div className="flex">
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={termUnit}
                onChange={(e) => setTermUnit(e.target.value as any)}
                className="bg-gray-200 dark:bg-gray-800 border-t border-b border-r border-gray-300 dark:border-gray-600 rounded-r p-2 focus:outline-none"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
          <div className="pt-4 space-y-4">
            <SummaryCard
              label="Monthly Payment"
              value={formatCurrency(monthlyPayment)}
            />
            <SummaryCard
              label="Total Interest Paid"
              value={formatCurrency(totalInterest)}
            />
            <SummaryCard
              label="Total Cost of Loan"
              value={formatCurrency(totalPayment)}
            />
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Amortization Schedule
          </h3>
          <div className="overflow-auto h-[60vh] border border-gray-200 dark:border-gray-700 rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-700 sticky top-0">
                <tr>
                  <th className="px-4 py-2">Month</th>
                  <th className="px-4 py-2 text-right">Payment</th>
                  <th className="px-4 py-2 text-right">Principal</th>
                  <th className="px-4 py-2 text-right">Interest</th>
                  <th className="px-4 py-2 text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {schedule.map((row) => (
                  <tr key={row.month}>
                    <td className="px-4 py-2">{row.month}</td>
                    <td className="px-4 py-2 text-right">
                      {formatCurrency(row.payment)}
                    </td>
                    <td className="px-4 py-2 text-right text-green-600 dark:text-green-400">
                      {formatCurrency(row.principal)}
                    </td>
                    <td className="px-4 py-2 text-right text-red-600 dark:text-red-400">
                      {formatCurrency(row.interest)}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {formatCurrency(row.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

const NumberInput: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  step?: string;
}> = ({ label, value, onChange, step = '1' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      step={step}
      className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const SummaryCard: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-2xl font-bold text-blue-500 dark:text-blue-400">
      {value}
    </p>
  </div>
);

export default LoanCalculator;

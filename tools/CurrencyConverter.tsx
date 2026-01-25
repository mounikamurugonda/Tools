'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import CustomSelect from '@/components/ui/CustomSelect';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ArrowLeftRight, RefreshCw } from 'lucide-react';

const API_URL = 'https://open.er-api.com/v6/latest/USD';

interface Rates {
  [key: string]: number;
}

const CurrencyConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [amount1, setAmount1] = useState('1');
  const [amount2, setAmount2] = useState('');
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            'Failed to fetch exchange rates. The service may be temporarily unavailable.'
          );
        }
        return response.json();
      })
      .then(data => {
        if (data.result === 'success') {
          setRates(data.rates);
        } else {
          throw new Error('Invalid response from the exchange rate API.');
        }
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const calculateConversion = useCallback(
    (amount: number, from: string, to: string, rateData: Rates) => {
      const fromRate = rateData[from];
      const toRate = rateData[to];
      if (!fromRate || !toRate) return 0;

      // The base is USD, so we convert from 'from' to USD, then from USD to 'to'
      const result = (amount / fromRate) * toRate;
      return result;
    },
    []
  );

  useEffect(() => {
    if (rates) {
      const amount = parseFloat(amount1);
      if (!isNaN(amount)) {
        const result = calculateConversion(amount, currency1, currency2, rates);
        setAmount2(result.toFixed(4));
      } else {
        setAmount2('');
      }
    }
  }, [amount1, currency1, currency2, rates, calculateConversion]);

  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount1(e.target.value);
  };

  const handleCurrency1Change = (val: string) => {
    setCurrency1(val);
  };

  const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount2(e.target.value);
    if (rates) {
      const amount = parseFloat(e.target.value);
      if (!isNaN(amount)) {
        const result = calculateConversion(amount, currency2, currency1, rates);
        setAmount1(result.toFixed(4));
      } else {
        setAmount1('');
      }
    }
  };

  const handleCurrency2Change = (val: string) => {
    setCurrency2(val);
  };

  const handleSwap = () => {
    setCurrency1(currency2);
    setCurrency2(currency1);
    setAmount1(amount2);
  };

  if (error) {
    return (
      <ToolContainer title="Currency Converter" details={details} toolId={toolId}>
        <div className="text-center p-4 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-300">
          {error}
        </div>
      </ToolContainer>
    );
  }

  if (isLoading || !rates) {
    return (
      <ToolContainer title="Currency Converter" details={details} toolId={toolId}>
        <div className="flex flex-col items-center justify-center p-12 text-gray-500">
          <RefreshCw className="w-8 h-8 animate-spin mb-4" />
          Loading exchange rates...
        </div>
      </ToolContainer>
    );
  }

  const currencyOptions = Object.keys(rates).map(r => ({ value: r, label: r }));

  return (
    <ToolContainer title="Currency Converter" details={details} toolId={toolId}>
      <Card className="max-w-2xl mx-auto space-y-8 p-8">
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
          <CurrencyInput
            label="From"
            amount={amount1}
            onAmountChange={handleAmount1Change}
            currency={currency1}
            onCurrencyChange={handleCurrency1Change}
            options={currencyOptions}
          />

          <div className="flex justify-center pt-6">
            <Button
              onClick={handleSwap}
              variant="ghost"
              className="rounded-full p-2 h-auto"
              title="Swap currencies"
            >
              <ArrowLeftRight className="w-6 h-6 text-blue-500" />
            </Button>
          </div>

          <CurrencyInput
            label="To"
            amount={amount2}
            onAmountChange={handleAmount2Change}
            currency={currency2}
            onCurrencyChange={handleCurrency2Change}
            options={currencyOptions}
          />
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Rates are updated periodically via Open Exchange Rates API. Provided for informational
          purposes only.
        </p>
      </Card>
    </ToolContainer>
  );
};

interface CurrencyInputProps {
  label: string;
  amount: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currency: string;
  onCurrencyChange: (val: string) => void;
  options: { value: string; label: string }[];
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  options,
}) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-col gap-2">
        <Input
          type="number"
          value={amount}
          onChange={onAmountChange}
          className="text-lg font-mono"
          placeholder="0.00"
        />
        <CustomSelect
          value={options.find(o => o.value === currency)}
          onChange={opt => opt && onCurrencyChange(opt.value)}
          options={options}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;


'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

const API_URL = 'https://open.er-api.com/v6/latest/USD';

interface Rates {
  [key: string]: number;
}

const CurrencyConverter: React.FC<ToolProps> = ({ details }) => {
    const [rates, setRates] = useState<Rates | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [amount1, setAmount1] = useState('1');
    const [amount2, setAmount2] = useState('');
    const [currency1, setCurrency1] = useState('USD');
    const [currency2, setCurrency2] = useState('EUR');

    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch exchange rates. The service may be temporarily unavailable.');
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
            });
    }, []);

    const calculateConversion = useCallback((amount: number, from: string, to: string, rateData: Rates) => {
        const fromRate = rateData[from];
        const toRate = rateData[to];
        if (!fromRate || !toRate) return 0;
        
        // The base is USD, so we convert from 'from' to USD, then from USD to 'to'
        const result = (amount / fromRate) * toRate;
        return result;
    }, []);

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

    const handleCurrency1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency1(e.target.value);
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
    
    const handleCurrency2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency2(e.target.value);
    };
    
    const handleSwap = () => {
        setCurrency1(currency2);
        setCurrency2(currency1);
    }

    if (error) {
        return (
            <ToolContainer title="Currency Converter" details={details}>
                <div className="text-center p-4 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-300">{error}</div>
            </ToolContainer>
        );
    }

    if (!rates) {
        return (
            <ToolContainer title="Currency Converter" details={details}>
                <div className="text-center text-gray-800 dark:text-gray-200">Loading exchange rates...</div>
            </ToolContainer>
        );
    }
    
    const currencyOptions = Object.keys(rates);

    return (
        <ToolContainer title="Currency Converter" details={details}>
            <div className="space-y-4 max-w-2xl mx-auto">
                <div className="grid sm:grid-cols-2 gap-4 items-start">
                    <CurrencyInput
                        label="From"
                        amount={amount1}
                        onAmountChange={handleAmount1Change}
                        currency={currency1}
                        onCurrencyChange={handleCurrency1Change}
                        options={currencyOptions}
                    />
                    <CurrencyInput
                        label="To"
                        amount={amount2}
                        onAmountChange={handleAmount2Change}
                        currency={currency2}
                        onCurrencyChange={handleCurrency2Change}
                        options={currencyOptions}
                    />
                </div>
                 <div className="text-center">
                    <button onClick={handleSwap} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600" title="Swap currencies">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Rates are updated periodically. Provided for informational purposes only.</p>
            </div>
        </ToolContainer>
    );
};

interface CurrencyInputProps {
    label: string;
    amount: string;
    onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    currency: string;
    onCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, amount, onAmountChange, currency, onCurrencyChange, options }) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</label>
            <div className="flex gap-2">
                <input
                    type="number"
                    value={amount}
                    onChange={onAmountChange}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                />
                <select
                    value={currency}
                    onChange={onCurrencyChange}
                    className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                >
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
        </div>
    );
};

export default CurrencyConverter;
import React, { useState, useMemo } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

type Mode = 'duration' | 'calculate';

const DateCalculator: React.FC<ToolProps> = () => {
    const [mode, setMode] = useState<Mode>('duration');
    const today = new Date().toISOString().split('T')[0];

    // State for duration mode
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    // State for calculate mode
    const [calcDate, setCalcDate] = useState(today);
    const [days, setDays] = useState(30);
    const [operation, setOperation] = useState<'add' | 'subtract'>('add');

    const durationResult = useMemo(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return {
            days: diffDays,
            weeks: (diffDays / 7).toFixed(2),
        };
    }, [startDate, endDate]);

    const calculateResult = useMemo(() => {
        const start = new Date(calcDate);
        if (isNaN(start.getTime())) return null;

        const resultDate = new Date(start);
        const dayModifier = operation === 'add' ? days : -days;
        resultDate.setDate(resultDate.getDate() + dayModifier);

        return resultDate.toLocaleDateString(undefined, {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }, [calcDate, days, operation]);


    return (
        <ToolContainer title="Date Calculator">
            <div className="space-y-6">
                <div className="flex justify-center bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                    <button onClick={() => setMode('duration')} className={`w-1/2 py-2 rounded-md ${mode === 'duration' ? 'bg-blue-600 text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}>Duration Between Dates</button>
                    <button onClick={() => setMode('calculate')} className={`w-1/2 py-2 rounded-md ${mode === 'calculate' ? 'bg-blue-600 text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}>Add/Subtract Days</button>
                </div>
                
                {mode === 'duration' && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <DateInput label="Start Date" value={startDate} onChange={setStartDate} />
                            <DateInput label="End Date" value={endDate} onChange={setEndDate} />
                        </div>
                        {durationResult && (
                            <div className="text-center bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold">Result</h3>
                                <p className="text-3xl font-bold text-blue-400">{durationResult.days} days</p>
                                <p className="text-gray-500 dark:text-gray-400">({durationResult.weeks} weeks)</p>
                            </div>
                        )}
                    </div>
                )}

                {mode === 'calculate' && (
                     <div className="space-y-4 animate-fade-in">
                        <DateInput label="Start Date" value={calcDate} onChange={setCalcDate} />
                        <div className="grid sm:grid-cols-3 gap-4 items-end">
                             <div className="sm:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Operation</label>
                                <select value={operation} onChange={e => setOperation(e.target.value as any)} className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200">
                                    <option value="add">Add</option>
                                    <option value="subtract">Subtract</option>
                                </select>
                             </div>
                             <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Days</label>
                                <input type="number" value={days} onChange={e => setDays(parseInt(e.target.value, 10))} className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                             </div>
                        </div>
                         {calculateResult && (
                            <div className="text-center bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold">Resulting Date</h3>
                                <p className="text-2xl font-bold text-blue-400">{calculateResult}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ToolContainer>
    );
};

const DateInput: React.FC<{label: string, value: string, onChange: (val: string) => void}> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input 
            type="date"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
            style={{ colorScheme: 'dark' }}
        />
    </div>
);


export default DateCalculator;
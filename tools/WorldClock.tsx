import React, { useState, useEffect } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

const TIMEZONES = [
    { city: 'New York', tz: 'America/New_York' },
    { city: 'London', tz: 'Europe/London' },
    { city: 'Paris', tz: 'Europe/Paris' },
    { city: 'Tokyo', tz: 'Asia/Tokyo' },
    { city: 'Sydney', tz: 'Australia/Sydney' },
    { city: 'Los Angeles', tz: 'America/Los_Angeles' },
    { city: 'Chicago', tz: 'America/Chicago' },
    { city: 'Moscow', tz: 'Europe/Moscow' },
    { city: 'Dubai', tz: 'Asia/Dubai' },
    { city: 'Shanghai', tz: 'Asia/Shanghai' },
];

const getInitialTimezones = () => {
    try {
        const saved = localStorage.getItem('world-clocks');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error("Failed to parse timezones from localStorage", e);
    }
    return ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
};

const WorldClock: React.FC<ToolProps> = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedTimezones, setSelectedTimezones] = useState<string[]>(getInitialTimezones);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('world-clocks', JSON.stringify(selectedTimezones));
        } catch (e) {
            console.error("Failed to save timezones to localStorage", e);
        }
    }, [selectedTimezones]);
    
    const addTimezone = (tz: string) => {
        if (!selectedTimezones.includes(tz)) {
            setSelectedTimezones([...selectedTimezones, tz]);
        }
    };
    
    const removeTimezone = (tz: string) => {
        setSelectedTimezones(selectedTimezones.filter(t => t !== tz));
    };

    return (
        <ToolContainer title="World Clock">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex gap-2">
                    <select
                        onChange={(e) => addTimezone(e.target.value)}
                        className="flex-grow bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                        value=""
                    >
                        <option value="" disabled>-- Add a city --</option>
                        {TIMEZONES.map(tzInfo => (
                            <option key={tzInfo.tz} value={tzInfo.tz}>{tzInfo.city}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-4">
                    {selectedTimezones.map(tz => (
                        <div key={tz} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{tz.replace(/_/g, ' ').split('/').pop()}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{currentTime.toLocaleDateString(undefined, { timeZone: tz, year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="flex items-center gap-4">
                               <p className="text-3xl font-mono font-bold text-blue-500 dark:text-blue-400">{currentTime.toLocaleTimeString(undefined, { timeZone: tz, hour12: false })}</p>
                                <button onClick={() => removeTimezone(tz)} className="text-gray-500 hover:text-red-500 dark:hover:text-red-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ToolContainer>
    );
};

export default WorldClock;

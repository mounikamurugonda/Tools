'use client';

import React, { useState, useEffect } from 'react';
import Select, { OnChangeValue } from 'react-select';
import type { ToolProps } from '@/types';
import { timezones } from '@/lib/timezones';
import ToolContainer from '@/components/ToolContainer';

interface TimezoneOption {
    value: string;
    label: string;
}

const TIMEZONE_OPTIONS: TimezoneOption[] = timezones.flatMap(group => group.zones.map(zone => ({
    value: zone.value,
    label: `${group.group} / ${zone.label}`
})));

const getInitialTimezones = () => {
    if (typeof window === 'undefined') return ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
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

const WorldClock: React.FC<ToolProps> = ({ details }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);

    useEffect(() => {
        setSelectedTimezones(getInitialTimezones());
    }, []);

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
    
    const addTimezone = (option: OnChangeValue<TimezoneOption, false>) => {
        if (option && !selectedTimezones.includes(option.value)) {
            setSelectedTimezones([...selectedTimezones, option.value]);
        }
    };
    
    const removeTimezone = (tz: string) => {
        setSelectedTimezones(selectedTimezones.filter(t => t !== tz));
    };

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
            color: 'hsl(var(--foreground))',
            width: '100%',
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: 'hsl(0 0% 100%)', // Explicitly white for light mode
            zIndex: 20,
        }),
        option: (provided: any, state: { isFocused: any; }) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'hsl(var(--accent))' : 'hsl(0 0% 100%)',
            color: 'hsl(var(--foreground))',
            '&:hover': {
                backgroundColor: 'hsl(var(--accent))',
            }
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: 'hsl(var(--foreground))',
        }),
        input: (provided: any) => ({
            ...provided,
            color: 'hsl(var(--foreground))',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: 'hsl(var(--muted-foreground))',
        }),
    };

    return (
        <ToolContainer title="World Clock" details={details}>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex gap-2">
                    <Select<TimezoneOption>
                        options={TIMEZONE_OPTIONS}
                        onChange={addTimezone}
                        placeholder="-- Add a city --"
                        value={null}
                        styles={customStyles}
                        className="flex-grow text-gray-800 dark:text-gray-200"
                    />
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

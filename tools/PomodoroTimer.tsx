
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

const PomodoroTimer: React.FC<ToolProps> = ({ details }) => {
    const [mode, setMode] = useState<'work' | 'break'>('work');
    const [time, setTime] = useState(WORK_MINUTES * 60);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);


    const playSound = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);
        gainNode.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 1);
        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + 1);
    }, []);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = window.setInterval(() => {
                setTime(prev => prev - 1);
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);

    useEffect(() => {
        if (time < 0) {
            playSound();
            if (mode === 'work') {
                setMode('break');
                setTime(BREAK_MINUTES * 60);
            } else {
                setMode('work');
                setTime(WORK_MINUTES * 60);
            }
        }
    }, [time, mode, playSound]);

    const toggleTimer = () => {
        setIsActive(prev => !prev);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMode('work');
        setTime(WORK_MINUTES * 60);
    };
    
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const progress = (mode === 'work' ? WORK_MINUTES * 60 - time : BREAK_MINUTES * 60 - time) / (mode === 'work' ? WORK_MINUTES * 60 : BREAK_MINUTES * 60) * 100;

    return (
        <ToolContainer title="Pomodoro Timer" details={details}>
            <div className="flex flex-col items-center space-y-8">
                <div className="relative w-64 h-64">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="12" className="text-gray-200 dark:text-gray-700" />
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="12"
                            strokeDasharray="339.292"
                            strokeDashoffset={339.292 - (progress / 100) * 339.292}
                            className="text-blue-500 transition-all duration-1000"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-5xl font-mono font-bold">{formatTime(time)}</p>
                        <p className="text-lg uppercase tracking-wider text-gray-500 dark:text-gray-400">{mode}</p>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <button onClick={toggleTimer} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg w-32">
                        {isActive ? 'Pause' : 'Start'}
                    </button>
                    <button onClick={resetTimer} className="px-8 py-3 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-lg font-bold text-lg w-32">
                        Reset
                    </button>
                </div>
            </div>
        </ToolContainer>
    );
};

export default PomodoroTimer;
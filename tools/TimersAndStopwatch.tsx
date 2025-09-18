import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

type TimerMode = 'timer' | 'stopwatch';

const formatTime = (timeMs: number) => {
    const totalSeconds = Math.floor(timeMs / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((timeMs % 1000) / 10).toString().padStart(2, '0');
    return { hours, minutes, seconds, milliseconds };
};

const TimersAndStopwatch: React.FC<ToolProps> = () => {
    const [mode, setMode] = useState<TimerMode>('timer');

    return (
        <ToolContainer title="Timers & Stopwatch">
            <div className="max-w-md mx-auto">
                <div className="flex justify-center bg-gray-700 rounded-lg p-1 mb-6">
                    <button onClick={() => setMode('timer')} className={`w-1/2 py-2 rounded-md ${mode === 'timer' ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'}`}>Timer</button>
                    <button onClick={() => setMode('stopwatch')} className={`w-1/2 py-2 rounded-md ${mode === 'stopwatch' ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'}`}>Stopwatch</button>
                </div>
                {mode === 'timer' ? <CountdownTimer /> : <Stopwatch />}
            </div>
        </ToolContainer>
    );
};

const CountdownTimer = () => {
    const [initialTime, setInitialTime] = useState({ h: 0, m: 5, s: 0 });
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number | null>(null);
    
    const notifyUser = useCallback(() => {
        if (Notification.permission === 'granted') {
            new Notification('Timer Finished!', {
                body: 'Your countdown timer has ended.',
                icon: '/favicon.ico',
            });
        }
    }, []);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft(prev => prev - 1000);
            }, 1000);
        } else if (timeLeft <= 0 && isActive) {
            setIsActive(false);
            notifyUser();
            setTimeLeft(0);
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft, notifyUser]);

    const handleStart = () => {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
        if(timeLeft <= 0) { // If starting from zero, set the time from inputs
             setTimeLeft((initialTime.h * 3600 + initialTime.m * 60 + initialTime.s) * 1000);
        }
        setIsActive(true);
    };

    const handlePause = () => setIsActive(false);

    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(0);
        setInitialTime({h: 0, m: 5, s: 0});
    };

    const { hours, minutes, seconds } = formatTime(timeLeft);
    
    return (
        <div className="flex flex-col items-center space-y-6">
             <div className="text-7xl font-mono font-bold tracking-widest">
                {isActive || timeLeft > 0 ? (
                     `${hours}:${minutes}:${seconds}`
                ) : (
                    <div className="flex items-center gap-2">
                        <TimeInput value={initialTime.h} onChange={v => setInitialTime(p => ({...p, h: v}))} max={99} />:
                        <TimeInput value={initialTime.m} onChange={v => setInitialTime(p => ({...p, m: v}))} />:
                        <TimeInput value={initialTime.s} onChange={v => setInitialTime(p => ({...p, s: v}))} />
                    </div>
                )}
            </div>
            <div className="flex space-x-4">
                {!isActive ? 
                    <button onClick={handleStart} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg w-32">Start</button> :
                    <button onClick={handlePause} className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-bold text-lg w-32">Pause</button>
                }
                <button onClick={handleReset} className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold text-lg w-32">Reset</button>
            </div>
        </div>
    )
}

const TimeInput = ({ value, onChange, max = 59 }: { value: number, onChange: (v: number) => void, max?: number }) => (
    <input
        type="number"
        min="0"
        max={max}
        value={value.toString().padStart(2, '0')}
        onChange={e => {
            let val = parseInt(e.target.value, 10);
            if (isNaN(val)) val = 0;
            if (val > max) val = max;
            if (val < 0) val = 0;
            onChange(val);
        }}
        className="w-24 bg-gray-800 border-b-2 border-gray-600 text-center focus:outline-none focus:border-blue-500"
    />
);


const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const intervalRef = useRef<number | null>(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isActive) {
            startTimeRef.current = Date.now() - time;
            intervalRef.current = window.setInterval(() => {
                setTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            if(intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if(intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, time]);
    
    const handleStart = () => setIsActive(true);
    const handleStop = () => setIsActive(false);
    
    const handleReset = () => {
        setIsActive(false);
        setTime(0);
        setLaps([]);
    };
    
    const handleLap = () => {
        setLaps(prev => [...prev, time]);
    };
    
    const { hours, minutes, seconds, milliseconds } = formatTime(time);

    return (
        <div className="flex flex-col items-center space-y-6">
            <div className="text-5xl font-mono font-bold tracking-wider">
                <span>{hours}:{minutes}:{seconds}</span>
                <span className="text-3xl text-blue-400">.{milliseconds}</span>
            </div>
            <div className="flex space-x-4">
                 {!isActive ? 
                    <button onClick={handleStart} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg w-32">Start</button> :
                    <button onClick={handleStop} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-lg w-32">Stop</button>
                }
                <button onClick={handleReset} className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold text-lg w-32">Reset</button>
                <button onClick={handleLap} disabled={!isActive} className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg w-32 disabled:bg-gray-500 disabled:cursor-not-allowed">Lap</button>
            </div>
            <div className="w-full space-y-2 max-h-48 overflow-y-auto">
                {laps.slice().reverse().map((lap, i) => {
                    const { hours, minutes, seconds, milliseconds } = formatTime(lap);
                    return (
                        <div key={i} className="flex justify-between items-center bg-gray-700 p-2 rounded-md font-mono text-sm">
                            <span>Lap {laps.length - i}</span>
                            <span>{hours}:{minutes}:{seconds}.{milliseconds}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}


export default TimersAndStopwatch;

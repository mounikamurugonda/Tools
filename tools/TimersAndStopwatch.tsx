'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';

type TimerMode = 'timer' | 'stopwatch';

const formatTime = (timeMs: number) => {
  const clamped = Math.max(0, timeMs);
  const totalSeconds = Math.floor(clamped / 1000);
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor((clamped % 1000) / 10)
    .toString()
    .padStart(2, '0');
  return { hours, minutes, seconds, milliseconds };
};

const TimersAndStopwatch: React.FC<ToolProps> = ({ details, toolId }) => {
  const [mode, setMode] = useState<TimerMode>('timer');

  return (
    <ToolContainer title="Timers & Stopwatch" details={details} toolId={toolId}>
      <div className="max-w-md mx-auto">
        <div
          className="flex justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6"
          role="tablist"
          aria-label="Mode"
        >
          {(['timer', 'stopwatch'] as TimerMode[]).map(m => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`w-1/2 py-2 rounded-md capitalize transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                mode === m
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {m}
            </button>
          ))}
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
  const deadlineRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const firedRef = useRef(false);

  const notifyUser = useCallback(() => {
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Timer Finished!', { body: 'Your countdown timer has ended.' });
      }
    } catch {
      /* notifications unavailable */
    }
    // Audible beep so backgrounded tabs still alert.
    try {
      const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctx) {
        const ctx = new Ctx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
        osc.start();
        osc.stop(ctx.currentTime + 1);
      }
    } catch {
      /* audio unavailable */
    }
  }, []);

  // Timestamp-based tick: survives tab-backgrounding because we compute
  // remaining time from an absolute deadline, not by decrementing a counter.
  useEffect(() => {
    if (!isActive) return;

    const tick = () => {
      const remaining = deadlineRef.current - Date.now();
      if (remaining <= 0) {
        setTimeLeft(0);
        setIsActive(false);
        if (!firedRef.current) {
          firedRef.current = true;
          notifyUser();
        }
        return;
      }
      setTimeLeft(remaining);
      rafRef.current = window.setTimeout(tick, 100);
    };
    tick();

    return () => {
      if (rafRef.current) clearTimeout(rafRef.current);
    };
  }, [isActive, notifyUser]);

  const handleStart = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
    const base =
      timeLeft > 0 ? timeLeft : (initialTime.h * 3600 + initialTime.m * 60 + initialTime.s) * 1000;
    if (base <= 0) return;
    firedRef.current = false;
    deadlineRef.current = Date.now() + base;
    setTimeLeft(base);
    setIsActive(true);
  };

  const handlePause = () => {
    setTimeLeft(Math.max(0, deadlineRef.current - Date.now()));
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    firedRef.current = false;
    setInitialTime({ h: 0, m: 5, s: 0 });
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);
  const showCountdown = isActive || timeLeft > 0;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div
        className="text-5xl font-mono font-bold tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2"
        aria-live="polite"
      >
        {showCountdown ? (
          <>
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </>
        ) : (
          <>
            <TimeInput
              label="hours"
              value={initialTime.h}
              onChange={v => setInitialTime(p => ({ ...p, h: v }))}
              max={99}
            />
            :
            <TimeInput
              label="minutes"
              value={initialTime.m}
              onChange={v => setInitialTime(p => ({ ...p, m: v }))}
            />
            :
            <TimeInput
              label="seconds"
              value={initialTime.s}
              onChange={v => setInitialTime(p => ({ ...p, s: v }))}
            />
          </>
        )}
      </div>
      <div className="flex gap-4">
        {!isActive ? (
          <Button onClick={handleStart} size="lg" className="w-32">
            Start
          </Button>
        ) : (
          <Button onClick={handlePause} variant="danger" size="lg" className="w-32">
            Pause
          </Button>
        )}
        <Button onClick={handleReset} variant="secondary" size="lg" className="w-32">
          Reset
        </Button>
      </div>
    </div>
  );
};

const TimeInput = ({
  value,
  onChange,
  max = 59,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
  label: string;
}) => (
  <input
    type="number"
    min="0"
    max={max}
    aria-label={label}
    value={value.toString().padStart(2, '0')}
    onChange={e => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val)) val = 0;
      if (val > max) val = max;
      if (val < 0) val = 0;
      onChange(val);
    }}
    className="w-24 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-center focus:outline-none focus:border-blue-500 p-2"
  />
);

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);

  // Timestamp-based: anchor to an absolute start so backgrounding the tab
  // doesn't lose elapsed time.
  useEffect(() => {
    if (!isActive) return;
    startTimeRef.current = Date.now() - time;
    const tick = () => {
      setTime(Date.now() - startTimeRef.current);
      rafRef.current = window.setTimeout(tick, 16);
    };
    tick();
    return () => {
      if (rafRef.current) clearTimeout(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const handleStart = () => setIsActive(true);
  const handleStop = () => setIsActive(false);

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => setLaps(prev => [...prev, time]);

  const { hours, minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div
        className="text-5xl font-mono font-bold tracking-wider text-gray-800 dark:text-gray-200"
        aria-live="off"
      >
        <span>
          {hours}:{minutes}:{seconds}
        </span>
        <span className="text-3xl text-blue-500 dark:text-blue-400">.{milliseconds}</span>
      </div>
      <div className="flex gap-4">
        {!isActive ? (
          <Button onClick={handleStart} size="lg" className="w-28">
            Start
          </Button>
        ) : (
          <Button onClick={handleStop} variant="danger" size="lg" className="w-28">
            Stop
          </Button>
        )}
        <Button onClick={handleReset} variant="secondary" size="lg" className="w-28">
          Reset
        </Button>
        <Button onClick={handleLap} disabled={!isActive} variant="success" size="lg" className="w-28">
          Lap
        </Button>
      </div>
      {laps.length > 0 && (
        <div className="w-full space-y-2 max-h-48 overflow-y-auto" data-lenis-prevent>
          {laps
            .slice()
            .reverse()
            .map((lap, i) => {
              const t = formatTime(lap);
              const prevLap = laps[laps.length - 2 - i] ?? 0;
              const split = formatTime(lap - prevLap);
              return (
                <div
                  key={laps.length - i}
                  className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md font-mono text-sm text-gray-800 dark:text-gray-200"
                >
                  <span>Lap {laps.length - i}</span>
                  <span className="text-gray-400 dark:text-gray-500">
                    +{split.minutes}:{split.seconds}.{split.milliseconds}
                  </span>
                  <span>
                    {t.hours}:{t.minutes}:{t.seconds}.{t.milliseconds}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default TimersAndStopwatch;

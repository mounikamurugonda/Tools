'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';

type Mode = 'work' | 'break' | 'longBreak';

const DURATIONS: Record<Mode, number> = {
  work: 25 * 60,
  break: 5 * 60,
  longBreak: 15 * 60,
};

const LABELS: Record<Mode, string> = {
  work: 'Focus',
  break: 'Short Break',
  longBreak: 'Long Break',
};

const LONG_BREAK_EVERY = 4;

const PomodoroTimer: React.FC<ToolProps> = ({ details, toolId }) => {
  const [mode, setMode] = useState<Mode>('work');
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work);
  const [isActive, setIsActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const deadlineRef = useRef(0);
  const tickRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const advanceRef = useRef<() => void>(() => {});

  const playSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as typeof window & { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (!Ctx) return;
        audioContextRef.current = new Ctx();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
      osc.start();
      osc.stop(ctx.currentTime + 1);
    } catch {
      /* audio unavailable */
    }
  }, []);

  const notify = useCallback((body: string) => {
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Timer', { body });
      }
    } catch {
      /* notifications unavailable */
    }
  }, []);

  // Decide the next phase when the current one ends.
  const advance = useCallback(() => {
    playSound();
    if (mode === 'work') {
      const nextCompleted = completedSessions + 1;
      setCompletedSessions(nextCompleted);
      const goLong = nextCompleted % LONG_BREAK_EVERY === 0;
      const next: Mode = goLong ? 'longBreak' : 'break';
      notify(goLong ? 'Great work! Take a long break.' : 'Time for a short break.');
      setMode(next);
      setTimeLeft(DURATIONS[next]);
    } else {
      notify('Break over — back to focus.');
      setMode('work');
      setTimeLeft(DURATIONS.work);
    }
    setIsActive(false);
  }, [mode, completedSessions, notify, playSound]);

  advanceRef.current = advance;

  // Timestamp-based countdown — survives tab-backgrounding.
  useEffect(() => {
    if (!isActive) return;
    const tick = () => {
      const remaining = Math.round((deadlineRef.current - Date.now()) / 1000);
      if (remaining <= 0) {
        setTimeLeft(0);
        advanceRef.current();
        return;
      }
      setTimeLeft(remaining);
      tickRef.current = window.setTimeout(tick, 250);
    };
    tick();
    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);
    };
  }, [isActive]);

  const toggleTimer = () => {
    if (!isActive) {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().catch(() => {});
      }
      deadlineRef.current = Date.now() + timeLeft * 1000;
    } else {
      setTimeLeft(Math.max(0, Math.round((deadlineRef.current - Date.now()) / 1000)));
    }
    setIsActive(prev => !prev);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(DURATIONS[mode]);
  };

  const switchMode = (next: Mode) => {
    setIsActive(false);
    setMode(next);
    setTimeLeft(DURATIONS[next]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const total = DURATIONS[mode];
  const progress = ((total - timeLeft) / total) * 100;
  const ringColor =
    mode === 'work'
      ? 'text-blue-500'
      : mode === 'longBreak'
        ? 'text-purple-500'
        : 'text-green-500';

  return (
    <ToolContainer title="Pomodoro Timer" details={details} toolId={toolId}>
      <div className="flex flex-col items-center space-y-10 py-6">
        <div
          className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1"
          role="tablist"
          aria-label="Session type"
        >
          {(['work', 'break', 'longBreak'] as Mode[]).map(m => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => switchMode(m)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                mode === m
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {LABELS[m]}
            </button>
          ))}
        </div>

        <div className="relative w-72 h-72 sm:w-80 sm:h-80">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-100 dark:text-gray-800"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="339.292"
              strokeDashoffset={339.292 - (progress / 100) * 339.292}
              className={`transition-all duration-500 ${ringColor}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p
              className="text-5xl font-bold font-mono text-gray-900 dark:text-white mb-2"
              aria-live="polite"
            >
              {formatTime(timeLeft)}
            </p>
            <p className="text-lg uppercase tracking-widest text-gray-500 dark:text-gray-400 font-medium">
              {LABELS[mode]}
            </p>
          </div>
        </div>

        <div className="flex gap-4 w-full max-w-md justify-center">
          <Button onClick={toggleTimer} size="lg" className="w-40">
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} variant="secondary" size="lg" className="w-40">
            Reset
          </Button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Completed focus sessions: <span className="font-semibold">{completedSessions}</span>
        </p>
      </div>
    </ToolContainer>
  );
};

export default PomodoroTimer;


import { useState, useEffect, useRef, useCallback } from 'react';
import { SPEEDS } from '../constants';
import { TypingSpeed, SoundType } from '../types';
import { playKeySound } from '../utils/sound';

interface UseTypingEngineProps {
  fullText: string;
  speed: TypingSpeed;
  isPlaying: boolean;
  soundEnabled: boolean;
  soundType: SoundType;
  onComplete?: () => void;
}

export const useTypingEngine = ({
  fullText,
  speed,
  isPlaying,
  soundEnabled,
  soundType,
  onComplete
}: UseTypingEngineProps) => {
  const [cursorIndex, setCursorIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  // Track previous text to handle tab switches synchronously
  const [prevFullText, setPrevFullText] = useState(fullText);

  // Derived state reset: if fullText changes, reset immediately
  if (fullText !== prevFullText) {
    setPrevFullText(fullText);
    setCursorIndex(0);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  // Derive displayed text from cursor index
  const displayedText = fullText.slice(0, cursorIndex);

  // Keep onComplete in a ref to avoid dependency cycles
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // If paused or finished, stop.
    if (!isPlaying || cursorIndex >= fullText.length) {
      if (cursorIndex >= fullText.length && isPlaying) {
        // Finished just now
        onCompleteRef.current?.();
      }
      return;
    }

    const typeNext = () => {
      setCursorIndex((prev) => prev + 1);
    };

    // Calculate delay and sound for the character we are about to type
    // We are at `cursorIndex`, so we are about to "type" fullText[cursorIndex]
    const nextChar = fullText[cursorIndex];

    // Sound Effect
    if (soundEnabled) {
      // Logic checks if we play sound for this char. 
      // Original logic: if (char !== ' ' || Math.random() > 0.6)
      if (nextChar !== ' ' || Math.random() > 0.6) {
        playKeySound(soundType);
      }
    }

    // Delay Calculation
    let delay = 0;
    if (speed === 'instant') {
      delay = 0;
    } else {
      const { min, max } = SPEEDS[speed];
      delay = Math.floor(Math.random() * (max - min + 1)) + min;

      if (nextChar === '\n') delay += 300;
      if (['.', ';', '}', ')'].includes(nextChar)) delay += 150;
    }

    // Schedule next character
    timeoutRef.current = window.setTimeout(typeNext, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [cursorIndex, isPlaying, fullText, speed, soundEnabled, soundType]);

  const reset = () => {
    setCursorIndex(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const jumpToEnd = () => {
    setCursorIndex(fullText.length);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return { displayedText, reset, jumpToEnd };
};

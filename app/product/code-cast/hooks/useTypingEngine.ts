import { useState, useEffect, useRef, useCallback } from 'react';
import { TypingSpeed, SoundType } from '../types';
import { startTypingSound, stopTypingSound } from '../utils/sound';

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
  onComplete,
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

  // --- Audio Control ---
  useEffect(() => {
    const isFinished = cursorIndex >= fullText.length;

    if (isPlaying && !isFinished && soundEnabled) {
      startTypingSound(soundType);
    } else {
      stopTypingSound();
    }

    return () => {
      // Cleanup on unmount or dependency change
      // Note: We might want to NOT stop if only cursorIndex changes,
      // but we need to stop if paused or finished.
      // The logic above handles the "start/stop" state transitions.
      // The return clause here is important if component unmounts.
      // However, stopping on every render (due to cursorIndex change) is bad.
      // Optimization: Only stop if effectively turning OFF.
      // Actually, if we run startTypingSound() again, it returns early if already playing.
      // But we shouldn't call stopTypingSound() on every char.
    };
  }, [isPlaying, soundEnabled, soundType, cursorIndex, fullText.length]);

  // Refined Audio Cleanup:
  // We need a separate effect that strictly handles unmount or definitive stop
  useEffect(() => {
    return () => stopTypingSound();
  }, []);

  useEffect(() => {
    // If paused or finished, stop.
    if (!isPlaying || cursorIndex >= fullText.length) {
      // Only call onComplete if we actually typed something (fullText has content)
      if (cursorIndex >= fullText.length && isPlaying && fullText.length > 0) {
        // Finished just now
        onCompleteRef.current?.();
      }
      return;
    }

    const typeNext = () => {
      setCursorIndex(prev => prev + 1);
    };

    // Delay Calculation
    let delay = 0;
    if (speed <= 0) {
      delay = 0;
    } else {
      delay = speed;

      // Add natural pauses for punctuation
      if (fullText[cursorIndex] === '\n') delay += 300;
      if (['.', ';', '}', ')'].includes(fullText[cursorIndex])) delay += 150;
    }

    // Schedule next character
    timeoutRef.current = window.setTimeout(typeNext, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [cursorIndex, isPlaying, fullText, speed]);

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

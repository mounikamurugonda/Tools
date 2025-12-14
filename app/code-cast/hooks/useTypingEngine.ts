
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
  const [displayedText, setDisplayedText] = useState('');
  const [cursorIndex, setCursorIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  
  // Track previous text to handle tab switches synchronously
  const [prevFullText, setPrevFullText] = useState(fullText);

  // Derived state reset: if fullText changes, reset immediately before render
  if (fullText !== prevFullText) {
    setPrevFullText(fullText);
    setDisplayedText('');
    setCursorIndex(0);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  const typeNextChar = useCallback(() => {
    if (!isPlaying) return;

    setCursorIndex((prev) => {
      const nextIndex = prev + 1;
      
      // Check length against CURRENT fullText (in closure, or via ref if needed, 
      // but since we reset on fullText change, 'prev' logic holds up)
      if (nextIndex > fullText.length) {
        if (onComplete) onComplete();
        return prev;
      }

      setDisplayedText(fullText.slice(0, nextIndex));

      // Sound effect
      if (soundEnabled) {
        const char = fullText[nextIndex - 1];
        if (char !== ' ' || Math.random() > 0.6) {
             playKeySound(soundType);
        }
      }

      // Calculate delay
      let delay = 0;
      if (speed === 'instant') {
        delay = 0;
      } else {
        const { min, max } = SPEEDS[speed];
        delay = Math.floor(Math.random() * (max - min + 1)) + min;

        const char = fullText[nextIndex - 1];
        if (char === '\n') delay += 300;
        if (['.', ';', '}', ')'].includes(char)) delay += 150;
      }

      timeoutRef.current = window.setTimeout(typeNextChar, delay);
      return nextIndex;
    });
  }, [fullText, isPlaying, speed, soundEnabled, soundType, onComplete]);

  // Start/Stop effect
  useEffect(() => {
    // If we are playing, and haven't finished, start the loop.
    // We also trigger this when fullText changes (via the dependency) to restart the loop for new text.
    if (isPlaying && cursorIndex < fullText.length) {
      // Clear any existing timeout before starting a new one to prevent dupes
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(typeNextChar, 50);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, fullText, typeNextChar]); // Added fullText dependency

  const reset = () => {
    setDisplayedText('');
    setCursorIndex(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const jumpToEnd = () => {
    setDisplayedText(fullText);
    setCursorIndex(fullText.length);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return { displayedText, reset, jumpToEnd };
};

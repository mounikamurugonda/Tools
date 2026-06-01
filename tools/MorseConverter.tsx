'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ConverterLayout from '@/components/ConverterLayout';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { ArrowLeftRight, Play, Square } from 'lucide-react';

const MORSE_MAP: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/',
};

const REVERSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([char, code]) => [code, char])
);

const toMorse = (text: string) =>
  (text || '')
    .toUpperCase()
    .split('')
    .map(c => MORSE_MAP[c] ?? c)
    .join(' ');

const toText = (morse: string) =>
  (morse || '')
    .trim()
    .split(' ')
    .map(c => REVERSE_MAP[c] ?? (c === '' ? '' : c))
    .join('');

// Standard Morse timing: dot = 1 unit, dash = 3 units, intra-char gap = 1,
// letter gap = 3, word gap = 7. We map units to seconds via a WPM-ish base.
const UNIT = 0.08; // seconds per unit
const FREQ = 600; // Hz — classic CW tone

const MorseConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [mode, setMode] = useState<'text-to-morse' | 'morse-to-text'>('text-to-morse');
  const [input, setInput] = useState('HELLO WORLD');
  const [output, setOutput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const toast = useToast();

  const audioCtxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef(false);

  useEffect(() => {
    setOutput(mode === 'text-to-morse' ? toMorse(input) : toText(input));
  }, [input, mode]);

  const swapMode = () => {
    setMode(prev => (prev === 'text-to-morse' ? 'morse-to-text' : 'text-to-morse'));
    setInput(output);
  };

  // The Morse string we want to sonify is whichever side currently holds code.
  const morseToPlay = mode === 'text-to-morse' ? output : input;

  const stopPlayback = useCallback(() => {
    stopRef.current = true;
    setIsPlaying(false);
    try {
      audioCtxRef.current?.close();
    } catch {
      /* already closed */
    }
    audioCtxRef.current = null;
  }, []);

  const playMorse = useCallback(async () => {
    const code = morseToPlay.trim();
    if (!code) {
      toast.info('Nothing to play');
      return;
    }
    try {
      const Ctx =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) {
        toast.error('Web Audio is not supported in this browser');
        return;
      }
      stopRef.current = false;
      setIsPlaying(true);
      const ctx = new Ctx();
      audioCtxRef.current = ctx;

      let t = ctx.currentTime + 0.05;
      for (const symbol of code) {
        if (stopRef.current) break;
        if (symbol === '.') {
          scheduleBeep(ctx, t, UNIT);
          t += UNIT + UNIT; // tone + intra-char gap
        } else if (symbol === '-') {
          scheduleBeep(ctx, t, UNIT * 3);
          t += UNIT * 3 + UNIT;
        } else if (symbol === ' ') {
          t += UNIT * 2; // letter gap (≈3 total with trailing intra gap)
        } else if (symbol === '/') {
          t += UNIT * 6; // word gap
        }
      }

      const totalMs = Math.max(0, (t - ctx.currentTime) * 1000);
      window.setTimeout(() => {
        if (!stopRef.current) stopPlayback();
      }, totalMs);
    } catch {
      toast.error('Could not play audio');
      stopPlayback();
    }
  }, [morseToPlay, stopPlayback, toast]);

  useEffect(() => () => stopPlayback(), [stopPlayback]);

  const headerOptions = (
    <div className="flex flex-wrap items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
      <Button onClick={swapMode} variant="secondary" title="Swap Mode">
        <ArrowLeftRight className="w-4 h-4 mr-2" />
        {mode === 'text-to-morse' ? 'Text → Morse' : 'Morse → Text'}
      </Button>
      <Button
        onClick={isPlaying ? stopPlayback : playMorse}
        variant={isPlaying ? 'danger' : 'primary'}
        disabled={!morseToPlay.trim()}
        title="Play Morse audio"
      >
        {isPlaying ? (
          <>
            <Square className="w-4 h-4 mr-2 fill-current" /> Stop
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2 fill-current" /> Play Audio
          </>
        )}
      </Button>
    </div>
  );

  return (
    <ConverterLayout
      title="Morse Code Converter"
      details={details}
      toolId={toolId}
      options={headerOptions}
      actions={null}
      editorInput={{
        value: input,
        onChange: setInput,
        language: 'plaintext',
        label: mode === 'text-to-morse' ? 'Text Input' : 'Morse Input',
        placeholder: mode === 'text-to-morse' ? 'Enter text here...' : 'Enter morse code here...',
        clearable: true,
        fileUpload: true,
        acceptFileTypes: '.txt',
      }}
      editorOutput={{
        value: output,
        language: 'plaintext',
        label: mode === 'text-to-morse' ? 'Morse Output' : 'Text Output',
        readOnly: true,
        placeholder: 'Result will appear here...',
      }}
    />
  );
};

function scheduleBeep(ctx: AudioContext, start: number, duration: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = FREQ;
  osc.connect(gain);
  gain.connect(ctx.destination);
  // Short ramps avoid clicks at edges.
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(0.3, start + 0.005);
  gain.gain.setValueAtTime(0.3, start + duration - 0.005);
  gain.gain.linearRampToValueAtTime(0, start + duration);
  osc.start(start);
  osc.stop(start + duration);
}

export default MorseConverter;

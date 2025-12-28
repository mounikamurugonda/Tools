
import { SoundType } from '../types';
import { SOUND_PRESETS } from '../constants';

let audioCtx: AudioContext | null = null;
const buffers: Record<string, AudioBuffer> = {};
let currentSource: AudioBufferSourceNode | null = null;
let gainNode: GainNode | null = null;

// State flags to handle async race conditions
let isStarting = false;
let abortStart = false;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
};

const loadSound = async (type: SoundType) => {
  if (!audioCtx) initAudio();
  if (!audioCtx) return;

  if (buffers[type]) return buffers[type];

  try {
    const url = SOUND_PRESETS[type];
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    buffers[type] = audioBuffer;
    return audioBuffer;
  } catch (error) {
    console.error(`Failed to load sound: ${type}`, error);
    return null;
  }
};

export const startTypingSound = async (type: SoundType = 'deep') => {
  // Reset abort flag for this new attempt
  abortStart = false;

  // Prevent multiple concurrent start attempts or starting if already playing
  if (currentSource || isStarting) return;

  isStarting = true;

  try {
    if (!audioCtx) initAudio();
    if (!audioCtx) return;

    // Resume if suspended (async)
    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    // Check if we were told to stop while waiting for resume
    if (abortStart) return;

    let buffer = buffers[type];
    if (!buffer) {
      buffer = await loadSound(type) as AudioBuffer;
    }

    // Check again after load
    if (abortStart || !buffer) return;

    // Safety check: is something else playing now?
    if (currentSource) return;

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.loop = true; // Loop the track

    const gain = audioCtx.createGain();
    gain.gain.value = 0.5;

    source.connect(gain);
    gain.connect(audioCtx.destination);

    source.start(0);
    currentSource = source;
    gainNode = gain;
  } catch (err) {
    console.error("Error starting sound:", err);
  } finally {
    isStarting = false;
  }
};

export const stopTypingSound = () => {
  // Signal any pending start operations to abort
  abortStart = true;

  if (currentSource) {
    try {
      // Optional: fade out
      if (gainNode && audioCtx && audioCtx.state === 'running') {
        // Cancel any scheduled values to force immediate control
        gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);

        const oldSource = currentSource;
        setTimeout(() => {
          try { oldSource.stop(); } catch (e) { }
        }, 150);
      } else {
        // If context isn't running or trouble, stop immediately
        currentSource.stop();
      }
    } catch (e) {
      // ignore if already stopped
    }
    currentSource = null;
    gainNode = null;
  }
};

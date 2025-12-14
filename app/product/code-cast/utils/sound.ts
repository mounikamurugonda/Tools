
import { SoundType } from '../types';

let audioCtx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
};

const getNoiseBuffer = (ctx: AudioContext) => {
  if (noiseBuffer) return noiseBuffer;
  const bufferSize = ctx.sampleRate * 0.1; // 0.1s buffer
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  noiseBuffer = buffer;
  return buffer;
};

// 1. THOCK (Deep, Marbly, Creamy)
const playThock = (ctx: AudioContext, t: number) => {
  const noise = ctx.createBufferSource();
  noise.buffer = getNoiseBuffer(ctx);
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.setValueAtTime(600, t);
  noiseFilter.Q.value = 0.5;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.4, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
  
  noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
  noise.start(t);

  const osc = ctx.createOscillator();
  osc.frequency.setValueAtTime(300, t);
  osc.frequency.exponentialRampToValueAtTime(50, t + 0.08);
  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.3, t);
  oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
  
  osc.connect(oscGain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.1);
};

// 2. CLICKY (High-pitch, Cherry MX Blue)
const playClicky = (ctx: AudioContext, t: number) => {
  const noise = ctx.createBufferSource();
  noise.buffer = getNoiseBuffer(ctx);
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.setValueAtTime(2000, t); // High frequency click
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.3, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.02); // Very short

  noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
  noise.start(t);

  // High pitch tick
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1200, t);
  osc.frequency.exponentialRampToValueAtTime(800, t + 0.03);
  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.2, t);
  oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.03);

  osc.connect(oscGain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.05);
};

// 3. MEMBRANE (Soft, Quiet, Laptop)
const playMembrane = (ctx: AudioContext, t: number) => {
  const noise = ctx.createBufferSource();
  noise.buffer = getNoiseBuffer(ctx);
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.setValueAtTime(400, t);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.2, t); // Quieter
  noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.04);
  
  noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
  noise.start(t);
};

// 4. TYPEWRITER (Metallic, Loud, Vintage)
const playTypewriter = (ctx: AudioContext, t: number) => {
  // Heavy latch sound
  const noise = ctx.createBufferSource();
  noise.buffer = getNoiseBuffer(ctx);
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(800, t);
  noiseFilter.Q.value = 1;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.6, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.06);
  noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
  noise.start(t);

  // Metallic ring
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(2200, t); // High ring
  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.1, t);
  oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.15); // Longer decay
  
  osc.connect(oscGain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.2);
};

// 5. BUBBLE (Fun, Pop, Synthetic)
const playBubble = (ctx: AudioContext, t: number) => {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  // Pitch sweep up for bubble effect
  osc.frequency.setValueAtTime(400, t);
  osc.frequency.linearRampToValueAtTime(800, t + 0.05);
  
  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.3, t);
  oscGain.gain.linearRampToValueAtTime(0.01, t + 0.05);

  osc.connect(oscGain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.06);
};

export const playKeySound = (type: SoundType = 'thock') => {
  if (!audioCtx) initAudio();
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const t = audioCtx.currentTime;

  switch (type) {
    case 'clicky':
      playClicky(audioCtx, t);
      break;
    case 'typewriter':
      playTypewriter(audioCtx, t);
      break;
    case 'membrane':
      playMembrane(audioCtx, t);
      break;
    case 'bubble':
      playBubble(audioCtx, t);
      break;
    case 'thock':
    default:
      playThock(audioCtx, t);
      break;
  }
};

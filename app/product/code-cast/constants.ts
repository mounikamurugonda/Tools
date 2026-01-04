import { SoundType, Theme, DeviceFrame } from './types';

// Sound Assets
export const SOUND_PRESETS = {
  deep: '/keyboard-typing.mp3', // Signature Deep
  crisp: '/keyboard-typing-1.mp3', // Signature Crisp
};

interface BackgroundPreset {
  id: string;
  label: string;
  value: string; // CSS class(es)
  isDark: boolean; // true if text should be white, false if text should be dark
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  // --- Brand & Modern Dark ---
  {
    id: 'codecast-gradient',
    label: 'CodeCast Vivid',
    value: 'bg-gradient-to-br from-blue-600 to-purple-600',
    isDark: true,
  },
  {
    id: 'deep-space',
    label: 'Deep Space',
    value: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    isDark: true,
  },
  {
    id: 'midnight-bloom',
    label: 'Midnight Bloom',
    value: 'bg-gradient-to-bl from-indigo-900 via-purple-900 to-pink-900',
    isDark: true,
  },
  {
    id: 'cyber-dim',
    label: 'Cyber Dim',
    value: 'bg-gradient-to-r from-slate-900 to-slate-800',
    isDark: true,
  },

  // --- Modern Vibrant ---
  {
    id: 'electric-violet',
    label: 'Electric Violet',
    value: 'bg-gradient-to-tr from-violet-600 to-indigo-600',
    isDark: true,
  },
  {
    id: 'oceanic-depths',
    label: 'Oceanic Depths',
    value: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-900',
    isDark: true,
  },
  {
    id: 'neon-twilight',
    label: 'Neon Twilight',
    value: 'bg-gradient-to-r from-fuchsia-600 to-purple-600',
    isDark: true,
  },
  {
    id: 'azure-pop',
    label: 'Azure Pop',
    value: 'bg-gradient-to-bl from-blue-500 to-cyan-500',
    isDark: true,
  },

  // --- Smooth & Subtle ---
  {
    id: 'glass-dark',
    label: 'Glass Dark',
    value: 'bg-gradient-to-br from-gray-900 to-gray-800',
    isDark: true,
  },
  {
    id: 'royal-mist',
    label: 'Royal Mist',
    value: 'bg-gradient-to-tr from-slate-800 via-violet-900/50 to-slate-900',
    isDark: true,
  },
  {
    id: 'sunset-vibe',
    label: 'Sunset Vibe',
    value: 'bg-gradient-to-br from-rose-500 to-orange-400',
    isDark: true,
  },
  {
    id: 'pure-black',
    label: 'Pure Black',
    value: 'bg-black',
    isDark: true,
  },
];

export const EDITOR_THEMES: { id: Theme; label: string; type: 'dark' | 'light' }[] = [
  { id: 'dark', label: 'Dark', type: 'dark' },
  { id: 'light', label: 'Light', type: 'light' },
];

export const FONT_SIZES = [12, 13, 14, 15, 16, 18, 20, 24];

export const FRAME_OPTIONS: { id: DeviceFrame; label: string; group: string }[] = [
  { id: 'minimal', label: 'Full Width / Responsive', group: 'Standard' },
  { id: 'browser', label: 'Desktop / Landscape (16:9)', group: 'Standard' },
  { id: 'linkedin-post', label: 'Portrait (4:5)', group: 'Social Media' },
  { id: 'instagram-square', label: 'Square (1:1)', group: 'Social Media' },
  { id: 'tiktok-shorts', label: 'Vertical / Shorts (9:16)', group: 'Social Media' },
];

export const DEFAULT_CODE = {
  html: `<div class="body">
  <div class="card">
  <div class="header">
    <div class="avatar"></div>
    <div class="title">Hello World</div>
  </div>
  <div class="content">
    <p>Welcome to CodeCast.</p>
    <p>This is a live typing demo.</p>
  </div>
  <button>Get Started</button>
</div>
</div>`,
  css: `.body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  background: #f3f4f6;
  font-family: system-ui, sans-serif;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  width: 280px;
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border-radius: 50%;
}

.title {
  font-weight: 700;
  color: #1f2937;
}

.content {
  color: #4b5563;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 24px;
}

button {
  width: 100%;
  padding: 10px;
  background: #111827;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.1s;
}

button:active {
  transform: scale(0.98);
}`,
  js: `const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  btn.textContent = 'Copied!';
  btn.style.background = '#059669';
  
  setTimeout(() => {
    btn.textContent = 'Get Started';
    btn.style.background = '#111827';
  }, 2000);
});`,
};

export const SPEEDS = {
  slow: { min: 100, max: 150 },
  normal: { min: 50, max: 70 },
  fast: { min: 20, max: 30 },
  instant: { min: 0, max: 0 },
};

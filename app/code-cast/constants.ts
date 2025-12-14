
import { SoundType, Theme, DeviceFrame } from './types';

// Short mechanical keyboard click sound (Base64 encoded WAV)
export const KEYPRESS_SOUND_URL = 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAD//w=='; 

export interface BackgroundPreset {
  id: string;
  label: string;
  value: string; // CSS class(es)
  isDark: boolean; // true if text should be white, false if text should be dark
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  { 
    id: 'cosmic', 
    label: 'Cosmic', 
    value: 'bg-gray-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-gray-950 to-gray-950', 
    isDark: true 
  },
  { 
    id: 'midnight', 
    label: 'Midnight', 
    value: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black', 
    isDark: true 
  },
  { 
    id: 'candy', 
    label: 'Candy', 
    value: 'bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500', 
    isDark: true 
  },
  { 
    id: 'unicorn', 
    label: 'Unicorn', 
    value: 'bg-gradient-to-tr from-violet-200 to-pink-200', 
    isDark: false 
  },
  { 
    id: 'ocean', 
    label: 'Ocean', 
    value: 'bg-gradient-to-br from-cyan-500 to-blue-600', 
    isDark: true 
  },
  { 
    id: 'forest', 
    label: 'Forest', 
    value: 'bg-gradient-to-br from-emerald-500 to-teal-700', 
    isDark: true 
  },
  { 
    id: 'sunset', 
    label: 'Sunset', 
    value: 'bg-gradient-to-br from-orange-400 to-rose-400', 
    isDark: true 
  },
  { 
    id: 'peach', 
    label: 'Peach', 
    value: 'bg-gradient-to-br from-orange-100 to-rose-100', 
    isDark: false 
  },
  { 
    id: 'sky', 
    label: 'Sky', 
    value: 'bg-gradient-to-b from-sky-300 to-indigo-400', 
    isDark: true 
  },
  { 
    id: 'solid-black', 
    label: 'Black', 
    value: 'bg-black', 
    isDark: true 
  },
  { 
    id: 'solid-gray', 
    label: 'Dark Gray', 
    value: 'bg-[#121212]', 
    isDark: true 
  },
  { 
    id: 'solid-white', 
    label: 'White', 
    value: 'bg-gray-100', 
    isDark: false 
  },
];

export const EDITOR_THEMES: { id: Theme; label: string; type: 'dark' | 'light' }[] = [
  { id: 'dark', label: 'Default Dark', type: 'dark' },
  { id: 'light', label: 'Default Light', type: 'light' },
  { id: 'github', label: 'GitHub Light', type: 'light' },
  { id: 'dracula', label: 'Dracula', type: 'dark' },
  { id: 'monokai', label: 'Monokai', type: 'dark' },
  { id: 'twilight', label: 'Twilight', type: 'dark' },
  { id: 'nord', label: 'Nord', type: 'dark' },
  { id: 'solarized-dark', label: 'Solarized Dark', type: 'dark' },
  { id: 'solarized-light', label: 'Solarized Light', type: 'light' },
  { id: 'synthwave', label: 'Synthwave', type: 'dark' },
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
  html: `<div class="card">
  <div class="header">
    <div class="avatar"></div>
    <div class="title">Hello World</div>
  </div>
  <div class="content">
    <p>Welcome to CodeCast.</p>
    <p>This is a live typing demo.</p>
  </div>
  <button>Get Started</button>
</div>`,
  css: `body {
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
});`
};

export const SPEEDS = {
  slow: { min: 80, max: 150 },
  normal: { min: 30, max: 70 },
  fast: { min: 10, max: 30 },
  instant: { min: 0, max: 0 },
};

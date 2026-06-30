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
  credit?: string; // Optional credit for the background source
  imageUrl?: string; // Optional URL for image-based backgrounds
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

  // --- Modern Vibrant ---

  {
    id: 'oceanic-depths',
    label: 'Oceanic Depths',
    value: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-900',
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
    id: 'pure-black',
    label: 'Pure Black',
    value: 'bg-black',
    isDark: true,
  },

  // --- Custom Patterns ---
  {
    id: 'aurora-dream',
    label: 'Aurora Dream',
    value: 'aurora-dream',
    isDark: false,
  },
  {
    id: 'zigzag-lightning',
    label: 'Zigzag Lightning',
    value: 'zigzag-lightning',
    isDark: false,
  },
  {
    id: 'clean-grid',
    label: 'Clean Grid',
    value: 'clean-grid',
    isDark: false,
  },
  {
    id: 'tropical-dusk',
    label: 'Tropical Dusk',
    value: 'tropical-dusk',
    isDark: true,
  },
  {
    id: 'purple-radial',
    label: 'Purple Radial',
    value: 'purple-radial',
    isDark: true,
  },
  {
    id: 'dual-gradient',
    label: 'Dual Gradient',
    value: 'dual-gradient',
    isDark: false,
  },
  {
    id: 'crimson-shadow',
    label: 'Crimson Shadow',
    value: 'crimson-shadow',
    isDark: true,
  },
  {
    id: 'rose-corner',
    label: 'Rose Corner',
    value: 'rose-corner',
    isDark: false,
  },
  {
    id: 'diagonal-stripes',
    label: 'Diagonal Stripes',
    value: 'diagonal-stripes',
    isDark: false,
  },
  {
    id: 'circuit-board',
    label: 'Circuit Board',
    value: 'circuit-board',
    isDark: false,
  },
  // --- Vector Patterns ---
  {
    id: 'vector-dots',
    label: 'Vector Dots',
    value: 'vector-dots',
    isDark: false,
  },
  {
    id: 'vector-blueprint',
    label: 'Blueprint',
    value: 'vector-blueprint',
    isDark: true,
  },
  {
    id: 'abstract-waves',
    label: 'Abstract Waves',
    value: 'abstract-waves',
    isDark: true,
  },
  {
    id: 'hexati-pattern',
    label: 'Hexati Pattern',
    value: 'hexati-pattern',
    isDark: true,
  },
  // --- Photographic (Unsplash) ---
  {
    id: 'unsplash-desk',
    label: 'Modern Desk',
    value: 'unsplash-desk',
    isDark: true,
    credit: 'Photo by Nubelson Fernandes on Unsplash',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'unsplash-code',
    label: 'Code Screen',
    value: 'unsplash-code',
    isDark: true,
    credit: 'Photo by Safar Safarov on Unsplash',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'unsplash-nature',
    label: 'Misty Mountains',
    value: 'unsplash-nature',
    isDark: true,
    credit: 'Photo by Eberhard Grossgasteiger on Unsplash',
    imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'unsplash-abstract',
    label: 'Abstract Fluid',
    value: 'unsplash-abstract',
    isDark: true,
    credit: 'Photo by Pawel Czerwinski on Unsplash',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  },
  // --- Abstract Art (Flow/Lines/Shapes) ---
  {
    id: 'unsplash-neon-flow',
    label: 'Neon Flow',
    value: 'unsplash-neon-flow',
    isDark: true,
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'unsplash-spiral',
    label: 'Golden Spiral',
    value: 'unsplash-spiral',
    isDark: true,
    imageUrl: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'unsplash-liquid-blue',
    label: 'Liquid Blue',
    value: 'unsplash-liquid-blue',
    isDark: true,
    imageUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'unsplash-mesh-grid',
    label: 'Mesh Grid',
    value: 'unsplash-mesh-grid',
    isDark: true,
    imageUrl: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'unsplash-smoke-waves',
    label: 'Smoke Waves',
    value: 'unsplash-smoke-waves',
    isDark: true,
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'unsplash-dark-geometry',
    label: 'Dark Geometry',
    value: 'unsplash-dark-geometry',
    isDark: true,
    imageUrl: 'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'unsplash-abstract-lines',
    label: 'Abstract Lines',
    value: 'unsplash-abstract-lines',
    isDark: true,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'unsplash-glass-shards',
    label: 'Glass Shards',
    value: 'unsplash-glass-shards',
    isDark: true,
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'unsplash-colorful-swirl',
    label: 'Colorful Swirl',
    value: 'unsplash-colorful-swirl',
    isDark: true,
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'unsplash-digital-rain',
    label: 'Digital Rain',
    value: 'unsplash-digital-rain',
    isDark: true,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
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
  slow: { min: 150, max: 150 },
  normal: { min: 100, max: 100 },
  fast: { min: 50, max: 50 },
  instant: { min: 20, max: 20 },
};

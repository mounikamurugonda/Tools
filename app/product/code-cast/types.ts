export type Theme =
  | 'dark'
  | 'light'
  | 'dracula'
  | 'github'
  | 'monokai'
  | 'twilight'
  | 'nord'
  | 'solarized-dark'
  | 'solarized-light'
  | 'synthwave';

export type DeviceFrame =
  | 'minimal'
  | 'browser'
  | 'linkedin-post'
  | 'instagram-square'
  | 'tiktok-shorts';

export type TypingSpeed = 'slow' | 'normal' | 'fast' | 'instant';
export type SoundType = 'deep' | 'crisp';

export interface AppConfig {
  theme: Theme;
  background: string;
  deviceFrame: DeviceFrame;
  typingSpeed: TypingSpeed;
  fontSize: number;
  showCursor: boolean;
  soundEnabled: boolean;
  soundType: SoundType;
  lineNumbers: boolean;
  canvasPadding: number;
  wordWrap: boolean;
  libraries: string[];
}

export interface CodeSnippet {
  html: string;
  css: string;
  js: string;
}

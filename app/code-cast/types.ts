
export type Theme = 'dark' | 'light' | 'dracula' | 'github' | 'monokai' | 'twilight' | 'nord' | 'solarized-dark' | 'solarized-light' | 'synthwave';

export type DeviceFrame = 
  | 'minimal' 
  | 'browser' 
  | 'linkedin-post' 
  | 'instagram-square' 
  | 'tiktok-shorts';

export type TypingSpeed = 'slow' | 'normal' | 'fast' | 'instant';
export type SoundType = 'thock' | 'clicky' | 'typewriter' | 'membrane' | 'bubble';

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
}

export interface CodeSnippet {
  html: string;
  css: string;
  js: string;
}

export interface EditorState {
  code: string;
  cursorIndex: number;
  isTyping: boolean;
  isPaused: boolean;
}

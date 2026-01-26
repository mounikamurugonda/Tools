import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AppConfig, CodeSnippet, Theme, DeviceFrame, TypingSpeed, SoundType } from '../types';
import { DEFAULT_CODE, BACKGROUND_PRESETS, EDITOR_THEMES, FRAME_OPTIONS } from '../constants';

interface CodeCastState {
  // Code State
  code: CodeSnippet;
  setCode: (code: CodeSnippet) => void;
  updateCode: (tab: 'html' | 'css' | 'js', content: string) => void;

  // Config State
  config: AppConfig;
  setConfig: (config: AppConfig | ((prev: AppConfig) => AppConfig)) => void;
  updateConfig: (key: keyof AppConfig, value: any) => void;

  // UI State
  projectTitle: string;
  setProjectTitle: (title: string) => void;
  projectTitleFontSize: number;
  setProjectTitleFontSize: (size: number) => void;
  projectTitleColor: string;
  setProjectTitleColor: (color: string) => void;
  shadowBlur: number;
  setShadowBlur: (blur: number) => void;
  shadowSpread: number;
  setShadowSpread: (spread: number) => void;
  showProjectInfo: boolean;
  setShowProjectInfo: (show: boolean) => void;
  activeTab: 'html' | 'css' | 'js' | 'libs';
  setActiveTab: (tab: 'html' | 'css' | 'js' | 'libs') => void;

  // Image Mode View Controls
  showEditor: boolean;
  setShowEditor: (show: boolean) => void;
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;

  // Animation/Recording State
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;

  // Actions
  reset: () => void;
}

// Shared UI state (sidebar toggle only)
interface SharedUIState {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const DEFAULT_CONFIG: AppConfig = {
  theme: 'dark',
  background: 'codecast-gradient',
  deviceFrame: 'browser',
  typingSpeed: 'slow',
  fontSize: 14,
  showCursor: true,
  soundEnabled: true,
  soundType: 'deep',
  lineNumbers: false,
  canvasPadding: 32,
  wordWrap: true,
  libraries: [],
  isClassicView: false,
};

// Factory function to create route-specific stores
const createCodeCastStore = (storageKey: string) => {
  return create<CodeCastState>()(
    persist(
      (set) => ({
        // Initial Code
        code: DEFAULT_CODE,
        setCode: (code) => set({ code }),
        updateCode: (tab, content) => set((state) => ({ code: { ...state.code, [tab]: content } })),

        // Initial Config
        config: DEFAULT_CONFIG,
        setConfig: (config) =>
          set((state) => ({
            config: typeof config === 'function' ? config(state.config) : config,
          })),
        updateConfig: (key, value) => set((state) => ({ config: { ...state.config, [key]: value } })),

        // Initial UI
        projectTitle: 'Pure CSS Carousel with Markers',
        setProjectTitle: (title) => set({ projectTitle: title }),
        projectTitleFontSize: 14,
        setProjectTitleFontSize: (size) => set({ projectTitleFontSize: size }),
        projectTitleColor: '#FFFFFF',
        setProjectTitleColor: (color) => set({ projectTitleColor: color }),
        shadowBlur: 40,
        setShadowBlur: (blur) => set({ shadowBlur: blur }),
        shadowSpread: -5,
        setShadowSpread: (spread) => set({ shadowSpread: spread }),
        showProjectInfo: true,
        setShowProjectInfo: (show) => set({ showProjectInfo: show }),
        activeTab: 'html',
        setActiveTab: (tab) => set({ activeTab: tab }),

        // Image View Controls (defaults to true)
        showEditor: true,
        setShowEditor: (show) => set({ showEditor: show }),
        showPreview: true,
        setShowPreview: (show) => set({ showPreview: show }),

        // Animation/Rec
        isPlaying: false,
        setIsPlaying: (isPlaying) => set({ isPlaying }),
        isPaused: false,
        setIsPaused: (isPaused) => set({ isPaused }),
        isRecording: false,
        setIsRecording: (isRecording) => set({ isRecording }),

        // Reset
        reset: () =>
          set({
            code: DEFAULT_CODE,
            config: DEFAULT_CONFIG,
            projectTitle: 'Pure CSS Carousel with Markers',
            activeTab: 'html',
            isPlaying: false,
            isPaused: false,
            isRecording: false,
            showEditor: true,
            showPreview: true,
          }),
      }),
      {
        name: storageKey,
        partialize: (state) => ({
          code: state.code,
          config: state.config,
          projectTitle: state.projectTitle,
          projectTitleFontSize: state.projectTitleFontSize,
          projectTitleColor: state.projectTitleColor,
          shadowBlur: state.shadowBlur,
          shadowSpread: state.shadowSpread,
          showProjectInfo: state.showProjectInfo,
          activeTab: state.activeTab,
          showEditor: state.showEditor,
          showPreview: state.showPreview,
        }),
      }
    )
  );
};

// Route-specific stores
export const useAnimateStore = createCodeCastStore('codecast-animate-store');
export const useTypeStore = createCodeCastStore('codecast-type-store');
export const useImageStore = createCodeCastStore('codecast-image-store');

// Shared UI store for sidebar toggle
export const useSharedUIStore = create<SharedUIState>()(set => ({
  isSidebarOpen: false,
  setSidebarOpen: isOpen => set({ isSidebarOpen: isOpen }),
}));

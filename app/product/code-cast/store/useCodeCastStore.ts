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
    activeTab: 'html' | 'css' | 'js';
    setActiveTab: (tab: 'html' | 'css' | 'js') => void;

    // Animation/Recording State
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
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
    typingSpeed: 'normal',
    fontSize: 14,
    showCursor: true,
    soundEnabled: true,
    soundType: 'deep',
    lineNumbers: true,
};

// Factory function to create route-specific stores
const createCodeCastStore = (storageKey: string) => {
    return create<CodeCastState>()(
        persist(
            (set) => ({
                // Initial Code
                code: DEFAULT_CODE,
                setCode: (code) => set({ code }),
                updateCode: (tab, content) =>
                    set((state) => ({ code: { ...state.code, [tab]: content } })),

                // Initial Config
                config: DEFAULT_CONFIG,
                setConfig: (config) =>
                    set((state) => ({
                        config: typeof config === 'function' ? config(state.config) : config
                    })),
                updateConfig: (key, value) =>
                    set((state) => ({ config: { ...state.config, [key]: value } })),

                // Initial UI
                projectTitle: "Pure CSS Carousel with Markers",
                setProjectTitle: (title) => set({ projectTitle: title }),
                activeTab: 'html',
                setActiveTab: (tab) => set({ activeTab: tab }),

                // Animation/Rec
                isPlaying: false,
                setIsPlaying: (isPlaying) => set({ isPlaying }),
                isRecording: false,
                setIsRecording: (isRecording) => set({ isRecording }),

                // Reset
                reset: () => set({
                    code: DEFAULT_CODE,
                    config: DEFAULT_CONFIG,
                    projectTitle: "Pure CSS Carousel with Markers",
                    activeTab: 'html',
                    isPlaying: false,
                    isRecording: false
                }),
            }),
            {
                name: storageKey,
                partialize: (state) => ({
                    code: state.code,
                    config: state.config,
                    projectTitle: state.projectTitle
                }),
            }
        )
    );
};

// Route-specific stores
export const useAnimateStore = createCodeCastStore('code-cast-animate');
export const useTypeStore = createCodeCastStore('code-cast-type');
export const useImageStore = createCodeCastStore('code-cast-image');

// Shared UI store for sidebar toggle
export const useSharedUIStore = create<SharedUIState>()((set) => ({
    isSidebarOpen: true,
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));

// Keep the original export for backward compatibility (defaults to type store)
export const useCodeCastStore = useTypeStore;

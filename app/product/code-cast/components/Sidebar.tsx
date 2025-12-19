import React, { useState } from 'react';
import { Settings, Volume2, MousePointer2, Eye, EyeOff } from 'lucide-react';
import { useAnimateStore, useTypeStore, useImageStore, useSharedUIStore } from '../store/useCodeCastStore';
import { AppConfig, Theme, TypingSpeed, SoundType } from '../types';
import { BACKGROUND_PRESETS, EDITOR_THEMES, FONT_SIZES } from '../constants';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const mode = pathname?.split('/').pop() as 'animate' | 'type' | 'image' | undefined;

  // Use the appropriate store based on the current route
  const animateStore = useAnimateStore();
  const typeStore = useTypeStore();
  const imageStore = useImageStore();

  const currentStore = mode === 'animate' ? animateStore : mode === 'type' ? typeStore : imageStore;
  const { config, setConfig, projectTitle, setProjectTitle } = currentStore;

  const { isSidebarOpen, setSidebarOpen } = useSharedUIStore();

  const [showProjectInfo, setShowProjectInfo] = useState(true);

  const isOpen = isSidebarOpen;
  const onClose = () => setSidebarOpen(false);

  return (
    <div
      className={`
        h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 z-20 
        transition-all duration-300 ease-in-out absolute lg:relative top-0 left-0 bottom-0
        ${isOpen ? 'w-80 opacity-100 shadow-2xl lg:shadow-none' : 'w-0 opacity-0'}
      `}
    >
      <div className="w-80 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 shrink-0 bg-white dark:bg-gray-950">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold text-sm">
            <Settings size={16} />
            <span>Settings</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

          {/* Section: Project Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Project Info
              </label>
              <button
                onClick={() => setShowProjectInfo(!showProjectInfo)}
                className={`p-1 rounded transition-colors ${showProjectInfo ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                title={showProjectInfo ? 'Hide on canvas' : 'Show on canvas'}
              >
                {showProjectInfo ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>
            <input
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-xs text-gray-900 dark:text-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-700 transition-colors"
              placeholder="Project Title"
            />
          </div>


          {/* Section: Appearance */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Appearance</label>

            {/* Background Selector */}
            <div className="space-y-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">Canvas Background</span>
              <div className="grid grid-cols-3 gap-2">
                {BACKGROUND_PRESETS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setConfig((p: AppConfig) => ({ ...p, background: bg.value }))}
                    className={`
                       aspect-square rounded-lg border-2 transition-all relative overflow-hidden group
                       ${config.background === bg.value ? 'border-blue-600 dark:border-blue-400 shadow-lg scale-105' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500'}
                     `}
                    title={bg.label}
                  >
                    <div className={`w-full h-full ${bg.value}`} />
                    {config.background === bg.value && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">Theme</span>
                <select
                  value={config.theme}
                  onChange={(e) => setConfig((p: AppConfig) => ({ ...p, theme: e.target.value as Theme }))}
                  className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-xs rounded-md border border-gray-200 dark:border-gray-700 px-2.5 py-2 outline-none focus:border-blue-500"
                >
                  {EDITOR_THEMES.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">Font Size</span>
                <select
                  value={config.fontSize}
                  onChange={(e) => setConfig((p: AppConfig) => ({ ...p, fontSize: Number(e.target.value) }))}
                  className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-xs rounded-md border border-gray-200 dark:border-gray-700 px-2.5 py-2 outline-none focus:border-blue-500"
                >
                  {FONT_SIZES.map((size) => (
                    <option key={size} value={size}>{size}px</option>
                  ))}
                </select>
              </div>
            </div>


          </div>

          {/* Section: Animation - Only for Animate mode */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Animation</label>

            <div className="space-y-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">Typing Speed</span>
              <select
                value={config.typingSpeed}
                onChange={(e) => setConfig((p: AppConfig) => ({ ...p, typingSpeed: e.target.value as TypingSpeed }))}
                className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-xs rounded-md border border-gray-200 dark:border-gray-700 px-2.5 py-2 outline-none focus:border-blue-500"
              >
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
                <option value="instant">Instant</option>
              </select>
            </div>

            {/* Audio Profile - Only show in Animate mode */}
            {mode === 'animate' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Audio Profile</span>
                  <button
                    onClick={() => setConfig((p: AppConfig) => ({ ...p, soundEnabled: !p.soundEnabled }))}
                    className={`w-10 h-5 rounded-full relative transition-colors ${config.soundEnabled ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.soundEnabled ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>

                <div className={`relative transition-opacity ${config.soundEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  <select
                    value={config.soundType}
                    onChange={(e) => setConfig((p: AppConfig) => ({ ...p, soundType: e.target.value as SoundType }))}
                    className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-xs rounded-md border border-gray-200 dark:border-gray-700 px-2.5 py-2 outline-none focus:border-blue-500 appearance-none"
                    disabled={!config.soundEnabled}
                  >
                    <option value="deep">Signature Deep</option>
                    <option value="crisp">Signature Crisp</option>
                  </select>
                  <Volume2 size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 mt-3">
              <div className="flex items-center gap-2 text-xs text-gray-900 dark:text-gray-300">
                <MousePointer2 size={14} />
                <span>Show Cursor</span>
              </div>
              <button
                onClick={() => setConfig((p: AppConfig) => ({ ...p, showCursor: !p.showCursor }))}
                className={`w-10 h-5 rounded-full relative transition-colors ${config.showCursor ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.showCursor ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Pass showProjectInfo state to pages via a global context or direct prop */}
      <div className="hidden" data-show-project-info={showProjectInfo} id="project-info-toggle" />
    </div>
  );
};

export default Sidebar;

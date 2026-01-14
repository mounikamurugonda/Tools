import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Settings, Volume2, MousePointer2, Eye, EyeOff, X } from 'lucide-react';
import {
  useAnimateStore,
  useTypeStore,
  useImageStore,
  useSharedUIStore,
} from '../store/useCodeCastStore';
import { AppConfig, Theme, TypingSpeed, SoundType } from '../types';
import { BACKGROUND_PRESETS, EDITOR_THEMES, FONT_SIZES } from '../constants';
import { EmojiPicker } from './EmojiPicker';
import { usePathname } from 'next/navigation';
import { FeatureGuard } from '@/components/FeatureGuard';
import { BackgroundRenderer, getContainerBackgroundClass } from './BackgroundRenderer';

// Internal reusable Tooltip Wrapper (Copied from CodeCastHeader for consistency)
const TooltipWrapper = ({ children, label, className = '' }: { children: React.ReactNode; label: string; className?: string }) => {
  return (
    <div className={`relative group ${className}`}>
      {children}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-gray-900 text-[10px] font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
        {label}
        {/* Arrow (Down pointing) */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/90 dark:bg-white/90 rotate-45"></div>
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const mode = pathname?.split('/').pop() as 'animate' | 'type' | 'image' | undefined;

  // Use the appropriate store based on the current route
  const animateStore = useAnimateStore();
  const typeStore = useTypeStore();
  const imageStore = useImageStore();

  const currentStore = mode === 'animate' ? animateStore : mode === 'type' ? typeStore : imageStore;
  const { config, setConfig, projectTitle, setProjectTitle, showProjectInfo, setShowProjectInfo, projectTitleFontSize, setProjectTitleFontSize, shadowBlur, setShadowBlur, shadowSpread, setShadowSpread } = currentStore;

  const { isSidebarOpen, setSidebarOpen } = useSharedUIStore();

  React.useEffect(() => {
    // Open sidebar by default on desktop (md breakpoint)
    if (window.innerWidth >= 768) {
      setSidebarOpen(true);
    }
  }, [setSidebarOpen]);

  const isOpen = isSidebarOpen;
  const onClose = () => setSidebarOpen(false);

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`
          bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800
          transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          
          /* Mobile: Modal-style popup */
          fixed md:absolute lg:relative
          inset-4 md:inset-0
          md:h-full md:border-r md:top-0 md:left-0 md:bottom-0
          rounded-2xl md:rounded-none
          shadow-2xl md:shadow-none lg:shadow-none
          z-50 md:z-20
          ${isOpen ? 'md:w-80' : 'md:w-0'}
          
          /* Mobile modal styling */
          max-h-[90vh] md:max-h-full
          border-2 md:border-r md:border-t-0 md:border-b-0 md:border-l-0
        `}
      >
        <div className="w-full md:w-80 h-full flex flex-col overflow-hidden">
          {/* Mobile Header with Close Button */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Settings size={18} className="text-blue-600 dark:text-blue-400" />
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">Settings</h2>
            </div>
            <TooltipWrapper label="Close sidebar">
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
                aria-label="Close settings"
              >
                <X size={20} />
              </button>
            </TooltipWrapper>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Section: Project Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Project Info
                </label>
                <TooltipWrapper label={showProjectInfo ? 'Hide on canvas' : 'Show on canvas'}>
                  <button
                    onClick={() => setShowProjectInfo(!showProjectInfo)}
                    className={`p-1 rounded transition-colors ${showProjectInfo ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {showProjectInfo ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </TooltipWrapper>
              </div>
              <div className="flex gap-2">
                <input
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-xs text-gray-900 dark:text-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-700 transition-colors"
                  placeholder="Project Title"
                />
                <EmojiPicker onEmojiSelect={(emoji) => setProjectTitle(projectTitle + emoji)} />
              </div>
              {/* Project Title Font Size Slider */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Title Size</span>
                  <span className="text-xs font-mono text-gray-900 dark:text-white">
                    {projectTitleFontSize === 0 ? '14px' : `${projectTitleFontSize}px`}
                  </span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="64"
                  step="2"
                  value={projectTitleFontSize === 0 ? 14 : projectTitleFontSize}
                  onChange={e => setProjectTitleFontSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
              </div>

              {/* Shadow Controls */}
              <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-800 mt-2">
                {/* Blur Slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Shadow Blur</span>
                    <span className="text-xs font-mono text-gray-900 dark:text-white">
                      {shadowBlur}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={shadowBlur}
                    onChange={e => setShadowBlur(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                </div>

                {/* Spread Slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Shadow Spread</span>
                    <span className="text-xs font-mono text-gray-900 dark:text-white">
                      {shadowSpread}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    step="1"
                    value={shadowSpread}
                    onChange={e => setShadowSpread(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                </div>
              </div>
            </div>

            {/* Section: Appearance */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Appearance {!session && <span className="normal-case font-normal text-[10px] ml-1 opacity-70">(Login Required)</span>}
              </label>

              <FeatureGuard actionName="customize appearance">
                <div className="space-y-4">
                  {/* Background Selector */}
                  <div className="space-y-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Canvas Background</span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {BACKGROUND_PRESETS.map(bg => (
                        <TooltipWrapper key={bg.id} label={bg.label}>
                          <button
                            onClick={() => setConfig((p: AppConfig) => ({ ...p, background: bg.value }))}
                            className={`
                       w-full block aspect-square rounded-lg border-2 transition-all relative overflow-hidden group
                       ${config.background === bg.value ? 'border-blue-600 dark:border-blue-400 shadow-lg scale-105' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500'}
                     `}
                          >
                            <div className={`w-full h-full relative ${getContainerBackgroundClass(bg.id) === bg.id ? bg.value : getContainerBackgroundClass(bg.id)}`}>
                              <BackgroundRenderer background={bg.id} />
                            </div>

                            {config.background === bg.value && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                                <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                              </div>
                            )}
                          </button>
                        </TooltipWrapper>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Theme</span>
                      <select
                        value={config.theme}
                        onChange={e =>
                          setConfig((p: AppConfig) => ({ ...p, theme: e.target.value as Theme }))
                        }
                        className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-xs rounded-md border border-gray-200 dark:border-gray-700 px-2.5 py-2 outline-none focus:border-blue-500"
                      >
                        {EDITOR_THEMES.map(t => (
                          <option key={t.id} value={t.id}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Font Size</span>
                      <select
                        value={config.fontSize}
                        onChange={e =>
                          setConfig((p: AppConfig) => ({ ...p, fontSize: Number(e.target.value) }))
                        }
                        className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-xs rounded-md border border-gray-200 dark:border-gray-700 px-2.5 py-2 outline-none focus:border-blue-500"
                      >
                        {FONT_SIZES.map(size => (
                          <option key={size} value={size}>
                            {size}px
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Canvas Padding Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Canvas Padding</span>
                      <span className="text-xs font-mono text-gray-900 dark:text-white">
                        {config.canvasPadding}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="128"
                      step="4"
                      value={config.canvasPadding}
                      onChange={e =>
                        setConfig((p: AppConfig) => ({ ...p, canvasPadding: Number(e.target.value) }))
                      }
                      className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                  </div>
                </div>
              </FeatureGuard>
            </div>

            {/* Section: Animation - Only for Animate mode */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Animation
              </label>

              <div className="space-y-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">Typing Speed</span>
                <select
                  value={config.typingSpeed}
                  onChange={e =>
                    setConfig((p: AppConfig) => ({
                      ...p,
                      typingSpeed: e.target.value as TypingSpeed,
                    }))
                  }
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
                    <TooltipWrapper label={config.soundEnabled ? 'Disable Typing Sounds' : 'Enable Typing Sounds'}>
                      <button
                        onClick={() =>
                          setConfig((p: AppConfig) => ({ ...p, soundEnabled: !p.soundEnabled }))
                        }
                        className={`w-10 h-5 rounded-full relative transition-colors ${config.soundEnabled ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                      >
                        <div
                          className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.soundEnabled ? 'left-6' : 'left-1'}`}
                        />
                      </button>
                    </TooltipWrapper>
                  </div>

                  <div
                    className={`relative transition-opacity ${config.soundEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}
                  >
                    <select
                      value={config.soundType}
                      onChange={e =>
                        setConfig((p: AppConfig) => ({
                          ...p,
                          soundType: e.target.value as SoundType,
                        }))
                      }
                      className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-xs rounded-md border border-gray-200 dark:border-gray-700 px-2.5 py-2 outline-none focus:border-blue-500 appearance-none"
                      disabled={!config.soundEnabled}
                    >
                      <option value="deep">Signature Deep</option>
                      <option value="crisp">Signature Crisp</option>
                    </select>
                    <Volume2
                      size={12}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 mt-3">
                <div className="flex items-center gap-2 text-xs text-gray-900 dark:text-gray-300">
                  <MousePointer2 size={14} />
                  <span>Show Cursor</span>
                </div>
                <TooltipWrapper label={config.showCursor ? 'Hide Cursor in Output' : 'Show Cursor in Output'}>
                  <button
                    onClick={() => setConfig((p: AppConfig) => ({ ...p, showCursor: !p.showCursor }))}
                    className={`w-10 h-5 rounded-full relative transition-colors ${config.showCursor ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.showCursor ? 'left-6' : 'left-1'}`}
                    />
                  </button>
                </TooltipWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

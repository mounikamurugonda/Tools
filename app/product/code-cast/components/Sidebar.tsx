import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Settings, Volume2, MousePointer2, Eye, EyeOff, X, Bookmark, Upload, Music, Trash2, Sliders, PlayCircle, Repeat, Gauge, Sparkles } from 'lucide-react';
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
import Link from 'next/link';
import { AIChatBox } from './AIChatBox';

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
  const mode = pathname?.includes('/animate') ? 'animate' :
    pathname?.includes('/type') ? 'type' :
      pathname?.includes('/saved') ? 'saved' :
        pathname?.includes('/library') ? 'library' :
          'image'; // Default to image mode

  // Use the appropriate store based on the current route
  const animateStore = useAnimateStore();
  const typeStore = useTypeStore();
  const imageStore = useImageStore();

  const currentStore = mode === 'animate' ? animateStore : mode === 'type' ? typeStore : imageStore;
  const { code, config, setConfig, projectTitle, setProjectTitle, showProjectInfo, setShowProjectInfo, projectTitleFontSize, setProjectTitleFontSize, projectTitleColor, setProjectTitleColor, shadowBlur, setShadowBlur, shadowSpread, setShadowSpread, audioFile, setAudioFile } = currentStore;

  const { isSidebarOpen, setSidebarOpen } = useSharedUIStore();
  const [snippetCount, setSnippetCount] = useState<number | null>(null);
  const [showAudioSettings, setShowAudioSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'ai'>('settings');

  React.useEffect(() => {
    const fetchSnippetCount = async () => {
      try {
        const res = await fetch('/api/code-cast/snippets');
        const data = await res.json();
        if (data.snippets) {
          setSnippetCount(data.snippets.length);
        }
      } catch (err) {
        console.error('Failed to fetch snippet count', err);
      }
    };

    // Initial fetch
    fetchSnippetCount();
  }, []);

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
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-6 custom-scrollbar">
            <div className="space-y-2 mb-4">
              {session && (
                <Link
                  href="/product/code-cast/saved"
                  onClick={() => { if (window.innerWidth < 768) setSidebarOpen(false); }}
                  className={`flex items-center justify-between w-full px-3 py-1.5 rounded-md border text-xs font-semibold transition-all shadow-sm ${pathname?.includes('/saved')
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300'
                    : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-2">
                    <Bookmark size={12} className={pathname?.includes('/saved') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'} />
                    <span>Saved Snippets</span>
                  </div>
                  {snippetCount !== null && snippetCount > 0 && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${pathname?.includes('/saved') ? 'bg-indigo-100 dark:bg-indigo-800/50 text-indigo-800 dark:text-indigo-200' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
                      {snippetCount}
                    </span>
                  )}
                </Link>
              )}
            </div>

            {/* Tabs for Sidebar */}
            {mode !== 'saved' && mode !== 'library' && (
              <div className="flex items-center gap-2 mb-4 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-semibold transition-all ${activeTab === 'settings'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                >
                  <Settings size={14} />
                  Settings
                </button>
                {/* <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-semibold transition-all ${activeTab === 'ai'
                    ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-600/50'
                    : 'text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400'
                    }`}
                >
                  <Sparkles size={14} className={activeTab === 'ai' ? 'animate-pulse' : ''} />
                  Ask AI
                </button> */}
              </div>
            )}

            {/* Ask AI Tab Content */}
            {activeTab === 'ai' && mode !== 'saved' && mode !== 'library' && (
              <div className="h-full flex flex-col">
                <AIChatBox
                  updateCode={currentStore.updateCode}
                  onClose={() => setActiveTab('settings')}
                  isLight={config.theme === 'light' || config.theme === 'github' || config.theme === 'solarized-light'}
                  inline={true}
                />
              </div>
            )}

            {/* Tool Specific Settings - Hide on Saved Page and Library Page */}
            {mode !== 'saved' && mode !== 'library' && activeTab === 'settings' && (
              <>
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
                    <TooltipWrapper label="Choose title color">
                      <div className="relative">
                        <input
                          type="color"
                          value={projectTitleColor}
                          onChange={e => setProjectTitleColor(e.target.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          title="Choose title text color"
                        />
                        <div
                          className="w-9 h-9 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                          style={{ backgroundColor: projectTitleColor }}
                        />
                      </div>
                    </TooltipWrapper>
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

                  {/* Classic View Toggle - Type Mode Only */}
                  {mode === 'type' && (
                    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 mb-2">
                      <span className="text-xs text-gray-900 dark:text-gray-300">Classic View</span>
                      <TooltipWrapper label={config.isClassicView ? 'Disable Classic View' : 'Enable Classic View (No gaps, no title, square corners)'}>
                        <button
                          onClick={() => setConfig((p: AppConfig) => ({ ...p, isClassicView: !p.isClassicView }))}
                          className={`w-10 h-5 rounded-full relative transition-colors ${config.isClassicView ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                        >
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.isClassicView ? 'left-6' : 'left-1'}`} />
                        </button>
                      </TooltipWrapper>
                    </div>
                  )}

                  {/* Webcam Toggle - Type Mode Only */}
                  {mode === 'type' && (
                    <div className="space-y-2 mb-2">
                      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700">
                        <span className="text-xs text-gray-900 dark:text-gray-300">Enable Webcam</span>
                        <TooltipWrapper label={config.webcamEnabled ? 'Disable Webcam' : 'Enable Webcam Overlay'}>
                          <button
                            onClick={() => setConfig((p: AppConfig) => ({ ...p, webcamEnabled: !p.webcamEnabled }))}
                            className={`w-10 h-5 rounded-full relative transition-colors ${config.webcamEnabled ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                          >
                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.webcamEnabled ? 'left-6' : 'left-1'}`} />
                          </button>
                        </TooltipWrapper>
                      </div>

                      {/* Webcam Size Slider */}
                      {config.webcamEnabled && (
                        <div className="px-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Overlay Size</span>
                            <span className="text-xs font-mono text-gray-900 dark:text-white">{config.webcamSize || 160}px</span>
                          </div>
                          <input
                            type="range"
                            min="50"
                            max="300"
                            step="10"
                            value={config.webcamSize || 160}
                            onChange={e => setConfig((p: AppConfig) => ({ ...p, webcamSize: Number(e.target.value) }))}
                            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <FeatureGuard actionName="customize appearance">
                    <div className="space-y-4">
                      {/* Background Selector */}
                      <div className="space-y-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Canvas Background</span>
                        <div className="max-h-60 overflow-y-auto custom-scrollbar pr-1">
                          <div className="grid grid-cols-5 gap-1.5">
                            {BACKGROUND_PRESETS.map(bg => (
                              <TooltipWrapper key={bg.id} label={bg.credit ? `${bg.label} (${bg.credit})` : bg.label}>
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

                      {/* Glass Style Toggle (Integrated) */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-900 dark:text-gray-300">Glass Effect</span>
                          {!session && <span className="text-[9px] px-1 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded font-medium">PRO</span>}
                        </div>
                        <button
                          onClick={() => setConfig((p: AppConfig) => ({ ...p, isGlassStyle: !p.isGlassStyle }))}
                          className={`w-8 h-4 rounded-full relative transition-colors ${config.isGlassStyle ? 'bg-purple-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                        >
                          <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${config.isGlassStyle ? 'left-4.5' : 'left-0.5'}`} style={{ left: config.isGlassStyle ? '18px' : '2px' }} />
                        </button>
                      </div>
                    </div>
                  </FeatureGuard>
                </div>

                {/* Section: Editor Style */}



                {/* Section: Animation - Only for Animate mode */}
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Animation
                  </label>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Typing Speed</span>
                      <span className="text-xs font-mono text-gray-900 dark:text-white">
                        {config.typingSpeed || 50}ms
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 px-1 mb-1">
                      <span>Slow</span>
                      <span>Fast</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={Number(200 - (config.typingSpeed || 50))}
                      onChange={e =>
                        setConfig((p: AppConfig) => ({
                          ...p,
                          typingSpeed: 200 - Number(e.target.value),
                        }))
                      }
                      className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    {/* Duration Estimate */}
                    <div className="flex justify-end pt-1">
                      <span className="text-[10px] text-gray-400">
                        Est. Duration: <span className="font-mono text-gray-600 dark:text-gray-300">
                          {(() => {
                            const totalChars = (code?.html?.length || 0) + (code?.css?.length || 0) + (code?.js?.length || 0);
                            const activeTabs = [(code?.html || ''), (code?.css || ''), (code?.js || '')].filter(t => t.trim().length > 0).length;
                            // 1000ms delay between tabs
                            const switchOverhead = Math.max(0, activeTabs - 1) * 1000;
                            // Add 12ms base overhead per character for realistic browser execution time
                            const effectiveSpeed = config.typingSpeed + 12;
                            const totalMs = (totalChars * effectiveSpeed) + switchOverhead;

                            if (totalMs < 1000) return `${totalMs}ms`;
                            const seconds = Math.floor(totalMs / 1000);
                            if (seconds < 60) return `${seconds}s`;
                            const m = Math.floor(seconds / 60);
                            const s = seconds % 60;
                            return `${m}m ${s}s`;
                          })()}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Audio Profile - Only show in Animate mode */}
                  {mode === 'animate' && (
                    <div className="space-y-4">
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

                      {/* Custom Audio Upload */}
                      <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Background Music
                          </span>
                          {/* Audio Settings Toggle */}
                          {audioFile && (
                            <TooltipWrapper label={showAudioSettings ? "Hide Audio Settings" : "Audio Settings"}>
                              <button
                                onClick={() => setShowAudioSettings(!showAudioSettings)}
                                className={`p-1 rounded transition-colors ${showAudioSettings ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                              >
                                <Sliders size={14} />
                              </button>
                            </TooltipWrapper>
                          )}
                        </div>

                        {!audioFile ? (
                          <div className="relative">
                            <input
                              type="file"
                              accept="audio/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setAudioFile(file);
                                  setShowAudioSettings(true); // Auto-open settings on upload
                                }
                              }}
                              className="hidden"
                              id="audio-upload"
                            />
                            <label
                              htmlFor="audio-upload"
                              className="flex items-center justify-center gap-2 w-full p-3 bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <Upload size={14} className="text-gray-500" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">Upload MP3/WAV</span>
                            </label>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
                              <div className="flex items-center gap-2 overflow-hidden">
                                <Music size={14} className="text-blue-500 shrink-0" />
                                <span className="text-xs text-blue-700 dark:text-blue-300 truncate">
                                  {audioFile.name}
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  setAudioFile(null);
                                  setShowAudioSettings(false);
                                }}
                                className="p-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded text-blue-600 dark:text-blue-400 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            {/* Advanced Audio Settings Panel */}
                            {showAudioSettings && (
                              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                {/* Volume */}
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] items-center gap-1.5 flex text-gray-500 font-medium">
                                      <Volume2 size={10} /> Volume
                                    </span>
                                    <span className="text-[10px] font-mono text-gray-700 dark:text-gray-300">
                                      {Math.round((config.audioVolume ?? 0.5) * 100)}%
                                    </span>
                                  </div>
                                  <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={config.audioVolume ?? 0.5}
                                    onChange={(e) => setConfig((p: AppConfig) => ({ ...p, audioVolume: parseFloat(e.target.value) }))}
                                    className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-sm"
                                  />
                                </div>

                                {/* Start Time */}
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] items-center gap-1.5 flex text-gray-500 font-medium">
                                      <PlayCircle size={10} /> Start Offset (sec)
                                    </span>
                                    <span className="text-[10px] font-mono text-gray-700 dark:text-gray-300">
                                      {config.audioStartTime ?? 0}s
                                    </span>
                                  </div>
                                  <input
                                    type="range"
                                    min="0"
                                    max="60"
                                    step="0.5"
                                    value={config.audioStartTime ?? 0}
                                    onChange={(e) => setConfig((p: AppConfig) => ({ ...p, audioStartTime: parseFloat(e.target.value) }))}
                                    className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-sm"
                                  />
                                </div>

                                {/* Fade Duration */}
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] items-center gap-1.5 flex text-gray-500 font-medium">
                                      <Sliders size={10} /> Fade In/Out
                                    </span>
                                    <span className="text-[10px] font-mono text-gray-700 dark:text-gray-300">
                                      {config.audioFadeDuration ?? 0}s
                                    </span>
                                  </div>
                                  <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.5"
                                    value={config.audioFadeDuration ?? 0}
                                    onChange={(e) => setConfig((p: AppConfig) => ({ ...p, audioFadeDuration: parseFloat(e.target.value) }))}
                                    className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-sm"
                                  />
                                </div>

                                {/* Playback Speed */}
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] items-center gap-1.5 flex text-gray-500 font-medium">
                                      <Gauge size={10} /> Speed
                                    </span>
                                    <span className="text-[10px] font-mono text-gray-700 dark:text-gray-300">
                                      {config.audioPlaybackRate ?? 1.0}x
                                    </span>
                                  </div>
                                  <input
                                    type="range"
                                    min="0.5"
                                    max="2.0"
                                    step="0.1"
                                    value={config.audioPlaybackRate ?? 1.0}
                                    onChange={(e) => setConfig((p: AppConfig) => ({ ...p, audioPlaybackRate: parseFloat(e.target.value) }))}
                                    className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-sm"
                                  />
                                </div>

                                {/* Loop Toggle */}
                                <div className="flex items-center justify-between pt-1">
                                  <span className="text-[10px] items-center gap-1.5 flex text-gray-500 font-medium">
                                    <Repeat size={10} /> Loop Audio
                                  </span>
                                  <button
                                    onClick={() => setConfig((p: AppConfig) => ({ ...p, audioLoop: !p.audioLoop }))}
                                    className={`w-8 h-4 rounded-full relative transition-colors ${config.audioLoop ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                                  >
                                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${config.audioLoop ? 'left-4.5' : 'left-0.5'}`} style={{ left: config.audioLoop ? '1.125rem' : '0.125rem' }} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Helper Note */}
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-gray-900 p-2 rounded border border-gray-100 dark:border-gray-800">
                          <span className="font-bold">Note:</span> You can also turn on the microphone from the header to record your voice directly instead of uploading a file.
                        </div>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

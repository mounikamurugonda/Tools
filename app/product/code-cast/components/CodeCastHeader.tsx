import React, { useState } from 'react';
import {
  PanelLeft,
  Play,
  Pause,
  RotateCcw,
  Mic,
  MicOff,
  Monitor,
  Smartphone,
  ChevronDown,
  Download,
  Terminal,
  WrapText,
  ListOrdered,
  Square,
  Trash2,
  Sparkles,
  Copy,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Code2,
  Columns,
  Keyboard,
} from 'lucide-react';
import {
  useAnimateStore,
  useTypeStore,
  useImageStore,
  useSharedUIStore,
} from '../store/useCodeCastStore';
import { FRAME_OPTIONS } from '../constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DeviceFrame } from '../types';
import { useRecording } from '../context/RecordingContext';
import * as htmlToImage from 'html-to-image';
import LoginButton from '@/components/LoginButton';
import { FeatureGuard } from '@/components/FeatureGuard';

// Internal reusable Tooltip Wrapper
const TooltipWrapper = ({ children, label, className = '' }: { children: React.ReactNode; label: string; className?: string }) => {
  return (
    <div className={`relative group ${className}`}>
      {children}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-gray-900 text-[10px] font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
        {label}
        {/* Arrow */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/90 dark:bg-white/90 rotate-45"></div>
      </div>
    </div>
  );
};


export const CodeCastHeader = () => {
  // Navigation items configuration with icons
  const NAV_ITEMS = [
    { id: 'animate', label: 'Play code', icon: Play, shortLabel: 'Play' },
    { id: 'type', label: 'Type code', icon: Keyboard, shortLabel: 'Type' },
    { id: 'image', label: 'Code to image', icon: ImageIcon, shortLabel: 'Image' },
  ] as const;

  const pathname = usePathname();
  const mode = pathname?.split('/').pop() as 'animate' | 'type' | 'image' | undefined;

  // Use the appropriate store based on the current route
  const animateStore = useAnimateStore();
  const typeStore = useTypeStore();
  const imageStore = useImageStore();

  const currentStore = mode === 'animate' ? animateStore : mode === 'type' ? typeStore : imageStore;
  const { config, setConfig, isPlaying, setIsPlaying, isPaused: isAnimationPaused, setIsPaused: setIsAnimationPaused, code, setActiveTab, activeTab } =
    currentStore as any;

  // Image Store Specific Props
  const { showEditor, setShowEditor, showPreview, setShowPreview } = imageStore as any;

  const { isSidebarOpen, setSidebarOpen } = useSharedUIStore();
  const { isRecording, isPaused, startRecording, stopRecording, pauseRecording, resumeRecording } = useRecording();

  // Device dropdown state
  const [isDeviceDropdownOpen, setIsDeviceDropdownOpen] = useState(false);
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { recordingTime } = useRecording();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filter device options based on screen size - hide row layouts on mobile
  const getFilteredFrameOptions = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      // Mobile: only show column layouts
      return FRAME_OPTIONS.filter(
        f => f.id === 'tiktok-shorts' || f.id === 'instagram-square' || f.id === 'linkedin-post'
      );
    }
    return FRAME_OPTIONS;
  };

  // Helper to get device icon
  // Helper to get device icon
  const getDeviceIcon = (device: DeviceFrame) => {
    if (device === 'browser' || device === 'minimal') {
      return <Monitor size={16} strokeWidth={2} />;
    }
    return <Smartphone size={16} strokeWidth={2} />;
  };

  // Animate mode controls
  const handlePlayClick = () => {
    if (mode === 'animate') {
      if (isPlaying) {
        // Now handling Stop distinctly. This click might be legacy, but we'll update UI to separate Stop/Pause.
        // If clicking the main toggle while playing, we used to Stop.
        setIsPlaying(false);
        setIsAnimationPaused(false); // Reset pause state
        return;
      }
      // If current tab is empty or not a code tab, scan for start
      const isCodeTab = activeTab === 'html' || activeTab === 'css' || activeTab === 'js';
      if (!isCodeTab || !code[activeTab] || code[activeTab].trim() === '') {
        const tabs: ('html' | 'css' | 'js')[] = ['html', 'css', 'js'];
        const firstNonEmpty = tabs.find(t => code[t] && code[t].trim().length > 0);
        if (firstNonEmpty) setActiveTab(firstNonEmpty);
      }
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    if (mode === 'animate') {
      setActiveTab('html');
      setIsPlaying(true);
    }
  };

  // Image export
  const handleExport = async (format: 'png' | 'jpeg' | 'svg' | 'copy') => {
    const element = document.getElementById('canvas-stage');
    if (!element) return;

    setIsExporting(true);

    try {
      const filter = (node: HTMLElement) => !node.classList?.contains('exclude-from-export');

      const rect = element.getBoundingClientRect();
      const options = {
        quality: 1,
        pixelRatio: 3,
        filter,
        width: rect.width,
        height: rect.height,
        style: {
          margin: '0',
          transform: 'none',
          maxWidth: 'none',
          maxHeight: 'none',
        },
      };

      let dataUrl = '';

      if (format === 'png') {
        dataUrl = await htmlToImage.toPng(element, options);
      } else if (format === 'jpeg') {
        dataUrl = await htmlToImage.toJpeg(element, options);
      } else if (format === 'svg') {
        dataUrl = await htmlToImage.toSvg(element, options);
      } else if (format === 'copy') {
        const blob = await htmlToImage.toPng(element, {
          ...options,
          type: 'image/png',
        });
        const response = await fetch(blob);
        const blobData = await response.blob();
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blobData })]);
        setIsExporting(false);
        // Could show a toast here if we had one
        alert('Image copied to clipboard!');
        return;
      }

      const link = document.createElement('a');
      link.download = `codecast-export-${Date.now()}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
      alert('Failed to export image.');
    } finally {
      setIsExporting(false);
    }
  };

  // Code Formatting
  const handleFormat = async () => {
    if (!activeTab || activeTab === 'libs' || !code[activeTab as keyof typeof code]) return;

    try {
      const { default: beautify } = await import('js-beautify');
      const options = {
        indent_size: 2,
        space_in_empty_paren: true,
        max_preserve_newlines: 1,
        preserve_newlines: true,
      };

      let formatted = '';
      if (activeTab === 'html') {
        formatted = beautify.html(code.html, options);
      } else if (activeTab === 'css') {
        formatted = beautify.css(code.css, options);
      } else if (activeTab === 'js') {
        // The js formatter is exposed as 'js' on the default export based on my check,
        // but sometimes it is 'js_beautify' or just the function itself.
        // My check showed ['js', 'css', 'html', 'js_beautify'].
        // So beautify.js should be correct.
        formatted = beautify.js(code.js, options);
      }

      if (formatted && currentStore && currentStore.updateCode) {
        currentStore.updateCode(activeTab, formatted);
      }
    } catch (error) {
      console.error('Formatting failed:', error);
    }
  };

  // View Mode Cycle Logic for Image Tab
  const toggleViewMode = () => {
    if (showEditor && showPreview) {
      // Split -> Preview Only
      setShowEditor(false);
      setShowPreview(true);
    } else if (!showEditor && showPreview) {
      // Preview Only -> Code Only
      setShowEditor(true);
      setShowPreview(false);
    } else {
      // Code Only (or others) -> Split
      setShowEditor(true);
      setShowPreview(true);
    }
  };

  const getViewModeIcon = () => {
    if (showEditor && showPreview) return <Columns size={16} />;
    if (!showEditor && showPreview) return <ImageIcon size={16} />;
    return <Code2 size={16} />;
  };

  const filteredOptions = getFilteredFrameOptions();

  return (
    <header className="shrink-0 z-30 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* Row 1: Main controls */}
      <div className="h-14 flex items-center justify-between px-4">
        {/* Left: Sidebar + Brand + Mode Switcher (desktop only) */}
        <div className="flex items-center gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md shadow-blue-600/20">
              <Terminal size={14} strokeWidth={2.5} className="opacity-100" />
            </div>
            <span className="hidden sm:inline font-bold text-sm tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              CodeCast
            </span>
          </div>

          <TooltipWrapper label="Toggle Sidebar">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-md transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label="Toggle Sidebar"
            >
              <PanelLeft size={20} strokeWidth={2} />
            </button>
          </TooltipWrapper>

          {/* Mode Switcher - desktop only */}
          <div className="hidden md:flex items-center gap-1 p-0.5 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            {NAV_ITEMS.map(item => (
              <TooltipWrapper key={item.id} label={item.label}>
                <Link
                  href={`/product/code-cast/${item.id}`}
                  className={`px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase transition-all ${mode === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  {item.label}
                </Link>
              </TooltipWrapper>
            ))}
          </div>
        </div>

        {/* Right: Mode Controls + Device + Recording */}
        <div className="flex items-center gap-1.5 md:gap-2">

          {/* Format Code - hidden on mobile */}
          <div className="hidden md:block">
            <TooltipWrapper label="Format Code">
              <button
                onClick={handleFormat}
                className={`p-1.5 rounded-md transition-colors text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20`}
              >
                <Sparkles size={16} />
              </button>
            </TooltipWrapper>
          </div>

          {/* Clear All Code - hidden on mobile */}
          <div className="hidden md:block">
            <TooltipWrapper label="Clear All Code">
              <button
                onClick={() => {
                  // Check if we have updateCode available (all stores should have it)
                  if (activeTab && currentStore && currentStore.updateCode) {
                    currentStore.updateCode('html', '');
                    currentStore.updateCode('css', '');
                    currentStore.updateCode('js', '');
                  } else if (currentStore && currentStore.setCode) {
                    // Fallback if updateCode isn't directly exposed or for safety
                    currentStore.setCode({ html: '', css: '', js: '' });
                  }
                }}
                className={`p-1.5 rounded-md transition-colors text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20`}
              >
                <Trash2 size={16} />
              </button>
            </TooltipWrapper>
          </div>

          {/* Text Wrap Toggle - hidden on mobile */}
          <div className="hidden md:block">
            <TooltipWrapper label={config.wordWrap ? 'Disable Text Wrap' : 'Enable Text Wrap'}>
              <button
                onClick={() => setConfig((prev: any) => ({ ...prev, wordWrap: !prev.wordWrap }))}
                className={`p-1.5 rounded-md transition-colors ${config.wordWrap
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <WrapText size={16} />
              </button>
            </TooltipWrapper>
          </div>

          {/* Line Numbers Toggle - hidden on mobile */}
          <div className="hidden md:block">
            <TooltipWrapper label={config.lineNumbers ? 'Hide Line Numbers' : 'Show Line Numbers'}>
              <button
                onClick={() => setConfig((prev: any) => ({ ...prev, lineNumbers: !prev.lineNumbers }))}
                className={`p-1.5 rounded-md transition-colors ${config.lineNumbers
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <ListOrdered size={16} />
              </button>
            </TooltipWrapper>
          </div>

          {/* Image Mode Export & View Controls */}
          {
            mode === 'image' && (
              <div className="flex items-center gap-2 mr-2 border-r border-gray-200 dark:border-gray-800 pr-2">
                {/* View Controls - Single Cycle Button */}
                {/* View Controls - Single Cycle Button */}
                <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg p-0.5 border border-gray-200 dark:border-gray-800 mr-2">
                  <TooltipWrapper label="Toggle View (Split / Preview / Code)">
                    <button
                      onClick={toggleViewMode}
                      className="p-1.5 rounded transition-colors text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {getViewModeIcon()}
                    </button>
                  </TooltipWrapper>
                </div>

                {/* Export Buttons */}
                {/* Export Buttons */}
                <div className="flex items-center gap-1">
                  <FeatureGuard actionName="download image">
                    <TooltipWrapper label="Download PNG">
                      <button
                        onClick={() => handleExport('png')}
                        disabled={isExporting}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md text-xs font-bold transition-colors"
                      >
                        <Download size={14} />
                        <span className="hidden lg:inline">PNG</span>
                      </button>
                    </TooltipWrapper>
                  </FeatureGuard>
                  <FeatureGuard actionName="download image">
                    <TooltipWrapper label="Download SVG">
                      <button
                        onClick={() => handleExport('svg')}
                        disabled={isExporting}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 rounded-md text-xs font-bold transition-colors"
                      >
                        <Download size={14} />
                        <span className="hidden lg:inline">SVG</span>
                      </button>
                    </TooltipWrapper>
                  </FeatureGuard>
                  <FeatureGuard actionName="copy image">
                    <TooltipWrapper label="Copy to Clipboard">
                      <button
                        onClick={() => handleExport('copy')}
                        disabled={isExporting}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-md text-xs font-bold transition-colors"
                      >
                        <Copy size={14} />
                        <span className="hidden lg:inline">Copy</span>
                      </button>
                    </TooltipWrapper>
                  </FeatureGuard>
                </div>
              </div>
            )
          }

          {/* Download Dropdown - Animate & Type modes */}
          {(mode === 'animate' || mode === 'type') && (
            <div className="relative mr-1.5 md:mr-2">
              <TooltipWrapper label="Download Options">
                <button
                  onClick={() => setIsDownloadDropdownOpen(!isDownloadDropdownOpen)}
                  className={`w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-1.5 flex items-center justify-center md:justify-between gap-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${isDownloadDropdownOpen ? 'ring-2 ring-blue-500/20 border-blue-500/50' : ''}`}
                >
                  <Download size={16} />
                  <ChevronDown
                    size={12}
                    className={`hidden md:block transition-transform ${isDownloadDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </TooltipWrapper>

              {isDownloadDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDownloadDropdownOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-xl z-20 overflow-hidden py-1">
                    <FeatureGuard actionName="download image">
                      <button
                        onClick={() => {
                          setIsDownloadDropdownOpen(false);
                          handleExport('png');
                        }}
                        className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        <Download size={14} />
                        <span>Download PNG</span>
                      </button>
                    </FeatureGuard>
                    <FeatureGuard actionName="download image">
                      <button
                        onClick={() => {
                          setIsDownloadDropdownOpen(false);
                          handleExport('svg');
                        }}
                        className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        <Download size={14} />
                        <span>Download SVG</span>
                      </button>
                    </FeatureGuard>
                    <FeatureGuard actionName="copy image">
                      <button
                        onClick={() => {
                          setIsDownloadDropdownOpen(false);
                          handleExport('copy');
                        }}
                        className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        <Copy size={14} />
                        <span>Copy to Clipboard</span>
                      </button>
                    </FeatureGuard>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Device Frame Dropdown */}
          <div className="relative">
            <TooltipWrapper label="Select Device Frame">
              <button
                onClick={() => setIsDeviceDropdownOpen(!isDeviceDropdownOpen)}
                className="w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-1.5 flex items-center justify-center md:justify-between gap-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  {getDeviceIcon(config.deviceFrame)}
                  <span className="hidden md:inline text-xs font-bold text-gray-900 dark:text-gray-100">
                    {(() => {
                      const label = FRAME_OPTIONS.find(f => f.id === config.deviceFrame)?.label || 'Device';
                      const match = label.match(/\((.*?)\)/);
                      if (match) return match[1]; // Show "9:16", "16:9", etc.
                      return label.split('/')[0].trim(); // Fallback to "Full Width", "Desktop", etc.
                    })()}
                  </span>
                </div>
                <ChevronDown
                  size={12}
                  className={`transition-transform ml-0.5 md:ml-0 ${isDeviceDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </TooltipWrapper>

            {isDeviceDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsDeviceDropdownOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-xl z-20 overflow-hidden">
                  {['Standard', 'Social Media'].map(group => {
                    const groupOptions = filteredOptions.filter(f => f.group === group);
                    if (groupOptions.length === 0) return null;

                    return (
                      <div key={group}>
                        <div className="px-3 py-2 text-[10px] uppercase font-bold text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-800/50">
                          {group}
                        </div>
                        {groupOptions.map(frame => (
                          <button
                            key={frame.id}
                            onClick={() => {
                              setConfig((prev: any) => ({ ...prev, deviceFrame: frame.id }));
                              setIsDeviceDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors ${config.deviceFrame === frame.id
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                              }`}
                          >
                            {getDeviceIcon(frame.id)}
                            <span className="text-xs">{frame.label}</span>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Animate Button - Animate mode only */}
          {
            mode === 'animate' && (
              <div className="flex items-center gap-1.5">
                {!isPlaying ? (
                  <TooltipWrapper label="Start Animation">
                    <button
                      onClick={handlePlayClick}
                      className="w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-1.5 rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center md:gap-2"
                      aria-label="Animate"
                    >
                      <Play size={20} fill="currentColor" strokeWidth={0} className="md:w-3.5 md:h-3.5" />
                      <span className="hidden md:inline text-xs font-bold">Animate</span>
                    </button>
                  </TooltipWrapper>
                ) : (
                  <>
                    {/* Pause / Resume Button */}
                    <TooltipWrapper label={isAnimationPaused ? 'Resume Animation' : 'Pause Animation'}>
                      <button
                        onClick={() => setIsAnimationPaused(!isAnimationPaused)}
                        className={`w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-1.5 rounded-lg transition-colors text-white flex items-center justify-center md:gap-2 ${isAnimationPaused ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
                          }`}
                        aria-label={isAnimationPaused ? 'Resume' : 'Pause'}
                      >
                        {isAnimationPaused ? <Play size={20} fill="currentColor" strokeWidth={0} className="md:w-3.5 md:h-3.5" /> : <Pause size={20} fill="currentColor" strokeWidth={0} className="md:w-3.5 md:h-3.5" />}
                        <span className="hidden md:inline text-xs font-bold">{isAnimationPaused ? 'Resume' : 'Pause'}</span>
                      </button>
                    </TooltipWrapper>

                    {/* Stop Button */}
                    <TooltipWrapper label="Stop Animation">
                      <button
                        onClick={() => {
                          setIsPlaying(false);
                          setIsAnimationPaused(false);
                        }}
                        className="w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-1.5 rounded-lg transition-colors bg-red-500 hover:bg-red-600 text-white flex items-center justify-center md:gap-2"
                        aria-label="Stop"
                      >
                        <Square size={20} fill="white" strokeWidth={0} className="md:w-3.5 md:h-3.5" />
                        <span className="hidden md:inline text-xs font-bold">Stop</span>
                      </button>
                    </TooltipWrapper>
                  </>
                )}
              </div>
            )
          }

          {/* Recording Controls - Type and Animate modes */}
          {
            (mode === 'type' || mode === 'animate') && (
              <div className="flex items-center gap-1.5">
                <FeatureGuard actionName="use microphone">
                  <TooltipWrapper label={isMicEnabled ? 'Mic On' : 'Mic Off'}>
                    <button
                      onClick={() => setIsMicEnabled(!isMicEnabled)}
                      className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${isMicEnabled
                        ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                      {isMicEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                    </button>
                  </TooltipWrapper>
                </FeatureGuard>
                {!isRecording ? (
                  <FeatureGuard actionName="record screen">
                    <TooltipWrapper label="Start Recording">
                      <button
                        onClick={() => startRecording(isMicEnabled)}
                        className="w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center md:gap-2 shadow-lg"
                        aria-label="Start Recording"
                      >
                        <div className="w-3.5 h-3.5 bg-white rounded-full md:w-2.5 md:h-2.5" />
                        <span className="hidden md:inline text-xs font-bold">REC</span>
                      </button>
                    </TooltipWrapper>
                  </FeatureGuard>
                ) : (

                  <>
                    <TooltipWrapper label={isPaused ? 'Resume Recording' : 'Pause Recording'}>
                      <button
                        onClick={isPaused ? resumeRecording : pauseRecording}
                        className={`w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-1.5 rounded-lg transition-colors text-white flex items-center justify-center md:gap-2 ${isPaused ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
                          }`}
                        aria-label={isPaused ? 'Resume' : 'Pause'}
                      >
                        {isPaused ? <Play size={20} fill="currentColor" strokeWidth={0} className="md:w-3 md:h-3" /> : <Pause size={20} fill="currentColor" strokeWidth={0} className="md:w-3 md:h-3" />}
                        <span className="hidden md:inline text-xs font-bold uppercase">{isPaused ? 'Resume' : 'Pause'}</span>
                      </button>
                    </TooltipWrapper>
                    <TooltipWrapper label="Stop Recording">
                      <button
                        onClick={() => {
                          console.log('STOP button clicked');
                          stopRecording();
                        }}
                        className="w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center md:gap-2 animate-pulse"
                        aria-label="Stop Recording"
                      >
                        <Square size={20} fill="white" strokeWidth={0} className="md:w-3 md:h-3" />
                        <span className="hidden md:inline text-xs font-bold">STOP {formatTime(recordingTime)}</span>
                      </button>
                    </TooltipWrapper>
                  </>
                )}
              </div>
            )
          }
          <LoginButton />
        </div>
      </div>

      {/* Row 2: Mode tabs - mobile only */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-around px-2 py-1.5">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={`/product/code-cast/${item.id}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-semibold uppercase transition-all ${mode === item.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <Icon size={14} strokeWidth={2.5} />
                <span>{item.shortLabel}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

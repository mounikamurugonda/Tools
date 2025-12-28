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
import { toPng, toJpeg, toSvg } from 'html-to-image';

export const CodeCastHeader = () => {
  // Navigation items configuration
  const NAV_ITEMS = [
    { id: 'animate', label: 'Play code' },
    { id: 'type', label: 'Type code' },
    { id: 'image', label: 'Code to image' },
  ] as const;

  const pathname = usePathname();
  const mode = pathname?.split('/').pop() as 'animate' | 'type' | 'image' | undefined;

  // Use the appropriate store based on the current route
  const animateStore = useAnimateStore();
  const typeStore = useTypeStore();
  const imageStore = useImageStore();

  const currentStore = mode === 'animate' ? animateStore : mode === 'type' ? typeStore : imageStore;
  const { config, setConfig, isPlaying, setIsPlaying, code, setActiveTab, activeTab } =
    currentStore as any;

  const { isSidebarOpen, setSidebarOpen } = useSharedUIStore();
  const { isRecording, startRecording, stopRecording } = useRecording();

  // Device dropdown state
  const [isDeviceDropdownOpen, setIsDeviceDropdownOpen] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

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
  const getDeviceIcon = (device: DeviceFrame) => {
    if (device === 'browser' || device === 'minimal') {
      return <Monitor size={14} />;
    }
    return <Smartphone size={14} />;
  };

  // Animate mode controls
  const handlePlayClick = () => {
    if (mode === 'animate') {
      if (isPlaying) {
        setIsPlaying(false);
        return;
      }
      // If current tab is empty, scan for start
      if (!code[activeTab] || code[activeTab].trim() === '') {
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
  const handleDownload = async (format: 'png' | 'jpg' | 'svg') => {
    const element = document.getElementById('canvas-stage');
    if (!element) return;

    try {
      // Simplified options - no complex iframe cloning needed
      // since DirectPreview renders content directly in DOM
      const options = {
        quality: 0.95,
        pixelRatio: 2,
        skipFonts: true,
        width: element.offsetWidth,
        height: element.offsetHeight,
        style: {
          margin: '0',
          transform: 'none',
        },
      };
      let dataUrl = '';

      switch (format) {
        case 'png':
          dataUrl = await toPng(element, options);
          break;
        case 'jpg':
          dataUrl = await toJpeg(element, options);
          break;
        case 'svg':
          dataUrl = await toSvg(element, options);
          break;
      }

      const link = document.createElement('a');
      link.download = `codecast-export-${Date.now()}.${format === 'jpg' ? 'jpeg' : format}`;
      link.href = dataUrl;
      link.click();
      setIsExportMenuOpen(false);
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  const filteredOptions = getFilteredFrameOptions();

  return (
    <header className="h-14 flex items-center justify-between px-4 shrink-0 z-30 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* Left: Sidebar + Brand + Mode Switcher */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-1.5 rounded-md transition-colors text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
          title="Toggle Sidebar"
        >
          <PanelLeft size={18} />
        </button>

        {/* Brand - hide on very small screens */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md shadow-blue-600/20">
            <Terminal size={14} strokeWidth={2.5} className="opacity-100" />
          </div>
          <span className="font-bold text-sm tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            CodeCast
          </span>
        </div>

        {/* Mode Switcher - compact on mobile */}
        <div className="flex items-center gap-1 p-0.5 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.id}
              href={`/product/code-cast/${item.id}`}
              className={`px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase transition-all ${
                mode === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right: Mode Controls + Device + Recording */}
      <div className="flex items-center gap-2">
        {/* Animate Mode Controls */}
        {mode === 'animate' && (
          <div className="flex items-center gap-1 mr-2">
            <button
              onClick={handlePlayClick}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              title={isPlaying ? 'Pause Code Execution' : 'Run/Resume Code Execution'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              title="Reset Code & Animation"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        )}

        {/* Text Wrap Toggle */}
        <button
          onClick={() => setConfig((prev: any) => ({ ...prev, wordWrap: !prev.wordWrap }))}
          className={`p-1.5 rounded-md transition-colors ${
            config.wordWrap
              ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title={config.wordWrap ? 'Disable Text Wrap' : 'Enable Text Wrap'}
        >
          <WrapText size={16} />
        </button>

        {/* Line Numbers Toggle */}
        <button
          onClick={() => setConfig((prev: any) => ({ ...prev, lineNumbers: !prev.lineNumbers }))}
          className={`p-1.5 rounded-md transition-colors ${
            config.lineNumbers
              ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title={config.lineNumbers ? 'Hide Line Numbers' : 'Show Line Numbers'}
        >
          <ListOrdered size={16} />
        </button>

        {/* Image Mode Export */}
        {mode === 'image' && (
          <div className="relative mr-2">
            <button
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold transition-colors"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export</span>
            </button>

            {isExportMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsExportMenuOpen(false)} />
                <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-xl z-20 overflow-hidden">
                  <button
                    onClick={() => handleDownload('png')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    PNG
                  </button>
                  <button
                    onClick={() => handleDownload('jpg')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    JPG
                  </button>
                  <button
                    onClick={() => handleDownload('svg')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    SVG
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Device Frame Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDeviceDropdownOpen(!isDeviceDropdownOpen)}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {getDeviceIcon(config.deviceFrame)}
            <span className="hidden md:inline text-[11px]">
              {FRAME_OPTIONS.find(f => f.id === config.deviceFrame)?.label.split(' ')[0] ||
                'Device'}
            </span>
            <ChevronDown
              size={12}
              className={`transition-transform ${isDeviceDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

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
                          className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                            config.deviceFrame === frame.id
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

        {/* Recording Controls - Type and Animate modes */}
        {(mode === 'type' || mode === 'animate') && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMicEnabled(!isMicEnabled)}
              className={`p-1.5 rounded-md transition-colors ${
                isMicEnabled
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={isMicEnabled ? 'Mic On' : 'Mic Off'}
            >
              {isMicEnabled ? <Mic size={14} /> : <MicOff size={14} />}
            </button>
            {!isRecording ? (
              <button
                onClick={() => startRecording(isMicEnabled)}
                className="px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded-full transition-colors shadow-lg"
              >
                ● REC
              </button>
            ) : (
              <button
                onClick={() => {
                  console.log('STOP button clicked');
                  stopRecording();
                }}
                className="px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded-full transition-colors shadow-lg animate-pulse"
                title="Stop Recording"
              >
                ■ STOP
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

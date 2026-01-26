import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  Share2,
  Save,
  Loader2,
  Check,
  X,
  Camera,
  CameraOff
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
import { FeatureGuard } from '@/components/FeatureGuard';
import { ShareModal } from './ShareModal';
import { useSession } from 'next-auth/react';
import { Toast, ToastType } from '@/components/ui/Toast';

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
    { id: 'library', label: 'Library', icon: Columns, shortLabel: 'Lib' },
  ] as const;

  const pathname = usePathname();
  const { data: session } = useSession();
  const mode = pathname?.split('/').pop() as 'animate' | 'type' | 'image' | 'library' | undefined;

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

  // Save/Share State
  const [isSaving, setIsSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSaveDropdownOpen, setIsSaveDropdownOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const queryClient = useQueryClient();

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async ({ isShare, titleOverride }: { isShare: boolean; titleOverride?: string }) => {
      // Access store state directly
      const state = currentStore;
      if (!state) throw new Error("Store not initialized");

      const response = await fetch('/api/code-cast/snippet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: mode,
          title: titleOverride || state.projectTitle || 'Untitled Snippet',
          code: state.code,
          config: state.config,
          is_public: isPublic
        })
      });

      const data = await response.json();
      if (!data.success || !data.snippet) {
        throw new Error(data.error || 'Failed to save snippet');
      }
      return data;
    },
    onSuccess: (data, variables) => {
      const { isShare, titleOverride } = variables;

      // Invalidate library queries to show new snippet if public
      if (isPublic) {
        queryClient.invalidateQueries({ queryKey: ['librarySnippets'] });
      }

      // Use short URL if available, otherwise fallback to long URL
      const id = data.snippet.short_id || data.snippet.id;
      // If we have short_id, we use the redirect route /s/[id]
      // If not, we fall back to /product/code-cast/[mode]?snippet=[id]
      const url = data.snippet.short_id
        ? `https://utiltoolkits.com/s/${data.snippet.short_id}`
        : `https://utiltoolkits.com/product/code-cast/${mode}?snippet=${data.snippet.id}`;

      if (isShare) {
        setShareUrl(url);
        setIsShareModalOpen(true);
      } else {
        setSaveStatus('success');
        showToast('Snippet saved successfully!', 'success');
        // Optionally Update global project title if we want
        // if (state.setProjectTitle) state.setProjectTitle(titleOverride);
      }
    },
    onError: (error, variables) => {
      const { isShare } = variables;
      console.error('Save error:', error);
      if (!isShare) {
        setSaveStatus('error');
        showToast('An error occurred while saving', 'error');
      } else {
        showToast('An error occurred while saving', 'error');
      }
    },
    onSettled: (data, error, variables) => {
      const { isShare } = variables;
      if (isShare) setIsSaving(false);
    }
  });

  // Toast State
  const [toast, setToast] = useState<{ message: string, type: ToastType, isVisible: boolean }>({
    message: '', type: 'info', isVisible: false
  });

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  // Sync save name with project title when opening dropdown
  React.useEffect(() => {
    if (isSaveDropdownOpen && currentStore) {
      setSaveName(currentStore.projectTitle || '');
      setIsPublic(false);
      setSaveStatus('idle');
    }
  }, [isSaveDropdownOpen, currentStore]);

  // Animate mode controls
  const handlePlayClick = useCallback(() => {
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
  }, [mode, isPlaying, setIsPlaying, setIsAnimationPaused, activeTab, code, setActiveTab]);

  // Keyboard Shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl (or Cmd) + Shift
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        // Record Video: Ctrl + Shift + Q
        if (e.key.toLowerCase() === 'q') {
          e.preventDefault();
          if (mode === 'animate' || mode === 'type') {
            if (isRecording) {
              stopRecording();
            } else {
              startRecording(isMicEnabled);
            }
          }
        }
        // Play Animation: Ctrl + Shift + E
        if (e.key.toLowerCase() === 'e') {
          e.preventDefault();
          // Assuming we only want to trigger play/stop via shortcut in animate mode
          if (mode === 'animate') {
            handlePlayClick();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, isRecording, isMicEnabled, isPlaying, handlePlayClick, startRecording, stopRecording]); // Added deps for closure correctness

  const handleSave = async (isShare = false, titleOverride?: string) => {
    if (!currentStore || (mode !== 'animate' && mode !== 'type')) return;

    if (!isShare) {
      // Called from Dropdown Save button
      setSaveStatus('saving');
    } else {
      // Called from Share button
      setIsSaving(true);
    }

    saveMutation.mutate({ isShare, titleOverride });
  };

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
        showToast('Image copied to clipboard!', 'success');
        return;
      }

      const link = document.createElement('a');
      link.download = `codecast-export-${Date.now()}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
      showToast('Failed to export image', 'error');
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
        showToast('Code formatted successfully', 'success');
      }
    } catch (error) {
      console.error('Formatting failed:', error);
      showToast('Formatting failed', 'error');
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
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
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
                className="w-9 h-9 flex items-center justify-center rounded-md transition-colors text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
              >
                <Sparkles size={18} />
              </button>
            </TooltipWrapper>
          </div>

          {/* Clear All Code - hidden on mobile */}
          <div className="hidden md:block">
            <TooltipWrapper label="Clear All Code">
              <button
                onClick={() => {
                  if (activeTab && currentStore && currentStore.updateCode) {
                    currentStore.updateCode('html', '');
                    currentStore.updateCode('css', '');
                    currentStore.updateCode('js', '');
                    showToast('All code cleared', 'info');
                  } else if (currentStore && currentStore.setCode) {
                    // Fallback if updateCode isn't directly exposed or for safety
                    currentStore.setCode({ html: '', css: '', js: '' });
                    showToast('All code cleared', 'info');
                  }
                }}
                className="w-9 h-9 flex items-center justify-center rounded-md transition-colors text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 size={18} />
              </button>
            </TooltipWrapper>
          </div>

          {/* Text Wrap Toggle - hidden on mobile */}
          <div className="hidden md:block">
            <TooltipWrapper label={config.wordWrap ? 'Disable Text Wrap' : 'Enable Text Wrap'}>
              <button
                onClick={() => setConfig((prev: any) => ({ ...prev, wordWrap: !prev.wordWrap }))}
                className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${config.wordWrap
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <WrapText size={18} />
              </button>
            </TooltipWrapper>
          </div>

          {/* Line Numbers Toggle - hidden on mobile */}
          <div className="hidden md:block">
            <TooltipWrapper label={config.lineNumbers ? 'Hide Line Numbers' : 'Show Line Numbers'}>
              <button
                onClick={() => setConfig((prev: any) => ({ ...prev, lineNumbers: !prev.lineNumbers }))}
                className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${config.lineNumbers
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <ListOrdered size={18} />
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
                  className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${isDownloadDropdownOpen
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <Download size={18} />
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
                className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${isDeviceDropdownOpen
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                {getDeviceIcon(config.deviceFrame)}
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
                      className="w-9 h-9 flex items-center justify-center rounded-md transition-colors text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      aria-label="Animate"
                    >
                      <Play size={18} fill="currentColor" strokeWidth={0} />
                    </button>
                  </TooltipWrapper>
                ) : (
                  <>
                    {/* Pause / Resume Button */}
                    <TooltipWrapper label={isAnimationPaused ? 'Resume Animation' : 'Pause Animation'}>
                      <button
                        onClick={() => setIsAnimationPaused(!isAnimationPaused)}
                        className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${isAnimationPaused
                          ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                          }`}
                        aria-label={isAnimationPaused ? 'Resume' : 'Pause'}
                      >
                        {isAnimationPaused ? <Play size={18} fill="currentColor" strokeWidth={0} /> : <Pause size={18} fill="currentColor" strokeWidth={0} />}
                      </button>
                    </TooltipWrapper>

                    {/* Stop Button */}
                    <TooltipWrapper label="Reset Animation">
                      <button
                        onClick={() => {
                          setIsPlaying(false);
                          setIsAnimationPaused(false);
                        }}
                        className="w-9 h-9 flex items-center justify-center rounded-md transition-colors text-red-500 bg-red-50 dark:bg-red-900/20 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
                        aria-label="Reset"
                      >
                        <RotateCcw size={18} strokeWidth={2} />
                      </button>
                    </TooltipWrapper>
                  </>
                )}
              </div>
            )
          }

          {/* Save & Share Buttons - Animate & Type modes, Only for logged in users */}
          {(mode === 'animate' || mode === 'type') && session && (
            <div className="flex items-center gap-1.5 md:gap-2 mr-1.5 md:mr-2 border-r border-gray-200 dark:border-gray-800 pr-2">
              <div className="relative">
                <TooltipWrapper label="Save Snippet">
                  <button
                    onClick={() => setIsSaveDropdownOpen(!isSaveDropdownOpen)}
                    className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${isSaveDropdownOpen
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'} disabled:opacity-50`}
                    aria-label="Save"
                  >
                    <Save size={18} />
                  </button>
                </TooltipWrapper>

                {isSaveDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSaveDropdownOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-xl z-20 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Save Snippet</h3>
                        <button onClick={() => setIsSaveDropdownOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <X size={16} />
                        </button>
                      </div>

                      {saveStatus === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-2">
                            <Check size={16} className="text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-sm font-semibold text-green-700 dark:text-green-300">Snippet Saved!</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Name</label>
                            <input
                              type="text"
                              value={saveName}
                              onChange={(e) => setSaveName(e.target.value)}
                              className="w-full text-sm px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              placeholder="Enter snippet name..."
                            />
                            <div className="flex items-start gap-2 py-2 ">
                              <input
                                type="checkbox"
                                id="public-snippet"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                                className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <label htmlFor="public-snippet" className="text-xs text-gray-600 dark:text-gray-300">

                                Let others discover and watch your creative snippet.
                              </label>
                            </div>
                          </div>
                          <button
                            onClick={() => handleSave(false, saveName)}
                            disabled={saveStatus === 'saving'}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {saveStatus === 'saving' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            <span>Save Snippet</span>
                          </button>
                          {saveStatus === 'error' && (
                            <p className="text-xs text-red-500 text-center">Failed to save. Please try again.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <TooltipWrapper label="Share Snippet">
                <button
                  onClick={() => handleSave(true)}
                  disabled={isSaving}
                  className="w-9 h-9 flex items-center justify-center rounded-md transition-colors text-gray-500 dark:text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 disabled:opacity-50"
                  aria-label="Share"
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Share2 size={18} />}
                </button>
              </TooltipWrapper>
            </div>
          )}

          {/* Recording Controls - Type and Animate modes */}
          {
            (mode === 'type' || mode === 'animate') && (
              <div className="flex items-center gap-1.5">
                {/* Webcam Toggle - Type Only */}
                {mode === 'type' && (
                  <TooltipWrapper label={config.webcamEnabled ? 'Disable Webcam' : 'Enable Webcam'}>
                    <button
                      onClick={() => setConfig((prev: any) => ({ ...prev, webcamEnabled: !prev.webcamEnabled }))}
                      className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${config.webcamEnabled
                        ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                      {config.webcamEnabled ? <Camera size={20} /> : <CameraOff size={20} />}
                    </button>
                  </TooltipWrapper>
                )}

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
                        className="w-9 h-9 flex items-center justify-center rounded-md transition-colors text-gray-500 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 shadow-none"
                        aria-label="Start Recording"
                      >
                        <div className="w-3 h-3 bg-current rounded-full" />
                      </button>
                    </TooltipWrapper>
                  </FeatureGuard>
                ) : (

                  <>
                    <TooltipWrapper label={isPaused ? 'Resume Recording' : 'Pause Recording'}>
                      <button
                        onClick={isPaused ? resumeRecording : pauseRecording}
                        className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${isPaused
                          ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                          }`}
                        aria-label={isPaused ? 'Resume' : 'Pause'}
                      >
                        {isPaused ? <Play size={18} fill="currentColor" strokeWidth={0} /> : <Pause size={18} fill="currentColor" strokeWidth={0} />}
                      </button>
                    </TooltipWrapper>
                    <TooltipWrapper label={`Stop Recording (${formatTime(recordingTime)})`}>
                      <button
                        onClick={() => {
                          console.log('STOP button clicked');
                          stopRecording();
                        }}
                        className="w-9 h-9 flex items-center justify-center rounded-md transition-colors text-red-500 bg-red-50 dark:bg-red-900/20 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 animate-pulse"
                        aria-label="Stop Recording"
                      >
                        <Square size={18} fill="currentColor" strokeWidth={0} />
                      </button>
                    </TooltipWrapper>
                  </>
                )}
              </div>
            )
          }
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
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={shareUrl}
      />
    </header >
  );
};

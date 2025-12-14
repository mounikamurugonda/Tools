
import React, { useState } from 'react';
import { Settings, Volume2, MousePointer2, Wand2, Loader2 } from 'lucide-react';
import { AppConfig, Theme, DeviceFrame, TypingSpeed, CodeSnippet, SoundType } from '../types';
import { BACKGROUND_PRESETS, EDITOR_THEMES, FONT_SIZES, FRAME_OPTIONS } from '../constants';
import { formatCode } from '../utils/formatter';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  sourceCode: CodeSnippet;
  onSourceCodeChange: (val: CodeSnippet) => void;
  projectTitle: string;
  onProjectTitleChange: (val: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  config,
  setConfig,
  sourceCode,
  onSourceCodeChange,
  projectTitle,
  onProjectTitleChange
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('css');
  const [isFormatting, setIsFormatting] = useState(false);

  const handleCodeChange = (val: string) => {
    onSourceCodeChange({
      ...sourceCode,
      [activeTab]: val
    });
  };

  const performFormat = async (currentCode: string) => {
    setIsFormatting(true);
    const formatted = await formatCode(currentCode, activeTab);
    handleCodeChange(formatted);
    setIsFormatting(false);
  };

  const handleFormatClick = () => {
    performFormat(sourceCode[activeTab]);
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');

    const textarea = e.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const original = sourceCode[activeTab];

    // Construct the new content
    const newValue = original.substring(0, start) + pastedText + original.substring(end);

    // 1. Update state immediately so user sees the pasted content
    handleCodeChange(newValue);

    // 2. Trigger async formatting on the new content
    setIsFormatting(true);

    try {
      // Format the entire new value
      const formatted = await formatCode(newValue, activeTab);
      // Update with formatted value
      handleCodeChange(formatted);
    } catch (err) {
      console.error("Format on paste failed", err);
    } finally {
      setIsFormatting(false);
    }
  };

  return (
    <div
      className={`
        h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex-shrink-0 z-20 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-80 opacity-100' : 'w-0 opacity-0'}
      `}
    >
      <div className="w-80 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 shrink-0 bg-white dark:bg-gray-950">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold">
            <Settings size={18} />
            <span>Settings</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

          {/* Section: Project Info */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Project Info
            </label>
            <input
              value={projectTitle}
              onChange={(e) => onProjectTitleChange(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-xs text-gray-900 dark:text-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-700 transition-colors"
              placeholder="Project Title"
            />
          </div>

          {/* Section: Paste Code */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Source Code
              </label>
              <button
                onClick={handleFormatClick}
                disabled={isFormatting}
                className="flex items-center gap-1 text-[10px] bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded transition-colors disabled:opacity-50"
                title="Auto Format / Beautify"
              >
                {isFormatting ? <Loader2 size={10} className="animate-spin" /> : <Wand2 size={10} />}
                <span>Format</span>
              </button>
            </div>

            {/* Tab Bar */}
            <div className="flex p-1 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              {['html', 'css', 'js'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t as 'html' | 'css' | 'js')}
                  className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${activeTab === t ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-700' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-400'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <textarea
              value={sourceCode[activeTab]}
              onChange={(e) => handleCodeChange(e.target.value)}
              onPaste={handlePaste}
              className="w-full h-64 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-xs font-mono text-gray-900 dark:text-gray-300 focus:outline-none focus:border-blue-500 resize-none placeholder-gray-400 dark:placeholder-gray-700 leading-relaxed whitespace-pre-wrap break-words"
              placeholder={`Paste your ${activeTab.toUpperCase()} code here.`}
              spellCheck={false}
            />
          </div>

          {/* Section: Appearance */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Appearance</label>

            {/* Background Selector */}
            <div className="space-y-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Background</span>
              <div className="grid grid-cols-4 gap-2">
                {BACKGROUND_PRESETS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setConfig(p => ({ ...p, background: bg.id }))}
                    className={`
                       aspect-square rounded-lg border-2 transition-all relative overflow-hidden group
                       ${config.background === bg.id ? 'border-gray-900 dark:border-white shadow-lg scale-105' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-500'}
                     `}
                    title={bg.label}
                  >
                    <div className={`w-full h-full ${bg.value}`} />
                    {config.background === bg.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
                <select
                  value={config.theme}
                  onChange={(e) => setConfig(p => ({ ...p, theme: e.target.value as Theme }))}
                  className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 outline-none focus:border-blue-500"
                >
                  {EDITOR_THEMES.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Font Size</span>
                <select
                  value={config.fontSize}
                  onChange={(e) => setConfig(p => ({ ...p, fontSize: Number(e.target.value) }))}
                  className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 outline-none focus:border-blue-500"
                >
                  {FONT_SIZES.map((size) => (
                    <option key={size} value={size}>{size}px</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Canvas Size</span>
              <select
                value={config.deviceFrame}
                onChange={(e) => setConfig(p => ({ ...p, deviceFrame: e.target.value as DeviceFrame }))}
                className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 outline-none focus:border-blue-500"
              >
                {/* Standard Group */}
                <optgroup label="Standard">
                  {FRAME_OPTIONS.filter(f => f.group === 'Standard').map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </optgroup>
                {/* Social Media Group */}
                <optgroup label="Social Media">
                  {FRAME_OPTIONS.filter(f => f.group === 'Social Media').map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Section: Animation */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Animation</label>

            <div className="space-y-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Typing Speed</span>
              <select
                value={config.typingSpeed}
                onChange={(e) => setConfig(p => ({ ...p, typingSpeed: e.target.value as TypingSpeed }))}
                className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 outline-none focus:border-blue-500"
              >
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
                <option value="instant">Instant</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Audio Profile</span>
                <button
                  onClick={() => setConfig(p => ({ ...p, soundEnabled: !p.soundEnabled }))}
                  className={`w-10 h-5 rounded-full relative transition-colors ${config.soundEnabled ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.soundEnabled ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              <div className={`relative transition-opacity ${config.soundEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <select
                  value={config.soundType}
                  onChange={(e) => setConfig(p => ({ ...p, soundType: e.target.value as SoundType }))}
                  className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 outline-none focus:border-blue-500 appearance-none"
                  disabled={!config.soundEnabled}
                >
                  {(['thock', 'clicky', 'typewriter', 'membrane', 'bubble'] as SoundType[]).map((type) => (
                    <option key={type} value={type} className="capitalize">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
                <Volume2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-300">
                <MousePointer2 size={16} />
                <span>Show Cursor</span>
              </div>
              <button
                onClick={() => setConfig(p => ({ ...p, showCursor: !p.showCursor }))}
                className={`w-10 h-5 rounded-full relative transition-colors ${config.showCursor ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.showCursor ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;

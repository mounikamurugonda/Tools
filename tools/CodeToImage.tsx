'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Slider from '@/components/ui/Slider';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import FileUpload from '@/components/ui/FileUpload';
// import Prism from 'prismjs';
import {
  Download,
  Copy,
  Palette,
  Layout,
  Code as CodeIcon,
  Monitor,
  Type,
  CheckCircle2,
  FileText,
  Upload,
} from 'lucide-react';

// Background Presets
const BACKGROUNDS = [
  {
    name: 'Candy',
    value: 'linear-gradient(140deg, rgb(255, 207, 115), rgb(255, 122, 47))',
  },
  {
    name: 'Ocean',
    value: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
  },
  {
    name: 'Midnight',
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    name: 'Forest',
    value: 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)',
  },
  {
    name: 'Sunset',
    value: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
  },
  { name: 'Nebula', value: 'linear-gradient(to right, #c31432, #240b36)' },
  { name: 'Sublime', value: 'linear-gradient(to right, #fc5c7d, #6a82fb)' },
  { name: 'Witching', value: 'linear-gradient(to right, #c94b4b, #4b134f)' },
  { name: 'Solid Gray', value: '#1f2937' },
  { name: 'Transparent', value: 'transparent' },
];

// Languages
const LANGUAGES = [
  { name: 'JavaScript', value: 'javascript' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'CSS', value: 'css' },
  { name: 'HTML', value: 'html' },
  { name: 'Python', value: 'python' },
  { name: 'Java', value: 'java' },
  { name: 'SQL', value: 'sql' },
  { name: 'JSON', value: 'json' },
  { name: 'Bash', value: 'bash' },
  { name: 'Rust', value: 'rust' },
  { name: 'Go', value: 'go' },
];

// Themes (Simplified mapping to CSS classes we will inject)
const THEMES = [
  { name: 'Dracula', bg: '#282a36', text: '#f8f8f2', border: '#6272a4' },
  { name: 'Material Dark', bg: '#263238', text: '#e9eded', border: '#546e7a' },
  { name: 'Material Light', bg: '#fafafa', text: '#90a4ae', border: '#cfd8dc' },
  { name: 'Night Owl', bg: '#011627', text: '#d6deeb', border: '#5f7e97' },
  { name: 'One Dark', bg: '#282c34', text: '#abb2bf', border: '#3e4451' },
  { name: 'Nord', bg: '#2e3440', text: '#d8dee9', border: '#4c566a' },
];

const CodeToImage: React.FC<ToolProps> = ({ details, toolId }) => {
  const [code, setCode] = useState(`function isAwesome(tool) {
  if (tool === 'UtilToolkits') {
    return true;
  }
  return false;
}`);
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState(THEMES[0]);
  const [background, setBackground] = useState(BACKGROUNDS[2].value);
  const [padding, setPadding] = useState(64);
  const [showControls, setShowControls] = useState(true);
  const [windowTitle, setWindowTitle] = useState('Snippet.js');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [shadowBlur, setShadowBlur] = useState(20);
  const [shadowOpacity, setShadowOpacity] = useState(0.5);
  const [isExporting, setIsExporting] = useState(false);
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');

  const exportRef = useRef<HTMLDivElement>(null);

  // Highlight code logic is handled dynamically in render via Prism.highlight

  const handleExport = async (format: 'png' | 'jpeg' | 'svg' | 'copy') => {
    if (!exportRef.current) return;
    setIsExporting(true);

    try {
      const filter = (node: HTMLElement) => !node.classList?.contains('exclude-from-export');

      const options = {
        quality: 1,
        pixelRatio: 2,
        filter,
        style: { margin: '0' },
      };

      let dataUrl = '';
      const htmlToImage = await import('html-to-image');

      if (format === 'png') {
        dataUrl = await htmlToImage.toPng(exportRef.current, options);
      } else if (format === 'jpeg') {
        dataUrl = await htmlToImage.toJpeg(exportRef.current, options);
      } else if (format === 'svg') {
        dataUrl = await htmlToImage.toSvg(exportRef.current, options);
      } else if (format === 'copy') {
        const blob = await htmlToImage.toPng(exportRef.current, {
          ...options,
          type: 'image/png',
        });
        const response = await fetch(blob);
        const blobData = await response.blob();
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blobData })]);
        setIsExporting(false);
        // Ideally show a toast here, using alert for simplicity as requested
        alert('Image copied to clipboard!');
        return;
      }

      const link = document.createElement('a');
      link.download = `snippet-${new Date().getTime()}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
      alert('Failed to export image.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setCode(text);
        setInputMode('text');
        // Simple auto-detect attempt (very basic)
        if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) setLanguage('typescript');
        else if (file.name.endsWith('.js') || file.name.endsWith('.jsx')) setLanguage('javascript');
        else if (file.name.endsWith('.css')) setLanguage('css');
        else if (file.name.endsWith('.html')) setLanguage('html');
        else if (file.name.endsWith('.py')) setLanguage('python');
        else if (file.name.endsWith('.json')) setLanguage('json');
      }
    };
    reader.readAsText(file);
  };

  // Theme-specific Prism styles injector
  const getThemeStyles = () => {
    switch (theme.name) {
      case 'Material Light':
        return `
          .token.comment { color: #90a4ae; font-style: italic; }
          .token.keyword { color: #00bcd4; }
          .token.string { color: #43a047; }
          .token.function { color: #3949ab; }
          .token.number { color: #f44336; }
          .token.operator { color: #546e7a; }
          .token.class-name { color: #f6a434; }
        `;
      case 'Night Owl':
        return `
          .token.comment { color: #637777; font-style: italic; }
          .token.keyword { color: #c792ea; }
          .token.string { color: #ecc48d; }
          .token.function { color: #82aaff; }
          .token.number { color: #f78c6c; }
          .token.operator { color: #c792ea; }
          .token.class-name { color: #ffcb6b; }
        `;
      case 'One Dark':
        return `
          .token.comment { color: #5c6370; font-style: italic; }
          .token.keyword { color: #c678dd; }
          .token.string { color: #98c379; }
          .token.function { color: #61afef; }
          .token.number { color: #d19a66; }
          .token.operator { color: #56b6c2; }
          .token.class-name { color: #e5c07b; }
        `;
      case 'Nord':
        return `
          .token.comment { color: #616e88; font-style: italic; }
          .token.keyword { color: #81a1c1; }
          .token.string { color: #a3be8c; }
          .token.function { color: #88c0d0; }
          .token.number { color: #b48ead; }
          .token.operator { color: #81a1c1; }
          .token.class-name { color: #8fbcbb; }
        `;
      case 'Dracula':
      default:
        return `
          .token.comment { color: #6272a4; font-style: italic; }
          .token.keyword { color: #ff79c6; }
          .token.string { color: #f1fa8c; }
          .token.function { color: #50fa7b; }
          .token.number { color: #bd93f9; }
          .token.operator { color: #ff79c6; }
          .token.class-name { color: #8be9fd; }
        `;
    }
  };

  return (
    <ToolContainer title="Code to Image Converter" details={details} toolId={toolId}>
      {/* Inject dynamic styles for syntax highlighting */}
      <style dangerouslySetInnerHTML={{ __html: getThemeStyles() }} />

      <div className="flex flex-col-reverse lg:flex-row gap-8 h-full items-start">
        {/* Controls Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
          {/* Export Actions moved to bottom of preview area */}

          {/* Styling Section */}
          <Card className="space-y-4">
            <div className="space-y-3">
              <Label>Theme</Label>
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map(t => (
                  <button
                    key={t.name}
                    onClick={() => setTheme(t)}
                    className={`px-3 py-2 text-xs rounded-md border text-left transition-all flex items-center gap-2 ${theme.name === t.name
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full border border-black/10"
                      style={{ background: t.bg }}
                    ></div>
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Background</Label>
              <div className="grid grid-cols-5 gap-2">
                {BACKGROUNDS.map((bg, i) => (
                  <button
                    key={i}
                    onClick={() => setBackground(bg.value)}
                    className={`aspect-square w-full rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 ${background === bg.value ? 'border-white ring-2 ring-blue-500 shadow-md' : 'border-transparent'}`}
                    style={{ background: bg.value }}
                    title={bg.name}
                    aria-label={`Select background ${bg.name}`}
                  >
                    {background === bg.value && (
                      <CheckCircle2 className="w-full h-full text-white p-1 drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Window Settings */}
          <Card title="Window" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Slider
                label="Padding"
                min={16}
                max={128}
                step={8}
                value={padding}
                onChange={e => setPadding(Number(e.target.value))}
                valueDisplay={`${padding}px`}
              />
              <Slider
                label="Shadow"
                min={0}
                max={60}
                value={shadowBlur}
                onChange={e => setShadowBlur(Number(e.target.value))}
                valueDisplay={`${shadowBlur}px`}
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Window Controls
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showControls}
                    onChange={() => setShowControls(!showControls)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div>
                <Label>Window Title</Label>
                <Input
                  value={windowTitle}
                  onChange={e => setWindowTitle(e.target.value)}
                  placeholder="Snippet.js"
                />
              </div>
            </div>
          </Card>

          {/* Editor Settings */}
          <Card title="Editor" className="space-y-4">
            <div>
              <Label>Language</Label>
              <Select value={language} onChange={e => setLanguage(e.target.value)}>
                {LANGUAGES.map(l => (
                  <option key={l.value} value={l.value}>
                    {l.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Line Numbers
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLineNumbers}
                  onChange={() => setShowLineNumbers(!showLineNumbers)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </Card>
        </div>

        {/* Preview Area */}
        <div className="flex-1 w-full lg:sticky lg:top-6">
          <Card className="p-0 overflow-hidden min-h-[500px] flex items-center justify-center relative">
            {/* Checkerboard background for transparency */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            ></div>

            <div className="overflow-auto max-w-full max-h-full flex items-center justify-center w-full p-8">
              {/* Export Container */}
              <div
                ref={exportRef}
                style={{
                  background,
                  padding: `${padding}px`,
                }}
                className="transition-all duration-300 ease-out min-w-[320px] sm:min-w-[480px] rounded-lg"
              >
                {/* Window */}
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300 border"
                  style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.border,
                    boxShadow: `0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0,0,0,${shadowOpacity})`,
                  }}
                >
                  {/* Window Header */}
                  <div className="px-4 py-3 flex items-center relative bg-black/10 dark:bg-white/5 border-b border-white/5">
                    {showControls && (
                      <div className="flex gap-2 absolute left-4 z-10">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                      </div>
                    )}
                    <div
                      className="mx-auto text-xs font-medium opacity-60 select-none"
                      style={{ color: theme.text }}
                    >
                      {windowTitle}
                    </div>
                  </div>

                  {/* Editor Area */}
                  <div className="relative group">
                    {/* Textarea for input - overlay transparently */}
                    <textarea
                      data-lenis-prevent
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      className="absolute inset-0 w-full h-full p-4 font-mono text-sm bg-transparent text-transparent caret-white outline-none resize-none overflow-hidden z-10 exclude-from-export"
                      style={{
                        lineHeight: '1.5',
                        paddingLeft: showLineNumbers ? '3.5rem' : '1rem',
                      }}
                      spellCheck={false}
                    />

                    {/* Rendered Code */}
                    <div className="p-4 overflow-hidden">
                      <pre
                        className="font-mono text-sm margin-0"
                        style={{
                          color: theme.text,
                          lineHeight: '1.5',
                          margin: 0,
                          fontFamily:
                            'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        }}
                      >
                        {code.split('\n').map((line, i) => (
                          <div key={i} className="table-row">
                            {showLineNumbers && (
                              <span
                                className="table-cell text-right pr-4 select-none opacity-30 w-10 border-r border-white/10 mr-4"
                                style={{ color: theme.text }}
                              >
                                {i + 1}
                              </span>
                            )}
                            <span
                              className="table-cell pl-4"
                            >
                              {line || ' '}
                            </span>
                          </div>
                        ))}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isExporting && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Generating image...
                  </span>
                </div>
              </div>
            )}
          </Card>

          {/* Export Actions & Input - Moved here */}
          <Card className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 items-end">
            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
              <Label className="text-xs">Download</Label>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleExport('png')}
                  disabled={isExporting}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  <Download size={16} className="mr-2" /> PNG
                </Button>
                <Button
                  onClick={() => handleExport('svg')}
                  disabled={isExporting}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  <Download size={16} className="mr-2" /> SVG
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
              <Label className="text-xs">Clipboard</Label>
              <Button
                onClick={() => handleExport('copy')}
                disabled={isExporting}
                variant="secondary"
                size="sm"
                className="w-full text-green-600 border border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <Copy size={16} className="mr-2" /> Copy Image
              </Button>
            </div>

            <div className="flex flex-col gap-2 col-span-2 md:col-span-2">
              <Label className="text-xs">Input Source</Label>
              <div className="flex gap-2">
                <Button
                  variant={inputMode === 'text' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setInputMode('text')}
                  className="flex-1 text-xs"
                >
                  <FileText size={14} className="mr-2" /> Paste Code
                </Button>
                <Button
                  variant={inputMode === 'file' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setInputMode('file')}
                  className="flex-1 text-xs"
                >
                  <Upload size={14} className="mr-2" /> Upload File
                </Button>
              </div>
            </div>

            {inputMode === 'file' && (
              <div className="col-span-2 md:col-span-4 mt-2">
                <FileUpload onFileSelect={handleFileUpload} className="h-24" />
              </div>
            )}
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default CodeToImage;

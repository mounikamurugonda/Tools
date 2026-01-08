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
import Editor, { loader } from '@monaco-editor/react';
import * as htmlToImage from 'html-to-image';
import {
  Download,
  Copy,
  FileText,
  Upload,
  CheckCircle2,
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
  { name: 'Bash', value: 'shell' }, // Monaco uses 'shell' usually
  { name: 'Rust', value: 'rust' },
  { name: 'Go', value: 'go' },
];

// Themes (Mapped to Monaco themes)
const THEMES = [
  { name: 'VS Dark', value: 'vs-dark', bg: '#1e1e1e' },
  { name: 'Light', value: 'light', bg: '#fffffe' },
  { name: 'Dracula', value: 'dracula', bg: '#282a36' }, // Custom defined above
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
  const editorRef = useRef<any>(null);

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
        // Simple auto-detect attempt
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

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Custom Dracula theme definition (ensure it's defined when mounting)
    monaco.editor.defineTheme('dracula', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ff79c6' },
        { token: 'string', foreground: 'f1fa8c' },
        { token: 'number', foreground: 'bd93f9' },
        { token: 'type', foreground: '8be9fd' },
      ],
      colors: {
        'editor.background': '#282a36',
        'editor.foreground': '#f8f8f2',
      },
    });
  };

  // Calculate generic height based on line count for auto-sizing
  const lineCount = code.split('\n').length;
  const editorHeight = Math.max(100, Math.min(lineCount * 20 + 40, 800));

  return (
    <ToolContainer title="Code to Image Converter" details={details} toolId={toolId}>
      <div className="flex flex-col-reverse lg:flex-row gap-8 h-full items-start">
        {/* Controls Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
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
                  >
                    {background === bg.value && (
                      <CheckCircle2 className="w-full h-full text-white p-1 drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Card>

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
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
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
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
              </label>
            </div>
          </Card>
        </div>

        {/* Preview Area */}
        <div className="flex-1 w-full lg:sticky lg:top-6">
          <Card className="p-0 overflow-hidden min-h-[500px] flex items-center justify-center relative bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            {/* Checkerboard background */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            ></div>

            <div className="overflow-auto max-w-full max-h-full flex items-center justify-center w-full p-8">
              <div
                ref={exportRef}
                style={{
                  background,
                  padding: `${padding}px`,
                }}
                className="transition-all duration-300 ease-out min-w-[320px] sm:min-w-[480px] rounded-lg"
              >
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300 border shadow-2xl"
                  style={{
                    backgroundColor: theme.bg,
                    boxShadow: `0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0,0,0,${shadowOpacity})`,
                    border: '1px solid rgba(255,255,255,0.1)'
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
                    <div className="mx-auto text-xs font-medium opacity-60 select-none text-gray-400">
                      {windowTitle}
                    </div>
                  </div>

                  {/* Monaco Editor */}
                  <div className="py-2">
                    <Editor
                      height={`${editorHeight}px`}
                      defaultLanguage="javascript"
                      language={language}
                      value={code}
                      theme={theme.value}
                      onChange={(value) => setCode(value || '')}
                      onMount={handleEditorDidMount}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: showLineNumbers ? 'on' : 'off',
                        scrollBeyondLastLine: false,
                        folding: false,
                        automaticLayout: true,
                        readOnly: false, // Allow editing directly in the image preview!
                        fontFamily: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        contextmenu: false,
                        overviewRulerBorder: false,
                        hideCursorInOverviewRuler: true,
                        scrollbar: {
                          vertical: 'hidden',
                          horizontal: 'hidden',
                          handleMouseWheel: false,
                        },
                        overviewRulerLanes: 0
                      }}
                    />
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

          <Card className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 items-end">
            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
              <Label className="text-xs">Download</Label>
              <div className="flex gap-2">
                <Button onClick={() => handleExport('png')} disabled={isExporting} variant="primary" size="sm" className="w-full">
                  <Download size={16} className="mr-2" /> PNG
                </Button>
                <Button onClick={() => handleExport('svg')} disabled={isExporting} variant="secondary" size="sm" className="w-full">
                  <Download size={16} className="mr-2" /> SVG
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
              <Label className="text-xs">Clipboard</Label>
              <Button onClick={() => handleExport('copy')} disabled={isExporting} variant="secondary" size="sm" className="w-full text-green-600 border border-green-200 hover:bg-green-50">
                <Copy size={16} className="mr-2" /> Copy Image
              </Button>
            </div>

            <div className="flex flex-col gap-2 col-span-2 md:col-span-2">
              <Label className="text-xs">Input Source</Label>
              <div className="flex gap-2">
                <Button variant={inputMode === 'text' ? 'secondary' : 'ghost'} size="sm" onClick={() => setInputMode('text')} className="flex-1 text-xs">
                  <FileText size={14} className="mr-2" /> Paste Code
                </Button>
                <Button variant={inputMode === 'file' ? 'secondary' : 'ghost'} size="sm" onClick={() => setInputMode('file')} className="flex-1 text-xs">
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

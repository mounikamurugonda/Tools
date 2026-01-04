'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import { DiffEditor, useMonaco } from '@monaco-editor/react';
import { useTheme } from '@/components/ThemeProvider';
import {
  Upload,
  ArrowRightLeft,
  Trash2,
  Copy,
  Columns,
  Rows,
  WrapText,
  Space,
  Type,
} from 'lucide-react';
import Button from '@/components/ui/Button';

// Detection map for file extensions
const EXTENSION_TO_LANGUAGE: { [key: string]: string } = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  json: 'json',
  html: 'html',
  css: 'css',
  scss: 'scss',
  less: 'less',
  md: 'markdown',
  xml: 'xml',
  sql: 'sql',
  py: 'python',
  java: 'java',
  c: 'c',
  cpp: 'cpp',
  cs: 'csharp',
  go: 'go',
  rs: 'rust',
  yaml: 'yaml',
  yml: 'yaml',
  ini: 'ini',
  lua: 'lua',
  rb: 'ruby',
  php: 'php',
  sh: 'shell',
};

const DiffChecker: React.FC<ToolProps> = ({ details, toolId }) => {
  const { theme } = useTheme();
  const monaco = useMonaco();
  const diffEditorRef = useRef<any>(null);

  const [originalText, setOriginalText] = useState(
    '// Original Version\nfunction calculateTotal(price, tax) {\n  return price + (price * tax);\n}\n\nconsole.log(calculateTotal(100, 0.2));'
  );
  const [modifiedText, setModifiedText] = useState(
    '// Modified Version\nfunction calculateTotal(price, taxRate) {\n  const total = price * (1 + taxRate);\n  return total.toFixed(2);\n}\n\nconsole.log(calculateTotal(100, 0.2));'
  );

  const [language, setLanguage] = useState('javascript');
  const [renderSideBySide, setRenderSideBySide] = useState(true);
  const [ignoreTrimWhitespace, setIgnoreTrimWhitespace] = useState(false);
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('on');

  // Sync theme with Monaco
  useEffect(() => {
    if (monaco) {
      monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'light');
    }
  }, [theme, monaco]);

  const handleEditorDidMount = (editor: any) => {
    diffEditorRef.current = editor;

    const originalModel = editor.getOriginalEditor().getModel();
    const modifiedModel = editor.getModifiedEditor().getModel();

    originalModel.onDidChangeContent(() => {
      setOriginalText(originalModel.getValue());
    });
    modifiedModel.onDidChangeContent(() => {
      setModifiedText(modifiedModel.getValue());
    });
  };

  const detectLanguageFromFileName = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension && EXTENSION_TO_LANGUAGE[extension]) {
      setLanguage(EXTENSION_TO_LANGUAGE[extension]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isOriginal: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    detectLanguageFromFileName(file.name);

    const reader = new FileReader();
    reader.onload = event => {
      const text = event.target?.result as string;
      if (isOriginal) {
        setOriginalText(text);
      } else {
        setModifiedText(text);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const swapContent = () => {
    const temp = originalText;
    setOriginalText(modifiedText);
    setModifiedText(temp);
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to clear both editors?')) {
      setOriginalText('');
      setModifiedText('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolContainer title="Diff Checker" details={details} toolId={toolId}>
      <div className="flex flex-col h-[85vh]">
        {/* Compact Toolbar */}
        <div className="flex justify-between items-center pb-2 px-1">
          <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-md">
            <Button
              variant={renderSideBySide ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setRenderSideBySide(true)}
              title="Split View"
              className="h-7 px-2 text-xs gap-1.5"
            >
              <Columns className="w-3.5 h-3.5" /> Split
            </Button>
            <Button
              variant={!renderSideBySide ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setRenderSideBySide(false)}
              title="Inline View"
              className="h-7 px-2 text-xs gap-1.5"
            >
              <Rows className="w-3.5 h-3.5" /> Inline
            </Button>

            <div className="w-px h-4 bg-border mx-1" />

            <Button
              variant={wordWrap === 'on' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setWordWrap(prev => (prev === 'on' ? 'off' : 'on'))}
              title="Toggle Word Wrap"
              className="h-7 px-2 text-xs gap-1.5"
            >
              <WrapText className="w-3.5 h-3.5" /> Wrap
            </Button>
            <Button
              variant={ignoreTrimWhitespace ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setIgnoreTrimWhitespace(prev => !prev)}
              title="Ignore White Space"
              className="h-7 px-2 text-xs gap-1.5"
            >
              <Type className="w-3.5 h-3.5" /> Trim Space
            </Button>
          </div>

          <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-md">
            <Button
              onClick={swapContent}
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs gap-1.5"
              title="Swap Sides"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" /> Swap
            </Button>
            <Button
              onClick={clearAll}
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs gap-1.5 hover:text-destructive hover:bg-destructive/10"
              title="Clear All"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </Button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-grow border rounded-lg overflow-hidden relative bg-background shadow-sm flex flex-col">
          {/* File Upload Headers */}
          <div className="grid grid-cols-2 bg-muted/50 border-b divide-x">
            <div className="flex justify-between items-center p-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-2">
                Original
              </span>
              <div className="flex gap-1">
                <label className="cursor-pointer inline-flex items-center justify-center rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-background hover:text-foreground hover:shadow-sm h-6 px-2 text-xs font-medium text-muted-foreground">
                  <Upload className="w-3 h-3 mr-1.5" /> Load
                  <input type="file" className="hidden" onChange={e => handleFileUpload(e, true)} />
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => copyToClipboard(originalText)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-2">
                Modified
              </span>
              <div className="flex gap-1">
                <label className="cursor-pointer inline-flex items-center justify-center rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-background hover:text-foreground hover:shadow-sm h-6 px-2 text-xs font-medium text-muted-foreground">
                  <Upload className="w-3 h-3 mr-1.5" /> Load
                  <input
                    type="file"
                    className="hidden"
                    onChange={e => handleFileUpload(e, false)}
                  />
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => copyToClipboard(modifiedText)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          <div data-lenis-prevent className="flex-grow">
            <DiffEditor
              height="100%"
              language={language}
              original={originalText}
              modified={modifiedText}
              onMount={handleEditorDidMount}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                renderSideBySide: renderSideBySide,
                originalEditable: true,
                readOnly: false,
                wordWrap: wordWrap,
                ignoreTrimWhitespace: ignoreTrimWhitespace,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                fontFamily: '"Geist Mono", monospace',
                fontSize: 14,
                diffWordWrap: 'on',
                padding: { top: 16 },
              }}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default DiffChecker;

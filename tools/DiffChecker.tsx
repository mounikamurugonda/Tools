'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import { DiffEditor, useMonaco } from '@monaco-editor/react';
import { useTheme } from '@/components/ThemeProvider';
import Button from '@/components/ui/Button';


import {
  Upload,
  ArrowRightLeft,
  Trash2,
  Columns,
  Rows,
  WrapText,
  Type,
} from 'lucide-react';



const DiffChecker: React.FC<ToolProps> = ({ details, toolId }) => {
  const { theme } = useTheme();
  const monaco = useMonaco();
  const diffEditorRef = useRef<any>(null);

  const [originalText, setOriginalText] = useState(
    ''
  );
  const [modifiedText, setModifiedText] = useState(
    ''
  );


  const [renderSideBySide, setRenderSideBySide] = useState(true);
  const [ignoreTrimWhitespace, setIgnoreTrimWhitespace] = useState(false);
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('on');

  useEffect(() => {
    if (monaco) {
      monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'light');
    }
  }, [theme, monaco]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    diffEditorRef.current = editor;

    // Use refs instead of state listeners for typing.
    // This prevents re-renders on every keystroke that reset cursor position.
    // We only update state on explicit actions (Swap, Upload, etc.) after reading from the editor.

    // Disable Ctrl+Space
    editor.getOriginalEditor().addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => { });
    editor.getModifiedEditor().addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => { });
  };

  const syncEditorState = () => {
    if (diffEditorRef.current) {
      const currentOriginal = diffEditorRef.current.getOriginalEditor().getValue();
      const currentModified = diffEditorRef.current.getModifiedEditor().getValue();
      setOriginalText(currentOriginal);
      setModifiedText(currentModified);
      return { original: currentOriginal, modified: currentModified };
    }
    return { original: originalText, modified: modifiedText };
  };



  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isOriginal: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Sync current values first to ensure we don't lose typed changes in the OTHER editor
    const { original, modified } = syncEditorState();

    const reader = new FileReader();
    reader.onload = event => {
      const text = event.target?.result as string;
      if (isOriginal) {
        setOriginalText(text);
        // Ensure modified is kept as is (though state would be updated by syncEditorState)
        setModifiedText(modified);
      } else {
        setModifiedText(text);
        // Ensure original is kept as is
        setOriginalText(original);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const swapContent = () => {
    const { original, modified } = syncEditorState();
    setOriginalText(modified);
    setModifiedText(original);
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to clear both editors?')) {
      setOriginalText('');
      setModifiedText('');
    }
  };

  const headerOptions = (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full p-4 border-b">
      {/* Language & Toggles */}
      <div className="flex items-center gap-2 flex-1">


        <div className="flex bg-muted/20 p-1 rounded-md gap-1">
          <Button
            variant={renderSideBySide ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => {
              syncEditorState();
              setRenderSideBySide(true);
            }}
            title="Split View"
            className="h-7 w-7 !p-0"
          >
            <Columns className="w-4 h-4" />
          </Button>
          <Button
            variant={!renderSideBySide ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => {
              syncEditorState();
              setRenderSideBySide(false);
            }}
            title="Inline View"
            className="h-7 w-7 !p-0"
          >
            <Rows className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex bg-muted/20 p-1 rounded-md gap-1 ml-2">
          <Button
            variant={wordWrap === 'on' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => {
              syncEditorState();
              setWordWrap(prev => (prev === 'on' ? 'off' : 'on'));
            }}
            title="Toggle Word Wrap"
            className="h-7 w-7 !p-0"
          >
            <WrapText className="w-4 h-4" />
          </Button>
          <Button
            variant={ignoreTrimWhitespace ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => {
              syncEditorState();
              setIgnoreTrimWhitespace(prev => !prev);
            }}
            title="Ignore Whitespace"
            className="h-7 w-7 !p-0"
          >
            <Type className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-2">
        <Button onClick={swapContent} variant="ghost" size="sm" className="h-8" title="Swap">
          <ArrowRightLeft className="w-4 h-4" />
        </Button>
        <Button onClick={clearAll} variant="ghost" size="sm" className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50" title="Clear All">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <ToolContainer
      title="Diff Checker"
      details={details}
      toolId={toolId}
      headerContent={headerOptions}
      variant="transparent"
    >
      <div className="h-[calc(100vh-210px)] flex flex-col border border-border rounded-lg overflow-hidden bg-background">
        {/* Pane Headers with Upload Icons */}
        <div className="flex border-b border-border bg-muted/10 h-10 divide-x divide-border">
          {renderSideBySide ? (
            <>
              <div className="flex-1 flex justify-between items-center px-4">
                <span className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-2">
                  Original
                </span>
                <label className="cursor-pointer inline-flex items-center justify-center p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Upload Original">
                  <Upload className="w-4 h-4" />
                  <input type="file" className="hidden" onChange={e => handleFileUpload(e, true)} />
                </label>
              </div>
              <div className="flex-1 flex justify-between items-center px-4">
                <span className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-2">
                  Modified
                </span>
                <label className="cursor-pointer inline-flex items-center justify-center p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Upload Modified">
                  <Upload className="w-4 h-4" />
                  <input type="file" className="hidden" onChange={e => handleFileUpload(e, false)} />
                </label>
              </div>
            </>
          ) : (
            <div className="flex-1 flex justify-between items-center px-4 bg-muted/20">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Diff View (Inline)</span>
              <div className="flex gap-2">
                <label className="cursor-pointer inline-flex items-center justify-center h-7 px-2 rounded-md hover:bg-background text-xs border border-transparent hover:border-border transition-colors" title="Upload Original">
                  <Upload className="w-3.5 h-3.5 mr-1.5" /> Original
                  <input type="file" className="hidden" onChange={e => handleFileUpload(e, true)} />
                </label>
                <label className="cursor-pointer inline-flex items-center justify-center h-7 px-2 rounded-md hover:bg-background text-xs border border-transparent hover:border-border transition-colors" title="Upload Modified">
                  <Upload className="w-3.5 h-3.5 mr-1.5" /> Modified
                  <input type="file" className="hidden" onChange={e => handleFileUpload(e, false)} />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Diff Editor */}
        <div className="flex-1 relative">
          <DiffEditor
            height="100%"
            language="plaintext"
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
              fontSize: 13,
              diffWordWrap: 'on',
              padding: { top: 16 },
              quickSuggestions: { other: false, comments: false, strings: false },
              parameterHints: { enabled: false },
              suggestOnTriggerCharacters: false,
              autoIndent: 'none',
              formatOnType: false,
              formatOnPaste: false,
              matchBrackets: 'never',
              autoClosingBrackets: 'never',
            }}
          />
        </div>
      </div>
    </ToolContainer>
  );
};

export default DiffChecker;

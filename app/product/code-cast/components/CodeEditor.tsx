import React, { useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { AppConfig } from '../types';

interface CodeEditorProps {
  code: string;
  language: string;
  config: AppConfig;
  onChange?: (val: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, config, onChange, readOnly }) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  // Map our themes to Monaco themes
  const getMonacoTheme = () => {
    switch (config.theme) {
      case 'light':
      case 'github':
      case 'solarized-light':
        return 'vs';
      case 'dark':
      case 'dracula':
      case 'monokai':
      case 'twilight':
      case 'nord':
      case 'solarized-dark':
      case 'synthwave':
      default:
        return 'vs-dark';
    }
  };

  const getLanguage = () => {
    if (language === 'js') return 'javascript';
    return language;
  };

  // Auto-scroll logic for animation - keep current line visible
  // Only apply when readOnly (during playback), not when user is editing
  useEffect(() => {
    if (readOnly && editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        const lineCount = model.getLineCount();
        // Use revealLineInCenter for smoother scrolling that keeps the current line visible
        // This centers the line in the viewport rather than just revealing it
        editorRef.current.revealLineInCenter(lineCount, 0); // 0 = smooth scroll
      }
    }
  }, [code, readOnly]);

  return (
    <div className="w-full h-full overflow-hidden">
      <Editor
        key={language} // Force re-mount on language change to ensure clean state
        height="100%"
        width="100%"
        language={getLanguage()}
        value={code}
        theme={getMonacoTheme()}
        onChange={(value) => onChange && onChange(value || '')}
        onMount={handleEditorDidMount}
        options={{
          readOnly: readOnly,
          minimap: { enabled: false },
          fontSize: config.fontSize,
          lineNumbers: config.lineNumbers ? 'on' : 'off',
          lineNumbersMinChars: 3, // Compact but with breathing room
          glyphMargin: false, // Remove glyph margin for more space
          folding: false, // Disable folding to save space
          scrollBeyondLastLine: false,
          wordWrap: config.wordWrap ? 'on' : 'off',
          automaticLayout: true,
          fontFamily: '"Fira Code", "JetBrains Mono", "Menlo", "Consolas", monospace',
          fontLigatures: true,
          cursorBlinking: 'smooth',
          smoothScrolling: true,
          contextmenu: !readOnly,
          renderLineHighlight: 'none', // clean look
          padding: { top: 16, bottom: 16 },
          lineDecorationsWidth: 10, // Remove line decoration width
        }}
      />
    </div>
  );
};

export default CodeEditor;



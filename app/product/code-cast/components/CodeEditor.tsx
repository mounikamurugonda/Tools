import React from 'react';
import Editor from '@monaco-editor/react';
import { AppConfig } from '../types';

interface CodeEditorProps {
  code: string;
  language: string;
  config: AppConfig;
  onChange?: (val: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, config, onChange, readOnly }) => {
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

  return (
    <div className="w-full h-full overflow-hidden">
      <Editor
        height="100%"
        width="100%"
        language={getLanguage()}
        value={code}
        theme={getMonacoTheme()}
        onChange={value => onChange && onChange(value || '')}
        options={{
          readOnly: readOnly,
          minimap: { enabled: false },
          fontSize: config.fontSize,
          lineNumbers: config.lineNumbers ? 'on' : 'off',
          scrollBeyondLastLine: false,
          wordWrap: config.wordWrap ? 'on' : 'off',
          automaticLayout: true,
          fontFamily: '"Fira Code", "JetBrains Mono", "Menlo", "Consolas", monospace',
          fontLigatures: true,
          padding: { top: 16, bottom: 16 },

          // Disable hover and suggestions for lighter performance
          hover: { enabled: false },
          quickSuggestions: false,
          suggestOnTriggerCharacters: false,
          parameterHints: { enabled: false },
          wordBasedSuggestions: 'off',
          snippetSuggestions: 'none',
          codeLens: false,
          folding: false,
          links: false,
          colorDecorators: false,
          contextmenu: true,
          inlayHints: { enabled: 'off' },
        }}
      />
    </div>
  );
};

export default CodeEditor;

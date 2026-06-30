'use client';

import React from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useTheme } from '@/components/ThemeProvider';

export interface MonacoLiteEditorProps {
    value: string;
    onChange?: (value: string | undefined) => void;
    language?: string;
    readOnly?: boolean;
    height?: string | number;
    className?: string;
    options?: any; // Using any for simplicity with editor options
    placeholder?: string; // Not natively supported but keeps prop interface compatible if needed
    theme?: string;
    onMount?: OnMount;
}

const MonacoLiteEditor: React.FC<MonacoLiteEditorProps> = ({
    value,
    onChange,
    language = 'plaintext',
    readOnly = false,
    height = '100%',
    className,
    options = {},
    theme: themeProp,
    onMount,
}) => {
    const { theme } = useTheme();
    const monacoTheme = themeProp || (theme === 'dark' ? 'vs-dark' : 'light');

    const defaultOptions = {
        minimap: { enabled: false },
        folding: true,
        lineNumbers: 'on',
        glyphMargin: false,
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
        overviewRulerLanes: 0,
        scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
        },
        // Aggressively disable suggestions
        quickSuggestions: { other: false, comments: false, strings: false },
        suggestOnTriggerCharacters: false,
        parameterHints: { enabled: false },
        snippetSuggestions: 'none',
        wordBasedSuggestions: false,
        acceptSuggestionOnEnter: 'off',
        tabCompletion: 'off',
        hover: { enabled: true },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        contextmenu: true,
        renderValidationDecorations: 'on',
        wordWrap: 'on',
        fontFamily: '"Geist Mono", monospace',
        fontSize: 13,
        padding: { top: 16, bottom: 16 },
        find: {
            addExtraSpaceOnTop: false,
            autoFindInSelection: 'always',
            seedSearchStringFromSelection: 'always',
        },
        ...options,
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // Define Dracula theme globally for MonacoLiteEditor usage
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

        // Disable Ctrl+Space (Trigger Suggest)
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => { });

        if (onMount) {
            onMount(editor, monaco);
        }
    };

    return (
        <div className={className} style={{ height }}>
            <Editor
                height="100%"
                language={language}
                value={value}
                onChange={onChange}
                theme={monacoTheme}
                onMount={handleEditorDidMount}
                options={{
                    ...defaultOptions,
                    readOnly,
                }}
                loading={
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
                        Loading Editor...
                    </div>
                }
            />
        </div>
    );
};

export default MonacoLiteEditor;

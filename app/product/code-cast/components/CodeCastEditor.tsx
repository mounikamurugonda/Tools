import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Code, FileCode, FileJson } from 'lucide-react';
import { AppConfig, CodeSnippet } from '../types';

interface CodeCastEditorProps {
    code: CodeSnippet;
    updateCode: (tab: 'html' | 'css' | 'js', content: string) => void;
    config: AppConfig;
    activeTab: 'html' | 'css' | 'js';
    setActiveTab: (tab: 'html' | 'css' | 'js') => void;
    isPlaying?: boolean;
    isLight?: boolean;
    shadowBlur: number;
    shadowSpread: number;
    layout: any;
    editorRef?: React.MutableRefObject<any>;
}

const TABS = [
    { id: 'html' as const, label: 'HTML', icon: Code, color: 'text-orange-500' },
    { id: 'css' as const, label: 'CSS', icon: FileCode, color: 'text-blue-500' },
    { id: 'js' as const, label: 'JS', icon: FileJson, color: 'text-yellow-500' },
];

export const CodeCastEditor: React.FC<CodeCastEditorProps> = ({
    code,
    updateCode,
    config,
    activeTab,
    setActiveTab,
    isPlaying = false,
    isLight = false,
    shadowBlur,
    shadowSpread,
    layout,
    editorRef,
}) => {
    // Internal ref if none provided
    const internalRef = useRef<any>(null);
    const finalRef = editorRef || internalRef;

    const getLanguage = () => {
        if (activeTab === 'js') return 'javascript';
        return activeTab;
    };

    return (
        <div
            className={`${layout.flexDirection === 'flex-col' ? 'flex-[1.5]' : 'flex-1'} min-w-0 rounded-xl transition-shadow duration-300 ${isLight ? 'bg-white' : 'bg-[#1e1e1e]'}`}
            style={{
                order: layout.flexDirection === 'flex-col' ? 2 : 1,
                boxShadow: `0 20px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, 0.3)`
            }}
        >
            <div className="flex flex-col h-full rounded-xl overflow-hidden">
                {/* Tabs */}
                <div
                    className={`flex items-center px-2 h-10 border-b shrink-0 ${isLight ? 'bg-gray-50/50 border-gray-200' : 'bg-[#252525] border-white/5'
                        }`}
                >
                    <div className="flex items-center gap-1">
                        {TABS.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    disabled={isPlaying}
                                    className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                  ${isActive
                                            ? isLight
                                                ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                                                : 'bg-white/10 text-white shadow-sm ring-1 ring-white/10'
                                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50'
                                        }
                `}
                                >
                                    <Icon size={14} className={isActive ? tab.color : 'currentColor'} />
                                    {tab.label}
                                    {code[tab.id].trim() && (
                                        <div className={`w-1.5 h-1.5 rounded-full ${isPlaying && isActive ? 'bg-blue-400 animate-pulse' : 'bg-blue-500/30'}`}></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Monaco Editor */}
                <div
                    className={`flex-1 relative ${isLight ? 'bg-white' : 'bg-[#1e1e1e]'}`}
                    style={{
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'optimizeLegibility',
                    } as React.CSSProperties}
                >
                    <Editor
                        height="100%"
                        width="100%"
                        language={getLanguage()}
                        value={code[activeTab]}
                        onMount={(editor) => {
                            finalRef.current = editor;
                        }}
                        theme={isLight ? 'vs' : 'vs-dark'}
                        onChange={(value) => {
                            if (!isPlaying && value !== undefined) {
                                updateCode(activeTab, value);
                            }
                        }}
                        options={{
                            readOnly: isPlaying,
                            minimap: { enabled: false },
                            fontSize: config.fontSize,
                            wordWrap: config.wordWrap ? 'on' : 'off',
                            lineNumbers: config.lineNumbers ? 'on' : 'off',
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            padding: { top: 8, bottom: 8 },
                            fontFamily: '"Fira Code", "JetBrains Mono", "Menlo", "Consolas", monospace',
                            cursorWidth: config.showCursor ? 2 : 0,
                            cursorStyle: 'line',
                            cursorBlinking: 'smooth',
                            cursorSmoothCaretAnimation: 'on',
                            renderLineHighlight: 'none', // Hides active line
                            guides: { indentation: false }, // Hides nesting lines

                            // Hide selection and other decorations
                            selectionHighlight: false,
                            renderValidationDecorations: 'off',
                            matchBrackets: 'never',
                            hideCursorInOverviewRuler: true,
                            overviewRulerLanes: 0,
                            overviewRulerBorder: false,

                            fontLigatures: true,
                            scrollbar: {
                                vertical: 'hidden',
                                horizontal: 'hidden',
                                useShadows: false,
                            },

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
                            contextmenu: false,
                            inlayHints: { enabled: 'off' },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

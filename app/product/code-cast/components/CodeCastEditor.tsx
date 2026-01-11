import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Code, FileCode, FileJson, Package, Check, Sparkles } from 'lucide-react';
import { AppConfig, CodeSnippet } from '../types';

interface CodeCastEditorProps {
    code: CodeSnippet;
    updateCode: (tab: 'html' | 'css' | 'js', content: string) => void;
    config: AppConfig;
    activeTab: 'html' | 'css' | 'js' | 'libs';
    setActiveTab: (tab: 'html' | 'css' | 'js' | 'libs') => void;
    isPlaying?: boolean;
    isLight?: boolean;
    shadowBlur: number;
    shadowSpread: number;
    layout: any;
    editorRef?: React.MutableRefObject<any>;
    updateConfig?: (key: keyof AppConfig, value: any) => void;
}

const TABS = [
    { id: 'html' as const, label: 'HTML', icon: Code, color: 'text-orange-500' },
    { id: 'css' as const, label: 'CSS', icon: FileCode, color: 'text-blue-500' },
    { id: 'js' as const, label: 'JS', icon: FileJson, color: 'text-yellow-500' },
    { id: 'libs' as const, label: 'Libs', icon: Package, color: 'text-purple-500' },
];

// SVG Logos
const TAILWIND_LOGO = (
    <svg role="img" viewBox="0 0 24 24" className="w-full h-full text-[#38BDF8]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
);

const BOOTSTRAP_LOGO = (
    <svg role="img" viewBox="0 0 24 24" className="w-full h-full text-[#712cf9]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z" />
    </svg>
);

const AVAILABLE_LIBRARIES = [
    {
        id: 'tailwind',
        label: 'Tailwind CSS',
        description: 'Rapidly build modern websites without ever leaving your HTML.',
        version: '3.4.1',
        icon: TAILWIND_LOGO,
        color: '#38BDF8',
        bg: 'bg-[#38BDF8]/10',
        border: 'border-[#38BDF8]/30',
        hover: 'group-hover:border-[#38BDF8]',
        badge: 'bg-[#38BDF8] text-white',
        link: 'https://tailwindcss.com'
    },
    {
        id: 'bootstrap',
        label: 'Bootstrap',
        description: 'Powerful, extensible, and feature-packed frontend toolkit.',
        version: '5.3.2',
        icon: BOOTSTRAP_LOGO,
        color: '#712cf9',
        bg: 'bg-[#712cf9]/10',
        border: 'border-[#712cf9]/30',
        hover: 'group-hover:border-[#712cf9]',
        badge: 'bg-[#712cf9] text-white',
        link: 'https://getbootstrap.com'
    },
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
    updateConfig,
}) => {
    // Internal ref if none provided
    const internalRef = useRef<any>(null);
    const finalRef = editorRef || internalRef;

    const getLanguage = () => {
        if (activeTab === 'js') return 'javascript';
        if (activeTab === 'libs') return 'json'; // Placeholder
        return activeTab;
    };

    const toggleLibrary = (libId: string) => {
        if (!updateConfig) return;
        const currentLibs = config.libraries || [];
        const newLibs = currentLibs.includes(libId)
            ? currentLibs.filter(id => id !== libId)
            : [...currentLibs, libId];
        updateConfig('libraries', newLibs);
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
                    className={`flex items-center justify-between px-2 h-10 border-b shrink-0 ${isLight ? 'bg-gray-50/50 border-gray-200' : 'bg-[#252525] border-white/5'
                        }`}
                >
                    <div className="flex items-center gap-1">
                        {TABS.filter(t => t.id !== 'libs').map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            const hasContent = code[tab.id as keyof CodeSnippet] && code[tab.id as keyof CodeSnippet].trim();

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
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
                                    {hasContent && (
                                        <div className={`w-1.5 h-1.5 rounded-full ${isPlaying && isActive ? 'bg-blue-400 animate-pulse' : 'bg-blue-500/30'}`}></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Aligned: Libs Tab */}
                    {(() => {
                        const tab = TABS.find(t => t.id === 'libs')!;
                        const isActive = activeTab === 'libs';
                        const selectedLibIds = config.libraries || [];
                        const hasSelection = selectedLibIds.length > 0;

                        // Find first selected library to show its icon
                        const firstSelectedLib = hasSelection
                            ? AVAILABLE_LIBRARIES.find(l => l.id === selectedLibIds[0])
                            : null;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab('libs')}
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
                                {firstSelectedLib ? (
                                    <div className="w-4 h-4">
                                        {firstSelectedLib.icon}
                                    </div>
                                ) : (
                                    tab.id === 'libs' ? (
                                        <tab.icon
                                            size={14}
                                            className="text-orange-500 animate-[spin_3s_linear_infinite] lg:animate-none" // Fallback / Base animation
                                            style={{
                                                color: '#f97316' // Orange-500 fallback 
                                            }}
                                        />
                                        // Note: SVG Stroke Gradients are hard in CSS. 
                                        // Changing to text-orange-500 with a pulse/spin for "hot" feel as precise gradient on stroke requires <defs>.
                                        // User asked "do same" - implying "make it hot/gradient".
                                        // I will simply use a hot solid color that complements the text gradient to avoid invisible icons.
                                    ) : (
                                        <tab.icon size={14} className={isActive ? tab.color : 'currentColor'} />
                                    )
                                )}

                                {firstSelectedLib ? (
                                    <span className={isLight ? 'text-gray-900' : 'text-white'}>
                                        {firstSelectedLib.label}
                                        {selectedLibIds.length > 1 && <span className="ml-1 opacity-60">+{selectedLibIds.length - 1}</span>}
                                    </span>
                                ) : (
                                    <span
                                        className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-[length:200%_auto] bg-clip-text text-transparent font-bold animate-[gradient_3s_linear_infinite]"
                                        style={{
                                            animation: 'gradient 3s linear infinite',
                                        }}
                                    >
                                        {tab.label}
                                        <style dangerouslySetInnerHTML={{
                                            __html: `
                                            @keyframes gradient {
                                                0% { background-position: 0% 50%; }
                                                50% { background-position: 100% 50%; }
                                                100% { background-position: 0% 50%; }
                                            }
                                        `}} />
                                    </span>
                                )}

                                {hasSelection && !firstSelectedLib && (
                                    <div className={`w-1.5 h-1.5 rounded-full ${isPlaying && isActive ? 'bg-blue-400 animate-pulse' : 'bg-blue-500/30'}`}></div>
                                )}
                            </button>
                        );
                    })()}
                </div>

                {/* Content Area */}
                <div
                    className={`flex-1 relative overflow-auto ${isLight ? 'bg-white' : 'bg-[#1e1e1e]'}`}
                    style={activeTab !== 'libs' ? {
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'optimizeLegibility',
                    } as React.CSSProperties : undefined}
                >
                    {activeTab === 'libs' ? (
                        <div className={`p-6 flex flex-col h-full ${isLight ? 'text-gray-800' : 'text-gray-300'}`}>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className={`text-base font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                                        External Libraries
                                    </h3>
                                    <p className={`text-xs mt-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                                        Enable libraries to use them via CDN.
                                    </p>
                                </div>
                                <div className={`px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1 ${isLight ? 'bg-gray-100 text-gray-500' : 'bg-white/10 text-gray-400'}`}>
                                    <Sparkles size={10} />
                                    Auto-injected
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {AVAILABLE_LIBRARIES.map(lib => {
                                    const isSelected = (config.libraries || []).includes(lib.id);
                                    return (
                                        <div
                                            key={lib.id}
                                            className={`group relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 overflow-hidden flex flex-col gap-4
                                                ${isSelected
                                                    ? isLight
                                                        ? `${lib.bg} border-[${lib.color}]/50`
                                                        : `${lib.bg} border-[${lib.color}]/50`
                                                    : isLight
                                                        ? 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-200/50'
                                                        : 'bg-[#252525] border-white/5 hover:border-white/10 hover:bg-[#2a2a2a]'
                                                }
                                                ${isSelected ? '' : lib.hover}
                                            `}
                                            style={isSelected ? { borderColor: lib.color } : {}}
                                            onClick={() => toggleLibrary(lib.id)}
                                        >
                                            {/* Selection Indicator */}
                                            <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                                                ${isSelected
                                                    ? lib.badge
                                                    : isLight ? 'bg-gray-100 text-gray-300' : 'bg-white/10 text-white/20'
                                                }`}
                                            >
                                                {isSelected && <Check size={14} strokeWidth={3} />}
                                            </div>

                                            {/* Logo */}
                                            <div className="w-12 h-12">
                                                {lib.icon}
                                            </div>

                                            {/* Content */}
                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className={`text-lg font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                                                        {lib.label}
                                                    </span>
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${isLight ? 'bg-gray-100 text-gray-500' : 'bg-black/30 text-gray-400'}`}>
                                                        v{lib.version}
                                                    </span>
                                                </div>
                                                <p className={`text-xs mt-2 leading-relaxed ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    {lib.description}
                                                </p>
                                            </div>

                                            {/* Status Badge */}
                                            <div className={`mt-auto pt-2 flex items-center gap-2 text-[10px] font-medium transition-colors
                                                ${isSelected ? 'text-' + lib.id : isLight ? 'text-gray-400' : 'text-gray-500'}
                                            `}
                                                style={{ color: isSelected ? lib.color : undefined }}
                                            >
                                                <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'animate-pulse' : ''}`}
                                                    style={{ backgroundColor: isSelected ? lib.color : 'currentColor' }}
                                                />
                                                {isSelected ? 'Active & Injected' : 'Click to Enable'}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {!updateConfig && (
                                <div className={`mt-6 p-3 rounded text-xs text-center ${isLight ? 'bg-yellow-50 text-yellow-700' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                    Configuration updates are not available in this view.
                                </div>
                            )}
                        </div>
                    ) : (
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
                    )}
                </div>
            </div>
        </div>
    );
};

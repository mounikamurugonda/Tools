
import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Package, Check, Sparkles } from 'lucide-react';
import { FeatureGuard } from '@/components/FeatureGuard';
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

// Local SVG Logos (Optimized)

const HTML_LOGO = (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <polygon points="5.902 27.201 3.655 2 28.345 2 26.095 27.197 15.985 30 5.902 27.201" fill="#e44f26" />
        <polygon points="16 27.858 24.17 25.593 26.092 4.061 16 4.061 16 27.858" fill="#f1662a" />
        <polygon points="16 13.407 11.91 13.407 11.628 10.242 16 10.242 16 7.151 15.989 7.151 8.25 7.151 8.324 7.981 9.083 16.498 16 16.498 16 13.407" fill="#ebebeb" />
        <polygon points="16 21.434 15.986 21.438 12.544 20.509 12.324 18.044 10.651 18.044 9.221 18.044 9.654 22.896 15.986 24.654 16 24.65 16 21.434" fill="#ebebeb" />
        <polygon points="15.989 13.407 15.989 16.498 19.795 16.498 19.437 20.507 15.989 21.437 15.989 24.653 22.326 22.896 22.372 22.374 23.098 14.237 23.174 13.407 22.341 13.407 15.989 13.407" fill="#fff" />
        <polygon points="15.989 7.151 15.989 9.071 15.989 10.235 15.989 10.242 23.445 10.242 23.445 10.242 23.455 10.242 23.517 9.548 23.658 7.981 23.732 7.151 15.989 7.151" fill="#fff" />
    </svg>
);

const CSS_LOGO = (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fill="#264de4" d="M72 460L30 0h451l-41 460-184 52" />
        <path fill="#2965f1" d="M256 37V472l149-41 35-394" />
        <path fill="#ebebeb" d="m114 94h142v56H119m5 58h132v57H129m3 28h56l4 45 64 17v59L139 382" />
        <path fill="#ffffff" d="m256 208v57h69l-7 73-62 17v59l115-32 26-288H256v56h80l-5.5 58Z" />
    </svg>
);

const JS_LOGO = (
    <svg viewBox="0 0 256.4 291.5" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <g transform="translate(4.988 -113.385)">
            <path fill="#d4b830" d="M18.8 375.4L-5 113.4l256.4.1-23.6 261.7L123 404.8 18.8 375.4zm189.7-14.3l19.9-224.4h-105l.8 247.5 84.3-23.1zm-94.9-191.5H88.1l-.3 134.3-49.5-13.5.1 30.7 75.2 20.3V169.6z" />
            <path fill="#ebebeb" fillOpacity="0" opacity="0.986" d="M105.2 338.9c-3.3-1-19.6-5.4-36.2-9.9l-30.1-8.1v-15.1c0-14.8 0-15.1 1.5-14.6.8.3 11.8 3.3 24.4 6.8l22.9 6.3.2-67 .2-67h25v85.2c0 67.7-.2 85.2-.9 85.2-.5-.1-3.7-.9-7-1.8z" />
            <path fill="#ebebeb" fillOpacity="0.9216" opacity="0.986" d="M38.4 321.1l-.1-30.7s31.6 8.9 49.5 13.5l.3-134.2h25.5v171.7l-75.2-20.3z" />
            <path fill="#fdd83c" d="M123.4 136.6h105L208.5 361l-85.1 23.1V136.6zm79.7 186.8l6.9-83.9-51 5.7v-44.8l54.4-.2 2.2-30.6-82.1.4 1.1 111.4 49.6-8.5-.7 24.8-50 13.3.5 30.4 69.1-18z" />
        </g>
    </svg>
);

const TABS = [
    { id: 'html' as const, label: 'HTML', icon: () => HTML_LOGO, color: 'text-orange-500' },
    { id: 'css' as const, label: 'CSS', icon: () => CSS_LOGO, color: 'text-blue-500' },
    { id: 'js' as const, label: 'JS', icon: () => JS_LOGO, color: 'text-yellow-500' },
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

    const isSocialMedia = ['instagram-square', 'linkedin-post', 'tiktok-shorts'].includes(config.deviceFrame);

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
            className={`${layout.flexDirection === 'flex-col' ? 'flex-[1.5]' : 'flex-1'} min-w-0 min-h-0 max-h-full rounded-xl transition-shadow duration-300 ${isLight ? 'bg-white' : 'bg-[#1e1e1e]'} ${isPlaying ? 'pointer-events-none' : ''}`}
            style={{
                order: layout.flexDirection === 'flex-col' ? 2 : 1,
                boxShadow: `0 20px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, 0.3)`
            }}
        >
            <div className="flex flex-col h-full rounded-xl overflow-hidden">
                {/* Tabs Header */}
                <div
                    className={`flex items-center gap-4 px-3 h-8 shrink-0 w-full ${isLight ? 'bg-gray-100 border-b border-gray-200' : 'bg-[#252525] border-b border-white/5'}`}
                >
                    {/* Window Controls (Traffic Lights) */}
                    <div className="flex items-center gap-1.5 shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/10"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/10"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/10"></div>
                    </div>

                    <div className="flex items-center gap-1 flex-1">
                        {TABS.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            const isLibs = tab.id === 'libs';
                            const hasContent = code[tab.id as keyof CodeSnippet] && code[tab.id as keyof CodeSnippet].trim();
                            const selectedLibIds = config.libraries || [];
                            const hasSelection = selectedLibIds.length > 0;
                            const firstSelectedLib = hasSelection && isLibs
                                ? AVAILABLE_LIBRARIES.find(l => l.id === selectedLibIds[0])
                                : null;

                            const button = (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    disabled={isPlaying}
                                    className={`
                                        flex items-center  md:gap-2 px-2  md:py-2 rounded-md text-[10px] font-medium transition-all
                                        ${isLibs ? 'ml-auto' : ''}
                                        ${isActive
                                            ? isLight
                                                ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                                                : 'bg-[#3c3c3c] text-white shadow-sm ring-1 ring-white/10'
                                            : isLight
                                                ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                                                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                                        }
                                    `}
                                >
                                    {/* Icon */}
                                    <div className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                                        {tab.id === 'html' ? HTML_LOGO :
                                            tab.id === 'css' ? CSS_LOGO :
                                                tab.id === 'js' ? JS_LOGO :
                                                    <Icon size={14} className={tab.color} />}
                                    </div>

                                    {/* Label */}
                                    <span className={`truncate ${isLibs ? (isSocialMedia ? 'hidden' : 'hidden sm:inline') : ''}`}>
                                        {isLibs && firstSelectedLib ? `+${selectedLibIds.length} Libs` : tab.label}
                                    </span>

                                    {/* Dot Indicator */}
                                    {/* {(hasContent || (isLibs && hasSelection)) && (
                                        <div className={`w-1 h-1 rounded-full ml-1.5 ${isActive ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                                    )} */}
                                </button>
                            );

                            if (isLibs) {
                                return (
                                    <FeatureGuard key={tab.id} actionName="use external libraries">
                                        {button}
                                    </FeatureGuard>
                                );
                            }

                            return button;
                        })}
                    </div>
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
                                readOnly: false,
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

                                // Disable smart features during animation to prevent double indentation/closing
                                autoIndent: isPlaying ? 'none' : 'advanced',
                                autoClosingBrackets: isPlaying ? 'never' : 'always',
                                autoClosingQuotes: isPlaying ? 'never' : 'always',
                                autoSurround: isPlaying ? 'never' : 'languageDefined',
                                formatOnType: isPlaying ? false : true,
                                formatOnPaste: isPlaying ? false : true,
                            }}
                        />
                    )}
                </div>
            </div>
        </div >
    );
};

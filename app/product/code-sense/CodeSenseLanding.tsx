'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Editor } from '@monaco-editor/react';
import detectLang from 'lang-detector';
import { Sparkles, ArrowRight, Copy, Check, Terminal } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import prettier from 'prettier/standalone';
import * as prettierPluginBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import * as prettierPluginHtml from 'prettier/plugins/html';
import * as prettierPluginCss from 'prettier/plugins/postcss';
import * as prettierPluginMarkdown from 'prettier/plugins/markdown';
import * as prettierPluginYaml from 'prettier/plugins/yaml';

// Map detected languages to Monaco/Prettier languages
// lang-detector returns lowercase strings generally
const LANGUAGE_MAP: Record<string, string> = {
    'javascript': 'javascript',
    'java': 'java',
    'python': 'python',
    'html': 'html',
    'c': 'c',
    'c++': 'cpp',
    'php': 'php',
    'ruby': 'ruby',
    'go': 'go',
    'css': 'css',
    'xml': 'xml',
    'json': 'json',
    'typescript': 'typescript',
    'ts': 'typescript',
    'js': 'javascript',
    'py': 'python',
    // Add more mappings as needed
};

export default function CodeSenseLanding() {
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
    const [isFormatting, setIsFormatting] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleInputChange = (value: string | undefined) => {
        const code = value || '';
        setInputCode(code);
        detectLanguage(code);
    };

    const detectLanguage = useCallback((code: string) => {
        if (!code.trim()) {
            setDetectedLanguage(null);
            return;
        }

        // Heuristics for common web formats 
        if (code.trim().startsWith('<') && code.includes('>')) {
            if (code.includes('html') || code.includes('body') || code.includes('div')) {
                setLanguage('html');
                setDetectedLanguage('HTML');
                return;
            }
        }
        if (code.trim().startsWith('{') || code.trim().startsWith('[')) {
            try {
                JSON.parse(code);
                setLanguage('json');
                setDetectedLanguage('JSON');
                return;
            } catch (e) {
                // Not valid JSON
            }
        }

        try {
            const detected = detectLang(code);
            // detected is usually a string like 'JavaScript' or 'Unknown' or similar

            if (detected && detected !== 'Unknown') {
                // Normalized logic
                const normalized = detected.toLowerCase();
                const mappedLang = LANGUAGE_MAP[normalized] || normalized; // fallback to normalized

                setLanguage(mappedLang);
                setDetectedLanguage(detected);
            }
        } catch (e) {
            console.error("Language detection failed", e);
        }

    }, []);


    const formatCode = useCallback(async () => {
        if (!inputCode) return;
        setIsFormatting(true);
        try {
            let formatted = inputCode;

            // Select parser based on language
            let parser = 'babel'; // default to JS
            let plugins = [prettierPluginBabel, prettierPluginEstree];

            if (language === 'html') {
                parser = 'html';
                plugins = [prettierPluginHtml];
            } else if (language === 'css') {
                parser = 'css';
                plugins = [prettierPluginCss];
            } else if (language === 'json') {
                parser = 'json';
                plugins = [prettierPluginBabel, prettierPluginEstree]; // JSON parser is in babel/estree often or standalone. Actually json is in babel usually.
            } else if (language === 'typescript') {
                parser = 'typescript';
                plugins = [prettierPluginBabel, prettierPluginEstree];
            } else if (language === 'markdown') {
                parser = 'markdown';
                plugins = [prettierPluginMarkdown];
            } else if (language === 'yaml') {
                parser = 'yaml';
                plugins = [prettierPluginYaml];
            }

            // Prettier formatting
            // Note: Prettier standalone might not support all languages efficiently without correct plugins.
            // We will try our best.

            try {
                formatted = await prettier.format(inputCode, {
                    parser,
                    plugins,
                    useTabs: false,
                    tabWidth: 2,
                });
            } catch (err) {
                console.warn("Prettier formatting failed, falling back to original", err);
                // If prettier fails (e.g. syntax error), we just show original or a simple indent?
                // For now, keep original to avoid breaking UI.
            }

            setOutputCode(formatted);
        } catch (error) {
            console.error('Formatting error:', error);
            setOutputCode(inputCode); // Fail safe
        } finally {
            setIsFormatting(false);
        }
    }, [inputCode, language]);

    // Auto-format effect when user stops typing for a bit? 
    // Or just format on language change? 
    // User asked: "auto formate and show in output"
    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputCode) {
                formatCode();
            }
        }, 800); // Debounce formatting
        return () => clearTimeout(timer);
    }, [inputCode, language, formatCode]);

    const handleCopy = () => {
        navigator.clipboard.writeText(outputCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-10 px-4">

            {/* CodeSense Header */}
            <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg shadow-green-500/20 text-white">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">CodeSense</h1>
                        <p className="text-slate-500 dark:text-slate-400">Intelligent Code Detection & Formatting</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)] min-h-[500px]">
                {/* INPUT */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Input</h2>
                        {detectedLanguage && (
                            <span className="text-xs font-medium px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full animate-fade-in">
                                Detected: {detectedLanguage}
                            </span>
                        )}
                    </div>
                    <Card className="flex-1 overflow-hidden p-0 border-slate-200 dark:border-slate-800 shadow-xl flex flex-col">
                        <Editor
                            height="100%"
                            defaultLanguage="javascript" // Initial
                            language={language} // Dynamic
                            theme="vs-dark"
                            value={inputCode}
                            onChange={handleInputChange}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                wordWrap: 'on',
                                scrollBeyondLastLine: false,
                                padding: { top: 16, bottom: 16 },
                                fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                                fontLigatures: true,
                                // Lite mode settings
                                overviewRulerBorder: false,
                                overviewRulerLanes: 0,
                                hideCursorInOverviewRuler: true,
                                renderLineHighlight: 'none',
                                matchBrackets: 'never',
                            }}
                            className="flex-1"
                        />
                    </Card>
                </div>

                {/* OUTPUT */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Output</h2>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCopy}
                            className={copied ? "text-green-600 dark:text-green-400" : "text-slate-500"}
                        >
                            {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                            {copied ? 'Copied!' : 'Copy Formatted'}
                        </Button>
                    </div>
                    <Card className="flex-1 overflow-hidden p-0 border-green-500/20 shadow-xl shadow-green-900/5 relative group flex flex-col bg-slate-900">
                        {/* Decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <Sparkles size={100} />
                        </div>

                        <Editor
                            height="100%"
                            language={language}
                            theme="vs-dark"
                            value={outputCode}
                            options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                fontSize: 14,
                                wordWrap: 'on',
                                scrollBeyondLastLine: false,
                                padding: { top: 16, bottom: 16 },
                                fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                                fontLigatures: true,
                                guides: { indentation: false },
                                renderLineHighlight: 'none',
                            }}
                        />
                    </Card>
                </div>
            </div>

        </div>
    );
}

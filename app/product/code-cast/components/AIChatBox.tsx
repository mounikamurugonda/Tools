'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Sparkles, Send, Trash2, ChevronDown, Copy, Check,
    Code2, Loader2, AlertCircle, Bot, User, Wand2, Brain
} from 'lucide-react';
import {
    AI_MODELS,
    DEFAULT_MODEL_ID,
    generateCodeWithModel,
    sendChatMessage,
    ChatMessage,
    AIModel,
} from '../utils/multiModelAI';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface ParsedCode {
    html: string;
    css: string;
    js: string;
}

interface ConversationMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    modelId?: string;
    code?: ParsedCode;
    timestamp: Date;
}

interface AIChatBoxProps {
    updateCode: (tab: 'html' | 'css' | 'js', content: string) => void;
    onClose: () => void;
    isLight: boolean;
    inline?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9);

const isCodeGenerationPrompt = (text: string): boolean => {
    const keywords = [
        'create', 'build', 'make', 'generate', 'design', 'code', 'style',
        'button', 'card', 'navbar', 'form', 'modal', 'animation', 'effect',
        'component', 'layout', 'hero', 'section', 'page', 'header', 'footer',
        'add', 'update', 'change', 'modify', 'tweak', 'fix', 'improve', 'edit',
    ];
    const lower = text.toLowerCase();
    return keywords.some((kw) => lower.includes(kw));
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

const ModelBadge = ({ model }: { model: AIModel }) => (
    <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white ${model.badgeColor}`}>
        {model.badge}
    </span>
);

const TypingDots = () => (
    <div className="flex items-center gap-1 px-3 py-2">
        {[0, 1, 2].map((i) => (
            <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                style={{ animationDelay: `${i * 120}ms` }}
            />
        ))}
    </div>
);

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => {
                navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            }}
            className="p-1 rounded hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            title="Copy"
        >
            {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
        </button>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Message Bubble
// ─────────────────────────────────────────────────────────────────────────────

interface BubbleProps {
    msg: ConversationMessage;
    onApplyCode: (code: ParsedCode) => void;
    modelInfo?: AIModel;
}

const renderThinkingBlock = (content: string) => {
    const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);
    if (!thinkMatch) return null;
    return (
        <div className="mb-2 bg-gray-900/40 p-2.5 rounded-xl border border-gray-700/50 text-[10px] text-gray-400 font-mono flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-gray-500 font-bold uppercase tracking-wider mb-0.5">
                <Brain size={10} className="animate-pulse" />
                Thinking Process
            </div>
            <div className="whitespace-pre-wrap opacity-80">{thinkMatch[1].trim()}</div>
        </div>
    );
};

const renderMessageContent = (content: string) => {
    const cleanContent = content.replace(/<think>[\s\S]*?<\/think>\n*/g, '');
    if (!cleanContent) return null;
    return <div className="leading-relaxed whitespace-pre-wrap">{cleanContent}</div>;
};

const MessageBubble: React.FC<BubbleProps> = ({ msg, onApplyCode, modelInfo }) => {
    const [applied, setApplied] = useState(false);

    const handleApply = () => {
        if (!msg.code) return;
        onApplyCode(msg.code);
        setApplied(true);
        setTimeout(() => setApplied(false), 2000);
    };

    if (msg.role === 'user') {
        return (
            <div className="flex justify-end gap-2 group">
                <div className="max-w-[85%]">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xs px-3.5 py-2.5 rounded-2xl rounded-tr-sm shadow-lg shadow-indigo-900/20">
                        {msg.content}
                    </div>
                    <div className="flex justify-end mt-1">
                        <span className="text-[9px] text-gray-500 dark:text-gray-600">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0 mt-0.5">
                    <User size={11} className="text-indigo-600 dark:text-indigo-400" />
                </div>
            </div>
        );
    }

    // AI bubble
    return (
        <div className="flex justify-start gap-2 group">
            <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={11} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div className="max-w-[90%] space-y-2">
                {/* Model + time header */}
                {modelInfo && (
                    <div className="flex items-center gap-1.5">
                        <ModelBadge model={modelInfo} />
                        <span className="text-[9px] font-medium text-gray-400">{modelInfo.name}</span>
                        <span className="text-[9px] text-gray-500 ml-auto">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                )}

                {/* Message text */}
                <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 text-xs px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm backdrop-blur-sm">
                    {renderThinkingBlock(msg.content)}
                    {renderMessageContent(msg.content)}
                </div>

                {/* Code block if present */}
                {msg.code && (msg.code.html || msg.code.css || msg.code.js) && (
                    <div className="bg-gray-900 dark:bg-gray-950 border border-gray-700/60 rounded-xl overflow-hidden">
                        {/* Code block header */}
                        <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-700/60">
                            <div className="flex items-center gap-1.5">
                                <Code2 size={10} className="text-indigo-400" />
                                <span className="text-[9px] font-semibold text-gray-300 uppercase tracking-wider">
                                    Generated Code
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                {msg.code.html && (
                                    <span className="text-[8px] px-1.5 py-0.5 bg-orange-500/20 text-orange-400 rounded font-mono">HTML</span>
                                )}
                                {msg.code.css && (
                                    <span className="text-[8px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded font-mono">CSS</span>
                                )}
                                {msg.code.js && (
                                    <span className="text-[8px] px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded font-mono">JS</span>
                                )}
                                <CopyButton text={[msg.code.html, msg.code.css, msg.code.js].filter(Boolean).join('\n\n')} />
                            </div>
                        </div>

                        {/* Code preview (first 5 lines of html) */}
                        {msg.code.html && (
                            <pre className="text-[9px] font-mono text-gray-400 px-3 py-2 overflow-hidden max-h-16 leading-relaxed">
                                {msg.code.html.split('\n').slice(0, 5).join('\n')}
                                {msg.code.html.split('\n').length > 5 && '\n...'}
                            </pre>
                        )}

                        {/* Apply Code button */}
                        <div className="px-3 pb-2.5">
                            <button
                                onClick={handleApply}
                                className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${applied
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-500/80 hover:to-purple-500/80 text-white border border-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-indigo-900/20'
                                    }`}
                            >
                                {applied ? (
                                    <>
                                        <Check size={12} className="text-emerald-400" />
                                        Applied to Editor!
                                    </>
                                ) : (
                                    <>
                                        <Wand2 size={12} />
                                        Apply Code to Editor
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Streaming Bubble
// ─────────────────────────────────────────────────────────────────────────────

const StreamingBubble = ({ content, modelInfo }: { content: string, modelInfo?: AIModel }) => {
    return (
        <div className="flex justify-start gap-2 group animate-in slide-in-from-bottom-2 fade-in duration-300">
            <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={11} className="text-purple-500 animate-pulse" />
            </div>
            <div className="max-w-[90%] space-y-2">
                {modelInfo && (
                    <div className="flex items-center gap-1.5">
                        <ModelBadge model={modelInfo} />
                        <span className="text-[9px] font-medium text-purple-400 animate-pulse">Generating...</span>
                    </div>
                )}
                <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-indigo-500/30 ring-1 ring-indigo-500/20 text-gray-800 dark:text-gray-100 text-xs px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm backdrop-blur-sm shadow-indigo-500/10">
                    {renderThinkingBlock(content)}
                    {renderMessageContent(content) || <TypingDots />}
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Model Selector Dropdown
// ─────────────────────────────────────────────────────────────────────────────

interface ModelSelectorProps {
    selectedId: string;
    onChange: (id: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedId, onChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const selected = AI_MODELS.find((m) => m.id === selectedId) ?? AI_MODELS[0];

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-700/60 text-xs text-gray-700 dark:text-gray-300 transition-colors"
            >
                <ModelBadge model={selected} />
                <span className="font-medium truncate max-w-[90px]">{selected.name}</span>
                <ChevronDown size={10} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700/60 rounded-xl shadow-2xl shadow-black/20 z-50 overflow-hidden">
                    <div className="p-1.5">
                        <p className="text-[9px] uppercase tracking-wider font-bold text-gray-400 px-2 pb-1">
                            Free AI Models
                        </p>
                        {AI_MODELS.map((model) => (
                            <button
                                key={model.id}
                                onClick={() => { onChange(model.id); setOpen(false); }}
                                className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs transition-all ${model.id === selectedId
                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                <ModelBadge model={model} />
                                <div className="min-w-0">
                                    <div className="font-semibold leading-tight">{model.name}</div>
                                    <div className="text-[9px] text-gray-400 leading-tight mt-0.5 truncate">{model.description}</div>
                                </div>
                                {model.id === selectedId && (
                                    <Check size={12} className="ml-auto shrink-0 text-indigo-500 mt-0.5" />
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 px-3 py-2">
                        <p className="text-[9px] text-gray-400 leading-relaxed">
                            All models are <span className="font-semibold text-emerald-500">free</span> via OpenRouter.
                            <a
                                href="https://openrouter.ai"
                                target="_blank"
                                rel="noreferrer"
                                className="underline ml-1 text-indigo-400 hover:text-indigo-300"
                            >
                                Get API key →
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main AIChatBox
// ─────────────────────────────────────────────────────────────────────────────

export const AIChatBox: React.FC<AIChatBoxProps> = ({ updateCode, onClose, isLight, inline = false }) => {
    const [messages, setMessages] = useState<ConversationMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedModelId, setSelectedModelId] = useState(DEFAULT_MODEL_ID);
    const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
    const [ollamaModel, setOllamaModel] = useState('theqtcompany/codellama-7b-qml:latest');
    const [streamingContent, setStreamingContent] = useState('');

    const scrollRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading, streamingContent]);

    const applyCode = useCallback(
        (code: ParsedCode) => {
            if (code.html) updateCode('html', code.html);
            if (code.css) updateCode('css', code.css);
            if (code.js) updateCode('js', code.js);
        },
        [updateCode]
    );

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        // Build history for context
        const history = messages.map<{ role: 'user' | 'assistant' | 'system'; content: string }>((m) => ({
            role: m.role,
            content: m.content,
        }));

        const userMsg: ConversationMessage = {
            id: uid(),
            role: 'user',
            content: trimmed,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const shouldGenerateCode = isCodeGenerationPrompt(trimmed);

            if (shouldGenerateCode) {
                const result = await generateCodeWithModel(
                    trimmed,
                    selectedModelId,
                    history,
                    ollamaUrl,
                    ollamaModel,
                    (partial) => setStreamingContent(partial)
                );

                // Build a clean summary message from the response (strip code blocks)
                const summary = result.rawResponse
                    .replace(/===HTML_START===[\s\S]*?===HTML_END===/g, '')
                    .replace(/===CSS_START===[\s\S]*?===CSS_END===/g, '')
                    .replace(/===JS_START===[\s\S]*?===JS_END===/g, '')
                    .trim()
                    || "Here's your generated component! Click **Apply Code to Editor** to preview it.";

                const aiMsg: ConversationMessage = {
                    id: uid(),
                    role: 'assistant',
                    content: summary || "Here's your generated component! Click **Apply Code to Editor** to see it in action.",
                    modelId: selectedModelId,
                    code: { html: result.html, css: result.css, js: result.js },
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, aiMsg]);
            } else {
                // General chat (no code generation)
                const response = await sendChatMessage(
                    [
                        {
                            role: 'system',
                            content: 'You are a helpful UI/UX and web development assistant for a code animation tool called CodeCast. Be concise and helpful.',
                        },
                        ...history,
                        { role: 'user', content: trimmed },
                    ],
                    selectedModelId,
                    ollamaUrl,
                    ollamaModel,
                    (partial) => setStreamingContent(partial)
                );

                const aiMsg: ConversationMessage = {
                    id: uid(),
                    role: 'assistant',
                    content: response,
                    modelId: selectedModelId,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, aiMsg]);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
            setError(message);
        } finally {
            setIsLoading(false);
            setStreamingContent('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const clearChat = () => {
        setMessages([]);
        setError(null);
    };

    const selectedModel = AI_MODELS.find((m) => m.id === selectedModelId);

    return (
        <div
            className={`flex flex-col overflow-hidden transition-all duration-300 ${inline
                ? 'w-full h-full min-h-0'
                : `absolute bottom-full right-0 mb-2 w-80 rounded-2xl border shadow-2xl z-50 backdrop-blur-xl ${isLight ? 'bg-white/90 border-white/50' : 'bg-[#1e1e1e]/90 border-white/10 text-white'
                }`
                }`}
        >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 dark:border-gray-800/80 bg-gray-50/80 dark:bg-gray-900/40 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                        <Sparkles size={12} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-gray-800 dark:text-white">AI Code Chat</span>
                </div>

                <div className="flex items-center gap-1.5">
                    {messages.length > 0 && (
                        <button
                            onClick={clearChat}
                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            title="Clear chat"
                        >
                            <Trash2 size={12} />
                        </button>
                    )}
                </div>
            </div>

            {/* ── Model Selector Bar ── */}
            <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800/50 shrink-0">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-medium">Model</span>
                    <ModelSelector selectedId={selectedModelId} onChange={setSelectedModelId} />
                </div>

                {/* Expandable Ollama Config */}
                {selectedModel?.provider === 'ollama' && (
                    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/40 grid grid-cols-2 gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
                        <div className="space-y-1">
                            <label className="text-[9px] text-gray-400 font-medium ml-0.5">Ollama URL</label>
                            <input
                                type="text"
                                value={ollamaUrl}
                                onChange={(e) => setOllamaUrl(e.target.value)}
                                placeholder="http://localhost:11434"
                                className="w-full text-[10px] px-2 py-1.5 rounded bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-400 transition-colors"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] text-gray-400 font-medium ml-0.5">Model Name</label>
                            <input
                                type="text"
                                value={ollamaModel}
                                onChange={(e) => setOllamaModel(e.target.value)}
                                placeholder="e.g. qwen2.5-coder"
                                className="w-full text-[10px] px-2 py-1.5 rounded bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-400 transition-colors"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* ── Messages Area ── */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-3 py-3 space-y-4 custom-scrollbar min-h-0"
            >
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full py-8 text-center space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center shadow-inner ring-1 ring-white/50 dark:ring-white/10">
                            <Sparkles size={20} className="text-indigo-500 dark:text-indigo-400 animate-pulse" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">Design with AI</p>
                            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 leading-relaxed max-w-[200px]">
                                Describe a UI component and I'll generate stunning HTML, CSS & JS for you.
                            </p>
                        </div>
                        {/* Prompt chips */}
                        <div className="flex flex-wrap gap-1.5 justify-center mt-1">
                            {[
                                'Glassmorphism card',
                                'Neon button',
                                'Animated loader',
                                'Dark hero section',
                            ].map((chip) => (
                                <button
                                    key={chip}
                                    onClick={() => setInput(chip)}
                                    className="text-[10px] px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 transition-all font-medium"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        msg={msg}
                        onApplyCode={applyCode}
                        modelInfo={msg.modelId ? AI_MODELS.find((m) => m.id === msg.modelId) : undefined}
                    />
                ))}

                {isLoading && streamingContent && (
                    <StreamingBubble content={streamingContent} modelInfo={selectedModel} />
                )}

                {isLoading && !streamingContent && (
                    <div className="flex justify-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center shrink-0 mt-0.5">
                            <Bot size={11} className="text-purple-500 animate-pulse" />
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 rounded-2xl rounded-tl-sm shadow-sm">
                            <TypingDots />
                        </div>
                    </div>
                )}

                {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 rounded-xl">
                        <AlertCircle size={13} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-red-600 dark:text-red-400 leading-relaxed">{error}</p>
                    </div>
                )}
            </div>

            {/* ── Input Area ── */}
            <div className="px-3 pb-3 pt-2 border-t border-gray-100 dark:border-gray-800/60 shrink-0">
                <div className="relative flex items-end gap-2 bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 rounded-xl shadow-sm focus-within:border-indigo-400 dark:focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            // Auto-resize
                            e.target.style.height = 'auto';
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={`Ask ${selectedModel?.name ?? 'AI'} to build something…`}
                        rows={1}
                        disabled={isLoading}
                        className="flex-1 bg-transparent resize-none text-xs text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 px-3 py-2.5 outline-none leading-relaxed min-h-[38px] max-h-[120px] overflow-y-auto disabled:opacity-60"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className={`shrink-0 mr-1.5 mb-1.5 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${!input.trim() || isLoading
                            ? 'bg-gray-100 dark:bg-gray-700/60 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/25 hover:shadow-indigo-900/40 hover:-translate-y-0.5 active:translate-y-0'
                            }`}
                    >
                        {isLoading ? (
                            <Loader2 size={13} className="animate-spin" />
                        ) : (
                            <Send size={12} />
                        )}
                    </button>
                </div>
                <p className="text-[9px] text-gray-400 mt-1.5 text-center">
                    <kbd className="font-mono">Enter</kbd> to send · <kbd className="font-mono">Shift+Enter</kbd> for new line
                </p>
            </div>
        </div>
    );
};

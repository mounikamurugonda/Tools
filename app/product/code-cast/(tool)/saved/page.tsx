'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, Calendar, Code2, ArrowRight, Video, Keyboard, Share2, Check, Trash2, Eye } from 'lucide-react';
import { SnippetPreview } from '../../components/SnippetPreview';

interface Snippet {
    id: string;
    title: string;
    type: string;
    created_at: string;
    config: any;
    short_id?: string;
    visits?: number;
    code_html?: string;
    code_css?: string;
    code_js?: string;
}

export default function SavedSnippetsPage() {
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const res = await fetch('/api/code-cast/snippets');
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setSnippets(data.snippets || []);
            } catch (err) {
                setError('Failed to load snippets');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSnippets();
    }, []);

    const handleCopyLink = (e: React.MouseEvent, snippet: Snippet) => {
        e.preventDefault();
        const url = snippet.short_id
            ? `https://utiltoolkits.com/s/${snippet.short_id}`
            : `https://utiltoolkits.com/product/code-cast/${snippet.type}?snippet=${snippet.id}`;
        navigator.clipboard.writeText(url);
        setCopiedId(snippet.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault(); // Prevent link navigation if inside a link
        if (!confirm('Are you sure you want to delete this snippet?')) return;

        try {
            const res = await fetch(`/api/code-cast/snippet/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setSnippets(prev => prev.filter(s => s.id !== id));
            } else {
                console.error('Failed to delete');
                alert('Failed to delete snippet');
            }
        } catch (error) {
            console.error('Error deleting snippet:', error);
            alert('Error deleting snippet');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                    <Code2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
                <p className="text-gray-500 dark:text-gray-400">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex h-full bg-gray-50 dark:bg-black w-full">
            <div className="flex-1 overflow-y-auto">
                <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Saved Snippets</h1>
                            <p className="text-gray-500 dark:text-gray-400">Your collection of saved code animations and snippets.</p>
                        </div>
                    </div>

                    {snippets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                <Code2 className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No snippets yet</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                                Create your first code animation or type recording and save it to see it here.
                            </p>
                            <Link
                                href="/product/code-cast/animate"
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                            >
                                Create Animation
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {snippets.map((snippet) => (
                                <Link
                                    key={snippet.id}
                                    href={`/product/code-cast/${snippet.type}?snippet=${snippet.id}`}
                                    className="group block relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Preview Area */}
                                    <div className="h-40 bg-gray-50 dark:bg-black relative overflow-hidden group-hover:bg-gray-100 dark:group-hover:bg-gray-900/50 transition-colors">
                                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                            {!snippet.code_html && !snippet.code_css && <Code2 size={64} />}
                                        </div>

                                        {/* Tag */}
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${snippet.type === 'animate'
                                                ? 'bg-purple-100/80 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                                                : 'bg-green-100/80 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                                                }`}>
                                                {snippet.type}
                                            </span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="absolute top-3 right-3 z-10 flex gap-1">
                                            <button
                                                onClick={(e) => handleCopyLink(e, snippet)}
                                                className="p-1.5 rounded-full hover:bg-white/90 dark:hover:bg-gray-800/90 backdrop-blur-md bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                title="Copy Link"
                                            >
                                                {copiedId === snippet.id ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(e, snippet.id)}
                                                className="p-1.5 rounded-full hover:bg-white/90 dark:hover:bg-gray-800/90 backdrop-blur-md bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
                                                title="Delete Snippet"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>

                                        {(snippet.code_html || snippet.code_css) ? (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <SnippetPreview
                                                    html={snippet.code_html}
                                                    css={snippet.code_css}
                                                    zoom={1}
                                                />
                                                {/* Overlay to catch clicks so link works */}
                                                <div className="absolute inset-0 z-0"></div>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 p-4">
                                                <div className="space-y-2 mt-12 opacity-40">
                                                    <div className="h-2 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                                    <div className="h-2 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                                    <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                                    <div className="h-2 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {snippet.title || 'Untitled Snippet'}
                                        </h3>
                                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={12} />
                                                <span>{new Date(snippet.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 ml-2">
                                                <Eye size={12} />
                                                <span>{snippet.visits || 0}</span>
                                            </div>

                                            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                                                <span>Open</span>
                                                <ArrowRight size={12} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, Calendar, Code2, ArrowRight, Video, Keyboard, Share2, Check } from 'lucide-react';

interface Snippet {
    id: string;
    title: string;
    type: string;
    created_at: string;
    config: any;
    short_id?: string;
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
                        <div
                            key={snippet.id}
                            className="group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-all duration-300 flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2 rounded-lg ${snippet.type === 'animate'
                                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                                    : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                                    }`}>
                                    {snippet.type === 'animate' ? <Video size={20} /> : <Keyboard size={20} />}
                                </div>
                                <button
                                    onClick={(e) => handleCopyLink(e, snippet)}
                                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    title="Copy Link"
                                >
                                    {copiedId === snippet.id ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {snippet.title || 'Untitled Snippet'}
                            </h3>

                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6">
                                <Calendar size={14} />
                                <span>{new Date(snippet.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                                <Link
                                    href={`/product/code-cast/${snippet.type}?snippet=${snippet.id}`}
                                    className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                                >
                                    <span>Open Snippet</span>
                                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

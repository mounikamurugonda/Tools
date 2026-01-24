'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, Calendar, Code2, ArrowRight, Video, Keyboard, Eye, Search, Trash2 } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { SnippetPreview } from '../../components/SnippetPreview';

interface Snippet {
    id: string;
    title: string;
    type: string;
    created_at: string;
    config: any;
    short_id?: string;
    code_html?: string;
    code_css?: string;
    code_js?: string;
    visits?: number;
}

export default function LibraryPage() {
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const res = await fetch('/api/code-cast/library');
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setSnippets(data.snippets || []);
            } catch (err) {
                setError('Failed to load library');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLibrary();
    }, []);

    const filteredSnippets = snippets.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.type.includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
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

    return (
        <div className="flex h-full bg-gray-50 dark:bg-black">
            {/* We might want to reuse the layout but for now since this is a separate page structure, let's keep it simple. 
                 Ideally, Layout.tsx handles sidebar. If this page is under (tool) group, it already has sidebar. 
                 Since I put it in `(tool)/library/page.tsx`, it will inherit layout with sidebar.
             */}

            <div className="flex-1 overflow-y-auto">
                <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
                                Community Library
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Discover amazing code snippets and animations created by the community.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search snippets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        </div>
                    ) : error ? (
                        <div className="text-center p-12">
                            <p className="text-red-500">{error}</p>
                        </div>
                    ) : filteredSnippets.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Code2 className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No snippets found</h3>
                            <p className="text-gray-500 dark:text-gray-400">Be the first to publish a snippet to the library!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredSnippets.map((snippet) => (
                                <Link
                                    key={snippet.id}
                                    href={`/s/${snippet.short_id || snippet.id}`}
                                    className="group block relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Preview Area - Simple CSS/HTML visualization if possible, or just a placeholder */}
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
                                            {snippet.title}
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

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => handleDelete(e, snippet.id)}
                                                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-red-500 transition-colors z-20 relative"
                                                    title="Delete Snippet"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                                                    <span>View</span>
                                                    <ArrowRight size={12} />
                                                </div>
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

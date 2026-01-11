'use client';

import { VideoCard } from '../components/VideoCard';
import { CODECAST_VIDEOS } from '../data/videos';
import Link from 'next/link';
import { ArrowLeft, Play } from 'lucide-react';

export default function VideosPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-4 py-12">
                    {/* Back Link */}
                    <Link
                        href="/product/code-cast"
                        className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
                    >
                        <ArrowLeft size={16} />
                        Back to CodeCast
                    </Link>

                    {/* Title */}
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold uppercase tracking-wide mb-6">
                            <Play size={16} />
                            Community Showcase
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                            Videos made with{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                                CodeCast
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                            Discover amazing coding tutorials, demos, and content created by the CodeCast
                            community. Get inspired and see what's possible with clean, professional code
                            demonstrations.
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-8 mt-8 text-sm text-slate-500 dark:text-slate-500">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-2xl text-blue-600 dark:text-blue-400">
                                    {CODECAST_VIDEOS.length}
                                </span>
                                <span>Videos</span>
                            </div>
                            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700" />
                            <div>Updated regularly</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Videos Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {CODECAST_VIDEOS.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>

                {/* Empty State (if no videos) */}
                {CODECAST_VIDEOS.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
                            <Play size={32} className="text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                            No videos yet
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                            Check back soon for amazing coding content created with CodeCast!
                        </p>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <div className="max-w-2xl mx-auto p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                            Create your own CodeCast video
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Join the community and share your coding tutorials with the world
                        </p>
                        <Link
                            href="/product/code-cast/animate"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-1"
                        >
                            <Play size={20} />
                            Start Creating
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

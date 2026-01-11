'use client';

import { CodeCastVideo } from '../data/videos';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface VideoCardProps {
    video: CodeCastVideo;
}

export function VideoCard({ video }: VideoCardProps) {
    const thumbnailUrl = video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
    const videoUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

    return (
        <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/20 hover:-translate-y-1"
        >
            {/* Thumbnail with Play Overlay */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <Image
                    src={thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
                        <Play size={28} className="text-white fill-white ml-1" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {video.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {video.description}
                </p>

                {/* Tags */}
                {video.tags && video.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {video.tags.slice(0, 3).map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Author & Date */}
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
                    {video.author && <span>{video.author}</span>}
                    {video.author && video.date && <span>•</span>}
                    {video.date && <span>{new Date(video.date).toLocaleDateString()}</span>}
                </div>
            </div>
        </a>
    );
}

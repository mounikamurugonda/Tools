'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const VideoMute: React.FC<ToolProps> = ({ details, toolId }) => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [mutedVideo, setMutedVideo] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const ffmpegRef = useRef<FFmpeg | null>(null);

    const handleFileChange = (file: File | null) => {
        setVideoFile(file);
        setError('');
    };

    const muteVideo = async () => {
        if (!videoFile) return;

        try {
            setIsLoading(true);
            setError('');
            
            // Initialize FFmpeg only when needed
            if (!ffmpegRef.current) {
                ffmpegRef.current = new FFmpeg();
            }
            
            const ffmpeg = ffmpegRef.current;
            ffmpeg.on('progress', ({ progress }) => {
                setProgress(progress);
            });
            
            await ffmpeg.load();
            
            await ffmpeg.writeFile(videoFile.name, await fetchFile(videoFile));
            await ffmpeg.exec(['-i', videoFile.name, '-c', 'copy', '-an', 'output.mp4']);
            
            const data = await ffmpeg.readFile('output.mp4');
            const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: 'video/mp4' }));
            setMutedVideo(url);
        } catch (err) {
            console.error('Video muting error:', err);
            setError('Failed to mute video. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ToolContainer title="Mute Video" details={details} toolId={toolId}>
            <div className="space-y-6">
                <FileUpload
                    accept="video/*"
                    onChange={handleFileChange}
                    label="Upload a video"
                    description="Select a video file to remove the audio track from."
                    maxSize={500}
                />
                
                <button 
                    onClick={muteVideo} 
                    disabled={!videoFile || isLoading} 
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    {isLoading ? `Muting... ${(progress * 100).toFixed(0)}%` : 'Mute Video'}
                </button>
                
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}
                
                {mutedVideo && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Muted Video:</h3>
                        <video src={mutedVideo} controls className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
                        <a 
                            href={mutedVideo} 
                            download="muted_video.mp4" 
                            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                        >
                            Download Muted Video
                        </a>
                    </div>
                )}
            </div>
        </ToolContainer>
    );
};

export default VideoMute;

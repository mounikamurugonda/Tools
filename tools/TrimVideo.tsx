'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const TrimVideo: React.FC<ToolProps> = ({ details, toolId }) => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [trimmedVideo, setTrimmedVideo] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(5);
    const ffmpegRef = useRef<FFmpeg | null>(null);

    const handleFileChange = (file: File | null) => {
        setVideoFile(file);
        setError('');
    };

    const trimVideo = async () => {
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
            await ffmpeg.exec(['-i', videoFile.name, '-ss', String(startTime), '-to', String(endTime), '-c', 'copy', 'output.mp4']);
            
            const data = await ffmpeg.readFile('output.mp4');
            const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: 'video/mp4' }));
            setTrimmedVideo(url);
        } catch (err) {
            console.error('Trimming error:', err);
            setError('Failed to trim video. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ToolContainer title="Trim Video" details={details} toolId={toolId}>
            <div className="space-y-6">
                <FileUpload
                    accept="video/*"
                    onChange={handleFileChange}
                    label="Upload a video"
                    description="Select a video file to trim. You can specify start and end times to cut the video."
                    maxSize={500}
                />
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Time (seconds)</label>
                        <input 
                            type="number" 
                            value={startTime} 
                            onChange={(e) => setStartTime(Number(e.target.value))} 
                            className="w-full bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Time (seconds)</label>
                        <input 
                            type="number" 
                            value={endTime} 
                            onChange={(e) => setEndTime(Number(e.target.value))} 
                            className="w-full bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                </div>
                
                <button 
                    onClick={trimVideo} 
                    disabled={!videoFile || isLoading} 
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    {isLoading ? `Trimming... ${(progress * 100).toFixed(0)}%` : 'Trim Video'}
                </button>
                
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}
                
                {trimmedVideo && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Trimmed Video:</h3>
                        <video src={trimmedVideo} controls className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
                        <a 
                            href={trimmedVideo} 
                            download="trimmed_video.mp4" 
                            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                        >
                            Download Trimmed Video
                        </a>
                    </div>
                )}
            </div>
        </ToolContainer>
    );
};

export default TrimVideo;

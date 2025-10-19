'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const GifMaker: React.FC<ToolProps> = ({ details, toolId }) => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [gif, setGif] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const ffmpegRef = useRef<FFmpeg | null>(null);

    const handleFileChange = (file: File | null) => {
        setVideoFile(file);
        setError('');
    };

    const createGif = async () => {
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
            await ffmpeg.exec(['-i', videoFile.name, '-t', '5', '-vf', 'fps=10,scale=320:-1:flags=lanczos', '-c:v', 'gif', 'output.gif']);
            
            const data = await ffmpeg.readFile('output.gif');
            const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: 'image/gif' }));
            setGif(url);
        } catch (err) {
            console.error('GIF creation error:', err);
            setError('Failed to create GIF. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ToolContainer title="GIF Maker from Video" details={details} toolId={toolId}>
            <div className="grid md:grid-cols-2 gap-6">
                {/* Left side - Upload and Controls */}
                <div className="space-y-6">
                    <FileUpload
                        accept="video/*"
                        onChange={handleFileChange}
                        label="Upload a video"
                        description="Select a video file to convert to GIF. The first 5 seconds will be converted to an animated GIF."
                        maxSize={500}
                    />
                    
                    <button 
                        onClick={createGif} 
                        disabled={!videoFile || isLoading} 
                        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        {isLoading ? `Creating GIF... ${(progress * 100).toFixed(0)}%` : 'Create GIF'}
                    </button>
                    
                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}
                </div>

                {/* Right side - Preview */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Preview:</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 min-h-[300px] flex items-center justify-center">
                        {videoFile && !gif ? (
                            <div className="text-center">
                                <video 
                                    src={URL.createObjectURL(videoFile)} 
                                    controls 
                                    className="max-w-full max-h-64 rounded-lg border border-gray-200 dark:border-gray-700"
                                />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Original Video</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                    First 5 seconds will be converted to GIF
                                </p>
                            </div>
                        ) : gif ? (
                            <div className="text-center">
                                <img 
                                    src={gif} 
                                    alt="Generated GIF" 
                                    className="max-w-full max-h-64 rounded-lg border border-gray-200 dark:border-gray-700"
                                />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Generated GIF</p>
                                <a 
                                    href={gif} 
                                    download="animation.gif" 
                                    className="inline-block mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                                >
                                    Download GIF
                                </a>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <div className="text-2xl mb-2">🎬</div>
                                <p>Upload a video to create GIF</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ToolContainer>
    );
};

export default GifMaker;

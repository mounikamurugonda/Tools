'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const VideoCompressor: React.FC<ToolProps> = ({ details, toolId }) => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [compressedVideo, setCompressedVideo] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const ffmpegRef = useRef<FFmpeg | null>(null);

    const handleFileChange = (file: File | null) => {
        setVideoFile(file);
        setError('');
    };

    const compressVideo = async () => {
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
            await ffmpeg.exec(['-i', videoFile.name, '-vcodec', 'libx264', '-crf', '28', 'output.mp4']);
            
            const data = await ffmpeg.readFile('output.mp4');
            const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: 'video/mp4' }));
            setCompressedVideo(url);
        } catch (err) {
            console.error('Compression error:', err);
            setError('Failed to compress video. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ToolContainer title="Video Compressor" details={details} toolId={toolId}>
            <div className="grid md:grid-cols-2 gap-6">
                {/* Left side - Upload and Controls */}
                <div className="space-y-6">
                    <FileUpload
                        accept="video/*"
                        onChange={handleFileChange}
                        label="Upload a video"
                        description="Select a video file to compress. Supported formats: MP4, AVI, MOV, WEBM, etc."
                        maxSize={500}
                    />
                    
                    <button 
                        onClick={compressVideo} 
                        disabled={!videoFile || isLoading} 
                        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        {isLoading ? `Compressing... ${(progress * 100).toFixed(0)}%` : 'Compress Video'}
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
                        {videoFile && !compressedVideo ? (
                            <div className="text-center">
                                <video 
                                    src={URL.createObjectURL(videoFile)} 
                                    controls 
                                    className="max-w-full max-h-64 rounded-lg border border-gray-200 dark:border-gray-700"
                                />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Original Video</p>
                            </div>
                        ) : compressedVideo ? (
                            <div className="text-center">
                                <video 
                                    src={compressedVideo} 
                                    controls 
                                    className="max-w-full max-h-64 rounded-lg border border-gray-200 dark:border-gray-700"
                                />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Compressed Video</p>
                                <a 
                                    href={compressedVideo} 
                                    download="compressed_video.mp4" 
                                    className="inline-block mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                                >
                                    Download Compressed Video
                                </a>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <div className="text-2xl mb-2">📹</div>
                                <p>Upload a video to see preview</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ToolContainer>
    );
};

export default VideoCompressor;

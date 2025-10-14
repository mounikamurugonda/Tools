'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const FormatConverter: React.FC<ToolProps> = ({ details, toolId }) => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [convertedVideo, setConvertedVideo] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [outputFormat, setOutputFormat] = useState('mp4');
    const ffmpegRef = useRef<FFmpeg | null>(null);

    const handleFileChange = (file: File | null) => {
        setVideoFile(file);
        setError('');
    };

    const convertFormat = async () => {
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
            
            const outputFileName = `output.${outputFormat}`;
            await ffmpeg.writeFile(videoFile.name, await fetchFile(videoFile));
            await ffmpeg.exec(['-i', videoFile.name, outputFileName]);
            
            const data = await ffmpeg.readFile(outputFileName);
            const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: `video/${outputFormat}` }));
            setConvertedVideo(url);
        } catch (err) {
            console.error('Format conversion error:', err);
            setError('Failed to convert video format. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ToolContainer title="Video Format Converter" details={details} toolId={toolId}>
            <div className="space-y-6">
                <FileUpload
                    accept="video/*"
                    onChange={handleFileChange}
                    label="Upload a video"
                    description="Select a video file to convert to a different format."
                    maxSize={500}
                />
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output Format</label>
                    <select 
                        value={outputFormat} 
                        onChange={(e) => setOutputFormat(e.target.value)} 
                        className="w-full bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                    >
                        <option value="mp4">MP4</option>
                        <option value="avi">AVI</option>
                        <option value="mov">MOV</option>
                        <option value="webm">WEBM</option>
                    </select>
                </div>
                
                <button 
                    onClick={convertFormat} 
                    disabled={!videoFile || isLoading} 
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    {isLoading ? `Converting... ${(progress * 100).toFixed(0)}%` : 'Convert Format'}
                </button>
                
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}
                
                {convertedVideo && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Converted Video:</h3>
                        <video src={convertedVideo} controls className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
                        <a 
                            href={convertedVideo} 
                            download={`converted_video.${outputFormat}`} 
                            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                        >
                            Download Converted Video
                        </a>
                    </div>
                )}
            </div>
        </ToolContainer>
    );
};

export default FormatConverter;

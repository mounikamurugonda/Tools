'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { Music, Download, Video, AlertCircle } from 'lucide-react';

const VideoToAudioConverter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const ffmpegRef = useRef<FFmpeg | null>(null);

  const handleFileChange = (file: File | null) => {
    setVideoFile(file);
    setError('');
    if (file) setAudioFile(null);
  };

  const convertVideoToAudio = async () => {
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
      await ffmpeg.exec(['-i', videoFile.name, '-q:a', '0', '-map', 'a', 'output.mp3']);

      const data = await ffmpeg.readFile('output.mp3');
      const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: 'audio/mp3' }));
      setAudioFile(url);
    } catch (err) {
      console.error('Conversion error:', err);
      setError('Failed to convert video to audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolContainer title="Video to Audio Converter" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Upload and Controls */}
        <div className="space-y-6">
          <Card title="Upload Video">
            <div className="space-y-6">
              <FileUpload
                accept="video/*"
                onChange={handleFileChange}
                label="Upload a video"
                description="Select a video file to extract audio from. Supported formats: MP4, AVI, MOV, WEBM, etc."
                maxSize={500}
              />

              <Button
                onClick={convertVideoToAudio}
                disabled={!videoFile || isLoading}
                className="w-full"
                variant="primary"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Converting... {(progress * 100).toFixed(0)}%
                  </>
                ) : (
                  <>
                    <Music className="w-4 h-4 mr-2" /> Convert to Audio
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center text-red-600 dark:text-red-400">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right side - Preview */}
        <div className="space-y-4">
          <Card title="Preview" className="h-full">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 min-h-[300px] flex items-center justify-center h-full">
              {videoFile && !audioFile ? (
                <div className="text-center w-full">
                  <video
                    src={URL.createObjectURL(videoFile)}
                    controls
                    className="max-w-full max-h-64 rounded-lg border border-gray-200 dark:border-gray-700 mx-auto"
                  />
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                    <Video className="w-4 h-4 mr-1" /> Original Video
                  </div>
                </div>
              ) : audioFile ? (
                <div className="text-center w-full">
                  <audio
                    src={audioFile}
                    controls
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                    <Music className="w-4 h-4 mr-1" /> Extracted Audio
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = audioFile;
                        link.download = 'audio.mp3';
                        link.click();
                      }}
                      variant="success"
                    >
                      <Download className="w-4 h-4 mr-2" /> Download Audio (MP3)
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 dark:text-gray-500 flex flex-col items-center">
                  <Music className="w-16 h-16 mb-4 opacity-50" />
                  <p>Upload a video to extract audio</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default VideoToAudioConverter;

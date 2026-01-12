'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { Download, Play, Video, Image as ImageIcon, AlertCircle } from 'lucide-react';
import Label from '@/components/ui/Label';

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
    // Clear previous GIF when new file selected
    if (file) {
      setGif(null);
    }
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
      await ffmpeg.exec([
        '-i',
        videoFile.name,
        '-t',
        '5',
        '-vf',
        'fps=10,scale=320:-1:flags=lanczos',
        '-c:v',
        'gif',
        'output.gif',
      ]);

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
          <div>
            <Label>Upload Video</Label>
            <FileUpload
              accept="video/*"
              onChange={handleFileChange}
              label="Upload a video"
              description="Select a video file to convert to GIF. The first 5 seconds will be converted to an animated GIF."
              maxSize={500}
            />
          </div>

          <Button
            onClick={createGif}
            disabled={!videoFile || isLoading}
            className="w-full"
            variant="primary"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating GIF... {(progress * 100).toFixed(0)}%
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" /> Create GIF
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

        {/* Right side - Preview */}
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 h-96 flex items-center justify-center">
            {videoFile && !gif ? (
              <div className="text-center w-full h-full flex flex-col justify-center">
                <video
                  src={URL.createObjectURL(videoFile)}
                  controls
                  className="max-w-full max-h-[80%] rounded-lg border border-gray-200 dark:border-gray-700 mx-auto"
                />
                <div className="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                  <Video className="w-4 h-4 mr-1" /> Original Video
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  First 5 seconds will be converted to GIF
                </p>
              </div>
            ) : gif ? (
              <div className="text-center w-full h-full flex flex-col justify-center">
                <img
                  src={gif}
                  alt="Generated GIF"
                  className="max-w-full max-h-[70%] rounded-lg border border-gray-200 dark:border-gray-700 mx-auto shadow-sm"
                />
                <div className="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                  <ImageIcon className="w-4 h-4 mr-1" /> Generated GIF
                </div>

                <div className="mt-4">
                  <Button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = gif;
                      link.download = 'animation.gif';
                      link.click();
                    }}
                    variant="success"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download GIF
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 dark:text-gray-500 flex flex-col items-center">
                <Video className="w-16 h-16 mb-4 opacity-50" />
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

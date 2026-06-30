'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/ui/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Video, Download, FileVideo, AlertCircle, Minimize2, X } from 'lucide-react';
import type { FFmpeg } from '@ffmpeg/ffmpeg';
import Label from '@/components/ui/Label';

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
    if (file) setCompressedVideo(null);
  };

  const compressVideo = async () => {
    if (!videoFile) return;

    try {
      setIsLoading(true);
      setError('');

      // Dynamically load FFmpeg only when needed
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const { fetchFile, toBlobURL } = await import('@ffmpeg/util');

      // Initialize FFmpeg only when needed
      if (!ffmpegRef.current) {
        ffmpegRef.current = new FFmpeg();
      }

      const ffmpeg = ffmpegRef.current;
      ffmpeg.on('progress', ({ progress }: { progress: number }) => {
        setProgress(progress);
      });

      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });

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
          <div>
            <Label>Upload Video</Label>
            {!videoFile ? (
              <FileUpload
                accept="video/*"
                onFileSelect={(file) => {
                  if (file.size > 500 * 1024 * 1024) {
                    setError('File size must be less than 500MB');
                    return;
                  }
                  handleFileChange(file);
                }}
                title="Click to upload or drag and drop"
                description="Supported formats: MP4, AVI, MOV, WEBM (max 500MB)"
              />
            ) : (
              <div className="border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-xl p-6 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <FileVideo className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate max-w-[200px]">
                      {videoFile.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFileChange(null)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>

          <Button
            onClick={compressVideo}
            disabled={!videoFile || isLoading}
            className="w-full"
            variant="primary"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Compressing... {Math.max(0, Math.min(100, Math.round(progress * 100)))}%
              </>
            ) : (
              <>
                <Minimize2 className="w-4 h-4 mr-2" /> Compress Video
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
            {videoFile && !compressedVideo ? (
              <div className="text-center w-full h-full flex flex-col justify-center">
                <video
                  src={URL.createObjectURL(videoFile)}
                  controls
                  className="max-w-full max-h-[80%] rounded-lg border border-gray-200 dark:border-gray-700 mx-auto"
                />
                <div className="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                  <Video className="w-4 h-4 mr-1" /> Original Video
                </div>
              </div>
            ) : compressedVideo ? (
              <div className="text-center w-full h-full flex flex-col justify-center">
                <video
                  src={compressedVideo}
                  controls
                  className="max-w-full max-h-[70%] rounded-lg border border-gray-200 dark:border-gray-700 mx-auto"
                />
                <div className="mt-4 flex items-center justify-center text-sm text-green-600 dark:text-green-400">
                  <Minimize2 className="w-4 h-4 mr-1" /> Compressed Video
                </div>
                <div className="mt-4">
                  <Button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = compressedVideo;
                      link.download = 'compressed_video.mp4';
                      link.click();
                    }}
                    variant="success"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download Compressed Video
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 dark:text-gray-500 flex flex-col items-center">
                <FileVideo className="w-16 h-16 mb-4 opacity-50" />
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

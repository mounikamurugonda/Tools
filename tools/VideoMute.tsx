'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { VolumeX, Download, Video, AlertCircle } from 'lucide-react';

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
    if (file) setMutedVideo(null);
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
    <ToolContainer title="Mute MP4 Video" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Upload and Controls */}
        <div className="space-y-6">
          <Card title="Upload Video">
            <div className="space-y-6">
              <FileUpload
                accept="video/*"
                onChange={handleFileChange}
                label="Upload a video"
                description="Select a video file to remove the audio track from."
                maxSize={500}
              />

              <Button
                onClick={muteVideo}
                disabled={!videoFile || isLoading}
                className="w-full"
                variant="primary"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Muting... {(progress * 100).toFixed(0)}%
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 mr-2" /> Mute Video
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
              {videoFile && !mutedVideo ? (
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
              ) : mutedVideo ? (
                <div className="text-center w-full">
                  <video
                    src={mutedVideo}
                    controls
                    className="max-w-full max-h-64 rounded-lg border border-gray-200 dark:border-gray-700 mx-auto"
                  />
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                    <VolumeX className="w-4 h-4 mr-1" /> Muted Video
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = mutedVideo;
                        link.download = 'muted_video.mp4';
                        link.click();
                      }}
                      variant="success"
                    >
                      <Download className="w-4 h-4 mr-2" /> Download Muted Video
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 dark:text-gray-500 flex flex-col items-center">
                  <VolumeX className="w-16 h-16 mb-4 opacity-50" />
                  <p>Upload a video to mute</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default VideoMute;

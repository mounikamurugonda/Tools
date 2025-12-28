'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { Image as ImageIcon, Download, Video, AlertCircle } from 'lucide-react';

const VideoThumbnailExtractor: React.FC<ToolProps> = ({ details, toolId }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [timestamp, setTimestamp] = useState(1);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  const handleFileChange = (file: File | null) => {
    setVideoFile(file);
    setError('');
    if (file) setThumbnail(null);
  };

  const extractThumbnail = async () => {
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
        '-ss',
        String(timestamp),
        '-vframes',
        '1',
        'output.jpg',
      ]);

      const data = await ffmpeg.readFile('output.jpg');
      const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: 'image/jpeg' }));
      setThumbnail(url);
    } catch (err) {
      console.error('Thumbnail extraction error:', err);
      setError('Failed to extract thumbnail. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolContainer title="Video Thumbnail Extractor" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Upload and Controls */}
        <div className="space-y-6">
          <Card title="Upload Video">
            <div className="space-y-6">
              <FileUpload
                accept="video/*"
                onChange={handleFileChange}
                label="Upload a video"
                description="Select a video file to extract a thumbnail from. Specify the timestamp to capture the frame."
                maxSize={500}
              />

              <div>
                <Label>Timestamp (seconds)</Label>
                <Input
                  type="number"
                  value={timestamp}
                  onChange={e => setTimestamp(Number(e.target.value))}
                  min={0}
                  step={0.1}
                />
              </div>

              <Button
                onClick={extractThumbnail}
                disabled={!videoFile || isLoading}
                className="w-full"
                variant="primary"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Extracting... {(progress * 100).toFixed(0)}%
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4 mr-2" /> Extract Thumbnail
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
              {videoFile && !thumbnail ? (
                <div className="text-center w-full">
                  <video
                    src={URL.createObjectURL(videoFile)}
                    controls
                    className="max-w-full max-h-64 rounded-lg border border-gray-200 dark:border-gray-700 mx-auto"
                  />
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                    <Video className="w-4 h-4 mr-1" /> Original Video
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Extract at: {timestamp}s
                  </p>
                </div>
              ) : thumbnail ? (
                <div className="text-center w-full">
                  <img
                    src={thumbnail}
                    alt="Extracted Thumbnail"
                    className="max-w-full max-h-64 rounded-lg border border-gray-200 dark:border-gray-700 mx-auto"
                  />
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                    <ImageIcon className="w-4 h-4 mr-1" /> Extracted Thumbnail
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = thumbnail;
                        link.download = 'thumbnail.jpg';
                        link.click();
                      }}
                      variant="success"
                    >
                      <Download className="w-4 h-4 mr-2" /> Download Thumbnail
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 dark:text-gray-500 flex flex-col items-center">
                  <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                  <p>Upload a video to extract thumbnail</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default VideoThumbnailExtractor;

'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { Search, ExternalLink, Image as ImageIcon, Video } from 'lucide-react';

const YouTubeThumbnail: React.FC<ToolProps> = ({ details, toolId }) => {
  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [error, setError] = useState('');

  const extractId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  const handleFetch = () => {
    const videoId = extractId(url);
    if (videoId) {
      setThumbnails([
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      ]);
      setError('');
    } else {
      setError('Invalid YouTube URL');
      setThumbnails([]);
    }
  };

  return (
    <ToolContainer title="YouTube Thumbnail Downloader" details={details} toolId={toolId}>
      <div className="space-y-8">
        <Card>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-grow space-y-2 w-full">
              <Label htmlFor="youtube-url">YouTube Video URL</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Video className="h-4 w-4" />
                </div>
                <Input
                  id="youtube-url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="pl-10"
                  onKeyDown={e => e.key === 'Enter' && handleFetch()}
                />
              </div>
            </div>
            <Button onClick={handleFetch} variant="primary" className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" /> Fetch Thumbnails
            </Button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}
        </Card>

        {thumbnails.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thumbnails.map((thumb, i) => (
              <Card
                key={i}
                className="p-0 overflow-hidden"
                title={
                  ['Max Resolution (HD)', 'Standard Quality', 'High Quality', 'Medium Quality'][i]
                }
              >
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative group">
                  <img
                    src={thumb}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/640x480?text=Thumbnail+Not+Found';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = thumb;
                        link.download = `thumbnail-${i}.jpg`;
                        link.target = '_blank';
                        link.click();
                      }}
                    >
                      <ImageIcon className="w-4 h-4 mr-2" /> Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {thumbnails.length === 0 && !error && (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-10 h-10 opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              No Thumbnails Yet
            </h3>
            <p className="max-w-sm mx-auto mt-2">
              Enter a YouTube video URL above to fetch and download high-quality thumbnails.
            </p>
          </div>
        )}
      </div>
    </ToolContainer>
  );
};

export default YouTubeThumbnail;

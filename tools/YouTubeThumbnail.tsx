'use client';

import React, { useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { useToast } from '@/components/ui/ToastProvider';
import { Search, Image as ImageIcon, Video, Copy, Download } from 'lucide-react';

type Thumb = {
  label: string;
  size: string;
  url: string;
};

// Robust ID extractor — handles watch?v=, youtu.be/, /shorts/, /embed/, /live/, /v/, with extra params.
const extractId = (raw: string): string | null => {
  const value = raw.trim();
  if (!value) return null;
  // Bare 11-char ID
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return value;
  try {
    const u = new URL(value.includes('://') ? value : `https://${value}`);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1).split('/')[0];
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      const v = u.searchParams.get('v');
      if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;
      const parts = u.pathname.split('/').filter(Boolean);
      const idx = parts.findIndex(p => ['shorts', 'embed', 'live', 'v'].includes(p));
      if (idx >= 0 && parts[idx + 1] && /^[A-Za-z0-9_-]{11}$/.test(parts[idx + 1])) {
        return parts[idx + 1];
      }
    }
  } catch {
    /* fall through */
  }
  return null;
};

const YouTubeThumbnail: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const thumbnails = useMemo<Thumb[]>(() => {
    if (!videoId) return [];
    return [
      { label: 'Max Resolution', size: '1280×720', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
      { label: 'Standard Definition', size: '640×480', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
      { label: 'High Quality', size: '480×360', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
      { label: 'Medium Quality', size: '320×180', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
    ];
  }, [videoId]);

  const handleFetch = () => {
    const id = extractId(url);
    if (id) {
      setVideoId(id);
      setError('');
    } else {
      setError('Could not find a YouTube video ID in that URL.');
      setVideoId(null);
    }
  };

  const copyUrl = async (u: string) => {
    try {
      await navigator.clipboard.writeText(u);
      toast.success('URL copied');
    } catch {
      toast.error('Copy failed');
    }
  };

  const download = async (u: string, label: string) => {
    try {
      const res = await fetch(u);
      if (!res.ok) throw new Error('not found');
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `youtube-${videoId}-${label.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      toast.success('Downloaded');
    } catch {
      toast.error('That resolution is not available for this video');
    }
  };

  return (
    <ToolContainer title="YouTube Thumbnail Downloader" details={details} toolId={toolId}>
      <div className="space-y-8">
        <Card>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-grow space-y-2 w-full">
              <Label htmlFor="youtube-url">YouTube Video URL or ID</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Video className="h-4 w-4" />
                </div>
                <Input
                  id="youtube-url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or youtu.be/... or 11-char ID"
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
            <div
              role="alert"
              className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm"
            >
              {error}
            </div>
          )}
          {videoId && (
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Video ID: <code className="font-mono">{videoId}</code> · Not every video has every
              size; max-res falls back if unavailable.
            </p>
          )}
        </Card>

        {thumbnails.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thumbnails.map((thumb, i) => (
              <Card key={i} className="p-0 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-baseline justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{thumb.label}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{thumb.size}</span>
                </div>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative group">
                  <img
                    src={thumb.url}
                    alt={`${thumb.label} thumbnail`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/640x480?text=Not+Available';
                    }}
                  />
                </div>
                <div className="px-4 py-3 flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => download(thumb.url, thumb.label)}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-1.5" /> Download
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => copyUrl(thumb.url)}
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-1.5" /> Copy URL
                  </Button>
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
              Paste a YouTube link (watch URL, youtu.be, /shorts, or /embed) to fetch every
              available thumbnail.
            </p>
          </div>
        )}
      </div>
    </ToolContainer>
  );
};

export default YouTubeThumbnail;

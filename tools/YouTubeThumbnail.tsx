
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const YouTubeThumbnail: React.FC<ToolProps> = ({ details, toolId }) => {
  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [error, setError] = useState('');

  const extractId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
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
      <div className="space-y-6">
        <div className="flex gap-4">
            <input 
                value={url} 
                onChange={e => setUrl(e.target.value)} 
                className="flex-grow brand-input" 
                placeholder="Paste YouTube URL here..." 
            />
            <button onClick={handleFetch} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium">Fetch</button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        
        {thumbnails.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {thumbnails.map((thumb, i) => (
                    <div key={i} className="space-y-2">
                        <img src={thumb} alt="Thumbnail" className="w-full rounded-lg shadow" />
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">{['Max Res', 'Standard', 'High', 'Medium'][i]}</span>
                            <div className="flex gap-2">
                                <CopyButton textToCopy={thumb} />
                                <a href={thumb} target="_blank" rel="noreferrer" className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Open</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </ToolContainer>
  );
};

export default YouTubeThumbnail;

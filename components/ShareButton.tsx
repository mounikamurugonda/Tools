'use client';

import { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  toolId: string;
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ toolId, title }) => {
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const url = `${window.location.origin}/tools/${toolId}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this tool: ${title}`,
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Share tool"
      >
        <Share2 size={20} />
      </button>
      {copied && (
        <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs rounded-md px-2 py-1">
          Copied!
        </div>
      )}
    </div>
  );
};

export default ShareButton;

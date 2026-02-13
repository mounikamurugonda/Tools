import React, { useState } from 'react';
import { Download, X, Check, Sparkles, Copy, Globe, Tag, Hash } from 'lucide-react';
import { generateSEOMetadata, SEOContent } from '../utils/sarvamAI';

interface RecordingDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  recordingTime: number;
  code: { html: string; css: string; js: string };
  shareUrl?: string;
}

export const RecordingDownloadModal: React.FC<RecordingDownloadModalProps> = ({
  isOpen,
  onClose,
  onDownload,
  recordingTime,
  code,
  shareUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'download' | 'seo'>('download');
  const [seoData, setSeoData] = useState<SEOContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleDownload = () => {
    onDownload();
    // onClose(); // Keep open per user request
  };

  const handleGenerateSEO = async () => {
    setIsGenerating(true);
    try {
      const data = await generateSEOMetadata(code.html, code.css);
      setSeoData(data);
    } catch (error) {
      console.error("Failed to generate SEO", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(field);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <Check size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Recording Ready
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Duration: {formatTime(recordingTime)}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-800 mb-4 shrink-0">
            <button
              onClick={() => setActiveTab('download')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'download'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
            >
              Download Video
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'seo'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
            >
              <Sparkles size={14} />
              SEO & Social
            </button>
          </div>

          {/* Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto pr-1 min-h-0">

            {activeTab === 'download' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your recording has been processed and is ready to download.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Format:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">WebM</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600 dark:text-gray-400">Quality:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">High (VP9/VP8)</span>
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm mt-4"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-4">
                {!seoData ? (
                  <div className="text-center py-8">
                    <Sparkles size={32} className="mx-auto text-purple-500 mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Generate optimized Title, Description, and Tags for your video upload.
                    </p>
                    <button
                      onClick={handleGenerateSEO}
                      disabled={isGenerating}
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors text-sm flex items-center gap-2 mx-auto"
                    >
                      {isGenerating ? 'Generating...' : 'Generate with AI'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {/* Title */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Title</label>
                      <div className="flex gap-2">
                        <input
                          readOnly
                          value={seoData.title}
                          className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                        <button
                          onClick={() => copyToClipboard(seoData.title, 'title')}
                          className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                        >
                          {copyStatus === 'title' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Description</label>
                      <div className="relative">
                        <textarea
                          readOnly
                          value={seoData.description}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[80px] resize-none pr-10"
                        />
                        <button
                          onClick={() => copyToClipboard(seoData.description, 'desc')}
                          className="absolute top-2 right-2 p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                        >
                          {copyStatus === 'desc' ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    {/* Metadata Items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Tags */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                            <Tag size={12} /> Tags
                          </label>
                          <button
                            onClick={() => copyToClipboard(seoData.tags.join(', '), 'tags')}
                            className="text-[10px] text-purple-600 hover:underline"
                          >
                            {copyStatus === 'tags' ? 'Copied' : 'Copy All'}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[60px]">
                          {seoData.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-600 dark:text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hashtags */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                            <Hash size={12} /> Hashtags
                          </label>
                          <button
                            onClick={() => copyToClipboard(seoData.hashtags.join(' '), 'hash')}
                            className="text-[10px] text-purple-600 hover:underline"
                          >
                            {copyStatus === 'hash' ? 'Copied' : 'Copy All'}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[60px]">
                          {seoData.hashtags.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Share Link */}
                    <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                        <Globe size={12} /> Video Share Link
                      </label>
                      <div className="flex gap-2">
                        <input
                          readOnly
                          value={shareUrl || "Save snippet to generate link"}
                          className={`flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none ${shareUrl ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-400 italic'}`}
                        />
                        {shareUrl && (
                          <button
                            onClick={() => copyToClipboard(shareUrl, 'link')}
                            className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                          >
                            {copyStatus === 'link' ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

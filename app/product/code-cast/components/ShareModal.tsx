import React from 'react';
import { Copy, X, Check, Link } from 'lucide-react';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url }) => {
    const [copied, setCopied] = React.useState(false);

    if (!isOpen) return null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-800" onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                            <Link size={20} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Share Snippet</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Your snippet is ready to share! Copy the link below.
                </p>

                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                    <input
                        type="text"
                        value={url}
                        readOnly
                        className="flex-1 bg-transparent border-none text-sm text-gray-700 dark:text-gray-300 focus:ring-0 px-2 outline-none"
                    />
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${copied
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600'
                            }`}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
            </div>
        </div>
    );
};

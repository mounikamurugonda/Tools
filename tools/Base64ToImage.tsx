
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const Base64ToImage: React.FC<ToolProps> = ({ details, toolId }) => {
  const [base64, setBase64] = useState('');
  const [error, setError] = useState('');

  const handleDownload = () => {
    if (!base64) return;
    const link = document.createElement('a');
    link.href = base64;
    
    const mimeType = base64.substring(base64.indexOf(':') + 1, base64.indexOf(';'));
    const extension = mimeType.split('/')[1] || 'png';
    link.download = `image.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBase64(value);
    if (value && !value.startsWith('data:image')) {
        setError('Invalid Base64 data URL. It should start with "data:image/...".');
    } else {
        setError('');
    }
  }

  return (
    <ToolContainer title="Base64 to Image Converter" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Paste Base64 Data URL</label>
          <textarea
            value={base64}
            onChange={handleInputChange}
            placeholder="Paste your Base64 data URL here (e.g., data:image/png;base64,...)"
            className="w-full h-48 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 text-xs"
          />
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Image Preview</h3>
            <div className="h-64 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center p-4">
              {base64 && !error ? (
                <img src={base64} alt="Preview" className="max-h-full max-w-full" />
              ) : (
                <p className="text-gray-500">Image preview will appear here</p>
              )}
            </div>
             {base64 && !error && (
                <button 
                    onClick={handleDownload}
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold"
                >
                    Download Image
                </button>
             )}
        </div>
      </div>
    </ToolContainer>
  );
};

export default Base64ToImage;

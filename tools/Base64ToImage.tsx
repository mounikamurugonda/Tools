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

    const mimeType = base64.substring(
      base64.indexOf(':') + 1,
      base64.indexOf(';'),
    );
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
      setError(
        'Invalid Base64 data URL. It should start with "data:image/...".',
      );
    } else {
      setError('');
    }
  };

  return (
    <ToolContainer
      title="Base64 to Image Converter"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleDownload}
            disabled={!base64 || !!error}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Download Image
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side - Input */}
          <div className="space-y-4">
            <div className="relative">
              <label
                htmlFor="base64-input"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Base64 Data URL
              </label>
              <textarea
                id="base64-input"
                value={base64}
                onChange={handleInputChange}
                placeholder="Paste your Base64 data URL here (e.g., data:image/png;base64,...)"
                className="w-full h-96 max-h-96 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 text-xs resize-none"
              />
            </div>
            {error && <p className="text-red-400">{error}</p>}
          </div>

          {/* Right side - Preview */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image Preview
            </label>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 min-h-[300px] flex items-center justify-center">
              {base64 && !error ? (
                <img
                  src={base64}
                  alt="Preview"
                  className="max-h-full max-w-full rounded"
                />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="text-2xl mb-2">🖼️</div>
                  <p>Image preview will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default Base64ToImage;

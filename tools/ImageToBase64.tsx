import React, { useState } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

const ImageToBase64: React.FC<ToolProps> = () => {
  const [base64, setBase64] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        setImageSrc('');
        setBase64('');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImageSrc(result);
        setBase64(result);
      };
      reader.onerror = () => {
        setError('Error reading file.');
        setImageSrc('');
        setBase64('');
      };
      reader.readAsDataURL(file);
    }
  };
  
  const copyToClipboard = () => {
      if(base64) navigator.clipboard.writeText(base64);
  }

  return (
    <ToolContainer title="Image to Base64 Converter">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload an image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <div className="h-64 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              {imageSrc ? (
                <img src={imageSrc} alt="Preview" className="max-h-full max-w-full" />
              ) : (
                <p className="text-gray-500">Image preview will appear here</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Base64 Data URL</h3>
            <div className="relative">
              <textarea
                readOnly
                value={base64}
                placeholder="Base64 output..."
                className="w-full h-64 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-800 dark:text-gray-200 text-xs"
              />
              {base64 && <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded"
              >
                Copy
              </button>}
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default ImageToBase64;
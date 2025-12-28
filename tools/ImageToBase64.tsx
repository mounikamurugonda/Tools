'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/FileUpload';
import Card from '@/components/ui/Card';
import TextArea from '@/components/ui/TextArea';
import CopyButton from '@/components/CopyButton';
import Label from '@/components/ui/Label';
import { Image as ImageIcon, FileText } from 'lucide-react';

const ImageToBase64: React.FC<ToolProps> = ({ details, toolId }) => {
  const [base64, setBase64] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (file: File | null) => {
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
    } else {
      setImageSrc('');
      setBase64('');
      setError('');
    }
  };

  return (
    <ToolContainer title="Image to Base64 Converter" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Upload Image">
          <div className="space-y-4">
            <Label>Select an image file</Label>
            <FileUpload accept="image/*" onChange={handleFileChange} maxSize={10} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </Card>

        {(imageSrc || base64) && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Preview">
              <div className="h-64 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center p-4">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                    <p>Image preview will appear here</p>
                  </div>
                )}
              </div>
            </Card>

            <Card title="Base64 Data URL">
              <div className="relative h-64">
                <TextArea
                  readOnly
                  value={base64}
                  placeholder="Base64 output..."
                  className="w-full h-full font-mono text-xs resize-none"
                />
                {base64 && (
                  <div className="absolute top-2 right-2">
                    <CopyButton textToCopy={base64} />
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </ToolContainer>
  );
};

export default ImageToBase64;

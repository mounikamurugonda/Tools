'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import { Download, AlertCircle, Image as ImageIcon } from 'lucide-react';

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
        <div className="flex justify-end">
          <Button
            onClick={handleDownload}
            disabled={!base64 || !!error}
            variant="primary"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Image
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side - Input */}
          <div className="space-y-4">
            <Card title="Input" className="h-full">
              <div className="space-y-4 h-full flex flex-col">
                <Label htmlFor="base64-input">Base64 Data URL</Label>
                <TextArea
                  id="base64-input"
                  value={base64}
                  onChange={handleInputChange}
                  placeholder="Paste your Base64 data URL here (e.g., data:image/png;base64,...)"
                  className="flex-grow min-h-[300px] font-mono text-xs resize-none"
                />
                {error && (
                  <div className="flex items-center text-red-500 text-sm mt-2 bg-red-50 dark:bg-red-900/10 p-2 rounded">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right side - Preview */}
          <div className="space-y-4">
            <Card title="Preview" className="h-full">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 h-full min-h-[300px] flex items-center justify-center p-4">
                {base64 && !error ? (
                  <img
                    src={base64}
                    alt="Preview"
                    className="max-h-full max-w-full rounded shadow-md object-contain"
                  />
                ) : (
                  <div className="text-center text-gray-400 dark:text-gray-500 flex flex-col items-center">
                    <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                    <p>Image preview will appear here</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default Base64ToImage;

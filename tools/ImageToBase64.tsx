'use client';

import React, { useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import FileUpload from '@/components/ui/FileUpload';
import Card from '@/components/ui/Card';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { useToast } from '@/components/ui/ToastProvider';
import { Image as ImageIcon, Copy } from 'lucide-react';

type Mode = 'dataurl' | 'raw';

const formatBytes = (n: number): string => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
};

const ImageToBase64: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [dataUrl, setDataUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [mode, setMode] = useState<Mode>('dataurl');
  const [error, setError] = useState('');

  const handleFileChange = (file: File | null) => {
    setError('');
    if (!file) {
      setDataUrl('');
      setFileName('');
      setFileSize(0);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDataUrl(reader.result as string);
      setFileName(file.name);
      setFileSize(file.size);
    };
    reader.onerror = () => setError('Error reading file.');
    reader.readAsDataURL(file);
  };

  const output = useMemo(() => {
    if (!dataUrl) return '';
    if (mode === 'raw') return dataUrl.replace(/^data:[^;]+;base64,/, '');
    return dataUrl;
  }, [dataUrl, mode]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  const copyHtml = () =>
    copy(`<img src="${dataUrl}" alt="${fileName || 'image'}" />`, '<img> tag');
  const copyCss = () => copy(`background-image: url("${dataUrl}");`, 'CSS background');

  return (
    <ToolContainer title="Image to Base64 Converter" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Upload Image">
          <div className="space-y-4">
            <Label>Select an image file</Label>
            <FileUpload accept="image/*" onChange={handleFileChange} maxSizeMB={10} />
            {error && (
              <p role="alert" className="text-red-600 dark:text-red-400 text-sm">
                {error}
              </p>
            )}
            {fileName && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {fileName} · {formatBytes(fileSize)} → base64 {formatBytes(output.length)}{' '}
                <span className="text-amber-600 dark:text-amber-400">
                  (+{Math.round(((output.length - fileSize) / fileSize) * 100)}%)
                </span>
              </p>
            )}
          </div>
        </Card>

        {dataUrl && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Preview">
              <div className="h-64 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center p-4">
                <img
                  src={dataUrl}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </Card>

            <Card title="Base64 Output">
              <div className="space-y-3">
                <div
                  className="inline-flex rounded-md bg-gray-100 dark:bg-gray-800 p-0.5"
                  role="radiogroup"
                  aria-label="Output format"
                >
                  <button
                    role="radio"
                    aria-checked={mode === 'dataurl'}
                    onClick={() => setMode('dataurl')}
                    className={`px-3 py-1.5 text-xs rounded ${
                      mode === 'dataurl'
                        ? 'bg-white dark:bg-gray-700 shadow-sm'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    Data URL
                  </button>
                  <button
                    role="radio"
                    aria-checked={mode === 'raw'}
                    onClick={() => setMode('raw')}
                    className={`px-3 py-1.5 text-xs rounded ${
                      mode === 'raw'
                        ? 'bg-white dark:bg-gray-700 shadow-sm'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    Raw base64
                  </button>
                </div>
                <TextArea
                  readOnly
                  value={output}
                  placeholder="Base64 output..."
                  className="w-full h-48 font-mono text-xs resize-none"
                  aria-label="Base64 output"
                />
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" onClick={() => copy(output, mode === 'raw' ? 'base64' : 'data URL')}>
                    <Copy className="w-4 h-4 mr-1.5" /> Copy
                  </Button>
                  <Button variant="secondary" onClick={copyHtml}>
                    <Copy className="w-4 h-4 mr-1.5" /> Copy &lt;img&gt;
                  </Button>
                  <Button variant="secondary" onClick={copyCss}>
                    <Copy className="w-4 h-4 mr-1.5" /> Copy CSS
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {!dataUrl && !error && (
          <Card className="h-48 flex items-center justify-center text-gray-400 dark:text-gray-500">
            <div className="text-center">
              <ImageIcon className="w-12 h-12 mb-2 opacity-50 mx-auto" />
              <p>Upload an image to encode</p>
            </div>
          </Card>
        )}
      </div>
    </ToolContainer>
  );
};

export default ImageToBase64;

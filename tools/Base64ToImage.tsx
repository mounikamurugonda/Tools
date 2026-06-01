'use client';

import React, { useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import FileUpload from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/ToastProvider';
import { Download, AlertCircle, Image as ImageIcon, FileText, Upload } from 'lucide-react';

const sniffMime = (raw: string): string => {
  // Best-effort sniff by base64 magic bytes
  const start = raw.slice(0, 16);
  if (start.startsWith('iVBOR')) return 'image/png';
  if (start.startsWith('/9j/')) return 'image/jpeg';
  if (start.startsWith('R0lGOD')) return 'image/gif';
  if (start.startsWith('UklGR')) return 'image/webp';
  if (start.startsWith('PHN2Z') || start.startsWith('PD94b')) return 'image/svg+xml';
  return 'image/png';
};

const formatBytes = (n: number): string => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
};

const Base64ToImage: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [imgError, setImgError] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');

  const { dataUrl, mime, decodedSize } = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return { dataUrl: '', mime: '', decodedSize: 0 };
    if (trimmed.startsWith('data:')) {
      const m = /^data:([^;]+);base64,(.+)$/i.exec(trimmed);
      if (!m) return { dataUrl: '', mime: '', decodedSize: 0 };
      const payload = m[2].replace(/\s+/g, '');
      const decoded = Math.floor((payload.length * 3) / 4);
      return { dataUrl: `data:${m[1]};base64,${payload}`, mime: m[1], decodedSize: decoded };
    }
    // Raw base64 — sniff mime and prepend.
    const payload = trimmed.replace(/\s+/g, '');
    if (!/^[A-Za-z0-9+/=_-]+$/.test(payload)) return { dataUrl: '', mime: '', decodedSize: 0 };
    const m = sniffMime(payload);
    const decoded = Math.floor((payload.length * 3) / 4);
    return { dataUrl: `data:${m};base64,${payload}`, mime: m, decodedSize: decoded };
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    setImgError('');
    if (!value.trim()) {
      setError('');
      return;
    }
    const trimmed = value.trim();
    if (
      !trimmed.startsWith('data:') &&
      !/^[A-Za-z0-9+/=_\-\s]+$/.test(trimmed)
    ) {
      setError('Invalid base64 — expected a data URL or raw base64 string.');
    } else {
      setError('');
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        setInput(content);
        handleInputChange({ target: { value: content } } as React.ChangeEvent<HTMLTextAreaElement>);
        setInputMode('text');
        toast.success(`Loaded ${file.name}`);
      }
    };
    reader.onerror = () => toast.error('Could not read file');
    reader.readAsText(file);
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const extension = (mime.split('/')[1] || 'png').replace('+xml', '');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `image.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded');
  };

  return (
    <ToolContainer title="Base64 to Image Converter" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button
            onClick={handleDownload}
            disabled={!dataUrl || !!error || !!imgError}
            variant="primary"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Image
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card title="Input" className="h-full">
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex justify-between items-center">
                  <Label htmlFor="base64-input">Base64 (data URL or raw)</Label>
                  <div className="flex gap-1">
                    <Button
                      variant={inputMode === 'text' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setInputMode('text')}
                      title="Paste Text"
                    >
                      <FileText className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={inputMode === 'file' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setInputMode('file')}
                      title="Upload Text File"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {inputMode === 'text' ? (
                  <TextArea
                    id="base64-input"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Paste a data URL or raw base64 string..."
                    className="flex-grow min-h-[300px] font-mono text-xs resize-none"
                  />
                ) : (
                  <div className="flex-grow flex flex-col min-h-[300px]">
                    <FileUpload
                      onFileSelect={handleFileUpload}
                      accept=".txt,.b64,.base64"
                      className="h-full"
                    />
                  </div>
                )}

                {(error || imgError) && (
                  <div
                    role="alert"
                    className="flex items-center text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded"
                  >
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {error || imgError}
                  </div>
                )}

                {dataUrl && !error && !imgError && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Decoded: {formatBytes(decodedSize)} · MIME: <code>{mime}</code>
                  </p>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card title="Preview" className="h-full">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 h-full min-h-[300px] flex items-center justify-center p-4">
                {dataUrl && !error ? (
                  <img
                    src={dataUrl}
                    alt="Preview"
                    onError={() => setImgError('That base64 does not decode to a valid image.')}
                    onLoad={() => setImgError('')}
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

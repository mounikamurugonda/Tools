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
import {
  Image as ImageIcon,
  Copy,
  Download,
  AlertCircle,
  FileText,
  Upload,
} from 'lucide-react';

type Direction = 'encode' | 'decode';
type EncodeMode = 'dataurl' | 'raw';

const formatBytes = (n: number): string => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
};

// Best-effort sniff of a raw (un-prefixed) base64 payload by its magic bytes.
const sniffMime = (raw: string): string => {
  const start = raw.slice(0, 16);
  if (start.startsWith('iVBOR')) return 'image/png';
  if (start.startsWith('/9j/')) return 'image/jpeg';
  if (start.startsWith('R0lGOD')) return 'image/gif';
  if (start.startsWith('UklGR')) return 'image/webp';
  if (start.startsWith('PHN2Z') || start.startsWith('PD94b')) return 'image/svg+xml';
  return 'image/png';
};

const ImageBase64Converter: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [direction, setDirection] = useState<Direction>('encode');

  // --- Encode (image -> base64) state ---
  const [dataUrl, setDataUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [encodeMode, setEncodeMode] = useState<EncodeMode>('dataurl');
  const [encodeError, setEncodeError] = useState('');

  // --- Decode (base64 -> image) state ---
  const [input, setInput] = useState('');
  const [decodeError, setDecodeError] = useState('');
  const [imgError, setImgError] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');

  const handleImageFile = (file: File | null) => {
    setEncodeError('');
    if (!file) {
      setDataUrl('');
      setFileName('');
      setFileSize(0);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setEncodeError('Please select an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDataUrl(reader.result as string);
      setFileName(file.name);
      setFileSize(file.size);
    };
    reader.onerror = () => setEncodeError('Error reading file.');
    reader.readAsDataURL(file);
  };

  const encodeOutput = useMemo(() => {
    if (!dataUrl) return '';
    if (encodeMode === 'raw') return dataUrl.replace(/^data:[^;]+;base64,/, '');
    return dataUrl;
  }, [dataUrl, encodeMode]);

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

  // Decode: turn pasted base64 (data URL or raw) into a viewable data URL.
  const { decodedUrl, mime, decodedSize } = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return { decodedUrl: '', mime: '', decodedSize: 0 };
    if (trimmed.startsWith('data:')) {
      const m = /^data:([^;]+);base64,(.+)$/i.exec(trimmed);
      if (!m) return { decodedUrl: '', mime: '', decodedSize: 0 };
      const payload = m[2].replace(/\s+/g, '');
      const decoded = Math.floor((payload.length * 3) / 4);
      return { decodedUrl: `data:${m[1]};base64,${payload}`, mime: m[1], decodedSize: decoded };
    }
    const payload = trimmed.replace(/\s+/g, '');
    if (!/^[A-Za-z0-9+/=_-]+$/.test(payload)) return { decodedUrl: '', mime: '', decodedSize: 0 };
    const m = sniffMime(payload);
    const decoded = Math.floor((payload.length * 3) / 4);
    return { decodedUrl: `data:${m};base64,${payload}`, mime: m, decodedSize: decoded };
  }, [input]);

  const handleDecodeInput = (value: string) => {
    setInput(value);
    setImgError('');
    const trimmed = value.trim();
    if (!trimmed) {
      setDecodeError('');
      return;
    }
    if (!trimmed.startsWith('data:') && !/^[A-Za-z0-9+/=_\-\s]+$/.test(trimmed)) {
      setDecodeError('Invalid base64 — expected a data URL or raw base64 string.');
    } else {
      setDecodeError('');
    }
  };

  const handleBase64File = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        handleDecodeInput(content);
        setInputMode('text');
        toast.success(`Loaded ${file.name}`);
      }
    };
    reader.onerror = () => toast.error('Could not read file');
    reader.readAsText(file);
  };

  const handleDownloadImage = () => {
    if (!decodedUrl) return;
    const extension = (mime.split('/')[1] || 'png').replace('+xml', '');
    const link = document.createElement('a');
    link.href = decodedUrl;
    link.download = `image.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded');
  };

  return (
    <ToolContainer title="Image ⇄ Base64 Converter" details={details} toolId={toolId}>
      <div className="space-y-6">
        {/* Direction toggle */}
        <div className="flex justify-center">
          <div
            className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1"
            role="radiogroup"
            aria-label="Conversion direction"
          >
            <button
              role="radio"
              aria-checked={direction === 'encode'}
              onClick={() => setDirection('encode')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                direction === 'encode'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Image → Base64
            </button>
            <button
              role="radio"
              aria-checked={direction === 'decode'}
              onClick={() => setDirection('decode')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                direction === 'decode'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Base64 → Image
            </button>
          </div>
        </div>

        {/* ---------- ENCODE: image -> base64 ---------- */}
        {direction === 'encode' && (
          <>
            <Card title="Upload Image">
              <div className="space-y-4">
                <Label>Select an image file</Label>
                <FileUpload accept="image/*" onChange={handleImageFile} maxSizeMB={10} />
                {encodeError && (
                  <p role="alert" className="text-red-600 dark:text-red-400 text-sm">
                    {encodeError}
                  </p>
                )}
                {fileName && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {fileName} · {formatBytes(fileSize)} → base64{' '}
                    {formatBytes(encodeOutput.length)}{' '}
                    <span className="text-amber-600 dark:text-amber-400">
                      (+{Math.round(((encodeOutput.length - fileSize) / fileSize) * 100)}%)
                    </span>
                  </p>
                )}
              </div>
            </Card>

            {dataUrl && (
              <div className="grid md:grid-cols-2 gap-6">
                <Card title="Preview">
                  <div className="h-64 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center p-4">
                    <img src={dataUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
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
                        aria-checked={encodeMode === 'dataurl'}
                        onClick={() => setEncodeMode('dataurl')}
                        className={`px-3 py-1.5 text-xs rounded ${
                          encodeMode === 'dataurl'
                            ? 'bg-white dark:bg-gray-700 shadow-sm'
                            : 'text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        Data URL
                      </button>
                      <button
                        role="radio"
                        aria-checked={encodeMode === 'raw'}
                        onClick={() => setEncodeMode('raw')}
                        className={`px-3 py-1.5 text-xs rounded ${
                          encodeMode === 'raw'
                            ? 'bg-white dark:bg-gray-700 shadow-sm'
                            : 'text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        Raw base64
                      </button>
                    </div>
                    <TextArea
                      readOnly
                      value={encodeOutput}
                      placeholder="Base64 output..."
                      className="w-full h-48 font-mono text-xs resize-none"
                      aria-label="Base64 output"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="primary"
                        onClick={() => copy(encodeOutput, encodeMode === 'raw' ? 'base64' : 'data URL')}
                      >
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

            {!dataUrl && !encodeError && (
              <Card className="h-48 flex items-center justify-center text-gray-400 dark:text-gray-500">
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 mb-2 opacity-50 mx-auto" />
                  <p>Upload an image to encode</p>
                </div>
              </Card>
            )}
          </>
        )}

        {/* ---------- DECODE: base64 -> image ---------- */}
        {direction === 'decode' && (
          <>
            <div className="flex justify-end">
              <Button
                onClick={handleDownloadImage}
                disabled={!decodedUrl || !!decodeError || !!imgError}
                variant="primary"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
                      onChange={e => handleDecodeInput(e.target.value)}
                      placeholder="Paste a data URL or raw base64 string..."
                      className="flex-grow min-h-[300px] font-mono text-xs resize-none"
                    />
                  ) : (
                    <div className="flex-grow flex flex-col min-h-[300px]">
                      <FileUpload onFileSelect={handleBase64File} accept=".txt,.b64,.base64" className="h-full" />
                    </div>
                  )}

                  {(decodeError || imgError) && (
                    <div
                      role="alert"
                      className="flex items-center text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded"
                    >
                      <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      {decodeError || imgError}
                    </div>
                  )}

                  {decodedUrl && !decodeError && !imgError && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Decoded: {formatBytes(decodedSize)} · MIME: <code>{mime}</code>
                    </p>
                  )}
                </div>
              </Card>

              <Card title="Preview" className="h-full">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 h-full min-h-[300px] flex items-center justify-center p-4">
                  {decodedUrl && !decodeError ? (
                    <img
                      src={decodedUrl}
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
          </>
        )}
      </div>
    </ToolContainer>
  );
};

export default ImageBase64Converter;

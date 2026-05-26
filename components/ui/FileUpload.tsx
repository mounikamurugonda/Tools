'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { File as FileIcon, UploadCloud, X } from 'lucide-react';

type AcceptValue = string | string[];

interface FileUploadProps {
  /** Called with the first selected file. Not fired on remove. Kept for legacy callers. */
  onFileSelect?: (file: File) => void;
  /** Called with `file` on select and `null` on remove. */
  onChange?: (file: File | null) => void;
  /** Called with all selected files when `multiple` is true. */
  onFilesSelect?: (files: File[]) => void;
  /** Called with a validation/runtime error message. */
  onError?: (message: string) => void;

  accept?: AcceptValue;
  multiple?: boolean;
  maxSizeMB?: number;
  /** Allow Ctrl/Cmd+V to pick a file (e.g. clipboard image). Default true. */
  pasteEnabled?: boolean;

  title?: string;
  description?: string;
  className?: string;
  /** Optional label rendered above the dropzone (legacy from components/FileUpload). */
  label?: string;
  /** Show a "selected file" chip with remove button after picking. Default true. */
  showSelected?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
}

function acceptToString(accept?: AcceptValue): string | undefined {
  if (!accept) return undefined;
  return Array.isArray(accept) ? accept.join(',') : accept;
}

function isAccepted(file: File, accept?: AcceptValue): boolean {
  if (!accept) return true;
  const list = Array.isArray(accept) ? accept : accept.split(',');
  const ext = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
  return list
    .map(s => s.trim().toLowerCase())
    .some(token => {
      if (!token) return false;
      if (token.startsWith('.')) return ext === token;
      if (token.endsWith('/*')) return file.type.startsWith(token.replace('/*', '/'));
      return file.type === token;
    });
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onChange,
  onFilesSelect,
  onError,
  accept,
  multiple = false,
  maxSizeMB,
  pasteEnabled = true,
  title = 'Drag & drop your file here',
  description = 'or click to browse',
  className = '',
  label,
  showSelected = true,
}) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selected, setSelected] = useState<File[]>([]);
  const [error, setError] = useState<string>('');

  const reportError = useCallback(
    (msg: string) => {
      setError(msg);
      onError?.(msg);
    },
    [onError]
  );

  const validate = useCallback(
    (file: File): string | null => {
      if (accept && !isAccepted(file, accept)) {
        const a = acceptToString(accept);
        return a ? `Unsupported file type. Allowed: ${a}` : 'Unsupported file type.';
      }
      if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
        return `File is too large. Max ${maxSizeMB} MB.`;
      }
      return null;
    },
    [accept, maxSizeMB]
  );

  const handleFiles = useCallback(
    (fileList: FileList | File[] | null) => {
      if (!fileList || fileList.length === 0) return;
      const files = Array.from(fileList);
      const valid: File[] = [];
      for (const f of files) {
        const err = validate(f);
        if (err) {
          reportError(err);
          return;
        }
        valid.push(f);
        if (!multiple) break;
      }
      setError('');
      setSelected(valid);
      onFileSelect?.(valid[0]);
      onChange?.(valid[0] ?? null);
      if (multiple) onFilesSelect?.(valid);
    },
    [multiple, onChange, onFileSelect, onFilesSelect, reportError, validate]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
    },
    [handleFiles]
  );

  const openPicker = useCallback(() => inputRef.current?.click(), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPicker();
      }
    },
    [openPicker]
  );

  const removeAt = useCallback(
    (idx: number) => {
      setSelected(prev => {
        const next = prev.filter((_, i) => i !== idx);
        const head = next[0] ?? null;
        onChange?.(head);
        if (multiple) onFilesSelect?.(next);
        return next;
      });
      if (inputRef.current) inputRef.current.value = '';
    },
    [multiple, onChange, onFilesSelect]
  );

  useEffect(() => {
    if (!pasteEnabled) return;
    const node = containerRef.current;
    if (!node) return;
    const onPaste = (e: ClipboardEvent) => {
      if (!e.clipboardData?.files?.length) return;
      e.preventDefault();
      handleFiles(e.clipboardData.files);
    };
    node.addEventListener('paste', onPaste as EventListener);
    return () => node.removeEventListener('paste', onPaste as EventListener);
  }, [handleFiles, pasteEnabled]);

  const dropZoneClass = isDragging
    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
    : selected.length > 0
      ? 'border-green-400 bg-green-50/50 dark:bg-green-900/10'
      : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800';

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <div
        ref={containerRef}
        role="button"
        tabIndex={0}
        aria-label={title}
        onClick={openPicker}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${dropZoneClass}`}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={acceptToString(accept)}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-3">
          <div
            className={`p-3 rounded-full ${
              isDragging ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            <UploadCloud
              className={`w-8 h-8 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
            />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">{title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            {(accept || maxSizeMB) && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                {accept ? acceptToString(accept) : ''}
                {accept && maxSizeMB ? ' · ' : ''}
                {maxSizeMB ? `max ${maxSizeMB} MB` : ''}
                {pasteEnabled ? ' · paste with Ctrl/Cmd+V' : ''}
              </p>
            )}
          </div>
        </div>
      </div>

      {showSelected && selected.length > 0 && (
        <ul className="space-y-1">
          {selected.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileIcon className="w-4 h-4 shrink-0 text-green-500" />
                <span className="truncate text-sm text-gray-800 dark:text-gray-100">{f.name}</span>
                <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">
                  {formatBytes(f.size)}
                </span>
              </div>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  removeAt(i);
                }}
                aria-label={`Remove ${f.name}`}
                className="shrink-0 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-300" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;

'use client';

import React, { useCallback, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    accept?: string;
    title?: string;
    description?: string;
    className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    onFileSelect,
    accept,
    title = 'Drag & drop your file here',
    description = 'or click to browse',
    className = '',
}) => {
    const [isDragging, setIsDragging] = useState(false);

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
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                onFileSelect(e.dataTransfer.files[0]);
            }
        },
        [onFileSelect],
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                onFileSelect(e.target.files[0]);
            }
        },
        [onFileSelect],
    );

    return (
        <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
        ${isDragging
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                } ${className}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload-input')?.click()}
        >
            <input
                id="file-upload-input"
                type="file"
                accept={accept}
                onChange={handleChange}
                className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
                <div className={`p-3 rounded-full ${isDragging ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                    <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                </div>
                <div>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                        {title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;

'use client';

import React, { useState } from 'react';
import { ToolDetails } from '@/types';
import ToolContainer from './ToolContainer';
import MonacoLiteEditor from '@/components/MonacoLiteEditor';
import FileUpload from '@/components/ui/FileUpload';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { Upload, FileText, Trash2 } from 'lucide-react';

export interface EditorInputConfig {
  value: string;
  onChange: (val: string) => void;
  language: string;
  label?: string;
  copy?: boolean;
  fileUpload?: boolean;
  acceptFileTypes?: string;
  placeholder?: string;
  clearable?: boolean;
}

export interface EditorOutputConfig {
  value: string;
  language: string;
  label?: string;
  copy?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

interface ConverterLayoutProps {
  details: ToolDetails;
  toolId?: string;
  title: string;
  inputComponent?: React.ReactNode;
  outputComponent?: React.ReactNode;
  actions: React.ReactNode;
  options?: React.ReactNode;
  editorInput?: EditorInputConfig;
  editorOutput?: EditorOutputConfig;
}

/**
 * A specialized layout for converter tools (Input -> Actions -> Output)
 * Matches the "JSON Formatter" style reference.
 * Supports passing `editorInput` and `editorOutput` configuration objects for standard
 * MonacoLiteEditor usage, avoiding boilerplate in individual tools.
 */
const ConverterLayout: React.FC<ConverterLayoutProps> = ({
  details,
  toolId,
  title,
  inputComponent,
  outputComponent,
  actions,
  options,
  editorInput,
  editorOutput,
}) => {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      } else {
        setShowScrollHint(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result;
      if (typeof text === 'string' && editorInput?.onChange) {
        editorInput.onChange(text);
        setInputMode('text');
      }
    };
    reader.readAsText(file);
  };

  const renderInputSection = () => {
    if (editorInput) {
      return (
        <div className="h-full flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <Label>{editorInput.label || 'Input'}</Label>
            <div className="flex gap-1">
              {editorInput.fileUpload && (
                <>
                  <Button
                    variant={inputMode === 'text' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setInputMode('text')}
                    title="Paste Text"
                    className="!p-0 w-8 h-8 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={inputMode === 'file' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setInputMode('file')}
                    title="Upload File"
                    className="!p-0 w-8 h-8 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                </>
              )}
              {editorInput.clearable && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (editorInput.onChange) editorInput.onChange('');
                    setInputMode('text');
                  }}
                  title="Clear Input"
                  className="!p-0 w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="relative flex-1 group">
            {inputMode === 'file' && editorInput.fileUpload ? (
              <FileUpload onFileSelect={handleFileUpload} className="h-full" accept={editorInput.acceptFileTypes} />
            ) : (
              <>
                <MonacoLiteEditor
                  language={editorInput.language}
                  value={editorInput.value}
                  onChange={val => editorInput.onChange(val || '')}
                  placeholder={editorInput.placeholder}
                  className="h-full border border-border rounded-md overflow-hidden"
                />
                {!editorInput.fileUpload && editorInput.copy !== false && editorInput.value && (
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CopyButton textToCopy={editorInput.value} className="bg-background/80 backdrop-blur-sm border shadow-sm" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      );
    }
    return inputComponent;
  };

  const renderOutputSection = () => {
    if (editorOutput) {
      return (
        <div className="h-full flex flex-col space-y-2">
          <Label>{editorOutput.label || 'Output'}</Label>
          <div className="relative flex-1 group">
            <MonacoLiteEditor
              language={editorOutput.language}
              value={editorOutput.value}
              readOnly={editorOutput.readOnly !== false}
              placeholder={editorOutput.placeholder}
              className="h-full border border-border rounded-md overflow-hidden"
            />
            {editorOutput.copy !== false && editorOutput.value && (
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton textToCopy={editorOutput.value} className="bg-background/80 backdrop-blur-sm border shadow-sm" />
              </div>
            )}
          </div>
        </div>
      );
    }
    return outputComponent;
  };

  return (
    <ToolContainer
      title={title}
      details={details}
      toolId={toolId}
      headerContent={options}
      variant="transparent"
    >
      <div className="flex flex-col h-[calc(100vh-150px)] min-h-[500px]">
        {/* Main 3-Column Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 overflow-hidden">
          {/* Left Column: Input */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex-1 relative">{renderInputSection()}</div>
          </div>

          {/* Middle Column: Actions */}
          {actions && (
            <div className="flex lg:flex-col items-center justify-center gap-4 py-2 lg:py-0 w-full lg:w-40">
              {actions}
            </div>
          )}

          {/* Right Column: Output */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex-1 relative">{renderOutputSection()}</div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div
          className={`text-center mt-4 text-gray-400 transition-opacity duration-500 ${showScrollHint ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="animate-bounce cursor-pointer flex flex-col items-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7-7-7"
              />
            </svg>
            <span className="text-xs mt-1">Scroll for details</span>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default ConverterLayout;

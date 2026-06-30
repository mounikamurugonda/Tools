'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import { DiffEditor, useMonaco } from '@monaco-editor/react';
import type { editor as MonacoEditor } from 'monaco-editor';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/components/ui/ToastProvider';
import {
  Upload,
  ArrowRightLeft,
  Trash2,
  Columns,
  Rows,
  WrapText,
  Type,
  Copy,
  ArrowDownToLine,
  FoldVertical,
} from 'lucide-react';
import { AIActionButton } from '@/components/AIActionButton';
import { explainDiff } from '@/lib/sarvamAI';

const MAX_FILE_MB = 10;

const LANGUAGES = [
  'plaintext',
  'json',
  'javascript',
  'typescript',
  'html',
  'css',
  'python',
  'sql',
  'yaml',
  'xml',
  'markdown',
  'java',
  'go',
  'rust',
  'shell',
] as const;
type DiffLanguage = (typeof LANGUAGES)[number];

interface DiffStats {
  added: number;
  removed: number;
  changes: number;
}

const DiffChecker: React.FC<ToolProps> = ({ details, toolId }) => {
  const { theme } = useTheme();
  const monaco = useMonaco();
  const diffEditorRef = useRef<MonacoEditor.IStandaloneDiffEditor | null>(null);
  const toast = useToast();

  const [originalText, setOriginalText] = useState('');
  const [modifiedText, setModifiedText] = useState('');

  const [renderSideBySide, setRenderSideBySide] = useState(true);
  const [ignoreTrimWhitespace, setIgnoreTrimWhitespace] = useState(false);
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('on');
  const [language, setLanguage] = useState<DiffLanguage>('plaintext');
  const [hideUnchanged, setHideUnchanged] = useState(false);
  const [stats, setStats] = useState<DiffStats>({ added: 0, removed: 0, changes: 0 });

  useEffect(() => {
    if (monaco) {
      monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'light');
    }
  }, [theme, monaco]);

  const recomputeStats = useCallback((diffEditor: MonacoEditor.IStandaloneDiffEditor) => {
    const changes = diffEditor.getLineChanges();
    if (!changes) {
      setStats({ added: 0, removed: 0, changes: 0 });
      return;
    }
    let added = 0;
    let removed = 0;
    for (const c of changes) {
      if (c.modifiedEndLineNumber >= c.modifiedStartLineNumber) {
        added += c.modifiedEndLineNumber - c.modifiedStartLineNumber + 1;
      }
      if (c.originalEndLineNumber >= c.originalStartLineNumber) {
        removed += c.originalEndLineNumber - c.originalStartLineNumber + 1;
      }
    }
    setStats({ added, removed, changes: changes.length });
  }, []);

  const handleEditorDidMount = (
    editor: MonacoEditor.IStandaloneDiffEditor,
    monacoNs: typeof import('monaco-editor')
  ) => {
    diffEditorRef.current = editor;

    editor.getOriginalEditor().addCommand(
      monacoNs.KeyMod.CtrlCmd | monacoNs.KeyCode.Space,
      () => undefined
    );
    editor.getModifiedEditor().addCommand(
      monacoNs.KeyMod.CtrlCmd | monacoNs.KeyCode.Space,
      () => undefined
    );

    editor.onDidUpdateDiff(() => recomputeStats(editor));
    recomputeStats(editor);
  };

  const syncEditorState = useCallback((): { original: string; modified: string } => {
    if (diffEditorRef.current) {
      const currentOriginal = diffEditorRef.current.getOriginalEditor().getValue();
      const currentModified = diffEditorRef.current.getModifiedEditor().getValue();
      setOriginalText(currentOriginal);
      setModifiedText(currentModified);
      return { original: currentOriginal, modified: currentModified };
    }
    return { original: originalText, modified: modifiedText };
  }, [originalText, modifiedText]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isOriginal: boolean) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(`File too large (max ${MAX_FILE_MB}MB)`);
      return;
    }

    const { original, modified } = syncEditorState();

    const reader = new FileReader();
    reader.onload = event => {
      const text = (event.target?.result as string) ?? '';
      if (isOriginal) {
        setOriginalText(text);
        setModifiedText(modified);
      } else {
        setModifiedText(text);
        setOriginalText(original);
      }
      toast.success(`Loaded ${file.name}`);
    };
    reader.onerror = () => toast.error('Failed to read file');
    reader.readAsText(file);
  };

  const swapContent = () => {
    const { original, modified } = syncEditorState();
    if (!original && !modified) return;
    setOriginalText(modified);
    setModifiedText(original);
    toast.info('Swapped panes');
  };

  const clearAll = () => {
    const { original, modified } = syncEditorState();
    if (!original && !modified) return;
    setOriginalText('');
    setModifiedText('');
    toast.info('Cleared both panes');
  };

  const copyPane = async (isOriginal: boolean) => {
    const { original, modified } = syncEditorState();
    const text = isOriginal ? original : modified;
    if (!text) {
      toast.info('Nothing to copy');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Copy failed');
    }
  };

  const downloadPane = (isOriginal: boolean) => {
    const { original, modified } = syncEditorState();
    const text = isOriginal ? original : modified;
    if (!text) {
      toast.info('Nothing to download');
      return;
    }
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isOriginal ? 'original.txt' : 'modified.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const pillGroup =
    'inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-white dark:bg-gray-900';
  const pillActive = 'bg-blue-600 text-white';
  const pillIdle = 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800';
  const pillBase = 'inline-flex items-center justify-center w-8 h-7 rounded-md text-xs transition-colors';

  const headerOptions = (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap items-center gap-2 flex-1">
        <div className={pillGroup} role="group" aria-label="View mode">
          <button
            type="button"
            onClick={() => {
              syncEditorState();
              setRenderSideBySide(true);
            }}
            aria-pressed={renderSideBySide}
            className={`${pillBase} ${renderSideBySide ? pillActive : pillIdle}`}
            title="Split view"
          >
            <Columns className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              syncEditorState();
              setRenderSideBySide(false);
            }}
            aria-pressed={!renderSideBySide}
            className={`${pillBase} ${!renderSideBySide ? pillActive : pillIdle}`}
            title="Inline view"
          >
            <Rows className="w-4 h-4" />
          </button>
        </div>

        <div className={pillGroup} role="group" aria-label="Editor options">
          <button
            type="button"
            onClick={() => {
              syncEditorState();
              setWordWrap(prev => (prev === 'on' ? 'off' : 'on'));
            }}
            aria-pressed={wordWrap === 'on'}
            className={`${pillBase} ${wordWrap === 'on' ? pillActive : pillIdle}`}
            title="Word wrap"
          >
            <WrapText className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              syncEditorState();
              setIgnoreTrimWhitespace(prev => !prev);
            }}
            aria-pressed={ignoreTrimWhitespace}
            className={`${pillBase} ${ignoreTrimWhitespace ? pillActive : pillIdle}`}
            title="Ignore leading/trailing whitespace"
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              syncEditorState();
              setHideUnchanged(prev => !prev);
            }}
            aria-pressed={hideUnchanged}
            className={`${pillBase} ${hideUnchanged ? pillActive : pillIdle}`}
            title="Collapse unchanged regions"
          >
            <FoldVertical className="w-4 h-4" />
          </button>
        </div>

        <select
          value={language}
          onChange={e => {
            syncEditorState();
            setLanguage(e.target.value as DiffLanguage);
          }}
          aria-label="Syntax highlighting language"
          title="Syntax highlighting"
          className="h-8 px-2 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
        >
          {LANGUAGES.map(l => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <div
          className="ml-1 inline-flex items-center gap-2 text-xs font-mono tabular-nums"
          aria-live="polite"
        >
          <span className="text-green-700 dark:text-green-400" title="Lines added">
            +{stats.added}
          </span>
          <span className="text-red-700 dark:text-red-400" title="Lines removed">
            -{stats.removed}
          </span>
          <span className="text-gray-500 dark:text-gray-400" title="Change blocks">
            ({stats.changes} {stats.changes === 1 ? 'block' : 'blocks'})
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={swapContent}
          className="inline-flex items-center gap-1.5 h-8 px-2.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          title="Swap original and modified"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          Swap
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center gap-1.5 h-8 px-2.5 text-xs rounded-md border border-red-200 dark:border-red-900/60 bg-white dark:bg-gray-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          title="Clear both panes"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear
        </button>
      </div>
    </div>
  );

  const paneActions = (isOriginal: boolean) => (
    <div className="flex items-center gap-1">
      <label
        className="cursor-pointer inline-flex items-center justify-center w-7 h-7 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        title={`Upload ${isOriginal ? 'original' : 'modified'} (max ${MAX_FILE_MB}MB)`}
      >
        <Upload className="w-3.5 h-3.5" />
        <input
          type="file"
          accept=".txt,.md,.json,.csv,.xml,.html,.css,.js,.ts,.tsx,.jsx,.py,.rb,.go,.rs,.java,.sql,.yml,.yaml,text/*"
          className="hidden"
          onChange={e => handleFileUpload(e, isOriginal)}
        />
      </label>
      <button
        type="button"
        onClick={() => copyPane(isOriginal)}
        className="inline-flex items-center justify-center w-7 h-7 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        title="Copy pane content"
      >
        <Copy className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => downloadPane(isOriginal)}
        className="inline-flex items-center justify-center w-7 h-7 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        title="Download as .txt"
      >
        <ArrowDownToLine className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  return (
    <ToolContainer
      title="Diff Checker"
      details={details}
      toolId={toolId}
      headerContent={headerOptions}
      variant="transparent"
    >
      <div className="h-[calc(100vh-260px)] min-h-[420px] flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 h-10 divide-x divide-gray-200 dark:divide-gray-700">
          {renderSideBySide ? (
            <>
              <div className="flex-1 flex justify-between items-center px-3">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Original
                </span>
                {paneActions(true)}
              </div>
              <div className="flex-1 flex justify-between items-center px-3">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Modified
                </span>
                {paneActions(false)}
              </div>
            </>
          ) : (
            <div className="flex-1 flex justify-between items-center px-3">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Inline diff
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] uppercase text-gray-400">Original</span>
                  {paneActions(true)}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] uppercase text-gray-400">Modified</span>
                  {paneActions(false)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 relative">
          <DiffEditor
            height="100%"
            language={language}
            original={originalText}
            modified={modifiedText}
            onMount={handleEditorDidMount}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            loading={
              <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                Loading diff editor…
              </div>
            }
            options={{
              renderSideBySide,
              originalEditable: true,
              readOnly: false,
              wordWrap,
              ignoreTrimWhitespace,
              hideUnchangedRegions: { enabled: hideUnchanged },
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              fontFamily: '"Geist Mono", monospace',
              fontSize: 13,
              diffWordWrap: 'on',
              padding: { top: 16 },
              quickSuggestions: { other: false, comments: false, strings: false },
              parameterHints: { enabled: false },
              suggestOnTriggerCharacters: false,
              autoIndent: 'none',
              formatOnType: false,
              formatOnPaste: false,
              matchBrackets: 'never',
              autoClosingBrackets: 'never',
            }}
          />
        </div>
      </div>

      {/* AI: Explain Changes */}
      <div className="mt-4 px-4 pb-4">
        <div className="bg-white dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            AI Analysis
          </p>
          <AIActionButton
            label="Explain Changes"
            actionName="explain diff changes"
            onAction={() => {
              const { original, modified } = syncEditorState();
              return explainDiff(original, modified);
            }}
            hint="AI will describe what changed between the two versions"
          />
        </div>
      </div>
    </ToolContainer>
  );
};

export default DiffChecker;

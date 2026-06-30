import React, { useState, useCallback } from 'react';
import { Code, FileCode, FileJson } from 'lucide-react';
import CodeEditor from './CodeEditor';
import { AppConfig, CodeSnippet } from '../types';

// Check if utils exists, if not use local utility or standard string concatenation.
// Re-reading file list: utils dir exists. 'utils/sound' is there. 'types.ts' exists.

interface TypeTabEditorProps {
  /** The current code snippets for all tabs */
  code: CodeSnippet;
  /** App configuration for theming etc */
  config: AppConfig;
  /** Callback when code changes in the active tab */
  onChange: (newCode: CodeSnippet) => void;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Optional class name for the container */
  className?: string;
  /** Current active tab (controlled) - optional, if internal state is preferred we can switch */
  activeTab?: 'html' | 'css' | 'js';
  /** Callback for tab change */
  onTabChange?: (tab: 'html' | 'css' | 'js') => void;
}

type TabType = 'html' | 'css' | 'js';

const TABS: { id: TabType; label: string; icon: React.FC<any>; color: string }[] = [
  { id: 'html', label: 'HTML', icon: Code, color: 'text-orange-500' },
  { id: 'css', label: 'CSS', icon: FileCode, color: 'text-blue-500' },
  { id: 'js', label: 'JS', icon: FileJson, color: 'text-yellow-500' },
];

export const TypeTabEditor: React.FC<TypeTabEditorProps> = ({
  code,
  config,
  onChange,
  readOnly = false,
  className,
  activeTab: controlledTab,
  onTabChange,
}) => {
  const [internalTab, setInternalTab] = useState<TabType>('html');

  const activeTab = controlledTab ?? internalTab;

  const handleTabChange = useCallback(
    (tab: TabType) => {
      if (onTabChange) {
        onTabChange(tab);
      } else {
        setInternalTab(tab);
      }
    },
    [onTabChange]
  );

  const handleCodeChange = useCallback(
    (newContent: string) => {
      onChange({
        ...code,
        [activeTab]: newContent,
      });
    },
    [activeTab, code, onChange]
  );

  const isLight =
    config.theme === 'light' || config.theme === 'github' || config.theme === 'solarized-light';

  // Get the language for Monaco based on active tab
  const getLanguage = (): string => {
    if (activeTab === 'js') return 'javascript';
    return activeTab;
  };

  return (
    <div
      className={`flex flex-col w-full h-full overflow-hidden rounded-xl transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-[#1e1e1e]'
        } ${className || ''}`}
    >
      {/* Tab Bar */}
      <div
        className={`flex items-center px-2 h-10 border-b shrink-0 ${isLight ? 'bg-gray-50/50 border-gray-200' : 'bg-[#252525] border-white/5'
          }`}
      >
        <div className="flex items-center gap-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                  ${isActive
                    ? isLight
                      ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                      : 'bg-white/10 text-white shadow-sm ring-1 ring-white/10'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5'
                  }
                `}
              >
                <Icon size={14} className={isActive ? tab.color : 'currentColor'} />
                {tab.label}
              </button>
            );
          })}
        </div>


      </div>

      {/* Editor Area - Single editor instance with dynamic language */}
      <div className="flex-1 relative min-h-0 h-full">
        <CodeEditor
          code={code[activeTab]}
          language={getLanguage()}
          config={config}
          onChange={handleCodeChange}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

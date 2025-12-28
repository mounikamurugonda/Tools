'use client';

import React from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import { MousePointer2 } from 'lucide-react';

const CURSORS = [
  'alias',
  'all-scroll',
  'auto',
  'cell',
  'col-resize',
  'context-menu',
  'copy',
  'crosshair',
  'default',
  'e-resize',
  'ew-resize',
  'grab',
  'grabbing',
  'help',
  'move',
  'n-resize',
  'ne-resize',
  'nesw-resize',
  'no-drop',
  'none',
  'not-allowed',
  'ns-resize',
  'nw-resize',
  'nwse-resize',
  'pointer',
  'progress',
  'row-resize',
  's-resize',
  'se-resize',
  'sw-resize',
  'text',
  'vertical-text',
  'w-resize',
  'wait',
  'zoom-in',
  'zoom-out',
];

const CssCursors: React.FC<ToolProps> = ({ details, toolId }) => {
  const copyToClipboard = (cursor: string) => {
    navigator.clipboard.writeText(`cursor: ${cursor};`);
    // Ideally show a toast here, but for now just copy
  };

  return (
    <ToolContainer title="CSS Cursor Viewer" details={details} toolId={toolId}>
      <Card>
        <div className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
          <MousePointer2 className="w-5 h-5 text-blue-500" />
          <p>Hover over any box to see the cursor in action. Click to copy the CSS value.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {CURSORS.map(cursor => (
            <div
              key={cursor}
              className="aspect-square bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all cursor-pointer group relative"
              style={{ cursor: cursor }}
              onClick={() => copyToClipboard(cursor)}
              title="Click to copy"
            >
              <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cursor}
              </span>
              <span className="absolute bottom-3 opacity-0 group-hover:opacity-100 text-[10px] uppercase tracking-wider font-semibold text-blue-500 transition-opacity">
                Copy
              </span>
            </div>
          ))}
        </div>
      </Card>
    </ToolContainer>
  );
};

export default CssCursors;

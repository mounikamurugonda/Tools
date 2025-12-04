
'use client';

import React from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const CURSORS = [
    'alias', 'all-scroll', 'auto', 'cell', 'col-resize', 'context-menu', 'copy', 'crosshair', 'default', 
    'e-resize', 'ew-resize', 'grab', 'grabbing', 'help', 'move', 'n-resize', 'ne-resize', 'nesw-resize', 
    'no-drop', 'none', 'not-allowed', 'ns-resize', 'nw-resize', 'nwse-resize', 'pointer', 'progress', 
    'row-resize', 's-resize', 'se-resize', 'sw-resize', 'text', 'vertical-text', 'w-resize', 'wait', 
    'zoom-in', 'zoom-out'
];

const CssCursors: React.FC<ToolProps> = ({ details, toolId }) => {
  return (
    <ToolContainer title="CSS Cursor Viewer" details={details} toolId={toolId}>
      <p className="mb-6 text-gray-600 dark:text-gray-400">Hover over any box to see the cursor in action. Click to copy the CSS value.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {CURSORS.map(cursor => (
            <div 
                key={cursor} 
                className="aspect-square bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group relative"
                style={{ cursor: cursor }}
                onClick={() => navigator.clipboard.writeText(`cursor: ${cursor};`)}
                title="Click to copy"
            >
                <span className="font-mono text-sm">{cursor}</span>
                <span className="absolute bottom-2 opacity-0 group-hover:opacity-100 text-[10px] text-blue-500">Click to copy</span>
            </div>
        ))}
      </div>
    </ToolContainer>
  );
};

export default CssCursors;

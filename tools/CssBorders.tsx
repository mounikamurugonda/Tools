
'use client';

import React from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const BORDERS = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden'];

const CssBorders: React.FC<ToolProps> = ({ details, toolId }) => {
  return (
    <ToolContainer title="CSS Border Preview" details={details} toolId={toolId}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {BORDERS.map(style => (
            <div 
                key={style} 
                className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                style={{ border: `4px ${style} #3b82f6` }}
                onClick={() => navigator.clipboard.writeText(`border: 1px ${style} black;`)}
                title="Click to copy CSS"
            >
                <span className="font-mono font-semibold">{style}</span>
            </div>
        ))}
      </div>
    </ToolContainer>
  );
};

export default CssBorders;

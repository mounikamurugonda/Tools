'use client';

import React from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';

const BORDERS = [
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
  'none',
  'hidden',
];

const CssBorders: React.FC<ToolProps> = ({ details, toolId }) => {
  return (
    <ToolContainer title="CSS Border Preview" details={details} toolId={toolId}>
      <Card>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BORDERS.map((style) => (
            <div
              key={style}
              className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center p-4 hover:bg-white dark:hover:bg-gray-700 transition-all cursor-pointer hover:shadow-lg active:scale-95 border-gray-200 dark:border-gray-700"
              style={{ border: `4px ${style} var(--primary, #3b82f6)` }}
              onClick={() =>
                navigator.clipboard.writeText(`border: 1px ${style} black;`)
              }
              title="Click to copy CSS"
            >
              <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">{style}</span>
            </div>
          ))}
        </div>
      </Card>
    </ToolContainer>
  );
};

export default CssBorders;

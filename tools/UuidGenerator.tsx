
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const UuidGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [uuid, setUuid] = useState('');

  const generateUuid = () => {
    setUuid(crypto.randomUUID());
  };

  return (
    <ToolContainer title="UUID Generator (v4)" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button onClick={generateUuid} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Generate UUID</button>
        </div>
        {uuid && (
          <div className="relative">
            <input
              readOnly
              value={uuid}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-3 text-gray-800 dark:text-gray-200 font-mono text-lg"
            />
            <CopyButton textToCopy={uuid} className="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </div>
        )}
      </div>
    </ToolContainer>
  );
};

export default UuidGenerator;

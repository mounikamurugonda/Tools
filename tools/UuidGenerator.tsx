'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const UuidGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [uuid, setUuid] = useState('');

  const generateUuid = () => {
    setUuid(crypto.randomUUID());
  };

  return (
    <ToolContainer
      title="UUID Generator (v4)"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button onClick={generateUuid}>Generate UUID</Button>
        </div>
        {uuid && (
          <div className="relative">
            <Input
              readOnly
              value={uuid}
              className="font-mono text-lg pr-16"
            />
            <CopyButton
              textToCopy={uuid}
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
            />
          </div>
        )}
      </div>
    </ToolContainer>
  );
};

export default UuidGenerator;

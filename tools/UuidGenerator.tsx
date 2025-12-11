'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';

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
      <Card className="max-w-xl mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <Label>Generate New UUID</Label>
          <div className="flex gap-4">
            <Button onClick={generateUuid} className="w-full">Generate</Button>
          </div>
        </div>

        {uuid && (
          <div className="space-y-2">
            <Label>Generated UUID</Label>
            <div className="relative">
              <Input
                readOnly
                value={uuid}
                className="font-mono text-lg pr-16 bg-secondary/20"
              />
              <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                <CopyButton textToCopy={uuid} />
              </div>
            </div>
          </div>
        )}
      </Card>
    </ToolContainer>
  );
};

export default UuidGenerator;

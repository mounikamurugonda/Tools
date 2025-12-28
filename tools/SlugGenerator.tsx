'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { ArrowDown } from 'lucide-react';

const SlugGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('');

  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return (
    <ToolContainer title="Slug Generator" details={details} toolId={toolId}>
      <Card className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <Label>String to Slugify</Label>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Hello World! This is a Title."
            autoFocus
          />
        </div>

        <div className="flex justify-center text-gray-400">
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </div>

        <div className="space-y-2">
          <Label>Generated Slug</Label>
          <div className="relative">
            <Input
              readOnly
              value={slug}
              className="bg-gray-50 dark:bg-gray-900 font-mono text-blue-600 dark:text-blue-400 pr-12"
              placeholder="hello-world-this-is-a-title"
            />
            {slug && (
              <div className="absolute top-1/2 -translate-y-1/2 right-2">
                <CopyButton textToCopy={slug} />
              </div>
            )}
          </div>
        </div>
      </Card>
    </ToolContainer>
  );
};

export default SlugGenerator;

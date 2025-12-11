'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import CopyButton from '@/components/CopyButton';
import { Eraser, AlignJustify, Type, ArrowRightLeft } from 'lucide-react';

const TextCleaner: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('  This   is  a   messy\n\ntext file.  ');

  const clean = () => {
    let res = text;
    res = res.replace(/\s+/g, ' '); // Extra spaces
    res = res.trim();
    setText(res);
  };

  const removeLines = () => {
    setText(text.replace(/(\r\n|\n|\r)/gm, ' '));
  };

  return (
    <ToolContainer title="Text Cleaner" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Cleaning Actions">
          <div className="flex flex-wrap gap-3">
            <Button onClick={clean} variant="outline" className="flex items-center gap-2">
              <Eraser className="w-4 h-4" /> Remove Extra Spaces
            </Button>
            <Button onClick={removeLines} variant="outline" className="flex items-center gap-2">
              <AlignJustify className="w-4 h-4" /> Remove Line Breaks
            </Button>
            <Button onClick={() => setText(text.toUpperCase())} variant="outline" className="flex items-center gap-2">
              <Type className="w-4 h-4" /> UPPERCASE
            </Button>
            <Button onClick={() => setText(text.toLowerCase())} variant="outline" className="flex items-center gap-2">
              <Type className="w-4 h-4 lowercase" /> lowercase
            </Button>
          </div>
        </Card>

        <div className="relative space-y-2">
          <Label>Text Content</Label>
          <div className="relative">
            <TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="h-[500px]"
              placeholder="Paste or type text here..."
            />
            {text && (
              <div className="absolute top-2 right-2">
                <CopyButton textToCopy={text} />
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default TextCleaner;

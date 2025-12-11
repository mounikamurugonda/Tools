'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';

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
        <div className="flex flex-wrap gap-3">
          <Button onClick={clean}>Remove Extra Spaces</Button>
          <Button onClick={removeLines} variant="secondary">Remove Line Breaks</Button>
          <Button onClick={() => setText(text.toUpperCase())} variant="ghost">UPPERCASE</Button>
          <Button onClick={() => setText(text.toLowerCase())} variant="ghost">lowercase</Button>
        </div>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-96"
        />
      </div>
    </ToolContainer>
  );
};

export default TextCleaner;

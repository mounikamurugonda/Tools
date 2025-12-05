'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const HtmlEntity: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('<h1>Hello & Welcome</h1>');
  const [output, setOutput] = useState('');

  const encode = () => {
    setOutput(
      input.replace(/[\u00A0-\u9999<>&]/g, (i) => '&#' + i.charCodeAt(0) + ';'),
    );
  };

  const decode = () => {
    const txt = document.createElement('textarea');
    txt.innerHTML = input;
    setOutput(txt.value);
  };

  return (
    <ToolContainer
      title="HTML Entity Encoder/Decoder"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 brand-input"
          placeholder="Input text..."
        />
        <div className="flex gap-4">
          <button
            onClick={encode}
            className="flex-1 py-2 bg-blue-600 text-white rounded"
          >
            Encode
          </button>
          <button
            onClick={decode}
            className="flex-1 py-2 bg-green-600 text-white rounded"
          >
            Decode
          </button>
        </div>
        <div className="relative">
          <textarea
            readOnly
            value={output}
            className="w-full h-40 brand-input bg-gray-50 dark:bg-gray-900"
            placeholder="Output..."
          />
          <CopyButton textToCopy={output} className="absolute top-2 right-2" />
        </div>
      </div>
    </ToolContainer>
  );
};

export default HtmlEntity;

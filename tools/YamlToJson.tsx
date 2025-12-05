'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const YamlToJson: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('name: John\nage: 30');
  const [output, setOutput] = useState('');

  const convert = () => {
    // Basic parser for simple YAML (key: value)
    // For full support, a library like js-yaml is needed
    try {
      const lines = input.split('\n');
      const obj: any = {};
      lines.forEach((line) => {
        const [key, ...val] = line.split(':');
        if (key && val) obj[key.trim()] = val.join(':').trim();
      });
      setOutput(JSON.stringify(obj, null, 2));
    } catch (e) {
      setOutput(
        'Error: Complex YAML requires a library not present in this demo.',
      );
    }
  };

  return (
    <ToolContainer
      title="YAML to JSON (Simple)"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-64 brand-input"
          placeholder="YAML..."
        />
        <div className="relative">
          <textarea
            readOnly
            value={output}
            className="h-64 brand-input bg-gray-50 dark:bg-gray-900"
            placeholder="JSON..."
          />
          {output && (
            <CopyButton
              textToCopy={output}
              className="absolute top-2 right-2"
            />
          )}
        </div>
      </div>
      <button
        onClick={convert}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
      >
        Convert
      </button>
    </ToolContainer>
  );
};

export default YamlToJson;

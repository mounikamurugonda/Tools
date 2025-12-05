'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const JsonToYaml: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('{"name": "John", "age": 30}');
  const [output, setOutput] = useState('');

  const convert = () => {
    try {
      const obj = JSON.parse(input);
      const yaml = Object.entries(obj)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      setOutput(yaml);
    } catch (e) {
      setOutput('Invalid JSON');
    }
  };

  return (
    <ToolContainer
      title="JSON to YAML (Simple)"
      details={details}
      toolId={toolId}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-64 brand-input"
          placeholder="JSON..."
        />
        <div className="relative">
          <textarea
            readOnly
            value={output}
            className="h-64 brand-input bg-gray-50 dark:bg-gray-900"
            placeholder="YAML..."
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

export default JsonToYaml;

'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const JsonToTypescript: React.FC<ToolProps> = ({ details, toolId }) => {
  const [jsonInput, setJsonInput] = useState(
    '{\n  "id": 1,\n  "name": "UtilToolkits",\n  "features": ["Free", "Fast"],\n  "active": true\n}',
  );
  const [tsOutput, setTsOutput] = useState('');
  const [interfaceName, setInterfaceName] = useState('RootObject');
  const [error, setError] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  // Helper functions moved inside but could be outside if pure.
  // Keeping them pure and synchronous for simplicity, but we will wrap execution.
  const getType = (value: any): string => {
    if (value === null) return 'any';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      const type = getType(value[0]);
      return `${type}[]`;
    }
    if (typeof value === 'object') return 'object';
    return typeof value;
  };

  const generateInterface = (obj: any, name: string): string => {
    let output = `export interface ${name} {\n`;
    const nestedInterfaces: string[] = [];

    Object.entries(obj).forEach(([key, value]) => {
      let type = getType(value);

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const nestedName = key.charAt(0).toUpperCase() + key.slice(1);
        type = nestedName;
        nestedInterfaces.push(generateInterface(value, nestedName));
      } else if (
        Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === 'object'
      ) {
        const nestedName = key.charAt(0).toUpperCase() + key.slice(1) + 'Item';
        type = `${nestedName}[]`;
        nestedInterfaces.push(generateInterface(value[0], nestedName));
      }

      output += `  ${key}: ${type};\n`;
    });

    output += '}\n';
    return nestedInterfaces.join('\n') + '\n' + output;
  };

  const handleConvert = async () => {
    setError('');
    setIsConverting(true);

    // Use setTimeout to allow the UI to show the loading state before blocking
    setTimeout(() => {
      try {
        if (!jsonInput.trim()) {
          setTsOutput('');
          setIsConverting(false);
          return;
        }
        const parsed = JSON.parse(jsonInput);
        const result = generateInterface(parsed, interfaceName);
        setTsOutput(result.trim());
      } catch (e) {
        setError('Invalid JSON input');
        setTsOutput('');
      } finally {
        setIsConverting(false);
      }
    }, 10);
  };

  return (
    <ToolContainer title="JSON to TypeScript" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div className="flex gap-4 items-end">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Root Interface Name
            </label>
            <input
              type="text"
              value={interfaceName}
              onChange={(e) => setInterfaceName(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2"
            />
          </div>
          <button
            onClick={handleConvert}
            disabled={isConverting}
            className={`px-6 py-2 rounded font-medium h-10 text-white transition-colors ${isConverting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isConverting ? 'Processing...' : 'Convert'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 h-[50vh]">
          <div className="relative flex flex-col">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              JSON Input
            </label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="flex-grow w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste JSON here..."
            />
          </div>
          <div className="relative flex flex-col">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              TypeScript Output
            </label>
            <div className="relative flex-grow">
              <textarea
                readOnly
                value={tsOutput}
                className="w-full h-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-3 font-mono text-sm resize-none text-blue-600 dark:text-blue-400"
                placeholder="TypeScript interfaces will appear here..."
              />
              {tsOutput && (
                <CopyButton
                  textToCopy={tsOutput}
                  className="absolute top-2 right-2"
                />
              )}
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </ToolContainer>
  );
};

export default JsonToTypescript;

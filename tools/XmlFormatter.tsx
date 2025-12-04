
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const XmlFormatter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState('<root><child id="1">Hello</child><child id="2">World</child></root>');
  const [output, setOutput] = useState('');

  const formatXml = () => {
    let formatted = '';
    let pad = 0;
    const xml = input.replace(/>\s*</g, '><'); // Remove existing whitespace between tags
    
    xml.split(/(<[^>]+>)/).forEach(node => {
        if (!node) return;
        let indent = 0;
        if (node.match(/^<\w/) && !node.match(/<.*\/>/)) { // Start tag
            indent = 1;
        } else if (node.match(/^<\/\w/)) { // End tag
            if (pad !== 0) pad -= 1;
        } else if (node.match(/^<\w[^>]*\/>/)) { // Self closing
            indent = 0;
        } else if (node.match(/^<\?|<!/)) { // Declarations
            indent = 0;
        } else { // Text node
            indent = 0;
        }

        const padding = new Array(pad * 2).fill(' ').join('');
        formatted += padding + node + '\n';
        pad += indent;
    });
    
    setOutput(formatted.trim());
  };

  return (
    <ToolContainer title="XML Formatter" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4 h-[60vh]">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-3 font-mono text-sm resize-none"
                placeholder="Paste XML here..."
            />
            <div className="relative h-full">
                <textarea
                    readOnly
                    value={output}
                    className="w-full h-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-3 font-mono text-sm text-blue-600 dark:text-blue-400 resize-none"
                    placeholder="Formatted XML..."
                />
                {output && <CopyButton textToCopy={output} className="absolute top-2 right-2" />}
            </div>
        </div>
        <button onClick={formatXml} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">Format XML</button>
      </div>
    </ToolContainer>
  );
};

export default XmlFormatter;

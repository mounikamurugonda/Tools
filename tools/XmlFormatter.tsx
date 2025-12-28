'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const XmlFormatter: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState(
    '<root><child id="1">Hello</child><child id="2">World</child></root>'
  );
  const [output, setOutput] = useState('');

  const formatXml = () => {
    let formatted = '';
    let pad = 0;
    const xml = input.replace(/>\s*</g, '><'); // Remove existing whitespace between tags

    xml.split(/(<[^>]+>)/).forEach(node => {
      if (!node) return;
      let indent = 0;
      if (node.match(/^<\w/) && !node.match(/<.*\/>/)) {
        // Start tag
        indent = 1;
      } else if (node.match(/^<\/\w/)) {
        // End tag
        if (pad !== 0) pad -= 1;
      } else if (node.match(/^<\w[^>]*\/>/)) {
        // Self closing
        indent = 0;
      } else if (node.match(/^<\?|<!/)) {
        // Declarations
        indent = 0;
      } else {
        // Text node
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
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6 h-[60vh] min-h-[500px]">
          <Card title="Input XML" className="h-full">
            <TextArea
              value={input}
              onChange={e => setInput(e.target.value)}
              className="h-[calc(100%-2rem)] font-mono text-sm resize-none border-0 focus:ring-0 p-0"
              placeholder="Paste XML here..."
            />
          </Card>

          <Card title="Formatted XML" className="h-full">
            <div className="relative h-full flex flex-col">
              <TextArea
                readOnly
                value={output}
                className="flex-1 font-mono text-sm resize-none border-0 focus:ring-0 p-0 text-blue-600 dark:text-blue-400"
                placeholder="Formatted XML will appear here..."
              />
              {output && <CopyButton textToCopy={output} className="absolute top-0 right-0" />}
            </div>
          </Card>
        </div>

        <Button onClick={formatXml} fullWidth size="lg" variant="primary">
          Format XML
        </Button>
      </div>
    </ToolContainer>
  );
};

export default XmlFormatter;

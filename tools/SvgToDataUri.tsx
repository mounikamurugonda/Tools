'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import { RefreshCw, Code, Image as ImageIcon } from 'lucide-react';

const SvgToDataUri: React.FC<ToolProps> = ({ details, toolId }) => {
  const [input, setInput] = useState(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>',
  );
  const [encoded, setEncoded] = useState('');

  const encode = () => {
    const uri = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(input);
    setEncoded(uri);
  };

  return (
    <ToolContainer title="SVG to Data URI" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card title="Input SVG" className="h-full">
            <div className="space-y-4 flex flex-col h-full">
              <Label className="flex items-center gap-2">
                <Code className="w-4 h-4" /> SVG Code
              </Label>
              <TextArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 min-h-[200px] font-mono text-xs leading-relaxed"
                placeholder="Paste SVG code here..."
              />
              <Button onClick={encode} variant="primary" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" /> Convert
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {encoded && (
            <>
              <Card title="Result" className="space-y-4">
                <div className="relative">
                  <Label className="mb-2 block">Data URI</Label>
                  <TextArea
                    readOnly
                    value={encoded}
                    className="w-full h-32 bg-gray-50 dark:bg-gray-900/50 break-all font-mono text-xs pr-10"
                  />
                  <div className="absolute top-8 right-2">
                    <CopyButton textToCopy={encoded} />
                  </div>
                </div>
              </Card>

              <Card title="Preview">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> CSS Background Preview
                  </Label>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
                    <div
                      className="w-full h-32 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 shadow-sm"
                      style={{
                        backgroundImage: `url("${encoded}")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      }}
                    ></div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {!encoded && (
            <Card className="h-full flex items-center justify-center text-center text-gray-400 dark:text-gray-500 min-h-[300px]">
              <div>
                <RefreshCw className="w-16 h-16 mb-4 opacity-50 mx-auto" />
                <p>Click &quot;Convert&quot; to see the result</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </ToolContainer>
  );
};

export default SvgToDataUri;

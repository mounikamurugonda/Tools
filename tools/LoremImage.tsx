'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { RefreshCw, Image as ImageIcon } from 'lucide-react';

const LoremImage: React.FC<ToolProps> = ({ details, toolId }) => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [grayscale, setGrayscale] = useState(false);
  const [blur, setBlur] = useState(0);
  const [seed, setSeed] = useState(Date.now());

  let url = `https://picsum.photos/${width}/${height}?random=${seed}`;
  if (grayscale) url += '&grayscale';
  if (blur > 0) url += `&blur=${blur}`;

  return (
    <ToolContainer title="Placeholder Image Generator" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card title="Settings">
            <div className="space-y-6">
              <Slider
                label="Width"
                min={100}
                max={1920}
                step={10}
                value={width}
                onChange={e => setWidth(Number(e.target.value))}
                valueDisplay={`${width}px`}
              />
              <Slider
                label="Height"
                min={100}
                max={1080}
                step={10}
                value={height}
                onChange={e => setHeight(Number(e.target.value))}
                valueDisplay={`${height}px`}
              />
              <Slider
                label="Blur"
                min={0}
                max={10}
                value={blur}
                onChange={e => setBlur(Number(e.target.value))}
                valueDisplay={`${blur}`}
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={grayscale}
                  onChange={e => setGrayscale(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  id="grayscale-check"
                />
                <Label htmlFor="grayscale-check" className="mb-0">
                  Grayscale
                </Label>
              </div>

              <Button onClick={() => setSeed(Date.now())} variant="primary" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" /> New Random Image
              </Button>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card
            title="Preview"
            className="h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <img
              src={url}
              alt="Lorem Picsum"
              className="max-w-full max-h-full object-contain shadow-sm"
            />
          </Card>

          <Card title="Image URL">
            <div className="relative">
              <Input readOnly value={url} className="pr-12 font-mono text-sm" />
              <div className="absolute top-1/2 -translate-y-1/2 right-2">
                <CopyButton textToCopy={url} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ToolContainer>
  );
};

export default LoremImage;

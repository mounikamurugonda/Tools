'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const AspectRatio: React.FC<ToolProps> = ({ details, toolId }) => {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [ratio, setRatio] = useState('16:9');

  useEffect(() => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const common = gcd(width, height);
    if (width && height) {
      setRatio(`${width / common}:${height / common}`);
    } else {
      setRatio('0:0');
    }
  }, [width, height]);

  return (
    <ToolContainer
      title="Aspect Ratio Calculator"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-8 max-w-lg mx-auto text-center">
        <Card className="p-8">
          <div className="flex items-center justify-center gap-4">
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-32 text-center text-2xl font-bold"
            />
            <span className="text-2xl font-bold text-gray-400">:</span>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-32 text-center text-2xl font-bold"
            />
          </div>
        </Card>

        <Card className="p-6 bg-secondary/50">
          <p className="text-muted-foreground uppercase tracking-wide text-sm font-semibold">
            Aspect Ratio
          </p>
          <p className="text-5xl font-bold mt-2 text-primary">{ratio}</p>
        </Card>

        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { w: 1920, h: 1080, l: 'HD (16:9)' },
            { w: 1080, h: 1080, l: 'Square (1:1)' },
            { w: 1080, h: 1350, l: 'Instagram (4:5)' },
            { w: 1080, h: 1920, l: 'Story (9:16)' },
          ].map((p, i) => (
            <Button
              key={i}
              variant="secondary"
              onClick={() => {
                setWidth(p.w);
                setHeight(p.h);
              }}
              className="text-sm"
            >
              {p.l}
            </Button>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
};

export default AspectRatio;

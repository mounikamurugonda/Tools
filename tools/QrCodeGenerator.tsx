'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { useToast } from '@/components/ui/ToastProvider';
import { Download, Copy } from 'lucide-react';

type ErrorLevel = 'L' | 'M' | 'Q' | 'H';

const QrCodeGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [text, setText] = useState('');
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');
  const [level, setLevel] = useState<ErrorLevel>('M');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [svg, setSvg] = useState('');

  useEffect(() => {
    if (!text) {
      const c = canvasRef.current;
      if (c) c.getContext('2d')?.clearRect(0, 0, c.width, c.height);
      setSvg('');
      return;
    }
    let cancelled = false;
    import('qrcode').then(QRCode => {
      if (cancelled) return;
      const opts = {
        width: size,
        margin,
        errorCorrectionLevel: level,
        color: { dark: fg, light: bg },
      };
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, text, opts, (err: Error | null | undefined) => {
          if (err) toast.error('Could not render QR');
        });
      }
      QRCode.toString(text, { ...opts, type: 'svg' }, (err: Error | null | undefined, str: string) => {
        if (!err && !cancelled) setSvg(str);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [text, size, margin, fg, bg, level, toast]);

  const downloadPng = () => {
    if (!canvasRef.current || !text) return;
    canvasRef.current.toBlob(blob => {
      if (!blob) {
        toast.error('Export failed');
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success('PNG downloaded');
    }, 'image/png');
  };

  const downloadSvg = () => {
    if (!svg) return;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qrcode.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success('SVG downloaded');
  };

  const copySvg = async () => {
    if (!svg) return;
    try {
      await navigator.clipboard.writeText(svg);
      toast.success('SVG copied');
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <ToolContainer title="QR Code Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <Card title="Content">
              <div className="space-y-4">
                <Label htmlFor="qr-input">Text or URL</Label>
                <TextArea
                  id="qr-input"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Enter text, URL, or any payload (vCard, Wi-Fi string, etc.)"
                  className="h-40 resize-none"
                />
              </div>
            </Card>

            <Card title="Customization">
              <div className="space-y-5">
                <Slider
                  label="Size"
                  min={128}
                  max={1024}
                  step={16}
                  value={size}
                  onChange={e => setSize(Number(e.target.value))}
                  valueDisplay={`${size}px`}
                />
                <Slider
                  label="Quiet margin"
                  min={0}
                  max={8}
                  value={margin}
                  onChange={e => setMargin(Number(e.target.value))}
                  valueDisplay={`${margin}`}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Foreground</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={fg}
                        onChange={e => setFg(e.target.value)}
                        className="w-10 h-9 p-1 cursor-pointer"
                      />
                      <Input
                        value={fg}
                        onChange={e => setFg(e.target.value)}
                        className="flex-1 font-mono text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Background</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={bg}
                        onChange={e => setBg(e.target.value)}
                        className="w-10 h-9 p-1 cursor-pointer"
                      />
                      <Input
                        value={bg}
                        onChange={e => setBg(e.target.value)}
                        className="flex-1 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="mb-1">Error correction</Label>
                  <Select value={level} onChange={e => setLevel(e.target.value as ErrorLevel)}>
                    <option value="L">L · 7% recovery (smallest)</option>
                    <option value="M">M · 15% recovery</option>
                    <option value="Q">Q · 25% recovery</option>
                    <option value="H">H · 30% recovery (densest)</option>
                  </Select>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Higher levels survive damage but make the code denser.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card title="Preview" className="flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center min-h-[320px] p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-dashed border-2 border-gray-200 dark:border-gray-800">
                {text ? (
                  <div className="p-4 rounded-xl shadow-lg" style={{ backgroundColor: bg }}>
                    <canvas ref={canvasRef} />
                  </div>
                ) : (
                  <div className="text-center text-gray-400 dark:text-gray-500">
                    <p className="font-medium text-lg">QR Code Preview</p>
                    <p className="text-sm opacity-70">Enter text or a URL to generate</p>
                  </div>
                )}
              </div>
              {text && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <Button onClick={downloadPng} variant="primary">
                    <Download className="w-4 h-4 mr-1.5" /> PNG
                  </Button>
                  <Button onClick={downloadSvg} variant="secondary" disabled={!svg}>
                    <Download className="w-4 h-4 mr-1.5" /> SVG
                  </Button>
                  <Button onClick={copySvg} variant="secondary" disabled={!svg}>
                    <Copy className="w-4 h-4 mr-1.5" /> Copy SVG
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default QrCodeGenerator;

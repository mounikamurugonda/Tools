'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

// Color utilities (HSL <-> RGB/HEX)
function clamp(n: number, min: number, max: number) { return Math.min(max, Math.max(min, n)); }
function hslToRgb(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0, g1 = 0, b1 = 0;
  if (0 <= hp && hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (1 <= hp && hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (2 <= hp && hp < 3) [r1, g1, b1] = [0, c, x];
  else if (3 <= hp && hp < 4) [r1, g1, b1] = [0, x, c];
  else if (4 <= hp && hp < 5) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  const m = l - c / 2;
  return { r: Math.round((r1 + m) * 255), g: Math.round((g1 + m) * 255), b: Math.round((b1 + m) * 255) };
}
function pad2(n: number) { return n.toString(16).padStart(2, '0'); }
function rgbToHex(r: number, g: number, b: number) { return `#${pad2(r)}${pad2(g)}${pad2(b)}`; }
function hslToHex(h: number, s: number, l: number) { const { r, g, b } = hslToRgb(h, s, l); return rgbToHex(r, g, b); }

// Scheme generation
type Scheme = 'monochromatic' | 'analogous' | 'complementary' | 'split-complementary' | 'triad' | 'tetrad';

function rotateHue(h: number, d: number) { return ((h + d) % 360 + 360) % 360; }

function makePalette(h: number, s: number, l: number, scheme: Scheme) {
  switch (scheme) {
    case 'monochromatic':
      return [
        { h, s, l: clamp(l + 0.25, 0, 1) },
        { h, s, l: clamp(l + 0.12, 0, 1) },
        { h, s, l },
        { h, s, l: clamp(l - 0.12, 0, 1) },
        { h, s, l: clamp(l - 0.25, 0, 1) },
      ];
    case 'analogous':
      return [
        { h: rotateHue(h, -40), s, l },
        { h: rotateHue(h, -20), s, l },
        { h, s, l },
        { h: rotateHue(h, 20), s, l },
        { h: rotateHue(h, 40), s, l },
      ];
    case 'complementary':
      return [
        { h, s, l },
        { h: rotateHue(h, 180), s, l },
        { h, s, l: clamp(l + 0.15, 0, 1) },
        { h: rotateHue(h, 180), s, l: clamp(l + 0.15, 0, 1) },
        { h, s, l: clamp(l - 0.15, 0, 1) },
      ];
    case 'split-complementary':
      return [
        { h, s, l },
        { h: rotateHue(h, 150), s, l },
        { h: rotateHue(h, -150), s, l },
        { h, s, l: clamp(l + 0.12, 0, 1) },
        { h, s, l: clamp(l - 0.12, 0, 1) },
      ];
    case 'triad':
      return [
        { h, s, l },
        { h: rotateHue(h, 120), s, l },
        { h: rotateHue(h, -120), s, l },
        { h, s, l: clamp(l + 0.12, 0, 1) },
        { h, s, l: clamp(l - 0.12, 0, 1) },
      ];
    case 'tetrad':
      return [
        { h, s, l },
        { h: rotateHue(h, 90), s, l },
        { h: rotateHue(h, 180), s, l },
        { h: rotateHue(h, 270), s, l },
        { h, s, l: clamp(l + 0.12, 0, 1) },
      ];
  }
}

const ColorThemeWheel: React.FC<ToolProps> = ({ details, toolId }) => {
  // Base HSL
  const [h, setH] = useState(217);
  const [s, setS] = useState(0.9);
  const [l, setL] = useState(0.5);
  const [scheme, setScheme] = useState<Scheme>('analogous');

  // Wheel interaction
  const wheelRef = useRef<HTMLDivElement>(null);

  const onWheelPointer = useCallback((clientX: number, clientY: number) => {
    const el = wheelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const angle = Math.atan2(dy, dx); // -PI..PI, 0 to the right
    const deg = ((angle * 180) / Math.PI + 360) % 360; // 0..360
    const radius = Math.sqrt(dx * dx + dy * dy);
    const maxR = rect.width / 2;
    const sat = clamp(radius / maxR, 0, 1);
    setH(Math.round(deg));
    setS(parseFloat(sat.toFixed(3)));
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    onWheelPointer(e.clientX, e.clientY);
    const move = (ev: MouseEvent) => onWheelPointer(ev.clientX, ev.clientY);
    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    onWheelPointer(t.clientX, t.clientY);
    const move = (ev: TouchEvent) => {
      const tt = ev.touches[0];
      if (tt) onWheelPointer(tt.clientX, tt.clientY);
    };
    const end = () => {
      document.removeEventListener('touchmove', move);
      document.removeEventListener('touchend', end);
      document.removeEventListener('touchcancel', end);
    };
    document.addEventListener('touchmove', move, { passive: true });
    document.addEventListener('touchend', end);
    document.addEventListener('touchcancel', end);
  };

  const palette = useMemo(() => makePalette(h, s, l, scheme), [h, s, l, scheme]);

  const swatches = useMemo(() => (
    palette.map(({ h: hh, s: ss, l: ll }) => {
      const hex = hslToHex(hh, ss, ll);
      return { hex, h: Math.round(hh), s: Math.round(ss * 100), l: Math.round(ll * 100) };
    })
  ), [palette]);

  const baseHex = useMemo(() => hslToHex(h, s, l), [h, s, l]);

  const copy = async (text: string) => { try { await navigator.clipboard.writeText(text); } catch {} };

  const cssVars = useMemo(() => {
    const lines = swatches.map((sw, i) => `  --color-${i + 1}: ${sw.hex};`);
    return `:root{\n${lines.join('\n')}\n}`;
  }, [swatches]);

  const jsonExport = useMemo(() => JSON.stringify(swatches.map(sw => sw.hex), null, 2), [swatches]);

  return (
    <ToolContainer title="Color Theme Generator (with Color Wheel)" details={details} toolId={toolId}>
      <div className="space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wheel */}
          <div className="border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="brand-kicker">Base Color</div>
                <div className="brand-heading-4 mt-1">{baseHex.toUpperCase()}</div>
                <div className="brand-text-muted mt-1">H {h}° · S {Math.round(s * 100)}% · L {Math.round(l * 100)}%</div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div
                ref={wheelRef}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className="relative w-64 h-64 rounded-full cursor-crosshair select-none shadow-lg"
                style={{
                  // Hue wheel via conic-gradient; saturation via radial mask overlay
                  background: 'conic-gradient(red, yellow, lime, cyan, blue, magenta, red)',
                  WebkitMaskImage: 'radial-gradient(circle, #000 60%, transparent 61%)',
                  maskImage: 'radial-gradient(circle, #000 60%, transparent 61%)',
                }}
              >
                {/* Saturation overlay: radial gradient from white center to transparent edge handled via background-blend? Use an overlay circle */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 65%)', mixBlendMode: 'overlay' }}
                />
                {/* Pointer showing current H and S */}
                <Pointer h={h} s={s} />
              </div>
              <div className="flex-1 w-full space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Lightness</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min={0} 
                      max={1} 
                      step={0.01} 
                      value={l} 
                      onChange={(e) => setL(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="w-12 text-right font-mono text-sm">{Math.round(l * 100)}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Hue</label>
                    <input 
                      className="brand-input" 
                      type="number" 
                      min={0} 
                      max={360} 
                      value={h} 
                      onChange={(e) => setH(clamp(parseInt(e.target.value || '0'), 0, 360))} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Saturation (%)</label>
                    <input 
                      className="brand-input" 
                      type="number" 
                      min={0} 
                      max={100} 
                      value={Math.round(s * 100)} 
                      onChange={(e) => setS(clamp((parseInt(e.target.value || '0') / 100), 0, 1))} 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Scheme</label>
                  <select 
                    className="brand-input" 
                    value={scheme} 
                    onChange={(e) => setScheme(e.target.value as Scheme)}
                  >
                    <option value="monochromatic">Monochromatic</option>
                    <option value="analogous">Analogous</option>
                    <option value="complementary">Complementary</option>
                    <option value="split-complementary">Split-Complementary</option>
                    <option value="triad">Triad</option>
                    <option value="tetrad">Tetrad</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Palette */}
          <div className="border border-gray-200 dark:border-gray-700  p-6">
            <div className="brand-kicker">Palette</div>
            <div className="brand-heading-4 mt-1">Generated Colors</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
              {swatches.map((sw, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="h-20" style={{ backgroundColor: sw.hex }} />
                  <div className="p-2 flex items-center justify-between bg-gray-50 dark:bg-gray-700">
                    <code className="font-mono text-sm text-gray-700 dark:text-gray-300">{sw.hex.toUpperCase()}</code>
                    <button 
                      className="brand-button-tertiary text-xs px-2 py-1" 
                      onClick={() => copy(sw.hex)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Export as CSS Variables</div>
                <textarea 
                  className="w-full h-32 brand-input font-mono text-sm" 
                  readOnly 
                  value={cssVars} 
                />
                <div className="mt-2">
                  <button 
                    className="brand-button-secondary" 
                    onClick={() => copy(cssVars)}
                  >
                    Copy CSS
                  </button>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Export as JSON</div>
                <textarea 
                  className="w-full h-32 brand-input font-mono text-sm" 
                  readOnly 
                  value={jsonExport} 
                />
                <div className="mt-2">
                  <button 
                    className="brand-button-secondary" 
                    onClick={() => copy(jsonExport)}
                  >
                    Copy JSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

const Pointer: React.FC<{ h: number; s: number; }> = ({ h, s }) => {
  // position pointer based on h angle and s radius (% of radius)
  const r = 128; // half of 256 reference; actual parent is 256/64? We'll compute proportionally using transform
  const angle = (h - 90) * (Math.PI / 180); // subtract 90 to rotate so 0° is at right
  const rx = Math.cos(angle) * s;
  const ry = Math.sin(angle) * s;
  const left = 50 + rx * 50; // %
  const top = 50 + ry * 50;  // %
  return (
    <div className="absolute" style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}>
      <div className="w-4 h-4 rounded-full border-2 border-white shadow-lg" style={{ background: 'rgba(0,0,0,0.7)' }} />
    </div>
  );
};

export default ColorThemeWheel;

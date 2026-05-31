'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import { useToast } from '@/components/ui/ToastProvider';

type DeviceCategory = 'Phone' | 'Tablet' | 'Laptop' | 'Desktop';

interface Device {
  name: string;
  w: number;
  h: number;
  ratio: number;
  category: DeviceCategory;
}

const DEVICES: Device[] = [
  { name: 'iPhone 15 Pro Max', w: 430, h: 932, ratio: 3, category: 'Phone' },
  { name: 'iPhone 15 / 14 Pro', w: 393, h: 852, ratio: 3, category: 'Phone' },
  { name: 'iPhone 14', w: 390, h: 844, ratio: 3, category: 'Phone' },
  { name: 'iPhone 13 / 12', w: 390, h: 844, ratio: 3, category: 'Phone' },
  { name: 'iPhone 11 Pro', w: 375, h: 812, ratio: 3, category: 'Phone' },
  { name: 'iPhone SE', w: 375, h: 667, ratio: 2, category: 'Phone' },
  { name: 'Pixel 8 Pro', w: 448, h: 998, ratio: 2.625, category: 'Phone' },
  { name: 'Pixel 7', w: 412, h: 915, ratio: 2.625, category: 'Phone' },
  { name: 'Samsung Galaxy S22', w: 360, h: 780, ratio: 3, category: 'Phone' },
  { name: 'Samsung Galaxy S20', w: 360, h: 800, ratio: 3, category: 'Phone' },
  { name: 'iPad Pro 12.9"', w: 1024, h: 1366, ratio: 2, category: 'Tablet' },
  { name: 'iPad Air', w: 820, h: 1180, ratio: 2, category: 'Tablet' },
  { name: 'iPad Mini', w: 768, h: 1024, ratio: 2, category: 'Tablet' },
  { name: 'Surface Pro 8', w: 1440, h: 960, ratio: 2, category: 'Tablet' },
  { name: 'MacBook Air', w: 1280, h: 800, ratio: 2, category: 'Laptop' },
  { name: 'MacBook Pro 14"', w: 1512, h: 982, ratio: 2, category: 'Laptop' },
  { name: 'MacBook Pro 16"', w: 1728, h: 1117, ratio: 2, category: 'Laptop' },
  { name: 'Laptop (HD)', w: 1366, h: 768, ratio: 1, category: 'Laptop' },
  { name: 'Full HD Desktop', w: 1920, h: 1080, ratio: 1, category: 'Desktop' },
  { name: 'QHD Desktop', w: 2560, h: 1440, ratio: 1, category: 'Desktop' },
  { name: '4K Desktop', w: 3840, h: 2160, ratio: 1, category: 'Desktop' },
];

const CATEGORIES: ('All' | DeviceCategory)[] = ['All', 'Phone', 'Tablet', 'Laptop', 'Desktop'];

const DeviceResolutions: React.FC<ToolProps> = ({ details, toolId }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'All' | DeviceCategory>('All');
  const [viewport, setViewport] = useState<{ w: number; h: number } | null>(null);
  const toast = useToast();

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const filtered = useMemo(
    () =>
      DEVICES.filter(
        d =>
          (category === 'All' || d.category === category) &&
          d.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, category]
  );

  const copyResolution = (d: Device) => {
    navigator.clipboard
      .writeText(`${d.w}x${d.h}`)
      .then(() => toast.success(`Copied ${d.w}x${d.h}`))
      .catch(() => toast.error('Failed to copy'));
  };

  return (
    <ToolContainer title="Device Resolution List" details={details} toolId={toolId}>
      <div className="space-y-6">
        {viewport && (
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
            Your current viewport:{' '}
            <span className="font-mono font-semibold">
              {viewport.w} × {viewport.h}
            </span>{' '}
            (logical CSS pixels)
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search devices..."
            aria-label="Search devices"
          />
          <div
            className="flex flex-wrap gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 shrink-0"
            role="group"
            aria-label="Filter by category"
          >
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  category === c
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold">
              <tr>
                <th className="px-6 py-3">Device Name</th>
                <th className="px-6 py-3">Logical (CSS)</th>
                <th className="px-6 py-3">Pixel Ratio</th>
                <th className="px-6 py-3">Physical Pixels</th>
                <th className="px-6 py-3 text-right">Copy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-400 dark:text-gray-500"
                  >
                    No devices match “{search}”.
                  </td>
                </tr>
              ) : (
                filtered.map((d, i) => {
                  const isCurrent =
                    viewport && viewport.w === d.w && viewport.h === d.h;
                  return (
                    <tr
                      key={i}
                      className={`transition-colors ${
                        isCurrent
                          ? 'bg-blue-50 dark:bg-blue-900/20'
                          : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <td className="px-6 py-3 font-medium">
                        {d.name}
                        {isCurrent && (
                          <span className="ml-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                            (you)
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3 font-mono">
                        {d.w} × {d.h}
                      </td>
                      <td className="px-6 py-3">{d.ratio}x</td>
                      <td className="px-6 py-3 font-mono text-gray-500 dark:text-gray-400">
                        {Math.round(d.w * d.ratio)} × {Math.round(d.h * d.ratio)}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <button
                          onClick={() => copyResolution(d)}
                          className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ToolContainer>
  );
};

export default DeviceResolutions;

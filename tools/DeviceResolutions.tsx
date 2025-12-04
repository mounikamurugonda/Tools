
'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const DEVICES = [
    { name: 'iPhone 14 Pro Max', w: 430, h: 932, ratio: '3.0' },
    { name: 'iPhone 14', w: 390, h: 844, ratio: '3.0' },
    { name: 'iPhone 13 / 12', w: 390, h: 844, ratio: '3.0' },
    { name: 'iPhone 11 Pro', w: 375, h: 812, ratio: '3.0' },
    { name: 'iPhone SE', w: 375, h: 667, ratio: '2.0' },
    { name: 'Pixel 7', w: 412, h: 915, ratio: '2.6' },
    { name: 'Samsung Galaxy S22', w: 360, h: 780, ratio: '3.0' },
    { name: 'Samsung Galaxy S20', w: 360, h: 800, ratio: '3.0' },
    { name: 'iPad Pro 12.9"', w: 1024, h: 1366, ratio: '2.0' },
    { name: 'iPad Air', w: 820, h: 1180, ratio: '2.0' },
    { name: 'iPad Mini', w: 768, h: 1024, ratio: '2.0' },
    { name: 'MacBook Air', w: 1280, h: 800, ratio: '2.0' },
    { name: 'MacBook Pro 16"', w: 1728, h: 1117, ratio: '2.0' },
    { name: 'Full HD Desktop', w: 1920, h: 1080, ratio: '1.0' },
    { name: '4K Desktop', w: 3840, h: 2160, ratio: '1.0' },
];

const DeviceResolutions: React.FC<ToolProps> = ({ details, toolId }) => {
  const [search, setSearch] = useState('');

  const filtered = DEVICES.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <ToolContainer title="Device Resolution List" details={details} toolId={toolId}>
      <div className="space-y-6">
        <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search devices..." 
            className="brand-input" 
        />
        
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold">
                    <tr>
                        <th className="px-6 py-3">Device Name</th>
                        <th className="px-6 py-3">Logical Width</th>
                        <th className="px-6 py-3">Logical Height</th>
                        <th className="px-6 py-3">Pixel Ratio</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filtered.map((d, i) => (
                        <tr key={i} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <td className="px-6 py-3 font-medium">{d.name}</td>
                            <td className="px-6 py-3">{d.w}px</td>
                            <td className="px-6 py-3">{d.h}px</td>
                            <td className="px-6 py-3">{d.ratio}x</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </ToolContainer>
  );
};

export default DeviceResolutions;

'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const ChmodCalculator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [permissions, setPermissions] = useState({
    owner: { read: true, write: true, execute: false },
    group: { read: true, write: false, execute: false },
    public: { read: true, write: false, execute: false },
  });

  const calculateOctal = () => {
    const calc = (p: any) => (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
    return `${calc(permissions.owner)}${calc(permissions.group)}${calc(permissions.public)}`;
  };

  const calculateSymbolic = () => {
    const sym = (p: any) => `${p.read ? 'r' : '-'}${p.write ? 'w' : '-'}${p.execute ? 'x' : '-'}`;
    return `-${sym(permissions.owner)}${sym(permissions.group)}${sym(permissions.public)}`;
  };

  const toggle = (role: 'owner' | 'group' | 'public', type: 'read' | 'write' | 'execute') => {
    setPermissions(prev => ({
      ...prev,
      [role]: { ...prev[role], [type]: !prev[role][type] },
    }));
  };

  return (
    <ToolContainer title="Chmod Calculator" details={details} toolId={toolId}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Owner', 'Group', 'Public'].map(role => (
            <div key={role} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold mb-3">{role}</h3>
              <div className="space-y-2">
                {['Read', 'Write', 'Execute'].map(perm => (
                  <label key={perm} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(permissions as any)[role.toLowerCase()][perm.toLowerCase()]}
                      onChange={() => toggle(role.toLowerCase() as any, perm.toLowerCase() as any)}
                      className="rounded text-blue-600"
                    />
                    <span>{perm}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 text-center">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="text-sm text-gray-500 mb-1">Octal</div>
            <div className="text-4xl font-mono font-bold text-blue-600">{calculateOctal()}</div>
            <div className="text-xs text-gray-400 mt-2">chmod {calculateOctal()} filename</div>
          </div>
          <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="text-sm text-gray-500 mb-1">Symbolic</div>
            <div className="text-4xl font-mono font-bold text-green-600">{calculateSymbolic()}</div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default ChmodCalculator;

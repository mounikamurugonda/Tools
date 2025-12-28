'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const PasswordStrength: React.FC<ToolProps> = ({ details, toolId }) => {
  const [password, setPassword] = useState('');

  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length > 8) score += 1;
    if (pass.length > 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const score = getStrength(password);
  const width = (score / 5) * 100;
  const color = score < 3 ? 'bg-red-500' : score < 4 ? 'bg-yellow-500' : 'bg-green-500';
  const label = score < 3 ? 'Weak' : score < 4 ? 'Medium' : 'Strong';

  return (
    <ToolContainer title="Password Strength Checker" details={details} toolId={toolId}>
      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block font-medium mb-2">Check Password</label>
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-4 text-lg bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600"
            placeholder="Type a password..."
          />
        </div>

        {password && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold">
              <span>Strength: {label}</span>
              <span>{score}/5</span>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${color}`}
                style={{ width: `${width}%` }}
              ></div>
            </div>
            <ul className="text-sm text-gray-500 dark:text-gray-400 mt-4 space-y-1">
              <li className={password.length > 8 ? 'text-green-500' : ''}>
                • At least 8 characters
              </li>
              <li className={/[A-Z]/.test(password) ? 'text-green-500' : ''}>
                • Contains uppercase letter
              </li>
              <li className={/[0-9]/.test(password) ? 'text-green-500' : ''}>• Contains number</li>
              <li className={/[^A-Za-z0-9]/.test(password) ? 'text-green-500' : ''}>
                • Contains symbol
              </li>
            </ul>
          </div>
        )}
      </div>
    </ToolContainer>
  );
};

export default PasswordStrength;

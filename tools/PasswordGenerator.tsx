
'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const CHARS = {
  LOWER: 'abcdefghijklmnopqrstuvwxyz',
  UPPER: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  NUMBERS: '0123456789',
  SYMBOLS: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

const PasswordGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const generatePassword = () => {
    let charset = '';
    if (useLower) charset += CHARS.LOWER;
    if (useUpper) charset += CHARS.UPPER;
    if (useNumbers) charset += CHARS.NUMBERS;
    if (useSymbols) charset += CHARS.SYMBOLS;

    if (!charset) {
        setPassword("Please select at least one character type.");
        return;
    }

    let newPassword = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }
    setPassword(newPassword);
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    generatePassword();
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const copyToClipboard = () => {
      if(password) navigator.clipboard.writeText(password);
  }

  return (
    <ToolContainer title="Password Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="relative">
          <input
            readOnly
            value={password}
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-3 text-gray-800 dark:text-gray-200 font-mono text-lg pr-16"
          />
          <button
              onClick={copyToClipboard}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 text-sm rounded"
            >
              Copy
            </button>
        </div>
        <div className="space-y-4">
            <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Length: {length}</label>
                <input type="range" min="4" max="64" value={length} onChange={e => setLength(parseInt(e.target.value))} className="w-full" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <label className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer">
                    <input type="checkbox" checked={useUpper} onChange={() => setUseUpper(prev => !prev)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span>Uppercase (A-Z)</span>
                </label>
                <label className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer">
                    <input type="checkbox" checked={useLower} onChange={() => setUseLower(prev => !prev)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span>Lowercase (a-z)</span>
                </label>
                 <label className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer">
                    <input type="checkbox" checked={useNumbers} onChange={() => setUseNumbers(prev => !prev)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span>Numbers (0-9)</span>
                </label>
                 <label className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer">
                    <input type="checkbox" checked={useSymbols} onChange={() => setUseSymbols(prev => !prev)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span>Symbols (!@#)</span>
                </label>
            </div>
        </div>
        <button onClick={generatePassword} className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold">Regenerate</button>
      </div>
    </ToolContainer>
  );
};

export default PasswordGenerator;

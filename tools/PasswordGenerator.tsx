'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';

const CHARS = {
  LOWER: 'abcdefghijklmnopqrstuvwxyz',
  UPPER: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  NUMBERS: '0123456789',
  SYMBOLS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
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
      setPassword('Please select at least one character type.');
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

  return (
    <ToolContainer title="Password Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="relative">
          <Input
            readOnly
            value={password}
            className="font-mono text-lg pr-16"
          />
          <CopyButton
            textToCopy={password}
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
          />
        </div>

        <Card className="space-y-6">
          <div>
            <Label className="flex justify-between">
              <span>Password Length</span>
              <span className="text-blue-600 font-bold">{length}</span>
            </Label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <label className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="checkbox"
                checked={useUpper}
                onChange={() => setUseUpper((prev) => !prev)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Uppercase</span>
            </label>
            <label className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="checkbox"
                checked={useLower}
                onChange={() => setUseLower((prev) => !prev)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lowercase</span>
            </label>
            <label className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={() => setUseNumbers((prev) => !prev)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Numbers</span>
            </label>
            <label className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={() => setUseSymbols((prev) => !prev)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Symbols</span>
            </label>
          </div>
        </Card>

        <Button
          onClick={generatePassword}
          fullWidth
          size="lg"
        >
          Regenerate Password
        </Button>
      </div>
    </ToolContainer>
  );
};

export default PasswordGenerator;

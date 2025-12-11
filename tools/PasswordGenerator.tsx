'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import { Check } from 'lucide-react';

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

  const toggleOption = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => !prev);
  }

  const OptionButton = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${active
          ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
        }`}
    >
      <span className={`font-medium ${active ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
        {label}
      </span>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${active
          ? 'bg-blue-600 border-blue-600'
          : 'border-gray-300 dark:border-gray-600'
        }`}>
        {active && <Check size={14} className="text-white" />}
      </div>
    </button>
  );

  return (
    <ToolContainer title="Password Generator" details={details} toolId={toolId}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="relative">
          <Input
            readOnly
            value={password}
            className="font-mono text-xl pr-16 h-14 text-center tracking-wider bg-white dark:bg-gray-800"
          />
          <CopyButton
            textToCopy={password}
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
          />
        </div>

        <Card title="Configuration" className="space-y-6">
          <div className="space-y-4">
            <Slider
              label="Password Length"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              min={4}
              max={64}
              valueDisplay={length}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <OptionButton label="Uppercase (A-Z)" active={useUpper} onClick={() => toggleOption(setUseUpper)} />
            <OptionButton label="Lowercase (a-z)" active={useLower} onClick={() => toggleOption(setUseLower)} />
            <OptionButton label="Numbers (0-9)" active={useNumbers} onClick={() => toggleOption(setUseNumbers)} />
            <OptionButton label="Symbols (!@#...)" active={useSymbols} onClick={() => toggleOption(setUseSymbols)} />
          </div>
        </Card>

        <Button
          onClick={generatePassword}
          fullWidth
          size="lg"
          variant="primary"
          className="h-12 text-lg"
        >
          Regenerate Password
        </Button>
      </div>
    </ToolContainer>
  );
};

export default PasswordGenerator;

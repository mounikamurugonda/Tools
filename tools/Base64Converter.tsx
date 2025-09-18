
import React, { useState } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

const Base64Converter: React.FC<ToolProps> = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      setOutput(btoa(input));
      setError('');
    } catch (e) {
      setError('Failed to encode. Invalid character found.');
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(atob(input));
      setError('');
    } catch (e) {
      setError('Failed to decode. Invalid Base64 string.');
      setOutput('');
    }
  };

  return (
    <ToolContainer title="Base64 Encoder/Decoder">
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text or Base64 string here..."
          className="w-full h-32 bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
        />
        <div className="flex flex-wrap gap-2">
          <button onClick={handleEncode} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Encode (to Base64)</button>
          <button onClick={handleDecode} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">Decode (from Base64)</button>
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <textarea
          readOnly
          value={output}
          placeholder="Result..."
          className="w-full h-32 bg-gray-900 border border-gray-600 rounded p-2 text-gray-200"
        />
      </div>
    </ToolContainer>
  );
};

export default Base64Converter;
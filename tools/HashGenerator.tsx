import React, { useState } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-512';

const HashGenerator: React.FC<ToolProps> = () => {
    const [input, setInput] = useState('');
    const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const generateHash = async () => {
        if (!input) {
            setOutput('');
            setError('');
            return;
        }
        try {
            setError('');
            const encoder = new TextEncoder();
            const data = encoder.encode(input);
            const hashBuffer = await crypto.subtle.digest(algorithm, data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            setOutput(hashHex);
        } catch (e) {
            setError('Failed to generate hash. Your browser may not support the Web Crypto API.');
            setOutput('');
        }
    };

    const copyToClipboard = () => {
        if(output) navigator.clipboard.writeText(output);
    }

    return (
        <ToolContainer title="Hash Generator">
            <div className="space-y-4">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter text here..."
                    className="w-full h-32 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                />
                <div className="flex items-center gap-4">
                    <select
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
                        className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                    >
                        <option value="SHA-1">SHA-1</option>
                        <option value="SHA-256">SHA-256</option>
                        <option value="SHA-512">SHA-512</option>
                    </select>
                    <button onClick={generateHash} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Generate</button>
                </div>
                 {error && <p className="text-red-400">{error}</p>}
                <div className="relative">
                    <textarea
                        readOnly
                        value={output}
                        placeholder="Hash output..."
                        className="w-full h-32 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-2 text-gray-800 dark:text-gray-200 font-mono"
                    />
                     {output && <button
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded"
                      >
                        Copy
                      </button>}
                </div>
            </div>
        </ToolContainer>
    );
};

export default HashGenerator;
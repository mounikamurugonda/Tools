
'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import { jwtDecode } from 'jwt-decode';

const JwtDebugger: React.FC<ToolProps> = ({ details, toolId }) => {
    const [token, setToken] = useState('');
    
    const decoded = useMemo(() => {
        if (!token.trim()) return { header: null, payload: null, error: null };
        try {
            const header = jwtDecode(token, { header: true });
            const payload = jwtDecode(token);
            return { header, payload, error: null };
        } catch (e) {
             if (e instanceof Error) {
                return { header: null, payload: null, error: e.message };
            }
            return { header: null, payload: null, error: 'An unknown error occurred.' };
        }
    }, [token]);

    return (
        <ToolContainer title="JWT Decoder" details={details} toolId={toolId}>
            <div className="space-y-4">
                <textarea
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    placeholder="Paste your JSON Web Token here..."
                    className="w-full h-32 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 font-mono"
                />
                {decoded.error && <div className="p-3 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-300">{decoded.error}</div>}
                <div className="grid md:grid-cols-2 gap-4">
                    <JsonViewer title="Header" data={decoded.header} />
                    <JsonViewer title="Payload" data={decoded.payload} />
                </div>
            </div>
        </ToolContainer>
    );
};

interface JsonViewerProps {
    title: string;
    data: object | null;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ title, data }) => (
    <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <pre className="w-full h-64 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded p-3 text-sm text-gray-800 dark:text-gray-200 font-mono overflow-auto">
            {data ? JSON.stringify(data, null, 2) : ''}
        </pre>
    </div>
);


export default JwtDebugger;

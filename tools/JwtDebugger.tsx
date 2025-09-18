import React, { useState, useMemo } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

declare const jwt_decode: (token: string) => any;

const JwtDebugger: React.FC<ToolProps> = () => {
    const [token, setToken] = useState('');
    
    const decoded = useMemo(() => {
        if (!token.trim()) return { header: null, payload: null, error: null };
        try {
            // FIX: The provided 'jwt_decode' type declaration only accepts one argument.
            // Cast to 'any' to bypass the incorrect type definition, allowing the use of the `header` option.
            const header = (jwt_decode as any)(token, { header: true });
            const payload = jwt_decode(token);
            return { header, payload, error: null };
        } catch (e) {
             if (e instanceof Error) {
                return { header: null, payload: null, error: e.message };
            }
            return { header: null, payload: null, error: 'An unknown error occurred.' };
        }
    }, [token]);

    return (
        <ToolContainer title="JWT Decoder">
            <div className="space-y-4">
                <textarea
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    placeholder="Paste your JSON Web Token here..."
                    className="w-full h-32 bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 font-mono"
                />
                {decoded.error && <div className="p-3 bg-red-900/50 border border-red-700 rounded text-red-300">{decoded.error}</div>}
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
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <pre className="w-full h-64 bg-gray-900 border border-gray-600 rounded p-3 text-sm text-gray-200 font-mono overflow-auto">
            {data ? JSON.stringify(data, null, 2) : ''}
        </pre>
    </div>
);


export default JwtDebugger;
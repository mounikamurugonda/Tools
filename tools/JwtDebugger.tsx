'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import { jwtDecode } from 'jwt-decode';
import CopyButton from '@/components/CopyButton';
import TextArea from '@/components/ui/TextArea';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';

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
      return {
        header: null,
        payload: null,
        error: 'An unknown error occurred.',
      };
    }
  }, [token]);

  return (
    <ToolContainer title="JWT Decoder" details={details} toolId={toolId}>
      <div className="space-y-6">
        <Card title="Input Token">
          <div className="relative">
            <TextArea
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="Paste your JSON Web Token here..."
              className="font-mono min-h-[120px]"
            />
            {token && <CopyButton textToCopy={token} className="absolute top-2 right-2" />}
          </div>
        </Card>

        {decoded.error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
            {decoded.error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
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
  <Card title={title} className="h-full">
    <div className="relative h-full min-h-[250px]">
      <div className="w-full h-full bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 font-mono text-sm overflow-auto text-gray-800 dark:text-gray-200">
        {data ? (
          JSON.stringify(data, null, 2)
        ) : (
          <span className="text-gray-400 italic">No data</span>
        )}
      </div>
      {data && (
        <CopyButton textToCopy={JSON.stringify(data, null, 2)} className="absolute top-2 right-2" />
      )}
    </div>
  </Card>
);

export default JwtDebugger;

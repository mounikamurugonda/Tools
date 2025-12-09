import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <Sidebar />
      <main className="flex-1 w-0 min-w-0">
        {children}
      </main>
    </div>
  );
}
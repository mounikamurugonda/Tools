'use client';

import React from 'react';
import Sidebar from '../components/Sidebar';
import { CodeCastHeader } from '../components/CodeCastHeader';
import { useSharedUIStore } from '../store/useCodeCastStore';
import { RecordingProvider } from '../context/RecordingContext';

export default function CodeCastLayout({ children }: { children: React.ReactNode }) {
  // We move the layout logic inside a wrapper component to ensure RecordingProvider wraps everything
  return (
    <RecordingProvider>
      <CodeCastLayoutContent>{children}</CodeCastLayoutContent>
    </RecordingProvider>
  );
}

function CodeCastLayoutContent({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, setSidebarOpen } = useSharedUIStore();

  return (
    <div className="flex h-[calc(100vh-5rem)] w-full bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      {/* Sidebar - Controlled by Store */}
      <Sidebar />

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="lg:hidden absolute inset-0 bg-black/50 z-10 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-300 transition-colors duration-300">
        {/* Header - Navigation & Global Controls */}
        <CodeCastHeader />

        {/* Content Area (Page) */}
        <main className="flex-1 overflow-hidden w-full flex flex-col items-center justify-center p-4 md:p-4 bg-gray-50 dark:bg-gray-950 relative transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}

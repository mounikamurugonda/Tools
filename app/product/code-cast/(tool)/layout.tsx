'use client';

import React from 'react';
import Sidebar from '../components/Sidebar';
import { CodeCastHeader } from '../components/CodeCastHeader';
import { useSharedUIStore, useAnimateStore, useTypeStore, useImageStore } from '../store/useCodeCastStore';
import { RecordingProvider } from '../context/RecordingContext';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const isLibraryPage = pathname?.includes('/library');
  const isSavedPage = pathname?.includes('/saved');
  const isScrollablePage = isLibraryPage || isSavedPage;

  // Determine current mode and relevant store
  const mode = pathname?.split('/').pop();
  const isEditorPage = ['animate', 'type', 'image'].includes(mode || '');

  // Access stores
  // We need to call hooks unconditionally, but we'll only use the relevant one
  const animateCode = useAnimateStore((state) => state.code);
  const typeCode = useTypeStore((state) => state.code);
  const imageCode = useImageStore((state) => state.code);

  const getHasContent = () => {
    if (mode === 'animate') return animateCode.html || animateCode.css || animateCode.js;
    if (mode === 'type') return typeCode.html || typeCode.css || typeCode.js;
    if (mode === 'image') return imageCode.html || imageCode.css || imageCode.js; // Image store structure might differ? Header used .code
    return false;
  };

  const hasContent = !!getHasContent();

  // Warn user before leaving if there might be unsaved changes
  React.useEffect(() => {
    if (!isEditorPage) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only warn if there is actual content and we are on an editor page
      if (hasContent) {
        e.preventDefault();
        e.returnValue = ''; // Required for specific browsers
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEditorPage, hasContent]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] w-full bg-white dark:bg-gray-950 md:overflow-hidden transition-colors duration-300">
      {/* Header - Full Width at Top */}
      <CodeCastHeader />

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="lg:hidden absolute inset-0 bg-black/50 z-10 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content Wrapper: Sidebar + Main Content */}
      <div className="flex flex-1 h-full min-h-0 overflow-hidden">
        {/* Sidebar - Below Header on Left */}
        {!isScrollablePage && <Sidebar />}

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto ${!isScrollablePage ? 'md:overflow-hidden' : ''} w-full flex flex-col ${!isScrollablePage ? 'items-center justify-center' : ''} p-4 md:p-4 bg-gray-50 dark:bg-gray-950 relative transition-colors duration-300`}>
          {children}
        </main>
      </div>
    </div>
  );
}

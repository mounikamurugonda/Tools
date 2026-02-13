import React from 'react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';


export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-5rem)]">
      <Sidebar />
      <main className="flex-1 w-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] lg:pl-20">
        {children}

        <Footer />
      </main>
    </div>
  );
}


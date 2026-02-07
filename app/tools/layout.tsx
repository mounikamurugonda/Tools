import React from 'react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';


export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-5rem)]">
      <Sidebar />
      <main className="flex-1 w-full lg:pl-64">
        {children}

        <Footer />
      </main>
    </div>
  );
}

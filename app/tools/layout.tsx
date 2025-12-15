import React from 'react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import BuyMeACoffeeSection from '@/components/BuyMeACoffeeSection';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-5rem)]">
      <Sidebar />
      <main className="flex-1 w-full lg:pl-64">
        {children}
        <BuyMeACoffeeSection forceShow={true} />
        <Footer />
      </main>
    </div>
  );
}
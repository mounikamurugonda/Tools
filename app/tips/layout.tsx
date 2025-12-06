import TipsSidebar from '@/components/TipsSidebar';
import Footer from '@/components/Footer';
import BuyMeACoffeeCard from '@/components/BuyMeACoffeeCard';
import React from 'react';

export default function TipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <TipsSidebar />
      <main className="w-full md:flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col h-[calc(100vh-81px)] overflow-y-auto">
        <div className="flex-grow p-4 md:p-8">
          {children}
          {/* Buy me a coffee section as scrollable component */}
          <div className="mt-8 p-4 md:p-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-lg">
            <BuyMeACoffeeCard />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
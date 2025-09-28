import TipsSidebar from '@/components/TipsSidebar';
import Footer from '@/components/Footer';

export default function TipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <TipsSidebar />
      <main className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        <div className="flex-grow p-2 md:p-4">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}


import React from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ToolPageLayout from './components/ToolPageLayout';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import type { ToolCategory } from './types';
import { ThemeProvider } from './components/ThemeProvider';

type View = string | null;

const App: React.FC = () => {
  const [activeView, setActiveView] = React.useState<View>(null);
  const [scrollToCategory, setScrollToCategory] = React.useState<ToolCategory | null>(null);

  const handleNavigate = (view: string) => {
    window.scrollTo(0, 0); // Scroll to top on any navigation change
    if (view.startsWith('category-')) {
        const category = view.replace('category-', '') as ToolCategory;
        setActiveView(null);
        // Use a timeout to ensure homepage is rendered before we try to scroll
        setTimeout(() => setScrollToCategory(category), 50);
    } else if (view === 'home') {
        setActiveView(null);
        setScrollToCategory(null);
    } else {
        setActiveView(view);
    }
  };

  const renderContent = () => {
    if (activeView === null) {
      return <HomePage 
        onSelectTool={setActiveView} 
        scrollToCategory={scrollToCategory}
        onScrollComplete={() => setScrollToCategory(null)}
      />;
    }
    
    switch (activeView) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;
      default:
        return <ToolPageLayout selectedToolId={activeView} onSelectTool={setActiveView} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        {/* FIX: Removed onNavigate prop which does not exist on Header component */}
        <Header />
        <main className="flex-grow">
          {renderContent()}
        </main>
        <footer className="bg-white dark:bg-gray-800 text-center p-6 text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-center space-x-6">
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('about'); }} className="hover:text-blue-500">About</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('contact'); }} className="hover:text-blue-500">Contact</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('privacy'); }} className="hover:text-blue-500">Privacy Policy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('terms'); }} className="hover:text-blue-500">Terms of Service</a>
          </div>
          <p className="mt-4">
            © {new Date().getFullYear()} UtilToolkits. All Rights Reserved.
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
import React from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ToolPageLayout from './components/ToolPageLayout';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

type View = string | null;

const App: React.FC = () => {
  const [activeView, setActiveView] = React.useState<View>(null);

  const renderContent = () => {
    if (activeView === null) {
      return <HomePage onSelectTool={setActiveView} />;
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
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header onHome={() => setActiveView(null)} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-white dark:bg-gray-800 text-center p-6 text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-center space-x-6">
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('about'); }} className="hover:text-blue-500">About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('contact'); }} className="hover:text-blue-500">Contact</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('privacy'); }} className="hover:text-blue-500">Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('terms'); }} className="hover:text-blue-500">Terms of Service</a>
        </div>
        <p className="mt-4">
          © {new Date().getFullYear()} UtilToolkits. All Rights Reserved. Inspired by 10015.io.
        </p>
      </footer>
    </div>
  );
};

export default App;
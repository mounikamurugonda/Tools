
import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ToolPageLayout from './components/ToolPageLayout';

const App: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  const handleSelectTool = (id: string) => {
    setSelectedToolId(id);
  };

  const handleGoHome = () => {
    setSelectedToolId(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onHome={handleGoHome} />
      <main className="flex-grow">
        {selectedToolId ? (
          <ToolPageLayout
            selectedToolId={selectedToolId}
            onSelectTool={handleSelectTool}
          />
        ) : (
          <HomePage onSelectTool={handleSelectTool} />
        )}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm border-t border-gray-800">
        <p>Built as a frontend-only developer toolbox.</p>
      </footer>
    </div>
  );
};

export default App;
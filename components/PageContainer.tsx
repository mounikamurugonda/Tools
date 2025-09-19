import React from 'react';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">{title}</h1>
      <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
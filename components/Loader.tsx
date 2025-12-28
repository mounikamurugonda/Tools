import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 border-4 border-blue-100 dark:border-blue-900 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-4 border-4 border-purple-100 dark:border-purple-900 rounded-full"></div>
        <div className="absolute inset-4 border-4 border-purple-500 dark:border-purple-400 rounded-full border-b-transparent animate-spin-slow reverse"></div>
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 animate-pulse">
          Loading UtilToolkits...
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm animate-fade-in-up delay-100">
          Preparing your developer tools
        </p>
      </div>
    </div>
  );
};

export default Loader;

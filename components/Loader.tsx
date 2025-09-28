import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="inline-block animate-spin">
            <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-500 dark:border-t-blue-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Loading UtilToolkits
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Preparing your developer toolbox...
          </p>
        </div>
        
        {/* Animated Dots */}
        <div className="flex justify-center mt-6 space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

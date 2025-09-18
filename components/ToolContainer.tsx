
import React from 'react';

interface ToolContainerProps {
  title: string;
  children: React.ReactNode;
}

const ToolContainer: React.FC<ToolContainerProps> = ({ title, children }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-4">{title}</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        {children}
      </div>
    </div>
  );
};

export default ToolContainer;
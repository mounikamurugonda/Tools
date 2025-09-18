
import React from 'react';

interface HeaderProps {
    onHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHome }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="max-w-7xl mx-auto">
        <div onClick={onHome} className="inline-block cursor-pointer" title="Back to Homepage">
            <h1 className="text-2xl font-bold text-white tracking-wider">
              <span className="text-blue-400">Frontend</span> Dev Toolbox
            </h1>
        </div>
        <p className="text-gray-400">A collection of handy browser-based utilities</p>
      </div>
    </header>
  );
};

export default Header;
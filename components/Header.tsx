import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { LogoIcon } from './icons';

interface HeaderProps {
    onHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHome }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div onClick={onHome} className="flex items-center gap-2 cursor-pointer" title="Back to Homepage">
            <LogoIcon className="w-7 h-7 text-blue-500" />
            <h1 className="text-2xl text-gray-900 dark:text-white tracking-tighter">
              <span className="font-extrabold">Util</span>
              <span className="font-medium">Toolkits</span>
            </h1>
        </div>
        <div className="flex items-center">
            <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
'use client';

import React, { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './Logo';
import { MenuIcon, CloseIcon } from './icons';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 w-full bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700 h-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* Logo Area */}
          <Link href="/" onClick={closeAllMenus} className="flex items-center gap-2 cursor-pointer group">
              <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1 mr-4">
              <Link href="/" onClick={closeAllMenus} className="px-3 py-2 text-sm font-medium text-light-text dark:text-dark-text hover:text-accent rounded-md transition-colors">
                  Home
              </Link>
              <Link href="/tools" onClick={closeAllMenus} className="px-3 py-2 text-sm font-medium text-light-text dark:text-dark-text hover:text-accent rounded-md transition-colors">
                  Tools
              </Link>
              <Link href="/tips" onClick={closeAllMenus} className="px-3 py-2 text-sm font-medium text-light-text dark:text-dark-text hover:text-accent rounded-md transition-colors">
                  Tips
              </Link>
              <Link href="/blogs" onClick={closeAllMenus} className="px-3 py-2 text-sm font-medium text-light-text dark:text-dark-text hover:text-accent rounded-md transition-colors">
                  Blog
              </Link>
            </nav>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            <div className="flex items-center gap-3">
                <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeSwitcher />
            <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-md text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-light-background dark:bg-dark-background z-[60] animate-fade-in md:hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 h-20">
                <Link href="/" onClick={closeAllMenus} className="cursor-pointer"><Logo /></Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                <Link href="/" onClick={closeAllMenus} className="block px-4 py-3 text-lg font-medium text-light-text dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                    Home
                </Link>
                <Link href="/tools" onClick={closeAllMenus} className="block px-4 py-3 text-lg font-medium text-light-text dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                    All Tools
                </Link>
                <Link href="/tips" onClick={closeAllMenus} className="block px-4 py-3 text-lg font-medium text-light-text dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                    Tips
                </Link>
                <Link href="/blogs" onClick={closeAllMenus} className="block px-4 py-3 text-lg font-medium text-light-text dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                    Blog
                </Link>
            </nav>
        </div>
      )}
    </>
  );
};

export default Header;
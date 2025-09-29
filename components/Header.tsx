
'use client';

import React, { useState, useRef, useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './Logo';
import { CATEGORY_ORDER, TOOLS, CATEGORY_URL_MAP } from '@/constants';
import { MenuIcon, CloseIcon, ChevronDownIcon } from './icons';
import Link from 'next/link';
import { ToolCategory } from '@/types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" onClick={closeAllMenus} className="flex items-center gap-2 cursor-pointer">
              <Logo />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" onClick={closeAllMenus} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 rounded-md transition-colors">
                Home
            </Link>
            <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(prev => !prev)} className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 rounded-md transition-colors">
                    Categories
                    <ChevronDownIcon className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                    <div className="absolute top-full mt-2 left-0 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in py-1">
                        {CATEGORY_ORDER.map(category => (
                            <Link key={category} href={`/tools/category/${CATEGORY_URL_MAP[category]}`} onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                {category}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <Link href="/tools" onClick={closeAllMenus} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 rounded-md transition-colors">
                Tools
            </Link>
            <Link href="/tips" onClick={closeAllMenus} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 rounded-md transition-colors">
                Tips
            </Link>
            <Link href="/about" onClick={closeAllMenus} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 rounded-md transition-colors">
                About
            </Link>
            <Link href="/contact" onClick={closeAllMenus} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 rounded-md transition-colors">
                Contact
            </Link>
          </nav>

          <div className="flex items-center">
              <ThemeSwitcher />
              <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2 ml-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                <MenuIcon className="w-6 h-6" />
              </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 z-50 animate-fade-in md:hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
                <Link href="/" onClick={closeAllMenus} className="cursor-pointer"><Logo /></Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-65px)]">
                <Link href="/" onClick={closeAllMenus} className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                    Home
                </Link>
                <div className="pt-2">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</h3>
                    {CATEGORY_ORDER.map(category => (
                        <Link key={category} href={`/tools/category/${CATEGORY_URL_MAP[category]}`} onClick={closeAllMenus} className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md ml-4">
                            {category}
                        </Link>
                    ))}
                </div>
                <Link href="/tools" onClick={closeAllMenus} className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                    Tools
                </Link>
                <div className="pt-2">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pages</h3>
                    <Link href="/about" onClick={closeAllMenus} className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                        About
                    </Link>
                    <Link href="/contact" onClick={closeAllMenus} className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                        Contact
                    </Link>
                    <Link href="/tips" onClick={closeAllMenus} className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                        Tips
                    </Link>
                </div>
            </nav>
        </div>
      )}
    </>
  );
};

export default Header;
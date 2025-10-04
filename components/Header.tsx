
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
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-40 brand-border-b">
        <div className="brand-container h-20 flex justify-between items-center">
          <Link href="/" onClick={closeAllMenus} className="flex items-center gap-2 cursor-pointer">
              <Logo />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/" onClick={closeAllMenus} className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors">
                Home
            </Link>
            <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(prev => !prev)} className="flex items-center gap-1 px-4 py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors">
                    Categories
                    <ChevronDownIcon className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                    <div className="absolute top-full mt-2 left-0 w-56 brand-card p-2 animate-fade-in">
                        {CATEGORY_ORDER.map(category => (
                            <Link key={category} href={`/tools/category/${CATEGORY_URL_MAP[category]}`} onClick={closeAllMenus} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                {category}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <Link href="/tools" onClick={closeAllMenus} className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors">
                Tools
            </Link>
            <Link href="/tips" onClick={closeAllMenus} className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors">
                Tips
            </Link>
            <Link href="/about" onClick={closeAllMenus} className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors">
                About
            </Link>
            <Link href="/contact" onClick={closeAllMenus} className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors">
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
            <div className="flex justify-between items-center p-4 brand-border-b">
                <Link href="/" onClick={closeAllMenus} className="cursor-pointer"><Logo /></Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-65px)]">
                <Link href="/" onClick={closeAllMenus} className="block px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
                    Home
                </Link>
                <div className="pt-2">
                    <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
                    {CATEGORY_ORDER.map(category => (
                        <Link key={category} href={`/tools/category/${CATEGORY_URL_MAP[category]}`} onClick={closeAllMenus} className="block px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
                            {category}
                        </Link>
                    ))}
                </div>
                <Link href="/tools" onClick={closeAllMenus} className="block px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
                    Tools
                </Link>
                <div className="pt-2">
                    <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Pages</h3>
                    <Link href="/about" onClick={closeAllMenus} className="block px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
                        About
                    </Link>
                    <Link href="/contact" onClick={closeAllMenus} className="block px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
                        Contact
                    </Link>
                    <Link href="/tips" onClick={closeAllMenus} className="block px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
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
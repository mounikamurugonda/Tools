
'use client';

import React, { useState, useRef, useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './Logo';
import BuyMeACoffee from './BuyMeACoffee';
import { CATEGORY_ORDER, CATEGORY_URL_MAP } from '@/constants';
import { MenuIcon, CloseIcon, ChevronDownIcon } from './icons';
import Link from 'next/link';

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
      <header className="sticky top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 h-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Logo Area */}
          <Link href="/" onClick={closeAllMenus} className="flex items-center gap-2 cursor-pointer group">
              <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1 mr-4">
              <Link href="/" onClick={closeAllMenus} className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors">
                  Home
              </Link>
              <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(prev => !prev)} 
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors"
                  >
                      Categories
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isDropdownOpen && (
                      <div className="absolute top-full mt-2 left-0 w-56 bg-white dark:bg-gray-800 rounded-lg p-1.5 shadow-xl border border-gray-100 dark:border-gray-700 animate-fade-in">
                          <div className="max-h-[60vh] overflow-y-auto sidebar-scroll">
                            {CATEGORY_ORDER.map(category => (
                                <Link key={category} href={`/tools/category/${CATEGORY_URL_MAP[category]}`} onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                                    {category}
                                </Link>
                            ))}
                          </div>
                      </div>
                  )}
              </div>
              <Link href="/tools" onClick={closeAllMenus} className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors">
                  Tools
              </Link>
              <Link href="/tips" onClick={closeAllMenus} className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors">
                  Tips
              </Link>
            </nav>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            <div className="flex items-center gap-3">
                <BuyMeACoffee 
                size="sm" 
                showText={false} 
                className="hidden lg:flex" 
                tooltipText="Buy me a coffee, fuel more tools!"
                />
                <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
             <BuyMeACoffee 
              size="sm" 
              showText={false} 
              className="" 
              tooltipText="Support us"
            />
            <ThemeSwitcher />
            <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-[60] animate-fade-in md:hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 h-20">
                <Link href="/" onClick={closeAllMenus} className="cursor-pointer"><Logo /></Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                <Link href="/" onClick={closeAllMenus} className="block px-4 py-3 text-lg font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                    Home
                </Link>
                <Link href="/tools" onClick={closeAllMenus} className="block px-4 py-3 text-lg font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                    All Tools
                </Link>
                
                <div className="py-4">
                    <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
                    <div className="grid grid-cols-1 gap-1">
                        {CATEGORY_ORDER.map(category => (
                            <Link key={category} href={`/tools/category/${CATEGORY_URL_MAP[category]}`} onClick={closeAllMenus} className="block px-4 py-2.5 text-base font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                                {category}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                    <Link href="/about" onClick={closeAllMenus} className="block px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                        About
                    </Link>
                    <Link href="/contact" onClick={closeAllMenus} className="block px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                        Contact
                    </Link>
                </div>
            </nav>
        </div>
      )}
    </>
  );
};

export default Header;

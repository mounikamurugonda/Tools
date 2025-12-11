'use client';

import React, { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './Logo';
import { MenuIcon, CloseIcon } from './icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  pathname: string;
}

const NavLink = ({ href, children, onClick, pathname }: NavLinkProps) => {
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative px-3 py-2 text-sm font-medium transition-colors group ${isActive
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform origin-left transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
      />
    </Link>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeAllMenus = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 h-20 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
          {/* Logo Area */}
          <Link
            href="/"
            onClick={closeAllMenus}
            className="flex items-center gap-2 cursor-pointer group hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <Logo />
          </Link>

          {/* Search Bar - Centered */}
          <div className="hidden md:block flex-1 max-w-xl px-4">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <nav className="flex items-center gap-2 mr-2">
              <NavLink href="/" onClick={closeAllMenus} pathname={pathname}>Home</NavLink>
              <NavLink href="/tools" onClick={closeAllMenus} pathname={pathname}>Tools</NavLink>
              <NavLink href="/blogs" onClick={closeAllMenus} pathname={pathname}>Blog</NavLink>
            </nav>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            <div className="flex items-center gap-3">
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeSwitcher />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={closeAllMenus}
          />

          {/* Menu Content */}
          <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-gray-900 shadow-2xl animate-slide-in-right flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 h-20">
              <Link href="/" onClick={closeAllMenus} className="cursor-pointer">
                <Logo />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/tools', label: 'All Tools' },
                { href: '/blogs', label: 'Blog' }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAllMenus}
                  className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all active:scale-95 ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
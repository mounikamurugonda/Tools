'use client';

import React, { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './Logo';
import { MenuIcon, CloseIcon } from './icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import { CATEGORY_ORDER, CATEGORY_ICONS, CATEGORY_URL_MAP } from '@/constants';

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

              {/* Categories Dropdown */}
              <div className="relative group">
                <button
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${pathname.startsWith('/tools/category')
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                >
                  Categories
                  <svg className="w-3 h-3 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform origin-left transition-transform duration-300 ease-out ${pathname.startsWith('/tools/category') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                />

                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 max-h-96 overflow-y-auto">
                    {CATEGORY_ORDER.map((category) => {
                      const CategoryIcon = CATEGORY_ICONS[category];
                      const urlSlug = CATEGORY_URL_MAP[category];
                      return (
                        <Link
                          key={category}
                          href={`/tools/category/${urlSlug}`}
                          onClick={closeAllMenus}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <NavLink href="/blogs" onClick={closeAllMenus} pathname={pathname}>Blog</NavLink>
            </nav>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            <div className="flex items-center gap-3">
              <Link
                href="/request-tool"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors"
              >
                Request a Tool
              </Link>
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
              {/* Request a Tool Button */}
              <Link
                href="/request-tool"
                onClick={closeAllMenus}
                className="block px-4 py-3 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all active:scale-95 mb-4"
              >
                Request a Tool
              </Link>

              {[
                { href: '/', label: 'Home' },
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

              {/* Categories Section */}
              <div className="pt-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Categories
                </div>
                <div className="space-y-1">
                  {CATEGORY_ORDER.map((category) => {
                    const CategoryIcon = CATEGORY_ICONS[category];
                    const urlSlug = CATEGORY_URL_MAP[category];
                    const isActive = pathname === `/tools/category/${urlSlug}`;
                    return (
                      <Link
                        key={category}
                        href={`/tools/category/${urlSlug}`}
                        onClick={closeAllMenus}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all active:scale-95 ${isActive
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                      >
                        <CategoryIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">{category}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
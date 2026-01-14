'use client';

import React, { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './Logo';
import { MenuIcon, CloseIcon } from './icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import { CATEGORY_ORDER, CATEGORY_ICONS, CATEGORY_URL_MAP } from '@/constants';
import { TOOLS } from '@/constants';
import { ToolCategory } from '@/types';
import { Terminal, Play, Keyboard, Image as ImageIcon, Heart } from 'lucide-react';
import LoginButton from './LoginButton';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
  const [openCategory, setOpenCategory] = useState<ToolCategory | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const { favorites, fetchFavorites, isLoading } = useFavoritesStore();
  const { data: session } = useSession();
  const router = useRouter();

  // Fetch favorites on mount if session exists
  React.useEffect(() => {
    if (session?.user?.email) {
      fetchFavorites();
    }
  }, [session, fetchFavorites]);

  const favoriteTools = React.useMemo(() => {
    return TOOLS.filter(t => favorites.includes(t.id));
  }, [favorites]);

  React.useEffect(() => {
    if (isMenuOpen && pathname) {
      const toolId = pathname.split('/').pop();
      const tool = TOOLS.find(t => t.id === toolId);
      if (tool) {
        setOpenCategory(tool.category);
      }
    }
  }, [pathname, isMenuOpen]);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
  };

  const toggleCategory = (category: ToolCategory) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  // Group tools by category
  const toolsByCategory = TOOLS.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = [];
      }
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<ToolCategory, typeof TOOLS>
  );

  return (
    <>
      <header className="fixed left-0 top-0 right-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 h-20 transition-colors duration-300">
        <div className="w-full px-4 sm:px-6   h-full flex items-center justify-between gap-4">
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
              <NavLink href="/" onClick={closeAllMenus} pathname={pathname}>
                Home
              </NavLink>

              {/* Categories Dropdown */}
              <div className="relative group">
                <button
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${pathname.startsWith('/tools/category')
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                >
                  Categories
                  <svg
                    className="w-3 h-3 ml-1 inline-block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform origin-left transition-transform duration-300 ease-out ${pathname.startsWith('/tools/category')
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                />

                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 max-h-96 overflow-y-auto">
                    {CATEGORY_ORDER.map(category => {
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
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {category}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <NavLink href="/blogs" onClick={closeAllMenus} pathname={pathname}>
                Blog
              </NavLink>
              <NavLink href="/#faq" onClick={closeAllMenus} pathname={pathname}>
                FAQ
              </NavLink>

              <div className="relative group/codecast">
                <Link
                  href="/product/code-cast"
                  onClick={closeAllMenus}
                  className={`group relative flex items-center gap-2 px-3 py-2 transition-all rounded-lg ${pathname.startsWith('/product/code-cast')
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  {/* Active Indicator Border */}
                  {pathname.startsWith('/product/code-cast') && (
                    <div className="absolute inset-0 rounded-lg border-2 border-blue-500/20 dark:border-blue-400/20 pointer-events-none" />
                  )}

                  {/* Logo Container */}
                  <div className="relative flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-lg text-white shadow-md transition-transform duration-300 ${pathname.startsWith('/product/code-cast')
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 scale-105 shadow-blue-600/30'
                        : 'bg-gradient-to-br from-gray-700 to-gray-900 group-hover:from-blue-600 group-hover:to-purple-600 shadow-gray-600/20 group-hover:shadow-blue-600/20'
                        }`}
                    >
                      <Terminal size={14} strokeWidth={2.5} className="opacity-100" />
                    </div>
                    <span
                      className={`font-bold text-sm tracking-tight transition-colors ${pathname.startsWith('/product/code-cast')
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400'
                        : 'text-gray-700 dark:text-gray-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600'
                        }`}
                    >
                      CodeCast
                    </span>
                  </div>
                </Link>

                {/* Hover Dropdown */}
                <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover/codecast:opacity-100 group-hover/codecast:visible transition-all duration-200 z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-1 overflow-hidden">
                    <Link
                      href="/product/code-cast/animate"
                      onClick={closeAllMenus}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <Play size={16} className="text-blue-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Play Code
                      </span>
                    </Link>
                    <Link
                      href="/product/code-cast/type"
                      onClick={closeAllMenus}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <Keyboard size={16} className="text-purple-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Type Code
                      </span>
                    </Link>
                    <Link
                      href="/product/code-cast/image"
                      onClick={closeAllMenus}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <ImageIcon size={16} className="text-pink-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Code to Image
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            <div className="flex items-center gap-3">
              {/* Favorites Button (Desktop) */}
              <div className="relative">
                <button
                  onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
                  className={`p-2 rounded-full transition-colors relative ${isFavoritesOpen
                    ? 'text-red-500 '
                    : 'text-gray-500'
                    }`}
                  aria-label="Favorites"
                >
                  <Heart size={20} className={favorites.length > 0 ? "fill-red-500 text-red-500" : ""} />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {favorites.length}
                    </span>
                  )}
                </button>

                {/* Favorites Dropdown */}
                {isFavoritesOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsFavoritesOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fade-in-up">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Your Favorites</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                        {!session ? (
                          <div className="p-4 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Sign in to view your favorites</p>
                          </div>
                        ) : favoriteTools.length === 0 ? (
                          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            <Heart size={32} className="mx-auto mb-2 opacity-20" />
                            <p className="text-sm">No favorite tools yet</p>
                          </div>
                        ) : (
                          favoriteTools.map(tool => (
                            <Link
                              key={tool.id}
                              href={`/tools/${tool.id}`}
                              onClick={() => setIsFavoritesOpen(false)}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                            >
                              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-500 group-hover:scale-110 transition-transform">
                                {tool.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{tool.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{tool.category}</p>
                              </div>
                            </Link>
                          ))
                        )}
                      </div>
                      {session && (
                        <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-center">
                          <Link
                            href="/tools"
                            onClick={() => setIsFavoritesOpen(false)}
                            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Browse all tools
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <Link
                href="/request-tool"
                className="hidden lg:block px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors shadow-sm"
              >
                Request a Tool
              </Link>
              <ThemeSwitcher />
              <LoginButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <LoginButton /> {/* Compact on mobile */}
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
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-gray-900 shadow-2xl animate-slide-in-right flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
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

            <div className="p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
              <SearchBar />
            </div>

            {/* Mobile Favorites Link */}
            {session && (
              <div className="px-4 pt-4">
                <button
                  onClick={() => {
                    setIsFavoritesOpen(true); // Re-use the desktop dropdown logic or just navigate? 
                    // For mobile menu, maybe better to just list them inline or standard nav link?
                    // Let's add an inline section.
                    setIsMenuOpen(false);
                    setIsFavoritesOpen(true); // Reuse the dropdown logic which is fixed position
                  }}
                  className="flex items-center gap-3 w-full p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400"
                >
                  <Heart size={20} className="fill-current" />
                  <span className="font-bold">Your Favorites ({favorites.length})</span>
                </button>
              </div>
            )}

            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              {/* Request a Tool Button */}
              <Link
                href="/request-tool"
                onClick={closeAllMenus}
                className="block px-4 py-3 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all active:scale-95 mb-4"
              >
                Request a Tool
              </Link>

              <Link
                href="/product/code-cast"
                onClick={closeAllMenus}
                className={`flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-xl transition-all active:scale-95 ${pathname.startsWith('/product/code-cast')
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm">
                  <Terminal size={12} strokeWidth={2.5} />
                </div>
                CodeCast
              </Link>

              <Link
                href="/"
                onClick={closeAllMenus}
                className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all active:scale-95 ${pathname === '/'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
              >
                Home
              </Link>
              <Link
                href="/#faq"
                onClick={closeAllMenus}
                className="block px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all active:scale-95"
              >
                FAQ
              </Link>

              {/* Categories Section */}
              <div className="pt-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tools & Categories
                </div>
                <div className="space-y-1 mt-2">
                  {CATEGORY_ORDER.map(category => {
                    const CategoryIcon = CATEGORY_ICONS[category];
                    const isOpen = openCategory === category;

                    return (
                      <div key={category} className="rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleCategory(category)}
                          className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${isOpen
                            ? 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <CategoryIcon className="w-5 h-5 text-blue-500" />
                            <span className="text-base font-medium">{category}</span>
                          </div>
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {isOpen && (
                          <div className="bg-gray-50/50 dark:bg-gray-800/30 px-3 py-2 space-y-1">
                            {toolsByCategory[category]?.map(tool => {
                              const isToolActive = pathname === `/tools/${tool.id}`;
                              return (
                                <Link
                                  key={tool.id}
                                  href={`/tools/${tool.id}`}
                                  onClick={closeAllMenus}
                                  className={`flex items-center gap-3 px-3 py-2 pl-10 rounded-lg text-sm transition-colors ${isToolActive
                                    ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                    }`}
                                >
                                  <span className="truncate">{tool.name}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
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

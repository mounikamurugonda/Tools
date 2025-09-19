import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './icons';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    // Priority 1: User's previously saved choice in localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    // Priority 2: User's OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  // Default for server-side rendering or environments without window
  return 'light';
};

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // This effect syncs the DOM with the component's state
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      // When the user clicks, explicitly save their choice to localStorage
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:ring-offset-gray-900 focus:ring-blue-500"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
    </button>
  );
};

export default ThemeSwitcher;

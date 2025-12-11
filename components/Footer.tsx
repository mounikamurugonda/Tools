import Link from 'next/link';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-background dark:bg-dark-background border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Logo />
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
                &copy; {currentYear} UtilToolkits. All Rights Reserved.
              </div>
            </div>

            <nav className="flex flex-wrap justify-center md:justify-end items-center gap-x-4 sm:gap-x-6 gap-y-2">
              <Link
                href="/about"
                className="text-sm text-light-text dark:text-dark-text hover:text-accent transition-colors py-2 px-1"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-light-text dark:text-dark-text hover:text-accent transition-colors py-2 px-1"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-light-text dark:text-dark-text hover:text-accent transition-colors py-2 px-1"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-light-text dark:text-dark-text hover:text-accent transition-colors py-2 px-1"
              >
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

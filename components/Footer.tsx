import Link from 'next/link';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-background dark:bg-dark-background border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Logo />
              <div className="text-sm text-gray-500">
                &copy; {currentYear} UtilToolkits. All Rights Reserved.
              </div>
            </div>

            <nav className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2">
              <Link href="/about" className="text-sm text-light-text dark:text-dark-text hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm text-light-text dark:text-dark-text hover:text-accent transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-sm text-light-text dark:text-dark-text hover:text-accent transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-light-text dark:text-dark-text hover:text-accent transition-colors">
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
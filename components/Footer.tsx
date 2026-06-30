import Link from 'next/link';
import Logo from './Logo';
import { TOOLS, CATEGORY_ORDER, CATEGORY_URL_MAP } from '@/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const categoryEntries = CATEGORY_ORDER.map(category => ({
    category,
    label: category.replace(/\s+Tools$/i, ''),
    slug: CATEGORY_URL_MAP[category],
    count: TOOLS.filter(t => t.category === category).length,
  })).filter(c => c.count > 0);

  return (
    <footer className="bg-light-background dark:bg-dark-background border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-10">
          <nav
            aria-label="Browse tools by category"
            className="grid grid-cols-2 gap-x-6 gap-y-2 border-b border-gray-200 pb-8 sm:grid-cols-3 md:grid-cols-5 dark:border-gray-700"
          >
            <div className="col-span-2 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:col-span-3 md:col-span-5 dark:text-gray-400">
              Browse by category
            </div>
            {categoryEntries.map(({ label, slug, count }) => (
              <Link
                key={slug}
                href={`/tools/category/${slug}`}
                className="text-sm text-light-text hover:text-accent dark:text-dark-text"
              >
                {label}{' '}
                <span className="text-xs text-gray-500 dark:text-gray-400">({count})</span>
              </Link>
            ))}
            <Link href="/tools" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
              All tools &rarr;
            </Link>
            <Link href="/collections" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
              Collections &rarr;
            </Link>
            <Link href="/blogs" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
              Blog &rarr;
            </Link>
          </nav>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Logo />
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
                &copy; {currentYear} UtilToolkits. All Rights Reserved.
              </div>
            </div>

            <nav className="flex flex-wrap justify-center md:justify-end items-center gap-x-4 sm:gap-x-6 gap-y-2">
              <Link href="/about" className="text-sm text-light-text dark:text-dark-text hover:text-accent transition-colors py-2 px-1">About</Link>
              <Link href="/contact" className="text-sm text-light-text dark:text-dark-text hover:text-accent transition-colors py-2 px-1">Contact</Link>
              <Link href="/privacy" className="text-sm text-light-text dark:text-dark-text hover:text-accent transition-colors py-2 px-1">Privacy</Link>
              <Link href="/terms" className="text-sm text-light-text dark:text-dark-text hover:text-accent transition-colors py-2 px-1">Terms</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

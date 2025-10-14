import Link from 'next/link';
import { CATEGORY_ORDER, TOOLS } from '@/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const toolCount = TOOLS.length;
  const categoryCount = CATEGORY_ORDER.length;

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">UtilToolkits</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Your one-stop collection of free, browser-based utilities. All tools run locally for maximum speed and privacy.
            </p>
            
            {/* Stats */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <span>{toolCount}+ Free Tools</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span>{categoryCount} Categories</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                <span>100% Privacy First</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tools" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/credits" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Credits
                </Link>
              </li>
              <li>
                <Link href="/tips" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Tips & Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              {CATEGORY_ORDER.slice(0, 6).map(category => (
                <li key={category}>
                  <Link 
                    href={`/tools/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legal & Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} UtilToolkits. All Rights Reserved. Made with ❤️ for developers and creators.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

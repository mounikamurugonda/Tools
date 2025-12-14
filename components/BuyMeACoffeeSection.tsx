'use client';

import { usePathname } from 'next/navigation';
import BuyMeACoffeeCard from './BuyMeACoffeeCard';

const BuyMeACoffeeSection = ({ forceShow = false }: { forceShow?: boolean }) => {
  const pathname = usePathname();

  // Show on all pages except specific ones where it might be redundant
  // Also hide on inner pages (tools and tips) as they will have their own scrollable version
  const hideOnPages = ['/contact', '/about'];

  if (!forceShow && (pathname?.startsWith('/tools') || pathname?.startsWith('/code-cast'))) {
    return null;
  }

  const shouldShow = forceShow || !hideOnPages.includes(pathname);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BuyMeACoffeeCard />
      </div>
    </div>
  );
};

export default BuyMeACoffeeSection;

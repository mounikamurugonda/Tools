
'use client';

import { usePathname } from 'next/navigation';
import Breadcrumb from './Breadcrumb';
import { getBreadcrumbItems } from '@/lib/breadcrumb';

const BreadcrumbWrapper = () => {
  const pathname = usePathname();
  const breadcrumbItems = getBreadcrumbItems(pathname);

  // Don't render breadcrumbs on the home page
  if (pathname === '/') {
    return null;
  }

  return (
    <div className="container mx-auto py-2">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default BreadcrumbWrapper;

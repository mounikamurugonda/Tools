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
    <Breadcrumb items={breadcrumbItems} />
  );
};

export default BreadcrumbWrapper;

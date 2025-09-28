'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

const ConditionalFooter = () => {
  const pathname = usePathname();
  const isToolsPage = pathname.startsWith('/tools');

  if (isToolsPage) {
    return null;
  }

  return <Footer />;
};

export default ConditionalFooter;

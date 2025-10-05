'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

const ConditionalFooter = () => {
  const pathname = usePathname();
  const isToolsPage = pathname.startsWith('/tools');
  const isTipsPage = pathname.startsWith('/tips');

  if (isToolsPage || isTipsPage) {
    return null;
  }

  return <Footer />;
};

export default ConditionalFooter;

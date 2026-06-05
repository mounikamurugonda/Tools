import React from 'react';
import BlogsPageLayout from '@/components/BlogsPageLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer & AI Tools Blog — UtilToolkits',
  description:
    'Guides, tutorials, and deep dives on developer tools, AI workflows, prompt engineering, token optimization, JSON/CSV handling, and more. Free insights from the UtilToolkits team.',
  keywords:
    'developer tools blog, ai tools guide, prompt engineering, token counter guide, json formatter tutorial, csv to ai, free tools for developers, ai workflow tips',
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: 'Developer & AI Tools Blog — UtilToolkits',
    description:
      'Guides on AI workflows, prompt engineering, token optimization, and 100+ free developer tools. All articles from UtilToolkits.',
    type: 'website',
    url: 'https://utiltoolkits.com/blogs',
    siteName: 'UtilToolkits',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="brand-container py-8">
      <BlogsPageLayout>{children}</BlogsPageLayout>
    </div>
  );
}

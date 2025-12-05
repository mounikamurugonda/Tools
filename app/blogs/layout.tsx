import React from 'react';
import BlogsPageLayout from '@/components/BlogsPageLayout';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <BlogsPageLayout>{children}</BlogsPageLayout>
    </div>
  );
}

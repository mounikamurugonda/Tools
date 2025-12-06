import React from 'react';
import BlogsPageLayout from '@/components/BlogsPageLayout';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="brand-container py-8">
      <BlogsPageLayout children={children} />
    </div>
  );
}
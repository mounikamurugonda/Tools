'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { blogs } from '@/lib/blogs';
import { getCategorySlug } from '@/lib/slugUtils';

const allCategories = Array.from(new Set(blogs.map((blog) => blog.category)));

const BlogsPageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isSidebarVisible = pathname === '/blogs' || pathname.startsWith('/blogs/category/');

  return (
    <div className={`flex flex-col md:flex-row gap-12 ${!isSidebarVisible ? 'justify-center' : ''}`}>
      {isSidebarVisible && (
        <aside className="w-full md:w-1/4">
          <div className="sticky top-24">
            <h3 className="brand-heading-3 mb-4">Blog Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blogs"
                  className={`block w-full text-left ${pathname === '/blogs'
                    ? 'brand-button-primary'
                    : 'brand-button-secondary'
                    }`}
                >
                  All
                </Link>
              </li>
              {allCategories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/blogs/category/${getCategorySlug(category)}`}
                    className={`block w-full text-left ${pathname === `/blogs/category/${getCategorySlug(category)}`
                      ? 'brand-button-primary'
                      : 'brand-button-secondary'
                      }`}
                  >
                    {category.replace(' Tools', '')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
      <main className={`w-full ${isSidebarVisible ? 'md:w-3/4' : 'w-full'}`}>{children}</main>
    </div>
  );
};

export default BlogsPageLayout;


'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { blogs } from '@/lib/blogs';

const allCategories = Array.from(new Set(blogs.map(blog => blog.category)));

const BlogsPageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-1/4">
        <div className="sticky top-24">
          <h3 className="text-lg font-bold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/blogs"
                className={`block w-full text-left px-4 py-2 rounded-md ${
                  pathname === '/blogs'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-800'
                }`}
              >
                All
              </Link>
            </li>
            {allCategories.map(category => (
              <li key={category}>
                <Link
                  href={`/blogs/category/${category}`}
                  className={`block w-full text-left px-4 py-2 rounded-md ${
                    pathname === `/blogs/category/${category}`
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-800'
                  }`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="w-full md:w-3/4">{children}</main>
    </div>
  );
};

export default BlogsPageLayout;

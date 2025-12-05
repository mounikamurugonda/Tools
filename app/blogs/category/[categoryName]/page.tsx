
import React from 'react';
import Link from 'next/link';
import { blogs } from '@/lib/blogs';
import { Blog } from '@/types';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const categories = Array.from(new Set(blogs.map(blog => blog.category)));
  return categories.map(category => ({
    categoryName: category,
  }));
}

const CategoryPage = ({ params }: { params: { categoryName: string } }) => {
  const { categoryName } = params;
  const filteredBlogs = blogs.filter(
    blog => blog.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (filteredBlogs.length === 0) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">
        Blogs in {decodeURIComponent(categoryName)}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog: Blog) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {blog.description}
            </p>
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

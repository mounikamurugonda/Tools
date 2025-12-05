
'use client';

import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { blogs } from '@/lib/blogs';
import { Blog } from '@/types';

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">All Blogs</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Welcome to our blog! Here you will find a collection of articles on various topics.
      </p>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog: Blog) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div className="p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{blog.date} | {blog.category}</p>
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {blog.description}
              </p>
              <Link
                href={`/blogs/${blog.id}`}
                className="text-blue-500 font-semibold hover:underline"
              >
                Read more &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;

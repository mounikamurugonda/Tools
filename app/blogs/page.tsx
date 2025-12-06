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

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <h1 className="brand-heading-1 mb-4">All Blogs</h1>
      <p className="brand-subheading mb-8">
        Welcome to our blog! Here you will find a collection of articles on
        various topics.
      </p>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="brand-input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog: Blog) => (
          <div
            key={blog.id}
            className="brand-card"
          >
            <div className="p-6">
              <p className="brand-text-muted mb-2">
                {blog.date} | {blog.category}
              </p>
              <h2 className="brand-heading-3 mb-2">{blog.title}</h2>
              <p className="brand-text-body mb-4">
                {blog.description}
              </p>
              <Link
                href={`/blogs/${blog.id}`}
                className="brand-text-link"
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


import React from 'react';
import { blogs } from '@/lib/blogs';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return blogs.map(blog => ({
    blogId: blog.id,
  }));
}

const BlogPage = ({ params }: { params: { blogId: string } }) => {
  const blog = blogs.find(blog => blog.id === params.blogId);

  if (!blog) {
    notFound();
  }

  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        By {blog.author} on {blog.date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default BlogPage;

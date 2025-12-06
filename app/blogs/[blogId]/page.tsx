import React from 'react';
import { blogs } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ShareButton from '@/components/ShareButton';
import BreadcrumbWrapper from '@/components/BreadcrumbWrapper';

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    blogId: blog.id,
  }));
}

const BlogPage = ({ params }: { params: { blogId: string } }) => {
  const blog = blogs.find((blog) => blog.id === params.blogId);

  if (!blog) {
    notFound();
  }

  const relatedPosts = blogs.filter((p) => blog.relatedPosts?.includes(p.id));

  return (
    <div className="brand-container-narrow">
      <BreadcrumbWrapper />
      <h1 className="brand-heading-1 mb-4">{blog.title}</h1>
      <div className="flex items-center mb-8">
        <Image
          src={blog.authorImage || ''}
          alt={blog.author}
          width={40}
          height={40}
          className="rounded-full mr-4"
        />
        <div>
          <p className="font-semibold">{blog.author}</p>
          <p className="brand-text-muted">
            {blog.date}
          </p>
        </div>
      </div>
      {blog.image && (
        <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={400}
          className="rounded-lg mb-8"
        />
      )}
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="my-8">
        <ShareButton title={blog.title} toolId={blog.id} />
      </div>

      <div>
        <h2 className="brand-heading-2 my-8">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((post) => (
            <Link href={`/blogs/${post.id}`} key={post.id}>
              <div className="brand-card">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="object-cover rounded-t-xl"
                  />
                )}
                <div className="p-6">
                  <h3 className="brand-heading-3 mb-2">{post.title}</h3>
                  <p className="brand-text-body">
                    {post.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

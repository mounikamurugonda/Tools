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
      
      <div>
          <p className='space-x-4' ><span className="font-semibold">{blog.author}</span> 
         <span className='text-sm'>   {blog.date}</span>
          </p>
        </div>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

    

      <div>
        <h2 className="brand-heading-2 my-8">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
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

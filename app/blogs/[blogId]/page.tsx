import React from 'react';
import { blogs } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ShareButton from '@/components/ShareButton';
import BreadcrumbWrapper from '@/components/BreadcrumbWrapper';
import Schema from '@/components/Schema';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/schema';
import { TOOLS } from '@/constants';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = { params: Promise<{ blogId: string }> };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { blogId } = await params;
  const blog = blogs.find(b => b.id === blogId);

  if (!blog) {
    return {
      title: 'Blog Post Not Found | UtilToolkits',
      description:
        'The requested article could not be found. Browse our free developer-tool guides and tutorials.',
    };
  }

  const title = blog.seoTitle || `${blog.title} | UtilToolkits Blog`;
  const description = blog.seoDescription || blog.description;
  const url = `https://utiltoolkits.com/blogs/${blog.id}`;
  const image = blog.image
    ? blog.image.startsWith('http')
      ? blog.image
      : `https://utiltoolkits.com${blog.image}`
    : 'https://utiltoolkits.com/og-image.png';

  const parentIcons = (await parent).icons;

  return {
    icons: parentIcons,
    title,
    description,
    keywords:
      blog.keywords && blog.keywords.length > 0
        ? [...blog.keywords, blog.category.toLowerCase(), 'developer tools', 'free online tools']
        : `${blog.category.toLowerCase()}, developer tools, online tools, tutorial, guide`,
    authors: [{ name: blog.author }],
    creator: blog.author,
    publisher: 'UtilToolkits',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: { canonical: `/blogs/${blog.id}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: 'UtilToolkits',
      publishedTime: new Date(blog.date).toISOString(),
      modifiedTime: new Date(blog.updatedDate || blog.date).toISOString(),
      authors: [blog.author],
      section: blog.category,
      images: [{ url: image, width: 1200, height: 630, alt: blog.title }],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@utiltoolkits',
    },
  };
}

// Blog ids are fully enumerated; unknown/hidden ids must return a real HTTP 404,
// not a streamed not-found shell with status 200 (soft 404 — bad signal to Google).
export const dynamicParams = false;

export async function generateStaticParams() {
  return blogs.map(blog => ({
    blogId: blog.id,
  }));
}

const BlogPage = async ({ params }: Props) => {
  const { blogId } = await params;
  const blog = blogs.find(blog => blog.id === blogId);

  if (!blog) {
    notFound();
  }

  const relatedPosts = blogs.filter(p => blog.relatedPosts?.includes(p.id));
  const relatedTools = TOOLS.filter(t => blog.relatedTools?.includes(t.id));
  const moreBlogs = blogs.filter(b => b.id !== blog.id).slice(0, 5); // Show first 5 other blogs in sidebar

  return (
    <div className="brand-container">
      <Schema schema={getArticleSchema(blog)} />
      <Schema
        schema={getBreadcrumbSchema([
          { name: 'Home', url: 'https://utiltoolkits.com' },
          { name: 'Blogs', url: 'https://utiltoolkits.com/blogs' },
          { name: blog.title, url: `https://utiltoolkits.com/blogs/${blog.id}` },
        ])}
      />
      <BreadcrumbWrapper />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="brand-heading-1 mb-4">{blog.title}</h1>
              <p className="space-x-4 text-gray-400">
                <span className="font-semibold text-brand-primary">{blog.author}</span>
                <span className="text-sm border-l border-gray-600 pl-4">{blog.date}</span>
              </p>
            </div>
            <ShareButton title={blog.title} url={`https://utiltoolkits.com/blogs/${blog.id}`} />
          </div>

          {blog.image && (
            <div className="mb-8 relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-lg border border-gray-800">
              <Image src={blog.image} alt={blog.title} fill className="object-cover" />
            </div>
          )}

          <div
            className="prose dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Related Tools Section */}
          {relatedTools.length > 0 && (
            <div className="mb-12 border-t border-gray-800 pt-8">
              <h2 className="brand-heading-2 mb-6">Tools Mentioned</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedTools.map(tool => (
                  <Link href={`/tools/${tool.id}`} key={tool.id} className="block group">
                    <div className="brand-card p-4 flex items-start sm:items-center gap-4 group hover:border-brand-primary/50 transition-all duration-300">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-brand-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white group-hover:text-brand-primary transition-colors truncate">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts Section (Bottom) */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="brand-heading-2 mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map(post => (
                  <Link href={`/blogs/${post.id}`} key={post.id}>
                    <div className="brand-card h-full hover:border-brand-primary/50 transition-colors">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="object-cover rounded-t-xl h-48 w-full"
                        />
                      )}
                      <div className="p-6">
                        <h3 className="brand-heading-3 mb-2 line-clamp-2">{post.title}</h3>
                        <p className="brand-text-body line-clamp-3">{post.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="sticky top-24">
            <div className="brand-card p-6">
              <h3 className="brand-heading-3 mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                More Blogs
              </h3>
              <div className="flex flex-col gap-4">
                {moreBlogs.map(b => (
                  <Link href={`/blogs/${b.id}`} key={b.id} className="group">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-primary transition-colors mb-1">
                      {b.title}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{b.date}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-center">
                <Link href="/blogs" className="text-brand-primary text-sm hover:underline">
                  View All Blogs &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

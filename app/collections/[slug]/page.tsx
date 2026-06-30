import { COLLECTIONS, getCollectionBySlug } from '@/lib/collections';
import { TOOLS } from '@/constants';
import ToolCard from '@/components/ToolCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: 'Not Found' };

  return {
    title: collection.seoTitle,
    description: collection.seoDescription,
    keywords: collection.keywords.join(', '),
    alternates: { canonical: `/collections/${slug}` },
    openGraph: {
      title: collection.seoTitle,
      description: collection.seoDescription,
      url: `https://utiltoolkits.com/collections/${slug}`,
      siteName: 'UtilToolkits',
      type: 'website',
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const tools = collection.toolIds
    .map((id) => TOOLS.find((t) => t.id === id))
    .filter(Boolean) as typeof TOOLS;

  // JSON-LD ItemList schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: collection.title,
    description: collection.description,
    url: `https://utiltoolkits.com/collections/${slug}`,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tool.name,
      url: `https://utiltoolkits.com/tools/${tool.id}`,
      description: tool.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-blue-600 dark:hover:text-blue-400">Collections</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">{collection.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{collection.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {collection.title}
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mb-6">
            {collection.intro}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full text-blue-700 dark:text-blue-400 text-sm font-medium">
            🔒 {collection.whyUse}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            ← Browse all collections
          </Link>
        </div>
      </div>
    </>
  );
}

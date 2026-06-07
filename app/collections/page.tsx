import { COLLECTIONS } from '@/lib/collections';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tool Collections — Curated Developer Toolkits | UtilToolkits',
  description:
    'Curated collections of free browser-based developer tools: JSON & API tools, CSS generators, image optimization, front-end toolkit, text processing, and more.',
  keywords:
    'developer tool collections, frontend developer toolkit, json api tools, css generator tools, image tools, text tools, free developer utilities',
  alternates: { canonical: '/collections' },
  openGraph: {
    title: 'Tool Collections — Curated Developer Toolkits | UtilToolkits',
    description:
      'Curated collections of free browser-based developer tools. No signup, no upload, 100% private.',
    url: 'https://utiltoolkits.com/collections',
    siteName: 'UtilToolkits',
    type: 'website',
  },
};

export default function CollectionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Tool Collections
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Curated toolkits for common developer workflows. Bookmark the collection that fits your work.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {COLLECTIONS.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="group block p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0">{collection.icon}</span>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {collection.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                  {collection.description}
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {collection.toolIds.length} tools →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

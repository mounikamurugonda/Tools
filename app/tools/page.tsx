'use client';

import { TOOLS } from '@/constants';
import ToolCard from '@/components/ToolCard';
import {
  getToolsPageSchema,
  getWebsiteSchema,
  getOrganizationSchema,
  getBreadcrumbSchema,
} from '@/lib/schema';
import Schema from '@/components/Schema';
import { useSearchParams } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import Link from 'next/link';
import { trackSearch, trackToolUsage } from '@/lib/analytics';

function ToolsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('search') || '';

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return TOOLS;

    const filtered = TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Track search when results are filtered
    if (searchQuery.trim()) {
      trackSearch(searchQuery.trim(), filtered.length);
    }

    return filtered;
  }, [searchQuery]);

  const breadcrumbItems = [
    { name: 'Home', url: 'https://utiltoolkits.com' },
    {
      name: searchQuery ? `Search: ${searchQuery}` : 'All Tools',
      url: searchQuery
        ? `https://utiltoolkits.com/tools?search=${encodeURIComponent(searchQuery)}`
        : 'https://utiltoolkits.com/tools',
    },
  ];

  return (
    <>
      {/* Schema Markup */}
      <Schema schema={getWebsiteSchema()} />
      <Schema schema={getOrganizationSchema()} />
      <Schema schema={getToolsPageSchema(searchQuery)} />
      <Schema schema={getBreadcrumbSchema(breadcrumbItems)} />

      <div className="brand-fade-in">
        <div className="mb-8">
          <h1 className="brand-heading-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Tools'}
          </h1>
          <p className="brand-subheading mt-2">
            {searchQuery
              ? `Found ${filteredTools.length} tool${filteredTools.length !== 1 ? 's' : ''} matching "${searchQuery}"`
              : `Discover and use our collection of ${TOOLS.length} utility tools to boost your productivity.`}
          </p>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                onClick={() => trackToolUsage(tool.name)}
                className="brand-scale-hover"
              >
                <ToolCard tool={tool} />
              </Link>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-16 brand-card">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <svg
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="brand-heading-3 mb-2">No tools found</h3>
            <p className="brand-text-body">
              Try adjusting your search terms or browse by category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                onClick={() => trackToolUsage(tool.name)}
                className="brand-scale-hover"
              >
                <ToolCard tool={tool} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToolsContent />
    </Suspense>
  );
}

import Link from 'next/link';
import { TOOLS, CATEGORY_URL_MAP } from '@/constants';
import type { Tool } from '@/types';

interface RelatedToolsProps {
  currentToolId: string;
  category: Tool['category'];
  limit?: number;
}

// Pure server component: renders a static internal-link block below the tool UI.
// SEO purpose: gives Google topical clusters + per-tool internal links so
// "Discovered, not indexed" pages gain a stronger crawl signal. Each anchor uses
// the tool's own name as link text (descriptive, not "click here").
export default function RelatedTools({
  currentToolId,
  category,
  limit = 6,
}: RelatedToolsProps) {
  const siblings = TOOLS.filter(t => t.category === category && t.id !== currentToolId);
  if (siblings.length === 0) return null;

  const picks = siblings.slice(0, limit);
  const categorySlug = CATEGORY_URL_MAP[category];
  // Enum values include a trailing " Tools" (e.g. "Coding Tools") which would
  // double-up in headings like "More Coding Tools tools". Strip for display.
  const categoryLabel = category.replace(/\s+Tools$/i, '');

  return (
    <section
      aria-labelledby="related-tools-heading"
      className="mx-auto mt-12 max-w-5xl border-t border-gray-200 px-4 py-10 dark:border-gray-700"
    >
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2
          id="related-tools-heading"
          className="text-2xl font-bold text-gray-900 dark:text-gray-100"
        >
          More {categoryLabel} tools
        </h2>
        <Link
          href={`/tools/category/${categorySlug}`}
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          See all {categoryLabel} tools →
        </Link>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map(tool => (
          <li key={tool.id}>
            <Link
              href={`/tools/${tool.id}`}
              className="group block rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-700"
            >
              <div className="mb-1 font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                {tool.name}
              </div>
              <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                {tool.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

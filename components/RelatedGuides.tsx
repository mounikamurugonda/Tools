import Link from 'next/link';
import { blogs } from '@/lib/blogs';
import { TOOLS } from '@/constants';

interface RelatedGuidesProps {
  toolId: string;
  limit?: number;
}

// Server component: surfaces blog posts that reference this tool (via the blog's
// `relatedTools` array). SEO purpose: gives every guide inbound internal links
// from the tool it covers — a strong signal for blog posts stuck in
// "Discovered, not indexed" — and adds editorial depth to the tool page.
export default function RelatedGuides({ toolId, limit = 3 }: RelatedGuidesProps) {
  const toolName = TOOLS.find(t => t.id === toolId)?.name ?? '';

  // Relevance score, highest signal first:
  //  1. The guide's TITLE names this tool (a dedicated guide, not a round-up).
  //  2. The tool is the PRIMARY topic (first in the guide's relatedTools).
  //  3. The guide is focused (references few tools).
  // Ties break by recency. This keeps a tool's dedicated guide on top instead
  // of letting a newer generic round-up that happens to list it first win.
  const score = (b: (typeof blogs)[number]) => {
    const tools = b.relatedTools ?? [];
    const idx = tools.indexOf(toolId);
    const titleBonus =
      toolName && b.title.toLowerCase().includes(toolName.toLowerCase()) ? 5000 : 0;
    const primaryBonus = idx === 0 ? 1000 : idx === 1 ? 200 : 0;
    const focusBonus = Math.max(0, 50 - tools.length); // fewer tools => more focused
    return titleBonus + primaryBonus + focusBonus;
  };

  const guides = blogs
    .filter(b => b.relatedTools?.includes(toolId))
    .sort((a, b) => {
      const s = score(b) - score(a);
      if (s !== 0) return s;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);

  if (guides.length === 0) return null;

  return (
    <section
      aria-labelledby="related-guides-heading"
      className="mx-auto mt-8 max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
    >
      <h2
        id="related-guides-heading"
        className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100"
      >
        Guides &amp; tutorials
      </h2>
      <ul className="space-y-3">
        {guides.map(guide => (
          <li key={guide.id}>
            <Link
              href={`/blogs/${guide.id}`}
              className="group block rounded-lg p-2 transition hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <div className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                {guide.title}
              </div>
              <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                {guide.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

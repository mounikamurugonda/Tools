import { MetadataRoute } from 'next';
import { TOOLS, CATEGORY_URL_MAP } from '@/constants';
import { blogs } from '@/lib/blogs';
import { getCategorySlug } from '@/lib/slugUtils';

// Stable build-time date. Using `new Date()` per-call makes Google see every URL
// as "modified" on every fetch, which devalues lastmod as a signal. We pin to a
// monthly stamp so genuine content changes (deploys) bump it without churn.
const BUILD_DATE = new Date(
  `${new Date().getUTCFullYear()}-${String(new Date().getUTCMonth() + 1).padStart(2, '0')}-01T00:00:00Z`
);

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://utiltoolkits.com';

  const highPriorityRoutes = [
    {
      url: baseUrl,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  const toolRoutes = TOOLS.map(tool => {
    const highPriorityTools = [
      // AI tools — new category, gets highest priority for indexing
      'ai-token-counter',
      'ai-prompt-builder',
      'ai-model-comparator',
      'prompt-template-library',
      'context-window-calculator',
      'csv-to-prompt',
      'json-to-prompt',
      // Evergreen popular tools
      'json-formatter',
      'base64-converter',
      'password-generator',
      'image-compressor',
      'uuid-generator',
    ];
    const priority = highPriorityTools.includes(tool.id) ? 0.9 : 0.7;

    return {
      url: `${baseUrl}/tools/${tool.id}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority,
    };
  });

  const toolCategoryRoutes = Object.values(CATEGORY_URL_MAP).map(categorySlug => ({
    url: `${baseUrl}/tools/category/${categorySlug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const highPriorityBlogs = [
    'stop-wasting-ai-tokens-on-file-converters',
    'best-ai-tools-browser-2026',
    'large-dataset-ai-tools-guide',
  ];

  const blogRoutes = blogs.map(blog => ({
    url: `${baseUrl}/blogs/${blog.id}`,
    lastModified: new Date(blog.updatedDate || blog.date || BUILD_DATE),
    changeFrequency: 'monthly' as const,
    priority: highPriorityBlogs.includes(blog.id) ? 0.85 : 0.7,
  }));

  const blogCategories = Array.from(new Set(blogs.map(blog => blog.category)));
  const blogCategoryRoutes = blogCategories.map(category => ({
    url: `${baseUrl}/blogs/category/${getCategorySlug(category)}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const staticRoutes = [
    { path: '/about', priority: 0.5 },
    { path: '/contact', priority: 0.5 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
    { path: '/credits', priority: 0.3 },
  ].map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'yearly' as const,
    priority: route.priority,
  }));

  // Product routes. Note: code-cast subroutes live under the route group
  // `app/product/code-cast/(tool)/...` — parens are Next.js route groups and
  // do NOT appear in the URL, so /product/code-cast/animate etc. are valid.
  // Removed only: /product/ai-content-detector/detect (page sets robots:{index:false} → sitemap/noindex contradiction).
  const productRoutes = [
    {
      url: `${baseUrl}/product/code-cast`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/product/code-cast/animate`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/product/code-cast/image`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/product/code-cast/type`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/product/code-cast/library`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/product/code-cast/saved`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/product/code-cast/videos`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/product/ai-content-detector`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  return [
    ...highPriorityRoutes,
    ...productRoutes,
    ...toolRoutes,
    ...toolCategoryRoutes,
    ...blogRoutes,
    ...blogCategoryRoutes,
    ...staticRoutes,
  ];
}
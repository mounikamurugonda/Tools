import { MetadataRoute } from 'next';
import { TOOLS, CATEGORY_URL_MAP } from '@/constants';
import { blogs } from '@/lib/blogs';
import { getCategorySlug } from '@/lib/slugUtils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://utiltoolkits.com';

  // High priority pages
  const highPriorityRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Tool routes with dynamic priorities based on popularity
  const toolRoutes = TOOLS.map(tool => {
    // Assign higher priority to popular tools
    const popularTools = [
      'json-formatter',
      'base64-converter',
      'password-generator',
      'image-compressor',
      'uuid-generator',
    ];
    const priority = popularTools.includes(tool.id) ? 0.8 : 0.7;

    return {
      url: `${baseUrl}/tools/${tool.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
    };
  });

  // Tool Category routes
  const toolCategoryRoutes = Object.values(CATEGORY_URL_MAP).map(categorySlug => ({
    url: `${baseUrl}/tools/category/${categorySlug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog Post routes
  const blogRoutes = blogs.map(blog => ({
    url: `${baseUrl}/blogs/${blog.id}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog Category routes
  const blogCategories = Array.from(new Set(blogs.map(blog => blog.category)));
  const blogCategoryRoutes = blogCategories.map(category => ({
    url: `${baseUrl}/blogs/category/${getCategorySlug(category)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Static pages
  const staticRoutes = [
    { path: '/about', priority: 0.5 },
    { path: '/contact', priority: 0.5 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
    { path: '/credits', priority: 0.3 },
  ].map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: route.priority,
  }));

  return [
    ...highPriorityRoutes,
    ...toolRoutes,
    ...toolCategoryRoutes,
    ...blogRoutes,
    ...blogCategoryRoutes,
    ...staticRoutes,
  ];
}

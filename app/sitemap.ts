import { MetadataRoute } from 'next';
import { TOOLS } from '@/constants';

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
      url: `${baseUrl}/tips`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Tool routes with dynamic priorities based on popularity
  const toolRoutes = TOOLS.map((tool) => {
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

  // Category routes
  const categoryRoutes = [
    'text',
    'image',
    'video',
    'converter',
    'generator',
    'calculator',
    'analyzer',
  ].map((category) => ({
    url: `${baseUrl}/tools/category/${category}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Tips category routes
  const tipsCategoryRoutes = [
    'productivity',
    'coding',
    'design',
    'workflow',
    'tools',
  ].map((category) => ({
    url: `${baseUrl}/tips/category/${category}`,
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
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: route.priority,
  }));

  return [
    ...highPriorityRoutes,
    ...toolRoutes,
    ...categoryRoutes,
    ...tipsCategoryRoutes,
    ...staticRoutes,
  ];
}

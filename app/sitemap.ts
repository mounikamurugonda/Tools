import { MetadataRoute } from 'next';
import { TOOLS } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://utiltoolkits.com'; // TODO: Replace with your production URL

  const toolRoutes = TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticRoutes = ['/about', '/contact', '/privacy', '/terms'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...staticRoutes,
    ...toolRoutes,
  ];
}

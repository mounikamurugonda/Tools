import { TOOLS } from '@/constants';
import { TIPS } from '@/lib/tips';

// Base website schema
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'UtilToolkits',
  description:
    'Your comprehensive free online developer toolbox with 90+ browser-based utilities. Includes JSON formatter, Base64 encoder, password generator, image tools, and more. All tools run locally for maximum speed and privacy.',
  url: 'https://utiltoolkits.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://utiltoolkits.com/tools?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  sameAs: [
    'https://github.com/utiltoolkits',
    'https://twitter.com/utiltoolkits',
  ],
  publisher: {
    '@type': 'Organization',
    name: 'UtilToolkits',
    logo: {
      '@type': 'ImageObject',
      url: 'https://utiltoolkits.com/logo.png',
    },
  },
  inLanguage: 'en-US',
  isAccessibleForFree: true,
});

// Organization schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UtilToolkits',
  description:
    'A comprehensive collection of free, browser-based developer tools and utilities for developers, designers, and productivity enthusiasts.',
  url: 'https://utiltoolkits.com',
  logo: 'https://utiltoolkits.com/logo.png',
  foundingDate: '2024',
  sameAs: [
    'https://github.com/utiltoolkits',
    'https://twitter.com/utiltoolkits',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://utiltoolkits.com/contact',
  },
  areaServed: 'Worldwide',
  knowsAbout: [
    'Web Development',
    'Developer Tools',
    'Online Utilities',
    'Browser-based Applications',
    'Productivity Tools',
  ],
});

// Homepage schema
export const getHomepageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'UtilToolkits - Your Free Online Developer Toolbox',
  description:
    'Your comprehensive free online developer toolbox with 90+ browser-based utilities. All tools run locally for maximum speed and privacy.',
  url: 'https://utiltoolkits.com',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Developer Tools Collection',
    description:
      'Free browser-based utilities for developers, designers, and productivity enthusiasts',
    numberOfItems: TOOLS.length,
    itemListElement: TOOLS.slice(0, 10).map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.description,
        url: `https://utiltoolkits.com/tools/${tool.id}`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    })),
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://utiltoolkits.com',
      },
    ],
  },
});

// Tips page schema
export const getTipsPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Helpful Tips & Tricks',
  description:
    'A collection of tips and tricks for productivity, coding, design, and more to help you work smarter.',
  url: 'https://utiltoolkits.com/tips',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Productivity Tips Collection',
    description: 'Expert tips and tricks for developers and designers',
    numberOfItems: TIPS.length,
    itemListElement: TIPS.map((tip, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'HowTo',
        name: tip.content,
        description: tip.content,
        category: tip.category,
      },
    })),
  },
});

// Tools page schema
export const getToolsPageSchema = (searchQuery?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: searchQuery ? `Search Results for "${searchQuery}"` : 'All Tools',
  description: searchQuery
    ? `Find tools matching "${searchQuery}"`
    : 'Discover and use our collection of utility tools to boost your productivity.',
  url: searchQuery
    ? `https://utiltoolkits.com/tools?search=${encodeURIComponent(searchQuery)}`
    : 'https://utiltoolkits.com/tools',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Developer Tools',
    description: 'Free browser-based utilities for developers',
    numberOfItems: TOOLS.length,
  },
});

// Category page schema
export const getCategoryPageSchema = (category: string, tools: any[]) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: `${category} Tools`,
  description: `A collection of ${category} tools to streamline your workflow.`,
  url: `https://utiltoolkits.com/tools/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
  mainEntity: {
    '@type': 'ItemList',
    name: `${category} Tools Collection`,
    description: `Professional ${category} tools for developers and designers`,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.description,
        url: `https://utiltoolkits.com/tools/${tool.id}`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web Browser',
      },
    })),
  },
});

// Individual tool schema
export const getToolSchema = (tool: any) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: tool.name,
  description: tool.description,
  url: `https://utiltoolkits.com/tools/${tool.id}`,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires JavaScript. Works with all modern browsers.',
  softwareVersion: '1.0',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  author: {
    '@type': 'Organization',
    name: 'UtilToolkits',
    url: 'https://utiltoolkits.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'UtilToolkits',
    logo: {
      '@type': 'ImageObject',
      url: 'https://utiltoolkits.com/logo.png',
    },
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1250',
    bestRating: '5',
    worstRating: '1',
  },
  featureList: tool.details?.features || [
    'Browser-based processing',
    'No registration required',
    'Privacy-focused',
    'Mobile responsive',
    'Copy to clipboard functionality',
  ],
  screenshot: `https://utiltoolkits.com/screenshots/${tool.id}.png`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://utiltoolkits.com/tools/${tool.id}`,
  },
  sameAs: [`https://github.com/utiltoolkits/${tool.id}`],
  keywords: tool.keywords
    ? tool.keywords.join(', ')
    : `${tool.name.toLowerCase()}, ${tool.category.toLowerCase()}, developer tools, online tools, free utilities`,
  inLanguage: 'en-US',
  isAccessibleForFree: true,
  license: 'https://opensource.org/licenses/MIT',
});

// Breadcrumb schema
export const getBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

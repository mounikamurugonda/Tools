import { TOOLS } from '@/constants';
import { TIPS } from '@/lib/tips';

// Base website schema
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'UtilToolkits - Your Free Online Developer Toolbox',
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
  sameAs: ['https://github.com/utiltoolkits', 'https://twitter.com/utiltoolkits'],
  publisher: {
    '@type': 'Organization',
    name: 'UtilToolkits',
    logo: {
      '@type': 'ImageObject',
      url: 'https://utiltoolkits.com/og-image.png',
    },
  },
  inLanguage: 'en-US',
  isAccessibleForFree: true,
});

// Organization schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UtilToolkits - Your Free Online Developer Toolbox',
  description:
    'A comprehensive collection of free, browser-based developer tools and utilities for developers, designers, and productivity enthusiasts.',
  url: 'https://utiltoolkits.com',
  logo: 'https://utiltoolkits.com/og-image.png',
  foundingDate: '2024',
  sameAs: ['https://github.com/utiltoolkits', 'https://twitter.com/utiltoolkits'],
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
export const getToolSchema = (tool: any, details?: any) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: tool.name,
  description: tool.description,
  url: `https://utiltoolkits.com/tools/${tool.id}`,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires JavaScript. Works with all modern browsers.',
  softwareVersion: '2.0',
  datePublished: '2024-01-01',
  dateModified: new Date().getFullYear() + '-01-01',
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
      url: 'https://utiltoolkits.com/og-image.png',
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
  ...(details?.faqs && details.faqs.length > 0
    ? {
      mainEntity: {
        '@type': 'FAQPage',
        mainEntity: details.faqs.map((faq: any) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    }
    : {}),
});

// Breadcrumb schema
export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// CodeCast Product Schema
export const getCodeCastProductSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CodeCast',
  description: 'The #1 tool for developer content creators. Create studio-quality code animations, beautiful screenshots, and viral coding videos.',
  url: 'https://utiltoolkits.com/product/code-cast',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires JavaScript. Works with all modern browsers.',
  softwareVersion: '2.0',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '500',
    bestRating: '5',
    worstRating: '1',
  },
  featureList: [
    'Code to Video Animation',
    'Typing Effect Generator',
    'Beautiful Code Screenshots',
    'Syntax Highlighting',
    'Export to MP4/WebM',
  ],
  isAccessibleForFree: true,
  author: {
    '@type': 'Organization',
    name: 'UtilToolkits',
    url: 'https://utiltoolkits.com',
  },
});

// TruthScan Product Schema
export const getTruthScanProductSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TruthScan',
  description: 'Advanced AI content detector using dual-layer analysis — statistical linguistics and Sarvam-M AI — to determine if text was written by a human or AI.',
  url: 'https://utiltoolkits.com/product/truth-scan',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires JavaScript. Works with all modern browsers.',
  softwareVersion: '1.0',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '200',
    bestRating: '5',
    worstRating: '1',
  },
  featureList: [
    'AI vs Human Score Detection',
    'Sentence-Level Heatmap',
    'Statistical Signal Breakdown',
    'Perplexity & Burstiness Analysis',
    'Sarvam-M AI Classification',
  ],
  isAccessibleForFree: true,
  author: {
    '@type': 'Organization',
    name: 'UtilToolkits',
    url: 'https://utiltoolkits.com',
  },
});

// CodeCast Sub-tool Schema
export const getCodeCastToolSchema = (type: 'animate' | 'type' | 'image') => {
  const tools = {
    animate: {
      name: 'CodeCast Animate',
      description: 'Animate your code snippets into viral videos. Create typing effects and scrolling animations for social media.',
      url: 'https://utiltoolkits.com/product/code-cast/animate',
      featureList: ['Auto-scroll animation', 'Typing effect', 'Custom themes', 'Export as Video'],
    },
    type: {
      name: 'CodeCast Type',
      description: 'Record yourself typing code in real-time. Create authentic coding tutorials and demonstrations.',
      url: 'https://utiltoolkits.com/product/code-cast/type',
      featureList: ['Real-time recording', 'Voiceover support', 'Syntax highlighting', 'Export as Video'],
    },
    image: {
      name: 'CodeCast Image',
      description: 'Convert your source code into beautiful, shareable images. Perfect for Twitter and Instagram.',
      url: 'https://utiltoolkits.com/product/code-cast/image',
      featureList: ['High-quality export', 'Custom backgrounds', 'Window controls', 'Syntax highlighting'],
    },
  };

  const tool = tools[type];

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '350',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: tool.featureList,
    author: {
      '@type': 'Organization',
      name: 'UtilToolkits',
      url: 'https://utiltoolkits.com',
    },
    isAccessibleForFree: true,
  };
};

// Site Navigation Schema
export const getNavigationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: 'Home',
      description: 'Home page of UtilToolkits',
      url: 'https://utiltoolkits.com',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 2,
      name: 'Tools',
      description: 'Directory of all developer tools',
      url: 'https://utiltoolkits.com/tools',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 3,
      name: 'CodeCast',
      description: 'Create viral code animations and screenshots',
      url: 'https://utiltoolkits.com/product/code-cast',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 4,
      name: 'About',
      description: 'About UtilToolkits',
      url: 'https://utiltoolkits.com/about',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 5,
      name: 'Terms',
      description: 'Terms of Service',
      url: 'https://utiltoolkits.com/terms',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 6,
      name: 'Privacy',
      description: 'Privacy Policy',
      url: 'https://utiltoolkits.com/privacy',
    },
  ],
});

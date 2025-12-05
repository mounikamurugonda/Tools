import {
  TOOLS,
  CATEGORY_ORDER,
  CATEGORY_CONTENT,
  URL_TO_CATEGORY_MAP,
  CATEGORY_URL_MAP,
  CATEGORY_ICONS,
} from '@/constants';
import ToolCard from '@/components/ToolCard';
import {
  getCategoryPageSchema,
  getWebsiteSchema,
  getOrganizationSchema,
  getBreadcrumbSchema,
} from '@/lib/schema';
import Schema from '@/components/Schema';
import AnalyticsWrapper from '@/components/AnalyticsWrapper';
import Link from 'next/link';
import { ToolCategory } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

type Props = {
  params: { categoryName: string };
};

const getCategoryFromParam = (param: string): ToolCategory | undefined => {
  return URL_TO_CATEGORY_MAP[param];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryFromParam(params.categoryName);

  if (!category) {
    return {
      title: 'Category Not Found | UtilToolkits',
      description:
        'The requested category could not be found. Browse our collection of free online developer tools.',
    };
  }

  const tools = TOOLS.filter((tool) => tool.category === category);
  const content = CATEGORY_CONTENT[category];
  const enhancedDescription = `${content.introduction} Discover our collection of free ${category.toLowerCase()} tools for developers and designers. All tools run locally in your browser for maximum privacy and speed.`;

  return {
    title: `${category} Tools - Free Online Utilities | UtilToolkits`,
    description: enhancedDescription,
    keywords: `${category.toLowerCase()}, tools, utilities, developers, ${category.toLowerCase().replace(/\s+/g, ',')}, free online tools, browser tools, developer utilities, productivity tools`,
    authors: [{ name: 'UtilToolkits Team' }],
    creator: 'UtilToolkits',
    publisher: 'UtilToolkits',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: `${category} Tools - Free Online Utilities | UtilToolkits`,
      description: enhancedDescription,
      type: 'website',
      url: `https://utiltoolkits.com/tools/category/${params.categoryName}`,
      siteName: 'UtilToolkits',
      images: [
        {
          url: `https://utiltoolkits.com/og-${params.categoryName}.png`,
          width: 1200,
          height: 630,
          alt: `${category} Tools - Free Online Utilities`,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category} Tools - Free Online Utilities`,
      description: enhancedDescription,
      images: [`https://utiltoolkits.com/og-${params.categoryName}.png`],
      creator: '@utiltoolkits',
    },
    alternates: {
      canonical: `/tools/category/${params.categoryName}`,
    },
    other: {
      'theme-color': '#3b82f6',
      'msapplication-TileColor': '#3b82f6',
    },
  };
}

export async function generateStaticParams() {
  return CATEGORY_ORDER.map((category) => ({
    categoryName: CATEGORY_URL_MAP[category],
  }));
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryFromParam(params.categoryName);

  if (!category) {
    notFound();
  }

  const tools = TOOLS.filter((tool) => tool.category === category);
  const content = CATEGORY_CONTENT[category];

  const breadcrumbItems = [
    { name: 'Home', url: 'https://utiltoolkits.com' },
    { name: 'Tools', url: 'https://utiltoolkits.com/tools' },
    {
      name: `${category} Tools`,
      url: `https://utiltoolkits.com/tools/category/${params.categoryName}`,
    },
  ];

  return (
    <AnalyticsWrapper pageType="category" categoryName={category}>
      {/* Schema Markup */}
      <Schema schema={getWebsiteSchema()} />
      <Schema schema={getOrganizationSchema()} />
      <Schema schema={getCategoryPageSchema(category, tools)} />
      <Schema schema={getBreadcrumbSchema(breadcrumbItems)} />

      <div className="p-4 sm:p-6 md:p-8">
        {/* Category Header */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {category} Tools
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {content.introduction}
              </p>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="block group"
              >
                <ToolCard tool={tool} />
              </Link>
            ))}
          </div>

          {tools.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-gray-400">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Tools Available Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                We&apos;re working hard to add more {category.toLowerCase()}{' '}
                tools. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              All our {category.toLowerCase()} tools are free to use, work
              entirely in your browser, and don&apos;t require any downloads or
              installations. Simply click on any tool above to start using it
              right away!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Free to use
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                No registration required
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Privacy-focused
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Works offline
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnalyticsWrapper>
  );
}

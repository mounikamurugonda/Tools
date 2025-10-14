import { TOOLS, CATEGORY_ORDER, CATEGORY_CONTENT, URL_TO_CATEGORY_MAP, CATEGORY_URL_MAP, CATEGORY_ICONS } from '@/constants';
import ToolCard from '@/components/ToolCard';
import { InlineAd, BannerAd } from '@/components/AdContainer';
import { getCategoryPageSchema, getWebsiteSchema, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
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
      title: 'Category Not Found',
    };
  }

  const tools = TOOLS.filter(tool => tool.category === category);
  const content = CATEGORY_CONTENT[category];

  return {
    title: `${category} Tools | UtilToolkits`,
    description: content.introduction,
    keywords: `${category.toLowerCase()}, tools, utilities, developers, ${category.toLowerCase().replace(/\s+/g, ',')}`,
    authors: [{ name: 'UtilToolkits Team' }],
    openGraph: {
      title: `${category} Tools | UtilToolkits`,
      description: content.introduction,
      type: 'website',
      url: `https://utiltoolkits.com/tools/category/${params.categoryName}`,
      siteName: 'UtilToolkits',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category} Tools | UtilToolkits`,
      description: content.introduction,
    },
    alternates: {
      canonical: `/tools/category/${params.categoryName}`,
    },
  };
}

export async function generateStaticParams() {
  return CATEGORY_ORDER.map(category => ({
    categoryName: CATEGORY_URL_MAP[category],
  }));
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryFromParam(params.categoryName);

  if (!category) {
    notFound();
  }

  const tools = TOOLS.filter(tool => tool.category === category);
  const content = CATEGORY_CONTENT[category];

  const breadcrumbItems = [
    { name: 'Home', url: 'https://utiltoolkits.com' },
    { name: 'Tools', url: 'https://utiltoolkits.com/tools' },
    { name: `${category} Tools`, url: `https://utiltoolkits.com/tools/category/${params.categoryName}` }
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
            <div className="flex-shrink-0 mr-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                {React.createElement(CATEGORY_ICONS[category], { 
                  className: "w-8 h-8 text-white" 
                })}
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{category} Tools</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{content.introduction}</p>
            </div>
          </div>
        </div>
        
        {/* Banner Ad */}
        <BannerAd />
        
        {/* Tools Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map(tool => (
              <Link key={tool.id} href={`/tools/${tool.id}`} className="block group">
                <ToolCard tool={tool} />
              </Link>
            ))}
          </div>
          
          {tools.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-gray-400">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Tools Available Yet</h3>
              <p className="text-gray-500 dark:text-gray-400">We&apos;re working hard to add more {category.toLowerCase()} tools. Check back soon!</p>
            </div>
          )}
        </div>
        
        {/* Additional Information */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-8 mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              All our {category.toLowerCase()} tools are free to use, work entirely in your browser, and don&apos;t require any downloads or installations. 
              Simply click on any tool above to start using it right away!
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
        
        {/* Bottom Ad */}
        <InlineAd key="category-inline-ad" />
      </div>
    </AnalyticsWrapper>
  );
}

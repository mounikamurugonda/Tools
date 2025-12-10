import React from 'react';
import { TOOL_CONFIGS, getToolDetails } from '@/lib/tool-config';
import ToolLoader from '@/components/ToolLoader';
import {
  getToolSchema,
  getWebsiteSchema,
  getOrganizationSchema,
} from '@/lib/schema';
import Schema from '@/components/Schema';
import AnalyticsWrapper from '@/components/AnalyticsWrapper';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import BreadcrumbWrapper from '@/components/BreadcrumbWrapper';
import { TIPS } from '@/lib/tips';
import TipCard from '@/components/TipCard';
import ShareButton from '@/components/ShareButton';

type Props = {
  params: Promise<{ toolId: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { toolId } = await params;
  const tool = TOOL_CONFIGS.find((t) => t.id === toolId);

  if (!tool) {
    return {
      title: 'Tool Not Found | UtilToolkits',
      description:
        'The requested tool could not be found. Browse our collection of free online developer tools.',
    };
  }

  const title =
    tool.seoTitle || `${tool.name} - Free Online Tool | UtilToolkits`;
  const description =
    tool.seoDescription ||
    `${tool.description} Free browser-based ${tool.name.toLowerCase()} tool with no registration required. All processing happens locally for maximum privacy and speed.`;

  return {
    title,
    description,
    keywords: tool.keywords
      ? [
        ...tool.keywords,
        'developer tools',
        'online tools',
        'free utilities',
        'browser tools',
        'privacy tools',
        'no registration required',
      ]
      : `${tool.name.toLowerCase()}, ${tool.category.toLowerCase()}, developer tools, online tools, free utilities, browser tools`,
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
    alternates: {
      canonical: `/tools/${tool.id}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://utiltoolkits.com/tools/${tool.id}`,
      siteName: 'UtilToolkits',
      images: [
        {
          url: `https://utiltoolkits.com/og-${tool.id}.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} - Free Online Tool`,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - Free Online Tool`,
      description,
      images: [`https://utiltoolkits.com/og-${tool.id}.png`],
      creator: '@utiltoolkits',
    },
    other: {
      'theme-color': '#3b82f6',
      'msapplication-TileColor': '#3b82f6',
    },
  };
}

export async function generateStaticParams() {
  return TOOL_CONFIGS.map((tool) => ({
    toolId: tool.id,
  }));
}

export default async function ToolPage({ params }: { params: Promise<{ toolId: string }> }) {
  const { toolId } = await params;
  const tool = TOOL_CONFIGS.find((t) => t.id === toolId);

  if (!tool) {
    notFound();
  }

  const toolDetails = getToolDetails(tool.id);
  const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];

  return (
    <AnalyticsWrapper pageType="tool" toolName={tool.name}>
      {/* Schema Markup */}
      <Schema schema={getWebsiteSchema()} />
      <Schema schema={getOrganizationSchema()} />
      <Schema schema={getToolSchema(tool)} />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <ToolLoader toolId={tool.id} details={toolDetails} />
        <TipCard tip={randomTip} />
      </div>
    </AnalyticsWrapper>
  );
}


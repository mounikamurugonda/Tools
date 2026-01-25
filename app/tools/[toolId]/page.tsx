import { TOOLS, getToolDetails } from '@/constants';
import ToolLoader from '@/components/ToolLoader';
import { getToolSchema, getBreadcrumbSchema } from '@/lib/schema';
import Schema from '@/components/Schema';
import AnalyticsWrapper from '@/components/AnalyticsWrapper';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { TIPS } from '@/lib/tips';
import TipCard from '@/components/TipCard';
import type { ToolData } from '@/types';

type Props = {
  params: Promise<{ toolId: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { toolId } = await params;
  const tool = TOOLS.find(t => t.id === toolId);

  if (!tool) {
    return {
      title: 'Tool Not Found | UtilToolkits',
      description:
        'The requested tool could not be found. Browse our collection of free online developer tools.',
    };
  }

  const title = tool.seoTitle || `${tool.name} - Free Online Tool`;
  const description =
    tool.seoDescription ||
    `${tool.description} Free browser-based ${tool.name.toLowerCase()} tool with no registration required. All processing happens locally for maximum privacy and speed.`;

  // Explicitly inherit icons from parent to ensure favicon consistency
  const parentIcons = (await parent).icons;

  return {
    icons: parentIcons,
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
  return TOOLS.map(tool => ({
    toolId: tool.id,
  }));
}

export default async function ToolPage({ params }: { params: Promise<{ toolId: string }> }) {
  const { toolId } = await params;
  const tool = TOOLS.find(t => t.id === toolId);

  if (!tool) {
    notFound();
  }

  const toolDetails = getToolDetails(tool.id);
  const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];

  const toolData: ToolData = {
    id: tool.id,
    name: tool.name,
    description: tool.description,
    category: tool.category,
    seoTitle: tool.seoTitle,
    seoDescription: tool.seoDescription,
    featured: tool.featured,
    keywords: tool.keywords,
    tags: tool.tags,
  };

  return (
    <AnalyticsWrapper pageType="tool" toolName={tool.name}>
      {/* Schema Markup */}
      <Schema schema={getToolSchema(tool, toolDetails)} />
      <Schema
        schema={getBreadcrumbSchema([
          { name: 'Home', url: 'https://utiltoolkits.com' },
          { name: 'Tools', url: 'https://utiltoolkits.com/tools' },
          { name: tool.name, url: `https://utiltoolkits.com/tools/${tool.id}` },
        ])}
      />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <ToolLoader toolId={tool.id} details={toolDetails} tool={toolData} />
        <TipCard tip={randomTip} />
      </div>
    </AnalyticsWrapper>
  );
}

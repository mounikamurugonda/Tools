import React from 'react';
import { TOOLS } from "@/constants";
import { getToolSchema, getWebsiteSchema, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import Schema from '@/components/Schema';
import AnalyticsWrapper from '@/components/AnalyticsWrapper';
import ViewCount from '@/components/ViewCount';
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { toolId: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const tool = TOOLS.find(t => t.id === params.toolId);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }
 
  return {
    title: `${tool.name} | UtilToolkits`,
    description: tool.description,
    keywords: `${tool.name.toLowerCase()}, ${tool.category.toLowerCase()}, developer tools, online tools, free utilities`,
    authors: [{ name: 'UtilToolkits Team' }],
    alternates: {
      canonical: `/tools/${tool.id}`,
    },
    openGraph: {
      title: `${tool.name} | UtilToolkits`,
      description: tool.description,
      type: 'website',
      url: `https://utiltoolkits.com/tools/${tool.id}`,
      siteName: 'UtilToolkits',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | UtilToolkits`,
      description: tool.description,
    },
  }
}

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    toolId: tool.id,
  }));
}

export default function ToolPage({ params }: { params: { toolId: string } }) {
  const tool = TOOLS.find(t => t.id === params.toolId);
  
  if (!tool) {
    notFound();
  }

  const ToolComponent = tool.component;

  const breadcrumbItems = [
    { name: 'Home', url: 'https://utiltoolkits.com' },
    { name: 'Tools', url: 'https://utiltoolkits.com/tools' },
    { name: tool.category, url: `https://utiltoolkits.com/tools/category/${tool.category.toLowerCase().replace(/\s+/g, '-')}` },
    { name: tool.name, url: `https://utiltoolkits.com/tools/${tool.id}` }
  ];

  return (
    <AnalyticsWrapper pageType="tool" toolName={tool.name}>
      {/* Schema Markup */}
      <Schema schema={getWebsiteSchema()} />
      <Schema schema={getOrganizationSchema()} />
      <Schema schema={getToolSchema(tool)} />
      <Schema schema={getBreadcrumbSchema(breadcrumbItems)} />
      
      <ToolComponent details={tool.details} toolId={tool.id} />
    </AnalyticsWrapper>
  );
}

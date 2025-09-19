import { TOOLS } from "@/constants";
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
    title: tool.name,
    description: tool.description,
    alternates: {
      canonical: `/tools/${tool.id}`,
    },
    openGraph: {
      title: `${tool.name} | UtilToolkits`,
      description: tool.description,
    },
    twitter: {
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

  return <ToolComponent details={tool.details} />;
}

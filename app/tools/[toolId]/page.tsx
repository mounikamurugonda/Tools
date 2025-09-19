
import { TOOLS } from "@/constants";
import { notFound } from "next/navigation";

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

  return <ToolComponent />;
}

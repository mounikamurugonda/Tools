'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { ToolProps, ToolData } from '@/types';
import { TOOL_COMPONENT_MAP } from '@/constants';
import { ToolSkeleton } from '@/components/SkeletonLoader';
import BreadcrumbWrapper from './BreadcrumbWrapper';
import ToolDescription from './ToolDescription';
import ToolCredits from './ToolCredits';
import { SITE_CREDITS, TOOL_CREDITS } from '@/lib/credits';

interface ToolLoaderProps {
  toolId: string;
  details: ToolProps['details'];
  tool?: ToolData;
  children?: React.ReactNode;
}

/**
 * Client-side tool loader that dynamically imports tools on-demand
 * This component avoids bundling all 80+ tools into the initial page load
 * Each tool is loaded only when the user navigates to it
 */
const ToolLoader: React.FC<ToolLoaderProps> = ({ toolId, details, tool, children }) => {
  // Get the component name from the mapping
  const componentName = TOOL_COMPONENT_MAP[toolId];

  if (!componentName) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>Tool not found: {toolId}</p>
      </div>
    );
  }

  // Dynamically import the tool component with ssr: false
  // This ensures the component is only loaded in the browser
  const DynamicToolComponent = dynamic(() => import(`@/tools/${componentName}`), {
    loading: () => <ToolSkeleton />,
  }) as React.ComponentType<ToolProps>;

  const creditItems = [...(toolId ? TOOL_CREDITS[toolId] || [] : []), ...SITE_CREDITS];

  return (
    <Suspense fallback={<ToolSkeleton />}>
      {/* {children} */}
      <BreadcrumbWrapper />
      <DynamicToolComponent details={details} toolId={toolId} tool={tool} />
      {details && (
        <div className="animate-fade-in delay-500">
          <ToolDescription details={details} />
          <ToolCredits items={creditItems} />
        </div>
      )}
    </Suspense>
  );
};

export default ToolLoader;

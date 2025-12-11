'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { ToolProps } from '@/types';
import { TOOL_COMPONENT_MAP } from '@/lib/tool-config';
import { ToolSkeleton } from '@/components/SkeletonLoader';
import BreadcrumbWrapper from './BreadcrumbWrapper';

interface ToolLoaderProps {
  toolId: string;
  details: ToolProps['details'];
  children?: React.ReactNode;
}

/**
 * Client-side tool loader that dynamically imports tools on-demand
 * This component avoids bundling all 80+ tools into the initial page load
 * Each tool is loaded only when the user navigates to it
 */
const ToolLoader: React.FC<ToolLoaderProps> = ({ toolId, details, children }) => {
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
  const DynamicToolComponent = dynamic(
    () => import(`@/tools/${componentName}`),
    {
      loading: () => <ToolSkeleton />,
    },
  ) as React.ComponentType<ToolProps>;

  return (
    <Suspense fallback={<ToolSkeleton />}>
      {/* {children} */}
      <BreadcrumbWrapper />
      <DynamicToolComponent details={details} toolId={toolId} />
    </Suspense>
  );
};

export default ToolLoader;

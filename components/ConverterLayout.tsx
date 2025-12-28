'use client';

import React from 'react';
import { ToolDetails } from '@/types';
import ToolContainer from './ToolContainer';

interface ConverterLayoutProps {
  details: ToolDetails;
  toolId?: string;
  title: string;
  inputComponent: React.ReactNode;
  outputComponent: React.ReactNode;
  actions: React.ReactNode;
  options?: React.ReactNode;
}

/**
 * A specialized layout for converter tools (Input -> Actions -> Output)
 * Matches the "JSON Formatter" style reference.
 */
const ConverterLayout: React.FC<ConverterLayoutProps> = ({
  details,
  toolId,
  title,
  inputComponent,
  outputComponent,
  actions,
  options,
}) => {
  const [showScrollHint, setShowScrollHint] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      } else {
        setShowScrollHint(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ToolContainer
      title={title}
      details={details}
      toolId={toolId}
      // We can put global tool options in the header if desired, or keep them in the body
      headerContent={options}
    >
      <div className="flex flex-col h-[calc(100vh-250px)] min-h-[600px]">
        {/* Main 3-Column Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 overflow-hidden">
          {/* Left Column: Input */}
          <div className="flex-1 flex flex-col min-h-0 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/30 dark:bg-gray-900/30 overflow-hidden">
            <div className="flex-1 relative">{inputComponent}</div>
          </div>

          {/* Middle Column: Actions */}
          <div className="flex lg:flex-col items-center justify-center gap-4 py-2 lg:py-0">
            {actions}
          </div>

          {/* Right Column: Output */}
          <div className="flex-1 flex flex-col min-h-0 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/30 dark:bg-gray-900/30 overflow-hidden">
            <div className="flex-1 relative">{outputComponent}</div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div
          className={`text-center mt-4 text-gray-400 transition-opacity duration-500 ${showScrollHint ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="animate-bounce cursor-pointer flex flex-col items-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7-7-7"
              />
            </svg>
            <span className="text-xs mt-1">Scroll for details</span>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default ConverterLayout;

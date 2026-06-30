'use client';

import React from 'react';
import { TOOLS } from '../constants';
import Link from 'next/link';

const ExploreToolsSection = () => {
  // Optimize: Select only featured tools or limit to first 25 to improve performance
  // Rendering 200+ animated items caused layout thrashing & scroll lag
  const featuredTools = TOOLS.filter(t => t.featured);
  const displaySet = featuredTools.length > 10 ? featuredTools : TOOLS.slice(0, 25);
  const toolsToDisplay = [...displaySet, ...displaySet]; // Duplicate for seamless loop

  return (
    <section className="overflow-hidden relative py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-12 animate-fade-in relative z-10">
        <p className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide">
          Ecosystem
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 px-4 leading-tight">
          Explore Our Tools
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          A complete suite of utilities designed for modern development.
        </p>
      </div>

      <div className="relative w-full overflow-visible mask-fade-sides py-12">
        {/* Marquee Container - Added will-change-transform for performance */}
        <div className="flex w-[200%] animate-scroll pause-animation items-center will-change-transform">
          {toolsToDisplay.map((tool, index) => (
            <div
              key={`${tool.id}-${index}`}
              className="flex-shrink-0 mx-2 sm:mx-3 flex flex-col items-center justify-center"
            >
              {/* 
                 Floating Container 
                 Adjusted for smoother wave
               */}
              <div
                className="animate-float"
                style={{
                  animationDelay: `${index * 0.2}s`, // Sequential delay for a continuous wave
                  animationDuration: '5s',
                }}
              >
                <Link href={`/tools/${tool.id}`} className="block group relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:border-blue-400 dark:group-hover:border-blue-500 shadow-sm z-10 relative">
                    <div className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors transform scale-100 sm:scale-110">
                      {tool.icon}
                    </div>
                  </div>

                  {/* Beautiful Tooltip */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-max max-w-[150px] px-3 py-1.5 bg-gray-900/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-gray-900 text-[10px] sm:text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none shadow-xl z-20 text-center">
                    {tool.name}
                    {/* Tooltip Arrow */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 dark:bg-white/90 rotate-45"></div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for custom mask if not in globals */}
      <style jsx>{`
        .mask-fade-sides {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ExploreToolsSection;

'use client';

import React from 'react';
import { TOOLS } from '../constants';
import Link from 'next/link';

const ExploreToolsSection = () => {
  // Select a subset of tools or all tools to display
  // We'll duplicate the list to ensure seamless scrolling
  const toolsToDisplay = [...TOOLS, ...TOOLS];

  return (
    <section className=" overflow-hidden relative py-12 sm:py-16">
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
        {/* Marquee Container */}
        <div className="flex w-[200%] animate-scroll hover:pause-animation items-center">
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
                <Link href={`/tools/${tool.id}`} className="block group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:border-blue-400 dark:group-hover:border-blue-500 shadow-sm">
                    <div className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors transform scale-100 sm:scale-110">
                      {tool.icon}
                    </div>
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

import React from 'react';
import { useAnimateStore, useTypeStore, useImageStore } from '../store/useCodeCastStore';
import { usePathname } from 'next/navigation';

export const ProjectTitleDisplay = () => {
    const pathname = usePathname();
    const mode = pathname?.split('/').pop() as 'animate' | 'type' | 'image' | undefined;

    // Use the appropriate store based on the current route
    const animateStore = useAnimateStore();
    const typeStore = useTypeStore();
    const imageStore = useImageStore();

    const currentStore = mode === 'animate' ? animateStore : mode === 'type' ? typeStore : imageStore;
    const { projectTitle, showProjectInfo, projectTitleFontSize } = currentStore;

    if (!showProjectInfo || !projectTitle) return null;

    return (
        <div
            className={`
        w-full flex justify-center mb-4 z-20 
        transition-all duration-300 ease-in-out
        pointer-events-none select-none relative
      `}
        >
            <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md px-4 py-2 sm:px-6 rounded-2xl sm:rounded-full shadow-lg border border-white/10 max-w-[90%] md:max-w-2xl">
                <h1
                    className="font-bold text-white tracking-tight text-center break-words leading-tight transition-all duration-200 text-[14px] md:text-[24px]"
                    style={projectTitleFontSize > 0 ? { fontSize: `${projectTitleFontSize}px` } : undefined}
                >
                    {projectTitle}
                </h1>
            </div>
        </div>
    );
};

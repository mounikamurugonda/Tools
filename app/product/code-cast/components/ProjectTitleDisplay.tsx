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
    const { projectTitle, showProjectInfo, projectTitleFontSize, projectTitleColor, config } = currentStore;

    if (!showProjectInfo || !projectTitle) return null;

    return (
        <div
            className={`
        w-full flex justify-center z-20 
        transition-all duration-300 ease-in-out
        pointer-events-none select-none relative
      `}
            style={{ marginBottom: `${config?.canvasPadding ?? 16}px` }}
        >
            <div className="max-w-[90%] md:max-w-2xl">
                <h1
                    className="font-bold tracking-tight text-center break-words leading-tight transition-all duration-200"
                    style={{
                        fontSize: `${projectTitleFontSize || 14}px`,
                        color: projectTitleColor || '#FFFFFF'
                    }}
                >
                    {projectTitle}
                </h1>
            </div>
        </div>
    );
};

import React from 'react';
import { AppConfig } from '../types';
import { ProjectTitleDisplay } from './ProjectTitleDisplay';

interface AnimateCanvasProps {
    layout: any;
    config: AppConfig;
    children: React.ReactNode;
}

export const AnimateCanvas: React.FC<AnimateCanvasProps> = ({
    layout,
    config,
    children,
}) => {
    return (
        <div
            id="canvas-stage"
            className={`flex-1 flex flex-col ${config.background === 'codecast-gradient' ? 'bg-gradient-to-br from-blue-600 to-purple-600' : config.background} relative overflow-hidden`}
            style={{
                aspectRatio: layout.canvasAspectRatio,
                maxWidth: layout.maxWidth || 'none',
                maxHeight: layout.maxHeight || 'none',
                margin: layout.canvasAspectRatio ? 'auto' : undefined,
                padding: `${config.canvasPadding}px`,
            }}
        >
            <ProjectTitleDisplay />

            {/* Content Wrapper */}
            <div className={`flex-1 flex ${layout.flexDirection} ${layout.gap} w-full min-h-0`}>
                {children}
            </div>

            {/* Watermark */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${['instagram-square', 'linkedin-post', 'tiktok-shorts'].includes(config.deviceFrame)
                    ? ''
                    : 'md:left-auto md:right-6 md:translate-x-0'
                } flex items-center px-2 py-1 pointer-events-none z-20 opacity-20`}>
                <span className="text-[10px] font-medium text-white tracking-wide mix-blend-plus-lighter">
                    CodeCast by utiltoolkits.com
                </span>
            </div>
        </div>
    );
};

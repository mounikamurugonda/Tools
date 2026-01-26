import React from 'react';
import { AppConfig } from '../types';
import { ProjectTitleDisplay } from './ProjectTitleDisplay';
import { BackgroundRenderer, getContainerBackgroundClass } from './BackgroundRenderer';

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
            className={`flex-1 flex flex-col ${getContainerBackgroundClass(config.background)} relative shadow border overflow-hidden`}
            style={{
                aspectRatio: layout.canvasAspectRatio,
                maxWidth: layout.maxWidth || 'none',
                maxHeight: layout.maxHeight || 'none',
                margin: layout.canvasAspectRatio ? 'auto' : undefined,
                padding: `${config.canvasPadding}px`,
            }}
        >
            <BackgroundRenderer background={config.background} />
            <ProjectTitleDisplay />

            {/* Content Wrapper */}
            <div className={`flex-1 flex ${layout.flexDirection} ${layout.gap} w-full min-h-0 relative z-10`}>
                {children}
            </div>

            {/* Watermark */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${['instagram-square', 'linkedin-post', 'tiktok-shorts'].includes(config.deviceFrame)
                ? ''
                : 'md:left-auto md:right-6 md:translate-x-0'
                } flex items-center px-2 py-1 pointer-events-none z-20 opacity-50`}>
                <span className="text-[10px] font-medium text-white tracking-wide mix-blend-plus-lighter">
                    CodeCast by <span className="underline">utiltoolkits.com</span>
                </span>
            </div>
        </div>
    );
};

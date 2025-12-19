import { DeviceFrame } from '../types';

export interface CanvasLayoutConfig {
    flexDirection: 'flex-row' | 'flex-col';
    gap: string;
    padding: string; // Padding for canvas-stage
    canvasAspectRatio?: string; // Aspect ratio for the canvas-stage container
    maxWidth?: string; // Max width constraint for canvas
    maxHeight?: string; // Max height constraint for canvas
}

/**
 * Determines the canvas layout configuration based on the selected device frame.
 * Vertical frames (9:16, 4:5, 1:1) use column layout with aspect ratio constraints.
 * Horizontal/minimal frames (16:9, minimal) use side-by-side layout.
 */
export function getCanvasLayout(deviceFrame: DeviceFrame): CanvasLayoutConfig {
    switch (deviceFrame) {
        case 'tiktok-shorts': // 9:16 - Vertical
            return {
                flexDirection: 'flex-col',
                gap: 'gap-4',
                padding: 'p-4',
                canvasAspectRatio: '9 / 16',
                maxHeight: '90vh', // Constrain height for vertical videos
            };
        case 'linkedin-post': // 4:5 - Portrait
            return {
                flexDirection: 'flex-col',
                gap: 'gap-4',
                padding: 'p-4',
                canvasAspectRatio: '4 / 5',
                maxHeight: '85vh',
            };
        case 'instagram-square': // 1:1 - Square
            return {
                flexDirection: 'flex-col',
                gap: 'gap-4',
                padding: 'p-4',
                canvasAspectRatio: '1 / 1',
                maxHeight: '80vh',
            };
        case 'browser': // 16:9 - Desktop
            return {
                flexDirection: 'flex-row',
                gap: 'gap-6',
                padding: 'p-6',
                canvasAspectRatio: '16 / 9',
                maxWidth: '90vw',
            };
        case 'minimal': // Full width
        default:
            return {
                flexDirection: 'flex-row',
                gap: 'gap-6',
                padding: 'p-6',
            };
    }
}

/**
 * Gets the canvas style for preview frames based on device selection.
 */
export function getCanvasStyle(deviceFrame: DeviceFrame) {
    const base = {
        width: 'auto' as const,
        height: '100%' as const,
        maxHeight: '100%' as const,
        maxWidth: '100%' as const,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: 'all 0.5s ease-in-out',
    };

    switch (deviceFrame) {
        case 'tiktok-shorts':
            return { ...base, aspectRatio: '9 / 16' };
        case 'instagram-square':
            return { ...base, aspectRatio: '1 / 1' };
        case 'linkedin-post':
            return { ...base, aspectRatio: '4 / 5' };
        case 'browser':
            return { ...base, aspectRatio: '16 / 9' };
        case 'minimal':
        default:
            return { ...base, width: '100%', height: '100%' };
    }
}

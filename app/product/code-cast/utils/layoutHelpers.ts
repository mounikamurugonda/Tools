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
        maxHeight: '95vh', // Increased to fit more content
      };
    case 'linkedin-post': // 4:5 - Portrait
      return {
        flexDirection: 'flex-col',
        gap: 'gap-4',
        padding: 'p-4',
        canvasAspectRatio: '4 / 5',
        maxHeight: '92vh', // Increased to fit more content
      };
    case 'instagram-square': // 1:1 - Square
      return {
        flexDirection: 'flex-col',
        gap: 'gap-4',
        padding: 'p-4',
        canvasAspectRatio: '1 / 1',
        maxHeight: '90vh', // Increased to fit more content
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

/**
 * CSS Viewport Unit Transformation Utility
 * 
 * Transforms CSS viewport units (vh, vw, vmin, vmax) to use calc() with
 * CSS custom properties that represent container dimensions instead of
 * the browser viewport.
 * 
 * This is useful for rendering CSS in containers (like preview panels)
 * where viewport units should be relative to the container, not the window.
 */

/**
 * Transforms CSS viewport units to use calc() with container-relative custom properties.
 * 
 * @example
 * // Input: "height: 50vh; width: 100vw;"
 * // Output: "height: calc(var(--preview-vh, 1px) * 50); width: calc(var(--preview-vw, 1px) * 100);"
 * 
 * @param cssText - The CSS text to transform
 * @returns The transformed CSS with viewport units replaced
 */
export const transformViewportUnits = (cssText: string): string => {
    // Match patterns like: 100vh, 50.5vw, 25vmin, 75vmax
    // Also handles calc() expressions with vh/vw units
    return cssText.replace(
        /(\d+\.?\d*)(vh|vw|vmin|vmax)/gi,
        (match, value, unit) => {
            const numValue = parseFloat(value);
            const unitLower = unit.toLowerCase();

            switch (unitLower) {
                case 'vh':
                    return `calc(var(--preview-vh, 1px) * ${numValue})`;
                case 'vw':
                    return `calc(var(--preview-vw, 1px) * ${numValue})`;
                case 'vmin':
                    return `calc(var(--preview-vmin, 1px) * ${numValue})`;
                case 'vmax':
                    return `calc(var(--preview-vmax, 1px) * ${numValue})`;
                default:
                    return match;
            }
        }
    );
};

/**
 * CSS custom property names used for viewport unit transformation.
 * These should be set on the container element with values representing
 * 1% of the container's dimensions.
 */
export const VIEWPORT_CSS_PROPERTIES = {
    vh: '--preview-vh',
    vw: '--preview-vw',
    vmin: '--preview-vmin',
    vmax: '--preview-vmax',
} as const;

/**
 * Calculates the CSS custom property values for viewport unit transformation.
 * 
 * @param width - Container width in pixels
 * @param height - Container height in pixels
 * @returns Object with CSS custom property values
 */
export const getViewportCssProperties = (width: number, height: number): Record<string, string> => ({
    '--preview-vh': `${height / 100}px`,
    '--preview-vw': `${width / 100}px`,
    '--preview-vmin': `${Math.min(width, height) / 100}px`,
    '--preview-vmax': `${Math.max(width, height) / 100}px`,
});

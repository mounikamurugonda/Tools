'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook to set default config for mobile devices.
 * If the user opens the app on a mobile device and the frame is set to default 'browser' (16:9),
 * we switch it to 'tiktok-shorts' (9:16) for a better initial experience.
 */
export const useMobileDefaultConfig = (useStore: any) => {
    const { config, updateConfig } = useStore();
    const hasRunRef = useRef(false);

    useEffect(() => {
        // Only run once on initial mount to respect user changes afterward
        if (hasRunRef.current) return;

        const checkMobileDefaults = () => {
            // Check if width is less than 768px (standard mobile breakpoint)
            const isMobile = window.innerWidth < 768;

            // If on mobile and currently set to desktop default 'browser', switch to 'tiktok-shorts'
            if (isMobile && config.deviceFrame === 'browser') {
                updateConfig('deviceFrame', 'tiktok-shorts');
            }
        };

        checkMobileDefaults();
        hasRunRef.current = true;

        // Optionally run on resize (though typically we only care about initial load)
        // window.addEventListener('resize', checkMobileDefaults);
        // return () => window.removeEventListener('resize', checkMobileDefaults);
    }, [config.deviceFrame, updateConfig]);
};

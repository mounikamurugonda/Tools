"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

import { usePathname } from "next/navigation";

const SmoothScrolling = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();

    useEffect(() => {
        // Disable smooth scrolling for CodeCast route to allow native internal scrolling
        if (pathname?.startsWith('/code-cast')) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Apply lenis class to html for handling scrollbars etc if needed
        document.documentElement.classList.add("lenis");

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            document.documentElement.classList.remove("lenis");
        };
    }, [pathname]);

    return <>{children}</>;
};

export default SmoothScrolling;

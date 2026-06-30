'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

/**
 * Returns true for any element that has its own scrollable overflow — telling
 * Lenis to leave native scroll behaviour alone for that node.
 *
 * This replaces the old per-component `data-lenis-prevent` workaround.
 * Every <textarea>, overflow-auto div, custom select list, modal body, etc.
 * is handled automatically without touching individual components.
 *
 * Elements that already carry `data-lenis-prevent` still work as before
 * (belt-and-suspenders), but are no longer required.
 */
function isScrollable(node: Element): boolean {
  // Explicit opt-out — always respected
  if (node.hasAttribute('data-lenis-prevent')) return true;

  // Always let textareas handle their own scroll natively, regardless of
  // current content height — they may receive content dynamically.
  if (node.nodeName === 'TEXTAREA') return true;

  const style = window.getComputedStyle(node);
  const overflowY = style.overflowY;
  const overflowX = style.overflowX;
  const overflow  = style.overflow;

  const scrollableValue = (v: string) => v === 'scroll' || v === 'auto';

  if (!scrollableValue(overflowY) && !scrollableValue(overflowX) && !scrollableValue(overflow)) {
    return false;
  }

  // Only prevent when the element actually has scrollable content — avoids
  // false positives on elements that are overflow:auto but don't overflow.
  const hasVerticalScroll   = node.scrollHeight > node.clientHeight;
  const hasHorizontalScroll = node.scrollWidth  > node.clientWidth;

  return hasVerticalScroll || hasHorizontalScroll;
}

const SmoothScrolling = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    // CodeCast has its own scroll layout — skip Lenis entirely there
    if (pathname?.startsWith('/product/code-cast')) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      // Auto-prevent on any element that can scroll natively.
      // No more manual data-lenis-prevent on textareas, modals, dropdowns, etc.
      prevent: isScrollable,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    document.documentElement.classList.add('lenis');

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove('lenis');
    };
  }, [pathname]);

  return <>{children}</>;
};

export default SmoothScrolling;

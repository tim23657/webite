'use client';

import { useEffect } from 'react';

/*
 * Scroll reveal for every [data-reveal] element on a page (one shared hook
 * instead of five copies).
 *
 * Progressive enhancement, on purpose:
 *  - Without JavaScript, with reduced motion, or for anything already in
 *    (or just below) the first screen, content is simply visible. Nothing
 *    waits for an animation, so opening content is never delayed.
 *  - Only elements further down the page are "armed" (data-visible="false",
 *    applied instantly, off-screen). The observer starts each one slightly
 *    before it enters the viewport, so a visitor does not see empty space.
 *  - Each element animates once per page visit; the animation itself is
 *    defined in motion.css (opacity + a few pixels of translate).
 *  - Elements that enter in the same frame (a row of cards) are staggered
 *    by a few tens of milliseconds, in reading order.
 */

const STAGGER_MS = 60;
const MAX_STAGGER_MS = 180;
const LOOKAHEAD = 0.08; // start this fraction of the viewport height early

export function useReveal(): void {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const viewportHeight = window.innerHeight;
    const armed: HTMLElement[] = [];

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
      if (element.dataset.visible === 'true') return;
      // Already visible, partly visible or scrolled past: leave it alone.
      if (element.getBoundingClientRect().top < viewportHeight * (1 + LOOKAHEAD)) return;
      element.dataset.visible = 'false';
      armed.push(element);
    });
    if (armed.length === 0) return;

    const reveal = (element: HTMLElement, delay: number) => {
      element.style.setProperty('--reveal-delay', `${delay}ms`);
      element.dataset.visible = 'true';
      observer.unobserve(element);
    };

    const observer = new IntersectionObserver((entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => (Math.round(a.boundingClientRect.top / 8) - Math.round(b.boundingClientRect.top / 8)) || (a.boundingClientRect.left - b.boundingClientRect.left));
      entering.forEach((entry, index) => reveal(entry.target as HTMLElement, Math.min(index * STAGGER_MS, MAX_STAGGER_MS)));

      // Jumped past (anchor link, fast fling, restored scroll position): no
      // animation to play any more, so the element is simply shown.
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0) reveal(entry.target as HTMLElement, 0);
      });
    }, { rootMargin: `0px 0px ${LOOKAHEAD * 100}% 0px`, threshold: 0 });

    armed.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      // Strict-mode / remount safety: anything still waiting becomes plain visible content.
      armed.forEach((element) => { if (element.dataset.visible === 'false') element.removeAttribute('data-visible'); });
    };
  }, []);
}

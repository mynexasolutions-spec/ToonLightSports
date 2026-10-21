'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // We wait a tiny bit to ensure the DOM is fully rendered after a route change
    const timeoutId = setTimeout(() => {
      // 1. Target all elements we want to animate automatically
      const selectors = [
        '.section-title',
        '.section-subtitle',
        '.page-banner',
        '.category-card',
        '.product-card',
        '.subscribe-container-inner',
        '.footer-column'
      ].join(', ');

      const elements = document.querySelectorAll(selectors);
      
      // 2. Add the base animation class
      elements.forEach(el => {
        // Prevent re-adding if already animated, or if it's a specific wrapper we don't want animated
        if (!el.classList.contains('animate-on-scroll')) {
          el.classList.add('animate-on-scroll');
        }
      });

      // 3. Create the IntersectionObserver
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Stop observing once it's visible so it doesn't animate out when scrolling back up
            observer.unobserve(entry.target); 
          }
        });
      }, {
        root: null,
        threshold: 0.05, // Trigger when 5% of the element is visible
        rootMargin: '0px 0px 50px 0px' // Positive margin triggers animation 50px BEFORE it enters viewport
      });

      // 4. Observe all elements with the class
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });

      return () => {
        observer.disconnect();
      };
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]); // Re-run whenever the route changes

  return null;
}

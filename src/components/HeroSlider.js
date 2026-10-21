'use client';
import React, { useEffect, useRef, useState } from 'react';

// Background banners for the hero. Each slide has a wide (desktop) and a tall (phone) version.
const SLIDES = [
  { desktop: '/hero-banner.jpg', mobile: '/hero-banner-mobile.jpg' },
  { desktop: '/hero-banner2.jpg', mobile: '/hero-banner-mobile2.jpg' },
  { desktop: '/hero-banner3.jpg', mobile: '/hero-banner-mobile3.jpg' },
];
const INTERVAL = 5000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const rootRef = useRef(null);
  const paused = useRef(false);

  // auto-advance
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  // swipe / hover handling is attached to the whole hero, because the text sits above the slider
  useEffect(() => {
    const hero = rootRef.current && rootRef.current.parentElement;
    if (!hero) return;
    let startX = null;
    let startY = null;
    const onStart = (e) => {
      paused.current = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e) => {
      if (startX !== null) {
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          setIndex((i) => (dx < 0 ? i + 1 : i - 1 + SLIDES.length) % SLIDES.length);
        }
      }
      startX = null;
      paused.current = false;
    };
    const onEnter = () => { paused.current = true; };
    const onLeave = () => { paused.current = false; };
    hero.addEventListener('touchstart', onStart, { passive: true });
    hero.addEventListener('touchend', onEnd, { passive: true });
    hero.addEventListener('mouseenter', onEnter);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('touchstart', onStart);
      hero.removeEventListener('touchend', onEnd);
      hero.removeEventListener('mouseenter', onEnter);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="hero-slider" ref={rootRef} aria-hidden="true">
      <div className="hero-slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {SLIDES.map((slide, i) => (
          <picture className="hero-slide" key={slide.desktop}>
            <source media="(max-width: 768px)" srcSet={slide.mobile} />
            <img src={slide.desktop} alt="" draggable="false" fetchPriority={i === 0 ? 'high' : 'auto'} />
          </picture>
        ))}
      </div>
      <div className="hero-dots" aria-hidden="false">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.desktop}
            type="button"
            className={`hero-dot ${i === index ? 'active' : ''}`}
            aria-label={`Show banner ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

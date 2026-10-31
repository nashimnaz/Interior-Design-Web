'use client';

import React, { useRef, useState, useEffect } from 'react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Base delay in ms
  duration?: number; // Transition duration in ms (default 750ms)
  distance?: number; // Upward translation distance in px (default 16px)
  staggerIndex?: number; // Index for grid stagger (adds index * 100ms)
  threshold?: number; // IntersectionObserver threshold (default 0.12)
  as?: React.ElementType;
  style?: React.CSSProperties;
}

/**
 * ScrollReveal
 * 
 * Reusable scroll-based reveal component.
 * - Smooth upward translation (12-20px) and fade-in (600-900ms).
 * - Triggers strictly once per element to prevent repeated animation during scrolling.
 * - Clean observer unmount cleanup.
 * - Respects prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 750,
  distance = 16,
  staggerIndex = 0,
  threshold = 0.1,
  as: Component = 'div',
  style = {},
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect user's reduced motion preferences
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger only once
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const totalDelay = delay + staggerIndex * 100;

  return (
    <Component
      ref={ref}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : `opacity-0 translate-y-[${distance}px]`
      } ${className}`}
      style={{
        ...style,
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? `${totalDelay}ms` : '0ms',
        transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
      }}
    >
      {children}
    </Component>
  );
}

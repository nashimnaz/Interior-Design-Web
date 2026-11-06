'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export function BlogHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingLinesRef = useRef<HTMLSpanElement[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.1
        );
      }

      const validLines = headingLinesRef.current.filter(Boolean);
      if (validLines.length > 0) {
        tl.fromTo(
          validLines,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
          0.2
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.55
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="blog-hero"
      aria-labelledby="blog-hero-heading"
      className="relative w-full min-h-[520px] sm:min-h-[580px] lg:h-[620px] flex items-center justify-center overflow-hidden bg-[#F4F0E9] text-[#292722] select-text"
    >
      {/* =========================================================================
          FULL-WIDTH EDITORIAL BACKGROUND IMAGE
          - Open writing journal, fountain pen, architectural magazines on oak desk
          - Soft sunlight, subtle greenery, low visual density
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/images/blogs/blog-hero-desk.jpg"
          alt="Excorto Builders & Interiors - Open writing journal, fountain pen and architectural design magazines on warm wooden desk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] scale-102 transition-transform duration-1000"
        />

        {/* Calibrated Warm Ivory Overlay ensuring desk journal photography is clearly recognizable on mobile */}
        <div 
          className="absolute inset-0 bg-[#F4F0E9]/50 sm:bg-[#F4F0E9]/75" 
          aria-hidden="true" 
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#F4F0E9]/80 via-transparent to-[#F4F0E9]/40" 
          aria-hidden="true" 
        />
      </div>

      {/* Main Centered Editorial Content */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-32 sm:pt-36 lg:pt-24 pb-16 sm:pb-20 text-center flex flex-col items-center">
        
        {/* Eyebrow: OUR BLOG with delicate rule accents */}
        <div 
          ref={eyebrowRef}
          className="inline-flex items-center gap-3.5 mb-4 sm:mb-5 will-change-transform"
        >
          <span className="w-8 sm:w-10 h-[1.5px] bg-[#8B6B56] shrink-0" aria-hidden="true" />
          <span className="font-sans text-[12px] sm:text-[12.5px] font-bold tracking-[0.26em] uppercase text-[#8B6B56] block select-text">
            OUR BLOG
          </span>
          <span className="w-8 sm:w-10 h-[1.5px] bg-[#8B6B56] shrink-0" aria-hidden="true" />
        </div>

        {/* Main Heading: Canela/Cormorant Garamond serif with "Better Living." in italic coffee-brown */}
        <h1 
          id="blog-hero-heading"
          className="font-serif text-[#1C201D] text-[44px] xs:text-[50px] sm:text-[58px] md:text-[66px] lg:text-[74px] leading-[1.12] sm:leading-[1.15] tracking-[-0.018em] font-medium mb-5 sm:mb-6 max-w-[880px] select-text"
        >
          <span className="block">
            <span 
              ref={(el) => { if (el) headingLinesRef.current[0] = el; }}
              className="block will-change-transform"
            >
              Ideas for
            </span>
          </span>
          <span className="block">
            <span 
              ref={(el) => { if (el) headingLinesRef.current[1] = el; }}
              className="block italic text-[#8B6B56] font-normal will-change-transform"
            >
              Better Living.
            </span>
          </span>
        </h1>

        {/* Description in Satoshi */}
        <p 
          ref={descRef}
          className="font-sans text-[16px] sm:text-[17.5px] lg:text-[18.5px] leading-[1.7] text-[#2E2822] max-w-[640px] mx-auto select-text will-change-transform font-normal"
        >
          Design insights, expert tips and inspiration to help you create spaces that feel like home.
        </p>

      </div>
    </section>
  );
}

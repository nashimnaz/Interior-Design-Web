'use client';

import React, { useEffect, useRef } from 'react';
import { SmoothImage } from '@/components/frontend/SmoothImage';
import { gsap } from 'gsap';

export function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Eyebrow Reveal
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.1
        );
      }

      // 2. Heading Reveal
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.05 },
          0.2
        );
      }

      // 3. Description Fade-Up
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.5
        );
      }

      // 4. Subtle Accent Line
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { opacity: 0, scaleX: 0, transformOrigin: 'left center' },
          { opacity: 1, scaleX: 1, duration: 0.75 },
          0.7
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about-hero"
      aria-labelledby="about-hero-heading"
      className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-[#F7F4EE] select-text"
    >
      {/* Background 16:9 Mediterranean Archway Interior Photograph */}
      <div className="absolute inset-0 z-0 bg-[#EAE4D9]">
        <SmoothImage
          src="/images/Sunlit Mediterranean Archway Interior.png"
          alt="About Excorto - Sunlit Mediterranean Archway Interior with Curved Cream Sofa and Natural Stone Coffee Table"
          fill
          priority
          loading="eager"
          unoptimized
          sizes="100vw"
          className="object-cover object-[25%_center] sm:object-[40%_center] lg:object-[right_center] select-none pointer-events-none"
        />
        {/* Subtle, soft editorial gradient to guarantee crystalline text readability on all viewports */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#F7F4EE]/90 via-[#F7F4EE]/40 to-transparent lg:from-[#F7F4EE]/85 lg:via-[#F7F4EE]/25 lg:to-transparent pointer-events-none" 
          aria-hidden="true" 
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-24 sm:pt-28 lg:pt-20 pb-12 sm:pb-16">
        <div className="max-w-[285px] xs:max-w-[305px] sm:max-w-[460px] lg:max-w-[600px] xl:max-w-[640px]">
          {/* Eyebrow Label */}
          <span 
            ref={eyebrowRef}
            className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] font-semibold tracking-[0.24em] uppercase text-[#94745F] mb-3.5 sm:mb-4 lg:mb-5 block select-text"
          >
            ABOUT EXCORTO
          </span>

          {/* Main Heading */}
          <h1 
            ref={headingRef}
            id="about-hero-heading"
            className="font-serif text-[#1C201D] text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] xl:text-[62px] leading-[1.08] tracking-[-0.015em] font-normal mb-4 sm:mb-6 select-text"
          >
            Spaces Designed for a Better Tomorrow.
          </h1>

          {/* Description Paragraph */}
          <p 
            ref={descRef}
            className="font-sans text-[14px] sm:text-[15.5px] lg:text-[17px] text-[#4A4E4B] leading-[1.7] max-w-[520px] font-normal select-text"
          >
            We believe great spaces do more than look beautiful — they inspire, support and elevate the way you live, work and connect.
          </p>

          {/* Subtle Editorial Accent Line */}
          <div ref={lineRef} className="w-14 h-[1.5px] bg-[#94745F]/50 mt-7 sm:mt-10" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

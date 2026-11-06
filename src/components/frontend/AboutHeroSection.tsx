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
        {/* Soft editorial gradient to guarantee crystalline text readability on all viewports */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#F7F4EE]/85 via-[#F7F4EE]/35 to-transparent lg:from-[#F7F4EE]/80 lg:via-[#F7F4EE]/20 lg:to-transparent pointer-events-none" 
          aria-hidden="true" 
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-24 sm:pt-28 lg:pt-20 pb-12 sm:pb-16">
        <div className="max-w-[320px] xs:max-w-[340px] sm:max-w-[480px] lg:max-w-[640px] xl:max-w-[680px]">
          {/* Eyebrow Label */}
          <span 
            ref={eyebrowRef}
            className="font-sans text-[12px] sm:text-[12.5px] lg:text-[13px] font-semibold tracking-[0.24em] uppercase text-[#8F5E3B] mb-3.5 sm:mb-4 lg:mb-5 block select-text"
          >
            ABOUT EXCORTO
          </span>

          {/* Main Heading */}
          <h1 
            ref={headingRef}
            id="about-hero-heading"
            className="font-serif text-[#161A17] text-[38px] sm:text-[46px] md:text-[54px] lg:text-[62px] xl:text-[68px] leading-[1.08] tracking-[-0.015em] font-normal mb-4 sm:mb-6 select-text"
          >
            Spaces Designed for a Better Tomorrow.
          </h1>

          {/* Description Paragraph - High Readability Typography */}
          <p 
            ref={descRef}
            className="font-sans text-[15px] sm:text-[16.5px] md:text-[17.5px] lg:text-[18.5px] text-[#2C3330] leading-[1.75] max-w-[560px] font-normal select-text"
          >
            We believe great spaces do more than look beautiful — they inspire, support and elevate the way you live, work and connect.
          </p>

          {/* Subtle Editorial Accent Line */}
          <div ref={lineRef} className="w-16 h-[2px] bg-[#94745F]/70 mt-7 sm:mt-10" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

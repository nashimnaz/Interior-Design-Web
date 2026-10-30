'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface ServicesHeroSectionProps {
  onOpenConsultation?: () => void;
  onExploreServices?: () => void;
}

export function ServicesHeroSection({
  onOpenConsultation,
  onExploreServices,
}: ServicesHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingLinesRef = useRef<HTMLSpanElement[]>([]);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageDesktopRef = useRef<HTMLDivElement>(null);
  const imageDesktopImgRef = useRef<HTMLDivElement>(null);
  const imageMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Eyebrow Reveal
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.1
        );
      }

      // 2. Line-by-Line Upward Reveal for Headings
      const validHeadingLines = headingLinesRef.current.filter(Boolean);
      if (validHeadingLines.length > 0) {
        tl.fromTo(
          validHeadingLines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.12 },
          0.2
        );
      }

      // 3. Supporting Description Fade-Up
      const validDesc = descRef.current.filter(Boolean);
      if (validDesc.length > 0) {
        tl.fromTo(
          validDesc,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.14 },
          0.55
        );
      }

      // 4. CTA Buttons Fade-Up with Stagger
      if (ctaRef.current) {
        const ctaChildren = Array.from(ctaRef.current.children);
        tl.fromTo(
          ctaChildren,
          { opacity: 0, y: 18, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1 },
          0.75
        );
      }

      // 5. Desktop Hero Image Reveal with Smooth Curved Clip-Path & Scale
      if (imageDesktopRef.current) {
        tl.fromTo(
          imageDesktopRef.current,
          { clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)', opacity: 0 },
          { clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)', opacity: 1, duration: 1.4, ease: 'power2.out' },
          0.2
        );
      }

      // Clean opacity fade on load (strictly NO zoom or scale)
      if (imageDesktopImgRef.current) {
        tl.fromTo(
          imageDesktopImgRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.4, ease: 'power2.out' },
          0.1
        );
      }

      // 6. Mobile Background Subtle Fade
      if (imageMobileRef.current) {
        tl.fromTo(
          imageMobileRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: 'power2.out' },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onExploreServices) {
      e.preventDefault();
      onExploreServices();
      return;
    }
    const el = document.getElementById('services-overview') || document.getElementById('services');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="services-hero"
      aria-labelledby="services-hero-heading"
      className="relative w-full min-h-[85vh] sm:min-h-[88vh] lg:min-h-[720px] lg:h-[90vh] lg:max-h-[860px] flex items-center justify-center overflow-hidden bg-[#F5F0E8] text-[#292722] select-text"
    >
      {/* =========================================================================
          MOBILE / TABLET LOW-DENSITY WATERMARK BACKGROUND IMAGE
          (Matches About Philosophy & Why Choose Excorto sections):
          - In mobile view, the coastal interior photo spans the full background in low density
            via a soft warm ivory overlay (#F5F0E8 at 88-90% opacity).
          - Text sits directly on top with crisp, high-contrast readability.
          - Eliminates the previous stacked bottom image card completely.
          ========================================================================= */}
      <div 
        ref={imageMobileRef}
        className="lg:hidden absolute inset-0 z-0 pointer-events-none select-none overflow-hidden will-change-transform"
      >
        <Image
          src="/images/Sunlit Minimalist Coastal Living Room.png"
          alt="Excorto Builders & Interiors - Contemporary Luxury Architectural Interior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-center select-none pointer-events-none will-change-transform"
        />

        {/* Calibrated warm ivory overlay for increased image density and tactile architectural depth */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#F5F0E8]/82 via-[#F5F0E8]/65 to-[#F5F0E8]/88 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Soft horizontal gradient prioritizing text contrast on the left */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8]/60 via-[#F5F0E8]/20 to-transparent pointer-events-none" 
          aria-hidden="true" 
        />
      </div>

      {/* =========================================================================
          DESKTOP FULL-BLEED 45:55 SPLIT PANORAMIC BACKGROUND (Zoomed Out)
          ========================================================================= */}
      <div 
        ref={imageDesktopRef}
        className="hidden lg:block absolute inset-0 z-0 pointer-events-none select-none overflow-hidden will-change-transform"
      >
        <div ref={imageDesktopImgRef} className="relative w-full h-full origin-right scale-[0.82] xl:scale-[0.78] will-change-transform">
          <Image
            src="/images/Sunlit Minimalist Coastal Living Room.png"
            alt="Excorto Builders & Interiors - Contemporary luxury architectural interior with sculptural elements and coastal ocean view"
            fill
            priority
            sizes="100vw"
            className="object-contain object-right"
          />
        </div>
      </div>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT CONTAINER (Desktop 45% Left Section, Vertically Centered)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-32 sm:pt-36 md:pt-40 lg:pt-0 pb-16 sm:pb-20 lg:pb-0 flex items-center lg:h-full">
        <div className="w-full lg:w-[45%] xl:w-[43%] flex flex-col justify-center max-w-[540px] xl:max-w-[580px]">
          
          {/* Eyebrow Label */}
          <span 
            ref={eyebrowRef}
            className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] font-semibold tracking-[0.26em] uppercase text-[#94745F] mb-3.5 sm:mb-4 lg:mb-5 block select-text will-change-transform"
          >
            WHAT WE DO
          </span>

          {/* Main Heading: Line-by-Line Upward Mask Reveal */}
          <h1 
            id="services-hero-heading"
            className="font-serif text-[#292722] text-[36px] xs:text-[40px] sm:text-[46px] md:text-[52px] lg:text-[54px] xl:text-[60px] leading-[1.07] tracking-[-0.018em] font-normal mb-5 sm:mb-6 select-text"
          >
            <span className="block overflow-hidden py-0.5">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[0] = el; }}
                className="block will-change-transform"
              >
                Thoughtful Design.
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[1] = el; }}
                className="block will-change-transform"
              >
                Seamless Execution.
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[2] = el; }}
                className="block italic text-[#94745F] font-normal will-change-transform"
              >
                Beautiful Spaces.
              </span>
            </span>
          </h1>

          {/* Supporting Description */}
          <div className="space-y-3 sm:space-y-3.5 mb-7 sm:mb-8 lg:mb-9 max-w-[490px]">
            <p 
              ref={(el) => { if (el) descRef.current[0] = el; }}
              className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.68] text-[#4A453E] select-text will-change-transform"
            >
              From architectural planning to thoughtfully designed interiors and precise installation, we bring every element of your space together.
            </p>
            <p 
              ref={(el) => { if (el) descRef.current[1] = el; }}
              className="font-sans text-[13px] sm:text-[13.5px] lg:text-[14px] leading-[1.68] text-[#5C564E] select-text will-change-transform"
            >
              At Excorto Builders &amp; Interiors, we combine creativity, functionality and craftsmanship to transform your ideas into spaces that reflect your lifestyle.
            </p>
          </div>

          {/* Action CTAs */}
          <div 
            ref={ctaRef}
            className="flex flex-wrap items-center gap-3 sm:gap-4 select-none will-change-transform"
          >
            {/* Primary CTA: Explore Our Services */}
            <a
              href="#services-overview"
              onClick={handleScrollToServices}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#94745F] hover:bg-[#7D604D] text-[#FAF8F5] font-sans font-medium text-[11.5px] sm:text-[12px] uppercase tracking-[0.16em] rounded-full transition-all duration-300 shadow-xs hover:shadow-md active:scale-98 group cursor-pointer"
            >
              <span>EXPLORE OUR SERVICES</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>

            {/* Secondary CTA: Discuss Your Project */}
            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center px-5 sm:px-6 py-3 sm:py-3.5 bg-[#F5F0E8]/80 sm:bg-transparent hover:bg-[#65745A] text-[#292722] hover:text-[#FAF8F5] border border-[#65745A]/45 hover:border-[#65745A] font-sans font-medium text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] rounded-full transition-all duration-300 active:scale-98 cursor-pointer backdrop-blur-[2px]"
            >
              DISCUSS YOUR PROJECT
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

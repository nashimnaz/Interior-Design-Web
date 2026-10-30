'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface TestimonialsHeroSectionProps {
  onExploreStories?: () => void;
}

export function TestimonialsHeroSection({ onExploreStories }: TestimonialsHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingLinesRef = useRef<HTMLSpanElement[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

      // 2. Line-by-Line Upward Heading Reveal
      const validHeadingLines = headingLinesRef.current.filter(Boolean);
      if (validHeadingLines.length > 0) {
        tl.fromTo(
          validHeadingLines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.12 },
          0.22
        );
      }

      // 3. Description Fade-Up
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.58
        );
      }

      // 4. Location Statement Fade-Up
      if (locationRef.current) {
        tl.fromTo(
          locationRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.72
        );
      }

      // 5. CTA Entrance
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.85
        );
      }

      // 6. Asymmetric Image Reveal with Subtle Scale & Clip Entrance
      if (imageContainerRef.current) {
        tl.fromTo(
          imageContainerRef.current,
          { opacity: 0, x: 25 },
          { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' },
          0.2
        );
      }
      if (imageInnerRef.current) {
        tl.fromTo(
          imageInnerRef.current,
          { scale: 1.06 },
          { scale: 1.0, duration: 1.8, ease: 'power2.out' },
          0.2
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToTestimonials = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onExploreStories) {
      onExploreStories();
      return;
    }
    const el = document.getElementById('testimonials') || document.getElementById('testimonials-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="testimonials-hero"
      aria-labelledby="testimonials-hero-heading"
      className="relative w-full min-h-[85vh] sm:min-h-[88vh] lg:min-h-[680px] lg:h-[88vh] lg:max-h-[820px] flex items-center overflow-hidden bg-[#F4F0E9] text-[#292722] select-text"
    >
      {/* =========================================================================
          SVG DEFINITIONS FOR THE ASYMMETRIC ORGANIC ARCH CURVE
          - Creates the sweeping architectural convex curve on the left of the image
          - Responsive & resolution-independent using objectBoundingBox
          ========================================================================= */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="testimonialArchCurve" clipPathUnits="objectBoundingBox">
            <path d="M 0.38 0 C 0.16 0.16, 0 0.36, 0 0.54 C 0 0.72, 0.16 0.88, 0.40 1 L 1 1 L 1 0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* =========================================================================
          DESKTOP ASYMMETRIC ARCHITECTURAL LIFESTYLE PHOTOGRAPH CONTAINER
          - Positioned on the right side (~56-58% width) with the organic curved left edge
          - Contemporary warm residential living space with lived-in atmosphere
          ========================================================================= */}
      <div 
        ref={imageContainerRef}
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[56%] xl:w-[58%] h-full z-0 select-none pointer-events-none will-change-transform"
      >
        <div 
          className="relative w-full h-full [clip-path:url(#testimonialArchCurve)] overflow-hidden bg-[#E7E0D3]"
        >
          <div ref={imageInnerRef} className="relative w-full h-full origin-right will-change-transform">
            <Image
              src="/images/testimonials/testimonials-hero-living-room.jpg"
              alt="Excorto Builders & Interiors - Contemporary luxury residential living room with oak slatted walls, linen upholstery and warm ambient lighting"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-[center_center] select-none pointer-events-none"
            />
            {/* Subtle warm ambient tint layer preserving natural light & architectural depth */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F4F0E9]/5 to-[#F4F0E9]/20 pointer-events-none"
              aria-hidden="true" 
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE / TABLET BACKGROUND IMAGE (Stacked/Watermark Responsive View)
          ========================================================================= */}
      <div 
        className="lg:hidden absolute inset-0 z-0 select-none pointer-events-none overflow-hidden"
      >
        <Image
          src="/images/testimonials/testimonials-hero-living-room.jpg"
          alt="Excorto Builders & Interiors - Contemporary luxury residential living room"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] select-none pointer-events-none"
        />

        {/* Soft warm ivory wash for high-contrast mobile text readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#F4F0E9]/92 via-[#F4F0E9]/82 to-[#F4F0E9]/95 pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#F4F0E9]/90 via-[#F4F0E9]/70 to-transparent pointer-events-none" 
          aria-hidden="true" 
        />
      </div>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT CONTAINER (Left 46% Desktop, Vertically Centered)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-32 sm:pt-36 md:pt-40 lg:pt-0 pb-16 sm:pb-20 lg:pb-0 flex items-center lg:h-full">
        <div className="w-full lg:w-[45%] xl:w-[43%] flex flex-col justify-center max-w-[520px] xl:max-w-[560px]">
          
          {/* Eyebrow: CLIENT STORIES with horizontal line accent */}
          <div 
            ref={eyebrowRef}
            className="flex items-center gap-3.5 mb-3.5 sm:mb-4 lg:mb-5 will-change-transform"
          >
            <span className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] font-semibold tracking-[0.24em] uppercase text-[#94745F] block select-text">
              CLIENT STORIES
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#94745F]/60 shrink-0" aria-hidden="true" />
          </div>

          {/* Main Heading: Canela/Cormorant Garamond serif with "Stay With Us." highlighted */}
          <h1 
            id="testimonials-hero-heading"
            className="font-serif text-[#292722] text-[40px] xs:text-[46px] sm:text-[52px] md:text-[58px] lg:text-[60px] xl:text-[66px] leading-[1.06] tracking-[-0.018em] font-normal mb-5 sm:mb-6 select-text"
          >
            <span className="block overflow-hidden py-0.5">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[0] = el; }}
                className="block will-change-transform"
              >
                Words That
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[1] = el; }}
                className="block italic text-[#94745F] font-normal will-change-transform"
              >
                Stay With Us.
              </span>
            </span>
          </h1>

          {/* Description in Satoshi */}
          <p 
            ref={descRef}
            className="font-sans text-[14px] sm:text-[15px] lg:text-[15.5px] leading-[1.72] text-[#3D3833] mb-6 sm:mb-7 select-text will-change-transform max-w-[490px]"
          >
            Every space tells a story, and every successful project begins with trust. Discover what our clients say about their experience working with EXCORTO Builders &amp; Interiors.
          </p>

          {/* Location Label: REAL EXPERIENCES · THIRUVANANTHAPURAM, KERALA */}
          <div 
            ref={locationRef}
            className="flex items-center gap-2.5 sm:gap-3 mb-7 sm:mb-8 will-change-transform select-none"
          >
            <span className="w-5 sm:w-6 h-[1px] bg-[#94745F]/70 shrink-0" aria-hidden="true" />
            <span className="font-sans text-[10px] sm:text-[10.5px] font-semibold tracking-[0.24em] uppercase text-[#6B635A]">
              REAL EXPERIENCES · THIRUVANANTHAPURAM, KERALA
            </span>
          </div>

          {/* Primary CTA: Solid Coffee-Brown Refined Button matching visual reference */}
          <div 
            ref={ctaRef}
            className="will-change-transform"
          >
            <a
              href="#testimonials"
              onClick={handleScrollToTestimonials}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-[4px] bg-[#8F5E3B] hover:bg-[#784B2B] text-[#FAF8F5] font-sans text-[11px] sm:text-[11.5px] font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-xs hover:shadow-md active:scale-98 cursor-pointer select-none"
            >
              <span>EXPLORE CLIENT STORIES</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block text-[13px]" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

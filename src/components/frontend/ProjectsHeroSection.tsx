'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface ProjectsHeroSectionProps {
  onExploreProjects?: () => void;
}

export function ProjectsHeroSection({ onExploreProjects }: ProjectsHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingLinesRef = useRef<HTMLSpanElement[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const secondaryTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Background Image gentle entrance fade (strictly NO zoom or scale)
      if (heroBgRef.current) {
        const bgImg = heroBgRef.current.querySelector('img');
        if (bgImg) {
          tl.fromTo(
            bgImg,
            { opacity: 0 },
            { opacity: 1, duration: 1.2, ease: 'power2.out' },
            0
          );
        }
      }

      // 2. Eyebrow Reveal
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.1
        );
      }

      // 3. Line-by-Line Upward Heading Reveal
      const validHeadingLines = headingLinesRef.current.filter(Boolean);
      if (validHeadingLines.length > 0) {
        tl.fromTo(
          validHeadingLines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.12 },
          0.25
        );
      }

      // 4. Description Fade-Up
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.6
        );
      }

      // 5. Secondary Brand Statement Fade-Up
      if (secondaryTextRef.current) {
        tl.fromTo(
          secondaryTextRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.75
        );
      }

      // 6. Minimal Underlined CTA Fade-In
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.9
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onExploreProjects) {
      e.preventDefault();
      onExploreProjects();
      return;
    }
    const el = document.getElementById('projects-showcase') || document.getElementById('projects');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="projects-hero"
      aria-labelledby="projects-hero-heading"
      className="relative w-full min-h-[85vh] sm:min-h-[88vh] lg:min-h-[720px] lg:h-[90vh] lg:max-h-[860px] flex items-center overflow-hidden bg-[#FDF8F0] text-[#292722] select-text"
    >
      {/* =========================================================================
          CONTINUOUS ARCHITECTURAL BACKGROUND (NO ZOOM / UNZOOMED NATIVE SCALE)
          - Desktop: unzoomed proportional contain aligned to the right.
            Shows the complete Mediterranean villa, infinity pool, loungers, olive tree and sea view.
          - Mobile: soft warm ivory wash ensuring crisp typography readability.
          - Section background is #FDF8F0 matching the exact ivory canvas of the image.
          ========================================================================= */}
      
      {/* Desktop zoomed-out natural contain background */}
      <div 
        ref={heroBgRef}
        className="hidden lg:block absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      >
        <div className="relative w-full h-full origin-right scale-[0.82] xl:scale-[0.78] will-change-transform">
          <Image
            src="/images/Serene Mediterranean Villa by the Sea.png"
            alt="Excorto Builders & Interiors - Serene Mediterranean Villa by the Sea with infinity pool, olive tree and contemporary architecture"
            fill
            priority
            sizes="100vw"
            className="object-contain object-right select-none pointer-events-none"
          />
        </div>

        {/* Desktop subtle feathered wash on the left to guarantee seamless text contrast regardless of screen width */}
        <div 
          className="absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-[#FDF8F0] via-[#FDF8F0]/70 to-transparent pointer-events-none" 
          aria-hidden="true" 
        />
      </div>

      {/* Mobile & Tablet background */}
      <div 
        className="lg:hidden absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      >
        <Image
          src="/images/Serene Mediterranean Villa by the Sea.png"
          alt="Excorto Builders & Interiors - Serene Mediterranean Villa by the Sea"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-[82%_center] select-none pointer-events-none"
        />

        {/* Soft mobile/tablet wash for low-density watermark background effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#FDF8F0]/88 via-[#FDF8F0]/70 to-[#FDF8F0]/90 sm:from-[#FDF8F0]/85 sm:via-[#FDF8F0]/65 sm:to-[#FDF8F0]/85 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Soft horizontal gradient prioritizing text readability on mobile */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#FDF8F0]/85 via-[#FDF8F0]/45 to-transparent pointer-events-none" 
          aria-hidden="true" 
        />
      </div>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT CONTAINER (Left 40–45% of the screen, Vertically Centered)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-32 sm:pt-36 md:pt-40 lg:pt-0 pb-16 sm:pb-20 lg:pb-0 flex items-center lg:h-full">
        <div className="w-full lg:w-[42%] xl:w-[40%] flex flex-col justify-center max-w-[540px] xl:max-w-[580px]">
          
          {/* Eyebrow: OUR PROJECTS, uppercase, muted terracotta */}
          <span 
            ref={eyebrowRef}
            className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] font-semibold tracking-[0.26em] uppercase text-[#C2633E] mb-3.5 sm:mb-4 lg:mb-5 block select-text will-change-transform"
          >
            OUR PROJECTS
          </span>

          {/* Main Heading: Canela/Cormorant Garamond serif with "to Life." in italic coffee brown (#94745F) */}
          <h1 
            id="projects-hero-heading"
            className="font-serif text-[#292722] text-[38px] xs:text-[42px] sm:text-[48px] md:text-[54px] lg:text-[56px] xl:text-[62px] leading-[1.08] tracking-[-0.018em] font-normal mb-5 sm:mb-6 select-text"
          >
            <span className="block overflow-hidden py-0.5">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[0] = el; }}
                className="block will-change-transform"
              >
                Spaces Brought
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[1] = el; }}
                className="block italic text-[#94745F] font-normal will-change-transform"
              >
                to Life.
              </span>
            </span>
          </h1>

          {/* Description in Satoshi, dark charcoal (#49443E) */}
          <p 
            ref={descRef}
            className="font-sans text-[14px] sm:text-[15px] lg:text-[15.5px] leading-[1.72] text-[#49443E] mb-6 sm:mb-7 select-text will-change-transform max-w-[500px]"
          >
            Explore our completed projects across residential and commercial spaces. Each project reflects our commitment to thoughtful design, functional planning and quality execution.
          </p>

          {/* Secondary Text: DESIGNED WITH PURPOSE. BUILT WITH PRECISION. */}
          <div 
            ref={secondaryTextRef}
            className="flex items-center gap-2.5 sm:gap-3 mb-7 sm:mb-8 will-change-transform select-none"
          >
            <span className="w-5 sm:w-6 h-[1px] bg-[#C2633E]/70 shrink-0" aria-hidden="true" />
            <span className="font-sans text-[10px] sm:text-[10.5px] font-semibold tracking-[0.24em] uppercase text-[#736B63]">
              DESIGNED WITH PURPOSE. BUILT WITH PRECISION.
            </span>
          </div>

          {/* Primary CTA: Minimal EXPLORE OUR PROJECTS ↓ with a thin underline */}
          <div 
            ref={ctaRef}
            className="will-change-transform"
          >
            <a
              href="#projects-showcase"
              onClick={handleScrollToProjects}
              className="group inline-flex items-center gap-2 font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.22em] uppercase text-[#292722] hover:text-[#94745F] transition-colors duration-300 pb-1 border-b border-[#292722]/40 hover:border-[#94745F] w-fit cursor-pointer select-none"
            >
              <span>EXPLORE OUR PROJECTS</span>
              <span className="transition-transform duration-300 group-hover:translate-y-1 inline-block text-[13px]" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

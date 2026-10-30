'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface ContactHeroSectionProps {
  onDiscussProject?: () => void;
}

export function ContactHeroSection({ onDiscussProject }: ContactHeroSectionProps) {
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

      // 1. Full-screen background image subtle scale & fade entrance
      if (heroBgRef.current) {
        const bgImg = heroBgRef.current.querySelector('img');
        if (bgImg) {
          tl.fromTo(
            bgImg,
            { scale: 1.05, opacity: 0.85 },
            { scale: 1.0, opacity: 1, duration: 1.8, ease: 'power2.out' },
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
          0.15
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
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.65
        );
      }

      // 5. Secondary Location Statement Fade-Up
      if (secondaryTextRef.current) {
        tl.fromTo(
          secondaryTextRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.78
        );
      }

      // 6. Primary CTA Entrance
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.92
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onDiscussProject) {
      onDiscussProject();
      return;
    }
    const el = document.getElementById('contact-form') || document.getElementById('enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact-hero"
      aria-labelledby="contact-hero-heading"
      className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center overflow-hidden bg-[#F4F0E9] text-[#292722] select-text"
    >
      {/* =========================================================================
          FULL-SCREEN LANDSCAPE ARCHITECTURAL BACKGROUND (Light Density)
          - Landscape photograph of an architectural consultation in a warm brown wood interior room
          - Covers 100% of the background on both mobile and desktop
          - Calibrated ivory overlay for light-density watermark effect with high text contrast
          ========================================================================= */}
      <div 
        ref={heroBgRef}
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden will-change-transform"
      >
        <Image
          src="/images/contact/contact-hero-consultation.jpg"
          alt="Excorto Builders & Interiors - Architectural Consultation inside an elegant brown wood interior studio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] sm:object-[65%_center] lg:object-center will-change-transform"
        />

        {/* Sophisticated Warm Ivory Gradient Overlays for Light Density:
            Stronger on the left (92-95%) for pristine text legibility,
            softly fading toward the right (30-38%) so the warm brown interior and consultation are clearly visible */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#F4F0E9]/95 via-[#F4F0E9]/82 to-[#F4F0E9]/42 sm:from-[#F4F0E9]/94 sm:via-[#F4F0E9]/76 sm:to-[#F4F0E9]/35 lg:from-[#F4F0E9]/96 lg:via-[#F4F0E9]/74 lg:to-[#F4F0E9]/32 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Vertical gradient wash for seamless top navbar and bottom section transitions */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#F4F0E9]/75 via-transparent to-[#F4F0E9]/85 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Mobile-calibrated light density overlay ensuring crisp readability on small viewports */}
        <div 
          className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#F4F0E9]/88 via-[#F4F0E9]/78 to-[#F4F0E9]/92 pointer-events-none" 
          aria-hidden="true" 
        />
      </div>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT CONTAINER (Desktop Left 45–48%, Vertically Centered)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-32 sm:pt-36 lg:pt-32 pb-16 sm:pb-20 flex items-center min-h-[92vh] sm:min-h-screen">
        <div className="w-full lg:w-[48%] xl:w-[45%] max-w-[580px] xl:max-w-[620px] flex flex-col justify-center">
          
          {/* Eyebrow: CONTACT EXCORTO, uppercase, letter-spaced, coffee-brown */}
          <span 
            ref={eyebrowRef}
            className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] font-semibold tracking-[0.26em] uppercase text-[#94745F] mb-3.5 sm:mb-4 lg:mb-5 block select-text will-change-transform"
          >
            CONTACT EXCORTO
          </span>

          {/* Main Heading: Canela/Cormorant Garamond large serif */}
          <h1 
            id="contact-hero-heading"
            className="font-serif text-[#292722] text-[38px] xs:text-[42px] sm:text-[48px] md:text-[54px] lg:text-[56px] xl:text-[62px] leading-[1.08] tracking-[-0.018em] font-normal mb-5 sm:mb-6 select-text"
          >
            <span className="block overflow-hidden py-0.5">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[0] = el; }}
                className="block will-change-transform"
              >
                Let&apos;s Start
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[1] = el; }}
                className="block will-change-transform"
              >
                a Conversation.
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[2] = el; }}
                className="block italic text-[#94745F] font-normal will-change-transform text-[28px] xs:text-[32px] sm:text-[36px] md:text-[42px] lg:text-[44px] xl:text-[48px] mt-1"
              >
                Your Vision, Our Expertise.
              </span>
            </span>
          </h1>

          {/* Description in Satoshi, muted charcoal */}
          <p 
            ref={descRef}
            className="font-sans text-[14px] sm:text-[15px] lg:text-[15.5px] leading-[1.72] text-[#3D3833] mb-6 sm:mb-7 select-text will-change-transform max-w-[500px]"
          >
            Have a project in mind? Whether you&apos;re planning a new home, transforming an existing space or developing a commercial property, we&apos;re here to understand your ideas and bring them to life.
          </p>

          {/* Secondary Text: THIRUVANANTHAPURAM, KERALA */}
          <div 
            ref={secondaryTextRef}
            className="flex items-center gap-2.5 sm:gap-3 mb-7 sm:mb-8 will-change-transform select-none"
          >
            <span className="w-5 sm:w-6 h-[1px] bg-[#94745F]/70 shrink-0" aria-hidden="true" />
            <span className="font-sans text-[10.5px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase text-[#6B635A]">
              THIRUVANANTHAPURAM, KERALA
            </span>
          </div>

          {/* Primary CTA: Minimal DISCUSS YOUR PROJECT → button */}
          <div 
            ref={ctaRef}
            className="will-change-transform"
          >
            <a
              href="#contact-form"
              onClick={handleScrollToForm}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#94745F] hover:bg-[#7D604D] text-[#FAF8F5] font-sans text-[11px] sm:text-[11.5px] font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-xs hover:shadow-md active:scale-98 cursor-pointer select-none"
            >
              <span>DISCUSS YOUR PROJECT</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block text-[13px]" aria-hidden="true">
                →
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

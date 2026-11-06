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
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
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
      {/* Desktop Background Image */}
      <div 
        ref={heroBgRef}
        className="hidden lg:block absolute inset-0 z-0 pointer-events-none select-none overflow-hidden will-change-transform"
      >
        <Image
          src="/images/contact/contact-hero-consultation.jpg"
          alt="Excorto Builders & Interiors - Architectural Consultation inside an elegant brown wood interior studio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center will-change-transform"
        />

        {/* Sophisticated Warm Ivory Gradient Overlays for Light Density */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#F4F0E9]/96 via-[#F4F0E9]/74 to-[#F4F0E9]/32 pointer-events-none" 
          aria-hidden="true" 
        />

        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#F4F0E9]/75 via-transparent to-[#F4F0E9]/85 pointer-events-none" 
          aria-hidden="true" 
        />
      </div>

      {/* Mobile & Tablet Background Image (Consultation Room) */}
      <div 
        className="lg:hidden absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      >
        <Image
          src="/images/contact/contact-hero-consultation.jpg"
          alt="Excorto Builders & Interiors - Architectural Consultation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] pointer-events-none select-none"
        />

        {/* Calibrated mobile overlay ensuring consultation space is distinctly recognizable */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#F4F0E9]/70 via-[#F4F0E9]/45 to-[#F4F0E9]/80 pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#F4F0E9]/75 via-[#F4F0E9]/40 to-transparent pointer-events-none" 
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
            className="font-sans text-[12px] sm:text-[12.5px] lg:text-[13px] font-bold tracking-[0.26em] uppercase text-[#8B6B56] mb-3.5 sm:mb-4 lg:mb-5 block select-text will-change-transform"
          >
            CONTACT EXCORTO
          </span>

          {/* Main Heading: Canela/Cormorant Garamond large serif */}
          <h1 
            id="contact-hero-heading"
            className="font-serif text-[#1C201D] text-[40px] xs:text-[44px] sm:text-[50px] md:text-[56px] lg:text-[58px] xl:text-[64px] leading-[1.12] sm:leading-[1.15] tracking-[-0.018em] font-medium mb-5 sm:mb-6 select-text"
          >
            <span className="block">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[0] = el; }}
                className="block will-change-transform"
              >
                Let&apos;s Start
              </span>
            </span>
            <span className="block">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[1] = el; }}
                className="block will-change-transform"
              >
                a Conversation.
              </span>
            </span>
            <span className="block">
              <span 
                ref={(el) => { if (el) headingLinesRef.current[2] = el; }}
                className="block italic text-[#8B6B56] font-normal will-change-transform text-[30px] xs:text-[34px] sm:text-[38px] md:text-[44px] lg:text-[46px] xl:text-[50px] mt-1"
              >
                Your Vision, Our Expertise.
              </span>
            </span>
          </h1>

          {/* Description in Satoshi, muted charcoal */}
          <p 
            ref={descRef}
            className="font-sans text-[15.5px] sm:text-[16.5px] lg:text-[17.5px] leading-[1.72] text-[#2E2822] font-normal mb-6 sm:mb-7 select-text will-change-transform max-w-[520px]"
          >
            Have a project in mind? Whether you&apos;re planning a new home, transforming an existing space or developing a commercial property, we&apos;re here to understand your ideas and bring them to life.
          </p>

          {/* Secondary Text: THIRUVANANTHAPURAM, KERALA */}
          <div 
            ref={secondaryTextRef}
            className="flex items-center gap-2.5 sm:gap-3 mb-7 sm:mb-8 will-change-transform select-none"
          >
            <span className="w-5 sm:w-6 h-[1.5px] bg-[#8B6B56] shrink-0" aria-hidden="true" />
            <span className="font-sans text-[11px] sm:text-[11.5px] font-bold tracking-[0.24em] uppercase text-[#554E46]">
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
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#8F5E3B] hover:bg-[#784B2B] text-[#FAF8F5] font-sans text-[12px] sm:text-[12.5px] font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xs hover:shadow-md active:scale-98 cursor-pointer select-none"
            >
              <span>DISCUSS YOUR PROJECT</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block text-[14px]" aria-hidden="true">
                →
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

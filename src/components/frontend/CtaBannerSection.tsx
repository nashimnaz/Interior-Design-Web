'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CtaBannerSectionProps {
  onOpenConsultation?: () => void;
}

export function CtaBannerSection({ onOpenConsultation }: CtaBannerSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Smooth background image reveal & subtle parallax
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.12, opacity: 0.8 },
          {
            scale: 1.0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );

        // Parallax scrub
        gsap.to(bgImageRef.current, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 2. Sequential content reveal: eyebrow, heading, description
      if (contentRef.current) {
        const textElements = Array.from(contentRef.current.children);
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // 3. Button reveal
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, x: 20, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.85,
            delay: 0.35,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (onOpenConsultation) {
      e.preventDefault();
      onOpenConsultation();
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact-cta" 
      className="w-full relative overflow-hidden text-white select-text"
      aria-labelledby="cta-banner-heading"
    >
      {/* Background Image with Parallax & Smooth Reveal */}
      <div 
        ref={bgImageRef}
        className="absolute -inset-y-8 inset-x-0 z-0 pointer-events-none select-none will-change-transform"
      >
        <Image
          src="/images/unnamed.png"
          alt="Dark architectural interior with fluted wood paneling, warm lighting and indoor olive tree"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_18%] sm:object-[center_20%] lg:object-[center_22%]"
        />
        {/* Subtle Dark Gradient Overlay for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/35 pointer-events-none" />
      </div>

      {/* Content Container: Compact 220–260px desktop landscape height */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-9 sm:py-10 lg:py-11 xl:py-12 min-h-[220px] lg:min-h-[240px] xl:min-h-[255px] flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">
        
        {/* Left Column: Eyebrow, Heading, Description */}
        <div ref={contentRef} className="max-w-[720px] flex flex-col justify-center">
          {/* Eyebrow */}
          <span className="font-sans text-[10px] sm:text-[10.5px] lg:text-[11px] font-medium tracking-[0.24em] uppercase text-[#D0C0B2] mb-2 sm:mb-2.5 block will-change-transform">
            GOOD DESIGN STARTS WITH A CONVERSATION.
          </span>

          {/* Main Heading */}
          <h2 
            id="cta-banner-heading"
            className="font-serif text-[24px] sm:text-[28px] lg:text-[32px] xl:text-[35px] leading-[1.16] tracking-normal text-[#F9F7F2] font-normal will-change-transform"
          >
            Have an idea for a new home, an interior{' '}
            <br className="hidden sm:inline" />
            transformation, or a commercial space?
          </h2>

          {/* Description */}
          <p className="mt-2.5 sm:mt-3 font-sans text-[12.5px] sm:text-[13px] lg:text-[13.5px] leading-[1.62] text-[#D8CEC5] max-w-[580px] will-change-transform">
            Let&apos;s discuss your vision, understand your requirements, and explore how thoughtful design can make a difference.
          </p>
        </div>

        {/* Right Column: CTA Button */}
        <div ref={buttonRef} className="shrink-0 flex items-center lg:self-center will-change-transform">
          <a
            href="#contact"
            onClick={handleClick}
            className="group inline-flex items-center gap-3 px-6 sm:px-7 lg:px-8 py-3.5 sm:py-4 border border-white/40 hover:border-white/80 bg-[#1D1713]/40 hover:bg-[#1D1713]/70 backdrop-blur-xs text-[#FAF7F2] font-sans text-[11px] sm:text-[11.5px] uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer select-none"
          >
            <span>START YOUR PROJECT</span>
            <span className="text-[13px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HomeContent } from '@/lib/types';
import { SmoothImage } from '@/components/frontend/SmoothImage';
import { gsap } from 'gsap';

interface HeroSectionProps {
  onOpenConsultation?: () => void;
  onExploreServices?: () => void;
}

export function HeroSection({ onOpenConsultation, onExploreServices }: HeroSectionProps) {
  const [content, setContent] = useState<Partial<HomeContent>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingLinesRef = useRef<HTMLSpanElement[]>([]);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaDesktopRef = useRef<HTMLDivElement>(null);
  const ctaMobileRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mobileVideoRef.current) {
      mobileVideoRef.current.defaultMuted = true;
      mobileVideoRef.current.muted = true;
      const playPromise = mobileVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  useEffect(() => {
    fetch('/api/content?page=home')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setContent(data.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Eyebrow Reveal
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.1
        );
      }

      // 2. Line-by-Line Upward Heading Reveal
      const validLines = headingLinesRef.current.filter(Boolean);
      if (validLines.length > 0) {
        tl.fromTo(
          validLines,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
          0.2
        );
      }

      // 3. Subheading & Description Fade-Up
      const descElements = [subheadingRef.current, descRef.current].filter(Boolean);
      if (descElements.length > 0) {
        tl.fromTo(
          descElements,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 },
          0.55
        );
      }

      // 4. CTAs Fade-Up
      const ctaElements = [ctaDesktopRef.current, ctaMobileRef.current].filter(Boolean);
      if (ctaElements.length > 0) {
        tl.fromTo(
          ctaElements,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.75
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const desktopImage = content.heroImageDesktop || '/images/AA4DD01B-86D5-45F3-991A-BC3AD98FE52B.png';
  const eyebrow = content.heroEyebrow || 'SPACES THAT FEEL LIKE YOU';
  const line1 = content.heroHeadlineLine1 || 'Thoughtfully';
  const line2 = content.heroHeadlineLine2 || 'Designed.';
  const highlight = content.heroHeadlineHighlight || 'Beautifully Executed.';
  const description = content.heroDescription || 'Welcome to Excorto Builders & Interiors, your partner in architectural design, interior design and interior installation in Thiruvananthapuram, Kerala.';

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-screen flex items-center overflow-hidden bg-[#F7F4EE]">
      {/* Desktop & Tablet Background Architectural Interior Image (md and above) */}
      <div className="hidden md:block absolute inset-0 z-0 bg-[#EAE4D9]">
        <SmoothImage
          src={desktopImage}
          alt="Excorto Architectural Interior Design Studio"
          fill
          priority
          loading="eager"
          unoptimized
          sizes="100vw"
          className="object-cover md:object-[72%_bottom] lg:object-[center_bottom] select-none pointer-events-none"
        />
      </div>

      {/* Mobile-Only Portrait 9:16 Architectural Background Video (< md / up to 767px) */}
      <div className="block md:hidden absolute inset-0 z-0 bg-[#EAE4D9] overflow-hidden">
        <video
          ref={mobileVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[20%_bottom] select-none pointer-events-none"
        >
          <source src="/videos/hero-mobile.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Content Container - Centralized vertically with balanced space above & below */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-16 sm:pt-20 md:pt-16 pb-6 sm:pb-8">
        <div className="max-w-[340px] sm:max-w-[420px] md:max-w-[560px] xl:max-w-[600px]">
          {/* Eyebrow Tag */}
          <p ref={eyebrowRef} className="text-[11px] sm:text-[11.5px] font-medium tracking-[0.22em] text-[#A07355] md:text-[#636A64] uppercase mb-2 sm:mb-3.5 select-text">
            {eyebrow}
          </p>

          {/* Main Headline - Larger luxury editorial serif with unified font size across all lines */}
          <h1 className="font-serif text-[35px] sm:text-[48px] md:text-[58px] lg:text-[64px] xl:text-[70px] leading-[1.12] sm:leading-[1.15] tracking-[-0.015em] font-normal select-text">
            <span className="block">
              <span ref={el => { if (el) headingLinesRef.current[0] = el; }} className="block font-normal text-[#1E2522]">{line1}</span>
            </span>
            <span className="block">
              <span ref={el => { if (el) headingLinesRef.current[1] = el; }} className="block font-normal text-[#1E2522]">{line2}</span>
            </span>
            <span className="block">
              <span 
                ref={el => { if (el) headingLinesRef.current[2] = el; }} 
                className="block font-normal text-[#8F5E3B] md:text-[#1E2522] whitespace-nowrap"
              >
                {highlight}
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p ref={subheadingRef} className="font-sans font-medium text-[#29302C] text-[13.5px] xs:text-[14px] sm:text-[15px] lg:text-[17px] mt-3.5 sm:mt-4 mb-2 tracking-[-0.01em] leading-snug">
            We Transform Ideas into Inspiring Spaces.
          </p>

          {/* Description Paragraph - Sized and constrained to stay in the left white area */}
          <p ref={descRef} className="font-sans font-normal text-[#5A605C] text-[12px] xs:text-[12.5px] sm:text-[13px] md:text-[14px] leading-[1.65] max-w-[275px] xs:max-w-[300px] sm:max-w-[340px] md:max-w-[440px]">
            {description}
          </p>

          {/* Mobile 2 Curved Edged Buttons in 2 Rows */}
          <div ref={ctaMobileRef} className="flex md:hidden flex-col items-start gap-2.5 sm:gap-3 mt-5 sm:mt-6">
            {/* Row 1: Explore Services Glass Pill Button */}
            <button
              type="button"
              onClick={onExploreServices}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-[#1E2522] hover:bg-white/80 hover:border-white text-[12px] font-medium tracking-[0.05em] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Explore Services
            </button>

            {/* Row 2: Explore Projects Outline Pill Button */}
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-transparent border border-[#1E2522]/40 text-[#1E2522] hover:bg-white/40 hover:border-[#1E2522] text-[12px] font-medium tracking-[0.05em] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Explore Projects
            </Link>
          </div>

          {/* Action CTAs - Hidden on mobile (< md), visible on desktop */}
          <div ref={ctaDesktopRef} className="hidden md:flex flex-wrap items-center gap-4 sm:gap-5 mt-6 sm:mt-7">
            {/* Primary Circular Sage Arrow Button */}
            <button
              type="button"
              onClick={onExploreServices}
              className="group inline-flex items-center gap-3.5 cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#4E6151] hover:bg-[#3E4F41] text-white flex items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-105 active:scale-95">
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
              <span className="text-[13.5px] sm:text-[14px] font-medium text-[#1E2522] group-hover:text-[#C2633E] transition-colors">
                Explore Our Services
              </span>
            </button>

            {/* Secondary Project Consultation Button */}
            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center bg-[#EDE7DE]/85 hover:bg-[#1E2522] hover:text-white text-[#2C332F] border border-[#DDD7CE] text-[11px] sm:text-[11.5px] font-medium tracking-[0.14em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-xs active:scale-[0.98]"
            >
              DISCUSS YOUR PROJECT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

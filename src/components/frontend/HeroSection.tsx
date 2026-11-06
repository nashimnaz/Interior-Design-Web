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
  playEntranceAnimation?: boolean;
}

export function HeroSection({
  onOpenConsultation,
  onExploreServices,
  playEntranceAnimation = true
}: HeroSectionProps) {
  const [content, setContent] = useState<Partial<HomeContent>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingLinesRef = useRef<HTMLSpanElement[]>([]);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaDesktopRef = useRef<HTMLDivElement>(null);
  const ctaMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/content?page=home')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setContent(data.data);
        }
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    if (!playEntranceAnimation) return;

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
  }, [playEntranceAnimation]);

  const desktopImage = content.heroImageDesktop || '/images/desktop-hero-bright-villa.jpg';
  const mobileImage = content.heroImageMobile || '/images/Sunlit Arched Nook with Olive Branches.png';
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
          className="object-cover object-center md:object-center lg:object-center select-none pointer-events-none"
        />
        {/* Soft, feathered editorial gradient wash on the left to guarantee crystalline text legibility */}
        <div 
          className="absolute inset-y-0 left-0 w-[55%] lg:w-[45%] bg-gradient-to-r from-[#F7F4EE] via-[#F7F4EE]/90 to-transparent pointer-events-none z-1" 
          aria-hidden="true" 
        />
      </div>

      {/* Mobile-Only Portrait 9:16 Architectural Background Image (< md / up to 767px) */}
      <div className="block md:hidden absolute inset-0 z-0 bg-[#EAE4D9]">
        <SmoothImage
          src={mobileImage}
          alt="Excorto Architectural Interior Design Studio - Sunlit Nook"
          fill
          priority
          loading="eager"
          unoptimized
          sizes="100vw"
          className="object-cover object-[20%_bottom] select-none pointer-events-none"
        />
      </div>

      {/* Main Content Container - Centralized vertically with balanced space above & below */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-16 sm:pt-20 md:pt-16 pb-6 sm:pb-8">
        <div className="max-w-[340px] sm:max-w-[420px] md:max-w-[560px] xl:max-w-[620px]">
          {/* Eyebrow Tag */}
          <p ref={eyebrowRef} className="text-[12px] sm:text-[13px] md:text-[13.5px] font-semibold tracking-[0.24em] text-[#8F5E3B] md:text-[#4A554D] uppercase mb-2 sm:mb-3.5 select-text">
            {eyebrow}
          </p>

          {/* Main Headline - Larger luxury editorial serif with unified font size across all lines */}
          <h1 className="font-serif text-[36px] sm:text-[48px] md:text-[58px] lg:text-[66px] xl:text-[72px] leading-[1.12] sm:leading-[1.15] tracking-[-0.015em] font-normal select-text">
            <span className="block">
              <span ref={el => { if (el) headingLinesRef.current[0] = el; }} className="block font-normal text-[#161B18]">{line1}</span>
            </span>
            <span className="block">
              <span ref={el => { if (el) headingLinesRef.current[1] = el; }} className="block font-normal text-[#161B18]">{line2}</span>
            </span>
            <span className="block">
              <span
                ref={el => { if (el) headingLinesRef.current[2] = el; }}
                className="block font-normal text-[#8F5E3B] md:text-[#161B18] whitespace-nowrap"
              >
                {highlight}
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p ref={subheadingRef} className="font-sans font-semibold text-[#1C201D] text-[15px] sm:text-[16.5px] md:text-[18px] lg:text-[20px] mt-3.5 sm:mt-4 mb-2.5 tracking-[-0.01em] leading-snug">
            We Transform Ideas into Inspiring Spaces.
          </p>

          {/* Description Paragraph - High contrast, legible, comfortable typography */}
          <p ref={descRef} className="font-sans font-normal text-[#333A36] text-[13.5px] sm:text-[14.5px] md:text-[16px] lg:text-[17px] leading-[1.7] max-w-[310px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px]">
            {description}
          </p>

          {/* Mobile 2 Curved Edged Highlighted Buttons in 2 Rows */}
          <div ref={ctaMobileRef} className="flex md:hidden flex-col items-start gap-3 mt-6">
            {/* Row 1: Explore Services Highlighted Pill */}
            <button
              type="button"
              onClick={onExploreServices}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#344637] text-white hover:bg-[#253328] text-[12.5px] font-bold tracking-[0.08em] uppercase transition-all duration-300 shadow-[0_4px_14px_rgba(52,70,55,0.25)] active:scale-95 cursor-pointer"
            >
              Explore Our Services
            </button>

            {/* Row 2: Discuss Your Project Highlighted Terracotta Pill */}
            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#8F4A2D] border-2 border-[#A65E3F] text-[12.5px] font-bold tracking-[0.1em] uppercase transition-all duration-300 shadow-[0_2px_10px_rgba(166,94,63,0.15)] active:scale-95 cursor-pointer"
            >
              Discuss Your Project
            </button>
          </div>

          {/* Action CTAs - Highlighted Both 'Explore Our Services' and 'Discuss Your Project' on Desktop */}
          <div ref={ctaDesktopRef} className="hidden md:flex flex-wrap items-center gap-4 sm:gap-5 mt-7 sm:mt-8">
            {/* Primary Highlighted Button: Explore Our Services */}
            <button
              type="button"
              onClick={onExploreServices}
              className="group inline-flex items-center gap-3.5 bg-[#344637] hover:bg-[#253328] text-white text-[13px] sm:text-[13.5px] font-semibold tracking-[0.08em] uppercase px-6 sm:px-7 py-3.5 rounded-full shadow-[0_4px_16px_rgba(52,70,55,0.24)] transition-all duration-300 hover:scale-102 active:scale-98 cursor-pointer focus:outline-none"
            >
              <span>Explore Our Services</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={14} className="text-white" />
              </div>
            </button>

            {/* Secondary Highlighted Button: Discuss Your Project */}
            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center bg-white/95 hover:bg-[#A65E3F] text-[#8F4A2D] hover:text-white border-2 border-[#A65E3F] text-[12.5px] sm:text-[13px] font-bold tracking-[0.14em] uppercase px-6 sm:px-7 py-3.5 rounded-full shadow-[0_4px_16px_rgba(166,94,63,0.14)] transition-all duration-300 hover:scale-102 cursor-pointer active:scale-[0.98]"
            >
              DISCUSS YOUR PROJECT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

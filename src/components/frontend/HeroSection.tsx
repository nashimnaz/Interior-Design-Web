'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HomeContent } from '@/lib/types';

interface HeroSectionProps {
  onOpenConsultation?: () => void;
  onExploreServices?: () => void;
}

export function HeroSection({ onOpenConsultation, onExploreServices }: HeroSectionProps) {
  const [content, setContent] = useState<Partial<HomeContent>>({});

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

  const desktopImage = content.heroImageDesktop || '/images/AA4DD01B-86D5-45F3-991A-BC3AD98FE52B.png';
  const mobileImage = content.heroImageMobile || '/images/Sunlit Arched Nook with Olive Branches.png';
  const eyebrow = content.heroEyebrow || 'SPACES THAT FEEL LIKE YOU';
  const line1 = content.heroHeadlineLine1 || 'Thoughtfully';
  const line2 = content.heroHeadlineLine2 || 'Designed.';
  const highlight = content.heroHeadlineHighlight || 'Beautifully Executed.';
  const description = content.heroDescription || 'Welcome to Excorto Builders & Interiors, your partner in architectural design, interior design and interior installation in Thiruvananthapuram, Kerala.';

  return (
    <section className="relative w-full h-screen min-h-screen flex items-start md:items-center overflow-hidden bg-[#F7F4EE]">
      {/* Desktop & Tablet Background Architectural Interior Image (md and above) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
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

      {/* Mobile-Only Portrait 9:16 Architectural Background Image (< md / up to 767px) */}
      <div className="block md:hidden absolute inset-0 z-0">
        <Image
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

      {/* Main Content Container - Positioned higher in the empty space on mobile */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-24 xs:pt-28 sm:pt-32 md:pt-16 pb-6 sm:pb-8">
        <div className="max-w-[275px] xs:max-w-[295px] sm:max-w-[360px] md:max-w-[560px] xl:max-w-[590px]">
          {/* Eyebrow Tag */}
          <p className="text-[11px] sm:text-[11.5px] font-medium tracking-[0.22em] text-[#A07355] md:text-[#636A64] uppercase mb-2 sm:mb-3.5 select-text">
            {eyebrow}
          </p>

          {/* Main Headline - Larger luxury editorial serif with exact lettering format */}
          <h1 className="font-serif text-[42px] xs:text-[45px] sm:text-[50px] md:text-[58px] lg:text-[64px] xl:text-[70px] leading-[1.02] sm:leading-[1.05] tracking-[-0.015em] font-normal select-text">
            <span className="block font-normal text-[#1E2522]">{line1}</span>
            <span className="block font-normal text-[#1E2522]">{line2}</span>
            <span className="block font-normal text-[#8F5E3B] md:text-[#1E2522]">
              {highlight}
            </span>
          </h1>

          {/* Subheading */}
          <p className="font-sans font-medium text-[#29302C] text-[13.5px] xs:text-[14px] sm:text-[15px] lg:text-[17px] mt-3.5 sm:mt-4 mb-2 tracking-[-0.01em] leading-snug">
            We Transform Ideas into Inspiring Spaces.
          </p>

          {/* Description Paragraph - Sized and constrained to stay in the left white area */}
          <p className="font-sans font-normal text-[#5A605C] text-[11.5px] xs:text-[12px] sm:text-[12.5px] md:text-[14px] leading-[1.6] max-w-[260px] xs:max-w-[280px] sm:max-w-[340px] md:max-w-[440px]">
            {description}
          </p>

          {/* Mobile 2 Glass Effect Curved Edged Buttons */}
          <div className="flex md:hidden flex-wrap items-center gap-2.5 mt-4 sm:mt-5">
            {/* Explore Services Glass Button */}
            <button
              type="button"
              onClick={onExploreServices}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/75 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-[#1E2522] hover:bg-white/70 hover:border-white text-[11px] sm:text-[11.5px] font-medium tracking-[0.05em] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Explore Services
            </button>

            {/* Explore Projects Glass Button */}
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/75 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-[#1E2522] hover:bg-white/70 hover:border-white text-[11px] sm:text-[11.5px] font-medium tracking-[0.05em] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Explore Projects
            </Link>
          </div>

          {/* Action CTAs - Hidden on mobile (< md), visible on desktop */}
          <div className="hidden md:flex flex-wrap items-center gap-4 sm:gap-5 mt-6 sm:mt-7">
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

'use client';

import React from 'react';
import Image from 'next/image';

export function AboutHeroSection() {
  return (
    <section 
      id="about-hero"
      aria-labelledby="about-hero-heading"
      className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-[#F7F4EE] select-text"
    >
      {/* Background 16:9 Mediterranean Archway Interior Photograph */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Sunlit Mediterranean Archway Interior.png"
          alt="About Excorto - Sunlit Mediterranean Archway Interior with Curved Cream Sofa and Natural Stone Coffee Table"
          fill
          priority
          loading="eager"
          unoptimized
          sizes="100vw"
          className="object-cover object-[25%_center] sm:object-[40%_center] lg:object-[right_center] select-none pointer-events-none"
        />
        {/* Subtle, soft editorial gradient to guarantee crystalline text readability on all viewports */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#F7F4EE]/90 via-[#F7F4EE]/40 to-transparent lg:from-[#F7F4EE]/85 lg:via-[#F7F4EE]/25 lg:to-transparent pointer-events-none" 
          aria-hidden="true" 
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-24 sm:pt-28 lg:pt-20 pb-12 sm:pb-16">
        <div className="max-w-[285px] xs:max-w-[305px] sm:max-w-[460px] lg:max-w-[600px] xl:max-w-[640px]">
          {/* Eyebrow Label */}
          <span className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] font-semibold tracking-[0.24em] uppercase text-[#94745F] mb-3.5 sm:mb-4 lg:mb-5 block select-text">
            ABOUT EXCORTO
          </span>

          {/* Main Heading */}
          <h1 
            id="about-hero-heading"
            className="font-serif text-[#1C201D] text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] xl:text-[62px] leading-[1.08] tracking-[-0.015em] font-normal mb-4 sm:mb-6 select-text"
          >
            Spaces Designed for a Better Tomorrow.
          </h1>

          {/* Description Paragraph */}
          <p className="font-sans text-[14px] sm:text-[15.5px] lg:text-[17px] text-[#4A4E4B] leading-[1.7] max-w-[520px] font-normal select-text">
            We believe great spaces do more than look beautiful — they inspire, support and elevate the way you live, work and connect.
          </p>

          {/* Subtle Editorial Accent Line */}
          <div className="w-14 h-[1.5px] bg-[#94745F]/50 mt-7 sm:mt-10" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

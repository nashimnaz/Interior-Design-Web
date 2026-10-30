'use client';

import React from 'react';
import Image from 'next/image';

interface WhyChooseUsSectionProps {
  eyebrow?: string;
  onOpenConsultation?: () => void;
}

export function WhyChooseUsSection({
  eyebrow = 'WHY EXCORTO?',
  onOpenConsultation,
}: WhyChooseUsSectionProps) {
  const valueStatements = [
    'Experience That Guides Us',
    'Design with Purpose',
    'Personalized Solutions',
    'Attention to Detail',
    'A Collaborative Process',
  ];

  return (
    <section 
      id="why-us" 
      className="w-full relative overflow-hidden bg-[#DDD3C7] text-[#1E2522] select-text"
      aria-labelledby="why-us-heading"
    >
      {/* Desktop Continuous Panoramic Background Image (Full Bleed) */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/Minimalist Wabi-Sabi Vase Still Life.png"
          alt="Minimalist Wabi-Sabi ceramic vase with natural branches on stone console"
          fill
          priority
          sizes="100vw"
          className="object-cover object-left"
        />
      </div>

      {/* Mobile & Tablet Still Life Visual Frame */}
      <div className="lg:hidden relative w-full h-[260px] sm:h-[320px] md:h-[380px] overflow-hidden bg-[#DDD3C7]">
        <Image
          src="/images/Minimalist Wabi-Sabi Vase Still Life.png"
          alt="Minimalist Wabi-Sabi ceramic vase with natural branches on stone console"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[18%_center]"
        />
        {/* Subtle gradient feathering into the continuous warm beige background */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#DDD3C7] to-transparent pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-10 lg:gap-8 xl:gap-12">
          
          {/* Column 1: Left Display Area (Desktop Spacer for Vase & Branches) */}
          <div 
            className="hidden lg:block lg:col-span-4 xl:col-span-4 min-h-[300px] pointer-events-none" 
            aria-hidden="true" 
          />

          {/* Column 2: Centre Content (Eyebrow, Main Heading, Description) */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
            {/* Small uppercase eyebrow text */}
            <span className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] font-medium tracking-[0.28em] uppercase text-[#8E7462] mb-3 sm:mb-4 block">
              {eyebrow}
            </span>

            {/* Main Editorial Serif Heading */}
            <h2 
              id="why-us-heading"
              className="font-serif text-[32px] sm:text-[40px] lg:text-[46px] xl:text-[50px] leading-[1.10] tracking-tight text-[#1C201D] font-normal"
            >
              A Thoughtful Approach<br />
              to <span className="text-[#9C7055]">Every Space.</span>
            </h2>

            {/* Clean, readable sans-serif descriptive paragraph */}
            <p className="mt-5 sm:mt-6 font-sans text-[13.5px] sm:text-[14px] lg:text-[14.5px] leading-[1.72] text-[#4F4943] max-w-[460px]">
              With 12 years of industry experience, we bring professional understanding,
              creative thinking and attention to detail to every project, helping you
              transform your vision into well-considered spaces.
            </p>
          </div>

          {/* Column 3: Right Key Values (Five statements with horizontal dashes) */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-center lg:pt-8 xl:pt-9 lg:pl-2 xl:pl-4">
            <ul className="space-y-4 sm:space-y-4.5 lg:space-y-5">
              {valueStatements.map((statement) => (
                <li 
                  key={statement} 
                  className="flex items-center gap-4 sm:gap-4.5 group select-none"
                >
                  {/* Thin horizontal dash */}
                  <span 
                    className="w-5 sm:w-6 h-[1px] bg-[#8E7E73] shrink-0 transition-all duration-300 group-hover:w-8 group-hover:bg-[#9C7055]" 
                    aria-hidden="true" 
                  />
                  {/* Value Statement Text */}
                  <span className="font-sans text-[13.5px] sm:text-[14px] lg:text-[14.5px] xl:text-[15px] font-normal text-[#1E2420] tracking-[0.01em] transition-colors duration-200 group-hover:text-[#9C7055]">
                    {statement}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

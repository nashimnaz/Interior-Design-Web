'use client';

import React from 'react';
import Image from 'next/image';

interface AdvantageItem {
  number: string;
  title: string;
  description: string;
}

const advantages: AdvantageItem[] = [
  {
    number: '01',
    title: 'PERSONALIZED APPROACH',
    description: 'Every project is shaped around your lifestyle, preferences and unique requirements.',
  },
  {
    number: '02',
    title: 'DESIGN & EXECUTION',
    description: 'From the first concept to final installation, we bring design and execution together seamlessly.',
  },
  {
    number: '03',
    title: 'QUALITY CRAFTSMANSHIP',
    description: 'We focus on carefully selected materials, attention to detail and lasting quality.',
  },
  {
    number: '04',
    title: 'COMMITMENT TO EXCELLENCE',
    description: 'We value clear communication, thoughtful planning and reliable project delivery.',
  },
];

interface AboutWhyChooseSectionProps {
  onOpenConsultation?: () => void;
}

export function AboutWhyChooseSection({ onOpenConsultation }: AboutWhyChooseSectionProps) {
  const handleScrollToApproach = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('about-approach');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="why-choose-excorto"
      aria-labelledby="why-choose-excorto-heading"
      className="relative w-full flex items-center overflow-hidden bg-[#F5F0E8] text-[#292722] select-text py-10 sm:py-12 lg:py-12 xl:py-14"
    >
      {/* =========================================================================
          CONTINUOUS FULL-BLEED BACKGROUND IMAGE WITH LOW-DENSITY MOBILE WASH
          Identical pattern to AboutStorySection ("OUR PHILOSOPHY"):
          - On Mobile & Tablet: The living room photo spans the background in low density
            via a soft warm ivory overlay (bg-[#F5F0E8]/90 sm:bg-[#F5F0E8]/85) for
            exquisite atmosphere while maintaining high contrast text readability.
          - On Desktop (lg+): The wash is transparent (lg:bg-transparent), revealing the
            full living room photo and organic curve on the left, with the right side
            remaining pure warm ivory for the text.
          ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/Warm Minimalist Living Room Still Life.png"
          alt="Excorto Builders & Interiors - Warm Minimalist Living Room with organic curved edge"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[25%_center] sm:object-[20%_center] lg:object-left select-none pointer-events-none"
        />
        {/* Soft mobile/tablet wash for low-density watermark background effect, completely transparent on desktop */}
        <div 
          className="absolute inset-0 bg-[#F5F0E8]/90 sm:bg-[#F5F0E8]/85 lg:bg-transparent pointer-events-none transition-colors duration-300" 
          aria-hidden="true" 
        />
      </div>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT CONTAINER
          - Mobile: Content sits beautifully over the low-density background image.
          - Desktop: Content is pinned strictly to the right empty ivory canvas (lg:ml-auto).
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8">
          
          {/* Left Column Spacer: Preserves the living room scene and organic curve on desktop */}
          <div 
            className="hidden lg:block lg:col-span-6 xl:col-span-7 min-h-[380px] pointer-events-none" 
            aria-hidden="true" 
          />

          {/* Right Column: Kept strictly within the right empty space */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center max-w-[480px] xl:max-w-[500px] lg:ml-auto">
            
            {/* Small uppercase eyebrow */}
            <span className="font-sans text-[10.5px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase text-[#8E7462] mb-1.5 sm:mb-2 block">
              WHY CHOOSE EXCORTO
            </span>

            {/* Main Heading: Editorial Serif */}
            <h2 
              id="why-choose-excorto-heading"
              className="font-serif text-[#292722] text-[28px] sm:text-[32px] lg:text-[34px] xl:text-[38px] leading-[1.12] tracking-[-0.015em] font-normal mb-3 sm:mb-3.5"
            >
              More Than Design.<br />
              A Better Way to Live.
            </h2>

            {/* Supporting Paragraph: Clean modern sans-serif */}
            <p className="font-sans text-[12.5px] sm:text-[13px] lg:text-[13.5px] leading-[1.65] text-[#4F4A43] mb-4 sm:mb-5 text-justify sm:text-left [text-justify:inter-word]">
              At Excorto Builders &amp; Interiors, we believe exceptional spaces begin with understanding the people who use them. We combine thoughtful design, quality craftsmanship and careful execution to create spaces that feel personal and last for years.
            </p>

            {/* Four Key Advantages with Thin Separators (Streamlined compact spacing) */}
            <div className="border-t border-[#E2D8CC] mb-4 sm:mb-5">
              {advantages.map((item) => (
                <div 
                  key={item.number} 
                  className="py-2.5 sm:py-3 border-b border-[#E2D8CC] group"
                >
                  {/* Advantage Title Row: Number + Em-Dash + Heading */}
                  <div className="flex items-baseline gap-2 sm:gap-2.5">
                    {/* Terracotta Number Accent */}
                    <span className="font-serif text-[14px] sm:text-[15px] text-[#A65E3F] font-medium tracking-normal shrink-0 [font-variant-numeric:lining-nums]">
                      {item.number}
                    </span>

                    {/* Secondary Accent: Olive Green Em-dash */}
                    <span 
                      className="text-[#65745A] text-[12px] sm:text-[13px] font-light select-none shrink-0" 
                      aria-hidden="true"
                    >
                      —
                    </span>

                    {/* Advantage Title in Dark Charcoal */}
                    <h3 className="font-sans font-semibold text-[12px] sm:text-[12.5px] lg:text-[13px] uppercase tracking-[0.07em] text-[#292722] transition-colors duration-200 group-hover:text-[#A65E3F]">
                      {item.title}
                    </h3>
                  </div>

                  {/* Advantage Description */}
                  <p className="font-sans text-[11.5px] sm:text-[12px] lg:text-[12.5px] text-[#555049] leading-[1.55] mt-0.5 pl-[28px] sm:pl-[32px] max-w-[440px]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Minimal CTA Text Link */}
            <div>
              <a 
                href="#about-approach"
                onClick={handleScrollToApproach}
                className="inline-flex items-center gap-2 font-sans font-semibold text-[11px] sm:text-[11.5px] uppercase tracking-[0.2em] text-[#A65E3F] hover:text-[#87452A] transition-colors duration-200 group select-none"
              >
                <span>DISCOVER OUR APPROACH</span>
                <span 
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

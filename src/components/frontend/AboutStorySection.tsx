'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export function AboutStorySection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger on intersection or fallback timer on mount
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Auto-trigger if already scrolled or in viewport on page load
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 250);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about-story"
      aria-labelledby="about-story-heading"
      className="relative w-full flex items-center overflow-hidden bg-[#F7F4EE] select-text py-14 sm:py-16 lg:py-20 xl:py-24"
    >
      {/* Background Scandinavian Dining Interior - Glides Smoothly from Left to Right */}
      <div 
        className={`absolute inset-y-0 left-0 w-[calc(100%+80px)] sm:w-[calc(100%+120px)] z-0 transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
          hasAnimated ? 'translate-x-0' : '-translate-x-20 sm:-translate-x-28'
        }`}
      >
        <Image
          src="/images/Sunlit Scandinavian Dining Interior with Blank Space.png"
          alt="Excorto Builders & Interiors - Sunlit Scandinavian Dining Interior with Arched Window and Fluted Wood Wall"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[15%_center] sm:object-[22%_center] lg:object-[left_center] select-none pointer-events-none"
        />
        {/* Soft mobile/tablet wash for crystalline contrast on narrow viewports while remaining completely transparent on desktop */}
        <div 
          className="absolute inset-0 bg-[#F7F4EE]/90 sm:bg-[#F7F4EE]/80 lg:bg-transparent pointer-events-none transition-colors duration-300"
          aria-hidden="true" 
        />
      </div>

      {/* Main Content Container - Safely positioned on the Right Canvas */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Spacer Column: Preserves the entire architectural dining scene on the left */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-6 pointer-events-none" aria-hidden="true" />

          {/* Right Content Column: Left-aligned headings with justified body paragraphs */}
          <div 
            className={`lg:col-span-6 xl:col-span-5 xl:col-start-8 flex flex-col justify-center text-left transition-all duration-1000 delay-300 ease-out ${
              hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-3'
            }`}
          >
            
            <div className="max-w-[480px] lg:max-w-[500px]">
              {/* Eyebrow Label */}
              <span className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] font-semibold tracking-[0.24em] uppercase text-[#94745F] mb-3 sm:mb-3.5 block text-left">
                OUR PHILOSOPHY
              </span>

              {/* Main Section Heading */}
              <h2 
                id="about-story-heading"
                className="font-serif text-[#1C201D] text-[30px] sm:text-[36px] lg:text-[40px] xl:text-[44px] leading-[1.14] tracking-[-0.015em] font-normal mb-5 sm:mb-6 text-left"
              >
                Fresh Perspective.<br />Experience You Can Build On.
              </h2>

              {/* Concise Narrative Body Copy - Left-aligned and Justified */}
              <div className="space-y-4 text-justify [text-justify:inter-word] text-[#4D4843]">
                {/* Lead Paragraph */}
                <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#242A26] font-medium leading-[1.68]">
                  Excorto Builders &amp; Interiors is a design-focused architectural and interior solutions studio based in Thiruvananthapuram, Kerala. Supported by the founder&apos;s 12 years of industry experience, we specialize in architectural consultation, interior design, and turnkey installation.
                </p>

                {/* Second Paragraph */}
                <p className="font-sans text-[13.5px] sm:text-[14px] leading-[1.72] text-[#554F49]">
                  We believe good design begins with listening. By uniting creative vision with practical planning, material awareness, and collaborative execution, we shape environments that support everyday living and reflect the people they are designed for.
                </p>
              </div>

              {/* Subtle Editorial Accent Line Aligned to Left */}
              <div className="w-14 h-[1.5px] bg-[#94745F]/50 mt-6 sm:mt-7" aria-hidden="true" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

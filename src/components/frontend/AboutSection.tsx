'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenConsultation?: () => void;
}

export function AboutSection({ onOpenConsultation }: AboutSectionProps) {
  return (
    <section id="about" className="w-full bg-[#F5EEDB] overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Left Column: Text & Story with Light Sandal Tissue Paper Theme & Interior Reference Sketch */}
        <div 
          className="relative flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 max-w-[760px] mx-auto lg:mx-0 w-full overflow-hidden bg-[#F5EEDB]"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 60%), url('/images/tissue-paper-sandal.png')`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto, 500px 500px',
          }}
        >
          {/* Very light interior design reference illustration in warm brown shade (strictly no text/writings) */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
            <Image
              src="/images/about-clean-interior-sketch-v2.jpg"
              alt="Interior design architectural sketch illustration"
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center opacity-[0.22] mix-blend-multiply"
            />
            {/* Subtle soft gradient wash to maintain 100% pristine text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5EEDB]/75 via-[#F5EEDB]/40 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10">
            {/* Eyebrow */}
            <span className="font-sans text-[11px] sm:text-[12px] font-medium tracking-[0.24em] uppercase text-black mb-4 sm:mb-5 block">
              ABOUT EXCORTO
            </span>

            {/* Main Headline in Black */}
            <h2 className="font-serif text-black text-[34px] sm:text-[42px] lg:text-[48px] xl:text-[54px] leading-[1.12] tracking-tight mb-6 sm:mb-8">
              Designing Spaces.<br />
              Shaping Experiences.
            </h2>

            {/* Body Paragraphs */}
            <div className="space-y-4 sm:space-y-5 text-[#2B2B2B] font-sans text-[13.5px] sm:text-[14px] lg:text-[14.5px] leading-[1.72]">
              <p>
                A great space is more than what you see. It is how naturally it functions, how comfortably it feels, and how meaningfully it connects with the people who use it.
              </p>
              <p>
                At Excorto Builders &amp; Interiors, we bring together architectural thinking and interior creativity to create environments that balance aesthetics with functionality.
              </p>
              <p>
                Every project is unique. We value personalized design, careful planning, suitable material selection, and clear communication throughout the process.
              </p>
            </div>

            {/* CTA Link in Black */}
            <div className="mt-8 sm:mt-10">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 font-sans font-medium text-[11.5px] sm:text-[12px] uppercase tracking-[0.18em] text-black hover:text-black/70 border-b border-black hover:border-black/70 pb-1 transition-all cursor-pointer"
              >
                <span>MORE ABOUT US</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Full-Bleed Image Filling Top, Down, and Right */}
        <div className="relative w-full h-full min-h-[460px] sm:min-h-[540px] lg:min-h-full overflow-hidden">
          <Image
            src="/images/Warm Modern Living Retreat.png"
            alt="Warm Modern Living Retreat - Excorto Interior Architecture"
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center select-none transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>
  );
}

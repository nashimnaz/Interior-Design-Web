'use client';

import React from 'react';
import Image from 'next/image';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'UNDERSTAND',
    description: 'We discuss your requirements, aspirations, style, budget, and project objectives.',
  },
  {
    number: '02',
    title: 'CONCEPTUALIZE',
    description: 'We explore design ideas and planning solutions suited to your space and intended use.',
  },
  {
    number: '03',
    title: 'DEVELOP',
    description: 'We refine the design, discuss materials and finishes, and establish the agreed scope.',
  },
  {
    number: '04',
    title: 'EXECUTE',
    description: 'We coordinate installation with attention to the design intent, details, and finishing.',
  },
  {
    number: '05',
    title: 'COMPLETE',
    description: 'We review the completed space and focus on the finishing details that bring everything together.',
  },
];

export function OurApproachSection() {
  return (
    <section 
      id="approach" 
      className="relative w-full bg-[#F8F3F0] text-[#1C201D] select-text overflow-hidden"
      aria-labelledby="our-approach-heading"
    >
      {/* Scoped Keyframes for Continuous Synchronized Timeline Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Segment Progress Lines (Desktop Horizontal) */
        @keyframes lineFill0 {
          0% { transform: scaleX(0); opacity: 1; }
          19% { transform: scaleX(1); opacity: 1; }
          95% { transform: scaleX(1); opacity: 1; }
          98% { opacity: 0; }
          100% { transform: scaleX(0); opacity: 0; }
        }
        @keyframes lineFill1 {
          0%, 20% { transform: scaleX(0); opacity: 1; }
          39% { transform: scaleX(1); opacity: 1; }
          95% { transform: scaleX(1); opacity: 1; }
          98% { opacity: 0; }
          100% { transform: scaleX(0); opacity: 0; }
        }
        @keyframes lineFill2 {
          0%, 40% { transform: scaleX(0); opacity: 1; }
          59% { transform: scaleX(1); opacity: 1; }
          95% { transform: scaleX(1); opacity: 1; }
          98% { opacity: 0; }
          100% { transform: scaleX(0); opacity: 0; }
        }
        @keyframes lineFill3 {
          0%, 60% { transform: scaleX(0); opacity: 1; }
          79% { transform: scaleX(1); opacity: 1; }
          95% { transform: scaleX(1); opacity: 1; }
          98% { opacity: 0; }
          100% { transform: scaleX(0); opacity: 0; }
        }

        /* Segment Progress Lines (Mobile Vertical) */
        @keyframes lineFillV0 {
          0% { transform: scaleY(0); opacity: 1; }
          19% { transform: scaleY(1); opacity: 1; }
          95% { transform: scaleY(1); opacity: 1; }
          98% { opacity: 0; }
          100% { transform: scaleY(0); opacity: 0; }
        }
        @keyframes lineFillV1 {
          0%, 20% { transform: scaleY(0); opacity: 1; }
          39% { transform: scaleY(1); opacity: 1; }
          95% { transform: scaleY(1); opacity: 1; }
          98% { opacity: 0; }
          100% { transform: scaleY(0); opacity: 0; }
        }
        @keyframes lineFillV2 {
          0%, 40% { transform: scaleY(0); opacity: 1; }
          59% { transform: scaleY(1); opacity: 1; }
          95% { transform: scaleY(1); opacity: 1; }
          98% { opacity: 0; }
          100% { transform: scaleY(0); opacity: 0; }
        }
        @keyframes lineFillV3 {
          0%, 60% { transform: scaleY(0); opacity: 1; }
          79% { transform: scaleY(1); opacity: 1; }
          95% { transform: scaleY(1); opacity: 1; }
          98% { opacity: 0; }
          100% { transform: scaleY(0); opacity: 0; }
        }

        /* Circular Markers Active Halo & Fill */
        @keyframes markerHighlight0 {
          0%, 19% {
            background-color: #9C7055;
            border-color: #9C7055;
            box-shadow: 0 0 0 4.5px rgba(156, 112, 85, 0.22), 0 0 10px rgba(156, 112, 85, 0.15);
          }
          20%, 95% {
            background-color: #9C7055;
            border-color: #9C7055;
            box-shadow: 0 0 0 0px transparent;
          }
          98%, 100% {
            background-color: #F8F3F0;
            border-color: #8C7A6B;
            box-shadow: none;
          }
        }
        @keyframes markerHighlight1 {
          0%, 19% {
            background-color: #F8F3F0;
            border-color: #8C7A6B;
            box-shadow: none;
          }
          20%, 39% {
            background-color: #9C7055;
            border-color: #9C7055;
            box-shadow: 0 0 0 4.5px rgba(156, 112, 85, 0.22), 0 0 10px rgba(156, 112, 85, 0.15);
          }
          40%, 95% {
            background-color: #9C7055;
            border-color: #9C7055;
            box-shadow: 0 0 0 0px transparent;
          }
          98%, 100% {
            background-color: #F8F3F0;
            border-color: #8C7A6B;
            box-shadow: none;
          }
        }
        @keyframes markerHighlight2 {
          0%, 39% {
            background-color: #F8F3F0;
            border-color: #8C7A6B;
            box-shadow: none;
          }
          40%, 59% {
            background-color: #9C7055;
            border-color: #9C7055;
            box-shadow: 0 0 0 4.5px rgba(156, 112, 85, 0.22), 0 0 10px rgba(156, 112, 85, 0.15);
          }
          60%, 95% {
            background-color: #9C7055;
            border-color: #9C7055;
            box-shadow: 0 0 0 0px transparent;
          }
          98%, 100% {
            background-color: #F8F3F0;
            border-color: #8C7A6B;
            box-shadow: none;
          }
        }
        @keyframes markerHighlight3 {
          0%, 59% {
            background-color: #F8F3F0;
            border-color: #8C7A6B;
            box-shadow: none;
          }
          60%, 79% {
            background-color: #9C7055;
            border-color: #9C7055;
            box-shadow: 0 0 0 4.5px rgba(156, 112, 85, 0.22), 0 0 10px rgba(156, 112, 85, 0.15);
          }
          80%, 95% {
            background-color: #9C7055;
            border-color: #9C7055;
            box-shadow: 0 0 0 0px transparent;
          }
          98%, 100% {
            background-color: #F8F3F0;
            border-color: #8C7A6B;
            box-shadow: none;
          }
        }
        @keyframes markerHighlight4 {
          0%, 79% {
            background-color: #F8F3F0;
            border-color: #8C7A6B;
            box-shadow: none;
          }
          80%, 95% {
            background-color: #9C7055;
            border-color: #9C7055;
            box-shadow: 0 0 0 4.5px rgba(156, 112, 85, 0.22), 0 0 10px rgba(156, 112, 85, 0.15);
          }
          98%, 100% {
            background-color: #F8F3F0;
            border-color: #8C7A6B;
            box-shadow: none;
          }
        }

        /* Marker Center Dot Color Inversion */
        @keyframes dotHighlight0 {
          0%, 95% { background-color: #F8F3F0; }
          98%, 100% { background-color: #8C7A6B; }
        }
        @keyframes dotHighlight1 {
          0%, 19% { background-color: #8C7A6B; }
          20%, 95% { background-color: #F8F3F0; }
          98%, 100% { background-color: #8C7A6B; }
        }
        @keyframes dotHighlight2 {
          0%, 39% { background-color: #8C7A6B; }
          40%, 95% { background-color: #F8F3F0; }
          98%, 100% { background-color: #8C7A6B; }
        }
        @keyframes dotHighlight3 {
          0%, 59% { background-color: #8C7A6B; }
          60%, 95% { background-color: #F8F3F0; }
          98%, 100% { background-color: #8C7A6B; }
        }
        @keyframes dotHighlight4 {
          0%, 79% { background-color: #8C7A6B; }
          80%, 95% { background-color: #F8F3F0; }
          98%, 100% { background-color: #8C7A6B; }
        }

        /* Typography Highlighting (Step Number & Title) */
        @keyframes textHighlight0 {
          0%, 95% { color: #9C7055; }
          98%, 100% { color: #1C201D; }
        }
        @keyframes textHighlight1 {
          0%, 19% { color: #1C201D; }
          20%, 95% { color: #9C7055; }
          98%, 100% { color: #1C201D; }
        }
        @keyframes textHighlight2 {
          0%, 39% { color: #1C201D; }
          40%, 95% { color: #9C7055; }
          98%, 100% { color: #1C201D; }
        }
        @keyframes textHighlight3 {
          0%, 59% { color: #1C201D; }
          60%, 95% { color: #9C7055; }
          98%, 100% { color: #1C201D; }
        }
        @keyframes textHighlight4 {
          0%, 79% { color: #1C201D; }
          80%, 95% { color: #9C7055; }
          98%, 100% { color: #1C201D; }
        }

        /* Animation Assignments (10s Continuous Loop) */
        .anim-line-0 { animation: lineFill0 10s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-line-1 { animation: lineFill1 10s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-line-2 { animation: lineFill2 10s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-line-3 { animation: lineFill3 10s cubic-bezier(0.4, 0, 0.2, 1) infinite; }

        .anim-line-v-0 { animation: lineFillV0 10s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-line-v-1 { animation: lineFillV1 10s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-line-v-2 { animation: lineFillV2 10s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-line-v-3 { animation: lineFillV3 10s cubic-bezier(0.4, 0, 0.2, 1) infinite; }

        .anim-marker-0 { animation: markerHighlight0 10s ease-in-out infinite; }
        .anim-marker-1 { animation: markerHighlight1 10s ease-in-out infinite; }
        .anim-marker-2 { animation: markerHighlight2 10s ease-in-out infinite; }
        .anim-marker-3 { animation: markerHighlight3 10s ease-in-out infinite; }
        .anim-marker-4 { animation: markerHighlight4 10s ease-in-out infinite; }

        .anim-dot-0 { animation: dotHighlight0 10s ease-in-out infinite; }
        .anim-dot-1 { animation: dotHighlight1 10s ease-in-out infinite; }
        .anim-dot-2 { animation: dotHighlight2 10s ease-in-out infinite; }
        .anim-dot-3 { animation: dotHighlight3 10s ease-in-out infinite; }
        .anim-dot-4 { animation: dotHighlight4 10s ease-in-out infinite; }

        .anim-text-0 { animation: textHighlight0 10s ease-in-out infinite; }
        .anim-text-1 { animation: textHighlight1 10s ease-in-out infinite; }
        .anim-text-2 { animation: textHighlight2 10s ease-in-out infinite; }
        .anim-text-3 { animation: textHighlight3 10s ease-in-out infinite; }
        .anim-text-4 { animation: textHighlight4 10s ease-in-out infinite; }

        /* Reduced Motion Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .anim-line-0, .anim-line-1, .anim-line-2, .anim-line-3,
          .anim-line-v-0, .anim-line-v-1, .anim-line-v-2, .anim-line-v-3,
          .anim-marker-0, .anim-marker-1, .anim-marker-2, .anim-marker-3, .anim-marker-4,
          .anim-dot-0, .anim-dot-1, .anim-dot-2, .anim-dot-3, .anim-dot-4,
          .anim-text-0, .anim-text-1, .anim-text-2, .anim-text-3, .anim-text-4 {
            animation: none !important;
          }
        }
      `}} />

      {/* Light minimal interior design architectural line art illustration in warm brown (strictly no text) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/images/approach-interior-line-art.jpg"
          alt="Interior architectural line art sketch illustration"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_60%] opacity-[0.24] mix-blend-multiply"
        />
        {/* Soft subtle gradient wash to guarantee crystalline text readability on all devices */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#F8F3F0]/92 via-[#F8F3F0]/65 to-[#F8F3F0]/88 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-14 sm:py-18 lg:py-20 xl:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-10 items-start">
          
          {/* Left Column: Eyebrow and Large Display Heading (Static & Preserved) */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-start">
            {/* Eyebrow */}
            <span className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] font-semibold tracking-[0.24em] uppercase text-[#8E7462] mb-3 sm:mb-4 block">
              OUR APPROACH
            </span>

            {/* Main Heading */}
            <h2 
              id="our-approach-heading"
              className="font-serif text-[34px] sm:text-[38px] lg:text-[42px] xl:text-[45px] leading-[1.12] tracking-tight text-[#1C201D] font-normal"
            >
              From the First<br />
              Idea to the<br />
              Final Detail.
            </h2>
          </div>

          {/* Right Area: Five-Step Timeline */}
          <div className="lg:col-span-9 xl:col-span-9 w-full">
            
            {/* Desktop & Tablet Horizontal Timeline (md and above) */}
            <div className="hidden md:block relative pt-1">
              {/* Five Step Columns Grid */}
              <div className="grid grid-cols-5 gap-5 lg:gap-6 xl:gap-8 relative z-10">
                {processSteps.map((step, idx) => (
                  <div key={step.number} className="flex flex-col group relative">
                    
                    {/* Step Number with lining figures & Animated Color */}
                    <span 
                      className={`font-serif text-[18px] sm:text-[19px] lg:text-[20px] font-normal mb-2.5 leading-none select-none [font-variant-numeric:lining-nums] transition-colors duration-300 anim-text-${idx}`}
                    >
                      {step.number}
                    </span>

                    {/* Timeline Marker & Connecting Segment */}
                    <div className="relative mb-4 flex items-center">
                      
                      {/* Marker Circle */}
                      <div 
                        className={`relative z-10 w-3.5 h-3.5 rounded-full border border-[#8C7A6B] bg-[#F8F3F0] flex items-center justify-center shrink-0 transition-all duration-300 anim-marker-${idx}`}
                      >
                        {/* Subtle vertical tick marks */}
                        <span className="absolute -top-1 w-[1px] h-1 bg-[#8C7A6B]" />
                        <span className="absolute -bottom-1 w-[1px] h-1 bg-[#8C7A6B]" />
                        {/* Center Dot */}
                        <span className={`w-1 h-1 rounded-full bg-[#8C7A6B] transition-colors duration-300 anim-dot-${idx}`} />
                      </div>

                      {/* Horizontal Connecting Segment to Next Marker */}
                      {idx < 4 && (
                        <div 
                          className="absolute left-[7px] w-[calc(100%+1.25rem)] lg:w-[calc(100%+1.5rem)] xl:w-[calc(100%+2rem)] h-[1px] bg-[#DDD4CA] z-0 pointer-events-none"
                          aria-hidden="true"
                        >
                          {/* Animated Warm Brown Progress Fill */}
                          <div 
                            className={`w-full h-[1.5px] -top-[0.25px] relative bg-[#9C7055] origin-left anim-line-${idx}`} 
                          />
                        </div>
                      )}

                      {/* Trailing Extension Line past Step 05 */}
                      {idx === 4 && (
                        <div 
                          className="absolute left-[7px] w-14 lg:w-20 xl:w-28 h-[1px] bg-[#DDD4CA] z-0 pointer-events-none"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Step Title & Animated Color */}
                    <h3 
                      className={`font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] font-semibold tracking-[0.14em] uppercase mb-2 leading-snug transition-colors duration-300 anim-text-${idx}`}
                    >
                      {step.title}
                    </h3>

                    {/* Description Paragraph */}
                    <p className="font-sans text-[12px] sm:text-[12.5px] lg:text-[13px] leading-[1.65] text-[#554F49]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Vertical Process Timeline (< md) */}
            <div className="md:hidden relative pl-0.5">
              {processSteps.map((step, idx) => (
                <div 
                  key={step.number} 
                  className="relative flex items-stretch gap-3.5 sm:gap-4"
                >
                  {/* Left Column: Step Number */}
                  <div className="shrink-0 w-6 sm:w-7 pt-0.5 text-left">
                    <span 
                      className={`font-serif text-[18px] sm:text-[19px] font-normal leading-none select-none [font-variant-numeric:lining-nums] transition-colors duration-300 anim-text-${idx}`}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Center Column: Marker and Continuous Vertical Connecting Line */}
                  <div className="relative flex flex-col items-center shrink-0 w-3.5">
                    {/* Continuous Vertical Connecting Line to next marker */}
                    {idx < processSteps.length - 1 && (
                      <div 
                        className="w-[1px] bg-[#DDD4CA] absolute top-2.5 -bottom-2.5 left-1/2 -translate-x-1/2 z-0 pointer-events-none" 
                        aria-hidden="true" 
                      >
                        {/* Animated Vertical Warm Brown Progress Fill */}
                        <div 
                          className={`w-[1.5px] -left-[0.25px] absolute top-0 h-full bg-[#9C7055] origin-top anim-line-v-${idx}`} 
                        />
                      </div>
                    )}

                    {/* Timeline Marker */}
                    <div 
                      className={`relative z-10 w-3.5 h-3.5 mt-0.5 rounded-full border border-[#8C7A6B] bg-[#F8F3F0] flex items-center justify-center shrink-0 transition-all duration-300 anim-marker-${idx}`}
                    >
                      {/* Subtle vertical tick marks */}
                      <span className="absolute -top-1 w-[1px] h-1 bg-[#8C7A6B]" />
                      <span className="absolute -bottom-1 w-[1px] h-1 bg-[#8C7A6B]" />
                      {/* Center Dot */}
                      <span className={`w-1 h-1 rounded-full bg-[#8C7A6B] transition-colors duration-300 anim-dot-${idx}`} />
                    </div>
                  </div>

                  {/* Right Column: Title and Description */}
                  <div className={`pt-0.5 flex-1 min-w-0 ${idx === processSteps.length - 1 ? 'pb-1' : 'pb-8 sm:pb-9'}`}>
                    <h3 
                      className={`font-sans text-[11.5px] sm:text-[12px] font-semibold tracking-[0.14em] uppercase mb-1.5 leading-snug transition-colors duration-300 anim-text-${idx}`}
                    >
                      {step.title}
                    </h3>
                    <p className="font-sans text-[12.5px] sm:text-[13px] leading-[1.65] text-[#554F49]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

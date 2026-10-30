'use client';

import React from 'react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand',
    description: 'We listen to your needs, ideas and goals.',
  },
  {
    number: '02',
    title: 'Conceptualize',
    description: 'We create meaningful design concepts.',
  },
  {
    number: '03',
    title: 'Design & Develop',
    description: 'We refine every detail with precision.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'We bring your space to life seamlessly.',
  },
];

export function AboutProcessSection() {
  return (
    <section 
      id="about-approach"
      aria-labelledby="about-approach-heading"
      className="w-full bg-[#F6EFE6] text-[#1C201D] select-text py-20 sm:py-24 lg:py-28 xl:py-32 overflow-hidden"
    >
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Main Grid: Left Column = Eyebrow + Heading, Right Column = 4 Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
          
          {/* Left Column: Eyebrow and Main Heading */}
          <div className="lg:col-span-4 xl:col-span-3 shrink-0">
            <span className="font-sans text-[11px] sm:text-[11.5px] uppercase tracking-[0.24em] font-medium text-[#9E7D66] mb-3 sm:mb-4 block">
              OUR APPROACH
            </span>
            <h2 
              id="about-approach-heading"
              className="font-serif text-[36px] sm:text-[42px] lg:text-[44px] xl:text-[50px] leading-[1.1] tracking-[-0.015em] font-normal text-[#1C201D]"
            >
              From Vision<br />
              to <span className="text-[#9E6E49]">Reality.</span>
            </h2>
          </div>

          {/* Right Column: 4-Step Process positioned directly to the right of the heading */}
          <div className="lg:col-span-8 xl:col-span-9 lg:pt-1">
            
            {/* Desktop & Tablet Horizontal Timeline (md and above) */}
            <div className="hidden md:block relative">
              <div className="grid grid-cols-4 gap-4 lg:gap-5 xl:gap-8 relative z-10">
                {steps.map((step, idx) => (
                  <div key={step.number} className="group relative flex flex-col">
                    
                    {/* Marker & Connecting Line */}
                    <div className="relative mb-5 flex items-center">
                      
                      {/* Circular Disk Marker */}
                      <div className="relative z-10 w-11 h-11 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full bg-[#DECBB6] flex items-center justify-center text-[#1C201D] font-serif text-[15px] xl:text-[16px] font-medium [font-variant-numeric:lining-nums] shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-xs">
                        {step.number}
                      </div>

                      {/* Horizontal Connecting Line to Next Marker */}
                      {idx < steps.length - 1 && (
                        <div 
                          className="absolute left-11 xl:left-12 -right-6 lg:-right-[28px] xl:-right-10 h-[1px] bg-[#D8CEBF] z-0 pointer-events-none"
                          aria-hidden="true" 
                        />
                      )}
                    </div>

                    {/* Step Title */}
                    <h3 className="font-sans font-semibold text-[14.5px] sm:text-[15px] xl:text-[16px] text-[#9E6E49] mb-1.5 xl:mb-2 leading-snug">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="font-sans text-[12.5px] sm:text-[13px] xl:text-[13.5px] text-[#635E58] leading-[1.58] max-w-[240px]">
                      {step.description}
                    </p>

                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Vertical Process Timeline (< md) */}
            <div className="md:hidden relative space-y-7 pl-1">
              {steps.map((step, idx) => (
                <div key={step.number} className="relative flex items-start gap-4">
                  
                  {/* Left Column: Circular Marker & Vertical Connecting Line */}
                  <div className="relative flex flex-col items-center shrink-0 w-11">
                    {/* Circular Disk Marker */}
                    <div className="relative z-10 w-11 h-11 rounded-full bg-[#DECBB6] flex items-center justify-center text-[#1C201D] font-serif text-[15px] font-medium [font-variant-numeric:lining-nums] shrink-0 shadow-xs">
                      {step.number}
                    </div>

                    {/* Vertical Line to Next Step */}
                    {idx < steps.length - 1 && (
                      <div 
                        className="w-[1px] bg-[#D8CEBF] absolute top-11 -bottom-7 left-1/2 -translate-x-1/2 pointer-events-none" 
                        aria-hidden="true" 
                      />
                    )}
                  </div>

                  {/* Right Column: Title and Description */}
                  <div className="pt-1.5 pb-1 flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-[15px] text-[#9E6E49] mb-1 leading-snug">
                      {step.title}
                    </h3>
                    <p className="font-sans text-[13px] text-[#635E58] leading-[1.58]">
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

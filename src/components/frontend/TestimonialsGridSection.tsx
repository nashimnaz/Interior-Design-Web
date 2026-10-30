'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import { initialTestimonials } from '@/lib/store';

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  return (
    <article 
      className="w-[330px] sm:w-[370px] lg:w-[410px] h-[225px] sm:h-[235px] shrink-0 bg-[#FCFAF4] border border-[#E5DFD4] rounded-[4px] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#94745F]/50 hover:-translate-y-1 select-text"
      aria-label={`Testimonial from ${item.clientName}`}
    >
      <div>
        {/* Top: 5 Stars + Project Badge */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-1 text-[#8F5E3B]" aria-label={`${item.rating || 5} out of 5 stars`}>
            {[...Array(item.rating || 5)].map((_, i) => (
              <Star key={i} size={13} className="fill-[#8F5E3B] text-[#8F5E3B]" />
            ))}
          </div>

          {item.projectTitle && (
            <span className="font-sans text-[10px] uppercase tracking-[0.16em] font-semibold text-[#94745F] bg-[#F4F0E9] px-2.5 py-0.5 rounded-[3px] truncate max-w-[175px]">
              {item.projectTitle}
            </span>
          )}
        </div>

        {/* Quote Text */}
        <blockquote className="font-serif text-[14px] sm:text-[15px] leading-[1.48] text-[#292722] font-normal line-clamp-3 select-text">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      </div>

      {/* Client Profile Footer */}
      <div className="flex items-center gap-3 pt-3.5 border-t border-[#EDE7DC]">
        {item.clientPhoto ? (
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#E5DFD4] shrink-0 border border-[#D9D0C4]">
            <Image
              src={item.clientPhoto}
              alt={item.clientName}
              fill
              sizes="36px"
              unoptimized
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#E8E0D2] flex items-center justify-center shrink-0 font-serif text-[14.5px] text-[#94745F] font-semibold">
            {item.clientName.charAt(0)}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="font-sans text-[13px] sm:text-[13.5px] font-semibold text-[#292722] tracking-normal truncate">
            {item.clientName}
          </h3>
          <p className="font-sans text-[11px] sm:text-[11.5px] text-[#6E675E] truncate">
            {item.clientRole}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsGridSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const approved = data.data.filter((t: Testimonial) => t.status === 'Approved');
          if (approved.length > 0) {
            setTestimonials(approved);
          }
        }
      })
      .catch(() => {
        // Fall back to initialTestimonials
      });
  }, []);

  // Split testimonials into 2 balanced rows and repeat for continuous infinite loop
  const { row1Items, row2Items } = useMemo(() => {
    const half = Math.ceil(testimonials.length / 2);
    const row1Base = testimonials.slice(0, half);
    const row2Base = testimonials.slice(half);

    const padList = (list: Testimonial[], min = 6) => {
      if (list.length === 0) return [];
      let res = [...list];
      while (res.length < min) {
        res = [...res, ...list];
      }
      return res;
    };

    const r1 = padList(row1Base, 6);
    const r2 = padList(row2Base, 6);

    // Duplicated twice for seamless translate3d(-50%, 0, 0) / translate3d(0, 0, 0) infinite marquee
    return {
      row1Items: [...r1, ...r1],
      row2Items: [...r2, ...r2],
    };
  }, [testimonials]);

  return (
    <section 
      id="testimonials"
      className="w-full bg-[#F4F0E9] text-[#292722] py-20 sm:py-24 lg:py-28 border-t border-[#E8E1D5] select-text overflow-hidden"
      aria-labelledby="testimonials-grid-heading"
    >
      {/* Centered Editorial Header Container */}
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#DDD5C7]">
          <div>
            <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.24em] uppercase text-[#94745F] mb-3 block">
              VERIFIED CLIENT EXPERIENCES
            </span>
            <h2 
              id="testimonials-grid-heading"
              className="font-serif text-[#292722] text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.14] tracking-[-0.015em] font-normal"
            >
              What It Feels Like to <br className="hidden sm:inline" />
              <span className="italic text-[#94745F]">Live in an Excorto Home.</span>
            </h2>
          </div>

          <div className="max-w-[440px]">
            <p className="font-sans text-[13.5px] sm:text-[14px] text-[#554E48] leading-relaxed mb-2">
              Discover firsthand experiences from homeowners, entrepreneurs, and families across Kerala who trusted Excorto with their most personal spaces.
            </p>
            <span className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.16em] uppercase text-[#94745F]/80 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#94745F]/70 animate-pulse" />
              Hover over any card to pause scrolling
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DUAL-ROW SLOW INFINITE TICKER / MARQUEE
          - Row 1: Slowly scrolls to the LEFT
          - Row 2: Slowly scrolls to the RIGHT
          - Approx. 3 compact cards visible in view horizontally
          - Pause on hover for effortless reading
          ========================================================================= */}
      {/* Embedded CSS for guaranteed hardware-accelerated continuous scrolling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollRowLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes scrollRowRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .scroll-row-left {
          display: flex !important;
          width: max-content !important;
          animation: scrollRowLeft 32s linear infinite !important;
          will-change: transform;
        }

        .scroll-row-right {
          display: flex !important;
          width: max-content !important;
          animation: scrollRowRight 32s linear infinite !important;
          will-change: transform;
        }

        .scroll-row-left:hover,
        .scroll-row-right:hover {
          animation-play-state: paused !important;
        }
      `}} />

      {/* =========================================================================
          DUAL-ROW SLOW INFINITE TICKER / MARQUEE
          - Row 1: First row scrolling to the LEFT
          - Row 2: Second row scrolling to the RIGHT
          - Approx. 3 compact cards visible in view horizontally
          - Pause on hover for effortless reading
          ========================================================================= */}
      <div className="relative w-full overflow-hidden py-1">
        {/* Left & Right Soft Ivory Gradient Masks for Seamless Infinity Edges */}
        <div 
          className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-[#F4F0E9] via-[#F4F0E9]/80 to-transparent pointer-events-none z-20" 
          aria-hidden="true"
        />
        <div 
          className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-[#F4F0E9] via-[#F4F0E9]/80 to-transparent pointer-events-none z-20" 
          aria-hidden="true"
        />

        {/* First Row: Scrolling LEFT */}
        <div className="flex overflow-hidden mb-5 sm:mb-6">
          <div className="scroll-row-left animate-ticker-left flex gap-5 sm:gap-6 will-change-transform">
            {row1Items.map((item, idx) => (
              <TestimonialCard 
                key={`row1-${item.id}-${idx}`} 
                item={item} 
                index={idx}
              />
            ))}
          </div>
        </div>

        {/* Second Row: Scrolling RIGHT */}
        <div className="flex overflow-hidden">
          <div className="scroll-row-right animate-ticker-right flex gap-5 sm:gap-6 will-change-transform">
            {row2Items.map((item, idx) => (
              <TestimonialCard 
                key={`row2-${item.id}-${idx}`} 
                item={item} 
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Centered Trust Metric Bar */}
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="mt-14 sm:mt-18 pt-10 border-t border-[#DDD5C7] grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
          <div>
            <span className="font-serif text-[30px] sm:text-[36px] text-[#292722] font-normal block leading-tight">100%</span>
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#7A746C] mt-1 block">Client Satisfaction</span>
          </div>
          <div>
            <span className="font-serif text-[30px] sm:text-[36px] text-[#292722] font-normal block leading-tight">50+</span>
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#7A746C] mt-1 block">Completed Projects</span>
          </div>
          <div>
            <span className="font-serif text-[30px] sm:text-[36px] text-[#292722] font-normal block leading-tight">14+</span>
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#7A746C] mt-1 block">Years of Craftsmanship</span>
          </div>
          <div>
            <span className="font-serif text-[30px] sm:text-[36px] text-[#8F5E3B] font-normal block leading-tight">5.0 ★</span>
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#7A746C] mt-1 block">Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/frontend/Navbar';
import { Footer } from '@/components/frontend/Footer';
import { ConsultationModal } from '@/components/frontend/ConsultationModal';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const deliverables = [
  { id: '01', title: 'Residential Interior Design', desc: 'Bespoke spatial design for luxury villas, penthouses, and private estates curated to mirror the owner’s individuality.' },
  { id: '02', title: 'Commercial Interior Design', desc: 'Signature commercial environments, executive ateliers, and boutique hospitality spaces that communicate brand prestige.' },
  { id: '03', title: '3D Interior Visualization', desc: 'High-fidelity photorealistic CGI renderings visualizing spatial depth, surface reflections, and warm ambient illumination.' },
  { id: '04', title: '2D Interior Layout', desc: 'Micrometric furniture placement, spatial zoning, ergonomics, and seamless circulation pathways.' },
  { id: '05', title: '3D Interior Walkthrough', desc: 'Cinematic virtual video journeys capturing spatial transitions from foyer to living quarters with real-time lighting.' },
  { id: '06', title: 'Living Room and Bedroom Design', desc: 'Intimate spatial curation combining tactile upholstery, acoustical balance, custom headboards, and calming palettes.' },
  { id: '07', title: 'Kitchen Design Concepts', desc: 'Ergonomic culinary ateliers integrating custom islands, concealed prep pantries, and premium European hardware.' },
  { id: '08', title: 'Wardrobe and Storage Planning', desc: 'Bespoke dressing rooms and integrated modular cabinetry maximizing storage capacity with discreet architectural elegance.' },
  { id: '09', title: 'False Ceiling and Lighting Concepts', desc: 'Layered architectural lighting schemes comprising concealed cove runs, low-glare downlights, and statement luminaires.' },
  { id: '10', title: 'Color Palettes and Material Selection', desc: 'Tactile physical curation of lime plasters, natural stones, fluted timbers, bronzed metals, and artisanal textiles.' },
  { id: '11', title: 'Furniture and Spatial Planning', desc: 'Custom furniture design, proportions, joinery drawings, and bespoke procurement curation from world-class artisans.' },
  { id: '12', title: 'Interior Detailing and Design Development', desc: 'Comprehensive production drawings for skirting, wall transitions, custom millwork, and electrical coordinate sheets.' },
];

export default function InteriorDesignPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingLinesRef = useRef<HTMLSpanElement[]>([]);
  const descRef = useRef<HTMLParagraphElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const philosophyLineRef = useRef<HTMLDivElement>(null);
  const deliverablesGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Background image gentle scale-in
      if (heroBgRef.current) {
        const bgImg = heroBgRef.current.querySelector('img');
        if (bgImg) {
          tl.fromTo(
            bgImg,
            { scale: 1.12, opacity: 0.8 },
            { scale: 1.05, opacity: 1, duration: 1.8, ease: 'power2.out' },
            0
          );

          // Subtle parallax scrub on scroll
          gsap.to(bgImg, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: heroBgRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      }

      // 2. Breadcrumb & Eyebrow Reveal
      if (breadcrumbRef.current) {
        tl.fromTo(
          breadcrumbRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.1
        );
      }

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.2
        );
      }

      // 3. Line-by-Line Upward Heading Reveal
      const validHeadingLines = headingLinesRef.current.filter(Boolean);
      if (validHeadingLines.length > 0) {
        tl.fromTo(
          validHeadingLines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.12 },
          0.3
        );
      }

      // 4. Supporting Descriptions Fade-Up
      const validDesc = descRef.current.filter(Boolean);
      if (validDesc.length > 0) {
        tl.fromTo(
          validDesc,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.14 },
          0.65
        );
      }

      // 5. CTA Buttons Staggered Fade-In
      if (ctaRef.current) {
        const ctaChildren = Array.from(ctaRef.current.children);
        tl.fromTo(
          ctaChildren,
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1 },
          0.85
        );
      }

      // 6. Horizontal separator line scale reveal
      if (philosophyLineRef.current) {
        gsap.fromTo(
          philosophyLineRef.current,
          { scaleX: 0, transformOrigin: 'center center' },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: philosophyLineRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 7. Staggered deliverables cards reveal
      if (deliverablesGridRef.current) {
        const cards = Array.from(deliverablesGridRef.current.children);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.07,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: deliverablesGridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="w-full bg-[#F4F0E9] min-h-screen selection:bg-[#94745F] selection:text-white text-[#292722]">
      {/* Studio Navbar */}
      <Navbar 
        activePage="services" 
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* =========================================================================
          FULL-SCREEN CINEMATIC HERO SECTION (100vw × 100vh minimum)
          - Full-viewport architectural photograph with cover & center positioning
          - Sophisticated warm ivory gradient overlay: 95% left, 60% center, 15% right
          - Content positioned within left 45-50% with generous spacing
          ========================================================================= */}
      <section 
        id="interior-hero"
        aria-labelledby="interior-hero-heading"
        className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#F4F0E9] text-[#292722] select-text"
      >
        {/* Full-Screen Architectural Background Image: Double-height space with sculptural staircase */}
        <div 
          ref={heroBgRef}
          className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden will-change-transform"
        >
          <Image
            src="/images/services/interior-hero.jpg"
            alt="Excorto Interior Designing - Contemporary luxury living space with sculptural staircase and walnut paneling"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center will-change-transform"
          />

          {/* Sophisticated Warm Ivory Gradient Overlay:
              Strong on the left (95%) for maximum text contrast,
              gradually fading to transparent on the right (15%) to reveal architecture */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#F4F0E9]/92 via-[#F4F0E9]/70 to-[#F4F0E9]/25 sm:via-[#F4F0E9]/75 lg:from-[#F4F0E9]/95 lg:via-[#F4F0E9]/60 lg:to-[#F4F0E9]/15 pointer-events-none" 
            aria-hidden="true" 
          />
          {/* Subtle vertical wash for seamless navbar and edge transitions */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#F4F0E9]/50 via-transparent to-[#F4F0E9]/75 pointer-events-none" 
            aria-hidden="true" 
          />
        </div>

        {/* Content Container (Layered over the left 45-50% of the screen) */}
        <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-32 sm:pt-36 lg:pt-32 pb-16 sm:pb-20 flex items-center min-h-screen">
          <div className="w-full lg:w-[50%] xl:w-[48%] max-w-[620px] xl:max-w-[660px] flex flex-col justify-center">
            
            {/* Breadcrumb Navigation */}
            <div 
              ref={breadcrumbRef}
              className="flex items-center gap-2 mb-6 sm:mb-7 text-[11px] sm:text-[11.5px] font-sans uppercase tracking-[0.2em] text-[#94745F] will-change-transform select-none"
            >
              <Link href="/services" className="hover:text-[#A65E3F] transition-colors flex items-center gap-1.5">
                <ArrowLeft size={13} />
                <span>Services</span>
              </Link>
              <span className="text-[#D9D0C4]">/</span>
              <span className="text-[#292722] font-semibold">Interior Designing</span>
            </div>

            {/* Service Number & Category Eyebrow */}
            <div 
              ref={eyebrowRef}
              className="flex items-center gap-3 mb-4 will-change-transform"
            >
              <span className="font-serif text-[18px] text-[#A65E3F] font-medium [font-variant-numeric:lining-nums]">
                02
              </span>
              <span className="w-6 h-[1px] bg-[#94745F]" aria-hidden="true" />
              <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.26em] uppercase text-[#94745F]">
                BESPOKE INTERIOR CURATION
              </span>
            </div>

            {/* Large Editorial Serif Heading: Line-by-Line Upward Reveal */}
            <h1 
              id="interior-hero-heading"
              className="font-serif text-[38px] sm:text-[46px] lg:text-[54px] xl:text-[60px] leading-[1.08] tracking-[-0.018em] font-normal mb-5 sm:mb-6 text-[#292722]"
            >
              <span className="block overflow-hidden py-0.5">
                <span 
                  ref={(el) => { if (el) headingLinesRef.current[0] = el; }}
                  className="block will-change-transform"
                >
                  Interiors That Feel Personal.
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span 
                  ref={(el) => { if (el) headingLinesRef.current[1] = el; }}
                  className="block italic text-[#94745F] will-change-transform"
                >
                  Spaces That Work Beautifully.
                </span>
              </span>
            </h1>

            {/* Supporting Description */}
            <div className="space-y-3.5 sm:space-y-4 mb-7 sm:mb-8">
              <p 
                ref={(el) => { if (el) descRef.current[0] = el; }}
                className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] leading-[1.72] text-[#3D3832] will-change-transform"
              >
                Personalized interior concepts combining space planning, materials, colours, lighting and design details to create beautiful and functional environments. We approach interior architecture as the creation of tactile sanctuaries that reflect your personality.
              </p>

              <p 
                ref={(el) => { if (el) descRef.current[1] = el; }}
                className="font-sans text-[13px] sm:text-[13.5px] lg:text-[14px] leading-[1.7] text-[#554F47] will-change-transform"
              >
                Every room is orchestrated as an harmonious composition of light, materiality, and bespoke craftsmanship — delivering timeless beauty and effortless everyday comfort.
              </p>
            </div>

            {/* Action Buttons: Primary & Secondary */}
            <div 
              ref={ctaRef}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 select-none will-change-transform"
            >
              <button
                type="button"
                onClick={() => setIsConsultationOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#94745F] hover:bg-[#7D604D] text-[#FAF8F5] font-sans font-medium text-[11.5px] sm:text-[12px] uppercase tracking-[0.16em] rounded-full transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-98"
              >
                <span>Discuss Your Interior Design</span>
                <span aria-hidden="true">→</span>
              </button>
              <a
                href="#deliverables"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent hover:bg-[#65745A] text-[#292722] hover:text-white border border-[#65745A]/50 hover:border-[#65745A] font-sans font-medium text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] rounded-full transition-all duration-300 active:scale-98"
              >
                View 12 Deliverables
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          DESIGN PHILOSOPHY SECTION
          ========================================================================= */}
      <section className="w-full py-16 sm:py-20 lg:py-24 border-b border-[#D9D0C4]/70 bg-[#EDE7DD]/50">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="max-w-[840px] mx-auto text-center">
            <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.26em] uppercase text-[#94745F] mb-3 block">
              OUR INTERIOR PHILOSOPHY
            </span>
            <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.14] font-normal text-[#292722] mb-6">
              Tactile Sanctuaries That Age with Dignity
            </h2>
            <div 
              ref={philosophyLineRef}
              className="w-16 h-[1.5px] bg-[#94745F] mx-auto mb-6 will-change-transform" 
              aria-hidden="true" 
            />
            <p className="font-sans text-[14px] sm:text-[15.5px] leading-[1.8] text-[#4F4A43] text-justify sm:text-center">
              We believe that interiors should be tactile sanctuaries that age with dignity. By balancing serene neutrals, natural textures like raw linen and honed limestone, and warm ambient illumination, we create spaces that feel quietly luxurious, deeply personal, and intuitively functional.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12 SERVICE DELIVERABLES GRID
          ========================================================================= */}
      <section id="deliverables" className="w-full py-20 sm:py-24 border-b border-[#D9D0C4]/70">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.26em] uppercase text-[#94745F] mb-2.5 block">
                COMPREHENSIVE SCOPE
              </span>
              <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.12] font-normal text-[#292722]">
                Interior Design Deliverables
              </h2>
            </div>
            <p className="font-sans text-[13px] sm:text-[14px] text-[#635E58] max-w-[420px]">
              From concept development and material curation to 3D visualization and detailed technical production documentation.
            </p>
          </div>

          <div ref={deliverablesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {deliverables.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#EDE7DD]/40 border border-[#D9D0C4]/70 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#94745F]/60 hover:bg-[#EDE7DD]/70 will-change-transform"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-[18px] text-[#A65E3F] font-medium [font-variant-numeric:lining-nums]">
                      {item.id}
                    </span>
                    <CheckCircle2 size={16} className="text-[#65745A]" />
                  </div>
                  <h3 className="font-serif text-[18px] sm:text-[19px] text-[#292722] font-normal leading-snug mb-2.5">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[12.5px] sm:text-[13px] text-[#554F49] leading-[1.6]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          CLOSING CTA SECTION
          ========================================================================= */}
      <section className="w-full py-20 sm:py-24 bg-[#EAE3D6]/70 text-center">
        <div className="max-w-[800px] mx-auto px-6 sm:px-10">
          <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.26em] uppercase text-[#94745F] mb-3 block">
            CREATE YOUR SANCTUARY
          </span>
          <h2 className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.12] font-normal text-[#292722] mb-5">
            Let&apos;s Design a Space That Feels Like You.
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] leading-[1.7] text-[#554F49] mb-8 max-w-[560px] mx-auto">
            Book an interior design consultation with our senior designers. We explore your aesthetic direction, discuss material possibilities, and formulate your personalized design roadmap.
          </p>
          <button
            type="button"
            onClick={() => setIsConsultationOpen(true)}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#94745F] hover:bg-[#7D604D] text-[#FAF8F5] font-sans font-medium text-[12px] sm:text-[12.5px] uppercase tracking-[0.18em] rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer select-none"
          >
            <span>Discuss Your Interior Design</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* Studio Footer */}
      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}
